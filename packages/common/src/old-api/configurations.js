import axios from 'common/src/api/axios';

const fetchConfigurations = async ({  query }) => {
  const url = `configurations`;
  try {
    const response = await axios({
      method: 'GET',
      url,
      params: query
    });
    return response.data;
  } catch (error) {
    return false;
  }
}

const updateConfigurations = async ({ query }) => {
  const url = `configurations`;
  try {
    const response = await axios({
      method: 'PUT',
      url,
      data: query
    });
    return true;
  } catch (error) {
    return false;
  }
}

export {
  fetchConfigurations,
  updateConfigurations,
}



