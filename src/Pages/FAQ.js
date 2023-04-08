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

export default function FAQ(props) {
  const navigate = useNavigate();
  return (
    <View as="div" padding="medium">
      <View as="div" margin="medium">
        <Heading level="h1">Frequently Asked Questions</Heading>
      </View>
      <View as="div" margin="medium">
        <p>
          <strong>What is {APPNAME}?</strong>
        </p>
        <p>
          {APPNAME} is a web application that allows users to create mindmaps
          easily. Our goal is to provide a space for users to create mindmaps
          and share them just as easily.
        </p>
        <p>
          <strong>How do I use {APPNAME}?</strong>
        </p>
        <p>
          To use {APPNAME}, simply create an account and start a new mindmap. We
          hope the easy drag and drop and intuitive features will allow you to
          focus on create mindmaps.
        </p>
        <p>
          <strong>What if I sign in as a Guest?</strong>
        </p>
        <p>
          If you sign in as a guest, you will not be able to access your profile
          when you clear your cache or sign out. You will still be able to see
          public mindmaps, but you will not be able to create.
        </p>
        <p>
          <strong>Is it free to use {APPNAME}?</strong>
        </p>
        <p>Yes, {APPNAME} is completely free to use whilst in Beta.</p>
        <p>
          <strong>What is the purpose of {APPNAME}?</strong>
        </p>
        <p>
          The purpose of {APPNAME} is to allow users to create and share
          mindmaps. Our mission is to provide a platform for users to easily
          create mindmaps.
        </p>
        <p>
          <strong>Who can use {APPNAME}?</strong>
        </p>
        <p>
          Anyone can use {APPNAME}, as long as they agree to follow our terms
          and conditions.
        </p>
        <p>
          <strong>How does {APPNAME} moderate content?</strong>
        </p>
        <p>
          {APPNAME} may moderate user content, but does not guarantee perfect
          moderation. We reserve the right to remove any user content that
          violates our terms and conditions or is deemed inappropriate.
        </p>
        <p>
          <strong>Are my posts and responses private?</strong>
        </p>
        <p>
          Users may choose whether to set their mindmaps to private or public. A
          public mindmap can be shared with anyone via a non-guessable link.
          Whilst a private mindmap cannot be shared to another user.
        </p>
        <p>
          <strong>What if I have questions or need help?</strong>
        </p>
        <p>
          If you have questions or need help, you can contact us through the
          "Contact Us" page. We will be happy to assist you.
        </p>

        <p>
          We hope this FAQ helps answer any questions you may have about
          {APPNAME}. If you have any further questions, please don't hesitate to
          reach out to us.
        </p>
      </View>
    </View>
  );
}
