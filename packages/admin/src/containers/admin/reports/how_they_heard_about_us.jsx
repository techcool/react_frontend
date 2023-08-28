import { HOW_DID_HEAR_ABOUT_US_OPTIONS } from "common/src/constants";
import { fetchHowDidTheyHearAboutUsReport } from "common/src/old-api/reportsAction";
import React from "react";
import { connect } from "react-redux";

const StatisticsTable = ({ data }) =>
  <table className="table">
    <thead>
      <tr>
        <th>
        </th>
        { HOW_DID_HEAR_ABOUT_US_OPTIONS.map((e,index) => <th key={ index } scope="col">{ e }</th>) }
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>
          Teachers
        </th>
        {
          HOW_DID_HEAR_ABOUT_US_OPTIONS.map(
            (e,index )=>
              <td key={ index }>
                {
                  data.filter(r => r.role === "teacher" && r.hearAboutUs === e).map(r => r.count)[0] || 0
                }
              </td>
          )
        }
      </tr>
      <tr>
        <th>
          Tutors
        </th>
        {
          HOW_DID_HEAR_ABOUT_US_OPTIONS.map(
            (e,index) =>
              <td key={ index }>
                {
                  data.filter(r => r.role === "tutor" && r.hearAboutUs === e).map(r => r.count)[0] || 0
                }
              </td>
          )
        }
      </tr>
      <tr>
        <th>
          Total
        </th>
        {
          HOW_DID_HEAR_ABOUT_US_OPTIONS.map(
            e =>
              <td>
                {
                  data.filter(r => r.hearAboutUs === e).map(r => r.count).reduce((a,b)=>a+b,0) || 0
                }
              </td>
          )
        }
      </tr>
    </tbody>
  </table>;
class HowTheyHeardAboutUs extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }
  async componentDidMount() {
    const { accessToken, role } = this.props;
    const data = await fetchHowDidTheyHearAboutUsReport({ accessToken, role });
    if (data) {
      this.setState({ data });
    }
  }
  render() {
    const { data } = this.state;
    return (<StatisticsTable data={ data } />);
  }
}

export default connect(
  state => {
    const { user: { accessToken, role } } = state;
    return { accessToken, role };
  },
  null
)(HowTheyHeardAboutUs);
