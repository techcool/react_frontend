import React, { Component } from "react";
import {  Button, Form } from "react-bootstrap";
import ReactSelect, { components } from "react-select";

// For handling form submition and Validations
import { connect } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//Helper
import FormFields from "common/src/components/helpers/FormField";
import { setFreeTrialData, freeTrial } from "common/src/old-api/usersActions";
import {  CountriesList } from "common/src/constants/countries";
import { Country, State } from "country-state-list";
import {
  StudentGrades,
  HOW_DID_HEAR_ABOUT_US_OPTIONS,
} from "common/src/constants";

class Step3 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <ChildStep {...this.props} />;
  }
}
const mapStateToProps = (state) => {
  return {
    userData: state.user.freeTrialData,
  };
};
export default connect(mapStateToProps, { setFreeTrialData, freeTrial })(Step3);

// const country = Country.getAllCountries().map((country) => {
//   return {
//     value: country.isoCode,
//     flag: country.isoCode,
//     label: country.name,
//     phone: country.phonecode,
//   };
// });
const country = CountriesList.map((item) => {
  let country = Country.getCountryByCode(item.code);
  return {
    value: country.isoCode,
    flag: country.isoCode,
    label: country.name,
    phone: country.phonecode,
  };
});
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
function ChildStep(props) {
  const { setFreeTrialData, stepper, userData, freeTrial } = props;
  const [check, setCheck] = React.useState(false);
  const [err, setErr] = React.useState("");
  const [countrycode, setCountryCode] = React.useState({});
  const [state, setState] = React.useState({});
  const schooltype = [
    { value: "public", label: "Public" },
    { value: "private", label: "Private" },
    { value: "others", label: "Others" },
  ];

  const validationSchema = yup.object({
    grade: yup.object({
      value: yup.string().required("Please select Grade"),
    }),
    schooltype: yup.string().required("Please enter School name"),

    country: yup.object({
      value: yup.string().required("Please select Country"),
    }),
    state: yup.object({
      value: yup.string().required("Please select State"),
    }),
    about: yup.object({
      value: yup.string().required("Please select About"),
    }),
    countrycode: yup.object({
      value: yup.string().required("Please select Country Code"),
    }),
    phone: yup
      .string()
      .required("Please Enter the Phone Number")
      .min(10, "Phone Number is invalid")
      .max(10, "Phone Number is invalid"),
    // term: yup
    //   .bool()
    // .oneOf([true], 'Must Accept Terms and Conditions'),
  });
  const StateArr = (val) => {
    let temp = State.getStatesOfCountry(val);
    let state = temp.map((state) => {
      return {
        label: state.name,
        value: state.name,
      };
    });
    return state;
  };
  const {
    register,
    handleSubmit,
    errors,
    control,
    watch,
    reset,
    setValue,
    getValues,
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  React.useEffect(() => {
    if (watch("country") && watch("country").value) {
      let state = StateArr(watch("country").value);
      setState(state);
      setValue(
        "state",
        { value: "", label: "Please Select state" },
        { shouldValidate: true }
      );
    }
  }, [watch("country")]);

  React.useEffect(() => {
    if (check) {
      setErr(null);
    }
  }, [check]);
  const onSubmit = (data) => {
    if (!check) {
      setErr("Must Accept Terms and Conditions");
      return;
    }
    setErr(null);
    // setFreeTrialData({
    //   hearAboutUs: data.about.value,
    //   contact: "+" + data.country.phone + data.phone,
    //   school: data.schooltype.value,
    //   grade: data.grade.value,
    //   state: data.state.value,
    //   country: data.country.value,
    // });
    // console.log("-0000000000000000000000", userData);
    const finalData = {
      firstName: userData.FirstName,
      lastName: userData.LastName,
      role: userData.SIGN_UP_TYPE,
      email: userData.Email,
      provider: userData.provider,
      password: userData.Password,
      username: userData.UserName,
      passwordConfirmation: userData.Confirm,
      library: userData.Library,
      hearAboutUs: data.about.value,
      contact: data.countrycode.value + data.phone,
      school: data.schooltype,
      grade: data.grade.value,
      state: data.state.value,
      country: data.country.value,
    };
    freeTrial(finalData, stepper);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="custom-react-select"
      noValidate
      autoComplete="off"
    >
      <h2>Tell Us About You </h2>
      <Form.Group className="mb-4">
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
              options={StudentGrades}
            />
          )}
          name="grade"
          control={control}
          defaultValue={{ value: "" }}
        />
        {errors.grade && errors.grade.value && errors.grade.value.message && (
          <div className="text-validation text-danger">
            {errors.grade.value.message}
          </div>
        )}
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>How Did You Know About Us</Form.Label>
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
              placeholder="Select"
              options={HOW_DID_HEAR_ABOUT_US_OPTIONS.map((e) => ({
                value: e,
                label: e,
              }))}
            />
          )}
          name="about"
          control={control}
        />
        {errors.about && errors.about.value && errors.about.value.message && (
          <div className="text-validation text-danger">
            {errors.about.value.message}
          </div>
        )}
      </Form.Group>
      <Form.Group className="mb-4 country">
        <Form.Label>Country</Form.Label>
        <Controller
          render={(props) => (
            <ReactSelect
              classNamePrefix="react-select"
              onChange={(val) => {
                props.onChange(val);
              }}
              closeMenuOnSelect={true}
              components={{ Control }}
              onFocus={(val) => {
                props.onChange(val);
              }}
              placeholder="Select Country"
              options={country}
            />
          )}
          name="country"
          control={control}
        />
        {errors.country &&
          errors.country.value &&
          errors.country.value.message && (
            <div className="text-validation text-danger">
              {errors.country.value.message}
            </div>
          )}
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>State</Form.Label>
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
              placeholder="Select State"
              options={state}
              value={getValues("state")}
            />
          )}
          name="state"
          control={control}
        />
        {errors.state && errors.state.value && errors.state.value.message && (
          <div className="text-validation text-danger">
            {errors.state.value.message}
          </div>
        )}
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>School</Form.Label>
        {/* <Controller
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
              placeholder="Select School Type"
              options={schooltype}
            />
          )}
          name="schooltype"
          control={control}
          defaultValue={{ value: "" }}
        /> */}
        <FormFields
          placeholder="School"
          name="schooltype"
          type="text"
          register={register}
          errors={errors && errors.schooltype}
        />
        {/* {errors.schooltype &&
          errors.schooltype.value &&
          errors.schooltype.value.message && (
            <div className="text-validation text-danger">
              {errors.schooltype.value.message}
            </div>
          )} */}
      </Form.Group>
      <Form.Group className="mb-4 phone-number-field">
        <Form.Label>Phone</Form.Label>

        <Controller
          render={(props) => (
            <ReactSelect
              classNamePrefix="react-select"
              placeholder="Code"
              onChange={(val) => {
                props.onChange(val);
              }}
              closeMenuOnSelect={true}
              components={{ Control }}
              onFocus={(val) => {
                props.onChange(val);
              }}
              options={countryCode}
              // isDisabled={true}
            />
          )}
          name="countrycode"
          control={control}
        />
        <FormFields
          placeholder="Phone"
          name="phone"
          type="number"
          register={register}
          errors={errors && errors.phone}
        />
        {errors.countrycode &&
          errors.countrycode.value &&
          errors.countrycode.value.message && (
            <div className="text-validation text-danger">
              {errors.countrycode.value.message}
            </div>
          )}
      </Form.Group>
      <div className="language custom-checkbox">
        {["checkbox"].map((type) => (
          <div key={`inline-${type}`}>
            <Form.Check
              inline
              label={
                <>
                  I agree to Lit{" "}
                  <a
                    className="text-link"
                    href="https://www.learnlit.online/terms-of-use"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    Terms of use{" "}
                  </a>{" "}
                  and{" "}
                  <a
                    className="text-link"
                    href="https://www.learnlit.online/terms-of-use"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy.
                  </a>
                </>
              }
              name="terms"
              type={type}
              value={check}
              onChange={() => {
                setCheck(!check);
              }}
              id={`inline-${type}-1`}
            />
          </div>
        ))}
        {err && <div className="text-validation text-danger">{err}</div>}
      </div>

      <div className="d-flex align-items-center justify-content-between pt-4">
        <a
          className="back-link"
          href="#"
          title="Back"
          onClick={() => stepper.previous()}
        >
          <svg width="7" height="11" viewBox="0 0 7 11" fill="none">
            <path
              d="M6.16334 0.680948C6.46699 0.985908 6.49363 1.46215 6.24393 1.79717L6.16073 1.89313L2.7876 5.25145L6.16073 8.61205C6.46569 8.9157 6.49438 9.39182 6.24612 9.72791L6.16334 9.82423C5.85969 10.1292 5.38357 10.1579 5.04747 9.90963L4.95116 9.82684L0.967159 5.85999C0.661268 5.55541 0.63346 5.07753 0.883734 4.74145L0.967159 4.64519L4.95116 0.678335C5.28662 0.344322 5.82933 0.345492 6.16334 0.680948Z"
              fill="#3B3759"
            />
          </svg>
          Back
        </a>
        <Button
          type="submit"
          id="step3Submit"
          className="primary-btn"
          variant="primary"
        >
          Continue
        </Button>
      </div>
    </form>
  );
}
