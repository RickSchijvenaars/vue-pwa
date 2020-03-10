<template>
  <div>
    <div class="header">
      <h1 class="header-title">CMGT Showcase</h1>
    </div>
    <ul>
      <li v-for="(link, index) in links" :key="index" class="uk-list">
        <router-link :to="link.to">{{ link.name }}</router-link>
      </li>
    </ul>
    <main>
      <!-- component based on route -->
      <router-view/>
    </main>
  </div>
</template>

<script>
export default {
  data: () => ({
    links: [
      {
        name: 'Showcase',
        to: '/'
      },
      {
        name: 'Page 1',
        to: '/page-1'
      },
      {
        name: 'Bad Link',
        to: '/random-bad-url'
      }
    ]
  })
}
</script>

<style lang="scss">
.header {
  &-title {
    padding: 20px 10px;
    color: white;
    background-color: #CC0133;
  }
}
</style>