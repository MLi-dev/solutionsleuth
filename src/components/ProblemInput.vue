<script setup>
import { ref, reactive, onMounted } from "vue";
import followUpData from "../data/followUpQuestions.json";

const problemDescription = ref("");
const questions = reactive([]);
const answeredQuestions = reactive([]);

const submitProblem = () => {
  console.log("Problem submitted:", problemDescription.value);

  // Check if the input matches the problem key in the JSON
  if (
    problemDescription.value.trim().toLowerCase() ===
    followUpData.problem.toLowerCase()
  ) {
    questions.splice(0, questions.length, ...followUpData.questions);
  } else {
    questions.splice(0, questions.length); // Clear questions if no match
  }
};
const editProblem = (questionId) => {
  const questionObj = questions.find((q) => q.id === questionId);
  if (questionObj) {
    questionObj.hidden = false;
  }
};
const updateAnswer = (questionId, answer) => {
  const questionObj = questions.find((q) => q.id === questionId);
  if (questionObj) {
    const existingAnswer = answeredQuestions.find((a) => a.id === questionId);
    questionObj.answer = answer;
    questionObj.hidden = true;
    if (existingAnswer) {
      existingAnswer.answer = answer;
    } else {
      answeredQuestions.push({
        id: questionId,
        question: questionObj.question,
        answer,
      });
    }
  }
};
</script>

<template>
  <div>
    <h2 class="text-lg font-semibold">How can I help?</h2>
    <input
      v-model="problemDescription"
      type="text"
      class="border p-2 w-full mt-2 rounded"
      placeholder="Enter your problem..."
    />
    <button @click="submitProblem">Submit</button>
  </div>
  <div class="flex">
    <div
      v-if="questions.length"
      class="mt-4 w-1/2 border rounded shadow-md mr-4"
    >
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
  </div>
</template>
