import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./profileStatus.module.scss";

type PropsType = {
  status: string;
  updateStatus: (newStatus: string) => void;
};

const ProfileStatus: React.FC<PropsType> = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);
  const dispatch = useDispatch();
  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const editModeHandler = () => {
    setEditMode(true);
  };

  const deactivateEditModeHandler = () => {
    setEditMode(false);
    dispatch(props.updateStatus(status));
  };

  const statusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let statusValue = e.target.value;
    setStatus(statusValue);
  };

  return (
    <div className={classes.profile__status}>
      {!editMode ? (
        <div>
          <span onClick={editModeHandler}>
            Status: {props.status || "Add status"}
          </span>
        </div>
      ) : (
        <div>
          <input
            onBlur={deactivateEditModeHandler}
            autoFocus={true}
            onChange={statusChangeHandler}
            value={status}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileStatus;
