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

    <!-- Membuat Form Tambah Kegiatan -->
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
  </main>  
</template>