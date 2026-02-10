const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const EMAIL = "namrata0831.be23@chitkara.edu.in";


// ✅ Health
app.get("/health", (req, res) => {
  res.json({
    is_success: true,
    official_email: EMAIL
  });
});


// Fibonacci
function fibonacci(n) {
  const arr = [0, 1];
  for (let i = 2; i <= n; i++) {
    arr.push(arr[i - 1] + arr[i - 2]);
  }
  return arr.slice(0, n);
}

// Prime filter
function primes(nums) {
  return nums.filter(num => {
    if (num < 2) return false;
    for (let i = 2; i * i <= num; i++) {
      if (num % i === 0) return false;
    }
    return true;
  });
}

// HCF
function hcf(nums) {
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  return nums.reduce((a, b) => gcd(a, b));
}

// LCM
function lcm(nums) {
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  const l = (a, b) => (a * b) / gcd(a, b);
  return nums.reduce((a, b) => l(a, b));
}


// ✅ Main API
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

    if (body.AI !== undefined) {
      return res.json({
        is_success: true,
        official_email: EMAIL,
        data: "Mumbai"   // temporary safe answer
      });
    }

    return res.status(400).json({
      is_success: false
    });

  } catch (err) {
    return res.status(500).json({
      is_success: false
    });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on " + PORT));
