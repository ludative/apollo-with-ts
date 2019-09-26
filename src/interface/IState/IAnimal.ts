import { IPageState } from "./ICommon";

export interface IAnimalState extends IPageState {
  animals: IAnimal[];
  name: string;
}

export interface IAnimal {
  id: number;
  name: string;
  createdAt: string;
}
