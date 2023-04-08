import { useRouteError } from "react-router-dom";
import { info, error } from "@instructure/console";
import { Heading } from "@instructure/ui-heading";
import { View } from "@instructure/ui-view";

export default function Error(props) {
  const errorMessage = useRouteError();
  error(errorMessage);

  return (
    <View id="error-page" as="div" padding="medium">
      <Heading level="h5">Oops!</Heading>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage.statusText || errorMessage.message}</i>
        {process.env.NODE_ENV === "development" && (
          <pre>{errorMessage.stack}</pre>
        )}
      </p>
    </View>
  );
}
