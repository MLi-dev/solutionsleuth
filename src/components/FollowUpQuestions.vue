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

        <input
          v-else-if="q.type === 'number'"
          type="number"
          class="border p-2 w-full"
          @input="updateAnswer(q.id, $event.target.value)"
        />
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
 
 
 