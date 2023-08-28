import React from "react";
import verfiy from "common/src/images/verify.svg";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Step4() {
  return (
    <div className="text-center verify-email">
      <img alt="logo" src={verfiy} />
      <h2>Almost Done! Please Verify Your Email</h2>
      <p>Check your email to verify your account.</p>
      <a
        href="/login"
        className="primary-btn"
        id="step4-login"
        variant="primary"
      >
        Continue
      </a>
    </div>
  );
}
