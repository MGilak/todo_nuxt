import { db } from "~/server/db";
import { createError, sendError } from "h3";

export default defineEventHandler((e) => {
  const method = e.method;
  const contex = e.context;

  // 1. extract the path parameter
  const { id } = contex.params;

  const findTodoById = (todoId) => {
    // 2. find todo in db
    let index;
    const todo = db.todos.find((t, i) => {
      if (t.id === todoId) {
        index = i;
        return true;
      }
      return false;
    });

    // 3. throw custome error if todo is not found
    if (!todo) {
      const TodoNotFoundError = createError({
        statusCode: 404,
        statusMessage: "Todo not found",
        data: {},
      });

      sendError(e, TodoNotFoundError);
    }

    return { todo, index };
  };

  if (method === "PUT") {
    const { todo, index } = findTodoById(id);

    // 4. update the completed status
    const updatedTodo = {
      ...todo,
      completed: !todo.completed,
    };
    db.todos[index] = updatedTodo;

    // 5. return the updated todo
    return updatedTodo;
  }

  if (method === "DELETE") {
    const { index } = findTodoById(id);

    db.todos.splice(index, 1);

    return {
      message: "item deleted",
    };
  }
});
