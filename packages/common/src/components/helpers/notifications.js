import { store } from 'react-notifications-component';
import { FLASH_MESSAGES_LIFE_TIME } from 'common/src/constants';

export const showSuccessMessages = (messages, title) => {
  
  for (let message of messages) {
    store.addNotification({
      title,
      message,
      type: "success",
      insert: "top",
      container: "bottom-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: FLASH_MESSAGES_LIFE_TIME,
      }
    });
  }
}

export const showErrorMessages = (messages, title) => {
  if (messages === undefined || messages.length===0)
    return store.addNotification({
      title: title ||"Error",
      message: "Error !",
      type: "danger",
      insert: "top",
      container: "bottom-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: FLASH_MESSAGES_LIFE_TIME,
      }
    });


  for (let message of messages) {
    store.addNotification({
      title,
      message,
      type: "danger",
      insert: "top",
      container: "bottom-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: FLASH_MESSAGES_LIFE_TIME,
      }
    });
  }
}

export const showInfoMessages = (messages, title) => {
  for (let message of messages) {
    store.addNotification({
      title,
      message,
      type: "info",
      insert: "top",
      container: "bottom-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: FLASH_MESSAGES_LIFE_TIME,
      }
    });
  }
}
