import React, { useState, useEffect, useCallback } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Card, Container } from "react-bootstrap";
import "../../style/Slider.css";
import BookModal from "./BookModal";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";

export default function Slider(props) {
  const [modalOpen, setModal] = useState(false);
  const [book, setBook] = useState({});
  const [userProfile, setUserProfile] = useState();
  const [flag, setFlag] = useState(false);
  const [wishList, setWishlist] = useState();
  const token = Cookies.get("jwt_token");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/user/",
          {
            headers: {
              Authorization: `JWT ${token}`,
            },
          }
        );
        setUserProfile(response.data.user);
        setFlag(true);
      } catch (error) {
        setFlag(false);
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [token]);

  useEffect(() => {
    const fetchwishlist = async () => {
      try {
        console.log(userProfile);
        const response = await axios.get(
          `http://localhost:8000/create_api/wishlistdetail/?user=${userProfile.id}`
        );
        setWishlist(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchwishlist();
  }, [userProfile, wishList]);

  const isInWishlist = useCallback(
    (bookID) => {
      if (wishList) {
        const wishListIds = wishList.map((item) => item.id);
        return wishListIds.includes(bookID);
      }
      return false;
    },
    [wishList]
  );

  useEffect(() => {
    isInWishlist();
  }, [wishList, isInWishlist]);

  const handleModal = (props) => {
    setModal(!modalOpen);
    setBook(props);
  };

  const saveWishlist = async (bookId) => {
    const wishlist = {
      user: userProfile.id,
      books: bookId,
    };
    try {
      const response = await axios.post(
        "http://localhost:8000/create_api/wishlist/",
        wishlist
      );
      message.success("book added to wishlist");
      window.location.reload();
      if (response.statusText === "No Content") {
        message.warning("already in wishlist");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteWishlist = async (bookId) => {
    const wishlist = {
      user: userProfile.id,
      books: bookId,
    };
    try {
      const response = await axios.post(
        "http://localhost:8000/create_api/deletewishlist/",
        wishlist
      );
      console.log(response);
      message.warning("removed from wishlist");
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const splideOptions = {
    type: "slide",
    perPage: 5, // Number of slides to show at once
    perMove: 1, // Number of slides to move when navigating
    gap: 0, // Gap between slides
    breakpoints: {
      1200: {
        perPage: 4,
        perMove: 4,
      },
      992: {
        perPage: 3,
        perMove: 3,
      },
      776: {
        perPage: 3,
        perMove: 3,
      },
      550: {
        perPage: 2,
        perMove: 2,
      },
    },
  };

  return (
    <Container className="splide-container ms-2">
      <Splide options={splideOptions}>
        {props.data.map((book) => (
          <SplideSlide key={book.id}>
            <Card className="swiper-bed">
              <Card.Body>
                <Link
                  to={`/${book.google_id}`}
                  className="text-decoration-none text-reset"
                >
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
                    {book.authors.substring(0, 13)}
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
                </Link>
                <div className="sci ms-2">
                  <div className="scidetail ms-3">
                    <button
                      className="btn btn-light scibutton"
                      onClick={() => handleModal(book)}
                    >
                      Quick View
                    </button>
                    {flag ? (
                      isInWishlist(book.id) ? (
                        <button
                          className="btn btn-danger w-100 mt-2"
                          onClick={() => deleteWishlist(book.id)}
                        >
                          Remove
                        </button>
                      ) : (
                        <button
                          className="btn btn-light scibutton mt-2"
                          onClick={() => saveWishlist(book.id)}
                        >
                          Wishlist
                        </button>
                      )
                    ) : (
                      <button className="btn btn-light scibutton" disabled>
                        Wishlist
                      </button>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </SplideSlide>
        ))}
      </Splide>
      <BookModal handleModal={handleModal} modalOpen={modalOpen} book={book} />
    </Container>
  );
}
