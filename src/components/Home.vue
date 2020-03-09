<template>
  <div>
    <h1>Home</h1>
    <div class="tags">
      <span v-if="offline">You are offline.</span>
      <div v-else v-for="(tag, index) in tags" :key="index" class="tag">
        <div class="title"><h3>{{ tag }}</h3></div>
      </div>
    </div>
    <div class="projects">
      <div v-for="(project, index) in projects" :key="index" class="project">
        
      </div>
    </div>
  </div>
</template>

<script>
import localforage from 'localforage';

export default {
  components: {
  },

  data() {
    return {
      projects: [],
      tags: [],
      offline: false
    }
  },

  mounted() {
    this.getProjects()
    this.getTags()
  },
  methods: {
    getProjects() {
      fetch('https://cmgt.hr.nl:8000/api/projects/')
      .then(response => response.json())
      .then(data => {
        this.projects = data.projects
        localforage.setItem('projects', data.projects)
      })
      .catch(error => {
        localforage.getItem('projects')
        .then(value => {
          this.projects = value
        })
      })
    },

    getTags() {
      fetch('https://cmgt.hr.nl:8000/api/projects/tags/')
      .then(response => response.json())
      .then(data => {
        this.tags = data.tags
      })
      .catch(error => {
        this.offline = true
      })
    }
  }
}

</script>

<style scoped>

h1 {
  color: blue
}
</style>
