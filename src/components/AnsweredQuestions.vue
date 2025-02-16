<template>
  <div
    v-if="answeredQuestions.length"
    class="mt-4 w-full md:w-1/2 border rounded shadow-md p-4"
  >
    <h3 class="text-lg font-semibold mb-4">Answered Questions:</h3>
    <ul>
      <li
        v-for="answer in answeredQuestions"
        :key="answer.id"
        class="mb-4 p-4 border-b last:border-b-0"
      >
        <p class="font-semibold text-gray-700">
          Question: {{ answer.question }}
        </p>
        <p class="text-gray-600">Answer: {{ answer.answer }}</p>
        <button
          @click="editProblem(answer.id)"
          class="mt-2 px-4 py-2 bg-blue-500 text-white rounded shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Edit Answer
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    answeredQuestions: {
      type: Array,
      required: true,
    },
  },
  emits: ["editProblem"],
  methods: {
    editProblem(questionId) {
      this.$emit("editProblem", questionId);
    },
  },
};
</script>

<style scoped>
/* Add any additional styling here if needed */
</style>