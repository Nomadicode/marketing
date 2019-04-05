<template>
  <div class="home">
    <main-header></main-header>
    <section id="banner">
      <div class="inner">
        <h2>Software development for early startups</h2>
      </div>
    </section>

    <section id="one" class="wrapper major-pad">
      <div class="inner">
        <section class="spotlight">
          <div class="content">
            <h2>Software Development and Technical Consulting</h2>
            <p>
              Nomadicode provides services to help early startups create and manage their web presence. We offer reasonable rates and deferment plans
              so you can get a custom website on a budget.
            </p>
            <p>Let us be your technical co-founder!</p>
          </div>
          <span class="image"><img src="http://nomadicode.imgix.net/spotlight.jpg?fit=clamp&h=400&auto=format" alt="" /></span>
        </section>
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
