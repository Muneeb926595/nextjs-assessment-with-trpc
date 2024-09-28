import { TypeOf, number, object, string } from "zod";

export const createTodoSchema = object({
  name: string({ required_error: "Name is required" }),
});
export const deleteTodoSchema = object({
  id: number({ required_error: "Id is required" }),
});

export const filterQuery = object({
  limit: number().default(1),
  page: number().default(10),
});

export type CreateTodoInput = TypeOf<typeof createTodoSchema>;
export type FilterQueryInput = TypeOf<typeof filterQuery>;
