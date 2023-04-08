import NavBar, { MainMenuNavBar } from "../Components/NavBar";
import { View } from "@instructure/ui-view";
import { Flex, FlexItem } from "@instructure/ui-flex";
import { Outlet } from "react-router-dom";

export default function MainScreen(props) {
  return (
    <Flex height={"100%"} direction="column">
      <FlexItem>
        <MainMenuNavBar />
      </FlexItem>
      <FlexItem shouldGrow shouldShrink>
        <Outlet />
      </FlexItem>
    </Flex>
  );
}
