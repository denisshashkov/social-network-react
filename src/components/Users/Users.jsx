import userPhoto from "../../assets/image/user.png";
import classes from "./users.module.scss";

const Users = (props) => {
  const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  return (
    <div>
      {pages.map((page) => (
        <span
          key={page}
          className={
            props.currentPage === page
              ? classes.selectedPage
              : classes.pageNumber
          }
          onClick={(e) => {
            props.changePageHandler(page);
          }}
        >
          {page}
        </span>
      ))}

      {props.users.map((user) => (
        <div key={user.id}>
          <div>
            <img
              className={classes.user__photo}
              src={user.photos.small != null ? user.photos.small : userPhoto}
              alt=""
            />
          </div>
          <div>
            {user.followed ? (
              <button onClick={() => props.unFollow(user.id)}>Unfollow</button>
            ) : (
              <button onClick={() => props.follow(user.id)}>Follow</button>
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
      ))}
    </div>
  );
};

export default Users;
