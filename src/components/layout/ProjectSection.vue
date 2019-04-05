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
export default {
  name: 'ProjectSection',
  data () {
    return {
      projects: [
        {
          id: 1,
          name: 'Driftr',
          completed: false,
          details: 'Driftr is an activity finding app to aide locals and travelers in finding events near them personalized to their preferences.',
          image: null,
          link: 'https://getdriftr.com'
        }, {
          id: 2,
          name: 'Hypnosisters',
          completed: false,
          details: 'Hypnosisters provides hypnotherapy services to aide in stress relief, overcoming challenges, and much more.',
          image: null,
          link: 'https://hypnosisters.nomadicode.com'
        }, {
          id: 3,
          name: 'ChronoKids',
          completed: false,
          details: 'ChronoKids is a task management and time tracking app for parents to reward their children with screen time for accomplishing tasks.',
          image: null,
          link: 'https://chronokids.nomadicode.com'
        }, {
          id: 4,
          name: 'Middlewood Games',
          completed: true,
          details: 'Middlewood Games is a tabletop RPG accessory company. They make a variety of accessories to enhance the tabletop RPG experience.',
          image: null,
          link: 'https://middlewoodgames.com'
        }
      ]
    }
  }
}
</script>
