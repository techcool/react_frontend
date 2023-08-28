import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import heart from "common/src/images/heart.svg";
import heartRed from "common/src/images/heart_red.svg";
import video_white from "common/src/images/video_white.svg";

export default function VideoStatsCard(props) {
  const { data, handleDelete, isFavorite, handleCreate, durationTime } = props;
  const history = useHistory();
  return (
    <div className="vid-card vidstats-card">
      <div className="card-img">
        <img src={data.thumbnail} alt={data.title} />
        <span className="heart-span">
          {isFavorite ? (
            <img
              src={heartRed}
              alt=""
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleDelete(data._id);
              }}
            />
          ) : (
            <img
              src={heart}
              style={{ cursor: "pointer" }}
              alt=""
              onClick={() => {
                handleCreate(data._id);
              }}
            />
          )}
        </span>

        {data.isNewVideo && (
          <span className="badge new-release">New Release</span>
        )}
        <span className="vid-time">
          <img src={video_white} className="pr-2" alt="" />{" "}
          {durationTime(parseInt(data.duration))}
        </span>
      </div>
      <div className="vid-footer py-4">
        <span className="vid-badge">{data.category}</span>
        <h3 className="medium-heading mb-3 d-flex">{data.title}</h3>
        <div className="mb-2">
          <span className="pr-3 para fw-600 text-dark">
            Assigned to: {data.assignedCount}
          </span>
          <span className="d-inline-flex">
          </span>
        </div>
        <div className="mb-3">
          <span className="pr-3 para fw-600 text-dark">Submitted:</span>
          <span>{data.submittedCount}</span>
        </div>
        <Button
          variant="primary"
          className="primary-btn sm"
          onClick={() => history.push(`/teacher/videos/stats/${data._id}`)}
        >
          View Stats
        </Button>
      </div>
    </div>
  );
}
