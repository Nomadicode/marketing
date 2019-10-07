<template>
  <footer id="footer">
    <div class="inner">
      <p class="copyright">{{ year }} &copy; Nomadicode LLC</p>
      <!-- <ul class="menu">
        <li><a href="#">Terms<span> of Use</span></a></li>
        <li><a href="#">Privacy<span> Policy</span></a></li>
        <li><a href="#">Legal<span> Information</span></a></li>
      </ul> -->
    </div>
  </footer>
</template>

<script>
export default {
  name: 'MainFooter',
  computed: {
    year () {
      return new Date().getFullYear()
    }
  }
}
</script>
