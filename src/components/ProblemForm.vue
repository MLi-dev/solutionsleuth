<template>
  <div>
    <h2 class="text-lg font-semibold">How can I help?</h2>
    <input
      :value="problemDescription"
      @input="$emit('update:problemDescription', $event.target.value)"
      type="text"
      class="border p-2 w-full mt-2 rounded"
      placeholder="Enter your problem..."
    />
    <button @click="submitProblem">Submit</button>
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