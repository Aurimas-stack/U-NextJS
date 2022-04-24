import { connecToDB } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }

  const { email, password } = req.body;

  if (
    !email ||
    !password ||
    !email.includes("@") ||
    password.trim().length < 7
  ) {
    res.status(422).json({ message: "Invalid input" });
    return;
  }

  const client = await connecToDB();

  const db = client.db();

  const existingUsers = await db.collection("users").findOne({ email: email });

  if (existingUsers) {
    res.status(422).json({ message: "User already exists" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = await db.collection("users").insertOne({
    email: email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "Created user!" });
  client.close();
};

export default handler;
