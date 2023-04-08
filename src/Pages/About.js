import React from "react";
import { View } from "@instructure/ui-view";
import { Heading } from "@instructure/ui-heading";

import { APPNAME } from "../App";

export default function About(props) {
  const contactInformation = "[contact info soon]";
  return (
    <View as="div" padding="medium">
      <Heading margin="medium" level="h1">
        About
      </Heading>
      <View as="div" margin="medium">
        <p>
          <strong>Introduction:</strong>
        </p>
        <p>
          Welcome to {APPNAME}, where our mission is to create a platform where
          users can simply create a mindmap. There's too many complicated
          software out there for a fee.
        </p>
        <p>
          <strong>Our Mission:</strong>
        </p>
        <p>
          At {APPNAME}, we believe that sometimes you just need to create a
          mindmaps. We want to make it easy for you to create a mindmap without
          having to pay for a complicated software.
        </p>
        <p>
          <strong>Our Team:</strong>
        </p>
        <p>
          {APPNAME} is developed by a developer who is passionate about
          programming and creating useful tools for people. We are a small team
          of one, and we are excited to bring you {APPNAME}.
        </p>
        <p>
          <strong>Our History:</strong>
        </p>
        <p>
          {APPNAME} is a brand new platform, and we are excited to bring you
          {APPNAME}.
        </p>
        {/* <p>
          <strong>Contact Us:</strong>
        </p>
        <p>
          We would love to hear from you! If you have any questions, comments,
          or feedback, please don't hesitate to reach out to us at{" "}
          {contactInformation}.
        </p> */}
        <p>
          <strong>Privacy Policy:</strong>
        </p>
        <p>
          Your privacy is important to us. Please take a moment to review our
          Privacy Policy to understand how we handle your personal information.
        </p>
        <p>
          <strong>Terms and Conditions:</strong>
        </p>
        <p>
          By using {APPNAME}, you agree to abide by our Terms and Conditions.
          Please take a moment to review these terms to understand the rules and
          guidelines for using our platform.
        </p>
        <p>
          <strong>Disclaimer:</strong>
        </p>
        <p>
          {APPNAME} is provided on an "as is" basis and makes no warranties of
          any kind, whether express or implied. Use of the platform is at your
          own risk, and {APPNAME} will not be liable for any damages arising
          from the use of the platform.
        </p>
      </View>
    </View>
  );
}
