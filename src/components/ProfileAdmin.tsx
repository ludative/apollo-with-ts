import * as React from "react";
import { Query } from "react-apollo";
import { GET_USER_BY_ID } from "../queries/user";

/**
 * To. kkangil
 * Query option에 fetchPolicy: network-only 를 사용하면
 * cache를 사용하지 않는다.
 *
 * 해당 기능은 loading을 계속 보여줘야 하기 때문에
 * cache를 안쓰는게 맞는 방법인것 같음.
 *
 * 상황과 기능에 따라 fetchPolicy='network-only' 를 적절하게 활용하면 될것같다.
 *
 * 아래와 같이 loading status 에 따라 뭔가를 보여줘야 한다면
 * profileTest.tsx 에서 쓴 방법(withApollo props.client)을 사용하는것 보다
 * tag (<Query></Query>)를 사용하는 것이 맞는 방법인것 같다.
 * -> withApollo를 사용하면 loading control이 어렵다.
 *
 * 상황에 맞는 방법을 component 단위로 쪼개서 적절하게
 * 사용하는것이 좋을것 같다.
 */
const ProfileAdmin = ({ userId }) => {
  return (
    <Query
      query={GET_USER_BY_ID}
      variables={{ userId }}
      fetchPolicy="network-only"
    >
      {({ loading, error, data }) => {
        if (loading) {
          return <div>얘는 관리자일까?</div>;
        }
        if (error) {
          return <div>서버가 이상함</div>;
        }
        if (!data) {
          return false;
        }
        return (
          <div>
            <div>
              {data.getUserById.isAdmin ? "관리자지롱" : "관리자 아니지롱"}
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default ProfileAdmin;
