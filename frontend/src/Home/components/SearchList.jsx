// SearchResult.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import BookNav from "../../Books/components/BookNavbar";

function SearchResult() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = useParams();
  const bookName = query.bookName;

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/book-search/?query=${query.bookName}`
      )
      .then((response) => {
        setResults(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setLoading(false);
      });
  }, [query]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <BookNav />
      <h5 className="text-decoration-underline">Searching for : {bookName}</h5>
      <div className="row">
        {results.map((book) => {
          return (
            <div className="col-2 col-md-3 col-sm-4 col-xs-5 col-lg-2">
              <Card className="swiper-bed">
                <Link
                  to={`/${book.google_id}`}
                  className="text-decoration-none text-reset"
                >
                  <Card.Body>
                    <div className="d-flex justify-content-center Card-Body">
                      <img src={book.thumbnail} alt="" className="card-image" />
                    </div>
                    <div className="text-center mt-1">
                      <strong>
                        {book.title.length > 20 ? (
                          <span>{book.title.substring(0, 25)}...</span>
                        ) : (
                          <span>{book.title}</span>
                        )}
                      </strong>
                    </div>
                    <div className="text-center text-secondary">
                      {book.authors.substring(0, 25)}
                    </div>
                    <div className="text-center price">
                      {book.retail_price_amount !== 0 ? (
                        <div>
                          ₹ <span>{book.retail_price_amount}</span>
                        </div>
                      ) : (
                        <div>Free</div>
                      )}
                    </div>
                    <div className="sci ms-2">
                      <div className="scidetail ms-3">
                        {/* <button className="btn btn-light scibutton" onClick={() => handleModal(book)}>Quick View</button> */}
                      </div>
                    </div>
                  </Card.Body>
                </Link>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchResult;
