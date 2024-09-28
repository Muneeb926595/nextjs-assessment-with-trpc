'use client';

import queryClient from '@/utils/query-client';
import { trpc } from '@/utils/trpc';
import Image from 'next/image';

export default function ListTodo() {
  const { data } = trpc.getTodoList.useQuery({ limit: 10, page: 1 });

  const { mutate } = trpc.deleteTodo.useMutation({
    onSettled: () => {

    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          ['getTodoList'],
          { input: { limit: 10, page: 1 }, type: 'query' },
        ],
      });
    },
  });

  const handleDelete = (id: number) => {
    mutate({ id });
  }
  return (
    <>
      {data?.data.todoList.length === 0 ? (
        <p className='text-center'>No Todo item Found</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr ',
            gap: 20,
          }}
        >
          {data?.data.todoList?.map((todo) => (
            <div
              key={todo?.id}
              className='flex flex-col p-4 border-gray-200 border'
            >
              <div className='flex flex-row justify-between'>

                <h3 className='text-left'>{todo?.name}</h3>

                <button
                  className=' border-black-20 px-2 rounded border-2'
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(todo?.id)
                  }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
