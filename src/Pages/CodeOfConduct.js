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

export default function CodeOfConduct(props) {
  const navigate = useNavigate();
  return (
    <View as="div" padding="medium">
      <View as="div" margin="medium">
        <Heading level="h1">Code of Conduct</Heading>
      </View>
      <View as="div" margin="medium">
        <Text>
          <p>
            <strong>Introduction</strong>
          </p>
          <p>
            {APPNAME} is a community-driven platform that aims to provide a safe
            and respectful environment for all users. This Code of Conduct
            outlines the behavior that is expected of users and the consequences
            for violating these expectations. By using the Service, you agree to
            abide by this Code of Conduct.
          </p>
          <p>
            <strong>Respectful Behavior</strong>
          </p>
          <p>
            {APPNAME} expects users to be respectful and considerate of others.
            This includes refraining from using language that is abusive,
            obscene, defamatory, or otherwise inappropriate.
          </p>
          <p>
            <strong>Prohibited Content</strong>
          </p>
          <p>
            {APPNAME} prohibits the submission of content that is illegal,
            abusive, obscene, defamatory, or otherwise inappropriate. {APPNAME}{" "}
            reserves the right to remove any content that violates this Code of
            Conduct.
          </p>
          <p>
            <strong>Consequences of Violations</strong>
          </p>
          <p>
            Users who violate this Code of Conduct may have their posts and/or
            responses removed and may be subject to temporary or permanent
            suspension from the Service.
          </p>
          <p>
            <strong>Changes to the Code of Conduct</strong>
          </p>
          <p>
            {APPNAME} reserves the right to modify this Code of Conduct at any
            time, and your continued use of the Service after any modifications
            constitutes acceptance of the new Code of Conduct.
          </p>
        </Text>
      </View>
    </View>
  );
}
