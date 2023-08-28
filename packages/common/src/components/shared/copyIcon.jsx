import copy_icon from "common/src/images/copy_icon.svg";
import React from "react";
import {  Overlay, Tooltip } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";

const CopyIcon = ({ text }) => {
  const [show, setShow] = React.useState(false);
  const target = React.useRef(null);

  React.useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShow(false);
      }, 2000);
    }
  }, [show]);
  return (
    <>
      { text && (
        <CopyToClipboard text={ text }>
          { /* <Button className="float-right">C</Button> */ }
          <img
            ref={ target }
            src={ copy_icon }
            className="ml-2 "
            style={ { cursor: "pointer" } }
            alt="copy"
            title="Copy Code"
            onClick={ () => setShow(!show) }
          />
        </CopyToClipboard>
      ) }
      <Overlay target={ target.current } show={ show } placement="right">
        { (props) => (
          <Tooltip id="overlay-example" { ...props }>
            Copied..
          </Tooltip>
        ) }
      </Overlay>
    </>
  );
};

export default CopyIcon;
