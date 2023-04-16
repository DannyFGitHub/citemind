import React, { useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation, useParams } from "react-router-dom";
import { View } from "@instructure/ui-view";
import { Text } from "@instructure/ui-text";
import { Heading } from "@instructure/ui-heading";
import { Flex, FlexItem } from "@instructure/ui-flex";
import { Button, IconButton } from "@instructure/ui-buttons";
import { DateTime } from "luxon";
import MindMap from "../../Components/MindMap/App";

import useWindowSize from "../../Hooks/useWindowSize";

import {
  IconCheckMarkIndeterminateSolid,
  IconCheckSolid,
  IconTrashLine,
} from "@instructure/ui-icons";

import { dbApp, authApp } from "../../Firebase/firebase";

import useSound from "use-sound";
import loadSound from "../../assets/sounds/load.mp3";
import { SimpleSelect } from "@instructure/ui-simple-select";
import { APPNAME } from "../../App";

// const initialTasks = [
//   {
//     id: "1",
//     name: "Redesign website",
//     start: "2016-12-28",
//     end: "2016-12-31",
//     progress: 10,
//     dependencies: "",
//   },
//   {
//     id: "2",
//     name: "Redesign website",
//     start: "2016-12-28",
//     end: "2016-12-31",
//     progress: 20,
//     dependencies: "Task 1",
//   },
//   {
//     id: "3",
//     name: "Redesign website",
//     start: "2016-12-28",
//     end: "2016-12-31",
//     progress: 0.52,
//     dependencies: "Task 2, Task 1",
//     custom_class: "bar-milestone", // optional
//   },
// ];

export default function Gantt(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const { width, height } = useWindowSize();

  const myFirstTask = {
    id: "1",
    name: "New Task",
    start: DateTime.fromFormat(
      DateTime.now().toFormat("yyyy-MM-dd"),
      "yyyy-MM-dd"
    ).toJSDate(),
    end: DateTime.fromFormat(
      DateTime.now().plus({ days: 1 }).toFormat("yyyy-MM-dd"),
      "yyyy-MM-dd"
    ).toJSDate(),
    progress: 0.52,
    dependencies: "",
  };

  const searchParams = new URLSearchParams(location.search);

  const { id: submissionId } = useParams();

  const [submission, setSubmission] = useState();
  const [showDialog, setShowDialog] = useState(false);
  const [ganttName, setGanttName] = useState("Gantt");
  const [showReading, setShowReading] = useState(
    searchParams.get("showReading") ?? false
  );

  const [tasks, setTasks] = useState([myFirstTask]);

  const [viewMode, setViewMode] = useState("Day"); //Quarter Day, Half Day, Day, Week, Month

  // const [playReverseRiseSound, { stop: stopReverseRiseSound }] = useSound(
  //   loadSound,
  //   {
  //     volume: 0.45,
  //     speed: 3,
  //   }
  // );

  useEffect(() => {
    if (submissionId) {
      dbApp.getSubmission(submissionId).then((currentSubmission) => {
        setSubmission(currentSubmission);
        if (currentSubmission?.data?.tasks) {
          // convert dates to JSDates
          currentSubmission.data.tasks.forEach((task) => {
            task.start = DateTime.fromSeconds(task.start.seconds).toJSDate();
            task.end = DateTime.fromSeconds(task.end.seconds).toJSDate();
          });
          setTasks(currentSubmission?.data?.tasks);
          setGanttName(currentSubmission?.data?.ganttName);
        }
      });
    }
  }, [submissionId]);

  function renderSelectedOptionInSelect(props) {
    if (props.isSelected) {
      return <IconCheckSolid />;
    }
    if (props.isHighlighted) {
      return <IconCheckMarkIndeterminateSolid />;
    }
  }

  function generateUniqueTaskId(tasks) {
    if (tasks.length === 0) {
      return "1";
    }
    const ids = tasks.map((task) => parseInt(task.id));
    const maxId = Math.max(...ids);
    return "" + (maxId + 1);
  }

  return (
    <Flex direction="column" height="100%">
      <FlexItem>
        <View as="div" borderWidth="small" borderRadius="medium">
          <MindMap />
        </View>
      </FlexItem>
      <FlexItem>
        <View as="div" margin="large 0">
          Some Content
        </View>
      </FlexItem>
      <FlexItem>
        <footer>
          <View as="div" margin="large 0" textAlign="center">
            <Text>{APPNAME}</Text>
          </View>
        </footer>
      </FlexItem>
    </Flex>
  );
}
