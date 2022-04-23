import { extractFeedback, buildFeedPath } from "./feedback";

const handler = (req, res) => {
    const feedbackId = req.query.feedbackId;

    const filePath = buildFeedPath();
    const data = extractFeedback(filePath);

    const selectedData = data.find(feedback => feedback.id === feedbackId);
    res.status(200).json({feedback: selectedData});
};

export default handler;