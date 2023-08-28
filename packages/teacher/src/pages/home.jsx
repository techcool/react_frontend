import CreatePassword from "common/src/components/dialogs/createpassword";
import { DashFooter } from "common/src/components/shared/dashFooter";
import { fetchCount } from "common/src/old-api/reportsAction";
import { loginWithToken, setRedux } from "common/src/old-api/usersActions";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Dashboard } from "./dashboard";
import Count from "../components/dashbordCount/index";


class TeachersHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      isMounted: false,
      url: "",
      grammar: "",
      language: "",
      vocabulary: [],
      notes: "",
      token: null,
      step: 1,
      dashboard: {},
      searchKeywords: ""
    };
    this.refetchDashboard = this.refetchDashboard.bind(this);
  }

  async componentDidMount() {
    if (
      this?.props?.match?.params?.token
    ) {
      const res = await this.props.loginWithToken({
        token: this.props.match.params.token
      });
      if (!res) {
        if (!this.props.accessToken) {
          this.props.history.push("/login");
        }
      } else {
        this.setState({ token: this.props.match.params.token });
      }
    }
    this.fetchDashBoard();
    this.setState({ isMounted: true });
  }
  componentWillUnmount() {
    this.setState({ isMounted: false });
  }

  async fetchDashBoard() {
    const data = await fetchCount();
    this.setState({ dashboard: data });
    this.props.setRedux({
      favorites: data?.favouriteVideos?.map((item) => item._id)
    });
  }
  async refetchDashboard() {
    const data = await fetchCount();
    this.setState({ dashboard: data });
    return data;
  }

  render() {
    const {
      token,
      isMounted,
      searchKeywords
    } = this.state;
    const {  from } = this.props;
    if(!isMounted)return null;
    return (
      (from === "stepper" || from === "videos" ? (
        this.state.dashboard && (
          <Dashboard
            refetch={ this.refetchDashboard }
            dashboard={ this.state.dashboard }
            { ...this.props }
          />
        )
      ) : (
        <Fragment>
          { token && <CreatePassword token={ this.state.token } /> }
          <div className="p-4 main-section top-zero">
            <div className="dash-card">
              <h2>
                Please complete a 2-minute survey. Tell us what could be improved, and where we’re doing a great job!
                { " " }<a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSenAwLIYWUTlzMoHX4x_M7NXRGRwuwWuyMdnEVvL2w6PHs-nQ/viewform?usp=sf_link"
                  target="_blank" rel="noreferrer"
                > 
                  Give a feedback
                </a>
              </h2>
            </div>
            <Count
              searchKeywords={ searchKeywords }
              onUpdatesearchKeywords={ searchKeywords=>this.setState({ searchKeywords }) }
            />
            { this.state.dashboard && (
              <Dashboard
                refetch={ this.refetchDashboard }
                dashboard={ this.state.dashboard }
                searchKeywords={ this.state.searchKeywords }
                { ...this.props }
              />
            ) }
          </div>
          <DashFooter />
        </Fragment>
      ))
    );
  }
}


export default connect(null, { loginWithToken, setRedux })(
  TeachersHome
);
