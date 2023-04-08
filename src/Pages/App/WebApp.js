import React from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { View } from "@instructure/ui-view";

export default function WebApp(props) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <View as="div" padding="medium" height={"100%"}>
      <Outlet />
    </View>
  );
}
