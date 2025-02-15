<template>
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