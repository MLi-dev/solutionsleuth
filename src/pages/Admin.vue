<template>
  <div class="flex">
    <div class="mr-4">
      <BackgroundColorPick @pickBackgroundColor="pickBackgroundColor" />
    </div>

    <div class="mr-4"><FontColorPick @pickFontColor="pickFontColor" /></div>
    <div class="flex items-center space-x-2 mr-4">
      <label for="fontFamily" class="block text-sm font-medium text-gray-700">
        Font:
      </label>
      <select
        id="fontFamily"
        v-model="selectedFontFamily"
        @change="pickFontFamily($event.target.value)"
        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="font-sans">Sans-serif</option>
        <option value="font-serif">Serif</option>
        <option value="font-mono">Monospace</option>
      </select>
    </div>
    <div class="flex items-center space-x-2 mr-4">
      <label for="logo" class="block text-sm font-medium text-gray-700">
        Logo:
      </label>
      <input
        type="text"
        @change="uploadLogo"
        class="border p-1 mt-1 border-gray-300 rounded cursor-pointer"
      />
    </div>
    <div>
      <button
        @click="applySettings"
        class="ml-4 p-4 py-2 bg-blue-500 text-white rounded shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Apply
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import BackgroundColorPick from "../components/BackgroundColorPick.vue";
import FontColorPick from "../components/FontColorPick.vue";

const selectedBackgroundColor = ref("#000000"); // Default color
const selectedFontFamily = ref("font-sans"); // Default font
const selectedFontColor = ref("#000000"); // Default font
const selectedLogo = ref(
  "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
);

const pickBackgroundColor = (color) => {
  console.log("BG Color", color);
  selectedBackgroundColor.value = color;
};
const pickFontColor = (color) => {
  console.log("Font Color", color);
  selectedFontColor.value = color;
};
const pickFontFamily = (font) => {
  selectedFontFamily.value = font;
};
const uploadLogo = (event) => {
  selectedLogo.value = event.target.value;
  console.log("Logo", event.target.value);
};
const applySettings = () => {
  localStorage.setItem("backgroundColor", selectedBackgroundColor.value);
  localStorage.setItem("fontColor", selectedFontColor.value);
  localStorage.setItem("fontFamily", selectedFontFamily.value);
  localStorage.setItem("logo", selectedLogo.value);
  console.log("Settings applied:", {
    backgroundColor: selectedBackgroundColor.value,
    fontColor: selectedFontColor.value,
    fontFamily: selectedFontFamily.value,
    logo: selectedLogo.value,
  });
};
</script>

<style scoped>
/* Add any additional styling here */
</style>