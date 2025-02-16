<template>
  <div v-if="questions.length" class="mt-4 w-1/2 border rounded shadow-md mr-4">
    <h3 class="text-md font-semibold">Follow-up Questions:</h3>
    <ul>
      <li
        v-for="q in questions"
        :key="q.id"
        :class="{
          hidden: q.hidden,
        }"
        class="mt-2 p-2 border-b"
      >
        <p class="font-semibold">{{ q.question }}</p>

        <div v-if="q.type === 'text'">
          <button
            v-for="option in q.options"
            :key="option"
            @click="updateAnswer(q.id, option)"
            :class="{
              'bg-green-200': option === q.answer,
              'bg-gray-200': option !== q.answer,
            }"
            class="px-4 py-2 m-1 rounded cursor-pointer"
          >
            {{ option }}
          </button>
        </div>

        <input
          v-else-if="q.type === 'text-box'"
          type="text"
          class="border p-2 w-full"
          @input="updateAnswer(q.id, $event.target.value)"
        />

        <div v-else-if="q.type === 'image-multi'" class="flex space-x-2">
          <img
            v-for="option in q.options"
            :key="option"
            :src="option"
            @click="updateAnswer(q.id, option)"
            :class="{
              'border-4 border-green-500': q.answer.includes(option),
              'border-2 border-gray-300': !q.answer.includes(option),
            }"
            class="w-16 h-16 cursor-pointer"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    questions: {
      type: Array,
      required: true,
    },
  },
  emits: ["updateAnswer"],
  methods: {
    updateAnswer(questionId, answer) {
      this.$emit("updateAnswer", { questionId, answer });
    },
  },
};
</script>