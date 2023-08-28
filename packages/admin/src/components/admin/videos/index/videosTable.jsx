import { CATEGORIES_LABELS } from "common/src/constants";
import React, { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import Select from "react-select";
import styledComponents from "styled-components";

const Div = styledComponents.div`
width: 200px;
`;

const VideosTable = ({ videos, deleteVideo }) =>
  <table className="table">
    <thead>
      <tr>
        <th>
          { videos.length } video{ videos.length !== 1 && "s" }
        </th>
      </tr>
      <tr>
        <th scope="col">
          Link
        </th>
        <th scope="col">
          Title
        </th>
        <th scope="col">
          Description
        </th>
        <th scope="col">
          Category
        </th>
        <th scope="col">
          Is Public ?
        </th>
        <th scope="col">
          Is Featured ?
        </th>
        <th scope="col">
          Is New ?
        </th>
        <th scope="col">
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
      {
        videos.map(
          video =>
            <tr key={ video._id }>
              <td>
                <a
                  href={ video.url }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    alt={ `thumbnail for ${video.title}` }
                    src={ video.thumbnail }
                    style={ { width: "100px", height: "auto" } }
                  />
                </a>
              </td>
              <td>
                { video.title }
              </td>
              <td>
                { video.description }
              </td>
              <td>
                { CATEGORIES_LABELS[video.category] }
              </td>
              <td>
                { video.isPublished?"Yes":"No" }
              </td>
              <td>
                { video.isFeatured?"Yes":"No" }
              </td>
              <td>
                { video.isNewVideo?"Yes":"No" }
              </td>
              <td>
                <Action
                  { ...{ video, deleteVideo } }
                />
              </td>
            </tr>
        )
      }
    </tbody>
  </table>;


const ACTION_NONE = -1;
const ACTION_EDIT = 0;
const ACTION_DELETE = 1;

const Action = ({ video, deleteVideo }) => {
  const [action, setAction] = useState(ACTION_NONE);
  return (
    <Div>
      <Select
        classNamePrefix="react-select"
        isClearable={ true }
        isSearchable={ false }
        placeholder="Select action"
        onChange={ (option) => {
          if (!option)
            setAction(ACTION_NONE);
          else
            setAction(option.value);
        } }
        options={ [
          { value: ACTION_EDIT, label: "Edit" },
          { value: ACTION_DELETE, label: "Delete" }
        ] }
      />
      { action === ACTION_NONE && <button className="btn button-gray"> Run </button> }
      {
        action === ACTION_EDIT
        &&
          <Link
            to={ `/admin/videos/${video._id}` }
            className="btn button-blue"
          >
            Run
          </Link>
      }
      {
        action === ACTION_DELETE
        &&
          <Link
            to="#"
            className="btn button-blue"
            onClick={ () => {
              confirmAlert({
                title: "Delete video",
                message: "Are you sure that you want to remove the video?",
                buttons: [
                  {
                    label: "Yes",
                    onClick: () => deleteVideo({ video_id: video._id })
                  },
                  {
                    label: "No",
                    onClick: () => { }
                  }
                ]
              });
            } }
          >
            Run
          </Link>
      }
    </Div>
  );
};

export default VideosTable;
