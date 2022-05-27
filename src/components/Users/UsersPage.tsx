import Users from "./Users";
import Preloader from "../common/preloader/PreLoader";
import { useSelector } from "react-redux";
import { getIsFetching } from "../../redux/usersSelectors";

const UsersPage = () => {
  const isFetching = useSelector(getIsFetching);
  return (
    <>
      {isFetching ? <Preloader /> : null}
      <Users />
    </>
  );
};

export default UsersPage;
