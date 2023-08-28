import { fetchCount } from "common/src/old-api/reportsAction";
import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import "./dashboard.css";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {}
    };
    this.fetch = this.fetch.bind(this);
  }

  async componentDidMount() {
    this.fetch();
  }
  async fetch() {
    const data = await fetchCount();
    this.setState({ value: data });
  }

  render() {
    return (
      <Child value={ this.state.value } refetch={ this.fetch } 
        { ...this.props } searchForVideo={ this.props.onSearch } />
    );
  }
}

const Child = (props) => {

  React.useEffect(() => {
    if (props.fetchCount) {
      props.refetch();
    }
  }, [props.fetchCount]);
  return (
    <div className="">
      <Row className="mb-4">
        <Col xs={ 12 } md="3">
        </Col>
        <Col xs={ 12 } md="3">

        </Col>
        <Col xs={ 12 } md="3">

        </Col>
        <Col xs={ 12 } md="3">
          <Form.Control
            type="text"
            className="form-control"
            placeholder="Search"
            onChange={ (e) => props.searchForVideo(e.target.value) }
          />
        </Col>
      </Row>
    </div>
  );
};


export default Index;
