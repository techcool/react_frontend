import React, { Fragment } from 'react';
import { FilterActivitiesCategoriesDateRange } from 'common/src/components/Forms/Filters';
import { connect } from 'react-redux';
import { fetchPerformancePerActivity } from 'common/src/old-api/reportsAction';
import { DateChart as LineChart } from './lineChart';
import styledComponents from 'styled-components'

const ChartContainer = styledComponents.div`
height:500px;
width:100%;
`

const ComponentContainer = ({
  fetchData = () => { },
}) =>
  class extends React.Component {

    constructor() {
      super();
      this.state = {
        activityId: null,
        category: null,
        startDate: null,
        endDate: null,
        data: [],
      }
    }

    onChange(e) {
      this.setState({
        [e.target.id]: e.target.value
      })
    }

    async onSubmit(e) {
      e.preventDefault();
      const {
        activityId,
        category,
        startDate,
        endDate,
      } = this.state
      const query = {
        ...(activityId !== null && { activityId }),
        ...(category !== null && { category }),
        ...(!!startDate && { startDate }),
        ...(!!endDate && { endDate }),
      }
      fetchData(this, query);
    }

    render() {
      const { data } = this.state;
      return (
        <Fragment>
          <FilterActivitiesCategoriesDateRange
            {...this.state}
            onChange={e => this.onChange(e)}
            onSubmit={e => this.onSubmit(e)}
          />
          {
            data && data.length > 0 &&
            <ChartContainer>
              <LineChart
                data={data}
                legend='Score'
              />
            </ChartContainer>
          }
        </Fragment>
      )
    }
  }

export const TeacherStudentPerformancePerActivity = connect(
  state => {
    const { user: { accessToken, role } } = state;
    return ({ accessToken, role });
  }
)(
  ComponentContainer({
    fetchData: async (_this, query) => {
      const { accessToken, role, student_id, class_id } = _this.props;
      const data = await fetchPerformancePerActivity({
        accessToken,
        role,
        query: Object.assign({}, query, { student_id, ...(class_id && { class_id }) }),
      });
      if (data) {
        _this.setState({ data });
      } else {
        _this.setState({ data: [] });
      }
    }
  })
)

export const StudentPerformancePerActivity = connect(
  state => {
    const { user: { accessToken, role } } = state;
    return ({ accessToken, role });
  }
)(
  ComponentContainer({
    fetchData: async (_this, query) => {
      const { accessToken, role, class_id } = _this.props;
      const data = await fetchPerformancePerActivity({
        accessToken,
        role,
        query: Object.assign({}, query, { ...(class_id && { class_id }) }),
      });
      if (data) {
        _this.setState({ data });
      } else {
        _this.setState({ data: [] });
      }
    }
  })
)