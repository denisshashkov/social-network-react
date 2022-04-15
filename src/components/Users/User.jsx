import React from "react";
import { NavLink } from "react-router-dom";
import userPhoto from "../../assets/image/user.png";
import classes from "./users.module.scss";

function User({
  user,
  followThunkCreator,
  followingProgress,
  unFollowThunkCreator,
}) {
  return (
    <div>
      <div>
        <NavLink to={"/profile/" + user.id}>
          <img
            className={classes.user__photo}
            src={user.photos.large != null ? user.photos.large : userPhoto}
            alt=""
          />
        </NavLink>
      </div>
      <div>
        {user.followed ? (
          <button
            disabled={followingProgress.includes(user.id)}
            onClick={() => {
              unFollowThunkCreator(user);
            }}
          >
            Unfollow
          </button>
        ) : (
          <button
            disabled={followingProgress.includes(user.id)}
            onClick={() => {
              followThunkCreator(user);
            }}
          >
            Follow
          </button>
        )}
      </div>
      <div>
        <h3>{user.name}</h3>
        <span>{user.status}</span>
      </div>
      <div>
        <span>{"user.location.country"}</span>
        <span>{"user.location.city"}</span>
      </div>
    </div>
  );
}

export default User;
