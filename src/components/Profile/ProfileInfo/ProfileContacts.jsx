import React from "react";

function ProfileContacts({ contactTitle, contactValue }) {
  return (
    <div>
      <b>{contactTitle}</b> : {contactValue}
    </div>
  );
}

export default ProfileContacts;
