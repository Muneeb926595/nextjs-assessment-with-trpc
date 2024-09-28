import { dehydrate } from '@tanstack/react-query';
import Hydrate from '@/utils/hydrate-client';
import { createSSRHelper } from './api/trpc/trpc-router';
import TodoForm from '@/components/todo-form';
import ListTodo from '@/components/list-todo';

export default async function Home() {
  const helpers = createSSRHelper();
  await helpers.getTodoList.prefetch({ limit: 10, page: 1 });

  return (
    <Hydrate state={dehydrate(helpers.queryClient)}>
      <main style={{ maxWidth: 1200, marginInline: 'auto', padding: 20 }}>
        <div className='w-full flex justify-center mb-8'>
          <TodoForm />
        </div>
        <ListTodo />
      </main>
    </Hydrate>
  );
}
