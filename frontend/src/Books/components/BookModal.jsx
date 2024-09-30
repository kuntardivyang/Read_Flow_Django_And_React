import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import "../../style/BookModal.css";

const BookModal = (props) => {
  return (
    <div>
      <Modal
        size="lg"
        show={props.modalOpen}
        onHide={() => props.handleModal()}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg"></Modal.Title>
        </Modal.Header>
        {props.book && (
          <Modal.Body>
            <div className="row">
              <div className="col-3">
                <img src={props.book.small_thumbnail} alt="" />
              </div>
              <div className="col-9">
                <div className="fs-3 fw-bold">{props.book.title}</div>
                <div className="fst-italic">By : {props.book.authors}</div>
                {props.book.retail_price_amount !== 0 ? (
                  <div className="fs-5">
                    ₹ <span>{props.book.retail_price_amount}</span>
                  </div>
                ) : (
                  <div>Free</div>
                )}
                <div className="mt-3">
                  <span className="fw-bold">Description :</span>
                  <span>
                    {props.book &&
                      props.book.description &&
                      props.book.description.substring(0, 200)}
                  </span>{" "}
                  ...
                </div>
                <Link to={`/${props.book.google_id}`}>
                  <Button className="detail-btn my-3" variant="">
                    More Details
                  </Button>
                </Link>
              </div>
            </div>
          </Modal.Body>
        )}
      </Modal>
    </div>
  );
};

export default BookModal;
