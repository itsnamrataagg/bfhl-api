const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

const EMAIL = "namrata0831.be23@chitkara.edu.in";

// 🔴 PUT YOUR GEMINI KEY HERE
const genAI = new GoogleGenerativeAI("AIzaSyCV-ThFH1SAdjWyrtRpeFUnChIllM25Au4");


// ================= HEALTH =================
app.get("/health", (req, res) => {
  res.json({
    is_success: true,
    official_email: EMAIL
  });
});


// ================= UTILS =================
function fibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  const arr = [0, 1];
  for (let i = 2; i < n; i++) {
    arr.push(arr[i - 1] + arr[i - 2]);
  }
  return arr;
}

function primes(nums) {
  return nums.filter(num => {
    if (num < 2) return false;
    for (let i = 2; i * i <= num; i++) {
      if (num % i === 0) return false;
    }
    return true;
  });
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function hcf(nums) {
  return nums.reduce((a, b) => gcd(a, b));
}

function lcm(nums) {
  const l = (a, b) => (a * b) / gcd(a, b);
  return nums.reduce((a, b) => l(a, b));
}


// ================= MAIN API =================
app.post("/bfhl", async (req, res) => {
  try {
    const body = req.body;

    if (body.fibonacci !== undefined) {
      return res.json({
        is_success: true,
        official_email: EMAIL,
        data: fibonacci(body.fibonacci)
      });
    }

    if (body.prime !== undefined) {
      return res.json({
        is_success: true,
        official_email: EMAIL,
        data: primes(body.prime)
      });
    }

    if (body.hcf !== undefined) {
      return res.json({
        is_success: true,
        official_email: EMAIL,
        data: hcf(body.hcf)
      });
    }

    if (body.lcm !== undefined) {
      return res.json({
        is_success: true,
        official_email: EMAIL,
        data: lcm(body.lcm)
      });
    }

    // ================= AI =================
    if (body.AI !== undefined) {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(body.AI);
      const text = result.response.text();

      return res.json({
        is_success: true,
        official_email: EMAIL,
        data: text.trim().split(" ")[0]
      });
    }

    return res.status(400).json({
      is_success: false
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      is_success: false
    });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on " + PORT));
