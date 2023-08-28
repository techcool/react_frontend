import React from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import { createPaymentIntents } from "common/src/old-api/payments";
import { useState } from "react";
import styledComponent from "styled-components";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { connect } from "react-redux";

const ErrorsContainer = styledComponent.div`
color: red;
`;
const SuccessMessageContainer = styledComponent.div`
color: green;
`;

const PaymentsForm = ({
  accessToken,
  role,
  pack,
  hasCoupon,
  couponCode,
  checkIfCanPay,
}) => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = async (e) => {
    setDisabled(e.empty);
    setSucceeded(false);
    setProcessing(false);
    setError(e.error ? e.error.message : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const clientSecretToUse =
      clientSecret ||
      (await createPaymentIntents({
        accessToken,
        role,
        payload: {
          id: pack.id,
          hasCoupon,
          couponCode,
        },
      }));
    if (!clientSecretToUse) {
      setDisabled(false);
      setProcessing(false);
      setSucceeded(false);
      setError("Couldn't fetch data from the server");
      return;
    }

    setClientSecret(clientSecretToUse);
    try {
      const payload = await stripe.confirmCardPayment(clientSecretToUse, {
        payment_method: {
          type: "card",
          card: elements.getElement(CardNumberElement),
        },
      });
      if (payload.error) {
        setError(`Payment failed ${payload.error.message}`);
        setProcessing(false);
      } else {
        setError(null);
        setProcessing(false);
        setSucceeded(true);
        checkIfCanPay();
      }
    } catch (e) {
      const message = e.message || "Error";
      setError(message);
      setProcessing(false);
      setSucceeded(false);
      setDisabled(false);
    }
  };
  if (succeeded) {
    //setSucceeded(false);
   
    return (
      <div className="success">
        <FontAwesomeIcon icon={faCheckCircle} />
      </div>
    );
  }
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="cardNumber" className="font-weight-bold">
          Card number
        </label>
        <CardNumberElement
          id="cardNumber"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="expiryNumber" className="font-weight-bold">
          Expiration date
        </label>
        <CardExpiryElement
          id="expiryNumber"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="cvcNumber" className="font-weight-bold">
          CVC
        </label>
        <CardCvcElement
          id="cvcNumber"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <button
        disabled={processing || disabled || error || succeeded}
        id="submit"
      >
        <span id="button-text">
          {processing ? (
            // <div className="spinner" id="spinner"></div>
            <span>... </span>
          ) : (
            "Pay"
          )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && <ErrorsContainer>{error}</ErrorsContainer>}
      {/* Show a success message upon completion */}
      {succeeded && (
        <SuccessMessageContainer>Payment done!</SuccessMessageContainer>
      )}
    </form>
  );
};
const ConnectedPaymentsForm = connect((state) => {
  const { user } = state;
  const { accessToken, role } = user;
  return {
    accessToken,
    role,
  };
})(PaymentsForm);

const ModalTitle = styledComponent.div`
color: black;
font-weight: bold;
font-size: calc(1.5 * 1rem);
`;
const PackDetailsContainer = styledComponent.div`
color:black;
p {
  text-align:center;
  font-size: calc(1.25 * 1rem);
  font-weight: bold;
}
`;
const PaymentFormContainer = styledComponent.div`
button {
  margin-top: 20px;
  border: 1px solid #000;
  border-radius: 5px;
  background-color: white;
  width: 100%;
  padding: 5px 25px;
  color: #13bbed;
  font-size: calc(1.125 * 1rem);
  font-weight: bold;
  &:disabled{
    background-color: #A8A8A8;
    color: gray;
  }
}
.success {
  color: #43cb83;
  display: flex;
  justify-content: center;
  font-size: 50px;
}
#card-element{

}
`;

const FormModal = ({
  show,
  pack = {},
  hasCoupon,
  couponCode,
  couponValue,
  close,
  checkIfCanPay,
}) => (
  <Modal show={show} onHide={close}>
    <Modal.Header closeButton>
      <ModalTitle>Payment Form</ModalTitle>
    </Modal.Header>
    <Modal.Body>
      <PackDetailsContainer>
        <p>Package: {pack.title}</p>
        <p>
          Price: $
          {pack.discount !== 0
            ? Number.parseFloat(
                ((pack.discount / 100) * (100 - couponValue)) / 100
              ).toFixed(2)
            : Number.parseFloat(
                ((pack.price / 100) * (100 - couponValue)) / 100
              ).toFixed(2)}
        </p>
      </PackDetailsContainer>
      <PaymentFormContainer>
        <ConnectedPaymentsForm
          pack={pack}
          hasCoupon={hasCoupon}
          couponCode={couponCode}
          couponValue={couponValue}
          checkIfCanPay={checkIfCanPay}
        />
      </PaymentFormContainer>
    </Modal.Body>
  </Modal>
);

export default FormModal;
