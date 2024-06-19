import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Categories,
  categoryState,
  toDoSelector,
  customCategoriesState,
} from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [customCategories, setCustomCategories] = useRecoilState(
    customCategoriesState
  );
  const [newCategory, setNewCategory] = useState("");

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  };

  const onAddCategory = () => {
    if (newCategory && !customCategories.includes(newCategory)) {
      setCustomCategories((oldCategories) => [...oldCategories, newCategory]);
      setNewCategory("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onAddCategory();
    }
  };

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
        {customCategories.map((customCategory) => (
          <option key={customCategory} value={customCategory}>
            {customCategory}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="New category"
      />
      <button onClick={onAddCategory}>Add Custom Category</button>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
