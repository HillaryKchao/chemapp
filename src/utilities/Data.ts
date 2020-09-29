import { cloneDeep } from "lodash";

import { INameFormula } from "../models/NameFormula.model";
import compoundJson from "../data/CompounNames.json";

export const compoundData: INameFormula[] = cloneDeep(
  compoundJson as INameFormula[]
);

export const Shuffle = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[j]
    // we use "destructuring assignment" syntax to achieve that
    // you'll find more details about that syntax in later chapters
    // same can be written as:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const ShuffleData = () => {
  Shuffle(compoundData);
  compoundData.forEach((value, index) => {
    if (Math.random() < 0.5) {
      value.nameFirst = true;
    } else {
      value.nameFirst = false;
    }
  });
};

ShuffleData();
