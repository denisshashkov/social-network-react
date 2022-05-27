import { NavLink } from "react-router-dom";
import userPhoto from "../../assets/image/user.png";
import Button from "../UI/button/Button";
import classes from "./users.module.scss";
import { UsersType } from "types/types";

type PropsType = {
  user: UsersType;
  followingProgress: Array<number>;
  follow: (userId: number) => void;
  unFollow: (userId: number) => void;
};

const User: React.FC<PropsType> = ({
  user,
  follow,
  followingProgress,
  unFollow,
}) => {
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
          <Button
            disabled={followingProgress.includes(user.id)}
            onClick={() => {
              unFollow(user.id);
            }}
          >
            Unfollow
          </Button>
        ) : (
          <Button
            disabled={followingProgress.includes(user.id)}
            onClick={() => {
              follow(user.id);
            }}
          >
            Follow
          </Button>
        )}
      </div>
      <div>
        <b>{user.name}</b>
        <b>{user.status}</b>
      </div>
      <div>
        <div>
          <span>{"user.location.country"}</span>
        </div>
        <div>
          <span>{"user.location.city"}</span>
        </div>
      </div>
    </div>
  );
};

export default User;
