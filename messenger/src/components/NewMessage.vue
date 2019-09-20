
<template>
  <div class="message">
    <div class="message__new">
      Непрочитанные сообщения
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
  .message {    
    position: relative;

    height: 2px;

    margin-top: 50px;
    margin-bottom: 50px;
  
    background: #ff8f00;

    &__new {
      position: absolute;
      top: 50%;
      left: 50%;

      transform: translate(-50%, -50%);

      padding-right: 10px;
      padding-left: 10px;

      font-size: 12px;
      color: #ff8f00;
      
      background: #ffffff;
    }
  }
</style>

