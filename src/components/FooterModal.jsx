import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import './Dashboard.css'

const FooterModal = ({open, handleClose}) => {
  return (
    <Modal show={open} onHide={handleClose} className="modalBg">
      <Modal.Header closeButton>
        <Modal.Title>Date ???</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modalBodyText">
          <p>you, me. A real date. Not like how kids do it these days, like a real date.</p>
          <p>
            I'll pick you up, say 5:30, flowers, my uncleaned scooty <span>{String.fromCodePoint('0x1F6F5')}</span>, and a pretty girl<span>{String.fromCodePoint('0x1F478')}</span>. 
            First we put the destination on google maps and 
            you guide me with the route bcoz of my poor route skills. Reach there and grab dinner. Your favorite place obviously. 
            Order for something in prawns<span>{String.fromCodePoint('0x1F364')}</span> and talk for an hour over dinner.
          </p>
          <p>
            Then, we go get ice cream<span>{String.fromCodePoint('0x1F367')}</span>, I'll get butterscotch, and you get your favorite flavor, 
            and we can sit there and laugh on our stupid jokes<span>{String.fromCodePoint('0x1F602')}</span> till our stomach hurts 
            and low key fall for each other and talk about life. Then, have you home by your 8:40 o'clock curfew<span>{String.fromCodePoint('0x1F563')}</span>, 
            and if i'm lucky, a hug and a forehead kiss<span>{String.fromCodePoint('0x1F648')}</span>, goodnight<span>{String.fromCodePoint('0x1F31A')}</span>.
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <p className="modalFooterText">I only pray you'll never leave me behind because another <b>Likhitha</b> can be so hard to find<span>{String.fromCodePoint('0x1F622')}</span>...!!</p>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default FooterModal