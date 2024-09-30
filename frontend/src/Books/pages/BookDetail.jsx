import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../../style/BookDetail.css";
import BookNav from "../components/BookNavbar";
import Footer from "../../Home/components/Footer";
import "../../style/Footer.css";
import MyPage from "./MyPage";

const BookDetail = ({ match }) => {
  const [bookDetail, setBookDetail] = useState(null);
  const [load, setLoad] = useState(true);
  const { bookId } = useParams();
  console.log(bookId);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/search-book/${bookId}/`)
      .then((response) => {
        console.log(response.data);
        setBookDetail(response.data);
        setLoad(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [bookId]);

  return (
    <div>
      <MyPage/>
      <BookNav />
      <div className="container main">
        {console.log(bookDetail)}
        {load ? (
          <p>Loading...</p>
        ) : (
          <>
            <Link to="/home">
              <button className="btn" to='/home'>&lt; Back To Home</button>
            </Link>
            <hr />
            {bookDetail && (
              <div>
                <div className="row">
                  <div className="col-md-3">
                    <div className="container image-div">
                      <img
                        src={bookDetail.thumbnail}
                        alt=""
                        className="book-image"
                      />
                    </div>
                  </div>
                  <div className="col-md-9">
                    <span className="booktitle">{bookDetail.title}</span>
                    <span className="book-info">
                      <span className="book-label mb-4">
                        &nbsp;| Published Date:{" "}
                      </span>
                      {bookDetail.published_date}
                    </span>
                    <div>
                      <span className="book-author">
                        <span className="book-label">Author : </span>
                        {bookDetail.authors}
                      </span>
                      <span className="book-label">&nbsp; | Publisher : </span>
                      <span>{bookDetail.publisher}</span>
                    </div>
                    <hr />
                    <div>
                      <span className="book-label fs-5 fw-bold">
                        {bookDetail.retail_price_amount}{" "}
                        {bookDetail.retail_price_currency_code}
                      </span>
                      &nbsp;{" "}
                      <span className="text-decoration-line-through">
                        {bookDetail.list_price_amount}{" "}
                        {bookDetail.list_price_currency_code}
                      </span>
                    </div>
                    <div>
                      {bookDetail.is_ebook ? (
                        <div>
                          <span className="book-label fw-bold">E-Book</span>
                        </div>
                      ) : (
                        <div>Not an E-Book</div>
                      )}
                    </div>
                    <div>
                      <a href={bookDetail.preview_link}>
                        <button className="btn previewLink">
                          Preview Book
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="booktitle fw-bold mt-3 fs-3">
                    Product Details
                  </h4>
                  <div className="row">
                    <div className="col">
                      <p className="book-info">
                        <span className="book-label fw-bold">
                          Published Date:{" "}
                        </span>
                        {bookDetail.published_date}
                      </p>
                      <p className="book-info">
                        <span className="book-label fw-bold">Page Count: </span>
                        {bookDetail.page_count}
                      </p>
                      <p className="book-info">
                        <span className="book-label fw-bold">Categories: </span>
                        {bookDetail.categories}
                      </p>
                    </div>
                    <div className="col">
                      <p className="book-info">
                        <span className="book-label fw-bold">Publisher: </span>
                        {bookDetail.publisher}
                      </p>
                      <p className="book-info">
                        <span className="book-label fw-bold">
                          Saleability:{" "}
                        </span>
                        {bookDetail.saleability}
                      </p>
                      <p className="book-info">
                        <span className="book-label fw-bold">Language: </span>
                        {bookDetail.language}
                      </p>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div>
                    <h4 className="booktitle fw-bold mt-3 fs-3">Description</h4>
                    <div
                      className="book-description"
                      dangerouslySetInnerHTML={{
                        __html: bookDetail.description,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BookDetail;
