import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
// import '@splidejs/react-splide/css/splide.css';
import "@splidejs/splide/dist/css/splide.min.css";
import "../../style/Slider.css";
import b5 from "../../media/book5.png";
import BookList from "../../Books/components/BookList";
import Footer from "../components/Footer";
import BookNav from "../../Books/components/BookNavbar";
import MyPage from "../../Books/pages/MyPage";

export default function Home() {
  return (
    <Fragment>
      <MyPage/>
      <BookNav />
      <Container className="my-3">
        <div className="row">
          <div className="col-lg-8">
            <img src={b5} alt="" className="fiction-image" />
          </div>
          <div className="col-lg-4">
            <h1 className="mt-5 d-flex justify-content-center book-label">
              Fiction Books
            </h1>
            <h3 className="d-flex justify-content-center">
              All Times Best Selling Books
            </h3>
            <Link
              to="/fiction"
              className=" d-flex justify-content-center text-decoration-none"
            >
              <button className="btn btn-dark">Show More</button>
            </Link>
          </div>
        </div>
      </Container>
      <Container>
        <div className="mb-4">
          <div className="book-head">Literature & literary studies</div>
          <BookList category="history-books" />
        </div>
        <div className="mb-3">
          <div className="book-head">Business & Economics</div>
          <BookList category="business-books" />
        </div>
        <div className="mb-3">
          <div className="book-head">Society & social sciences</div>
          <BookList category="healing-books" />
        </div>
      </Container>
      <Footer />
    </Fragment>
  );
}
