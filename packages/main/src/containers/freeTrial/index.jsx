import React from "react";
import { connect } from "react-redux";

import JoinWith from "./joinWith";
import Library from "./library";
import SignUpAs from "./signUpAs";

class FreeTrial extends React.Component {
  constructor() {
    super();
    this.state = {
      componentLoad: "signupas"
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.FREE_TRIAL_SUBCOMPONENT) {
      return {
        componentLoad: props.FREE_TRIAL_SUBCOMPONENT || state.componentLoad
      };
    }
    return null;
  }
  // componentDidMount(){
  //   switch (this.props.FREE_TRIAL_SUBCOMPONENT) {
  //     // case 'stepper' || 'tutor':
  //     //     window.location.href = "/teacher/signup";
  //     //     return false;
  //     //   break;
  //     // case 'studentsignup':
  //     //     window.location.href = "/student/signup";
  //     //     return false;
  //     //   break;
  //     // case 'schoolsignup':
  //     //     window.location.href = "/school/signup";
  //     //     return false;
  //     //   break;
  //     // case 'schoolcreatepassword':
  //     //     window.location.href = "/school/createpassword";
  //     //     return false;
  //     //   break;

  //     // default:
  //     //   break;
  //   }
  // }

  renderSwitch(param) {
    switch (param) {
    case "signupas":
      return <SignUpAs />;
    case "library":
      return <Library />;
    case "joinwith":
      return <JoinWith />;
    default:
      return null;
    }
  }

  render() {
    const { componentLoad } = this.state;
    return <React.Fragment>{ this.renderSwitch(componentLoad) }</React.Fragment>;
  }
}

const mapStateToProps = (state) => {
  return {
    FREE_TRIAL_SUBCOMPONENT: state.user.FREE_TRIAL_SUBCOMPONENT
  };
};
export default connect(mapStateToProps, {})(FreeTrial);
