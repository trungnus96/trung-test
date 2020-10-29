const serverless = require("serverless-http");
const { nanoid } = require("nanoid");
const validUrl = require("valid-url");

// constants
const { db } = require("../libs/firebase");
const { DOMAIN, COLLECTION_NAME_URL_SHORTENER } = require("../constants");

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

    const { url = "" } = req.body;
    if (!validUrl.isUri(url)) {
      const error_message = `Invalid parameters - url: ${url}`;
      return res.status(500).json({
        message: error_message,
      });
    }

    const snapshot = await db
      .collection(COLLECTION_NAME_URL_SHORTENER)
      .where("long_url", "==", url)
      .get();

    if (snapshot.empty) {
      const created_date = Date.now();
      const code = nanoid() + created_date;
      const short_url = `${DOMAIN}/${code}`;

      const payload = {
        long_url: url,
        short_url,
        created_date,
      };

      await db.collection(COLLECTION_NAME_URL_SHORTENER).add(payload);

      return res.status(200).json({
        ...payload,
      });
    } else {
      let final_data = {};
      snapshot.forEach((doc) => {
        final_data = { ...doc.data() };
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
