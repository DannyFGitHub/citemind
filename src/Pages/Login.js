import React, { useEffect, useState } from "react";
import { View } from "@instructure/ui-view";
import { Flex } from "@instructure/ui-flex";
import { Text } from "@instructure/ui-text";
import { TextInput } from "@instructure/ui-text-input";
import { Button } from "@instructure/ui-buttons";
import { Link } from "@instructure/ui-link";
import { info } from "@instructure/console";
import { useNavigate, useLocation } from "react-router-dom";
import { Heading } from "@instructure/ui";
import {
  FormField,
  FormFieldMessage,
  FormFieldLayout,
} from "@instructure/ui-form-field";

import { authApp, dbApp } from "../Firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, loading, error] = useAuthState(authApp.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  /*
    If user is already signed in, take them to their profile
  */
  useEffect(() => {
    if (user) {
      navigate(location.state?.from || "/profile", { replace: true });
    }
  }, [user, navigate, location]);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  }, [errorMessage]);

  const handleEmailLogin = (event) => {
    event.preventDefault();
    if (email !== "" && password !== "") {
      authApp
        .signInWithEmailAndPassword(email, password)
        .then((loggedInUser) => {
          info(loggedInUser);
          navigate(location.state?.from || "/", { replace: true });
        })
        .catch((error) => {
          let formattedErrorMessage = (error.message + "")
            .replace("Firebase: ", "")
            .replace("Error ", "")
            .replace("auth/", "")
            .replace(/-|[().]/g, " ")
            .trim();

          formattedErrorMessage =
            formattedErrorMessage.charAt(0).toUpperCase() +
            formattedErrorMessage.slice(1);

          setErrorMessage(formattedErrorMessage);
        });
    } else {
      setErrorMessage("Please enter an email and password");
    }
  };

  const handleAnonymousLogin = () => {
    authApp
      .signInAnonymously()
      .then((user) => {
        info(user);
        navigate(location.state?.from || "/", { replace: true });
      })
      .catch((error) => {
        let formattedErrorMessage = (error.message + "")
          .replace("Firebase: ", "")
          .replace("Error ", "")
          .replace("auth/", "")
          .replace(/-|[().]/g, " ")
          .trim();

        formattedErrorMessage =
          formattedErrorMessage.charAt(0).toUpperCase() +
          formattedErrorMessage.slice(1);

        setErrorMessage(formattedErrorMessage);
      });
  };

  return (
    <View as="div" padding="medium">
      <Heading level="h1" margin="medium">
        Login
      </Heading>
      <Flex direction="column" justifyItems="center" alignItems="center">
        <Flex.Item align="center" textAlign="center" padding="small">
          <form onSubmit={handleEmailLogin}>
            <View as="div" margin="x-small">
              <FormField
                id="login-email-field"
                label="Email"
                layout="stacked"
                htmlFor="email"
                type="email"
                required
              >
                <TextInput
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormField>
            </View>
            <View as="div" margin="x-small">
              <FormField
                id="password-email-field"
                label="Password"
                layout="stacked"
                htmlFor="password"
                type="password"
                required
              >
                <TextInput
                  label="Password"
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormField>
            </View>
            <Button color="primary" margin="small" type="submit">
              Login
            </Button>
            {errorMessage && (
              <FormFieldMessage variant="error">
                {(errorMessage + "")
                  .replace("Firebase: ", "")
                  .replace("Error ", "")
                  .replace("auth/", "")
                  .replace(/-|[().]/g, " ")}
              </FormFieldMessage>
            )}
          </form>
        </Flex.Item>
        <Flex.Item>
          <Link margin="small" onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </Link>
        </Flex.Item>
        <Flex.Item>
          <Link
            margin="small"
            onClick={() =>
              navigate("/signup", {
                state: { from: location },
                replace: true,
              })
            }
          >
            Sign Up
          </Link>
        </Flex.Item>
        <Flex.Item>
          <Text margin="small">OR</Text>
        </Flex.Item>
        <Flex.Item>
          <Button
            margin="medium"
            onClick={handleAnonymousLogin}
            color="primary"
          >
            Guest Login
          </Button>
        </Flex.Item>
      </Flex>
    </View>
  );
};

export default LoginPage;
