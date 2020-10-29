import axios, { CancelToken } from "axios";

let cancel;

export function createAxiosRequest({
  url,
  method,
  payload,
  is_cancel_token = false,
  headers = {},
}) {
  cancel && cancel("Request canceled by the user");

  const data = JSON.stringify(payload);

  let config = {
    method,
    url,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    data,
  };

  if (is_cancel_token === true) {
    config = {
      ...config,
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancel = c;
      }),
    };
  }

  return axios(config);
}
