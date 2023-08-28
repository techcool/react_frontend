const closeModal = () => {
  let eventObject = document.createEvent("Events");
  eventObject.initEvent("click", true, false);
  let target = document?.getElementById("close-modal");
  target.dispatchEvent(eventObject);
};
export default closeModal;
