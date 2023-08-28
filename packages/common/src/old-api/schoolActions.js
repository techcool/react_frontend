import axios from 'axios';
import {
  showSuccessMessages,
  showErrorMessages
} from 'common/src/components/helpers/notifications';

const addTeacher = ({
  firstName,
  lastName,
  email,
  country,
  state,
  contact,
  grade,                
  school,
  accessToken,
  role
}) => async dispatch => {
  try {
    const response = await axios({
      url:'/api/school_admin/teachers',
      method:"POST",
      headers: { 'Authorization': `Bearer ${accessToken}` },
      data: {
        firstName,
        lastName,
        email,
        country,
        state,
        contact,
        grade,
        school
      }
    });
    const { messages } = response.data;
    showSuccessMessages(messages, 'Invite sent');
    return true;
  } catch (err) {
    if (err.response.status === 400) {
      const { messages } = err.response.data
      showErrorMessages(messages, 'Authentication')
    }
    return false;
  }
}


export {
  addTeacher
}