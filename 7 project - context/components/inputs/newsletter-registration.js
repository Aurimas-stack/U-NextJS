import {useRef, useContext} from "react";
import NotificationContext from "../../store/notification-context";

import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const nofiticationCtx = useContext(NotificationContext);
  const emailInputRef = useRef();

  async function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    nofiticationCtx.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter",
      status: "pending"
    });

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail
        }),
        headers : {
          "Content-Type": "application/json"
        }
      });

      if(!response.ok) {
        throw new Error("Something went wrong!");

      }

      const data = await response.json();
      nofiticationCtx.showNotification({
        title: "Success!",
        message: "Successfully registered for newsletter",
        status: "success"
      })

    } catch (error) {
      nofiticationCtx.showNotification({
        title: "Error!",
        message: error.message || "Something went wrong!",
        status: "error"
      })
    }
   
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;