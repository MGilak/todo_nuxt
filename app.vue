<template>
  <div class="container">
    <UCard class="cards">
      <h1>My Todos</h1>
      <div class="add_todo">
        <UInput
          class="input"
          type="text"
          placeholder="Add a new todo..."
          v-model="input"
        />
        <UButton @click="handleClick">Add</UButton>
      </div>

      <UCard
        class="card_container"
        v-for="todo in todos"
        :key="todo.id"
        @click="() => updateTodo(todo.id)"
      >
        <div class="card">
          <h4 :class="todo.completed ? 'completed' : null">
            {{ todo.item }}
          </h4>
          <p class="delete" @click="() => deleteTodo(todo.id)">x</p>
        </div>
      </UCard>
    </UCard>
  </div>
</template>

<script setup>
const input = ref("");
const { todos, addTodo, updateTodo, deleteTodo } = useTodos();

const handleClick = () => {
  addTodo(input.value);
  input.value = "";
};
</script>

<style scoped>
.container {
  padding: 2rem;
  margin: 0 auto;
  max-width: 50%;
}
.cards {
  padding: 2rem;
}
.cards h1 {
  font-weight: bold;
  font-size: 17px;
  padding-left: 2px;
}
.add_todo {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.add_todo .input {
  width: 35%;
}
.card_container {
  padding: 0 !important;
  margin: 15px 0;
}
.card {
  display: flex !important;
  justify-content: space-between;
}
.completed {
  text-decoration: line-through;
}

.delete {
  font-weight: bold;
  color: rgb(238, 55, 55);
  font-size: 20px;
  cursor: pointer;
}
</style>
