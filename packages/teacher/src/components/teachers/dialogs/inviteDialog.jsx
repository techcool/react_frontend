import { yupResolver } from "@hookform/resolvers/yup";
import FormFields from "common/src/components/helpers/FormField";
import CommingSoonDialog from  "common/src/components/shared/commingSoonDialog";
import copy_icon from "common/src/images//copy_icon.svg";
import googleIcon from "common/src/images//google.svg";
import msg_icon from "common/src/images//message-hover.svg";
import newlogo from "common/src/images//new-logo.svg";
import microsotofficeIcon from "common/src/images//office-365.svg";
import ques_icon from "common/src/images//question_org.svg";
import {
  fetchClassesFromGoogle,
  fetchStudentsFromGoogle,
  importClasses,
  sendInvitationEmail
} from "common/src/old-api/classesActions";
import React, { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import GoogleLogin from "react-google-login";
import { useForm } from "react-hook-form";
import MicrosoftLogin from "react-microsoft-login";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
// import ReactSelect, { components } from "react-select";
import * as yup from "yup";
import { Code } from "../../students/classes/index";
// import { createClass } from "common/src/old-api/classesActions";
// import convertToRankString from "common/src/components/helpers/convertToRankString";

export default function InviteStudent({
  show,
  handleClose,
  classData
}) {
  // const [next, setNext] = React.useState(false);
  const [inviteType, setInviteType] = React.useState(1);
  const [classRadio, setClassRadio] = React.useState(true);
  const [emailRadio, setEmailRadio] = React.useState(false);
  const history = useHistory();
  const inviteUrlParts = window.location.href.split("/");
  React.useEffect(() => {
    if (show) {
      setClassRadio(true);
      setEmailRadio(false);
    }
  }, [show]);

  const validationSchema = yup.object({
    emails: yup.string().required("Please Enter Emails")
  });

  const { register, handleSubmit, errors } = useForm({
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
  const GoogeleClassAndOffice = () => {
    return (
      <div className="w-100">
        <span className="mb-3">
          <img src={ msg_icon } className="pr-2" height="18px" alt="" />
          Send an Email Invitation to Your Students
        </span>
        <p></p>
        <div className="btn-wrapper pt-2 mt-4 w-100 mb-4">
          <GoogleClassRoom show={ true } setStudent={ setStudent } />
        </div>
      </div>
    );
  };
  if (!classData) {
    return <> </>;
  }

  return (
    <Modal
      show={ show }
      className="class-modal custom-radio"
      centered
      onHide={ handleClose }
    >
      <Modal.Body>
        <div>
          <h2 className="content-h2 mb-0">{ classData.name }</h2>
          <p className="h6 text-dark mt-0 mb-3">Invite Students</p>
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
              <div className="d-flex align-items-center justify-content-start">
                <label className="mb-0">
                  <img src={ ques_icon } className="pr-2" height="18px" alt="" />
                  Class Code:{ " " }
                </label>
                <p className="text-dark-blue h6 mb-0 pl-2">
                  { " " }
                  { /* {classData.code}{" "}
                  <CopyToClipboard text={classData.code}>
                    <img
                      src={copy_icon}
                      className="ml-2 "
                      style={{ cursor: "pointer" }}
                      alt="copy"
                      title="Copy Code"
                    />
                  </CopyToClipboard> */ }
                  <Code c={ { code: classData.code } } />
                </p>
              </div>
              <p className="mt-3">
                Have students visit{ " " }
                <Link
                  to={ "/student/join-a-class?code=" + classData.code }
                  className="text-dark-blue "
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  { inviteUrlParts[0] +
                    "//" +
                    inviteUrlParts[2] +
                    "/" +
                    "student/join-a-class?code=" +
                    classData.code }
                </Link>{ " " }
                and enter the class code.
              </p>
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
          <Button
            className="primary-btn-outline mb-3 w-100"
            variant="secondary"
            onClick={ () => {
              history.push(`/teacher/classes/${classData._id}/show`);
              handleClose();
            } }
          >
            Manage Class
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

// const ImportGoogleClassRoom =()=>{
//   return
// }

function MicrosoftButton(props) {
  const authHandler = (err, data) => {
    // console.log(err, data);
  };

  return (
    <MicrosoftLogin
      clientId={ "f8c7976f-3e93-482d-88a3-62a1133cbbc3" }
      authCallback={ authHandler }
      redirectUri={ "https://alexandrtovmach.github.io/react-microsoft-login/" }
    >
      <Button className="secondary-btn w-100" src={ newlogo } variant="secondary">
        <img className="mr-3" alt="logo" src={ microsotofficeIcon } /> Join With
        Office365
      </Button>
    </MicrosoftLogin>
  );
}

export const GoogleClassRoom = ({ show, setStudent }) => {
  const { accessToken, role } = useSelector((state) => state.user);
  const [next, setNext] = React.useState(false);
  const [afterLogin, setAfterLogin] = React.useState(false);
  const [classes, setClasses] = React.useState([]);
  const [alldata, setAllData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [responseMessage, setResponseMessage] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [googleAccessToken, setAccessToken] = React.useState("");
  React.useEffect(() => {
    if (show) {
      setNext(false);
      setClasses([]);
      setLoading(false);
      setAllData([]);
      setResponseMessage("");
      setSelected([]);
      setAfterLogin(false);
    }
  }, [show]);

  const onSocialLogin = async (data) => {
    if (!data.error) {
      const response = await fetchClassesFromGoogle({
        accessToken: data.accessToken
      });
      setAccessToken(data.accessToken);
      if (response.courses) {
        setClasses(response.courses);
      } else {
        setClasses([]);
      }
      setAfterLogin(true);
      setLoading(false);
    }
  };

  const handleChange = (e, course) => {
    if (e.target.checked) {
      selected.push(course);
    } else {
      const temp = selected.filter((item) => item.id !== course.id);
      setSelected(temp);
    }
  };

  const setAll = (e) => {
    if (e.target.checked) {
      // let selected = classes.map((item) => item.id)
      setSelected(classes);
    } else {
      setSelected([]);
    }
  };

  const handlClassImport = async (e) => {
    setLoading(true);
    setResponseMessage("");
    let result = false;
    e.preventDefault();
    let allData = [];
    let request = null;

    let i = 0;
    selected.forEach(async (course) => {
      i++;
      request = getStudents(course.id);
      await request.then((data) => {
        Object.assign(course, data);
        allData.push(course);
        if (i == allData.length) {
          result = importClass(allData);
        }
      });
    });

    setAllData(allData);
    setTimeout(() => {
      if (result) {
        setLoading(false);
      }
    }, 4000);
  };

  const importClass = async (allData) => {
    const response = await importClasses({ accessToken, data: allData });

    if (response) {
      const message =
        {
          error: response.response,
          success: response
        }[response.type] || "Something Went wrong";

      setResponseMessage(message);
    }
    return true;
  };

  const getStudents = (courseId) => {
    return new Promise((resolve, reject) => {
      fetchStudentsFromGoogle({
        accessToken: googleAccessToken,
        courseId
      }).then(async (data) => {
        resolve(data);
        const student = data?.students?.map(
          (item) => item.profile.emailAddress
        );
        setStudent(student);
      });
    });
  };

  const Dialog = () => {
    const [show,setShow]=useState(false);
    if (loading)
      return (
        <div className="text-center">
          <h2 className="content-h2 mb-0">Import With Google Classroom</h2>
          <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="grow" variant="info" size={ "sm" } />
            <Spinner animation="grow" variant="info" size={ "md" } />
            <Spinner animation="grow" variant="info" size={ "sm" } />
          </div>
          <div className="mt-3">
            <h5 className="content-h5 mb-2">Importing ....</h5>
            <span>Please do not refresh the page.</span>
          </div>
        </div>
      );

    if (responseMessage.length > 0 || responseMessage.response)
      return (
        <div>
          <h2 className="content-h2 mb-0">From Google Classroom</h2>
          <div className="box-complete mt-3">
            { responseMessage.response ? (
              <>
                <p className="mb-2">
                  { responseMessage.response?.classCreatedCount
                    ? "Import complete."
                    : "Import Failed" }
                </p>
                <p className="mb-2">
                  { responseMessage.response?.classCreatedCount
                    ? `${responseMessage.response?.classCreatedCount} out of ${alldata?.length || 0
                    } classes imported`
                    : "No Class Imported" }
                </p>
                { /* <p className="mb-2">
                  7 out of 7 student class enrollments have been imported.
                </p> */ }
              </>
            ) : (
              <p className="mb-2">{ responseMessage }</p>
            ) }
          </div>
          <div className="btn-wrapper  pt-0 mt-4">
            { /* <Button
              className="primary-btn w-100"
              variant="secondary"
              onClick={() => handleClose()}
            >
              Manage Class
            </Button> */ }
          </div>
        </div>
      );
    return (
      <>
        { " " }
        { afterLogin ? (
          classes && classes.length ? (
            <Modal.Body>
              <div className="text-center">
                <h3 className="h4 text-dark font-weight-bold mt-4">
                  Import with Google Classroom
                </h3>
                <p>
                  Select classes to import. Note: The import process may take a
                  few minutes to complete
                </p>
                <form onSubmit={ handlClassImport }>
                  <div className="d-flex custom-checkbox mt-4 row">
                    <div className="col" style={ { textAlign: "left" } }>
                      <Form.Check
                        inline
                        className=""
                        name="card"
                        checked={ selected.length == classes.length }
                        type={ "checkbox" }
                        label={ "Select All" }
                        onChange={ (e) => {
                          setAll(e);
                        } }
                      />
                    </div>

                    { classes &&
                      classes.map((item) => {
                        return (
                          <div
                            key={ item._id }
                            className="col-sm-12 "
                            style={ { textAlign: "left" } }
                          >
                            <Form.Check
                              inline
                              className="mt-4"
                              name="card"
                              checked={
                                selected.filter((i) => i.id == item.id)[0]
                              }
                              type={ "checkbox" }
                              label={ item.name }
                              onChange={ (e) => {
                                handleChange(e, item);
                              } }
                            />
                          </div>
                        );
                      }) }
                  </div>
                  <Button
                    variant="primary"
                    className="primary-btn w-100 mt-4"
                    type="submit"
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </Modal.Body>
          ) : (
            <Modal.Body>
              <div>
                <h2 className="content-h2 mb-0">
                  Import With Google Classroom
                </h2>
                <div className="box-complete mt-3">
                  <p className="mb-2">No Class Found</p>
                </div>
              </div>
            </Modal.Body>
          )
        ) : next ? (
          <Modal.Body></Modal.Body>
        ) : (
          <>
            <GoogleLogin
              clientId={ process.env.REACT_APP_GOOGLE_CLIENT_ID }
              render={ (renderProps) => (
                // <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
                <Button
                  onClick={ () => {
                    setShow( true );
                    // renderProps.onClick();
                    // setLoading(true);
                  } }
                  // disabled={renderProps.disabled}
                  className="secondary-btn mb-3 w-100"
                  variant="secondary"
                >
                  <img className="mr-3" alt="logo" src={ googleIcon } /> From Google
                  Classroom
                </Button>
              ) }
              onSuccess={ onSocialLogin }
              onFailure={ onSocialLogin }
              cookiePolicy={ "single_host_origin" }
              scope="https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.profile.emails"
            />
            <CommingSoonDialog
              show={ show }
              headerMessage={ "Coming in few days!" }
              handleClose={ () => setShow(false) }
            />
          </>
        ) }
      </>
    );
  };

  return <Dialog />;
};
