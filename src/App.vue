<script setup>
import { ref, onMounted, computed, watch } from 'vue';

// STEP 1: Menambahkan dan Melihat Kegiatan
const todos = ref([]);
const name = ref('');

const input_content = ref('');
const input_category = ref(null);
const showUndoneOnly = ref(false);

const notification = ref('');

const showNotification = (message) => {
  notification.value =  message;
  setTimeout(() => {
    notification.value = '';
  }, 2000);
};

// STEP 6: Menampilkan Kegiatan yang Belum Selesai
const todos_asc = computed(() => {
  let filtered = todos.value;
  if (showUndoneOnly.value) {
    filtered = filtered.filter ((t) => !t.done);
  }
  return filtered.sort((a,b) => a.createdAt - b.createdAt);
});

// STEP 5: Menyimpan Nama dan Kegiatan ke Local Storage
watch(name, (newVal) => {
  localStorage.setItem('name', newVal);
});

watch(todos, (newVal) => {
  localStorage.setItem('todos', JSON.stringify(newVal));
}, { deep: true });

// STEP 2: Menambahkan Kegiatan
const addTodo = () => {
  if (input_content.value.trim() === '' || input_category.value === null) {
     showNotification('⚠️ Harap isi semua data!');
     return;
  }

  todos.value.push({
    content: input_content.value,
    category: input_category.value,
    done: false,
    editable: false,
    createdAt: new Date().getTime()
  });

  showNotification('✅ Kegiatan berhasil ditambahkan!');
  input_content.value = '';
  input_category.value = null;
};

// STEP 3: Menghapus Kegiatan
const removeTodo = (todo) => {
  todos.value = todos.value.filter((t) => t !== todo);
  showNotification('Kegiatan berhasil dihapus!');
};

// STEP 4: Memuat Data Nama dan Kegiatan dari Local Storage
onMounted(() => {
  name.value = localStorage.getItem('name') || '';
  todos.value = JSON.parse(localStorage.getItem('todos')) || [];
});
</script>

<template>
  <main class="app">
    <!-- Menampilkan Nama User -->
    <section class="greeting">
      <h2 class="title">Hallo Sri Adinda!🚀</h2>
    </section>

    <!-- Membuat Form Tambah Kegiatan(FORM BINDINGS) -->
    <section class="create-todo">
      <form @submit.prevent="addTodo">
        <h4>Kegiatan apa yang ingin dilakukan?</h4>
        <input type="text" placeholder="cth. editing" v-model="input_content" />

        <h4>Pilih Kategori</h4>
        <div class="options">
          <label>
            <input type="radio" name="category" value="bisnis" v-model="input_category" />
            <span class="bubble bisnis"></span>
            <div>Bisnis</div>
          </label>
          <label>
            <input type="radio" name="category" value="personal" v-model="input_category" />
            <span class="bubble personal"></span>
            <div>Personal</div>
          </label>
        </div>

        <input type="submit" value="Tambahkan Kegiatan" />
      </form>
    </section>

    <!--Menampilkan Kegiatan -->
    <section class="todo-list">
      <h3>List kegiatan kamu ada disini🌷🌷</h3>

      <div class="list-container">
        <!-- Kegiatan yang sudah dilakukan -->
        <div class="todo-column">
          <h4>Kegiatan yang sudah dilakukan</h4>
          <div class="list">
            <div v-for="todo in todos_asc.filter(t => t.done)" :key="todo.createdAt" :class="`todo-item ${todo.done && 'done'}`">
              <label>
                <!-- MEMAKAI FORM BINDINGS -->
                <input type="checkbox" v-model="todo.done" />
                <span :class="`bubble ${ todo.category == 'bisnis' ? 'bisnis' : 'personal'}`"></span>
              </label>
                <!-- MEMAKAI FORM BINDINGS -->
              <div class="todo-content">
                <input type="text" v-model="todo.content" />
              </div>
              <div class="actions">
                <!-- MEMAKAI EVENT LISTENER -->
                <button class="delete" @click="removeTodo(todo)"> 
                  <font-awesome-icon :icon="['fas', 'trash']" />                
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Kegiatan yang belum dilakukan -->
        <div class="todo-column">
          <h4>Kegiatan yang belum dilakukan</h4>
          <div class="list">
            <div v-for="todo in todos_asc.filter(t => !t.done)" :key="todo.createdAt" :class="`todo-item ${todo.done && 'done'}`">
              <label>
                <!-- MEMAKAI FORM BINDINGS -->
                <input type="checkbox" v-model="todo.done" />
                <span :class="`bubble ${ todo.category == 'bisnis' ? 'bisnis' : 'personal'}`"></span>
              </label>
                <!-- MEMAKAI FORM BINDINGS -->
              <div class="todo-content">
                <input type="text" v-model="todo.content" />
              </div>
              <div class="actions">
                <!-- MEMAKAI EVENT LISTENER -->
                <button class="delete" @click="removeTodo(todo)">
                  <font-awesome-icon :icon="['fas', 'trash']" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> 

    <!-- Notifikasi (CONDITIONAL RENDERING) -->
    <div v-if="notification" class="notification">
      {{ notification }}
    </div>
  </main>  
</template>

<style scoped>
@import './style.css';

/* Notifikasi */
.notification {
  position: fixed;
  top: 1rem;
  right: 1rem;
  background-color: #f095ca;
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  z-index: 999;
  font-weight: bold;
  transition: opacity 0.3s ease;
}

/* Tombol Hapus */
.actions button i {
  font-size: 1rem;
  pointer-events: none;
}
</style>
