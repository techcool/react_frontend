import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
const Form = ({ title, children, onSubmit, style }) => {
  const defaultStyle = {
    width: "100%",
    maxWidth: "400px",
    margin: "20px",
    padding: "20px",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, .075)",
    borderRadius: "5px"
  };
  const customizedStyle = Object.assign({}, defaultStyle, style);
  const { role } = useSelector((state) => state.user);
  return role !== "student" ? (
    <Container>
      <form onSubmit={ onSubmit } style={ customizedStyle }>
        { title && (
          <div className="my-3 mb-4 font-weight-bold h4 text-black border-bottom pb-4">
            { title }
          </div>
        ) }
        { children }
      </form>
    </Container>
  ) : (
    <form onSubmit={ onSubmit } style={ customizedStyle }>
      { children }
    </form>
  );
};
export const FormOut = Form;
export default Form;
