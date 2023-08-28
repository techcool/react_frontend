import DialogPopup from "common/src/components/shared/commingSoonDialog";
import {
  setFreeTrailSubComponent,
  setFreeTrialData
} from "common/src/old-api/usersActions";
import React, { Component, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";


import { useHistory } from "react-router-dom";

class LibraryHtml extends Component {
  constructor() {
    super();
    this.state = {
      show: true
    };
  }

  handleClose = () => {
    this.setState({ show: false });
    this.props.setFreeTrailSubComponent({ subcomponent: "" });
  };

  render() {
    return <ChildStep handleClose={ this.handleClose } { ...this.props } />;
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.user.freeTrialData
  };
};

export default connect(mapStateToProps, {
  setFreeTrialData,
  setFreeTrailSubComponent
})(LibraryHtml);

// Functional Component used in class for redux
function ChildStep(props) {
  const { handleClose, setFreeTrialData, setFreeTrailSubComponent, userData } =
    props;

  const [selectedValue, setSelectedValue] = useState("");
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const [show, setShow] = useState(false);
  const history = useHistory();

  const { register, handleSubmit, getValues } = useForm({
    mode: "all"
  });

  const handleRadio = (event) => {
    if (event.target.value === "english") {
      setShow(!show);
    } else {
      setSelectedValue(event.target.value);
    }
  };

  const onSubmit = (data) => {
    if (data.library === "") {
      return;
    }
    if (selectedValue !== "") {
      setIsFormSubmit(true);
      setFreeTrialData({ library: data.library });
      if (userData.SIGN_UP_TYPE === "student") {
        setFreeTrailSubComponent({ subcomponent: "studentsignup" });
        history.push({
          pathname: "/student-signup",
          state: { isValid: true }
        });
      } else if (userData.SIGN_UP_TYPE === "school") {
        setFreeTrailSubComponent({ subcomponent: "schoolsignup" });
        history.push({
          pathname: "/school-signup",
          state: { isValid: true }
        });
      } else {
        setFreeTrailSubComponent({ subcomponent: "joinwith" });
      }
    }
  };
  return (
    <>
      <Modal
        className="custom-modal pick-your-library"
        show={ true }
        centered
        onHide={ handleClose }
      >
        <div className="box">
          <Modal.Header closeButton>
            <Modal.Title>Pick Your Library</Modal.Title>
          </Modal.Header>
          <div className="language custom-radio">
            <form onSubmit={ handleSubmit(onSubmit) }>
              { ["radio"].map((type) => (
                <div key={ `inline-${type}` }>
                  <Form.Check
                    inline
                    label="English Library"
                    className="flag-1"
                    value="english"
                    name="library"
                    type={ type }
                    ref={ register }
                    onChange={ (e) => {
                      handleRadio(e);
                    } }
                    checked={ false }
                    id={ `inline-${type}-1` }
                  />

                  <Form.Check
                    inline
                    label="Spanish Library"
                    value="spanish"
                    name="library"
                    className="flag-2"
                    type={ type }
                    ref={ register }
                    onChange={ (e) => {
                      handleRadio(e);
                    } }
                    id={ `inline-${type}-2` }
                  />
                </div>
              )) }
              { isFormSubmit && selectedValue === "" && (
                <div className="text-validation text-danger">
                  Please choose library option
                </div>
              ) }
              <Button
                type="submit"
                className="primary-btn mt-4  w-100"
                variant="primary"
                onClick={ () => setIsFormSubmit(true) }
              >
                Continue
              </Button>
            </form>
          </div>
        </div>
      </Modal>
      <DialogPopup show={ show } handleClose={ () => setShow(!show) } interest="ENGLISH"/>
    </>
  );
}
