import * as React from "react";
import { useState } from "react";
import { Query } from "react-apollo";
import { GET_USERS } from "../queries/user";
import ProfileAdmin from "./ProfileAdmin";

const Profile = () => {
  const [userId, setUserId] = useState("");

  const getUserById = id => {
    setUserId(id);
    console.log(userId);
  };

  return (
    <Query query={GET_USERS}>
      {({ loading, error, data }) => {
        if (loading) {
          return <div>loading...</div>;
        }
        if (error) {
          return <div>error!!!</div>;
        }
        // if (data) {
        //   console.log("data", data);
        //   return <div>{}</div>;
        // }
        return data.getUsers.rows.map(user => {
          return (
            <div key={user.id} onClick={() => getUserById(user.id)}>
              <h4>
                {user.username}
                {user.nickname ? `(${user.nickname})` : ""}
              </h4>
              {userId === user.id && <ProfileAdmin userId={userId} />}
            </div>
          );
        });
      }}
    </Query>
  );
};

export default Profile;
