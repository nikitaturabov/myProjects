<template>
  <div class="welcome">
    <div class="welcome__hint hint">
      <h1 class="hint__title">
        Добро пожаловать в ленту взаимодействий
      </h1>
      <p class="hint__description">
        Мы переработали интерфейс. Предлагаем ознакомиться с новыми функциями и возможностями.
      </p>
      <iframe width="505" height="241" src="https://www.youtube.com/embed/Vl_H2odswQQ?modestbranding=1&rel=0&showinfo=0&controls=2" frameborder="0" allowfullscreen></iframe>
      <!-- <iframe width="505" height="241" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
      <div class="hint__controls">
        <a class="hint__link hint__link--default" href="feed://welcome/telegram">
          Как подключить Telegram?
        </a>
        <a class="hint__link hint__link--yellow" href="feed://welcome/skip" @click="closeHint">
          Пропустить
        </a>
        <a class="hint__link hint__link--gray" href="feed://welcome/close" @click="closeHint">
          Понятно
        </a>
      </div>
      <a class="hint__btn-close" href="feed://welcome/skip" @click="closeHint">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10.2929 0.292893C10.6834 -0.0976311 11.3166 -0.0976311 11.7071 0.292893C12.0976 0.683418 12.0976 1.31658 11.7071 1.70711L7.41421 6L11.7071 10.2929C12.0976 10.6834 12.0976 11.3166 11.7071 11.7071C11.3166 12.0976 10.6834 12.0976 10.2929 11.7071L6 7.41421L1.70711 11.7071C1.31658 12.0976 0.683418 12.0976 0.292893 11.7071C-0.097631 11.3166 -0.097631 10.6834 0.292893 10.2929L4.58579 6L0.292894 1.70711C-0.0976306 1.31658 -0.0976306 0.683418 0.292894 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L6 4.58579L10.2929 0.292893Z" fill="#C4C4C4"/>
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeHint() {
      this.$emit('close');
    }
  }
}
</script>

<style lang="scss">

  .welcome {
    position: absolute;

    top: 0;
    left: 0;

    z-index: 25;
    
    width: 100%;
    height: 100%;

    background: rgba(145, 145, 145, 0.5);
  }

  .hint {
    position: absolute;

    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    padding: 38px 50px 28px 50px;

    z-index: 25;
    
    width: 605px;

    background: #fff;
    
    border-radius: 10px;

    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
    box-sizing: border-box;

    &__btn-close {
      position: absolute;

      top: 19px;
      right: 19px;

      background: transparent;
    }

    &__title {
      
      font-size: 18px;
      font-weight: 700;
      text-align: center;

      color: #3A3A3A;

    }

    &__description {
      margin-top: 17px;
      margin-bottom: 20px;

      font-size: 13px;
      text-align: center;

      color: #959595;
    }

    &__controls {
      display: flex;
      align-items: center;

      margin-top: 15px;
    }

    &__link {
      transition: .2s;

      &--yellow, &--gray {
        display: flex;
        justify-content: center;
        align-items: center;

        height: 30px;

        font-size: 10px;
        font-weight: 700;

        border-radius: 5px;

        text-transform: uppercase;
        text-decoration: none;
      }

      &--yellow {
        width: 100px;

        background: #FEDD46;
        color: #3a3a3a;

        margin-right: 0;
        margin-left: auto;

        &:hover {
          background: #D3B83F;
        }
      }

      &--gray {
        margin-left: 7px;

        width: 82px;

        color: #959595;
        
        &:hover {
          color: #3A3A3A;
        }
      }

      &--default {
        font-weight: 700;
        font-size: 12px;

        text-decoration-line: underline;

        color: #000;
        
        &:hover {
          color: #FF0000;
        }
      }
    }
  }

</style>
