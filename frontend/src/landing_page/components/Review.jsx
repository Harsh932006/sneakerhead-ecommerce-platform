import React from "react";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Review = ({ productId }) => {
  const [review, setReview] = useState("");

  const [userReviews, setUserReviews] = useState([]);

  const { user } = useContext(AuthContext);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/products/reviews",
        {
          withCredentials: true,
        },
      );

      setUserReviews(response.data.reviews);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!user) {
        return toast.error("Please login first to add the review");
      }

      const response = await axios.post(
        `http://localhost:3000/api/products/${productId}/review`,
        {
          review: review,
        },
        {
          withCredentials: true,
        },
      );

      toast.success("Review added successfully");
      fetchReviews();
      setReview("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (product, review) => {
    try {
      if (!user) {
        return toast.error("Please login first.");
      }

      const response = await axios.delete(
        `http://localhost:3000/api/products/${product}/review/${review}`,
        {
          withCredentials: true,
        },
      );
      fetchReviews();
      toast.success("Review deleted successfully");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Error deleting review");
    }
  };

  const filteredReviews = userReviews.filter(
  (review) => review.product === productId
);
  

  return (
    <div className="mb-10">
      <hr />
      <h1 className="text-center p-10 font-bold text-4xl">Add Reviews</h1>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col content-center items-center gap-5"
      >
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Enter your review here."
          className="h-50"
        ></textarea>
        <button className="bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all px-8 py-3.5 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 flex-1 sm:flex-none text-center">
          Add Review
        </button>
      </form>

      <div className="p-10 mt-10">
        <h1 className="text-center text-4xl font-bold">User Reviews</h1>
        <div className="reviews-wrapper">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => {
              return (
                <div key={review._id} className="review relative">
                  <h2>
                    <i className="fa-solid fa-user"></i> {review.user?.username}
                  </h2>
                  <p>{review.review}</p>
                  
                  <i
                    className="fa-solid fa-trash-can absolute right-4.5 top-5.5 text-xl cursor-pointer hover:text-red-600 active:scale-80"
                    onClick={() => handleDelete(review.product, review._id)}
                  ></i>
                </div>
              );
            })
          ) : (
            <h1 className="text-xl italic p-10 text-center" style={{width: "100%"}}>
              Oops there is no reviews for this product.
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;
