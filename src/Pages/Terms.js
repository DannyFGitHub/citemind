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

export default function Terms(props) {
  const contactInformation = "[coming soon]";

  return (
    <View as="div" padding="medium">
      <View as="div" margin="medium">
        <Heading level="h1">Terms and Conditions of Use</Heading>
      </View>
      <View as="div" margin="medium">
        <Text>
          <p>
            <strong>Introduction</strong>
          </p>
          <p>
            Welcome to {APPNAME}, a web application (“Service”) that allows
            users to submit posts and receive responses from other users. These
            terms and conditions (“Terms”) govern your use of the Service. By
            accessing or using the Service, you agree to be bound by these
            Terms. If you do not agree to these Terms, please do not use the
            Service.
          </p>
          <p>
            <strong>User Content</strong>
          </p>
          <p>
            {APPNAME} provides a platform for users to submit posts for others
            to see. The Service does not endorse or guarantee the accuracy,
            completeness, or usefulness of any user content, and users may be
            exposed to content that is offensive or inappropriate. You agree not
            to use the Service to submit any material that is illegal, abusive,
            obscene, defamatory, or otherwise inappropriate.
          </p>
          <p>
            <strong>Moderation</strong>
          </p>
          <p>
            {APPNAME} may moderate user content, but does not guarantee perfect
            moderation. The Service reserves the right to remove any user
            content that violates these Terms or is deemed inappropriate.
          </p>
          <p>
            <strong>Public Content</strong>
          </p>
          <p>
            All posts and responses submitted through the Service are public and
            may be viewed by other users. Once submitted, these posts and
            responses cannot be removed from the Service.
          </p>
          <p>
            <strong>Access to “My Posts”</strong>
          </p>
          <p>
            Clearing your cache will result in loss of access to the “My Posts”
            page, but posts can still be found on the public feed when
            searching.
          </p>
          <p>
            <strong>Disclaimer of Warranties</strong>
          </p>
          <p>
            The Service is provided on an “as is” basis, and {APPNAME} makes no
            warranties of any kind, whether express or implied, including but
            not limited to warranties of merchantability, fitness for a
            particular purpose, and non-infringement.
          </p>
          <p>
            <strong>Limitation of Liability</strong>
          </p>
          <p>
            {APPNAME} will not be liable for any damages arising from the use of
            the Service, including but not limited to direct, indirect,
            incidental, punitive, and consequential damages.
          </p>
          <p>
            <strong>Changes to the Terms</strong>
          </p>
          <p>
            {APPNAME} reserves the right to modify these Terms at any time, and
            your continued use of the Service after any modifications
            constitutes acceptance of the new Terms.
          </p>
          <p>
            <strong>Termination</strong>
          </p>
          <p>
            {APPNAME} reserves the right to terminate your use of the Service at
            any time, with or without notice, for any reason.
          </p>
          <p>
            <strong>Dispute Resolution</strong>
          </p>
          <p>
            Any disputes arising from or relating to these Terms or the Service
            will be resolved through arbitration in accordance with [arbitration
            rules]. Any award from the arbitration may be entered as a judgment
            in any court with jurisdiction.
          </p>
          {/* <p>
            <strong>Contact Information</strong>
          </p>
          <p>
            If you have any questions about these Terms, please contact
            {APPNAME} at {contactInformation}.
          </p> */}
        </Text>
      </View>

      {/* <View as="div" margin="medium">
        <p>
          <strong>Licenses</strong>
        </p>
        <View as="div" margin="medium">
          <p>
            <strong>{"License Name"}</strong>
          </p>
          <p>{"License Body"}</p>
        </View>
      </View> */}
    </View>
  );
}
