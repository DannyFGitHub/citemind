import React from "react";
import { TopNavBar } from "@instructure/ui-top-nav-bar";
import { IconUserLine } from "@instructure/ui-icons";
import { View } from "@instructure/ui-view";
import { Img } from "@instructure/ui-img";
import { useLocation, useNavigate } from "react-router-dom";
import { Text } from "@instructure/ui-text";

import { authApp } from "../Firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { APPNAME } from "../App";

export function MainMenuNavBar(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(authApp.auth);

  const [isSmallViewportMenuOpen, setIsSmallViewportMenuOpen] =
    React.useState(false);

  const [isSecondaryNavigation, setIsSecondaryNavigation] =
    React.useState(false);

  return (
    <View as="div">
      <TopNavBar breakpoint="650" mediaQueryMatch="element" inverseColor={true}>
        {({ currentLayout, inverseColor }) => {
          return (
            <TopNavBar.Layout
              navLabel="Main Navigation Bar"
              renderBrand={
                <TopNavBar.Brand
                  screenReaderLabel="Brand name"
                  href="#/"
                  renderName={
                    <View as="div" minWidth="5rem">
                      <Text
                        as="div"
                        color={inverseColor ? "brand" : "primary-inverse"}
                        transform="uppercase"
                        size="small"
                        weight="bold"
                        lineHeight="condensed"
                      >
                        Simply
                      </Text>
                      <Text
                        as="div"
                        color={inverseColor ? "primary" : "primary-inverse"}
                        size="large"
                        weight="normal"
                        lineHeight="condensed"
                      >
                        {APPNAME}
                      </Text>
                    </View>
                  }
                  renderIcon={
                    <View
                      as="div"
                      display="flex"
                      width="50px"
                      height="50px"
                      textAlign="center"
                      justifyItems="center"
                    >
                      <Img
                        src={process.env.PUBLIC_URL + "/logo512.png"}
                        alt="logo"
                        constrain="contain"
                      />
                    </View>
                  }
                />
              }
              renderMenuItems={
                <TopNavBar.MenuItems
                  listLabel="Page navigation"
                  currentPageId={location.pathname}
                  renderHiddenItemsMenuTriggerLabel={(hiddenChildrenCount) =>
                    //`${hiddenChildrenCount} More`
                    "More"
                  }
                >
                  <TopNavBar.Item
                    id="/app"
                    onClick={() => navigate("/app")}
                    renderLabel="App"
                    isSelected={location.pathname === "/app"}
                  >
                    App
                  </TopNavBar.Item>
                  <TopNavBar.Item
                    id="/about"
                    onClick={() => navigate("/about")}
                    renderLabel="About"
                    isSelected={location.pathname === "/about"}
                  >
                    About
                  </TopNavBar.Item>
                  <TopNavBar.Item
                    id="/faq"
                    onClick={() => navigate("/faq")}
                    renderLabel="FAQ"
                    isSelected={location.pathname === "/faq"}
                  >
                    FAQ
                  </TopNavBar.Item>
                  <TopNavBar.Item
                    id="/contribute"
                    onClick={() => navigate("/contribute")}
                    renderLabel="Contribute"
                    isSelected={location.pathname === "/contribute"}
                  >
                    Contibute
                  </TopNavBar.Item>
                  <TopNavBar.Item
                    id="/code-of-conduct"
                    onClick={() => navigate("/code-of-conduct")}
                    renderLabel="Code Of Conduct"
                    isSelected={location.pathname === "/code-of-conduct"}
                  >
                    Code Of Conduct
                  </TopNavBar.Item>
                  <TopNavBar.Item
                    id="/privacy"
                    onClick={() => navigate("/privacy")}
                    renderLabel="Privacy"
                    isSelected={location.pathname === "/privacy"}
                  >
                    Privacy
                  </TopNavBar.Item>
                  <TopNavBar.Item
                    id="/terms"
                    onClick={() => navigate("/terms")}
                    renderLabel="Terms"
                    isSelected={location.pathname === "/terms"}
                  >
                    Terms
                  </TopNavBar.Item>
                </TopNavBar.MenuItems>
              }
              renderUser={
                <TopNavBar.User>
                  {!user ? (
                    <TopNavBar.Item
                      id="/profile"
                      variant="default"
                      screenReaderLabel="Profile"
                      onClick={() => navigate("/profile")}
                    >
                      Log In/Sign Up
                    </TopNavBar.Item>
                  ) : user?.isAnonymous ? (
                    <TopNavBar.Item
                      id="/profile"
                      variant="avatar"
                      onClick={() => navigate("/profile")}
                      screenReaderLabel="Profile"
                      renderAvatar={{
                        avatarName: "Guest",
                        avatarSrc: process.env.PUBLIC_URL + "/avatar.png",
                      }}
                    >
                      Profile
                    </TopNavBar.Item>
                  ) : (
                    <TopNavBar.Item
                      id="/profile"
                      variant="avatar"
                      onClick={() => navigate("/profile")}
                      screenReaderLabel="Profile"
                      renderAvatar={{
                        avatarName: user?.email?.split("@")[0] ?? "",
                        avatarSrc:
                          user?.photoURL ??
                          process.env.PUBLIC_URL + "/avatar.png",
                      }}
                    >
                      Profile
                    </TopNavBar.Item>
                  )}
                </TopNavBar.User>
              }
            />
          );
        }}
      </TopNavBar>
    </View>
  );
}
