import {
  deleteVideo,
  fetchVideoCategories,
  fetchVideos
} from "common/src/old-api/videosActions";
import React from "react";
import { connect } from "react-redux";
import VideosIndex from "../../../components/admin/videos/index";

class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      videos: [],
      categories: [],
      title: "",
      description:"",
      category: -1,
      type: -1,
      region: -1,
      level: -1,
      structure: -1,
      authenticTasks: -1
    };
  }

  async componentDidMount() {
    const { accessToken, role } = this.props;
    const categories = await fetchVideoCategories({ accessToken, role });
    this.setState({ categories });
    const videos = await fetchVideos({ accessToken, role });
    this.setState({
      videos
    });
  }

  handleChanges(e) {
    if (e.target.id === "category")
      this.setState({
        [e.target.id]: parseInt(e.target.value),
        type: -1,
        region: -1,
        level: -1,
        structure: -1,
        authenticTasks: -1
      });
    else
      this.setState({
        [e.target.id]: e.target.value
      });
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.fetchVideos();
  }
  async fetchVideos() {
    const {
      title,
      description,
      category,
      type,
      region,
      level,
      structure,
      authenticTasks
    } = this.state;

    const { accessToken, role } = this.props;
    const filter = {
      ...(title !== "" && { title }),
      ...(description !== "" && { description }),
      ...(category !== -1 && { category }),
      ...(type !== -1 && { type }),
      ...(region !== -1 && { region }),
      ...(level !== -1 && { level }),
      ...(structure !== -1 && { structure }),
      ...(authenticTasks !== -1 && { authenticTasks })
    };
    const videos = await fetchVideos({ accessToken, role, filter });
    this.setState({ videos });
  }

  async deleteVideo({ video_id }) {
    const { accessToken, role } = this.props;
    const isDeleted = await deleteVideo(
      {
        accessToken,
        role,
        video_id
      }
    );
    if (isDeleted)
      this.fetchVideos();

  }

  render() {
    const {
      title,
      videos,
      category,
      categories,
      type,
      region,
      level,
      structure,
      authenticTasks
    } = this.state;
    const subCategories = {
      type,
      region,
      level,
      structure,
      authenticTasks
    };
    return (
      <VideosIndex
        { ...{
          title,
          videos,
          category,
          categories,
          subCategories
        } }
        handleChanges={ e => this.handleChanges(e) }
        handleSubmit={ e => this.handleSubmit(e) }
        deleteVideo={ ({ video_id }) => this.deleteVideo({ video_id }) }
      />
    );
  }
}

const mapStateToProps = state => {
  const { user: { accessToken, role } } = state;
  return { accessToken, role };
};

export default connect(mapStateToProps, null)(Index);
