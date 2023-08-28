import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
export default function Error({ error, errorInfo }) {
  const history = useHistory();
  return (
    <div className="main-section top-zero d-flex  align-items-center justify-content-center">
      <div className="error-msg text-center">
        <h1>Oops!</h1>
        <h2>Something went wrong.</h2>
        <details style={ { whiteSpace: "pre-wrap" } } className="text-danger">
          { error && error.toString() }
          <br />
          { /* {errorInfo.componentStack} */ }
          <Button
            variant="primary"
            className="primary-btn-outline"
            onClick={ () => {
              history.push("/");
            } }
          >
            Go to Home
          </Button>
        </details>
      </div>
    </div>
  );
}
