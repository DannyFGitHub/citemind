import React, { useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { View } from "@instructure/ui-view";
import { Text } from "@instructure/ui-text";
import { Heading } from "@instructure/ui-heading";
import { FormField, Table } from "@instructure/ui";
import { Flex, FlexItem } from "@instructure/ui-flex";
import { Button } from "@instructure/ui-buttons";
import { IconPlusLine } from "@instructure/ui-icons";
import { IconButton } from "@instructure/ui-buttons";
import { IconSearchLine } from "@instructure/ui-icons";
import { IconArrowOpenStartLine } from "@instructure/ui-icons";
import { IconArrowOpenEndLine } from "@instructure/ui-icons";
import { TextInput } from "@instructure/ui-text-input";
import useWindowSize from "../../Hooks/useWindowSize";
import { dbApp, authApp } from "../../Firebase/firebase";
import { ToggleDetails } from "@instructure/ui-toggle-details";
import { CondensedButton } from "@instructure/ui-buttons";
import { IconTrashLine } from "@instructure/ui-icons";
import { Pagination } from "@instructure/ui-pagination";
import { CloseButton } from "@instructure/ui-buttons";
import { Modal } from "@instructure/ui-modal";
import { Spinner } from "@instructure/ui-spinner";

const FEED_PER_PAGE = 10;

export function SelectableTable({ caption, headers, rows, width }) {
  const navigate = useNavigate();

  return (
    <Table
      caption={caption}
      title={caption}
      hover
      layout={width > 600 ? "auto" : "stacked"}
    >
      <Table.Head>
        <Table.Row>
          {headers.map((header, index) => (
            <Table.ColHeader key={index} id={header}>
              {header}
            </Table.ColHeader>
          ))}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {rows.map(({ data, id }, index) => (
          <Table.Row key={index} onClick={() => navigate(`/app/gantt/${id}`)}>
            <Table.Cell>
              {data.ganttName && data.ganttName.length > 100
                ? data.ganttName.slice(0, 100) + "..."
                : data.ganttName}
            </Table.Cell>
            {/* <Table.Cell>{data.upvotes.length}</Table.Cell>
            <Table.Cell>{data.views.length}</Table.Cell>
            <Table.Cell>{data.responses.length}</Table.Cell> */}
            <Table.Cell>{data.deleteSubmission}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

function PaginatedTable({
  caption,
  headers,
  rows,
  perPage,
  width,
  totalCount,
  onPaginateNextOrPrev,
}) {
  const [page, setPage] = useState(0);

  if (onPaginateNextOrPrev) {
    function handleNextOrPrev(backOrNext) {
      onPaginateNextOrPrev(backOrNext);
    }
    // Render a component with a button that says "Next" and a button that says "Previous"
    // When the user clicks on the button, call the onPaginateNextOrPrev function with the string "next" or "previous"
    return (
      <div>
        <SelectableTable
          caption={caption}
          headers={headers}
          rows={rows}
          width={width}
        />
        {totalCount > perPage && (
          <Flex margin="x-small" justifyItems="space-between">
            <IconButton onClick={() => handleNextOrPrev("previous")}>
              <IconArrowOpenStartLine />
            </IconButton>
            <IconButton onClick={() => handleNextOrPrev("next")}>
              <IconArrowOpenEndLine />
            </IconButton>
          </Flex>
        )}
      </div>
    );
  }

  function handleClick(page) {
    setPage(page);
  }

  const startIndex = page * perPage;
  const slicedRows = rows.slice(startIndex, startIndex + perPage);
  const pageCount = perPage && Math.ceil(rows.length / perPage);

  return (
    <div>
      <SelectableTable
        caption={caption}
        headers={headers}
        rows={slicedRows}
        width={width}
      />
      {pageCount > 1 && (
        <Pagination
          variant="compact"
          labelNext="Next Page"
          labelPrev="Previous Page"
          margin="large"
        >
          {Array.from(Array(pageCount), (item, index) => (
            <Pagination.Page
              key={index}
              onClick={() => handleClick(index)}
              current={index === page}
            >
              {index + 1}
            </Pagination.Page>
          ))}
        </Pagination>
      )}
    </div>
  );
}

export default function Dashboard(props) {
  // const navigate = useNavigate();
  // const location = useLocation();
  const { width } = useWindowSize();
  const [ganttName, setGanttName] = React.useState("");
  const [myGantts, setMyGantts] = React.useState([]);
  const [submissionFeed, setSubmissionFeed] = React.useState([]);
  const [submissionFeedTotalCount, setSubmissionFeedTotalCount] =
    React.useState();
  const [submissionFeedFirstDoc, setSubmissionFeedFirstDoc] = React.useState();

  const [loadingDelete, setLoadingDelete] = React.useState(false);

  const [loadingSubmissionFeed, setLoadingSubmissionFeed] =
    React.useState(false);
  const [loadingMySubmissions, setLoadingMySubmissions] = React.useState(false);

  const [deleteSubmissionId, setDeleteSubmissionId] = React.useState(null);

  const handleRefreshAll = () => {
    if (authApp.auth.currentUser) {
      setLoadingSubmissionFeed(true);
      setLoadingMySubmissions(true);

      dbApp
        .getPaginatedSubmissions(null, null, FEED_PER_PAGE)
        .then((submissions) => {
          setSubmissionFeed(submissions);
          setSubmissionFeedFirstDoc(submissions[0]);
        })
        .finally(() => {
          setLoadingSubmissionFeed(false);
        });

      dbApp.getCountOfSubmissionsInFeed().then((count) => {
        setSubmissionFeedTotalCount(count);
      });

      dbApp
        .getMySubmissions(authApp.auth.currentUser.uid)
        .then((submissions) => {
          setMyGantts(submissions);
        })
        .finally(() => {
          setLoadingMySubmissions(false);
        });
    }
  };

  const handleClickConfirmation = (e) => {
    if (e.target.id === "confirm-delete-submission") {
      setLoadingDelete(true);
      dbApp
        .deleteSubmission(deleteSubmissionId)
        .then(() => {
          handleRefreshAll();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setDeleteSubmissionId(null);
          setLoadingDelete(false);
        });
    } else {
      setDeleteSubmissionId(null);
    }
  };

  React.useEffect(() => {
    handleRefreshAll();
  }, []);

  const handlePostTextChange = (event) => {
    setGanttName(event.target.value);
  };

  const handlePostSubmit = () => {
    if (ganttName.trim() === "") {
      return;
    }
    setGanttName("");
    dbApp
      .addSubmission({
        ganttName: ganttName,
        uid: authApp.auth.currentUser.uid,
      })
      .then(() => {
        handleRefreshAll();
      });
  };

  return (
    <View>
      <View as="div" margin="medium">
        <Flex
          justifyItems="space-between"
          direction={width > 650 ? "row" : "column"}
        >
          <Flex.Item shouldGrow>
            <View as="div" margin="xx-small">
              <TextInput
                size="large"
                value={ganttName}
                onChange={handlePostTextChange}
                placeholder="Enter New Gantt Name to Create"
              />
            </View>
          </Flex.Item>
          <Flex.Item align="end">
            <View as="div" margin="xx-small">
              <Button
                disabled={ganttName.trim() === ""}
                icon={IconPlusLine}
                onClick={handlePostSubmit}
                margin="xx-small"
                size="large"
              >
                Create
              </Button>
            </View>
          </Flex.Item>
        </Flex>
      </View>

      <View as="div" margin="medium">
        <ToggleDetails
          summary={
            <Flex direction="row">
              <FlexItem shouldShrink>
                <Heading level="h3">My CiteMinds</Heading>
              </FlexItem>
              <FlexItem shouldShrink margin="x-small">
                <Text>{myGantts.length}</Text>
              </FlexItem>
              <FlexItem shouldShrink>
                {loadingMySubmissions && (
                  <Spinner
                    renderTitle="Loading"
                    size="x-small"
                    margin="x-small"
                  />
                )}
              </FlexItem>
            </Flex>
          }
        >
          {myGantts.length > 0 ? (
            <PaginatedTable
              caption="My CiteMinds"
              headers={["Gantts", "Delete"]}
              rows={myGantts.map((submission, index) => {
                return {
                  ...submission,
                  data: {
                    ...submission.data,
                    deleteSubmission: (
                      <CondensedButton
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteSubmissionId(submission.id);
                        }}
                        renderIcon={IconTrashLine}
                      >
                        Delete
                        {loadingDelete &&
                        submission.id === deleteSubmissionId ? (
                          <Spinner size="x-small" />
                        ) : null}
                      </CondensedButton>
                    ),
                  },
                };
              })}
              width={width}
              perPage={FEED_PER_PAGE}
            />
          ) : (
            <Text>
              <strong>A bit empty...</strong>
            </Text>
          )}
        </ToggleDetails>
      </View>

      <View as="div" margin="medium">
        <ToggleDetails
          summary={
            <Flex direction="row">
              <FlexItem shouldShrink>
                <Heading level="h3">My Feed</Heading>
              </FlexItem>
              <FlexItem shouldShrink margin="x-small">
                <Text>{submissionFeedTotalCount}</Text>
              </FlexItem>
              <FlexItem shouldShrink>
                {loadingSubmissionFeed && (
                  <Spinner
                    renderTitle="Loading"
                    size="x-small"
                    margin="x-small"
                  />
                )}
              </FlexItem>
            </Flex>
          }
        >
          {submissionFeed.length > 0 ? (
            <PaginatedTable
              caption="My Feed"
              headers={["Gantts", "Upvotes", "Views", "Responses"]}
              rows={submissionFeed}
              width={width}
              perPage={FEED_PER_PAGE}
              totalCount={submissionFeedTotalCount}
              onPaginateNextOrPrev={(previousOrNext) => {
                if (previousOrNext === "previous") {
                  // If we are on the first page, then we don't want to do anything
                  if (submissionFeedFirstDoc.id === submissionFeed[0].id) {
                    return;
                  }

                  setLoadingSubmissionFeed(true);
                  dbApp
                    .getPaginatedSubmissions(
                      null,
                      submissionFeed[0].data.submissionDate,
                      FEED_PER_PAGE
                    )
                    .then((submissions) => {
                      setSubmissionFeed(submissions);
                    })
                    .finally(() => {
                      setLoadingSubmissionFeed(false);
                    });
                } else if (previousOrNext === "next") {
                  // If we are on the last page, then we don't want to do anything
                  setLoadingSubmissionFeed(true);
                  dbApp
                    .getPaginatedSubmissions(
                      submissionFeed[submissionFeed.length - 1].data
                        .submissionDate,
                      null,
                      FEED_PER_PAGE
                    )
                    .then((submissions) => {
                      // If nothing returns refresh all to start again
                      if (submissions.length === 0) {
                        handleRefreshAll();
                        return;
                      }

                      setSubmissionFeed(submissions);
                    })
                    .finally(() => {
                      setLoadingSubmissionFeed(false);
                    });
                }
              }}
            />
          ) : (
            <Text>
              <strong>A bit empty...</strong>
            </Text>
          )}
        </ToggleDetails>
      </View>

      <Modal
        open={deleteSubmissionId !== null && deleteSubmissionId !== undefined}
        onDismiss={() => {
          setDeleteSubmissionId(null);
        }}
        size="small"
        label="Delete"
        shouldCloseOnDocumentClick
      >
        <Modal.Header>
          <CloseButton
            placement="end"
            offset="medium"
            screenReaderLabel="Close"
            onClick={handleClickConfirmation}
          />
          <Heading level="h2">Delete</Heading>
        </Modal.Header>
        <Modal.Body padding="large medium">
          <Text>
            You are about to delete a submission. This action cannot be undone.
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClickConfirmation}>Cancel</Button>&nbsp;
          <Button
            onClick={handleClickConfirmation}
            color="danger"
            type="submit"
            id="confirm-delete-submission"
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </View>
  );
}
