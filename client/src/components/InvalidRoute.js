import React from "react";
///////////////////////////////////////////
const InvalidRoute = () => {
  return (
    <>
      <div className="error-container">
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
        <span className="zero">
          <span className="screen-reader-text">0</span>
        </span>
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
      </div>
      <div className="link-container">
        <a href="/" className="more-link">
          HOME PAGE
        </a>
      </div>
    </>
  );
};
/////////////////////////////////////////////
export default InvalidRoute;
