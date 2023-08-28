import queryString from "query-string";
import React from "react";
import SelectAssignment from "./selectAssignment";
import AssignmentStepper from "./stepper";

class CreateAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: this.props && this.props.location && this.props.location.search ? queryString.parse(this.props?.location?.search).videoId
        ? 1
        : 0 : 0,
      title: "",
      assignVideo: this.props && this.props.location && this.props.location.search ? queryString.parse(this.props?.location?.search).videoId
        ? queryString.parse(this.props?.location?.search).videoId
        : "" : ""
    };
  }
  handlePage = (page) => {
    this.setState({ page: page });
  };
  handleTitle = (val) => {
    this.setState({ title: val });
  };

  render() {
    return (
      {
        0: (
          <SelectAssignment
            handlePage={ this.handlePage }
            handleTitle={ this.handleTitle }
          />
        ),
        1: <AssignmentStepper 
          { ...this.props } 
          title={ this.state.title } 
          assignVideo={ this.state.assignVideo }
        />
      }[this.state.page] || <></>
    );
  }
}

export default CreateAssignment;
