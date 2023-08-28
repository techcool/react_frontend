import Container, { ContainerWithoutHorizontalSpace } from "common/src/components/shared/container";
import React from "react";

const VideoAssignmentsReport = ({
  startDate,
  endDate,
  videos,
  handleChanges,
  handleSubmit
}) => (
  <Container>
    <div className="mb-4">
      <form onSubmit={ handleSubmit }>
        <div className="form-row">
          <div className="col">
            <input
              id="startDate"
              type="text"
              placeholder="Start date"
              onFocus={ (e) => e.target.type = "date" }
              onBlur={ (e) => (startDate === "") && (e.target.type = "text") }
              value={ startDate }
              className="form-control"
              onChange={ handleChanges }
            />
          </div>
          <div className="col">
            <input
              id="endDate"
              type="text"
              placeholder="End date"
              onFocus={ (e) => e.target.type = "date" }
              onBlur={ (e) => (endDate === "") && (e.target.type = "text") }
              value={ endDate }
              className="form-control"
              onChange={ handleChanges }
            />
          </div>
          <div className="col">
            <input
              type="submit"
              className="btn button-blue"
              value="Generate report"
            />
          </div>
        </div>
      </form>
    </div>
    <ContainerWithoutHorizontalSpace>
      <table className="table">
        <thead>
          <tr>
            <th>
              Video title
            </th>
            <th>
              Count
            </th>
          </tr>
        </thead>
        <tbody>
          {
            videos.map((video, index) =>
              <tr key={ index }>
                <td>
                  { video.title || "" }
                </td>
                <td>
                  { video.count || 0 }
                </td>
              </tr>
            )
          }
          <tr className="font-weight-bold">
            <th>
              Total
            </th>
            <th>
              { videos.reduce((sum, video) => sum + video.count, 0) }
            </th>
          </tr>

        </tbody>
      </table>
    </ContainerWithoutHorizontalSpace>
  </Container>
);

export default VideoAssignmentsReport;
