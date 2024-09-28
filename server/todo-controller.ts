import prisma from "@/prisma/prisma-client";
import { TRPCError } from "@trpc/server";
import { CreateTodoInput, FilterQueryInput } from "./todo-schema";

export const createTodoHandler = async ({
  input,
}: {
  input: CreateTodoInput;
}) => {
  try {
    const todo = await prisma.todo.create({
      data: input,
    });

    return {
      status: "success",
      data: {
        todo,
      },
    };
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};

export const deleteTodoHandler = async ({ id }: { id: number }) => {
  try {
    const todo = await prisma.todo.delete({
      where: { id },
    });

    return {
      status: "success",
      data: {
        todo,
      },
    };
  } catch (err: any) {
    if (err.code === "P2025") {
      // P2025 is Prisma's "Record to delete does not exist" error
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Todo item not found.",
      });
    }

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};

export const getTodoListHandler = async ({
  filterQuery,
}: {
  filterQuery: FilterQueryInput;
}) => {
  try {
    const { limit, page } = filterQuery;
    const take = limit || 10;
    const skip = (page - 1) * limit;

    const todoList = await prisma.todo.findMany({
      skip,
      take,
    });

    return {
      status: "success",
      results: todoList.length,
      data: {
        todoList,
      },
    };
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};
