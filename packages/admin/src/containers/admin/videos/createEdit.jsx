import {
  EXERCISE_CHUNK_STORY,
  EXERCISE_CLOZE,
  EXERCISE_FILL_THE_BLANK,
  EXERCISE_FILL_THE_GAPS,
  EXERCISE_LONG_ANSWER,
  EXERCISE_MATCH_AUDIO_DESCRIPTION,
  EXERCISE_MATCH_VISUAL_DESCRIPTION,
  EXERCISE_READ,
  EXERCISE_RECORD_RETELL_STORY,
  EXERCISE_REWRITE_THE_STORY_IN_ENGLISH,
  EXERCISE_SHORT_ANSWER,
  EXERCISE_TRUE_FALSE,
  EXERCISE_WRITE_STORY
} from "common/src/constants";
import {
  createVideo,
  fetchVideoCategories,
  fetchVideoDetails,
  updateVideo
} from "common/src/old-api/videosActions";
import cuid from "cuid";
import React from "react";
import { connect } from "react-redux";
import VideoForm from "../../../components/admin/videos/form";

const CreateVideo = ({
  initialize = () => {},
  componentDidMount = () => {},
  sendData = () => {}
}) =>
  class extends React.Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        sending: false,
        url: "https://d1ams1xt8mq7t0.cloudfront.net/Spanish/Novice/Mario+Part1.mp4",
        thumbnail: "",
        captionUrl: "",
        duration: 0,
        language: "es",
        title: "",
        description: "",
        grammarTitle: "",
        grammar: "",
        vocabulary: [],
        videoCategories: {},
        category: 0,
        type: [],
        region: [],
        level: [],
        structure: [],
        authenticTasks: [],
        practiceExercises: [],
        isNewVideo: true,
        isFeatured: false,
        isPublished: false,
        preferredMonth: []
      };
      initialize(this);
    }
    async componentDidMount() {
      const { accessToken, role } = this.props;
      const videoCategories = await fetchVideoCategories({ accessToken, role });
      this.setState({
        videoCategories
      });
      await componentDidMount(this);
      this.setState({
        loading: false
      });
    }
    addVocabulary({ word, definition }) {
      const { vocabulary } = { ...this.state };
      vocabulary.push({ word, definition });
      this.setState({ vocabulary });
    }

    deleteVocabularyItem({ index }) {
      const { vocabulary } = { ...this.state };
      vocabulary.splice(index, 1);
      this.setState({ vocabulary });
    }

    handleChanges(e) {
      if (e.target.id === "isNewVideo" || e.target.id === "isFeatured") {
        const selected = e.target.id;
        const unselected =
          e.target.id === "isNewVideo" ? "isFeatured" : "isNewVideo";
        this.setState({
          [selected]: !this.state[e.target.id],
          [unselected]: false
        });
      } else if (e.target.id === "category")
        this.setState({
          [e.target.id]: parseInt(e.target.value),
          type: [],
          region: [],
          level: [],
          structure: [],
          authenticTasks: []
        });
      else if (e.target.id === "isPublished")
        this.setState({ [e.target.id]: !this.state.isPublished });
      else this.setState({ [e.target.id]: e.target.value });
    }

    async updateVideoDuration(duration) {
      this.setState({ duration });
    }

    updateVideoCategory({ code, id, checked }) {
      let { [code]: subcategory } = { ...this.state };
      if (checked) subcategory.push(id);
      else subcategory = subcategory.filter((e) => e != id);
      this.setState({ [code]: subcategory });
    }

    addExercise({ exercise_id, question, selected }) {
      const { practiceExercises } = { ...this.state };
      switch (exercise_id) {
      case EXERCISE_FILL_THE_BLANK:
      case EXERCISE_FILL_THE_GAPS:
      case EXERCISE_MATCH_AUDIO_DESCRIPTION:
      case EXERCISE_MATCH_VISUAL_DESCRIPTION:
      case EXERCISE_TRUE_FALSE:
      case EXERCISE_SHORT_ANSWER:
      case EXERCISE_LONG_ANSWER:
        if (practiceExercises[exercise_id].questions === undefined)
          practiceExercises[exercise_id].questions = [];
        question.id = cuid.slug();
        practiceExercises[exercise_id].questions.push(question);
        break;
      case EXERCISE_READ:
        practiceExercises[exercise_id].text = question;
        break;
      case EXERCISE_REWRITE_THE_STORY_IN_ENGLISH:
      case EXERCISE_WRITE_STORY:
      case EXERCISE_RECORD_RETELL_STORY:
        if (practiceExercises[exercise_id].notes === undefined) {
          practiceExercises[exercise_id].selected = 0;
          practiceExercises[exercise_id].notes = [];
        }
        if (selected !== undefined)
          practiceExercises[exercise_id].selected = selected;
        if (question !== undefined)
          practiceExercises[exercise_id].notes.push(question);
        break;
      case EXERCISE_CLOZE:
      case EXERCISE_CHUNK_STORY:
        Object.assign(practiceExercises[exercise_id], { ...question });
        break;
      default:
        break;
      }
      this.setState({ practiceExercises });
    }

    editQuestion({ exercise_id, question }) {
      const { practiceExercises } = { ...this.state };
      switch (exercise_id) {
      case EXERCISE_MATCH_AUDIO_DESCRIPTION:
      case EXERCISE_TRUE_FALSE:
        practiceExercises[exercise_id].questions = practiceExercises[
          exercise_id
        ].questions.map((q) => (q.id !== question.id ? q : question));
        break;
      }
      this.setState({ practiceExercises });
    }

    deleteQuestion({ exercise_id, question_id }) {
      const { practiceExercises } = { ...this.state };
      switch (exercise_id) {
      case EXERCISE_FILL_THE_BLANK:
      case EXERCISE_FILL_THE_GAPS:
      case EXERCISE_MATCH_AUDIO_DESCRIPTION:
      case EXERCISE_MATCH_VISUAL_DESCRIPTION:
      case EXERCISE_TRUE_FALSE:
      case EXERCISE_LONG_ANSWER:
      case EXERCISE_SHORT_ANSWER:
        practiceExercises[exercise_id].questions.splice(question_id, 1);
        break;
      case EXERCISE_REWRITE_THE_STORY_IN_ENGLISH:
      case EXERCISE_WRITE_STORY:
      case EXERCISE_RECORD_RETELL_STORY:
        practiceExercises[exercise_id].notes.splice(question_id, 1);
        practiceExercises[exercise_id].selected = 0;
        break;
      default:
        break;
      }
      this.setState({ practiceExercises });
    }

    async handleSubmit(e) {
      await this.sendData({})(e);
    }

    async save(e) {
      await this.sendData({ withoutValidating: true })(e);
    }
    handleMonths = (val) => {
      if (val) {
        const months = val.map((item) => item.value);
        this.setState({ preferredMonth: months });
      }
    };
    sendData({ withoutValidating = false }) {
      return async (e) => {
        e.preventDefault();
        const {
          type,
          region,
          level,
          structure,
          authenticTasks,
          url,
          captionUrl,
          thumbnail,
          grammarTitle,
          grammar,
          vocabulary,
          language,
          title,
          duration,
          description,
          category,
          practiceExercises,
          isNewVideo,
          preferredMonth,
          isFeatured,
          isPublished
        } = this.state;
        const video = {
          title,
          description,
          duration,
          url,
          preferredMonth,
          captionUrl,
          thumbnail,
          language,
          vocabulary,
          grammarTitle,
          grammar,
          category,
          type,
          region,
          level,
          structure,
          authenticTasks,
          practiceExercises,
          ...(withoutValidating && { withoutValidating }),
          isNewVideo,
          isFeatured,
          isPublished
        };
        sendData(this, video);
      };
    }

    render() {
      const { loading, sending } = this.state;

      if (loading)
        return (
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        );
      if (sending)
        return (
          <div className="spinner-border" role="status">
            <span className="sr-only">Sending...</span>
          </div>
        );

      return (
        <VideoForm
          { ...this.state }
          handleChanges={ (e) => this.handleChanges(e) }
          handleMonths={ this.handleMonths }
          updateVideoDuration={ (duration) => this.updateVideoDuration(duration) }
          updateVideoCategory={ ({ code, id, checked }) =>
            this.updateVideoCategory({ code, id, checked })
          }
          addVocabulary={ ({ word, definition }) =>
            this.addVocabulary({ word, definition })
          }
          deleteVocabularyItem={ ({ index }) =>
            this.deleteVocabularyItem({ index })
          }
          addExercise={ ({ exercise_id, question, selected }) =>
            this.addExercise({ exercise_id, question, selected })
          }
          editQuestion={ ({ exercise_id, question_index, question }) =>
            this.editQuestion({ exercise_id, question_index, question })
          }
          deleteQuestion={ ({ exercise_id, question_id }) =>
            this.deleteQuestion({ exercise_id, question_id })
          }
          save={ (e) => this.save(e) }
          handleSubmit={ (e) => this.handleSubmit(e) }
        />
      );
    }
  };

const mapStateToProps = (state) => {
  const {
    user: { accessToken, role }
  } = state;
  return { accessToken, role };
};

export const EditVideo = connect(
  mapStateToProps,
  null
)(
  CreateVideo({
    componentDidMount: async (_this) => {
      const { accessToken, role } = _this.props;
      const { video_id } = _this.props.match.params;
      const videoDetails = await fetchVideoDetails({
        accessToken,
        role,
        video_id
      });
      const {
        type,
        region,
        level,
        structure,
        authenticTasks,
        url,
        captionUrl,
        thumbnail,
        language,
        grammarTitle,
        grammar,
        vocabulary,
        title,
        duration,
        description,
        category,
        practiceExercises,
        isNewVideo,
        isFeatured,
        isPublished,
        preferredMonth
      } = videoDetails;
      _this.setState({
        loading: false,
        title,
        duration,
        description,
        url,
        captionUrl,
        thumbnail,
        language,
        grammarTitle,
        grammar,
        vocabulary,
        category,
        type,
        region,
        level,
        structure,
        authenticTasks,
        practiceExercises,
        preferredMonth,
        isNewVideo: isNewVideo || false,
        isFeatured: isFeatured || false,
        isPublished: isPublished || false
      });
    },
    sendData: async (_this, video) => {
      const { accessToken, role } = _this.props;
      const { video_id } = _this.props.match.params;
      _this.setState({ sending: true });
      const isCreated = await updateVideo({
        accessToken,
        role,
        video_id,
        video
      });
      _this.setState({ sending: false });
      if (isCreated) {
        _this.props.history.push("/admin/videos/");
      }
    }
  })
);

export const NewVideo = connect(
  mapStateToProps,
  null
)(
  CreateVideo({
    componentDidMount: (_this) => {
      const practiceExercisesInitialState = [];
      for (let i = 0; i < 14; i++)
        practiceExercisesInitialState.push({ id: i });
      Object.assign(practiceExercisesInitialState[EXERCISE_CLOZE], {
        phrases: [],
        options: [],
        rightOrder: []
      });
      Object.assign(practiceExercisesInitialState[EXERCISE_CHUNK_STORY], {
        phrases: [],
        rightOrder: []
      });
      _this.setState({
        practiceExercises: practiceExercisesInitialState
      });
    },
    sendData: async (_this, video) => {
      const { accessToken, role } = _this.props;
      _this.setState({ sending: true });
      const isCreated = await createVideo({ accessToken, role, video });
      _this.setState({ sending: false });
      if (isCreated) {
        _this.props.history.push("/admin/videos/");
      }
    }
  })
);
