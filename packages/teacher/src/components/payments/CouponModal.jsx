import React from 'react';
import { Modal } from 'react-bootstrap';
import styledComponent from 'styled-components';
import Input from 'common/src/components/Forms/input';
import { useState } from 'react';

const ModalTitle = styledComponent.div`
color: black;
font-weight: bold;
font-size: calc(1.5 * 1rem);
`
const Button = styledComponent.button`
background-color: #28c2ea;
border-color: #28c2ea;
color: white !important;

`
const CouponModal = ({ show, close, onYes,onNo }) =>{
  const [code,setCode]=useState(null)
  return (<Modal show={show} onHide={close}>
    <Modal.Header closeButton>
      <ModalTitle>
        Do you have coupon ?
      </ModalTitle>
    </Modal.Header>
    <Modal.Body>
      <div className="d-flex">
        <Input
          label='Coupon code :'
          value={code}
          onChange={e=>setCode(e.target.value)}
        />
      </div>
      <div className="d-flex">
        <Button
          className="btn btn-primary blue-hover block m-b mr-1"
          onClick={()=>onYes({code})}
        >
          Apply coupon
      </Button>
        <Button
          className="btn btn-primary blue-hover block m-b"
          onClick={onNo}
        >
          No coupon
      </Button>
      </div>
    </Modal.Body>
  </Modal>)
}
export default CouponModal;