import React, { useEffect, useState } from "react";
import { View } from "@instructure/ui-view";
import { Flex } from "@instructure/ui-flex";
import { Text } from "@instructure/ui-text";
import { TextInput } from "@instructure/ui-text-input";
import { Button } from "@instructure/ui-buttons";
import { useNavigate, useLocation } from "react-router-dom";
import { Heading } from "@instructure/ui";
import {
  FormField,
  FormFieldMessage,
  FormFieldLayout,
} from "@instructure/ui-form-field";

import { authApp } from "../Firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function ForgotPassword(props) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState();

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  }, [message]);

  const handleForgotPassword = (event) => {
    event.preventDefault();
    if (email !== "") {
      authApp
        .sendPasswordResetEmail(email)
        .then(() => {
          setMessage([{ text: "Email sent!", type: "success" }]);
        })
        .catch((error) => {
          setMessage([{ text: error.message, type: "error" }]);
        });
    } else {
      setMessage([{ text: "Please enter an email", type: "error" }]);
    }
  };

  return (
    <View as="div" padding="medium">
      <Heading level="h1" margin="medium">
        Forgot Password
      </Heading>
      <Flex direction="column" justifyItems="center" alignItems="center">
        <Flex.Item align="center" textAlign="center" padding="small">
          <form onSubmit={handleForgotPassword}>
            <Text>
              Enter your email address and we'll send you a link to reset your
              password.
            </Text>
            <View as="div" margin="small">
              <FormField label="" layout="stacked" messages={message} required>
                <TextInput
                  type="email"
                  placeholder="Email"
                  value={props.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormField>
            </View>
            <Button type="submit" color="primary" margin="small">
              Send Reset Email
            </Button>
          </form>
        </Flex.Item>
      </Flex>
    </View>
  );
}
