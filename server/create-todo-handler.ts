// TODO: stop using universal-middleware and directly integrate server middlewares instead. (Bati generates boilerplates that use universal-middleware https://github.com/magne4000/universal-middleware to make Bati's internal logic easier. This is temporary and will be removed soon.)
import type { Get, UniversalHandler } from "@universal-middleware/core";
import * as sqliteQueries from "../database/sqlite/queries/todos";
import type { db as sqliteDb } from "../database/sqlite/db";

export const createTodoHandler: Get<[], UniversalHandler<Universal.Context & { db: ReturnType<typeof sqliteDb> }>> =
  () => async (request, _context, _runtime) => {
    // In a real case, user-provided data should ALWAYS be validated with tools like zod
    const newTodo = (await request.json()) as { text: string };

    sqliteQueries.insertTodo(_context.db, newTodo.text);

    return new Response(JSON.stringify({ status: "OK" }), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  };
