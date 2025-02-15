<template>
  <div
    v-if="answeredQuestions.length"
    class="mt-4 w-1/2 border rounded shadow-md"
  >
    <h3 class="text-md font-semibold">Answered Questions:</h3>
    <ul>
      <li
        v-for="answer in answeredQuestions"
        :key="answer.id"
        class="mt-2 p-2 border-b"
      >
        <p class="font-semibold">Question: {{ answer.question }}</p>
        <p>Answer: {{ answer.answer }}</p>
        <button @click="editProblem(answer.id)">Edit Answer</button>
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


