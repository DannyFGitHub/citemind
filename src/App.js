import React, { useEffect, useState } from "react";

import {
  InstUISettingsProvider,
  canvas,
  instructure,
  canvasHighContrast,
} from "@instructure/ui";
// import { InstUISettingsProvider } from '@instructure/emotion'
// import { instructure } from "@instructure/ui-themes";
import { info } from "@instructure/console";
import { Spinner } from "@instructure/ui-spinner";

import { View } from "@instructure/ui-view";

import About from "./Pages/About";
import Contribute from "./Pages/Contribute";
import FAQ from "./Pages/FAQ";
import Landing from "./Pages/Landing";
import Privacy from "./Pages/Privacy";
import Terms from "./Pages/Terms";
import Profile from "./Pages/Profile";
import WebApp from "./Pages/App/WebApp";
import Error from "./Pages/Error";
import LoginPage from "./Pages/Login";
import MainScreen from "./Screens/MainScreen";
import SignUp from "./Pages/SignUp";
import Dashboard from "./Pages/App/Dashboard";
import ForgotPassword from "./Pages/ForgotPassword";
import CodeOfConduct from "./Pages/CodeOfConduct";
import Donation from "./Pages/Donation";

import ProtectedPage from "./Components/Navigation/ProtectedPage";

import {
  Route,
  createHashRouter,
  RouterProvider,
  createRoutesFromElements,
  Outlet,
} from "react-router-dom";

import ProfilePhotoChooser from "./Components/ProfilePhotoChooser";
import Gantt from "./Pages/App/Gantt";

export const APPNAME = "CiteMind";

const router = createHashRouter(
  createRoutesFromElements([
    <Route path="/" element={<MainScreen />} errorElement={<Error />}>
      <Route path="/" element={<Landing />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="about" element={<About />} />
      <Route path="contribute" element={<Contribute />} />
      <Route path="faq" element={<FAQ />} />
      <Route path="privacy" element={<Privacy />} />
      <Route path="terms" element={<Terms />} />
      <Route path="code-of-conduct" element={<CodeOfConduct />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route
        path="profile"
        element={
          <ProtectedPage>
            <Profile />
          </ProtectedPage>
        }
      />
      <Route
        path="donate"
        element={
          <ProtectedPage>
            <Donation />
          </ProtectedPage>
        }
      />
      <Route
        path="/profile/photo"
        element={
          <ProtectedPage>
            <ProfilePhotoChooser />
          </ProtectedPage>
        }
      />
      <Route
        path="app"
        element={
          <ProtectedPage>
            <WebApp />
          </ProtectedPage>
        }
      >
        <Route path="/app" element={<Dashboard />} />
        <Route path="gantt/:id" element={<Gantt />} />
      </Route>
    </Route>,
  ])
);

const REMARKS = ["CiteMind"];

function App() {
  useEffect(() => {
    // Animate title
    let title = document.title;
    let titleInterval = setInterval(() => {
      // Change remark to the next one
      title = REMARKS[(REMARKS.indexOf(title) + 1) % REMARKS.length];
      document.title = title;
    }, 300);
    return () => {
      clearInterval(titleInterval);
    };
  }, []);

  return (
    <InstUISettingsProvider
      theme={{
        ...instructure,
        colors: {
          ...instructure.colors,
        },
      }}
    >
      <RouterProvider
        router={router}
        fallbackElement={<Spinner renderTitle={"Loading " + APPNAME} />}
      />
    </InstUISettingsProvider>
  );
}

export default App;
