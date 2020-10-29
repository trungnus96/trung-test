import { createAxiosRequest } from "./Axios";

export function decodeShortenedUrl(payload) {
  const url = `/.netlify/functions/decode-shortened-url`;

  return createAxiosRequest({
    url,
    method: "POST",
    payload,
  });
}
