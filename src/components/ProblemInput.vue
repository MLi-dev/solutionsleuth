<script setup>
import { ref, reactive, onMounted } from "vue";
import followUpData from "../data/followUpQuestions.json";
import solutionResponse from "../data/solutions.json";

const problemDescription = ref("");
const questions = reactive([]);
const answeredQuestions = reactive([]);
const allQuestionsAnswered = ref(false);
const willRecommend = ref(false);
const ansObj = ref({});
const recommendedPosts = reactive([]);
const matchSolution = reactive({});
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
    allQuestionsAnswered.value = false;
  }
};
const generateSolution = () => {
  const criteria = buildCriteriaFromAnswers();
  matchSolution.problem = findMatchingSolution(criteria)?.problem;
  matchSolution.value = findMatchingSolution(criteria)?.solution;
  console.log("Matching solution:", matchSolution.value);
  for (let [key, value] of Object.entries(matchSolution.value)) {
    console.log(`${key}: ${value}`);
  }
  willRecommend.value = true;
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
        answer: answer,
      });
    }
  }
  if (questions.every((q) => q.answer)) {
    allQuestionsAnswered.value = true;
  }
};
// Mapping of question IDs to ansObj keys
const questionKeyMap = {
  1: "job_type",
  2: "industry",
  3: "location",
  4: "experience",
  5: "salary",
};

// Function to build criteria object from answeredQuestions
const buildCriteriaFromAnswers = () => {
  const criteria = {};
  answeredQuestions.forEach((answer) => {
    const key = questionKeyMap[answer.id];
    if (key) {
      criteria[key] = answer.answer;
    }
  });
  return criteria;
};

// Function to find the matching solution based on criteria
const findMatchingSolution = (criteria) => {
  return solutionResponse?.solutions.find((s) => {
    return (
      s.criteria.job_type === criteria.job_type &&
      s.criteria.industry === criteria.industry &&
      s.criteria.location === criteria.location &&
      s.criteria.experience === criteria.experience &&
      s.criteria.salary === criteria.salary
    );
  });
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
  <div
    v-if="allQuestionsAnswered === true"
    class="mt-4 border rounded shadow-md p-4"
  >
    <button @click="generateSolution">Give Recommendations</button>
  </div>
  <div class="mt-4 border rounded shadow-md p-4">
    <h3 class="text-md font-semibold">
      Here is a solution for {{ problemDescription }}
    </h3>
    <table class="table-auto w-full">
      <tbody v-if="matchSolution.value">
        <tr
          v-for="[key, value] in Object.entries(matchSolution.value)"
          :key="key"
        >
          <td class="border px-4 py-2">{{ key }}</td>
          <td class="border px-4 py-2">{{ value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
