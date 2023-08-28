const ValiadtionMessages = {
  freeTrial: {
    email: {
      required: "Please enter the email address.",
      invalid: "Please enter the valid email address.",
      max: "Email should have maximum 100 characters."
    },
    email_username: {
      required: "Please enter the email or username.",
      max: "Email | Username should have maximum 100 characters."
    },
    phone: {
      required: "Please enter the phone number.",
      invalid: "Please enter the valid phone number.",
      max: "Phone should have maximum 15 digit."
    },
    firstname: {
      required: "Please enter the First Name",
      invalid: "Please enter the valid first name.",
      max: "Name should have maximum 60 characters."
    },
    lastname: {
      required: "Please enter the Last Name",
      invalid: "Please enter the valid last name.",
      max: "Name should have maximum 60 characters."
    },
    username: {
      required: "Please enter the User Name",
      invalid: "Please enter the valid User Name.",
      max: "User Name should have maximum 100 characters.",
      match:
        "User Name must contain at least 5 alphanumeric characters, No special characters allowed."
    },
    school: {
      required: "Please enter the School Name",
      invalid: "Please enter the valid School Name.",
      max: "School Name should have maximum 100 characters.",
      min: "School Name should have minimum 2 characters."
    },
    message: {
      required: "Please enter the Message",
      invalid: "Please enter the valid Message",
      max: "Message should have maximum 100 characters."
    },
    password: {
      required: "Please enter the password",
      invalid: "Please enter the valid password.",
      max: "Password should have maximum 100 characters.",
      match:
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    },
    confirmPassword: {
      required: "Please enter the confirm password",
      match: "Confirm Password and Password should be match."
    },
    library: {
      required: "Please choose option for library."
    },
    state: {
      required: "Please choose option for state."
    },
    country: {
      required: "Please choose option for country."
    },
    step3: {
      grade: {
        required: "Please select option."
      },
      hearAboutUs: {
        required: "Please select option."
      },
      role: {
        required: "Please select role"
      }
    }
  },
  classCode: {
    required: "Please enter the class code.",
    invalid: "Please enter the valid class code."
  },
  Otp: {
    required: "Please enter the Otp.",
    invalid: "Please enter the valid class code."
  }
};

export default ValiadtionMessages;
