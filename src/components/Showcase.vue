<template>
  <div class="showcase">
    <div class="showcase-top">
      <span v-if="offline">
        You are offline.
      </span>
      <div v-else class="showcase-tags">
        <h2 class="showcase-tags-title">
          Filter:
        </h2>
        <div 
          v-for="(tag, index) in tags" 
          :key="index" 
          class="showcase-tag"
        >
          {{ tag }}
        </div>
      </div>
    </div>
    <div class="projects">
      <div v-for="(project, index) in projects" :key="index" class="project">
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
    }
  }
}

</script>

<style lang="scss" scoped>
.showcase {
  padding: 0 10px;

  &-top {
    min-height: 60px;
  }

  &-tag {
    display: inline-block;
    margin: 2px;
    padding: 4px 10px;
    color: white;
    background-color: #CC0133;
    border-radius: 22px;

    &s {
      &-title {
        margin-bottom: 6px;
        font-size: 20px;
      }
    }
  }
}
</style>
