import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const todoQuery = createApi({
  reducerPath: "todo",
  tagTypes: ["Todo"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9999/api/v1/todos",
  }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/",
      providesTags: ["Todo"],
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: "/add",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),
    removeTodo: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),

    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `/update/${todo.id}`,
        method: "PUT",
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useRemoveTodoMutation,
} = todoQuery;

export default todoQuery;
