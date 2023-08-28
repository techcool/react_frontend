import { DashFooter } from "common/src/components/shared/dashFooter";
import { fetchClasses } from "common/src/old-api/classesActions";
import React from "react";
import Invite from "./invite";


class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: []
    };
  }
  componentDidMount() {
    this.getClass();
  }

  async getClass() {
    const data = await fetchClasses({});
    if (data) {
      this.setState({ classes: data });
    }
  }
  render() {
    return (
      <React.Fragment>
        <div
          className="row mx-0 py-5 px-5  bg-grey"
          style={ { padding: "20px !important" } }
        >
          <div className="bg-white col-12 py-3 br-12 px-0">
            <div className="col-md-8 px-0">
              <Invite
                classes={ this.state.classes }
                { ...this.props }
                handleClose={ () => {} }
              />
            </div>
          </div>
        </div>

        <DashFooter />
      </React.Fragment>
    );
  }
}

export default Index;
