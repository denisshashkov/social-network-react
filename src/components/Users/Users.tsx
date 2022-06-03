import Pagination from "../common/paginator/Pagination";
import { useEffect } from "react";
import User from "./User";
import classes from "./users.module.scss";
import UsersSearchForm from "components/Forms/UsersSearchForm";
import {
  FilterType,
  followThunkCreator,
  getUsersThunkCreator,
  unFollowThunkCreator,
} from "redux/usersReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  getFollowingProgress,
  getPage,
  getPageSize,
  getTotalUserCount,
  getUsersFilter,
} from "redux/usersSelectors";
import { useSearchParams } from "react-router-dom";

type PropsType = {};

type Querytype = {
  term?: string;
  friend?: string;
  page?: string;
};

const Users: React.FC<PropsType> = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const users = useSelector(getAllUsers);
  const followingProgress = useSelector(getFollowingProgress);
  const pageSize = useSelector(getPageSize);
  const currentPage = useSelector(getPage);
  const totalUsersCount = useSelector(getTotalUserCount);
  const filter = useSelector(getUsersFilter);

  const query: Querytype = {};
  useEffect(() => {
    if (!!filter.term) query.term = filter.term;
    if (filter.friend !== null) query.friend = String(filter.friend);
    if (currentPage !== 1) query.page = String(currentPage);
    setSearchParams(query);
  }, [filter, currentPage]);

  useEffect(() => {
    let parsedPage = searchParams.get("page");
    let parsedTerm = searchParams.get("term");
    let parsedFriend = searchParams.get("friend");

    let actualPage = currentPage;
    let actualFilter = filter;

    if (!!parsedPage) actualPage = Number(parsedPage);
    if (!!parsedTerm) actualFilter = { ...actualFilter, term: parsedTerm };
    if (!!parsedFriend)
      actualFilter = {
        ...actualFilter,
        friend:
          parsedFriend === "null"
            ? null
            : parsedFriend === "true"
            ? true
            : false,
      };
    dispatch(getUsersThunkCreator(actualPage, pageSize, actualFilter));
  }, []);

  const changePageHandler = (page: number) => {
    dispatch(getUsersThunkCreator(page, pageSize, filter));
  };

  const onFilterChanged = (filter: FilterType) => {
    dispatch(getUsersThunkCreator(1, pageSize, filter));
  };

  const follow = (userId: number) => {
    dispatch(followThunkCreator(userId));
  };

  const unFollow = (userId: number) => {
    dispatch(unFollowThunkCreator(userId));
  };

  return (
    <div className={classes.users}>
      <div className={classes.users__block}>
        <Pagination
          totalItemCount={totalUsersCount}
          pageSize={pageSize}
          currentPage={currentPage}
          changePageHandler={changePageHandler}
        />
        {users.map((user) => (
          <User
            key={user.id}
            user={user}
            followingProgress={followingProgress}
            follow={follow}
            unFollow={unFollow}
          />
        ))}
      </div>

      <UsersSearchForm onFilterChanged={onFilterChanged} />
    </div>
  );
};

export default Users;
