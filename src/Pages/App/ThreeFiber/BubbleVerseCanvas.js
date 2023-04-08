import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { Vector3, Box3 } from "three";
import { Html, OrbitControls } from "@react-three/drei";
import { Popover } from "@instructure/ui-popover";
import { Heading } from "@instructure/ui-heading";
import { Link } from "@instructure/ui-link";
import { Spinner } from "@instructure/ui-spinner";
import { View } from "@instructure/ui-view";
import { Text } from "@instructure/ui-text";
import { IconLikeLine } from "@instructure/ui-icons";
import { IconButton } from "@instructure/ui-buttons";

import useSound from "use-sound";
import pop from "../../../sounds/pop.mp3";

import "./BubbleVerseCanvas.css";

const colors = [
  "#D32F2F",
  "#303F9F",
  "#388E3C",
  "#FBC02D",
  "#7B1FA2",
  "#FFA000",
  "#00BCD4",
  "#FF5722",
  "#795548",
  "#607D8B",
];

function Box(props) {
  // const font = new FontLoader().parse(defaultFont);
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const { text, position } = props;
  const [showPopover, setShowPopover] = useState(false);
  const [mountNode, setMountNode] = useState(null);

  const [randomColor, setRandomColor] = useState(
    colors[Math.floor(Math.random() * colors.length)]
  );

  const { camera } = useThree();

  const canvas = props.canvasRef.current;
  const orbitalControlsPositionString = props.orbitalControlsPosition;
  const responseId = props.responseId;

  const placeAbsoluteDivAsBoundingBoxAroundWhereMeshAppears = (
    currMesh,
    camera,
    canvas
  ) => {
    if (!currMesh.current) return;
    let div = document.getElementById(currMesh.current.uuid + "-div");
    if (!div || div === null) {
      // create a div
      div = document.createElement("div");
      div.id = currMesh.current.uuid + "-div";
    }
    div.style.width = "250px";
    div.style.height = "50px";
    // div.style.border = "1px dashed grey";

    // get the bounding box of the mesh
    const box = new Box3().setFromObject(currMesh.current);

    // get the size of the bounding box
    const size = new Vector3();
    box.getSize(size);

    // get the center of the bounding box
    const center = new Vector3();
    box.getCenter(center);

    // get the position of the center of the bounding box in normalized device coordinates (NDC) (-1 to +1) for both components
    const pos = center.project(camera);

    // convert the normalized device coordinate to CSS coordinates
    const x = (pos.x * 0.5 + 0.5) * canvas.clientWidth;
    const y = (pos.y * -0.5 + 0.5) * canvas.clientHeight;

    // Get canvas position on the page
    const canvasRect = canvas.getBoundingClientRect();

    div.style.left = canvasRect.left + x + "px";
    div.style.top = canvasRect.top + y + "px";

    // set position and size of div considering where the canvas is on the page
    div.style.position = "absolute";
    div.style.transform = `translate(-50%, -50%)`;
    // set z-index to be in front of the canvas
    // div.style.zIndex = 1;

    // set pointer events to none so that the canvas can still be interacted with
    div.style.pointerEvents = "none";

    // add the div to the DOM
    document.body.appendChild(div);

    // set the mountNode
    setMountNode(div);

    // return a function that will remove the div when the component unmounts
    return () => {
      document.body.removeChild(div);
    };
  };

  useEffect(() => {
    return placeAbsoluteDivAsBoundingBoxAroundWhereMeshAppears(
      mesh,
      camera,
      canvas
    );
  }, [mesh, camera, canvas, position, orbitalControlsPositionString]);

  // Update on resize
  useEffect(() => {
    const handleResize = () => {
      placeAbsoluteDivAsBoundingBoxAroundWhereMeshAppears(mesh, camera, canvas);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mesh, camera, canvas]);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.x += delta));

  return (
    <>
      <mesh
        {...props}
        ref={mesh}
        onClick={(event) => {
          setActive(!active);
          setShowPopover(!showPopover);
        }}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}
        position={position}
      >
        <sphereGeometry args={[1, 10, 10]} />
        {/* <meshStandardMaterial
          color={active ? "hotpink" : hovered ? "white" : randomColor}
        /> */}
        <meshNormalMaterial />
      </mesh>
      {/* <textGeometry
        args={[
          text,
          { font: font, size: 0.5, height: 0.05, curveSegments: 12 },
        ]}
      >
        <meshStandardMaterial color="black" />
      </textGeometry> */}
      <Html>
        <CustomPopover
          mountNode={mountNode}
          showPopover={showPopover}
          setShowPopover={setShowPopover}
          text={text}
          responseId={responseId}
        />
      </Html>
    </>
  );
}

function CustomPopover(props) {
  const { mountNode, showPopover, setShowPopover, text, responseId } = props;
  const [textDisplay, setTextDisplay] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <Popover
      isShowingContent={showPopover}
      mountNode={mountNode}
      onDismiss={() => {
        setShowPopover(false);
      }}
      placement="top"
    >
      <View
        style={{
          pointerEvents: "auto",
          zIndex: 1000,
        }}
        onClick={() => {
          if (!textDisplay) {
            setLoading(true);
          } else {
            setTextDisplay(null);
          }
        }}
      >
        {loading ? (
          <Spinner />
        ) : textDisplay ? (
          <Text>{textDisplay}</Text>
        ) : (
          <Heading level="h3">{text}</Heading>
        )}
        <IconButton
          shape="circle"
          screenReaderLabel="Like tag"
          margin="small"
          onClick={(e) => {
            e.stopPropagation();
            // Add Upvote to response
            alert("Coming Soon: Upvote for " + responseId);
          }}
        >
          <IconLikeLine />
        </IconButton>
      </View>
    </Popover>
  );
}

export default function BubbleVerseCanvas(props) {
  const { responses, onStopLoadSound } = props;
  const canvasRef = useRef(null);

  const [orbitalControlsPositioning, setOrbitalControlsPositioning] =
    useState();

  const [playPop] = useSound(pop, { volume: 0.75 });

  const calculateRandomPositions = (currResponses) => {
    let currentPositions = [];
    for (let i = 0; i < currResponses.length; i++) {
      // Randomize the position of the box
      let x = Math.random() * 6;
      let y = Math.random() * 6;
      let z = Math.random() * 6;

      // Separate the boxes by 2 units
      x *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
      y *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
      z *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;

      // Make sure its not a y or a x or z that is already taken and that it has a space of 2 units
      if (currentPositions.length > 0) {
        for (let j = 0; j < currentPositions.length; j++) {
          if (x === currentPositions[j][0]) {
            x += 2;
          }
          if (y === currentPositions[j][1]) {
            y += 2;
          }
          if (z === currentPositions[j][2]) {
            z += 2;
          }
        }
      }

      currentPositions.push([x, y, z]);
    }
    return currentPositions;
  };

  const [positions, setPositions] = useState(
    calculateRandomPositions(responses)
  );

  useEffect(() => {
    if (responses.length > 0) {
      onStopLoadSound();
      playPop();
    }
    setPositions(calculateRandomPositions(responses));
  }, [responses, playPop, onStopLoadSound]);

  const handleOnEndOrbital = (e) => {
    setOrbitalControlsPositioning(
      e.target.object.position.x +
        " " +
        e.target.object.position.y +
        " " +
        e.target.object.position.z
    );
  };

  return (
    <Canvas
      ref={canvasRef}
      className="liquidAnimatedBorder"
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
        top: "0",
        left: "0",
      }}
      camera={{ fov: 90 }}
    >
      <OrbitControls
        rotateSpeed={0.2}
        enableDamping={false}
        onEnd={handleOnEndOrbital}
      />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {responses.map((response, index) => {
        const [x, y, z] = positions[index] || [0, 0, 0];
        return (
          <Box
            canvasRef={canvasRef}
            key={index}
            text={response.data.reference}
            position={[x, y, -5]}
            orbitalControlsPosition={orbitalControlsPositioning}
            responseId={response.id}
          />
        );
      })}
    </Canvas>
  );
}
