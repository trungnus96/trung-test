import React, { memo, useEffect, useState } from "react";
import "./App.css";

// firebase
import { db } from "./constants/firebase_client";

// constants
const { COLLECTION_NAME_URL_SHORTENER } = require("./constants");

function App() {
  // hooks
  const [error_message, setErrorMessage] = useState("");

  useEffect(() => {
    decodeShortenedUrl();
  }, []);

  // functions
  const decodeShortenedUrl = async () => {
    try {
      let { href = "" } = window.location;

      // remove "/" at the end of href if needed
      const last_index = href.lastIndexOf("/");

      if (last_index !== -1 && last_index === href.length - 1) {
        href = href.substring(0, href.length - 1);
      }

      const snapshot = await db
        .collection(COLLECTION_NAME_URL_SHORTENER)
        .where(
          "short_url",
          "==",
          "https://brauz-url-test.netlify.app/vN_p6UicgxIPZiTV1IFpn1603943094055"
        )
        .get();

      if (snapshot.empty) {
        setErrorMessage("Invalid URL");
      } else {
        let data = {};
        snapshot.forEach((doc) => {
          data = { ...doc.data() };
        });

        const { long_url = "" } = data;
        window.location.replace(long_url);
      }
    } catch (e) {
      setErrorMessage(e.toString());
    }
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
