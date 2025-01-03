import { Request, Response } from 'express';
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middleware/error');

const users = [
  { id: 1, email: "admin", password: "123", role: "admin" },
  { id: 2, email: "john@example.com", password: "secret123", role: "user" },
];

const app = express();
app.use(express.json());
app.use(cookieParser());

// TODO: Move to env
const JWT_SECRET = "supersecretkey"; // In production, keep this in .env file

// TODO: Move to controller
app.post("/auth/login", (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

// TODO: Move to controller
app.get("/auth/me", (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find((u) => u.id === decoded.id);
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

app.use('/api/v1', routes);

app.use(errorConverter);

app.use(errorHandler);

// Start the server
const PORT = 4000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
