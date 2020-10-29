// utilities
import readErrorMessageFromError from "./readErrorMessageFromError";
import { sendErrorToBugSnag } from "./bugsnag";

export async function makeARequest({
  requestFunction = () => {},
  payload = {},
  handleSuccess = () => {},
  handleError = () => {},
  is_check_success = true,
  name = "",
}) {
  try {
    const response = await requestFunction(payload);

    if (is_check_success === true) {
      const { status, data } = response;
      if (status === 200 && data.success) {
        handleSuccess(response);
      } else {
        const message = data && data.message ? data.message : "Unknown error";
        const error_message = `Error [${status}: ${message}]`;

        handleError(error_message);
        sendErrorToBugSnag({
          error: new Error(error_message),
          metadata_name: name,
          metadata_payload: {
            payload,
            response,
          },
        });
      }
    } else {
      handleSuccess(response);
    }
  } catch (e) {
    const {
      error_message = "",
      response_data = {},
    } = readErrorMessageFromError(e);
    handleError(error_message);
    sendErrorToBugSnag({
      error: new Error(error_message),
      metadata_name: name,
      metadata_payload: {
        payload,
        response_data,
      },
    });
  }
}
