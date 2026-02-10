const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/bfhl", (req, res) => {
  res.json({
    is_success: true,
    user_id: "namrata_0831",
    email: "namrata0831.be23@chitkara.edu.in",
    roll_number: "2310990831"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
