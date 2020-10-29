const serverless = require("serverless-http");
const validUrl = require("valid-url");

// constants
const { db } = require("../libs/firebase");
const { COLLECTION_NAME_URL_SHORTENER } = require("../constants");

// express
const createExpressApp = require("../createExpressApp");
const app = createExpressApp();

app.all("*", async (req, res) => {
  try {
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    if (req.method !== "POST") {
      const error_message = `Invalid method [${req.method}]`;
      return res.status(500).json({
        message: error_message,
      });
    }

    let { url = "" } = req.body;
    if (!validUrl.isUri(url)) {
      const error_message = `Invalid parameters - url: ${url}`;
      return res.status(500).json({
        message: error_message,
      });
    }

    // remove "/" at the end of url if needed
    const last_index = url.lastIndexOf("/");

    if (last_index !== -1 && last_index === url.length - 1) {
      url = url.substring(0, url.length - 1);
    }

    const snapshot = await db
      .collection(COLLECTION_NAME_URL_SHORTENER)
      .where("short_url", "==", url)
      .get();

    if (snapshot.empty) {
      return res.status(500).json({
        message: "Invalid URL",
        is_found: false,
      });
    } else {
      let final_data = {};
      snapshot.forEach((doc) => {
        final_data = { ...doc.data(), is_found: true };
      });

      return res.status(200).json({
        ...final_data,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.toString(),
    });
  }
});

exports.handler = serverless(app);
