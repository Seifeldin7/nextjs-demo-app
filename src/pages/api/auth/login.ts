export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const response = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (data.token) {
      // Set httpOnly cookie to secure the session token
      res.setHeader("Set-Cookie", `token=${data.token}; HttpOnly; Path=/`);
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  }
}
