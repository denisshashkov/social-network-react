import Pagination from "../UI/paginator/Pagination";
import User from "./User";

const Users = (props) => {
  return (
    <div>
      <Pagination
        totalItemCount={props.totalUsersCount}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        changePageHandler={props.changePageHandler}
      />
      {props.users.map((user) => (
        <User
          key={user.id}
          user={user}
          followThunkCreator={props.followThunkCreator}
          followingProgress={props.followingProgress}
          unFollowThunkCreator={props.unFollowThunkCreator}
        />
      ))}
    </div>
  );
};

export default Users;
