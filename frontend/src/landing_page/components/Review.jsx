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
  }, [userReviews]);

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
   

    <section className="w-full flex flex-col gap-10">
      
      
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-neutral-100">
          Community Feedback
        </h2>
        <p className="text-sm text-neutral-400">
          See what other sneakerheads are saying or drop your own rating profile below
        </p>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start w-full">
        
        
        <div className="lg:col-span-5 w-full p-6 md:p-8 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col gap-5 shadow-2xl">
          <div>
            <h3 className="text-lg font-bold text-neutral-100 tracking-tight">Write a Review</h3>
            <p className="text-xs text-neutral-500 mt-0.5">Share your experience regarding sizing, comfort, and materials</p>
          </div>

          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 w-full items-stretch">
            <div className="flex flex-col gap-1.5 w-full">
              <textarea
                value={review || ""}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Share your thoughts on this pair..."
                rows="4"
                style={{ width: '100%' }}
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none text-sm leading-relaxed"
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-wide shadow-lg shadow-blue-600/20 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-neutral-900 transition-all duration-150"
            >
              Post Review &rarr;
            </button>
          </form>
        </div>

        {/* Right Column: Active Feed Stream Layout */}
        <div className="lg:col-span-7 w-full flex flex-col gap-4">
          <div className="border-b border-neutral-900 pb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider">
              Reviews ({filteredReviews.length})
            </h3>
          </div>

          <div className="flex flex-col gap-4 w-full max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredReviews.length > 0 ? (
              filteredReviews.map((item) => {
                const cleanProdId = item.product?._id || item.product;
                const isOwner = user && item.user?._id === user._id;

                return (
                  <div 
                    key={item._id} 
                    className="w-full p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 shadow-md flex items-start justify-between gap-4 group transition-all duration-200 hover:border-neutral-800"
                  >
                    <div className="flex gap-4 items-start">
                      
                      <div className="p-2.5 bg-neutral-950 border border-neutral-800 text-blue-400 rounded-xl text-sm shrink-0">
                        <i className="fa-solid fa-user"></i>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-sm text-neutral-200 tracking-tight">
                          {item.user?.username || "Anonymous Collector"}
                        </span>
                        <p className="text-neutral-400 text-sm leading-relaxed whitespace-pre-wrap">
                          {item.review}
                        </p>
                      </div>
                    </div>

                    {/* Delete Trigger Icon */}
                    <button
                      type="button"
                      aria-label="Delete Review Comment"
                      onClick={() => handleDelete(cleanProdId, item._id)}
                      className="p-2 rounded-lg bg-neutral-950/40 hover:bg-red-950/40 border border-neutral-800/80 hover:border-red-900/40 text-neutral-500 hover:text-red-400 opacity-60 group-hover:opacity-100 transition-all duration-200 shrink-0 self-center"
                    >
                      <i className="fa-solid fa-trash-can text-sm"></i>
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="w-full border border-neutral-900 bg-neutral-900/10 rounded-2xl p-10 text-center flex flex-col items-center justify-center">
                <i className="fa-solid fa-comments text-3xl text-neutral-700 mb-2"></i>
                <p className="text-sm font-semibold text-neutral-400 italic">
                  No reviews posted for this sneaker model yet.
                </p>
                <p className="text-xs text-neutral-600 mt-0.5">Be the first to share your thoughts!</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Review;
