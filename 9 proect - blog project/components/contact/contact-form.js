import { useRef, useState, useEffect } from "react";

import Notification from "../ui/notification";

import classes from "./contact-form.module.css";

const sendData = async (contactDetails) => {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
};

const ContactForm = () => {
  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const messageInputRef = useRef();
  const [reqStatus, setReqStatus] = useState(null);
  const [reqError, setReqError] = useState(null);

  useEffect(() => {
    if (reqStatus === "success" || reqStatus === "error") {
      const timer = setTimeout(() => {
        setReqStatus(null);
        setReqError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [reqStatus]);

  const sendMessageHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredMessage = messageInputRef.current.value;

    if (
      !enteredEmail ||
      !enteredName ||
      !enteredMessage ||
      !enteredEmail.includes("@") ||
      enteredName.trim() === "" ||
      enteredMessage.trim() === ""
    ) {
      return;
    }

    setReqStatus("pending");

    try {
      await sendData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      });
    } catch (error) {
      setReqStatus("error");
      setReqError(error.message || "Something went wrong!");
      return;
    }
  };

  let notificationData;

  if (reqStatus === "pending") {
    notificationData = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way",
    };
  }

  if (reqStatus === "success") {
    notificationData = {
      status: "success",
      title: "Success!",
      message: "Message sent succesfully!",
    };
  }

  if (reqStatus === "error") {
    notificationData = {
      status: "error",
      title: "Error!",
      message: reqError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" required ref={nameInputRef} />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your message</label>
          <textarea
            id="message"
            rows="5"
            ref={messageInputRef}
            required
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notificationData && (
        <Notification
          status={notificationData.status}
          title={notificationData.title}
          message={notificationData.message}
        />
      )}
    </section>
  );
};

export default ContactForm;
