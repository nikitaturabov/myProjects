<template>
  <div class="authorization">
    <form class="authorization__login" @submit.prevent="login">
      <h1>Вход</h1>
      <div  class="authorization__item">
      <label>Login</label>
      <input required v-model="username" class="authorization__input" type="text" placeholder="login"/>
      </div>
      <div class="authorization__item"> 
      <label>Password</label>
      <input required v-model="password" class="authorization__input" type="password" placeholder="password"/>
      </div>
      <hr/>
      <button class="authorization__btn btn btn--authorization" type="submit">Log In</button>
    </form>
  </div>
</template>

<script>

//import axios from 'axios';

export default {
  
  name: 'Authorization',
  methods: {
    login: function (){
      const { username, password } = this;

      this.$store.dispatch('AUTH_REQUEST', { username, password }).then(() => {
        this.$router.push('/')
      })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.authorization{

  &__login{

  }

  &__item{

    display: flex;
    justify-content: space-between;

    align-items: center;

    padding: 10px 5px;
  }

  &__input{

    padding: 15px 25px;

    margin-left: 10px;
    border: none;

    font-size: 17px;
  }
}

.btn{

  &--authorization{

    background: linear-gradient(131.47deg, #FEE25F 29.93%, #FFC528 120.72%);
    border: none;

    padding: 20px 40px;
    font-weight: bold;
  }
}
</style>
