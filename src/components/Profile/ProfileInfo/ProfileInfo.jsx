import React from "react";
import classes from "./profileInfo.module.scss";

const ProfileInfo = () => {
  return (
    <div className={classes.profile__info}>
      <img
        className={classes.profile__info__photo}
        src="http://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
        alt=""
      />
      <div className={classes.profile__info__description}>
        <h3>Sarah Cruiz</h3>
        <p>Creative Director</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
