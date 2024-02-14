import React, { useRef } from "react";
import {
  FormContainer,
  Icons,
  LabelContainer,
  TodoContainer,
  TodoList,
  TodosContainer,
} from "./TodoStyles";
import {
  useAddTodoMutation,
  useGetTodosQuery,
  useRemoveTodoMutation,
  useUpdateTodoMutation,
} from "../../query/todoQuery";

export default function Todo() {
  const { data: todos, isSuccess, isError, isLoading } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [removeTodo] = useRemoveTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    addTodo({ todo: inputRef.current.value });
    inputRef.current.value = "";
  }

  return (
    <TodoContainer>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <LabelContainer>
            <label htmlFor="todo">Add Todo</label>
            <input type="text" name="todo" id="todo" ref={inputRef} />
            <button type="submit"> Add</button>
          </LabelContainer>
        </form>
      </FormContainer>
      <TodosContainer>
        {isLoading && <h1>Loading...</h1>}
        {isError && <h1>Something went wrong</h1>}
        {isSuccess && (
          <>
            {todos.map((list) => {
              return (
                <TodoList key={list._id}>
                  <h3>{list.todo}</h3>
                  <div>
                    <button onClick={() => removeTodo(list._id)}>Delete</button>
                    <button
                      onClick={() =>
                        updateTodo({ id: list._id, todo: prompt() })
                      }
                    >
                      Edit
                    </button>
                  </div>
                </TodoList>
              );
            })}
          </>
        )}
      </TodosContainer>
    </TodoContainer>
  );
}
