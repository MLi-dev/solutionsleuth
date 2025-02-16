<template>
  <div class="mt-4 border rounded shadow-md p-6 bg-white">
    <h3 class="text-lg font-semibold mb-4">
      Here is a solution for "{{ problemDescription }}"
    </h3>
    <table class="table-auto w-full border-collapse">
      <tbody v-if="matchSolution.value">
        <tr
          v-for="[key, value] in Object.entries(matchSolution.value)"
          :key="key"
          class="odd:bg-gray-100 even:bg-white"
        >
          <td class="border px-4 py-2 font-medium text-gray-700">{{ key }}</td>
          <td class="border px-4 py-2 text-gray-600">{{ value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    problemDescription: {
      type: String,
      required: true,
    },
    matchSolution: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Add any additional styling here if needed */
</style>