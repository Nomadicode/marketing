<template>
  <section id="portfolio" class="wrapper style2">
    <div class="inner">
      <h2>Portfolio</h2>
      <div class="posts">
        <section v-for="project in projects" :key="project.id" class="post">
          <span class="image"><img :src="project.image" alt="" /></span>
          <div class="content">
            <h3>{{ project.name }} <span v-if="!project.completed" class="dev-mode">In Development</span></h3>
            <p>{{ project.details }}</p>
            <ul class="actions">
              <li><a :href="project.link" class="button">Visit Site</a></li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import { db } from '@/services/firebase'

export default {
  name: 'ProjectSection',
  firebase: {
    projects: {
      source: db.ref('projects'),
      cancelCallback (err) {
        console.error(err)
      }
    }
  },
  data () {
    return {
      projects: {}
    }
  }
}
</script>
