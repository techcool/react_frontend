import { yupResolver } from "@hookform/resolvers/yup";
// import convertToRankString from "common/src/components/helpers/convertToRankString";
import FormFields from "common/src/components/helpers/FormField";
import CopyIcon from "common/src/components/shared/copyIcon";
// import copy_icon from "common/src/images/copy_icon.svg";
// import googleIcon from "common/src/images/google.svg";
import msg_icon from "common/src/images/message-hover.svg";
// import newlogo from "common/src/images/new-logo.svg";
// import microsotofficeIcon from "common/src/images/office-365.svg";
// import ques_icon from "common/src/images/question_org.svg";
import { /*createClass,*/ sendInvitationEmail } from "common/src/old-api/classesActions";
import React from "react";
import { Button, Form /*Modal*/ } from "react-bootstrap";
// import { CopyToClipboard } from "react-copy-to-clipboard";
import { /*Controller,*/ useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
// import ReactSelect, { components } from "react-select";
import { GoogleClassRoom } from "teacher/src/components/teachers/dialogs/inviteDialog";
import * as yup from "yup";
import { Code } from "../../components/students/classes/index";

export default function InviteStudent({
  show,
  handleClose,
  classes
}) {
  const [next, setNext] = React.useState(false);
  const [classData, setClassData] = React.useState({});
  const [classRadio, setClassRadio] = React.useState(true);
  const [emailRadio, setEmailRadio] = React.useState(false);
  const [inviteType, setInviteType] = React.useState(1);
  const history = useHistory();

  const inviteUrlParts = window.location.href.split("/");

  React.useEffect(() => {
    if (show) {
      setClassRadio(true);
      setEmailRadio(false);
    }
  }, [show]);
  React.useEffect(() => {
    if (classes && classes.length > 0) {
      setClassData(classes[0]);
    }
  }, [classes]);

  const validationSchema = yup.object({
    emails: yup.string().required("Please Enter Emails")
  });

  const { register, handleSubmit, errors, control, watch } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema)
  });
  const onSubmit = async (data) => {
    sendInvitationEmail({
      class_id: classData._id,
      emails: data.emails
    });
    handleClose();
  };
  const setStudent = (email) => {
    sendInvitationEmail({
      class_id: classData._id,
      emails: email?.toString()
    });
    handleClose();
  };
  const handleChangeClass = (id) => {
    const data = classes.filter((item) => id === item._id);
    setClassData(data[0]);
  };

  const GoogeleClassAndOffice = () => {
    return (
      <div className="w-100">
        <span className="mb-3">
          <img src={ msg_icon } className="pr-2" height="18px" alt="" />
          Send an Email Invitation to Your Students
        </span>
        <p></p>
        <div className="btn-wrapper pt-0 mt-4 w-100">
          <GoogleClassRoom show={ true } setStudent={ setStudent } />
          { /* <Button
            // onClick={renderProps.onClick}
            // disabled={renderProps.disabled}
            className="secondary-btn mb-3 w-100"
            variant="secondary"
          >
            <img className="mr-3" alt="logo" src={googleIcon} /> From Google
          </Button> */ }
          { /* <MicrosoftButton /> */ }
          { /* <Button
            className="secondary-btn mb-3 w-100"
            src={newlogo}
            variant="secondary"
          >
            <img className="mr-3" alt="logo" src={microsotofficeIcon} /> Join
            With Office365
          </Button> */ }
        </div>
      </div>
    );
  };

  if (!classes) {
    return <> Loading....</>;
  }
  return (
    <div className="class-modal invite-class custom-radio">
      <div>
        <h2 className="content-h2 mb-0">{ classData.name }</h2>
        <p className="h6 text-dark mt-0 mb-3">Invite Students</p>
        <Form.Group controlId="exampleForm.ControlSelect1" className="mb-3">
          <Form.Label>Classes</Form.Label>
          <Form.Control
            as="select"
            className="form-control"
            onChange={ (e) => {
              handleChangeClass(e.target.value);
            } }
          >
            { classes?.map((item,index) => {
              return <option key={ index } value={ item._id }>{ item.name }</option>;
            }) }
          </Form.Control>
        </Form.Group>
        <div className="py-3 border-top">
          <Form.Check
            inline
            label="Using Class Code"
            className=""
            checked={ classRadio }
            name="invite"
            type="radio"
            onChange={ () => {
              setClassRadio(!classRadio);
              setEmailRadio(false);
            } }
          />
          <Form.Check
            inline
            label="By Email Addresses"
            name="invite"
            className=""
            checked={ !classRadio }
            type="radio"
            onChange={ () => {
              setEmailRadio(!emailRadio);
              setClassRadio(false);
            } }
          />
        </div>

        { classRadio && !emailRadio ? (
          <>
            <p className="mt-1">
              Have students visit{ " " }
              <Link
                to={ "/student-join-a-class?code=" + classData.code }
                className="text-dark-blue "
                target="_blank"
                rel="noopener noreferrer"
              >
                this link
              </Link>
              { " " }
              <CopyIcon text={                    
                inviteUrlParts[0] +
                  "//" +
                  inviteUrlParts[2] +
                  "/" +
                  "student-join-a-class?code=" +
                  classData.code 
              } 
              />
              { " " }
              and enter the class code.
            </p>
            <div className="d-flex align-items-center justify-content-start">
              <label className="mb-0">
                Class Code:{ " " }
              </label>
              <p className="text-dark-blue h6 mb-0 pl-2">
                { " " }
                <Code c={ classData } />
              </p>
            </div>

            <Button
              className="primary-btn-outline mb-3 w-100 mt-4"
              variant="secondary"
              onClick={ () => {
                history.push(`/teacher/classes/${classData._id}/show`);
              } }
            >
              Manage Class
            </Button>
          </>
        ) : (
          <>
            <form onSubmit={ handleSubmit(onSubmit) }>
              <Form.Group
                controlId="exampleForm.ControlSelect1"
                className="mb-3"
              >
                <Form.Control
                  as="select"
                  className="form-control"
                  onChange={ (e) => {
                    setInviteType(e.target.value);
                  } }
                >
                  <option default value={ 1 }>
                    Add Email Manually
                  </option>
                  <option value={ 2 }>Google Class</option>
                </Form.Control>
              </Form.Group>
              { {
                1: (
                  <>
                    <span className="email-section my-3 d-block">
                      <h6 className="h6">
                        <img
                          src={ msg_icon }
                          className="pr-2"
                          height="18px"
                          alt=""
                        />
                        Email Address
                      </h6>
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>
                          { " " }
                          Add one or more emails. Separate emails by comma.
                        </Form.Label>
                        <FormFields
                          as="textarea"
                          placeholder="Student email"
                          rows={ 5 }
                          className="input-bg"
                          type="text"
                          register={ register }
                          name="emails"
                          errors={ errors && errors.emails }
                        />
                      </Form.Group>
                    </span>
                    <div className="btn-wrapper flex-column pt-0 mt-4">
                      <Button
                        className="primary-btn mb-3 w-100"
                        variant="secondary"
                        type="submit"
                      >
                        Send Invitation
                      </Button>
                      <Button
                        className="primary-btn-outline mb-3 w-100"
                        variant="secondary"
                        onClick={ () => {
                          history.push(
                            `/teacher/classes/${classData._id}/show`
                          );
                        } }
                      >
                        Manage Class
                      </Button>
                    </div>
                  </>
                ),
                2: (
                  <div className="w-100">
                    <GoogeleClassAndOffice />
                  </div>
                )
              }[parseInt(inviteType)] || <>Something went wrong</> }
            </form>
          </>
        ) }
      </div>
    </div>
  );
}
