"use client";

import { memo, useMemo, useRef, useState } from "react";

type Todo = {
  id: number;
  text: string;
  isDone: false;
};

export default function Page() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      text: "Learn Next.js",
      isDone: false,
    },
  ]);

  const handleCreateTodo = () => {
    if (!text) {
      alert("Please enter a todo");
      return;
    }
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: prevTodos.length + 1, text, isDone: false },
    ]);
    setText("");
  };

  const handleDoneTodo = (todo: Todo) => {
    const updatedTodos = todos.map((t) => {
      return t.id === todo.id ? { ...t, isDone: !t.isDone } : t;
    });

    const updatedTodos2 = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, isDone: !t.isDone };
      } else {
        return t;
      }
    });

    setTodos(updatedTodos2 as Todo[]);
  };

  const removeTodo = (todo: Todo) => {
    const updatedTodos = todos.filter((t) => t.id !== todo.id);

    setTodos(updatedTodos);
  };

  return (
    <section className="flex w-full flex-col items-center justify-center gap-4">
      <h1>Hello World</h1>
      <input
        name="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => handleCreateTodo()}>add todo</button>
      {todos.map((t) => (
        <div className="flex justify-between" key={t.id}>
          <h1>{t.text}</h1>
          <button className="text-red-500" onClick={() => removeTodo(t)}>
            remove
          </button>
          <input
            type="checkbox"
            checked={t.isDone}
            onChange={() => handleDoneTodo(t)}
          />
        </div>
      ))}
      <ChildComp />
    </section>
  );
}

const ChildComp = memo(() => {
  const [isGood, setIsGood] = useState(true);
  const [text, setText] = useState("");
  const [prices] = useState([10, 30, 40]);
  const renders = useRef(0);
  console.log("renders child", renders.current++);

  const totalPrice = prices.reduce((acc, curr) => acc + curr, 0);

  const unMemoized = () => {
    console.log("unmemoized doing calculations");
    return prices.reduce((acc, curr) => acc + curr, 0);
  };

  const memoizedTotalPrice = useMemo(() => {
    console.log("doing calculations");
    return prices.reduce((acc, curr) => acc + curr, 0);
  }, [isGood]);

  console.log("totalprice", totalPrice);

  return (
    <div>
      <button onClick={() => setIsGood(!isGood)}>
        {isGood ? "good" : "bad"}
      </button>
      <h1>Total price{memoizedTotalPrice}</h1>
      <h1>Total price unmemoized{unMemoized()}</h1>
      <input
        className="border"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
});
