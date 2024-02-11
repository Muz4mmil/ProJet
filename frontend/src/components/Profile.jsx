import { User, useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h1>{user.name}</h1>
        <p>{user.email}</p>
        <p>{user.birthdate}</p>
      </div>
    )
  );
};

export default Profile;