import React, { useState } from "react";
import { View } from "@instructure/ui-view";
import { Text } from "@instructure/ui-text";
import { Heading } from "@instructure/ui-heading";

export default function Donation(props) {
  const [donation, setDonation] = useState({
    amount: "Love",
    date: new Date().toDateString(),
    id: "0001",
    status: "Processed",
    type: "Thought",
    user: "The best user",
  });

  return (
    <View as="div" padding="medium" height={"100%"}>
      <View as="div" margin="medium">
        <Heading level="h1">Donation</Heading>
      </View>
      <View as="div" margin="medium">
        <Text>
          We are currently not accepting donations, however, its the thought
          that counts and the fact you clicked on this page means a lot to us.
          Thank you for your support!
        </Text>
      </View>
      <View as="div" margin="medium">
        <Text>Thank you for your donation!</Text>
      </View>
      <View as="div" margin="medium">
        <Heading level="h5">Donation Details</Heading>
        <p>
          <Text>
            <strong>Donation ID:</strong> {donation.id}
          </Text>
        </p>
        <p>
          <Text>
            <strong>Donation Amount:</strong> ${donation.amount}
          </Text>
        </p>
        <p>
          <Text>
            <strong>Donation Date:</strong> {donation.date}
          </Text>
        </p>
        <p>
          <Text>
            <strong>Donation Status:</strong> {donation.status}
          </Text>
        </p>
        <p>
          <Text>
            <strong>Donation Type:</strong> {donation.type}
          </Text>
        </p>
        <p>
          <Text>
            <strong>Donation User:</strong> {donation.user}
          </Text>
        </p>
      </View>
    </View>
  );
}
