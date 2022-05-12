import Pagination from "../common/paginator/Pagination";
import User from "./User";
import { UsersType } from "../../types/types";
import classes from "./users.module.scss";

type PropsType = {
  pageSize: number;
  currentPage: number;
  totalUsersCount: number;
  users: Array<UsersType>;
  followingProgress: Array<number>;
  changePageHandler: (pageNumber: number) => void;
  followThunkCreator: (user: UsersType) => void;
  unFollowThunkCreator: (user: UsersType) => void;
};

const Users: React.FC<PropsType> = (props) => {
  return (
    <div className={classes.users}>
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
