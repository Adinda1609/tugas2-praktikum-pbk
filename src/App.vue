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
</script>

