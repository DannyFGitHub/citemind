import React from "react";
import { Link } from "@instructure/ui-link";
import { useNavigate } from "react-router-dom";
import { View } from "@instructure/ui-view";
import { Text } from "@instructure/ui-text";
import { Flex } from "@instructure/ui-flex";
import { Heading } from "@instructure/ui-heading";
import { List } from "@instructure/ui-list";
import { Button } from "@instructure/ui-buttons";
import { IconPlusLine } from "@instructure/ui-icons";
import { IconArrowOpenEndLine } from "@instructure/ui-icons";
import "./Landing.css";
// import CiteMindIcon from "../Assets/images/gantt-icon.png";
import MindMapIcon from "../assets/images/mindmap.png";

import { APPNAME } from "../App";

export default function Landing(props) {
  const navigate = useNavigate();

  return (
    <Flex direction="column" height="100%">
      <Flex.Item shouldGrow>
        <View as="div" textAlign="center">
          <View as="div" margin="medium" textAlign="center" minHeight={300}>
            <Flex direction="column" alignItems="center" justifyItems="center">
              <Flex.Item padding="small">
                <View as="div" margin="medium">
                  <Heading level="h1" textAlign="center">
                    {APPNAME}
                  </Heading>
                </View>
                <View as="div" textAlign="center">
                  <Text>Need to make a quick mindmap?</Text>
                </View>
              </Flex.Item>
              <Flex.Item padding="small">
                <img src={MindMapIcon} alt="Gantt Icon" width="250px" />
              </Flex.Item>
              <Flex.Item padding="small">
                <Text as="div" size="large" textAlign="center">
                  {APPNAME} is the place to {APPNAME}-it!
                </Text>
              </Flex.Item>
            </Flex>
          </View>
          <Flex
            wrap="wrap"
            direction="row"
            alignItems="center"
            justifyItems="center"
            padding="medium"
          >
            <Flex.Item textAlign="center" size="400px" shouldShrink shouldGrow>
              <Card
                heading={"How to Get Started"}
                body={
                  <Text>
                    <p>
                      Getting started on {APPNAME} is easy. Simply choose your
                      sign up option and create your first mindmap.
                    </p>
                    <Button
                      onClick={() => navigate("/signup")}
                      icon={IconPlusLine}
                      color="primary"
                    >
                      Join Now
                    </Button>
                  </Text>
                }
              />
            </Flex.Item>
            <Flex.Item textAlign="center" size="400px" shouldShrink shouldGrow>
              <Card
                heading={"What We Offer"}
                body={
                  <Text>
                    A platform for users to create simple mindmaps and share
                    them with others.
                  </Text>
                }
              />
            </Flex.Item>
            <Flex.Item textAlign="center" size="400px" shouldShrink shouldGrow>
              <Card
                heading={"Sign Up Options"}
                body={
                  <Text>
                    <Link onClick={() => navigate("/signup")}>
                      Sign up with email
                    </Link>{" "}
                    to create a secure account to save your mindmaps.
                  </Text>
                }
              />
            </Flex.Item>

            <Flex.Item textAlign="center" size="400px" shouldShrink shouldGrow>
              <Card
                heading={"Our Mission"}
                body={
                  <Text>
                    At {APPNAME}, we believe that sometimes you just need to
                    create a mindmap without learning a new platform,
                    terminology and religion. We want to make it easy for you to
                    create a mindmap without having to pay for a complicated
                    software.
                  </Text>
                }
              />
            </Flex.Item>
            {/* <Flex.Item textAlign="center" size="400px" shouldShrink shouldGrow>
            <Card
              heading="Contact Us"
              body={
                <Text>
                  If you have any questions or feedback about {APPNAME}, please
                  don't hesitate to{" "}
                  <Link onClick={() => navigate("/contact")}>contact us</Link>.
                  We'd love to hear from you!
                </Text>
              }
            />
          </Flex.Item> */}
          </Flex>
        </View>
      </Flex.Item>
      <Flex.Item>
        <View as="div" textAlign="center" margin="small">
          <View as="div" textAlign="center" padding="xx-small">
            <Text>
              <Link onClick={() => navigate("/about")}>About</Link> |{" "}
              <Link onClick={() => navigate("/privacy")}>Privacy</Link> |{" "}
              <Link onClick={() => navigate("/terms")}>Terms</Link>
            </Text>
          </View>
          <View as="div" textAlign="center" padding="xx-small">
            <Text>© 2023 {APPNAME}</Text>
          </View>
        </View>
      </Flex.Item>
    </Flex>
  );
}

function Card(props) {
  const { heading, photo, body } = props;

  return (
    <View
      className="card"
      as="div"
      padding="x-small"
      margin="x-small"
      textAlign="center"
      minHeight={200}
    >
      <Flex direction="column" alignItems="center" justifyItems="center">
        <Flex.Item padding="small">
          <View as="div">
            <Heading level="h4" textAlign="center">
              {heading}
            </Heading>
          </View>
        </Flex.Item>
        {photo && (
          <Flex.Item padding="small">
            <img src={photo} alt="Gantt Icon" width="50px" />
          </Flex.Item>
        )}
        <Flex.Item padding="small">{body}</Flex.Item>
      </Flex>
    </View>
  );
}
