import React, { useState, useEffect } from "react";
import axios from "axios";
import BookNav from "../../Books/components/BookNavbar";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../../Home/components/Footer";
import Cookies from "js-cookie";
import { message } from "antd";

const AllBooksDetail = () => {
  const [books, setBooks] = useState([]);
  const [wishlistBooks, setWishlistBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("jwt_token");

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const [fictionResponse, historyResponse, healingResponse, businessResponse] = await Promise.all([
          axios.get(`http://localhost:8000/api/fiction-books/`),
          axios.get(`http://localhost:8000/api/history-books/`),
          axios.get(`http://localhost:8000/api/healing-books/`),
          axios.get(`http://localhost:8000/api/business-books/`),
        ]);

        // Combine all books into one array
        const allBooks = [
          ...fictionResponse.data,
          ...historyResponse.data,
          ...healingResponse.data,
          ...businessResponse.data,
        ];

        setBooks(allBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    const fetchWishlistBooks = async () => {
      try {
        // Fetch user profile to get user ID
        const userResponse = await axios.get("http://localhost:8000/api/user/", {
          headers: {
            Authorization: `JWT ${token}`,
          },
        });

        const userId = userResponse.data.user.id;

        // Fetch wishlist details using user ID
        const response = await axios.get(`http://localhost:8000/create_api/wishlistdetail/?user=${userId}`);
        setWishlistBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        message.error("Failed to load wishlist.");
        setLoading(false);
      }
    };

    fetchAllBooks();
    fetchWishlistBooks();
  }, [token]);

  // Filter books that are in the wishlist
  const filteredBooks = books.filter(book => 
    wishlistBooks.some(wishlistBook => wishlistBook.id === book.id)
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <BookNav />
      <div>
        <div className="row">
          {filteredBooks.map((book) => (
            <div className="col-2 col-md-3 col-sm-4 col-xs-5 col-lg-2" key={book.google_id}>
              <Card className="swiper-bed">
                <Link to={`/${book.google_id}`} className="text-decoration-none text-reset">
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
                  </Card.Body>
                </Link>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllBooksDetail;
