import Input from "common/src/components/Forms/input";
import OptionBox from "common/src/components/Forms/optionBox";
import {
  createCoupon,
  fetchCoupons,
  removeCoupon,
  updateCoupon
} from "common/src/old-api/coupons";
import React from "react";
import { connect } from "react-redux";

class Coupons extends React.Component {
  constructor() {
    super();
    this.state = {
      coupons: []
    };
  }

  componentDidMount() {
    this.fetchCoupons();
  }

  async fetchCoupons() {
    const { accessToken, role } = this.props;
    const data = await fetchCoupons({ accessToken, role });
    if (data && data.coupons) {
      const { coupons = [] } = data;
      this.setState({ coupons });
    }
  }

  handleChanges({ index, attribute, value }) {
    const { coupons: oldCoupons } = this.state;
    const coupons = [...oldCoupons];
    coupons[index][attribute] = value;
    coupons[index]["updated"] = true;
    this.setState({ coupons });
  }

  async createCoupon() {
    const { accessToken, role } = this.props;
    const data = await createCoupon({ accessToken, role });
    if (data && data.coupons) {
      const { coupons = [] } = data;
      this.setState({ coupons });
    }
  }

  async removeCoupon(id) {
    const { accessToken, role } = this.props;
    const data = await removeCoupon({ accessToken, role, id });
    if (data && data.coupons) {
      const { coupons = [] } = data;
      this.setState({ coupons });
    }
  }

  async updateCoupon({ _id, value, code, enabled }) {
    const { accessToken, role } = this.props;
    const payload = {
      _id, value, code, enabled
    };
    const data = await updateCoupon({ accessToken, role, payload });
    if (data && data.coupons) {
      const { coupons = [] } = data;
      this.setState({ coupons });
    }
  }

  render() {
    const { coupons } = this.state;
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Status </th>
            <th scope="col">Code</th>
            <th scope="col">Value</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            coupons.map((coupon, index) =>
              <tr key={ index }>
                <td>
                  <OptionBox
                    checked={ coupon.enabled }
                    label={ "Enabled" }
                    onClick={ () => this.handleChanges({
                      index,
                      attribute: "enabled",
                      value: !coupon.enabled
                    }) }
                  />
                </td>
                <td>
                  <Input
                    id={ `coupons[${index}].code` }
                    value={ coupon.code }
                    onChange={ e => this.handleChanges({
                      index,
                      attribute: "code",
                      value: e.target.value
                    }) }
                    required={ true }
                  />
                </td>
                <td>
                  <Input
                    id={ `coupons[${index}].value` }
                    className="form-control"
                    value={ coupon.value }
                    type="number"
                    min={ 0 }
                    max={ 100 }
                    onChange={ e => this.handleChanges({
                      index,
                      attribute: "value",
                      value: e.target.value
                    }) }
                    required={ true }
                  />
                </td>
                <td className="d-flex">
                  <button
                    value="Update"
                    name="submit"
                    className="btn btn-success"
                    style={ { width: "50%" } }
                    onClick={ () => this.updateCoupon({ ...coupon }) }
                    disabled={ !coupon.updated }
                  >
                    update
                  </button>
                  <button
                    value="Update"
                    name="submit"
                    className="btn btn-success"
                    style={ { width: "50%" } }
                    onClick={ () => this.removeCoupon(coupon._id) }
                  >
                    delete
                  </button>
                </td>
              </tr>
            )
          }
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">
            </td>
            <td className="d-flex justify-content-center">
              <button
                className="btn btn-success"
                style={ {
                  backgroundColor: "#28c2ea",
                  borderColor: "#28c2ea",
                  width: "50%"
                } }
                onClick={ () => this.createCoupon() }
              >
                New
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }
}

export default connect(state => {
  const { user: { accessToken, role } } = state;
  return ({ accessToken, role });
})(Coupons);
