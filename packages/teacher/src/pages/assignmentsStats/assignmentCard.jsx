import video_img from "common/src/images/videos_blue.svg";
import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export function AssignmentCard({
  data
}) {
  const history = useHistory();
  return (
    <div className="assignment-card card mb-4">
      <h3 className="medium-heading mb-3 d-flex align-items-start">
        <img src={ video_img } className="mr-2" height="18px" alt="" />
        { data.title ? data.title : data.videoTitle }
      </h3>
      <div className="mb-3">
        <span className="pr-3 fw-600 text-dark">Assigned to:</span>
        <span className="d-inline-flex">
          { " " }
          { data.assignedCount }
        </span>
      </div>
      <div className="mb-3">
        <span className="pr-3 fw-600 text-dark">Submitted:</span>
        <span>{ data.complete }</span>
      </div>
      <Button
        variant="primary"
        disabled={ data.complete === 0 }
        className="org-btn-alter sm"
        onClick={ () => {
          history.push(`/teacher/postworks/${data._id}`);
        } }
      >
        View Stats
      </Button>
    </div>
  );
}
