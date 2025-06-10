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
</script>
