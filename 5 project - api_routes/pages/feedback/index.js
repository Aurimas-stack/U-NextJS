import { useState, Fragment } from "react";

import { buildFeedPath, extractFeedback } from "../api/feedback";

const FeedBackPage = (props) => {
  const [feedbackData, setFeedBackData] = useState();

  const loadFeedbackHandler = async (id) => {
    const response = await fetch(`/api/${id}`);
    const data = await response.json();
    setFeedBackData(data);
  };

  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbacks.map((item) => (
          <li key={item.id}>
            {item.text}{" "}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              Show details
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export async function getStaticProps() {
  const filePath = buildFeedPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedbacks: data,
    },
  };
}

export default FeedBackPage;
