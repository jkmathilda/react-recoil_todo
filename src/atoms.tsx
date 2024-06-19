import { atom, selector } from "recoil";
import { loadState, saveState } from "./localStorage";

export enum Categories {
  TO_DO = "TO_DO",
  DOING = "DOING",
  DONE = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export const categoryState = atom<string>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: loadState("toDoState") || [],
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newState) => {
        saveState("toDoState", newState);
      });
    },
  ],
});

export const customCategoriesState = atom<string[]>({
  key: "customCategories",
  default: loadState("customCategoriesState") || [],
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newState) => {
        saveState("customCategoriesState", newState);
      });
    },
  ],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
