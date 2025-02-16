<template>
  <div v-if="questions.length" class="mt-4 w-1/2 border rounded shadow-md mr-4">
    <h3 class="text-md font-semibold">Follow-up Questions:</h3>
    <div class="mt-2 p-2 border-b">
      <p class="font-semibold">{{ currentQuestion.question }}</p>

      <div v-if="currentQuestion.type === 'text'">
        <button
          v-for="option in currentQuestion.options"
          :key="option"
          @click="updateAnswer(currentQuestion.id, option)"
          :class="{
            'bg-green-200': option === currentQuestion.answer,
            'bg-gray-200': option !== currentQuestion.answer,
          }"
          class="px-4 py-2 m-1 rounded cursor-pointer"
        >
          {{ option }}
        </button>
      </div>

      <input
        v-else-if="currentQuestion.type === 'text-box'"
        type="text"
        class="border p-2 w-full"
        @input="updateAnswer(currentQuestion.id, $event.target.value)"
      />

      <input
        v-else-if="currentQuestion.type === 'number'"
        type="number"
        class="border p-2 w-full"
        @input="updateAnswer(currentQuestion.id, $event.target.value)"
      />
    </div>

    <div class="flex justify-between mt-4">
      <button
        @click="prevQuestion"
        :disabled="currentIndex === 0"
        :class="{
          'bg-blue-500 text-white': currentIndex !== 0,
          'bg-gray-200': currentIndex === 0,
        }"
        class="px-4 py-2 rounded"
      >
        Previous
      </button>
      <button
        @click="nextQuestion"
        :disabled="
          !currentQuestion.answer || currentIndex === questions.length - 1
        "
        :class="{
          'bg-blue-500 text-white': currentQuestion.answer,
          'bg-gray-200':
            !currentQuestion.answer || currentIndex === questions.length - 1,
        }"
        class="px-4 py-2 rounded"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    questions: {
      type: Array,
      required: true,
    },
    initialIndex: {
      type: Number,
      default: 0,
    },
  },
  emits: ["updateAnswer"],
  data() {
    return {
      currentIndex: this.initialIndex,
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentIndex];
    },
  },
  methods: {
    updateAnswer(questionId, answer) {
      this.$emit("updateAnswer", { questionId, answer });
    },
    prevQuestion() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    nextQuestion() {
      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex++;
      }
    },
  },
  watch: {
    initialIndex(newIndex) {
      this.currentIndex = newIndex;
      console.log("initialIndex changed to:", newIndex);
    },
  },
};
</script>