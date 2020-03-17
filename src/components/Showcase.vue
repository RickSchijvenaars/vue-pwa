<template>
  <div class="showcase">
    <div class="showcase-top">
      <span v-if="offline">
        You are offline. Tags are not available.
      </span>
      <div v-else class="tags">
        <h2 class="tags-title">
          Filter:
        </h2>
        <div 
          v-for="(tag, index) in tags" 
          :key="index" 
          class="tag"
        >
          {{ tag }}
        </div>
      </div>
    </div>
    <div class="projects" uk-grid>
      <div v-for="(project, index) in projects" :key="index" class="project-container uk-width-1-2@s uk-width-1-3@m  uk-width-1-4@l">
        <Project :project="project"/>
      </div>
    </div>
  </div>
</template>

<script>
import localforage from 'localforage';
import Project from './Project';

export default {
  components: {
    Project
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
        .then(data => { // if connection
          this.projects = data.projects
          localforage.setItem('projects', data.projects)
        })
        .catch(error => { // if no connection
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
    },
  }
}

</script>
<style lang="scss" scoped>
.showcase {
  padding: 0 10px;

  &-top {
    min-height: 60px;
  }
}

.tags {
  &-title {
    margin-bottom: 6px;
    font-size: 20px;
  }
}

.project {
  &-container {
    margin-top: 60px;
  }
}
</style>
