<template>
  <div id="app">
    <Authorization/>
  </div>
</template>

<script>
import Authorization from './components/Authorization.vue';
import Chat from './components/Chat.vue'

export default {
  name: 'app',
  components: {
    Authorization,
    Chat
  }
}
</script>

<style>

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ul, ol, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video, button {
    margin: 0;
    padding: 0;
    border: 0;
    font-family: Arial, Helvetica, sans-serif;
    vertical-align: baseline;
}

body{

  background: #e5e5e5;

  display: flex;
  justify-content: center;
  align-items: center;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #e5e5e5;
  width: 100%;
}
</style>
