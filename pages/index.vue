<template>
  <div class="blog-container">
    <h1>Blog Posts</h1>
    <ul>
      <li v-for="article of articles" :key="article.slug">
        <NuxtLink :to="{ name: 'blog-slug', params: { slug: article.slug } }">
          <img :src="article.img" />
          <div>
            <h2>{{ article.title }}</h2>
            <p>by {{ article.author.name }}</p>
            <p>{{ article.description }}</p>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({ $content, params }) {
    const articles = await $content('articles')
      .only(['title', 'description', 'img', 'slug', 'author'])
      .sortBy('createdAt', 'asc')
      .fetch()

    return {
      articles,
    }
  },
}
</script>

<style lang="scss" scoped>
.blog-container {
  width: 70%;
  max-width: 800px;
  margin: 0 auto;
}
img {
  height: 300px;
  width: 100%;
  object-fit: cover;
  object-position: center;
}
ul {
  padding: 0;
  margin: 0;

  li {
    padding: 0;
    list-style-type: none;
    margin: 0 0 50px 0;
  }
}
</style>
