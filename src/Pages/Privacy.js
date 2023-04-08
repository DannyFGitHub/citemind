import React from "react";
import { Link } from "@instructure/ui-link";
import { useNavigate, Outlet, Router, Routes } from "react-router-dom";
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

export default function Privacy(props) {
  return (
    <View as="div" padding="medium">
      <View as="div" margin="medium">
        <Heading level="h1">Privacy Policy</Heading>
      </View>
      <View as="div" margin="medium">
        <Text>
          <p>
            <strong>Introduction</strong>
          </p>
          {APPNAME} is committed to protecting the privacy of its users. This
          Privacy Policy outlines the information that we collect, how we use
          it, and how we protect it. By using the Service, you agree to the
          terms of this Privacy Policy.
        </Text>
      </View>
      <View as="div" margin="medium">
        <Text>
          <p>
            <strong>Information Collection</strong>
          </p>
          {APPNAME} collects the following information from users:
        </Text>
      </View>
      <View as="div" margin="medium">
        <List>
          <List.Item>
            Submitted Gantt charts, its contents and responses submitted through
            the Service
          </List.Item>
          <List.Item>Email address (for registered users only)</List.Item>
          <List.Item>
            Any additional information that may be voluntarily submitted by the
            user
          </List.Item>
        </List>
      </View>
      <View as="div" margin="medium">
        <Text>
          <p>
            <strong>Information Use</strong>
          </p>
          The information collected by {APPNAME} is used to provide the Service
          and to improve the user experience. {APPNAME}
          may use the email address provided by the user to communicate with
          them about the Service or to send notifications.
        </Text>
      </View>
      <View as="div" margin="medium">
        <Text>
          <p>
            <strong>Information Sharing</strong>
          </p>
          {APPNAME} will not sell, rent, or share the user’s information with
          any third party, except as necessary to provide the Service or as
          required by law.
        </Text>
      </View>
      <View as="div" margin="medium">
        <Text>
          <p>
            <strong>Data Security</strong>
          </p>
          {APPNAME} takes reasonable measures to protect the security of the
          user’s information, but cannot guarantee its absolute security.
        </Text>
      </View>
      <View as="div" margin="medium">
        <Text>
          <p>
            <strong>Changes to the Privacy Policy</strong>
          </p>
          {APPNAME} reserves the right to modify this Privacy Policy at any
          time, and your continued use of the Service after any modifications
          constitutes acceptance of the new Privacy Policy.
        </Text>
      </View>
    </View>
  );
}
