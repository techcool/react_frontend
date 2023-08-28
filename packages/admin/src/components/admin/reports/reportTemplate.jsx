import Container from "common/src/components/shared/container";
import React from "react";
import styledComponents from "styled-components";

const TableContainer = styledComponents.div`
overflow:scroll;
overflow-x: hidden;
overflow-y:auto;
`;

const ReportTemplate = ({
  Filter = null,
  TableHeader,
  TableBody,
  TableTwoTitle = null,
  TableTwoHeader = null,
  TableTwoBody = null,
  TableThreeTitle = null,
  TableThreeHeader = null,
  TableThreeBody = null,
  Chart = null,
  DetailsTableHeader = null,
  DetailsTableBody = null,
  tableHeight = "200px",
  ...props
}) =>
  <Container
    style={ {
      marginLeft: 0,
      marginRight: 0,
      paddingLeft: 0,
      paddingRight: 0
    } }
  >
    <Filter  { ...props } />
    <Container
      style={ {
        marginLeft: 0,
        marginRight: 0,
        paddingLeft: 0,
        paddingRight: 0
      } }
    >
      <TableContainer
        style={ { height: tableHeight } }
      >
        <table className="table">
          <thead>
            <TableHeader />
          </thead>
          <tbody>
            <TableBody />
          </tbody>
        </table>
      </TableContainer>
      {
        TableTwoTitle &&
          <Container>
            <TableTwoTitle />
          </Container>
      }
      {
        TableTwoHeader &&
        TableTwoBody &&
          <TableContainer
            style={ { height: tableHeight } }
          >
            <table className="table">
              <thead>
                <TableTwoHeader />
              </thead>
              <tbody>
                <TableTwoBody />
              </tbody>
            </table>
          </TableContainer>
      }
      {
        TableThreeTitle &&
          <Container>
            <TableThreeTitle />
          </Container>
      }
      {
        TableThreeHeader &&
        TableThreeBody &&
          <TableContainer
            style={ { height: tableHeight } }
          >
            <table className="table">
              <thead>
                <TableThreeHeader />
              </thead>
              <tbody>
                <TableThreeBody />
              </tbody>
            </table>
          </TableContainer>
      }
      {
        DetailsTableHeader &&
          <>
            <h1>
              Details
            </h1>
            <TableContainer>
              <table className="table">
                <thead>
                  <DetailsTableHeader />
                </thead>
                <tbody>
                  <DetailsTableBody />
                </tbody>
              </table>
            </TableContainer>
          </>
      }
      {
        Chart &&
          <div style={ { height: "500px" } } >
            <Chart />
          </div>
      }
    </Container>
  </Container>;

export default ReportTemplate;
