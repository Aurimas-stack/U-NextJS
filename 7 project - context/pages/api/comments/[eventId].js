import {
  connectDB,
  insertDocument,
  getAllDocuments,
} from "../../../helpers/db-util";

const handler = async (req, res) => {
  const eventId = req.query.eventId;

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    let client;

    try {
      client = await connectDB();
    } catch (error) {
      res.status(500).json({ message: "Connecting to DB failed" });
      return;
    }

    if (
      !email ||
      !name ||
      !text ||
      name.trim() === "" ||
      text.trim() === "" ||
      !email.includes("@")
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
      eventId,
    };

    let result;

    try {
      result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;
      res
        .status(201)
        .json({ message: "Created a comment!", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Failed to insert comment" });
      client.close();
      return;
    }

    if (req.method === "GET") {
      let documents;

      try {
        documents = await getAllDocuments(client, "comments", { _id: -1 });
        res.status(200).json({ comments: documents });
      } catch (error) {
        res.status(500).json({ message: "Failed to get comments" });
        return;
      }
    }

    client.close();
  }
};

export default handler;
