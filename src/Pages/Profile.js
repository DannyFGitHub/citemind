import React from "react";
import {
  Button,
  FormField,
  IconButton,
  TextInput,
  View,
} from "@instructure/ui";
import { useNavigate } from "react-router-dom";
import { error } from "@instructure/console";
import { authApp } from "../Firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Heading } from "@instructure/ui-heading";
import { Editable } from "@instructure/ui-editable";
import { Text } from "@instructure/ui-text";
import { Flex, FlexItem } from "@instructure/ui-flex";
import { IconCertifiedLine } from "@instructure/ui-icons";
import { Outlet } from "react-router-dom";

export default function Profile(props) {
  const navigate = useNavigate();

  const [user, loading, error] = useAuthState(authApp.auth);
  const [emailEditMode, setEmailEditMode] = React.useState("view");
  const [email, setEmail] = React.useState(user?.email);

  const [message, setMessage] = React.useState("");

  function handleSignOut() {
    authApp.signOut().then(
      () => {
        navigate("/login");
      },
      function (e) {
        error(e);
      }
    );
  }

  function renderButton({ isVisible, onClick, onFocus, onBlur, buttonRef }) {
    // To correctly handle focus, always return the Button, but
    // only visible if isVisible (if you want the UI to work in the standard way)
    return (
      <span style={{ opacity: isVisible ? 1 : 0 }}>
        <Button
          size="small"
          margin="0 0 0 x-small"
          onClick={onClick}
          onFocus={onFocus}
          onBlur={onBlur}
          elementRef={buttonRef}
        >
          Change
        </Button>
      </span>
    );
  }

  return (
    <View as="div" padding="medium" height={"100%"}>
      <View as="div" margin="medium">
        <Heading level="h1">Profile</Heading>
      </View>
      {user?.isAnonymous ? (
        <View as="div" margin="medium">
          <Heading level="h2">Guest User</Heading>
        </View>
      ) : (
        <View
          as="div"
          display="inline-block"
          maxWidth="25rem"
          margin="small"
          padding="large"
          background="primary"
          shadow="resting"
        >
          {/* Add Ability to Reset Password from here and the ability to change the email */}
          {user?.photoURL && (
            <View as="div" margin="medium">
              <img
                width={"100px"}
                src={user?.photoURL}
                alt={user?.displayName}
              />
            </View>
          )}
          {user?.displayName && (
            <View as="div" margin="medium">
              <FormField layout="stacked" label="Name">
                <Text>{user?.displayName}</Text>
              </FormField>
            </View>
          )}
          <View as="div" margin="medium">
            <Editable
              mode={emailEditMode}
              onChangeMode={(mode) => setEmailEditMode(mode)}
              render={({
                mode,
                getContainerProps,
                getViewerProps,
                getEditorProps,
                getEditButtonProps,
              }) => {
                return (
                  <View {...getContainerProps()}>
                    {mode === "view" ? (
                      <FormField layout="stacked" label="Email">
                        <Text {...getViewerProps()}>{user?.email}</Text>
                      </FormField>
                    ) : null}
                    {mode === "edit" ? (
                      <FormField layout="stacked" label="Email">
                        <TextInput
                          label="Email"
                          width="500"
                          readOnly={mode === "view"}
                          ref={getEditorProps().editorRef}
                          onBlur={getEditorProps().onBlur}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </FormField>
                    ) : null}
                    {/* {renderButton(getEditButtonProps())} */}
                    {user?.emailVerified ? (
                      <Flex
                        as="div"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <FlexItem>
                          <Text color="success">Verified</Text>
                        </FlexItem>
                        <FlexItem padding="xx-small">
                          <IconCertifiedLine color="success" size="x-small" />
                        </FlexItem>
                      </Flex>
                    ) : (
                      ""
                    )}
                  </View>
                );
              }}
            />
          </View>
        </View>
      )}

      <View as="div" margin="medium">
        <Button
          margin="x-small"
          onClick={() =>
            authApp
              .sendPasswordResetEmail(user?.email)
              .then(() => {
                setMessage("Password Reset Email Sent");
              })
              .catch((e) => {
                setMessage("Password Reset Email couldn't be sent");
              })
          }
        >
          Reset Password
        </Button>
        {!user?.emailVerified && (
          <Button
            margin="x-small"
            onClick={() =>
              authApp
                .sendEmailVerification()
                .then(() => {
                  setMessage("Verification Email Sent");
                })
                .catch((e) => {
                  setMessage("Verification Email couldn't be sent");
                })
            }
          >
            Send Verification Email
          </Button>
        )}
        <Button
          margin="x-small"
          onClick={() => {
            navigate("/profile/photo");
          }}
        >
          Edit Photo
        </Button>
        <Button margin="x-small" onClick={handleSignOut}>
          Sign Out
        </Button>
      </View>
      <View as="div" margin="medium">
        <Text>{message}</Text>
      </View>
      <Outlet />
    </View>
  );
}
