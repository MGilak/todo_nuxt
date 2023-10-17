const useTodos = () => {
  // It needs to be refreshed separately:
  // const { data: todos } = useFetch("/api/todo");

  // It does not need to be refreshed separately, using the refresh method: 
  const { data: todos, refresh } = useAsyncData("todos", () => {
    return $fetch("/api/todo");
  });

  const addTodo = async (item) => {
    if (!item) return;

    await $fetch("/api/todo", { method: "post", body: { item } });

    refresh();
  };

  const updateTodo = async (id) => {
    await $fetch(`/api/todo/${id}`, {
      method: "put",
    });

    refresh();
  };

  const deleteTodo = async (id) => {
    await $fetch(`/api/todo/${id}`, {
      method: "delete",
    });

    refresh();
  };

  return { todos, addTodo, updateTodo, deleteTodo };
};

export default useTodos;
