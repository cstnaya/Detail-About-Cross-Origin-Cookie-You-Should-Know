const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app = express();

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get(
  "/cookies",
  function (req, res, next) {
    res.cookie("test", "set-test-token", {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "none",
      secure: true,
    });
    next();
  },
  function (req, res) {
    res.json({ success: true });
  }
);

app.get(
  "/secret",
  function (req, res, next) {
    if (!req.cookies.test) {
      return res.status(401).json({ error: "error" });
    }
    next();
  },
  (req, res) => {
    console.log(req.cookies.test);
    return res.json({ sescret: "100" });
  }
);

app.get("/nocookie", (req, res) => {
  console.log(req.cookies.test);
  return res.json({ success: true });
});

app.listen(8000, () => {
  console.log("server start...");
});
