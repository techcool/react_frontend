import axios from "axios";
import { API as api } from "./config";
const createPaymentIntents = async ({  payload = {} }) => {
  const url = "payments";
  try {
    const response = await axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      url,
      data: payload
    });
    const { clientSecret } = response.data;
    return clientSecret;
  } catch (err) {
    return false;
  }
};

const getPacks = async () => {
  const url = "payments/packs";
  try {
    const response = await axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      url
    });
    const packs = response.data;
    return packs;
  } catch (err) {
    return false;
  }
};
const canPay = async () => {
  const url = "payments/can_pay";
  try {
    const response = await axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      url
    });
    const canPay = response.data;
    return canPay;
  } catch (err) {
    return false;
  }
};
const emailReceipt = async () => {
  const url = "payments/emailReceipt";
  try {
    const response = await axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      url
    });
    return canPay;
  } catch (err) {
    return false;
  }
};

export { createPaymentIntents, getPacks, canPay, emailReceipt };
