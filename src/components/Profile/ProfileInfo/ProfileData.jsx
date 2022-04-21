import React from "react";
import ProfileContacts from "./ProfileContacts";

function ProfileData({ profile, owner, editModeHandler }) {
  const activateEditMode = () => {
    editModeHandler();
  };
  return (
    <div>
      {owner && (
        <div>
          <button onClick={activateEditMode}>Edit</button>
        </div>
      )}
      <div>
        <b>Full Name: {profile.fullName}</b>
      </div>
      <div>
        <b>Looking for a job: {profile.lookingForAJob ? "Yes" : "No"}</b>
      </div>
      <div>
        <b>About me: {profile.aboutMe}</b>
      </div>
      <div>
        {profile.lookingForAJob && (
          <b>Skills: {profile.lookingForAJobDescription}</b>
        )}
      </div>
      {/* <div>
        <b>Contacts</b>:
        {Object.keys(profile.contacts).map((key) => {
          return (
            <ProfileContacts
              key={key}
              contactTitle={key}
              contactValue={profile.contacts[key]}
            />
          );
        })}
      </div> */}
    </div>
  );
}

export default ProfileData;
