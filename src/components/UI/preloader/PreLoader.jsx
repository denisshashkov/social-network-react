import React from "react";
import loader from "../../../assets/image/loader.gif";

const Preloader = () => {
  return (
    <div>
      <img src={loader} alt="LOADING..." />
    </div>
  );
};

export default Preloader;
