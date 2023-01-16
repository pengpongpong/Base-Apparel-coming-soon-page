import React, { useRef, useState } from "react";

function Introduction_Component({introduction_text}) {
  const inputEmail = useRef();
  const error_icon = useRef();
  const error_text = useRef();
  const [message, setMessage] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    const emailValue = inputEmail.current.value;

    const validEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!emailValue.match(validEmail)) {
      inputEmail.current.style.border = "2px solid hsl(0, 93%, 68%)";
      error_icon.current.style.opacity = "1";
      error_icon.current.style.transitionDuration = ".1s";
      error_text.current.style.color = "hsl(0, 93%, 68%)";
      setMessage("Please provide a valid email");
    } else {
      try {
        inputEmail.current.style.border = "1px solid hsl(0, 36%, 70%)";
        error_icon.current.style.opacity = "0";
        error_icon.current.style.transitionDuration = ".1s";
        const res = await fetch("/api/email-registration", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailValue: emailValue,
          }),
        });

        if (!res.ok) {
          throw new Error(res.status);
        } else {
          const data = await res.json();
          error_text.current.style.color = "hsl(145, 63%, 49%)";
          inputEmail.current.value = "";
          setMessage(data.message);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <section className="introduction">
      <h1>
        We're <span>coming soon</span>
      </h1>
      <p className="introduction_text">
        {introduction_text}
      </p>
      <form className="email_subscription" onSubmit={onSubmit}>
        <input
          name="email"
          id="email"
          // type="email"
          placeholder="Email Address"
          ref={inputEmail}
        ></input>
        <img
          src="/images/icon-error.svg"
          className="error_svg"
          ref={error_icon}
        ></img>
        <button type="submit">
          <img src="/images/icon-arrow.svg"></img>
        </button>
      </form>
      <p className="error_message" ref={error_text}>
        {message}
      </p>
    </section>
  );
}

export default Introduction_Component;
