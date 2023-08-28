import axios from 'common/src/api/axios'

const fetchEmail = async ({ query }) => {
  const url = `emails`

  try {
    const response = await axios({
      method: 'GET',
      url,
      params: query
    })
    return response.data
  } catch (error) {
    return false;
  }
}

const postEmail = async ({ query }) => {
  const url = `emails`;

  try {
    const response = await axios({
      method: 'PUT',
      url,
      data: query
    })
    return true;
  } catch (error) {
    return false;
  }
}

const sendVerificationsEmail = async ({target})=>{
  const url = `emails/send_verification_emails`;

  try {
    const response = await axios({
      method: 'POST',
      url,
      data: {target}
    })
    return true;
  } catch (error) {
    return false;
  }
}

const sendEmail = async({title,content,target})=>{
  const url = `emails/send_email`;

  try {
    const response = await axios({
      method: 'POST',
      url,
      data: {target,title,content}
    })
    return true;
  } catch (error) {
    return false;
  }
}

export{
  fetchEmail,
  postEmail,
  sendVerificationsEmail,
  sendEmail,
}