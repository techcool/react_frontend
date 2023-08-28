import Container, { ContainerWithoutHorizontalSpace } from "common/src/components/shared/container";
import React from "react";
import StatisticsTable from "./statisticsTable";
import UsersSearchForm from "./usersSearchForm";
import UsersTable from "./usersTable";

const UsersIndex = ({
  statistics,
  users,
  changesHandler,
  handleSubmit,
  deleteUser,
  updateAccountStatus,
  markEmailAsVerified,
  skip,
  limit,
  setSkip,
  setLimit,
  ...formData
}) =>
  <>
    <nav>
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            data-toggle="tab"
            href="#statistics"
            aria-selected="true"
          >
            Statistics
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-toggle="tab"
            href="#users-list"
          >
            Users
          </a>
        </li>
      </ul>
    </nav>
    <div className="tab-content">
      <div className="tab-pane fade show active" id="statistics">
        <Container>
          <StatisticsTable
            { ...{
              statistics
            } }
          />
        </Container>
      </div>
      <div className="tab-pane fade" id="users-list">
        <ContainerWithoutHorizontalSpace>
          <UsersSearchForm
            { ...{
              changesHandler,
              handleSubmit,
              users,
              ...formData
            } }
          />
          <UsersTable
            { ...{
              skip,
              limit,
              setSkip,
              setLimit,            
              deleteUser,
              updateAccountStatus,
              markEmailAsVerified,
              users
            } }
          />
        </ContainerWithoutHorizontalSpace>
      </div>
    </div>
  </>;


export default UsersIndex;
