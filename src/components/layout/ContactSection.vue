<template>
  <section id="contact" class="wrapper split">
    <div class="inner">
      <section>
        <h2>Send us a message</h2>
        <div v-if="error" class="error">An error occured sending your message.</div>
        <div v-if="success" class="success">Thank you for your message. We will contact you shortly.</div>
        <form name="contact" method="post" data-netlify="true">
          <div class="row gtr-uniform">
            <div class="col-6 col-12-large col-6-medium col-12-xsmall">
              <label for="name">Name</label>
              <input type="text" name="name" id="name" v-model="name" />
            </div>
            <div class="col-6 col-12-large col-6-medium col-12-xsmall">
              <label for="email">Email</label>
              <input type="email" name="email" id="email" v-model="email" />
            </div>
            <div class="col-12">
              <label for="message">Message</label>
              <textarea name="message" id="message" rows="5" resize="none" v-model="message"></textarea>
            </div>
            <div class="col-12">
              <ul class="actions">
                <li><input type="submit" value="Send Message" @click.prevent="sendMessage" class="primary" /></li>
                <li><input type="reset" value="Reset" /></li>
              </ul>
            </div>
          </div>
        </form>
      </section>
      <section>
        <h2>Other ways to reach us</h2>
        <ul class="bulleted-icons">
          <li>
            <span class="icon-wrapper"><span class="icon fa-envelope"></span></span>
            <h3>Email</h3>
            <p><a href="mailto:contact@nomadicode.com">contact@nomadicode.com</a></p>
          </li>
          <li>
            <span class="icon-wrapper"><span class="icon fa-twitter"></span></span>
            <h3>Twitter</h3>
            <p><a href="#">twitter.com/nomadicode</a></p>
          </li>
          <li>
            <span class="icon-wrapper"><span class="icon fa-phone"></span></span>
            <h3>Phone</h3>
            <p>(435) 915-1059</p>
          </li>
          <li>
            <span class="icon-wrapper"><span class="icon fa-facebook"></span></span>
            <h3>Facebook</h3>
            <p><a href="https://www.facebook.com/Nomadicode-359440314835747">facebook.com/nomadicode</a></p>
          </li>
          <li>
            <span class="icon-wrapper"><span class="icon fa-linkedin"></span></span>
            <h3>LinkedIn</h3>
            <p><a href="https://linkedin.com/company/nomadicode">linkedin.com/nomadicode</a></p>
          </li>
        </ul>
      </section>
    </div>
  </section>
</template>

<script>
import { db } from '@/services/firebase'

export default {
  name: 'ContactSection',
  firebase: {
    messages: {
      source: db.ref('messages'),
      cancelCallback (err) {
        console.error(err)
      }
    }
  },
  data () {
    return {
      error: false,
      success: false,
      name: '',
      email: '',
      message: ''
    }
  },
  methods: {
    sendMessage () {
      if (this.name && this.email && this.message) {
        this.$firebaseRefs.messages.push({
          name: this.name,
          email: this.email,
          message: this.message
        })
        this.error = false
        this.success = true
        this.name = ''
        this.email = ''
        this.message = ''
      } else {
        this.error = true
        this.success = false
      }
    }
  }
}
</script>
