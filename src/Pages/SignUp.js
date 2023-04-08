import React, { useState, useEffect } from "react";
import { FormField } from "@instructure/ui-form-field";
import { View } from "@instructure/ui-view";
import { TextInput } from "@instructure/ui-text-input";
import { Button } from "@instructure/ui-buttons";
import { Link } from "@instructure/ui-link";
import { Text } from "@instructure/ui-text";
import { info } from "@instructure/console";

import { authApp } from "../Firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
/**
 * Firebase sign up form email login
 */

export default function SignUp(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const [user, loading, error] = useAuthState(authApp.auth);

  /*
    If user is already signed in, take them to their profile
  */
  useEffect(() => {
    if (user) {
      navigate(location.state?.from || "/profile", { replace: true });
    }
  }, [user, navigate, location]);

  const handleEmailSignUp = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    authApp
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        info(user);
        navigate(location.state?.from || "/", { replace: true });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <View as="div" margin="medium">
      <View as="div" borderWidth="small" padding="medium" textAlign="center">
        <strong>Email Sign Up</strong>
        <form onSubmit={handleEmailSignUp}>
          <View as="div" padding="small">
            <FormField label="Email" layout="stacked" htmlFor="email" required>
              <TextInput
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormField>
          </View>
          <View as="div" padding="small">
            <FormField
              label="Password"
              layout="stacked"
              htmlFor="password"
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
          <View as="div" padding="small">
            <FormField
              label="Confirm Password"
              layout="stacked"
              htmlFor="password"
              required
            >
              <TextInput
                label="Confirm Password"
                value={confirmPassword}
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormField>
          </View>
          <View as="div" padding="small">
            <Button type="submit" color="primary">
              Sign Up
            </Button>
          </View>
        </form>
        <View as="div" padding="small">
          <Link
            onClick={() => {
              navigate("/login");
            }}
          >
            Already have an account? Log in
          </Link>
        </View>
        {errorMessage && (
          <View as="div" padding="small">
            <Text color="danger">{errorMessage}</Text>
          </View>
        )}
      </View>
    </View>
  );
}
