import { createTodoSchema, deleteTodoSchema, filterQuery } from "./todo-schema";
import {
  createTodoHandler,
  deleteTodoHandler,
  getTodoListHandler,
} from "./todo-controller";
import { t } from "@/utils/trpc-server";

const todoRouter = t.router({
  createTodo: t.procedure
    .input(createTodoSchema)
    .mutation(({ input }) => createTodoHandler({ input })),
  deleteTodo: t.procedure
    .input(deleteTodoSchema)
    .mutation(({ input }) => deleteTodoHandler({ id: input?.id })),
  getTodoList: t.procedure
    .input(filterQuery)
    .query(({ input }) => getTodoListHandler({ filterQuery: input })),
});

export default todoRouter;
