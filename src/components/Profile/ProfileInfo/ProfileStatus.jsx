import React, { useEffect, useState } from "react";
import classes from "./profileStatus.module.scss";

const ProfileStatus = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);
  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const editModeHandler = () => {
    setEditMode(true);
  };

  const deactivateEditModeHandler = () => {
    setEditMode(false);
    props.updateStatus(status);
  };

  const statusChangeHandler = (e) => {
    let statusValue = e.target.value;
    setStatus(statusValue);
  };

  return (
    <div className={classes.profile__status}>
      {!editMode ? (
        <div>
          <span onClick={editModeHandler}>{props.status || "Add status"}</span>
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