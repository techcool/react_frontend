import React, { Fragment } from "react";
import hash from "hash-string";
import { connect } from "react-redux";
import { getPronunciation } from "common/src/old-api/languageActions";
import sandTimer from "common/src/images/sandtimer.svg";
import speaker from "common/src/images/speaker_grey.svg";

const Pronunciation = connect((state) => {
  const {
    user: { accessToken, role },
  } = state;
  return { accessToken, role };
}, null)(
  class extends React.Component {
    constructor() {
      super();
      this.state = {
        fetching: false,
        audioFetched: false,
        audio: "",
        id: "",
      };
    }
    componentDidMount() {
      const id = `pronunciationAudio-${hash(this.props.word)}`;
      this.setState({
        id,
      });
    }
    fetchPronunciation() {
      const { accessToken, role, word, language } = this.props;
      this.setState({ fetching: true });
      getPronunciation({
        accessToken,
        role,
        word,
        language,
      }).then((pronunciation) => {
        const { audio } = pronunciation;
        if (audio) {
          this.setState(
            {
              fetching: false,
              audioFetched: true,
              audio,
            },
            () => {
              const { id } = this.state;
              document.getElementById(id).play();
            }
          );
        }
      });
    }
    render() {
      const { audioFetched, fetching, audio, id } = this.state;
      if (!audioFetched && !fetching)
        return (
          <img
            style={{ width: "35px", height: "35px" }}
            src={speaker}
            alt=""
            onClick={() => this.fetchPronunciation()}
          />
        );
      if (!audioFetched && fetching)
        return (
          <img
            style={{ width: "35px", height: "35px" }}
            src={sandTimer}
            alt=""
          />
        );
      return (
        <Fragment>
          <audio id={id} src={`data:audio/wav;base64,${audio}`}>
            Your browser does not support the <code>audio</code> element.
          </audio>
          <img
            alt=""
            style={{ width: "35px", height: "35px" }}
            src={speaker}
            onClick={() => document.getElementById(id).play()}
          />
        </Fragment>
      );
    }
  }
);

export default Pronunciation;
