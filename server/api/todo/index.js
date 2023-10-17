import { db } from "~/server/db";
import { v4 as uuid } from "uuid";
import { createError, sendError } from "h3";

export default defineEventHandler(async (event) => {
  const method = event.method;

  if (method === "GET") {
    console.log(db.todos);
    return db.todos;
  }

  if (method === "POST") {
    const body = await readBody(event);

    if (!body.item) {
      const TodoNotFoundError = createError({
        statusCode: 400,
        statusMessage: "no item provided",
        data: {},
      });
    }

    const newTodo = {
      id: uuid(),
      item: body.item,
      completed: false,
    };

    db.todos.push(newTodo);

    return newTodo;
  }
});
