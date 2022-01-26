<template>
  <div>
    <p>
      Written by:
      <NuxtLink :to="`/blog/author/${author.name}`">{{ author.name }}</NuxtLink>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    author: {
      type: Object,
      required: true,
    },
  },
}
</script>
