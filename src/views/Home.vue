<template>
  <div class="home">
    <main-header></main-header>
    <section id="banner">
      <div class="inner">
        <h2>Building software that takes you places</h2>
      </div>
    </section>

    <service-section></service-section>

    <project-section></project-section>

    <contact-section></contact-section>

    <main-footer></main-footer>
  </div>
</template>

<script>
// @ is an alias to /src
import ContactSection from '@/components/layout/ContactSection.vue'
import MainFooter from '@/components/layout/MainFooter.vue'
import MainHeader from '@/components/layout/MainHeader.vue'
import ProjectSection from '@/components/layout/ProjectSection.vue'
import ServiceSection from '@/components/layout/ServiceSection.vue'

export default {
  name: 'home',
  components: {
    ContactSection,

    MainHeader,
    MainFooter,
    ProjectSection,
    ServiceSection
  }
}
</script>
