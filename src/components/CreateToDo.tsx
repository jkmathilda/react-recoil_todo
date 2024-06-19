import React, { useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { toDoState, categoryState } from "../atoms";

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const [text, setText] = useState("");

  const addToDo = () => {
    if (text.trim() === "") return;
    setToDos((oldToDos) => [...oldToDos, { text, id: Date.now(), category }]);
    setText("");
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addToDo();
    }
  };

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Write a to-do"
      />
      <button onClick={addToDo}>Add</button>
    </div>
  );
}

export default CreateToDo;
