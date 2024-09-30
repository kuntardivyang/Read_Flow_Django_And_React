import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function Wishlist() {
  const [userProfile, setUserProfile] = useState({});
  const token = Cookies.get("jwt_token");
  const [flag, setFlag] = useState(false);
  console.log(flag);

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
        console.log(response);
        setUserProfile(response.data.user);
        setFlag(true);
      } catch (error) {
        setFlag(false);
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
    // getWishListData();
  }, [token]);

  const getWishListData = async () => {
    try {
      console.log(userProfile);
      const response = await axios.get(
        `http://localhost:8000/create_api/wishlistdetail/?user=${userProfile.id}`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={() => getWishListData()}>click</button>
    </div>
  );
}

export default Wishlist;
