<template>
  <div class="flex items-center space-x-2">
    <label for="colorPicker" class="block text-sm font-medium text-gray-700"
      >Background Color:</label
    >
    <input
      type="color"
      v-model="selectedBackgroundColor"
      @change="pickBackgroundColor"
      class="w-10 h-10 border border-gray-300 rounded cursor-pointer"
    />

    <!-- RGB Text Display -->
    <span class="text-gray-700 text-sm font-medium">
      {{ rgbValue }}
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedBackgroundColor: "#0073ff", // Default color
    };
  },
  computed: {
    rgbValue() {
      // Convert HEX to RGB
      const hex = this.selectedBackgroundColor.replace("#", "");
      const bigint = parseInt(hex, 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `rgb(${r}, ${g}, ${b})`;
    },
  },
  emits: ["pickBackgroundColor"],
  methods: {
    pickBackgroundColor() {
      this.$emit("pickBackgroundColor", this.selectedBackgroundColor);
    },
  },
};
</script>

<style scoped>
/* Hide default color picker UI in some browsers */
input[type="color"] {
  appearance: none;
  -webkit-appearance: none;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
}
</style>
