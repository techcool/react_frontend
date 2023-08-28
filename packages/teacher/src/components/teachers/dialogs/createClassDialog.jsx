/* eslint-disable eqeqeq */
import CommingSoonDialog from "common/src/components/shared/commingSoonDialog";
// import FormFields from "../../../helpers/FormField";
// import newlogo from "common/src/images//new-logo.svg";
import googleIcon from "common/src/images/google.svg";
import {
  // createClass,
  fetchClassesFromGoogle,
  importClasses,
  fetchStudentsFromGoogle
} from "common/src/old-api/classesActions";
import React, { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
// import convertToRankString from "../../../helpers/convertToRankString";
// import ReactSelect, { components } from "react-select";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";
// import { ShowExercicesWithoutAnswers } from "../../exercisePage/practicePage/showExerciseContent/withoutAnswers";
import CreateClassPage from "../../../pages/createClass";
export default function CreateClass({
  show,
  handleClose,
  role,
  accessToken,
  fetchClasses,
  isDialog
}) {
  // const history = useHistory();
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
  // const validationSchema = yup.object({
  //   name: yup.string().required("Please Enter Class Name"),
  //   grade: yup.object({
  //     value: yup.string().required("Please select Grade"),
  //   }),
  // });

  // const { register, handleSubmit, errors, control, watch } = useForm({
  //   mode: "all",
  //   resolver: yupResolver(validationSchema),
  // });
  // const onSubmit = async (data) => {
  //   const class_id = await createClass({
  //     accessToken,
  //     role,
  //     name: data.name,
  //     grade: data.grade.value,
  //   });
  //   if (class_id) {
  //     fetchClasses();
  //     handleClose();
  //   }
  // };

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
      }).then((data) => {
        resolve(data);
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
          <h2 className="content-h2 mb-0">Import With Google Classroom</h2>
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
                    ? `${responseMessage.response?.classCreatedCount} out of ${
                      alldata?.length || 0
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
            <Button
              className="primary-btn w-100"
              variant="secondary"
              onClick={ () => handleClose() }
            >
              Manage Class
            </Button>
          </div>
        </div>
      );
    return (
      <>
        { " " }
        { afterLogin ? (
          classes && classes.length ? (
            <div>
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
            </div>
          ) : (
            <div>
              <div>
                <h2 className="content-h2 mb-0">
                  Import With Google Classroom
                </h2>
                <div className="box-complete mt-3">
                  <p className="mb-2">No Class Found</p>
                </div>
              </div>
            </div>
          )
        ) : next ? (
          <div>
            { /* <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="content-h2 text-center">Create a Class</h2>
                <Form.Group className="mb-4">
                  <FormFields
                    name="name"
                    label="Class Name"
                    type="text"
                    className=""
                    placeholder="Enter Class Name"
                    register={register}
                    errors={errors && errors.name}
                  />
                </Form.Group>
                <Form.Group
                  controlId="exampleForm.ControlSelect1"
                  className="mb-3"
                >
                  <Form.Label>Grade</Form.Label>
                  <Controller
                    render={(props) => (
                      <ReactSelect
                        classNamePrefix="react-select"
                        onChange={(val) => {
                          props.onChange(val);
                        }}
                        closeMenuOnSelect={true}
                        onFocus={(val) => {
                          props.onChange(val);
                        }}
                        placeholder="Select Grade"
                        options={[
                          ...Array(12)
                            .fill(0)
                            .map((v, i) => {
                              return {
                                value: i + 1,
                                label: convertToRankString(i + 1),
                              };
                            }),
                          { value: -1, label: "Other" },
                        ]}
                      />
                    )}
                    name="grade"
                    control={control}
                    defaultValue={{ value: "" }}
                  />
                  {errors.grade &&
                    errors.grade.value &&
                    errors.grade.value.message && (
                      <div className="text-validation text-danger">
                        {errors.grade.value.message}
                      </div>
                    )}
                </Form.Group>
                <div className="btn-wrapper flex-column pt-0 mt-4">
                  <Button
                    className="primary-btn mb-3 w-100"
                    variant="secondary"
                    type="submit"
                  >
                    Create a Class
                  </Button>
                </div>
              </form>
            </div> */ }

            <Button
              className="primary-btn mb-3"
              variant="secondary"
              onClick={ () => setNext(false) }
            >
              Back
            </Button>
            <CreateClassPage dialog={ true } />
          </div>
        ) : (
          <div className="create-box">
            <div className="py-4 px-4">
              <form>
                <h2 className="content-h2 text-center">Create a Class</h2>

                <div className="btn-wrapper flex-column pt-0 mt-4">
                  <Button
                    className="primary-btn mb-3 w-100"
                    variant="secondary"
                    onClick={ () => {
                      setNext(true);
                    } }
                  >
                    Create a Class on Lit
                  </Button>

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
                        <img className="mr-3" alt="logo" src={ googleIcon } />{ " " }
                        Import From Google Classroom
                      </Button>
                    ) }
                    uxMode="redirect"
                    onSuccess={ onSocialLogin }
                    onFailure={ onSocialLogin }
                    cookiePolicy={ "single_host_origin" }
                    scope="https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.rosters https://www.googleapis.com/auth/classroom.profile.emails"
                  />
                  <CommingSoonDialog
                    show={ show }
                    headerMessage={ "Coming in few days!" }
                    handleClose={ () => setShow(false) }
                  />

                </div>
              </form>
            </div>
          </div>
        ) }
      </>
    );
  };
  if (isDialog) return <Dialog />;
  return (
    <div>
      <Modal
        show={ show }
        className="class-modal"
        centered
        onHide={ () => {
          fetchClasses();
          handleClose();
        } }
      >
        <Modal.Body>
          <Dialog />
        </Modal.Body>
      </Modal>
    </div>
  );
}
