import * as React from "react";
import { withApollo } from "react-apollo";
import { IProfileProps } from "../interface/IProps/IProfile";
import { IProfileState, IProfileUser } from "../interface/IState/IProfile";
import {
  USER_MUTATION_TEST,
  CREATE_USER,
  DELETE_USER_BY_ID
} from "../mutations/user";
import { GET_USERS } from "../queries/user";
import errorHandler from "../util/errorHandler";
import Button from "./Common/Button";
import ProfileAdmin from "./ProfileAdmin";
import Input from "./Common/Input";

/**
 * & any 해주니까 됐는데 왜 되는거지...?
 */
class ProfileTest extends React.Component<IProfileProps & any, IProfileState> {
  public state = {
    users: [],
    count: 0,
    page: 1,
    pageSize: 10,
    selectedUserId: undefined,
    value: "",
    addedValue: undefined,
    username: "",
    nickname: "",
    password: ""
  };

  public async componentDidMount() {
    await this.getUsers();
  }

  private getUsers = async (): Promise<void> => {
    try {
      const {
        data: { getUsers }
      } = await this.props.client.query({
        query: GET_USERS,
        fetchPolicy: "network-only"
      });

      this.setState({
        users: getUsers.rows,
        count: getUsers.count
      });
    } catch (error) {
      alert(error.message);
    }
  };

  private setSelectedUserId = (selectedUserId): void => {
    this.setState({
      selectedUserId
    });
  };

  protected handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    this.setState(state => ({
      ...state,
      [name]: value
    }));
  };

  protected handleClick = async (): Promise<void> => {
    try {
      const { value } = this.state;

      const {
        data: { userMutationTest }
      } = await this.props.client.mutate({
        mutation: USER_MUTATION_TEST,
        variables: { value }
      });

      this.setState({
        addedValue: userMutationTest.value,
        value: ""
      });
    } catch (err) {
      errorHandler(err);
    }
  };

  protected createUser = async (): Promise<void> => {
    try {
      const { username, nickname, password } = this.state;
      const params = {
        username,
        nickname,
        password
      };

      await this.props.client.mutate({
        mutation: CREATE_USER,
        variables: params
      });

      await this.getUsers();

      this.setState({
        username: "",
        nickname: "",
        password: ""
      });
    } catch (err) {
      errorHandler(err);
    }
  };

  protected deleteUser = async (userId: number): Promise<void> => {
    try {
      await this.props.client.mutate({
        mutation: DELETE_USER_BY_ID,
        variables: { userId }
      });

      await this.getUsers();
    } catch (err) {
      errorHandler(err);
    }
  };

  public render(): JSX.Element {
    const {
      users,
      selectedUserId,
      value,
      addedValue,
      username,
      nickname,
      password
    } = this.state;

    return (
      <>
        {/*
          To kkangil
          any type 사용을 최대한 자제하는것이 좋을것 같다.
          GraphQL 스키마를 최대한 활용해서 interface 구현 후 사용
         */}
        {users.map((user: IProfileUser) => (
          <div
            key={user.id}
            onClick={() =>
              user.deleted ? false : this.setSelectedUserId(user.id)
            }
          >
            {user.deleted ? (
              <s>
                <h4>
                  {user.username}
                  {user.nickname ? `(${user.nickname})` : ""}
                </h4>
              </s>
            ) : (
              <h4>
                {user.username}
                {user.nickname ? `(${user.nickname})` : ""}
                <Button text="삭제" onClick={() => this.deleteUser(user.id)} />
              </h4>
            )}

            {selectedUserId === user.id && !user.deleted && (
              <ProfileAdmin userId={selectedUserId} />
            )}
          </div>
        ))}

        <h4>테스트</h4>
        <Input value={value} name={"value"} onChange={this.handleChange} />
        <Button text={"확인"} onClick={this.handleClick} />

        <h4>찐추</h4>
        <Input
          value={username}
          name="username"
          placeholder="아이디 입력"
          onChange={this.handleChange}
        />
        <Input
          value={nickname}
          name="nickname"
          placeholder="닉네임 입력"
          onChange={this.handleChange}
        />
        <Input
          value={password}
          name="password"
          type="password"
          placeholder="패스워드 입력"
          onChange={this.handleChange}
        />
        <Button text={"추가추가"} onClick={this.createUser} />

        {addedValue && <h2>added: {addedValue}</h2>}
      </>
    );
  }
}

export default withApollo(ProfileTest);
