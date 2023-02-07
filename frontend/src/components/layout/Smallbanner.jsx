import React from "react";

const Smallbanner = () => {
  return (
    <>
    <h2 style={{textAlign: 'center', fontSize: '30px', color: 'grey', marginTop: '30px'}}>what values are provided</h2>
      <div id="feature" className="section__p1">
        <div className="fe__box">
          <img src="/assets/features/f1.png" alt="" />
          <h6>Free Shipping</h6>
        </div>

        <div className="fe__box">
          <img src="/assets/features/f2.png" alt="" />
          <h6>Online Order</h6>
        </div>

        <div className="fe__box">
          <img src="/assets/features/f3.png" alt="" />
          <h6>Save Money</h6>
        </div>

        <div className="fe__box">
          <img src="/assets/features/f4.png" alt="" />
          <h6>Promotions</h6>
        </div>

        <div className="fe__box">
          <img src="/assets/features/f5.png" alt="" />
          <h6>Happy Sell</h6>
        </div>

        <div className="fe__box">
          <img src="/assets/features/f6.png" alt="" />
          <h6>F24/7 Support</h6>
        </div>
      </div>
    </>
  );
};

export default Smallbanner;
