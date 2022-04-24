import { connectDB, insertDocument } from "../../helpers/db-util";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const email = req.body.email;

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    let client;

    try {
      client = connectDB();
    } catch (error) {
        res.status(500).json({message: "Connecting to DB failed"});
        return;
    }

    try {
      await insertDocument(client, "newsletter", { email: email });
      client.close();
    } catch (error) {
        res.status(500).json({message: "Inserting data failed"});
        return;
    }



    res.status(201).json({ message: "Signed up!" });
  }
};

export default handler;
