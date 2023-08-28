import CreatePassword from "common/src/components/dialogs/createpassword";
import { DashFooter } from "common/src/components/shared/dashFooter";
import { deleteFromVocabulary } from "common/src/old-api/languageActions";
import { fetchCount } from "common/src/old-api/reportsAction";
import { loginWithToken, setRedux } from "common/src/old-api/usersActions";
import {
  createVideoNotes,
  fetchVideoDetails,
  searchVideos
} from "common/src/old-api/videosActions";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Dashboard } from "./dashboard";
import Count from "../components/dashbordCount/index";

var _ = require("lodash");

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
      searchSectionData: [],
      searchKeyword: "",
      searchLoading: false
    };
    this.refetchDashboard = this.refetchDashboard.bind(this);
    this.onSearch = this.onSearch.bind(this);
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
        // if (this.props.accessToken && this.props.firstName) {
        //   this.props.history.push("/teacher/home");
        // }
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
  async setVideo({ _id }) {
    const { accessToken, role } = this.props;
    const video = await fetchVideoDetails({ accessToken, role, video_id: _id });
    const { url, grammar, vocabulary, notes, captionUrl, language } = video;
    this.setState({
      _id,
      url,
      grammar,
      vocabulary,
      notes,
      captionUrl,
      language
    });
  }

  async saveNotes({ notes }) {
    const { accessToken, role } = this.props;
    const { _id: video_id } = this.state;
    await createVideoNotes({ accessToken, role, video_id, notes });
  }

  async deleteVocabulary(word_id) {
    const { accessToken, role } = this.props;
    const isDeleted = await deleteFromVocabulary({
      accessToken,
      role,
      word_id
    });
    if (isDeleted) {
      this.fetchVideoDetails();
    }
  }

  async fetchVideoDetails() {
    const { accessToken, role } = this.props;
    const { _id: video_id } = this.state;
    const video = await fetchVideoDetails({ accessToken, role, video_id });
    const { url, grammar, vocabulary, notes, captionUrl, language } = video;
    this.setState({ url, grammar, vocabulary, notes, captionUrl, language });
  }

  async fetchDashBoard() {
    const { accessToken, role } = this.props;
    const data = await fetchCount({ accessToken, role });
    this.setState({ dashboard: data });
    this.props.setRedux({
      favorites: data?.favouriteVideos?.map((item) => item._id)
    });
  }
  async refetchDashboard() {
    const { accessToken, role } = this.props;
    const data = await fetchCount({ accessToken: accessToken, role });
    this.setState({ dashboard: data });
    return data;
  }

  search = _.debounce((value) => {
    this.setState({ searchLoading: true, searchKeyword: value });
    this.onSearch(value);
  }, 1000)

  async onSearch(value) {
    if (value) {
      const { accessToken, role } = this.props;

      let serachVideosData = await searchVideos({ accessToken: accessToken, role, keywords: value });

      this.setState({ searchSectionData: serachVideosData, searchLoading: false });

    } else {
      this.setState({ searchSectionData: [], searchLoading: false });
    }

    // return serachVideosData;
  }

  render() {
    const {
      url,
      _id,
      grammar,
      vocabulary,
      notes,
      captionUrl,
      language,
      token,
      isMounted
    } = this.state;
    const { firstName, lastName, from } = this.props;
    if (this.props.role === "student") {
      return (
        <div className="p-4 main-section top-zero">
          <div className="dash-card">
            <h2>
              Please complete a 2-minute survey. Tell us what could be improved, and where we’re doing a great job!
              { " " }<a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdHQXiEi8Wb2A589Xw3y-QEVx2vv4MkOzv3LTnUctMKHVVS1A/viewform?usp=sf_link"
                target="_blank" rel="noreferrer"
              > Give a feedback</a>
            </h2>
          </div>
          <Count
            onSearch={ this.search }
            accessToken={ this.props.accessToken }
            role={ this.props.role }
          />
          <Dashboard
            refetch={ this.refetchDashboard }
            dashboard={ this.state.dashboard }
            searchLoading={ this.state.searchLoading }
            searchKeyword={ this.state.searchKeyword }
            searchSectionData={ this.state.searchSectionData }
            { ...this.props }
          />
        </div>
      );
    }
    return (
      isMounted &&
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
              onSearch={ this.search }
            />
            { this.state.dashboard && (
              <Dashboard
                refetch={ this.refetchDashboard }
                dashboard={ this.state.dashboard }
                searchLoading={ this.state.searchLoading }
                searchKeyword={ this.state.searchKeyword }
                searchSectionData={ this.state.searchSectionData }
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

const mapStateToProps = (state) => {
  const { user } = state;
  const { accessToken, role, firstName, lastName } = user;
  return { accessToken, role, firstName, lastName };
};

export default connect(mapStateToProps, { loginWithToken, setRedux })(
  TeachersHome
);
