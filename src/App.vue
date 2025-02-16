<script setup>
import { ref, onMounted } from "vue";
import ChatWidget from "./pages/Chat.vue";
import AdminWidget from "./pages/Admin.vue";

const props = defineProps({
  role: {
    type: String,
    required: true,
  },
});

const backgroundColor = ref("");
const fontColor = ref("");
const fontFamily = ref("");
const logo = ref("");

onMounted(() => {
  backgroundColor.value = localStorage.getItem("backgroundColor") || "#ffffff"; // Default to white if not set
  fontColor.value = localStorage.getItem("fontColor") || "#000000"; // Default to black if not set
  fontFamily.value = localStorage.getItem("fontFamily") || "font-sans"; // Default to sans-serif if not set
  logo.value =
    localStorage.getItem("logo") ||
    "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"; // Default to Google logo if not set
  console.log("Role:", props.role);
});
</script>

<template>
  <div
    :class="[fontFamily]"
    :style="{ backgroundColor: backgroundColor, color: fontColor }"
  >
    <AdminWidget v-if="props.role === 'admin'" />
    <ChatWidget v-else :logo="logo" />
  </div>
</template>