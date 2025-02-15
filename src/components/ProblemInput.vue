<script setup>
import { ref, reactive, onMounted } from "vue";
import followUpData from "../data/followUpQuestions.json";
import solutionResponse from "../data/solutions.json";
import ProblemForm from "./ProblemForm.vue";
import FollowUpQuestions from "./FollowUpQuestions.vue";
import AnsweredQuestions from "./AnsweredQuestions.vue";
import GiveSolutions from "./GiveSolutions.vue";

const problemDescription = ref("");
const questions = reactive([]);
const answeredQuestions = reactive([]);
const allQuestionsAnswered = ref(false);
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
};
const updateAnswer = ({ questionId, answer }) => {
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
    <ProblemForm
      v-model:problemDescription="problemDescription"
      @submitProblem="submitProblem"
    />
  </div>
  <div class="flex">
    <FollowUpQuestions :questions="questions" @updateAnswer="updateAnswer" />
    <AnsweredQuestions
      :answeredQuestions="answeredQuestions"
      @editProblem="editProblem"
    />
  </div>
  <div
    v-if="allQuestionsAnswered === true"
    class="mt-4 border rounded shadow-md p-4"
  >
    <button @click="generateSolution">Give Recommendations</button>
  </div>
  <GiveSolutions
    :problemDescription="problemDescription"
    :matchSolution="matchSolution"
  />
</template>
