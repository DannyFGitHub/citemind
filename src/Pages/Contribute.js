import React from "react";
import { Link } from "@instructure/ui-link";
import { useNavigate } from "react-router-dom";
import { View } from "@instructure/ui-view";
import { Text } from "@instructure/ui-text";
import { Heading } from "@instructure/ui-heading";
import { List } from "@instructure/ui-list";
import { Button } from "@instructure/ui-buttons";
import { IconPlusLine } from "@instructure/ui-icons";
import { IconSearchLine } from "@instructure/ui-icons";
import { IconQuestionLine } from "@instructure/ui-icons";
import { IconInfoLine } from "@instructure/ui-icons";
import { IconUserLine } from "@instructure/ui-icons";
import { IconChatLine } from "@instructure/ui-icons";
import { IconCommentLine } from "@instructure/ui-icons";
import { IconArrowOpenEndLine } from "@instructure/ui-icons";
import { IconArrowOpenStartLine } from "@instructure/ui-icons";
import { IconArrowOpenDownLine } from "@instructure/ui-icons";

import { APPNAME } from "../App";

export default function Contribute(props) {
  const navigate = useNavigate();

  return (
    <View as="div" padding="medium">
      <View as="div" margin="medium">
        <Heading level="h1">Contribute</Heading>
      </View>
      <View as="div" margin="medium">
        <Text>
          <p>
            Welcome to the {APPNAME} Contribute page! Our platform was created
            to create mindmaps. We believe in the importance of community,
            support, and inspiration, and we're grateful for every person who
            supports our mission.
          </p>
          <p>
            {APPNAME} is starting out and relies on the generosity of our users
            to help us keep the platform running. Your donation will help us
            maintain our servers, improve the user experience, and provide
            support for our community.
          </p>
          <p>
            When you make a donation to {APPNAME}, you're supporting the
            community of users who simply just wnat to mindmap. Your donation
            will help us:
          </p>
          <List margin="medium">
            <List.Item>
              <Text>
                Maintain and improve our servers, ensuring that {APPNAME} is
                always available and reliable
              </Text>
            </List.Item>
            <List.Item>
              <Text>
                Develop new features and improve the user experience, making it
                easier for people to create mindmaps and share.
              </Text>
            </List.Item>
            <List.Item>
              <Text>
                Support our community and provide resources for users who need
                help or have questions
              </Text>
            </List.Item>
          </List>
          <p>
            Donating to {APPNAME} is easy and secure. Simply click on the
            "Donate" button below and follow the instructions to make a
            contribution. You can choose to make a one-time donation or set up a
            recurring contribution to help support {APPNAME} on an ongoing
            basis.
          </p>
          <p>
            Every donation, no matter the size, makes a difference and helps us
            continue. Thank you for your support!
          </p>
          <p>
            <Button
              onClick={() => {
                navigate("/donate");
              }}
            >
              Donate Now
            </Button>
          </p>
          <p>
            Your privacy is important to us. Please take a moment to review our
            Privacy Policy to understand how we handle your personal
            information.
          </p>
        </Text>
      </View>
    </View>
  );
}
