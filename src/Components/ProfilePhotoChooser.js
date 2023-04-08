import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { authApp } from "../Firebase/firebase";
import { Heading } from "@instructure/ui-heading";
import { Flex, FlexItem } from "@instructure/ui-flex";
import { View } from "@instructure/ui-view";
import { SimpleSelect } from "@instructure/ui-simple-select";
import {
  IconArrowOpenStartLine,
  IconArrowStartLine,
  IconArrowOpenEndLine,
} from "@instructure/ui-icons";
import { IconButton, Button } from "@instructure/ui-buttons";
import { storageApp } from "../Firebase/firebase";
import { Spinner } from "@instructure/ui-spinner";

const PER_PAGE = 30;

export default function ProfilePhotoChooser(props) {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(authApp.auth);

  // Get current profile photo from auth
  const [profilePhoto, setProfilePhoto] = useState(user?.photoURL);
  const [storageItems, setStorageItems] = useState([]);
  const [urls, setUrls] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PER_PAGE);
  const [gender, setGender] = useState("male");

  const [loadingImages, setLoadingImages] = useState(false);

  // Get all urls from storage and display them in a grid
  // When a user clicks on a photo, set the profile photo to that photo

  // Pagination for photos
  // const [page, setPage] = React.useState(0);
  // const [pageSize, setPageSize] = React.useState(10);
  // const [total, setTotal] = React.useState(0);

  useEffect(() => {
    storageApp.listAll(gender).then((res) => {
      let shuffledItems = res.items.sort(() => 0.5 - Math.random());
      setTotal(shuffledItems.length);
      setStorageItems(shuffledItems);
    });
  }, [gender]);

  useEffect(() => {
    async function getUrls(page, pageSize, storageItems) {
      const currUrls = [];
      let currStorageItems = storageItems.slice(
        page * pageSize,
        (page + 1) * pageSize
      );
      for (let i = 0; i < currStorageItems.length; i++) {
        const url = await storageApp.getDownloadURL(currStorageItems[i]);
        currUrls.push(url);
      }
      return currUrls;
    }

    setLoadingImages(true);
    getUrls(page, pageSize, storageItems)
      .then((currUrls) => {
        if (storageItems.length > 0) {
          if (currUrls !== urls) {
            setUrls(currUrls);
          }
        }
        setLoadingImages(false);
      })
      .finally(() => {
        setLoadingImages(false);
      });
  }, [storageItems, page, pageSize]);

  return (
    <View as="div" padding="medium" height={"100%"}>
      <View as="div" margin="medium">
        <Button onClick={() => navigate("/profile")}>
          <View as="div" display="flex" alignItems="center">
            <IconArrowStartLine />
          </View>
        </Button>
      </View>
      <View as="div" margin="medium">
        <Heading level="h2">Profile Photo Chooser</Heading>
      </View>
      {profilePhoto && (
        <View as="div" margin="medium">
          <p>Current Profile Photo</p>
          <img src={profilePhoto} width="100px" height="auto" alt="" />
        </View>
      )}
      <View as="div" margin="medium">
        <p>Choose an AI generated profile photo from the grid below.</p>
        <p>Click on a photo to set it as your profile photo.</p>
        <Flex>
          <FlexItem margin="small">
            <SimpleSelect
              screenReaderLabel="Gender"
              width="10rem"
              renderLabel="Gender"
              label="Gender"
              onChange={(e, { id, value }) => {
                setGender(value);
              }}
              value={gender}
            >
              <SimpleSelect.Option id={"male"} value={"male"}>
                Male
              </SimpleSelect.Option>
              <SimpleSelect.Option id={"female"} value={"female"}>
                Female
              </SimpleSelect.Option>
            </SimpleSelect>
          </FlexItem>
          <FlexItem margin="small">
            <SimpleSelect
              screenReaderLabel="Per Page"
              width="10rem"
              renderLabel="Per Page"
              label="Per Page"
              onChange={(e, { id, value }) => {
                setPageSize(value);
              }}
              value={pageSize}
            >
              <SimpleSelect.Option id={10} value={10}>
                10
              </SimpleSelect.Option>
              <SimpleSelect.Option id={20} value={20}>
                20
              </SimpleSelect.Option>
              <SimpleSelect.Option id={30} value={30}>
                30
              </SimpleSelect.Option>
              <SimpleSelect.Option id={40} value={40}>
                40
              </SimpleSelect.Option>
              <SimpleSelect.Option id={50} value={50}>
                50
              </SimpleSelect.Option>
            </SimpleSelect>
          </FlexItem>
        </Flex>
        <View as="div" margin="medium">
          <i>
            Page {page + 1} of {Math.ceil(total / pageSize)}
          </i>
        </View>
      </View>
      <Flex
        wrap="wrap"
        justifyItems="space-evenly"
        margin="medium"
        padding="medium"
      >
        {loadingImages && (
          <FlexItem margin="small">
            <Spinner renderTitle="Loading Images" />
          </FlexItem>
        )}
        {urls?.map((url, index) => {
          return (
            <FlexItem key={index} margin="small">
              <img
                src={url}
                width="auto"
                height="100px"
                loading="lazy"
                onMouseEnter={(e) => {
                  e.target.style.opacity = "0.5";
                }}
                onMouseLeave={(e) => {
                  e.target.style.opacity = "1";
                }}
                onClick={() => {
                  authApp
                    .setProfilePhoto(url)
                    .then((res) => {
                      setProfilePhoto(url);
                    })
                    .finally(() => {
                      navigate("/profile");
                    });
                }}
                alt={index}
              />
            </FlexItem>
          );
        })}
      </Flex>
      <Flex justifyItems="space-between" alignItems="center" margin="medium">
        <FlexItem>
          <IconButton
            screenReaderLabel="Previous Page"
            withBackground={false}
            withBorder={false}
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
          >
            <IconArrowOpenStartLine />
          </IconButton>
        </FlexItem>
        <FlexItem>
          <IconButton
            screenReaderLabel="Next Page"
            withBackground={false}
            withBorder={false}
            onClick={() => setPage(page + 1)}
            disabled={page === Math.ceil(total / pageSize) - 1}
          >
            <IconArrowOpenEndLine />
          </IconButton>
        </FlexItem>
      </Flex>
    </View>
  );
}
