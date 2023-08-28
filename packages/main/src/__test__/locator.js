/**
 * Locator or Page Factor : This File is configruation data 
 * which we are using in perform testing
 */

import { Config } from "./config";

export const HomePage = `${Config.baseUrl}`;

export const LoginPage = {
  url: `${Config.baseUrl}/login`,
  email: "input[name='email']",
  password: "input[name='password']",
  inputValue: {
    student: {
      email: "firststudent@yopmail.com",
      password: "lit@dev40"
    },
    teacher: {
      email: "manga@yopmail.com",
      password: "lit@dev40"
    },
    school: {
      email: "test0900@yopmail.com",
      password: "lit@dev40"
    }

  },
  loginButton: "button[id='submit_btn']"
};

/* Free Trial Sign up For different Role like Teacher, Student Etc.*/

export const FreeTrial = {
  menu: "//a[contains(text(), 'Free Trial')]",
  StudentRoleButtton: "//button[contains(text(),'Start As a Student')]",
  Library: "input[name=\"library\"]",
  LibraryDialogSubmit: "//button[contains(text(),'Continue')]"
};

// For Teacher | Tutor Role

export const TeacherSignup = {
  url: `${Config.baseUrl}`,
  step1: {
    email: "input[name='email']",
    inputValue: {
      email: "silvertesti@yopmail.com",
      tutorEmail:"silo4545@yopmail.com"
    }
  },
  step2: {
    firstname: "input[name='firstname']",
    lastname: "input[name='lastname']",
    username: "input[name='username']",
    password: "input[name='password']",
    confirm: "input[name='confirm']",
    inputValue: {
      firstname: "Ajay",
      lastname: "Kumar",
      username: "Aj023",
      password: "lit@dev40",
      confirm: "lit@dev40"
    }
  },
  step3: {
    grade: "input[id='react-select-2-input']",
    hearabout: "input [id='react-select-3-input']",
    country: "input[id='react-select-4-input']",
    state: "input[id='react-select-5-input']",
    school: "input[id='react-select-6-input']",
    phone: "input[name='phone']",

    inputValue: {
      grade: "1st",
      hearabout: "Facebook",
      country: "Japan",
      state: "Shiga Prefecture",
      school: "Public",
      phone: "9808810335"
    }

  }

};

// For Student Role

export const StudentSignup = {
  firstname: "input[name='firstname']",
  lastname: "input[name='lastname']",
  username: "input[name='username']",
  aboutUs: "#react-select-2-input",
  grade: "#react-select-3-input",
  email: "input[name='email']",
  password: "input[name='password']",
  confirm: "input[name='confirm']",
  inputValue: {
    firstname: "sam",
    lastname: "dueso12",
    username: "d856uoeso",
    aboutUs: "Facebook",
    grade: "1st",
    email: "mp4syu78787@yopmail.com",
    password: "lit@dev40",
    confirm: "lit@dev40"
  },
  submitBtnId: "button[id='step3Submit']"
};

// School Role

export const SchoolSignup = {
  url: `${Config.baseUrl}`,
  step1: {
    firstname: "input[name='firstname']",
    lastname: "input[name='lastname']",
    username: "input[name='username']",
    email: "input[name='email']",
    message: "textarea[name='message']",
    hearabout: "#react-select-2-input",
    role: "#react-select-3-input",
    country: "#react-select-4-input",
    state: "#react-select-5-input",
    phone: "input[name='phone']",
    school: "input[name='school']",
    inputValue: {
      firstname: "Ajay",
      lastname: "Kumar",
      username: "Aj023",
      hearabout: "Facebook",
      country: "Japan",
      state: "Shiga Prefecture",
      school: "MKSSM",
      phone: "9808810335",
      role: "School Admin",
      email: "tty876@yopmail.com",
      message: `Lorem Ipsum is simply dummy text of the print
            ing and typesetting industry. Lorem Ipsum has been the industry `

    }
  },
  step2: {
    password: "input[name='password']",
    confirm: "input[name='confirm']",
    inputValue: {
      password: "lit@dev40",
      confirm: "lit@dev40"
    }
  }

};

/******************************** Free Trial Sign up End ********************************/

/********************** Join A class Sign up  | Login ***********************************/

export const JoinAClass = {
  menu: "//a[contains(text(), 'Join A Class')]",
  step1: {
    classCode: "input[name='classCode']",
    inputValue: {
      classCode: "eu0x6v0"
    },
    submitBtnId: "button[id='step1Submit']"
  },
  step2: {
    firstRadio: "#inline-radio-1",
    secRadio: "#inline-radio-2",
    inputValue: {
      classCode: "eu0x6v0"
    },
    submitBtnId: "button[id='step2Submit']"
  },
  step3: {
    firstname: "input[name='firstname']",
    lastname: "input[name='lastname']",
    username: "input[name='username']",
    aboutUs: "#aboutUs",
    grade: "#grade",
    email: "input[name='email']",
    password: "input[name='password']",
    confirm: "input[name='confirm']",
    inputValue: {
      firstname: "ram",
      lastname: "kumar",
      username: "ram789",
      aboutUs: "Facebook",
      grade: "1st",
      email: "yop3456@yopmail.com",
      password: "lit@dev40",
      confirm: "lit@dev40"
    },
    submitBtnId: "button[id='step3Submit']",
    backBtnId: "a[id='backBtn']"

  }
};

/********************** Join A class Sign up  | Login END ********************************/

/********************** Add teacher By student *******************************************/
export const AddATeacher = {
  menu: "#menu_1",
  submenu: "#menu_1_subMenuIndex_0",
  firstname: "input[name='firstName']",
  lastname: "input[name='lastName']",
  email: "input[name='email']",
  country: "#react-select-2-input",
  state: "#react-select-3-input",
  school: "input[name='school']",
  phone: "input[name='contact']",
  grade: "#react-select-5-input",
  inputValue: {
    firstname: "Apolline",
    lastname: "deos",
    email: "zrpmc@yopmail.com",
    country: "United States",
    state: "Alabama",
    school: "testschool",
    phone: "1234567890",
    grade: "K-5"
  },
  sendInviteSubmit:"#sendInviteSubmit",
  continue:"#confirmMessage"
};
/********************** Add teacher By student END ***************************************/

/**
 * Forget password
 */
export const ForgetPassword ={
  email :{
    selector: "input[name='email']",
    value:"manga@yopmail.com"
  },
  phone:{
    selector: "input[name='phone']",
    value:"919690508043"
  },
  otp:{
    selector: "input[name='otp']",
    value:"700700"
  }
};
