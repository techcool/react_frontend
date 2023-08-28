import React from "react";
import { useHistory } from "react-router";
import { Dashboard } from "./dashboard";
export default function StudentAllVideos(props) {
  const history = useHistory();
  return (
    <div className="p-4 main-section top-zero">
      <Dashboard
        dashboard={ {} }
        from="stepper"
        type="student"
        handleEvents={ {
          handleStep: (data) => {
            history.push(`/student/videos/${data._id}/practice`);
          }
        } }
      />
    </div>
  );
}
