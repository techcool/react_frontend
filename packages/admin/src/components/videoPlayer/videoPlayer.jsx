import ArtplayerComponent from "artplayer-react";
import classnames from "classnames";
import React from "react";

class VideoPlayer extends React.Component {
  constructor() {
    super();
    this.state = {
      width: 1,
      height: 1
    };
  }
  componentDidMount() {
    const videoContainer = document.getElementById("video-container");
    this.setState({
      width: videoContainer.clientWidth,
      height: videoContainer.clientHeight
    });
    const resizeObserver = new ResizeObserver(() => {
      this.setState({
        width: videoContainer.clientWidth,
        height: videoContainer.clientHeight
      });
    });
    resizeObserver.observe(videoContainer);
  }
  render() {
    const {
      url,
      highlight,
      captionUrl,
      t,
      onSeekOrPause = () => { },
      onReady = () => { },
      videoHeight,
      videoMinHeight,
      screenshot=false
    } = this.props;

    const { height, width } = this.state;

    const option = {
      url,
      fullscreen: true,
      screenshot
    };
    if (highlight) Object.assign(option, { highlight });
    if (captionUrl) Object.assign(option, {
      subtitle: {
        url: captionUrl,
        style: {
          color: "#fff"
        }
      }
    });

    return (
      <div
        id="video-container"
        className={
          classnames("w-100 d-flex",{ "h-100":!videoHeight })
        }
        style={ { minHeight: videoMinHeight, height: videoHeight } }
      >
        <ArtplayerComponent
          key={ url }
          option={ option }
          style={ {
            width: `${width}px`,
            height: `${height}px`
          } }
          getInstance={ instance => {
            instance.on("pause", () => onSeekOrPause(instance.currentTime));
            instance.on("seek", () => onSeekOrPause(instance.currentTime));
            instance.on("ready", () => {
              if (t) instance.seek = t;
              onReady(instance);
            });
          } }
        />
      </div>
    );
  }
}

export default VideoPlayer;
