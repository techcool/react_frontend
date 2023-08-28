/* eslint-disable eqeqeq */
import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { formateDate } from "common/src/components/helpers/dateFormatter";
import Input from "./input";
import Select from "./select";
import ReactSelect, { components } from "react-select";
import { Country } from "country-state-list";
import { StudentGrades } from "common/src/constants";
import { ChangeStudentPassword } from "common/src/components/shared/changePassword";
import { CountriesList } from "common/src/constants/countries";

const countryCode = CountriesList.map((item) => {
  let country = Country.getCountryByCode(item.code);
  return {
    value: country.phonecode,
    flag: country.isoCode,
    label: `(${country.phonecode})${country.name}`,
  };
});
const Control = ({ children, ...props }) => {
  let flag = props.getValue();
  flag = flag[0] ? flag[0].flag : "none";
  return (
    <components.Control {...props}>
      {children}
    </components.Control>
  );
};
const AccountPage = ({
  firstName,
  lastName,
  email,
  profileImage,
  school,
  schoolType,
  contact,
  schoolDistrict,
  grade,
  role,
  username,
  isTutor,
  tempMobile,
  creationDate,
  password,
  handleChanges,
  handleSubmit,
  RemoveImage,
  onFileChange,
}) => {
  const hiddenFileInput = React.useRef(null);
  const [show, setShow] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [error, setError] = React.useState(false);
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameValue, setUsernameValue] = React.useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  React.useEffect(() => {
    if (tempMobile && tempMobile.length) {
      const value = split_at_index(tempMobile, tempMobile.length - 10).split(
        ","
      );
      setNumber(value[1]);
      let country = Country.getAllCountries().filter(
        // eslint-disable-next-line eqeqeq
        (country) => country.phonecode == value[0]
      )[0];
      setCode({
        value: country?.phonecode,
        flag: country?.isoCode,
        label: `(${country?.phonecode})${country?.name}`,
      });
    }
  }, [tempMobile]);

  
  function split_at_index(value, index) {
    return value.substring(0, index) + "," + value.substring(index);
  }
  const handleUsername = (username) => {
    setUsernameValue(username.target.value);
    let usernameRegex = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/;
    if (!usernameRegex.test(username.target.value)) {
      setUsernameError(true);
    }else{
      setUsernameError(false);
      handleChanges(username);
    }
  }
  const onChange = (val) => {
    setCode(val);
    handleChanges({
      target: {
        id: "contact",
        value: val?.value + number,
      },
    });
  };
  function isNumeric(str) {
    if (typeof str != "string") return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
  }
  const onNumber = (val) => {
    if (isNumeric(val) && val.length < 11) {
      setError(false);
      setNumber(val);
      handleChanges({
        target: {
          id: "contact",
          value: code?.value + val,
        },
      });
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (usernameValue !== '') {
      let usernameRegex = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/;
      if (!usernameRegex.test(username)) {
        setUsernameError(true);
      }else{
        setUsernameError(false);
        handleChanges({target:{value:usernameValue,id:'username'}});
      }
    }
    if(!usernameError){
      if (role == "student") {
        if (number.length === 10) {
          handleSubmit(e);
        } else {
          setError(true);
        }
      } else {
        handleSubmit(e);
      }
    }
   
  };
  return (
    <div className="px-4 py-5 main-section top-zero">
      <form title="" onSubmit={onSubmit}>
        <Col
          className="card border-0 shadow-none px-4 py-4 mb-5 br-12 w-100"
          xs={12}
          md={7}
        >
          <Row>
            <Col xs={6} lg={6}>
              <h2 className="card-heading">My Account</h2>
            </Col>
            <Col xs={6} lg={6}>
              {role === "student" && (<Button
                variant="primary"
                className="primary-btn sm org-btn-outline"
                onClick={handleShow}
                style={{ marginRight: '0', marginLeft: 'auto' }}
              >
                Change Password
              </Button>)}
            </Col>
            <Col xs={12} className="mb-2">
              {" "}
              <h5 className="font-weight-bold">Personal Information</h5>
            </Col>
            {/* {role === "student" && (
              <Col
                xs={12}
                md={12}
                className="d-flex my-3 mb-4 justify-content-between align-items-center"
              >
                 <div className="d-flex align-items-center"> 
                   <div className="check-round bg-grey">
                    <img
                      src={
                        typeof profileImage === "object"
                          ? URL.createObjectURL(profileImage)
                          : profileImage && profileImage.length
                          ? profileImage
                          : user
                      }
                      height="50"
                      alt="Profile"
                    />
                  </div>
                 <input
                    type="file"
                    onChange={(e) => onFileChange(e)}
                    ref={hiddenFileInput}
                    hidden
                    // className="custom-file-input"
                    accept="image/png, image/jpeg"
                  /> 
                  {<Button
                    variant="primary"
                    onClick={handleClick}
                    className="primary-btn sm mx-4"
                  >
                    Change Profile
                  </Button> 
                   <Button
                  variant="danger"
                  
                  className=" mr-3"
                >
                  Remove
                </Button>{" "} 
                   <Link
                    to="/"
                    className="text-danger font-sm fw-600"
                    onClick={RemoveImage}
                  >
                    Remove
                  </Link> 
                </div>
               </Col> 
              )}*/}
            <Col xs={12} md={6} className="mb-2">
              {" "}
              <Input
                label={"First name :"}
                id="firstName"
                className="input-bg email-bg form-control"
                value={firstName}
                onChange={handleChanges}
                required={true}
              />{" "}
            </Col>
            <Col xs={12} md={6} className="mb-2">
              {" "}
              <Input
                label={"Last name:"}
                id="lastName"
                value={lastName}
                onChange={handleChanges}
                required={true}
              />{" "}
            </Col>
            <Col xs={12} md={6} className="mb-2">
              <Input
                label={"Email :"}
                id="email"
                type="email"
                value={email}
                onChange={handleChanges}
                required={true}
              />
            </Col>
            <Col xs={12} md={6} className="mb-2">
              <Input
                label={"Username :"}
                id="username"
                type="text"
                value={usernameValue ? usernameValue : username} 
                onChange={handleUsername}
                disabled={!username ? false : 
                  usernameValue != '' ? false : true}
                required={true}
              />
              <span>
              {usernameError && (
                <span className="text-danger">User Name must contain at least 5 alphanumeric characters, No special characters allowed</span>
              )}
            </span>
              
            </Col>
            {role === "student" && (
              <Col xs={12} md={6} className="mb-2">
                <label>Phone:</label>
                <div className="d-flex">
                  {" "}
                  <div xs={4} style={{ minWidth: "120px" }}>
                    {" "}
                    <ReactSelect
                      classNamePrefix="react-select"
                      className="custom-react-select custom-border"
                      placeholder="Code"
                      onChange={(val) => {
                        onChange(val);
                      }}
                      closeMenuOnSelect={true}
                      components={{ Control }}
                      onFocus={(val) => {
                        onChange(val);
                      }}
                      options={countryCode}
                      value={code}
                    // isDisabled={true}
                    />
                  </div>
                  <div xs={8}>
                    {" "}
                    <input
                      className="form-control custom-border"
                      // label={"Contact :"}
                      id="contact"
                      type="text"
                      min={10}
                      max={10}
                      value={number}
                      onChange={(e) => {
                        onNumber(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
                <span>
                  {error && (
                    <span className="text-danger">Number is not valid</span>
                  )}
                </span>
              </Col>
            )}
            <Col xs={12} md={6} className="mb-2">
              <Input
                label={"School :"}
                id="school"
                value={school}
                onChange={handleChanges}
                required={true}
              />{" "}
            </Col>
            {/* <Col xs={12} md={6}>
        <Select
          id="schoolType"
          v={schoolType}
          label="Public/Private/Others :"
          value={SchooldTypes.filter((s) => s.value === schoolType)[0]}
          options={SchooldTypes}
          onChange={handleChanges}
          required={true}
        />{" "}
      </Col> */}
            {/* <Col xs={12} md={6}>
        {" "}
        {schoolType === "public" && (
          <Input
            label={"District :"}
            id="schoolDistrict"
            value={schoolDistrict}
            onChange={handleChanges}
            required={true}
          />
        )}{" "}
      </Col> */}
            <Col xs={12} md={6} className="select-outer mb-2">
              {" "}
              <Select
                id="grade"
                className="form-control"
                v={grade}
                label="Grade :"
                value={
                  role === "teacher"
                    ? StudentGrades.filter((e) => e.value === grade)[0]
                    : role === "student"
                      ? StudentGrades.filter((e) => e.value === grade)[0]
                      : null
                }
                options={StudentGrades}
                onChange={handleChanges}
                required={true}
              />
            </Col>
            <Col xs={12} md={6} className="mb-2">
              <Input
                label={"Role :"}
                id="role"
                value={
                  role === "teacher" && isTutor
                    ? "Tutor"
                    : role === "teacher"
                      ? "Teacher"
                      : role === "student"
                        ? "Student"
                        : null
                }
                disabled={true}
              />{" "}
            </Col>
            <Col xs={12} md={6} className="mb-2">
              {" "}
              <Input
                label={"Member since:"}
                value={formateDate(creationDate)}
                disabled={true}
              />
            </Col>

            <Col xs={12} md={6} className="mb-2">
              <Input
                label={"Current password:"}
                id="password"
                type="password"
                value={password}
                autocomplete="new-password"
                onChange={handleChanges}
                required={true}
              />
            </Col>
            <Col xs={12} md={12} lg={7} className="mb-2">
              {role !== "student" && (
                <div className="link-btn form-group">
                  <Link to={`/${role}/account/change_password`}>
                    Change password
                  </Link>
                </div>
              )}

              <div className="d-flex">
                <Button
                  value="Update"
                  name="submit"
                  type="submit"
                  className="primary-btn mr-3"
                  variant="success"
                >
                  Update
                </Button>
                <Link name="cancel" className="primary-btn" to="/">
                  Cancel
                </Link>
              </div>
            </Col>
          </Row>
        </Col>
      </form>
      <Dialog handleClose={handleClose} show={show} role={role} />
    </div>
  );
};

export default AccountPage;

const Dialog = ({ handleClose, show, role }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {role == "student" && <ChangeStudentPassword />}
        </Modal.Body>
      </Modal>
    </>
  );
};
