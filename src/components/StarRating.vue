<template>
  <div class="star-rating">
    <h3 class="text-lg font-semibold mb-2">Rate this solution:</h3>
    <div>
      <span
        v-for="star in 5"
        :key="star"
        @click="rate(star)"
        :class="{
          'text-yellow-500': star <= rating,
          'text-gray-400': star > rating,
        }"
        class="text-2xl cursor-pointer"
        >★</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rating: {
      type: Number,
      default: 0,
    },
  },
  emits: ["updateRating"],
  methods: {
    rate(star) {
      this.$emit("updateRating", star);
    },
  },
};
</script>

<style scoped>
.star-rating {
  display: inline-block;
}
</style>