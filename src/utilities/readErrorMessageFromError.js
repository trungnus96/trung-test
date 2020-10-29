export default function readErrorMessageFromError(e) {
  let error_message = e.toString();
  let response_data = {};
  try {
    const { response } = e;
    let { status, data } = response;

    response_data = data;

    if (data instanceof ArrayBuffer) {
      data = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(data)));
    }

    let { message } = data;

    if (typeof message === "string") {
      return {
        error_message: `${message}. Status Code: ${status}`,
        response_data,
      };
    }

    const { error_description } = message;
    if (error_description) {
      return {
        error_message: `${error_description}. Status Code: ${status}`,
        response_data,
      };
    }
  } catch (_e) {
    // do nothing
  }

  return {
    error_message,
    response_data,
  };
}
