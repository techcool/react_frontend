import axios from 'common/src/api/axios';
import { showErrorMessages, showSuccessMessages } from 'common/src/components/helpers/notifications';

export const sendRequest = async ({
  method = 'GET',
  url,
  params = null,
  data = null,
  showSuccess = false,
  showError = true,
}) => {
  try {
    let response = await axios({
      method,
      url,
      ...(params && {
        params
      }),
      ...(data && {
        data
      }),
    });
    return response.data;
  } catch (err) {
    return [];
  }
}