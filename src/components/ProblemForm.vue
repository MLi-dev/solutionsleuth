<template>
  <div class="p-4 bg-white shadow-md rounded-md">
    <h2 class="text-lg font-semibold mb-4">How can I help?</h2>
    <input
      :value="problemDescription"
      @input="$emit('update:problemDescription', $event.target.value)"
      type="text"
      class="border border-gray-300 p-2 w-full mt-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      placeholder="Enter your problem..."
    />
    <button
      @click="submitProblem"
      class="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      Submit
    </button>
  </div>
</template>

<script>
export default {
  props: {
    problemDescription: {
      type: String,
      required: true,
    },
  },
  emits: ["update:problemDescription", "submitProblem"],
  methods: {
    submitProblem() {
      this.$emit("submitProblem");
    },
  },
};
</script>

<style scoped>
/* Add any additional styling here if needed */
</style>