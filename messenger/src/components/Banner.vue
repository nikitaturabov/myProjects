<template>
  <div class="banner">
    <button class="banner__link" @click="openHint">
      <svg class="banner__icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM6.8 10.4249L10.7 8.17321C10.8333 8.09623 10.8333 7.90378 10.7 7.8268L6.8 5.57513C6.66667 5.49815 6.5 5.59437 6.5 5.74833V10.2517C6.5 10.4056 6.66667 10.5019 6.8 10.4249Z" fill="black"/>
      </svg>
      Новое в ленте сообщений
    </button>
    <a href="feed://welcome/close" class="banner__link banner__link--absolute" @click="closeBanner">
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.29289 0.292893C6.68342 -0.0976311 7.31658 -0.0976311 7.70711 0.292893C8.09763 0.683418 8.09763 1.31658 7.70711 1.70711L5.41421 4L7.70711 6.29289C8.09763 6.68342 8.09763 7.31658 7.70711 7.70711C7.31658 8.09763 6.68342 8.09763 6.29289 7.70711L4 5.41421L1.70711 7.70711C1.31658 8.09763 0.683418 8.09763 0.292893 7.70711C-0.0976311 7.31658 -0.0976311 6.68342 0.292893 6.29289L2.58579 4L0.292894 1.70711C-0.0976307 1.31658 -0.0976307 0.683418 0.292894 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L4 2.58579L6.29289 0.292893Z" fill="#000"/>
      </svg>

    </a>
  </div>
</template>

<script>
export default {
  methods: {
    openHint(e) {
      this.$emit('openHint');
    },
    closeBanner(e) {
      this.$emit('closeBanner');
    }
  }
}
</script>


<style lang="scss">
  .banner {
    width: 280px;

    background: #FEDD46;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
    border-radius: 10px;

    box-sizing: border-box;

    &__icon {
      margin-right: 17px;
    }

    &__link {
      display: flex;
      align-items: center;

      height: 36px;
      width: 280px;

      padding-left: 18px;

      font-size: 14px;
      font-weight: bold;

      color: #000;

      background: transparent;

      &--absolute {
        position: absolute;

        width: 18px;
        height: 18px;

        top: 50%;
        right: 8px;

        transform: translateY(-50%);
      }

      &:focus {
        outline: none;
      }
    }
  }
</style>

