import axios from 'common/src/api/axios';
import {
  showErrorMessages,
} from "common/src/components/helpers/notifications";

const createCoupon = async ({ }) => {
  const url = `coupons`;
  try {
     const response = await axios({
      method: 'POST',
      url,
    });
    return response.data;
  } catch (error) {
    return false;
  }
}

const removeCoupon = async ({id }) => {
  const url = `coupons/${id}`;
  try {
    const response = await axios({
      method: 'DELETE',
      url,
    });
    return response.data;
  } catch (error) {
    return false;
  }
}

const fetchCoupons = async ({  }) => {
  const url = `coupons`;
  try {
    const response = await axios({
      method: 'GET',
      url,
    });
    return response.data;
  } catch (error) {
    return false;
  }
}

const updateCoupon = async ({ payload }) => {
  const url = `coupons`;
  try {
    const response = await axios({
      method: 'PUT',
      url,
      data: payload
    });
    return response.data;
  } catch (error) {
    return false;
  }
}

const fetchCouponValue = async ({ code})=>{
  const url = `payments/getCouponValue`;
  try {
    const response = await axios({
      method: 'POST',
      url,
      data:{code}
    });
    return response.data;
  } catch (error) {
    return false;
  }
}
export {
  createCoupon,
  removeCoupon,
  updateCoupon,
  fetchCoupons,
  fetchCouponValue,
};