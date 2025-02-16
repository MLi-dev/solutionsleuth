<script setup>
import { ref, reactive, onMounted } from "vue";
import followUpData from "../data/followUpQuestions.json";
import solutionResponse from "../data/solutions.json";
import ProblemForm from "../components/ProblemForm.vue";
import FollowUpQuestions from "../components/FollowUpQuestions.vue";
import AnsweredQuestions from "../components/AnsweredQuestions.vue";
import GiveSolutions from "../components/GiveSolutions.vue";
import StarRating from "../components/StarRating.vue";
import SingleQuestion from "../components/SingleQuestion.vue";

const problemDescription = ref("");
const questions = reactive([]);
const answeredQuestions = reactive([]);
const allQuestionsAnswered = ref(false);
const ansObj = ref({});
const recommendedPosts = reactive([]);
const matchSolution = reactive({});
const rating = ref(0);
const initialIndex = ref(0);
const showSingleQuestion = ref(true);

const props = defineProps({
  logo: {
    type: String,
    required: true,
  },
});

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
  initialIndex.value = questionId;
  console.log("Index value now: ", initialIndex.value);
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
};
const updateAnswer = ({ questionId, answer }) => {
  const questionObj = questions.find((q) => q.id === questionId);
  console.log("Updated questionobject: ", questionObj);
  if (questionObj) {
    const existingAnswer = answeredQuestions.find((a) => a.id === questionId);
    questionObj.answer = answer;
    questionObj.hidden = true;
    if (existingAnswer) {
      existingAnswer.answer = answer;
    } else {
      console.log("Answer: ", answer);
      answeredQuestions.push({
        id: questionId,
        question: questionObj.question,
        answer: answer,
      });
      console.log("Answered Questions: ", answeredQuestions);
    }
  }
  if (questions.every((q) => q.answer)) {
    allQuestionsAnswered.value = true;
  }
};
// Mapping of question IDs to ansObj keys
const questionKeyMap = {
  0: "job_type",
  1: "industry",
  2: "location",
  3: "experience",
  4: "salary",
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
const handleRating = (newRating) => {
  rating.value = newRating;
  console.log("User rating:", newRating);
};
const refreshPage = () => {
  location.reload();
};
</script>

<template>
  <div>
    <img :src="props.logo" alt="Logo" class="w-16 h-16 m-4" />
    <ProblemForm
      v-model:problemDescription="problemDescription"
      @submitProblem="submitProblem"
    />
  </div>
  <div class="flex justify-end mb-4">
    <label for="toggleQuestionsView" class="flex items-center cursor-pointer">
      <div class="relative">
        <input
          id="toggleQuestionsView"
          type="checkbox"
          v-model="showSingleQuestion"
          class="sr-only"
        />
        <div class="block bg-gray-600 w-14 h-8 rounded-full"></div>
        <div
          class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"
        ></div>
      </div>
      <div class="ml-3 text-gray-700 font-medium">Toggle Questions View</div>
    </label>
  </div>
  <div class="flex">
    <FollowUpQuestions
      v-if="!showSingleQuestion"
      :questions="questions"
      @updateAnswer="updateAnswer"
    />
    <SingleQuestion
      v-if="showSingleQuestion"
      :questions="questions"
      :initialIndex="initialIndex"
      @updateAnswer="updateAnswer"
    />
    <AnsweredQuestions
      :answeredQuestions="answeredQuestions"
      @editProblem="editProblem"
    />
  </div>
  <div
    v-if="allQuestionsAnswered === true"
    class="mt-4 border rounded shadow-md p-6 bg-white"
  >
    <button
      @click="generateSolution"
      class="px-4 py-2 bg-blue-500 text-white rounded shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      Give Recommendations
    </button>
  </div>
  <div v-if="matchSolution.value">
    <GiveSolutions
      :problemDescription="problemDescription"
      :matchSolution="matchSolution"
    />
    <StarRating :rating="rating" @updateRating="handleRating" />
    <button
      @click="refreshPage"
      class="px-4 py-2 bg-blue-500 text-white rounded shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      Refresh Page
    </button>
  </div>
</template>

<style scoped>
/* Toggle Slider Styles */
input:checked ~ .dot {
  transform: translateX(100%);
  background-color: #ffffff; /* Change the color of the dot when checked */
}
input:checked ~ .block {
  background-color: #04590e; /* Change the background color when checked */
}
</style>