import React from "react";
import cusRev1 from "../../img/cus_review1.jpg";
import cusRev2 from "../../img/cus_review2.jpg";
import cusRev3 from "../../img/cus_review3.jpg";
import "./style.css";

function Review() {
  return (
    <div className="review" id="idreview">
      <div className="review-title">WHY CHOOSE US</div>
      <div className="review-container">
        <div className="review-card-container">
          <img className="review-img" src={cusRev1} alt="girl in shoes" />
          <div className="review-line">
            "Feels like I'm flying with these shoes! No cap."
          </div>
          <div className="reviewer">-Jess</div>
        </div>
        <div className="-review-card-container">
          <img className="review-img" src={cusRev2} alt="girl in shoes" />
          <div className="review-line">
            "Found these and wear them ever since!"
          </div>
          <div className="reviewer">-Jeff</div>
        </div>
        <div className="review-card-container">
          <img className="review-img" src={cusRev3} alt="girl in shoes" />
          <div className="review-line">
            "Just the right item to complete my look."
          </div>
          <div className="reviewer">-Zucc</div>
        </div>
      </div>
    </div>
  );
}

export default Review;
