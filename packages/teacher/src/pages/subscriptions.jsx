import { DashFooter } from "common/src/components/shared/dashFooter";
import logo from "common/src/images/logo.jpg";
import { canPay, emailReceipt } from "common/src/old-api/payments";
import { jsPDF } from "jspdf";
import moment from "moment";
import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import TeacherPayments from "./payments";
const Capital = (string) => {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
};
export default function Subscriptions() {
  const ref = React.createRef();
  const [subscriptions, setSubscriptions] = React.useState({});
  const [show, setShow] = React.useState(false);
  const [pack, setPack] = React.useState({});
  React.useEffect(() => {
    (async () => {
      const res = await canPay();
      if (res) {
        setSubscriptions(res);
      }
    })();
  }, []);

  const handleClose = () => {
    setShow(false);
  };

  const printDocument = () => {};
  if (subscriptions.canPay) {
    return (
      <React.Fragment>
        <div className="px-4 py-5 main-section top-zero" ref={ ref } id="refer">
          <h2 className="card-heading mb-3">Subscription</h2>
          <Row>
            <Col className="mb-4 col-md-6">
              <div className="card shadow-none border-0 py-4 px-4 h-100">
                <div className="d-flex mb-5 justify-content-between">
                  <div>
                    <h2 className="medium-heading text-black mb-2">
                      Plan Type
                    </h2>
                    <Button
                      variant="primary"
                      className="primary-btn-outline bg-light-blue border-0 sm trial-btn"
                      onClick={ () => setShow(true) }
                    >
                      { Capital(subscriptions?.activePack?.name) }
                      { Capital(subscriptions?.expirePack?.name) }
                    </Button>
                  </div>
                  { /* <div>
                    <Link
                      variant="primary"
                      className="org-btn-outline  bg-light-org sm mr-4 px-4 "
                      to={"/teacher/payments"}
                    >
                      See Packs
                    </Link>
                  </div> */ }
                </div>

                { subscriptions?.activePack?.name != "Free Trial" &&
                  subscriptions?.expirePack?.name != "Free Trial" && (
                  <div className="d-flex align-items-center">
                      <h4 className="medium-heading">
                      <span className="text-black">
                          Payment Method: &nbsp;
                      </span>
                      <span className="text-dark-blue">Online</span>
                    </h4>
                    </div>
                ) }

                <div className="d-flex align-items-center">
                  <h4 className="medium-heading ">
                    <span className="text-black">Status: &nbsp;</span>
                    <span className="text-dark-blue">
                      { subscriptions.activePack ? "Active" : "Expired" }
                    </span>
                  </h4>
                </div>
              </div>
            </Col>
            <Col className="mb-4 col-md-6">
              <div className="card py-4 px-4 h-100">
                { /* <div className="mb-5">
                <h2 className="medium-heading text-black mb-2">Subscription</h2>
                <p>#{subscriptions?.paymentDetails?.paymentIntentId}</p>
              </div> */ }
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h2 className="medium-heading text-black mb-2">
                      { subscriptions.activePack ? "Start" : "Last Payment" }
                    </h2>
                    <p>
                      On{ " " }
                      { subscriptions?.activePack?.startDate
                        ? moment(subscriptions?.activePack?.startDate).format(
                          "DD-MMM-YYYY"
                        )
                        : "" }
                      { subscriptions?.expirePack?.startDate
                        ? moment(subscriptions?.expirePack?.startDate).format(
                          "DD-MMM-YYYY"
                        )
                        : "" }
                      { subscriptions?.paymentDetails?.date
                        ? moment(subscriptions?.paymentDetails?.date).format(
                          "DD-MMM-YYYY"
                        )
                        : "" }
                    </p>
                  </div>
                  <div>
                    <h2 className="medium-heading text-black mb-2">Expiration</h2>
                    <p>
                      On{ " " }
                      { subscriptions?.activePack?.expireDate
                        ? moment(subscriptions?.activePack?.expireDate).format(
                          "DD-MMM-YYYY"
                        )
                        : "" }
                      { subscriptions?.expirePack?.expireDate
                        ? moment(subscriptions?.expirePack?.expireDate).format(
                          "DD-MMM-YYYY"
                        )
                        : "" }
                    </p>
                  </div>
                  { /* <Button
                  variant="primary"
                  className="primary-btn-outline sm ml-auto"
                >
                  Manage Payments
                </Button> */ }
                </div>
              </div>
            </Col>
          </Row>

          <div className="d-flex align-items-center mt-2">
            <GenericPdfDownloader
              rootElementId="refer"
              downloadFileName="download.pdf"
              data={ subscriptions }
            />
            <Button
              variant="primary"
              className="primary-btn orange-btn sm px-4"
              onClick={ () => {
                emailReceipt();
              } }
            >
              Email Receipt
            </Button>
          </div>
        </div>
        { /* <DashFooter /> */ }
        <Dialog handleClose={ handleClose } show={ show } />
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <div className="px-4 py-5 main-section top-zero" ref={ ref } id="refer">
        <h2 className="card-heading mb-3">Subscription</h2>
        <Row>
          <Col className="mb-4 col-md-6">
            <div className="card py-4 px-4 h-100">
              <div className="d-flex mb-5">
                <div>
                  <h2 className="medium-heading text-black mb-2">Plan Type</h2>
                  <Button
                    variant="primary"
                    className="primary-btn-outline bg-light-blue border-0 sm"
                    onClick={ () => setShow(true) }
                  >
                    { Capital(subscriptions?.activePack?.name) }
                  </Button>
                </div>

                <h3 className="ml-auto d-flex">
                  <span className="font-xs">$</span>
                  <p className="fw-700 h2 m-0 text-black">
                    { subscriptions?.paymentDetails?.amount / 100 }
                  </p>
                  <span className="font-xs">/Year</span>
                </h3>
              </div>
              <div className="d-flex align-items-center">
                <h4 className="medium-heading">
                  <span className="text-black">Payment Method: &nbsp;</span>
                  <span className="text-dark-blue">{ Capital(subscriptions?.paymentDetails?.method) }</span>
                </h4>
              </div>
              <div className="d-flex align-items-center">
                <h4 className="medium-heading">
                  <span className="text-black">Status: &nbsp;</span>
                  <span className="text-dark-blue">
                    { " " }
                    { Capital(subscriptions?.paymentDetails?.status) }
                  </span>
                </h4>
              </div>
            </div>
          </Col>
          <Col className="mb-4 col-md-6">
            <div className="card py-4 px-4 h-100">
              { /* <div className="mb-5">
                <h2 className="medium-heading text-black mb-2">Subscription</h2>
                <p>#{subscriptions?.paymentDetails?.paymentIntentId}</p>
              </div> */ }
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h2 className="medium-heading text-black mb-2">
                    Last Payment
                  </h2>
                  <p>
                    On{ " " }
                    { subscriptions?.paymentDetails?.date
                      ? moment(subscriptions?.paymentDetails?.date).format(
                        "DD-MMM-YYYY"
                      )
                      : "No Date" }
                  </p>
                </div>
                <div>
                  <h2 className="medium-heading text-black mb-2">Expiration</h2>
                  <p>
                    On{ " " }
                    { subscriptions?.activePack?.expireDate
                      ? moment(subscriptions?.activePack?.expireDate).format(
                        "DD-MMM-YYYY"
                      )
                      : "No Date" }
                  </p>
                </div>
                { /* <Button
                  variant="primary"
                  className="primary-btn-outline sm ml-auto"
                >
                  Manage Payments
                </Button> */ }
              </div>
            </div>
          </Col>
        </Row>
        <div className="d-flex align-items-center mt-2">
          <GenericPdfDownloader
            rootElementId="refer"
            downloadFileName="download"
            data={ subscriptions }
          />
          <Button
            variant="primary"
            className="primary-btn orange-btn sm px-4"
            onClick={ () => {
              emailReceipt();
            } }
          >
            Email Receipt
          </Button>
        </div>
      </div>
      <DashFooter />
      <Dialog handleClose={ handleClose } show={ show } />
    </React.Fragment>
  );
}

const Dialog = ({ handleClose, show }) => {
  return (
    <>
      <Modal
        show={ show }
        onHide={ handleClose }
        backdrop="static"
        keyboard={ false }
        size={ "xl" }
      >
        <Modal.Header closeButton>
          <Modal.Title>Packages</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TeacherPayments isComingFromDialog={ true } />
        </Modal.Body>
      </Modal>
    </>
  );
};

export const GenericPdfDownloader = ({
  rootElementId,
  downloadFileName,
  data
}) => {
  const [load, setLoad] = React.useState(false);
  const downloadPdfDocument = () => {
    setLoad(true);
    const pdf = new jsPDF({
      orientation: "landscape",
      format: [800, 800]
    });
    pdf.html(htmlString(data), {
      callback: function (doc) {
        pdf.save(`${downloadFileName}.pdf`);
        setLoad(false);
      },
      x: 10,
      y: 10,
      width: 700,
      windowWidth: 700
    });
  };

  return (
    <Button
      variant="primary"
      className="org-btn-outline  bg-light-org sm mr-4 px-4 "
      onClick={ downloadPdfDocument }
    >
      { load ? "loading..." : "Print" }
    </Button>
  );
};

const htmlString = (data) => {
  const url = window.location.href.split("/");
  return `<table role="presentation"
	style="width:610px;border-collapse:collapse;border-spacing:0;text-align:left;margin: 0 auto;">
	<tr>
		<td style="padding-bottom:20px;">
    <img src="${logo}" alt="logo" width="100" height="auto">
		</td>
	</tr>
  ${
  data.paymentDetails?.amount / 100
    ? `<tr>
    <td style='padding:18px 15px;'>
      <div style='font-size: 18px; text-transform: uppercase;color:#7e8795;padding-bottom: 8px;'>
        <img src=${logo} alt='payment' width='15px' height='15px'>
        Lit Payment Receipt
      </div>
      <div style='font-size: 35px;color:#4f5769'>
        <strong style='color:#182034'>${
  data.paymentDetails?.amount
    ? "$" + data.paymentDetails?.amount / 100
    : ""
}</strong> USD 
        <span style='font-size: 16px; color: #1f731f;background: #beecc6;padding: 2px 9px;display: inline-block;border-radius: 4px;text-transform: capitalize;vertical-align: text-top;margin-top: 10px;'>
          ${data.paymentDetails?.status} 
        </span>
      </div>
    </td>
    </tr>`
    : ""
}
	
	<tr>
		<td style="padding:8px; border-top: 1px solid #cabdbd;">
			<table style="width:100%">
				<tr>
					<td style="text-align:left;color:#7e8795;border-right: 1px solid #cabdbd; padding: 10px 22px;">
						<div><b>Name</b></div>
						<div>${Capital(data?.user?.firstname) + " " + Capital(data?.user?.lastname)}</div>
					</td>
					<td style="text-align:left;color:#7e8795;border-right: 1px solid #cabdbd; padding: 10px 22px;">
						<div><b>Package</b></div>
						<div>${Capital(data?.activePack?.name)}</div>
					</td>
					<td style="text-align:left;color:#7e8795;border-right: 1px solid #cabdbd; padding: 10px 22px;">
            <div><b>Active</b></div>
            <div>${data.activePack ? "Yes" : "No"}</div>
          </td>
					<td style="text-align:left;color:#7e8795;border-right: 1px solid #cabdbd; padding: 10px 22px;witdh:50px;">
            <div><b>Start Date</b></div>
            <div>${
  data?.paymentDetails?.date
    ? moment(data?.paymentDetails?.date).format("DD-MMM-YYYY")
    : ""
}
            ${
  data?.activePack?.startDate
    ? moment(data?.activePack?.startDate).format("DD-MMM-YYYY")
    : ""
}
            ${
  data?.expirePack?.startDate
    ? moment(data?.expirePack?.startDate).format("DD-MMM-YYYY")
    : ""
}
            
            </div>
          </td>
					<td style="text-align:left;color:#7e8795;padding: 10px 22px;witdh:50px;">
            <div><b>End Date</b></div>
            <div>  ${
  data?.activePack?.expireDate
    ? moment(data?.activePack?.expireDate).format("DD-MMM-YYYY")
    : ""
}
            ${
  data?.expirePack?.expireDate
    ? moment(data?.expirePack?.expireDate).format("DD-MMM-YYYY")
    : ""
}</div>
          </td>
				</tr>
        <tr>
          <td colspan="5" style="padding-top:30px;text-align:center"><a href="https://www.learnlit.online" style="color:#13bbed">https://www.learnlit.online</a></td>
        </tr>
			</table>
		</td>
	</tr>
</table>`;
};
