import Vocabulary from "common/src/components/dialogs/vocabulary";
import { durationTime } from "common/src/components/helpers/utils";
import { EXERCICES_TITLES_OBJECT, EXERCISES_IDS } from "common/src/constants";
import arw_left from "common/src/images/blue_arw_left.svg";
import video_white from "common/src/images/video_white.svg";
import React from "react";
import { Button, Col, Row, Tab, Table, Tabs } from "react-bootstrap";
// import VideoPlayer from "common/src/components/videoPlayer/videoPlayer";
import { Link } from "react-router-dom";
export default function VideoStats({ video, handleEvents }) {
  const [key, setKey] = React.useState("home");
  // const [t, setT] = React.useState("");
  const handleTab = (k) => {
    setKey(k);
  };
  return (
    <div>
      <Row>
        <Col className="d-flex justify-content-between mb-3" md={ 12 }>
          <Link
            className="text-dark-blue d-flex text-default mb-3 d-block"
            onClick={ () => handleEvents.handleStep(1) }
          >
            <img src={ arw_left } className="pr-2" alt="" />
            Previous
          </Link>
          <Button
            variant="primary"
            className="primary-btn sm orange-btn"
            onClick={ () => {
              handleEvents.handleStep(3);
            } }
          >
            Assign Assignment
          </Button>
        </Col>
        <Col md={ 4 }>
          <div className="overflow-hidden br-12">
            <h3 className="py-3 bg-light-blue text-dark-blue text-center">
              Postwork
            </h3>
            <div className="px-4 py-4 bg-grey">
              <ol className="stats-list">
                { EXERCISES_IDS.map((item) => {
                  return <li>{ EXERCICES_TITLES_OBJECT[item] }</li>;
                }) }
              </ol>
            </div>
          </div>
        </Col>
        <Col md={ 8 }>
          <Tabs
            id="controlled-tab-example"
            activeKey={ key }
            className="button-tabs"
            onSelect={ (k) => handleTab(k) }
          >
            <Tab eventKey="home" title="Video">
              <div className="assign-vid-img mb-4">
                <img src={ video.thumbnail } alt="" />

                { /* {video?.url && (
                  <VideoPlayer
                    src={video?.url || ""}
                    // onSeekOrPause={(progress) => setT(Math.floor(progress))}
                    videoHeight="500px"
                  />
                )} */ }
                <span className="vid-time">
                  <img src={ video_white } className="pr-2" alt="" />
                  { durationTime(video.duration) }
                </span>
              </div>
            </Tab>
            <Tab eventKey="grammar" title="Grammar Book">
              <div className="bg-grey px-3 py-4 br-12">
                <h2 className="medium-heading  pb-3">{ video.grammarTitle }</h2>
                <div
                  className="mt-3"
                  dangerouslySetInnerHTML={ { __html: video.grammar } }
                ></div>
              </div>
            </Tab>
            <Tab eventKey="vocabulary" title="Vocabulary Book">
              <div className="bg-grey br-12">
                <Vocabulary view={ true } vocabulary={ video.vocabulary } />
              </div>
            </Tab>
          </Tabs>
          <Col>
            <div>
              <pre>
                <span>{ video.category }</span> , <span>{ video.type }</span>
              </pre>
              <h2 className="card-heading mb-2">{ video.title }</h2>
              <p>{ video.description }</p>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
}
