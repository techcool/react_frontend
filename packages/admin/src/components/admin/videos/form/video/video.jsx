import formatDuration from "format-duration";
import React, { Fragment } from "react";
import Select from "react-select";
import VideoPlayer from "../../../../videoPlayer/videoPlayer";
const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July",
  "August", "Spetember", "October","November", "December"];
const VideoInfo = ({
  url,
  captionUrl,
  thumbnail,
  language,
  title,
  duration,
  updateVideoDuration,
  description,
  category,
  type,
  region,
  level,
  structure,
  preferredMonth,
  authenticTasks,
  isNewVideo,
  isFeatured,
  isPublished,
  handleChanges,
  handleMonths,
  videoCategories,
  updateVideoCategory
}) => {
  const subCategories = {
    type,
    region,
    level,
    structure,
    authenticTasks
  };
  const selectedCategory = videoCategories.filter(
    (c) => c.id === parseInt(category)
  )[0];

  return (
    <Fragment>
      <VideoPlayer
        url={ url }
        onReady={ (instance) => updateVideoDuration(instance.duration) }
        videoHeight="500px"
        screenshot={ true }
      />
      <div className="form-group">
        <label htmlFor="videoMonth">Select Month</label>
        { /* <select
          id="videoMonth"
          className="form-control"
          // value={videoMonth}
          onChange={(e) => {
            console.log(e.target.value, "ioioio");
          }}
          multiple
        >
          {months.map((month, index) => (
            <option value={index + 1}>{month}</option>
          ))}
        </select> */ }
        <Select
          placeholder="Select Month..."
          defaultValue={
            months.map((month,index) => {
              if(preferredMonth && preferredMonth.includes(index+1)){
                return {
                  value: index+1,
                  label: month
                };
              }
            })
          }
          isMulti
          onChange={ handleMonths }
          name="colors"
          options={ months.map((month, index) => {
            return {
              value: index + 1,
              label: month
            };
          }) }
          id="videoMonth"
          className="form-control"
          // classNamePrefix="select"
        />
      </div>
      <div className="form-group mt-3 mb-3">
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="isNewVideo"
            checked={ isNewVideo }
            onChange={ handleChanges }
          />
          <label className="form-check-label" htmlFor="isNewVideo">
            Is the video new ?
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="isFeatured"
            checked={ isFeatured }
            onChange={ handleChanges }
          />
          <label className="form-check-label" htmlFor="isFeatured">
            Is the video featured ?
          </label>
        </div>
      </div>
      <div className="form-group mt-3 mb-3">
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="isPublished"
            checked={ isPublished }
            onChange={ handleChanges }
          />
          <label className="form-check-label" htmlFor="isPulished">
            Is Public ?
          </label>
        </div>
      </div>
      <div className="form-group">
        <label>Video link</label>
        <input
          type="text"
          className="form-control"
          id="url"
          value={ url }
          onChange={ handleChanges }
          required
        />
      </div>
      <div className="form-group">
        <label>Video caption url</label>
        <input
          type="text"
          className="form-control"
          id="captionUrl"
          value={ captionUrl }
          onChange={ handleChanges }
          required
        />
      </div>
      <div className="form-group">
        <label>Video thumbnail url</label>
        <input
          type="text"
          className="form-control"
          id="thumbnail"
          value={ thumbnail }
          onChange={ handleChanges }
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="language">Video language</label>
        <select
          id="language"
          className="form-control"
          value={ language }
          onChange={ handleChanges }
        >
          <option value="es">Spanish</option>
          <option value="en">English</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="duration">Video duration</label>
        <input
          id="duration"
          type="text"
          className="form-control"
          value={ formatDuration(duration * 1000) }
          disabled
        />
      </div>
      <div className="form-group">
        <label>Video title </label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={ title }
          onChange={ handleChanges }
          required
        />
      </div>
      <div className="form-group">
        <label>Video description </label>
        <textarea
          className="form-control"
          id="description"
          value={ description }
          onChange={ handleChanges }
          style={ { resize: "none" } }
          rows="10"
          required
        />
      </div>
      <div>
        <div className="form-group">
          <lable>Category</lable>
          <select
            className="form-control"
            id="category"
            onChange={ (e) => handleChanges(e) }
          >
            { videoCategories.map((vc) => (
              <option value={ vc.id }>{ vc.label }</option>
            )) }
          </select>
        </div>
        { selectedCategory.details.map((cd) => (
          <div
            key={ `c-${selectedCategory.id}-${cd.code}` }
            className="form-group"
          >
            <h3>{ cd.label }</h3>
            { cd.values.map((v, index) => (
              <div
                key={ `c-${selectedCategory.id}-${cd.code}-${index}` }
                className="form-check"
              >
                <input
                  id={ `${cd.code}-${index}` }
                  type="checkbox"
                  className="form-check-input"
                  checked={ subCategories[cd.code].includes(`${index}`) }
                  onChange={ (e) => {
                    updateVideoCategory({
                      code: cd.code,
                      id: `${v.id}`,
                      checked: e.target.checked
                    });
                  } }
                />
                <label
                  className="form-check-label"
                  htmlFor={ `${cd.code}-${index}` }
                >
                  { v.label }
                </label>
              </div>
            )) }
          </div>
        )) }
      </div>
    </Fragment>
  );
};

export default VideoInfo;
