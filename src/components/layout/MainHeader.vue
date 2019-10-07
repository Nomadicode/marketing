<template>
  <header id="header" class="alt">
    <a href="/"><img class="logo" :src="Logo" /></a>
    <nav id="nav">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#portfolio">Portfolio</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import Logo from '@/assets/images/logo.png'

export default {
  name: 'MainHeader',
  data () {
    return {
      Logo: Logo
    }
  }
}
</script>
