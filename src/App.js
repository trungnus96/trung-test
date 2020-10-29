import React, { memo, useEffect, useState } from "react";
import "./App.css";

// utilities
import { makeARequest } from "./utilities/api";

// api
import * as BrauzApi from "./api/BrauzApi";

function App() {
  // hooks
  const [error_message, setErrorMessage] = useState("");

  useEffect(() => {
    decodeShortenedUrl();
  }, []);

  // functions
  const decodeShortenedUrl = async () => {
    const { href = "" } = window.location;

    await makeARequest({
      name: `Decode Shorted URL`,
      is_check_success: false,
      requestFunction: BrauzApi.decodeShortenedUrl,
      payload: {
        url: href,
      },
      handleError: (error_message) => {
        setErrorMessage(error_message);
      },
      handleSuccess: (response) => {
        const { data = {} } = response;
        const { long_url = "" } = data;

        window.location.replace(long_url);
      },
    });
  };

  // content render helper
  let content = null;
  if (error_message) {
    content = <div className="error">{error_message}</div>;
  } else {
    content = <div>Redirecting...</div>;
  }

  return <div className="App">{content}</div>;
}

export default memo(App);
