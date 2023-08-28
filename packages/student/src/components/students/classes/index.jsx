import DeleteDialog from "common/src/components/dialogs/deleteDialog";
import convertToRankString from "common/src/components/helpers/convertToRankString";
import copy_icon from "common/src/images/copy_icon.svg";
import org_dots from "common/src/images/org-dots.svg";
import React from "react";
import { Button, Dropdown, Overlay, Table, Tooltip } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useHistory } from "react-router-dom";

export default  ({ classes, removeClass, handleInvite }) => {
  const history = useHistory();
  return (
    classes?.map((item) => {
      return (
        <div className="assignment-card card-box-shadow col-sm-12 col-md-4 col-lg-3 my-2 mx-2">
          <h3 className="medium-heading mb-3 d-flex align-items-start">
            { /* <img src={video_img} className="mr-2" height="18px" alt="" /> */ }
            { item.name }
          </h3>
          <div className="mb-3">
            <span className="pr-3 fw-500 text-dark">Students:</span>
            <span className="d-inline-flex">
              { " " }
              <span className="d-inline-flex fw-500">
                { " " }
                { item.numberOfStudents || "No Students" }
              </span>
            </span>
          </div>
          <div className="mb-3">
            <span className="pr-3 fw-500 text-dark">Assignments:</span>
            <span className="d-inline-flex">
              { " " }
              <span className="d-inline-flex fw-500">
                { " " }
                { item.numberOfAssignment || "No Assignments" }
              </span>
            </span>
          </div>
          <div className="mb-3">
            { /* <span className="pr-3 fw-600 text-dark">Submitted:</span>
        <span>{data.complete}</span> */ }
          </div>
          <Button
            variant="primary"
            className="org-btn-alter sm"
            onClick={ () => {
              history && history.push(`/student/classes/${item._id}/show`);
            } }
          >
            View Class Details
          </Button>
        </div>
      );
    })
  );
};

