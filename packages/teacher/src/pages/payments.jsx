import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { fetchCouponValue } from "common/src/old-api/coupons";
import { canPay, emailReceipt, getPacks } from "common/src/old-api/payments";
import { setRedux } from "common/src/old-api/usersActions";
import moment from "moment";
import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { GenericPdfDownloader } from "./subscriptions";
import CouponModal from "../components/payments/CouponModal";
import FormModal from "../components/payments/FormModal";
import PacksContainer from "../components/payments/packs";

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

class Buying extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      packs: [],
      pack: {},
      expireDate: "",
      showModal: false,
      canPay: true,
      activePack: {},
      paymentStep: 0,
      showCouponModal: false,
      hasCoupon: false,
      couponCode: null,
      couponValue: 0,
      sub: {},
      isComingfromDialog: props.isComingFromDialog
        ? props.isComingFromDialog
        : false
    };
  }

  async componentDidMount() {
    this.checkIfCanPay();
  }
  async checkIfCanPay() {
    const { accessToken, role } = this.props;
    const data = await canPay({ accessToken, role });
    this.setState(
      {
        ...data,
        sub: data
      },
      async () => {
        const { canPay, isComingfromDialog } = this.state;
        await this.props.setRedux({
          // freeTrialExpired: false,
          packId: data?.paymentDetails?.packId || 3
        });
        if (!canPay && !isComingfromDialog) return;
        const packs = await getPacks();
        this.setState({ packs });
      }
    );
  }
  selectPack(pack) {
    this.setState(
      {
        pack,
        paymentStep: 1
      },
      () => this.showCouponModal()
    );
  }

  showModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false, pack: {} });
  }

  showCouponModal() {
    this.setState({ showCouponModal: true });
  }

  closeCouponModal() {
    this.setState({ closeCouponModal: false, paymentStep: 0 });
  }

  handleCoupon(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  async getCouponValue() {
    const { accessToken, role } = this.props;
    const { couponCode: code } = this.state;
    const data = await fetchCouponValue({ accessToken, role, code });
    if (data) {
      const { value } = data;
      this.setState({ couponValue: value });
    }
  }

  render() {
    const {
      packs,
      showModal,
      showCouponModal,
      pack,
      canPay,
      paymentStep,
      couponCode,
      hasCoupon,
      couponValue,
      isComingfromDialog,
      activePack: { name = null }
    } = this.state;
    if (!canPay && !isComingfromDialog) {
      return (
        <div className="main-section top-zero">
          <div
            className="card text-center p-5 m-5"
            style={ { fontSize: "25px" } }
          >
            Congratulations! You have purchased our{ " " }
            <span
              style={ {
                fontWeight: "bold",
                textTransform: "uppercase",
                color: "#43bfe7"
              } }
            >
              { name } Package.
            </span>{ " " }
            You now have subscription to access our platform until{ " " }
            { this.state.activePack && this.state.activePack.expireDate
              ? moment(this.state.activePack.expireDate).format("DD-MMM-YYYY")
              : "-NA-" }
            .
          </div>
          <div className="d-flex align-items-center mt-2">
            <GenericPdfDownloader
              rootElementId="refer"
              downloadFileName="download"
              data={ this.state.sub }
            />
            <Button
              variant="primary"
              className="primary-btn orange-btn sm px-4"
              onClick={ () => {
                emailReceipt({
                  accessToken: this.props.accessToken,
                  role: this.props.role
                });
              } }
            >
              Email Receipt
            </Button>
          </div>
        </div>
      );
    }
    return (
      <div>
        <PacksContainer
          packs={ packs }
          selectPack={ (pack) => this.selectPack(pack) }
        />
        { paymentStep === 1 && (
          <CouponModal
            show={ showCouponModal }
            handleCoupon={ (e) => this.handleCoupon(e) }
            close={ () => this.closeCouponModal() }
            onYes={ ({ code }) =>
              this.setState(
                {
                  hasCoupon: true,
                  couponCode: code,
                  paymentStep: 2,
                  showCouponModal: false,
                  showModal: true
                },
                () => this.getCouponValue()
              )
            }
            onNo={ () =>
              this.setState({
                hasCoupon: false,
                couponCode: null,
                paymentStep: 2,
                showCouponModal: false,
                showModal: true
              })
            }
          />
        ) }
        { paymentStep === 2 && (
          <div>
            <Elements stripe={ promise }>
              <FormModal
                show={ showModal }
                pack={ pack }
                couponCode={ couponCode }
                hasCoupon={ hasCoupon }
                couponValue={ couponValue }
                close={ () => this.closeModal() }
                checkIfCanPay={ () => this.checkIfCanPay() }
              />
            </Elements>
          </div>
        ) }
      </div>
    );
  }
}

export default connect(
  (state) => {
    const { user } = state;
    const { accessToken, role } = user;
    return {
      accessToken,
      role
    };
  },
  { setRedux }
)(Buying);
