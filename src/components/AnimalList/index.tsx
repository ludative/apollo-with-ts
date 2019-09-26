import * as React from "react";
import { withApollo } from "react-apollo";
import * as moment from "moment";

import { IAnimalProps } from "../../interface/IProps/IAnimal";
import { IAnimalState, IAnimal } from "../../interface/IState/IAnimal";
import { CREATE_ANIMAL } from "../../mutations/animal";
import errorHandler from "src/util/errorHandler";
import Button from "../Common/Button";
import Input from "../Common/Input";
import { GET_ANIMALS } from "src/queries/animal";

import "./style.scss";

class AnimalList extends React.Component<IAnimalProps & any, IAnimalState> {
  public state = {
    animals: [],
    count: 0,
    page: 1,
    pageSize: 10,
    name: ""
  };

  public async componentDidMount() {
    await this.getAnimals();
  }

  private getAnimals = async (): Promise<void> => {
    try {
      const {
        data: { getAnimals }
      } = await this.props.client.query({
        query: GET_ANIMALS,
        fetchPolicy: "network-only"
      });

      this.setState({
        animals: getAnimals.rows,
        count: getAnimals.count
      });
    } catch (err) {
      errorHandler(err);
    }
  };

  protected handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    this.setState(state => ({
      ...state,
      [name]: value
    }));
  };

  protected createAnimal = async (): Promise<void> => {
    try {
      const { name } = this.state;
      const params = { name };

      await this.props.client.mutate({
        mutation: CREATE_ANIMAL,
        variables: params
      });

      await this.getAnimals();

      this.setState({
        name: ""
      });
    } catch (err) {
      errorHandler(err);
    }
  };

  public render(): JSX.Element {
    const { animals, name } = this.state;
    console.log(animals);

    const animalRows = animals.map((animal: IAnimal, index: number) => {
      return (
        <tr key={animal.id}>
          <td>{animals.length - index}</td>
          <td>{animal.name}</td>
          <td>{moment(+animal.createdAt).format("YYYY-MM-DD")}</td>
        </tr>
      );
    });

    return (
      <section className="section-animal-list">
        <h1>동물 리스트</h1>

        <div>
          <Input
            value={name}
            name="name"
            placeholder="동물 이름"
            onChange={this.handleChange}
          />
          <Button text="동물 추가" onClick={this.createAnimal} />
        </div>

        <table style={{ width: "100%" }}>
          {/* <colgroup>
            <col width="15%" />
            <col width="75%" />
          </colgroup> */}
          <thead>
            <tr>
              <th>No.</th>
              <th>동물</th>
              <th>추가일시</th>
            </tr>
          </thead>
          <tbody>{animalRows}</tbody>
        </table>
      </section>
    );
  }
}

export default withApollo(AnimalList);
