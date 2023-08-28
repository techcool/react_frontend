import DeleteDialog from "common/src/components/dialogs/deleteDialog";
import { DashFooter } from "common/src/components/shared/dashFooter";
import { fetchClasses, removeClass } from "common/src/old-api/classesActions";
import React from "react";
import { Button, Col } from "react-bootstrap";
import { connect } from "react-redux";
import CreateClass from "teacher/src/components/teachers/dialogs/createClassDialog";
import InviteStudent from "teacher/src/components/teachers/dialogs/inviteDialog";
import Count from "../components/dashbordCount/index";
import Tiles from "../components/teachers/classNew/classTileView";
class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      showInvite: false,
      loading: true,
      classes: [],
      classData: {},
      cid: "",
      ShowDelete: false,
      fetchCount: 0
    };
    this.handleInvite = this.handleInvite.bind(this);
  }
  componentDidMount() {
    this.getClass();
  }
  onDelete = (val) => {
    this.setState({ cid: val, ShowDelete: true });
  };
  async removeClass(class_id) {
    const { accessToken, role } = this.props;
    const removed = await removeClass({ accessToken, role, class_id });
    if (removed) {
      const { fetchClasses } = this.context;
      this.getClass();
      let count = this.state.fetchCount + 1;
      this.setState({ fetchCount: count });
    }
  }
  async getClass() {
    const { accessToken, role } = this.props;
    const data = await fetchClasses({ accessToken, role });
    if (data) {
      this.setState({ classes: data, loading: false });
    }
  }
  handleClose() {
    this.setState({ show: false });
  }
  handleInvite(data) {
    this.setState({ showInvite: true, classData: data });
  }
  render() {
    const { classes, loading } = this.state;
    const { accessToken, role } = this.props;
    if (loading) {
      return (
        <div className="px-4 py-5 main-section top-zero">
          { " " }
          <Col className="sm-12 text-center  align-items-center">
            <h2>Loading...</h2>
          </Col>
        </div>
      );
    }
    return (
      <React.Fragment>
        <div className="px-4 py-5 main-section top-zero">
          <Count
            accessToken={ this.props.accessToken }
            fetchCount={ this.state.fetchCount }
          />
          { classes.length === 0 ? (
            <Col className="sm-12 text-center  align-items-center">
              <h2>No Classes Found Please Create Class</h2>

              <Button
                onClick={ () =>
                  this?.props?.history?.push("/teacher/classes/new")
                }
                variant="primary"
                // className="primary-btn-outline"
              >
                Create Class
              </Button>
            </Col>
          ) : (
            <Tiles
              classes={ classes }
              onDelete={ (class_id) => this.onDelete(class_id) }
              createClass={ () => this.setState({ show: true }) }
              handleInvite={ this.handleInvite }
            />
          ) }
        </div>
        <DashFooter />
        <CreateClass
          show={ this.state.show }
          handleClose={ this.handleClose }
          accessToken={ accessToken }
          role={ role }
          fetchClasses={ this.getClass }
        />
        <InviteStudent
          show={ this.state.showInvite }
          handleClose={ () => {
            this.setState({ showInvite: false });
          } }
          accessToken={ accessToken }
          role={ role }
          fetchClasses={ this.getClass }
          classData={ this.state.classData }
        />
        <DeleteDialog
          show={ this.state.ShowDelete }
          handleClose={ () => {
            this.setState({ ShowDelete: false });
          } }
          handleDelete={ () => {
            this.removeClass(this.state.cid);
            this.setState({
              ShowDelete: false
            });
          } }
        />
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state) => {
  const { user } = state;
  const { accessToken, role } = user;
  return {
    accessToken,
    role
  };
};

export default connect(mapStateToProps, null)(Index);
