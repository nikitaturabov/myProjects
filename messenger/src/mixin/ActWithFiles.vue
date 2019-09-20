<template>
  
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
  .act {
    &__files {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      list-style: none;

      &--out {
        align-items: flex-end;

        .act__file {
          color: #779733;
          background: #DAF2A9;

          .icon {
            background: #779733;
          }
        }
      }

      &--in {
        align-items: flex-start;
      }
    }

    &__file {
      display: flex;
      align-items: center;

      height: 34px;

      margin-top: 5px;
      padding-left: 11px;

      font-size: 13px;
      color: #7E7E7E;
      text-decoration: none;
      
      transition: .2s;

      background: #F0F0F0;

      border-radius: 10px;

      .icon {
        display: flex;
        justify-content: center;
        align-items: center;

        align-self: stretch;

        margin-left: 14px;

        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;

        min-width: 35px;

        background: #B1B1B1;
      }

      &:hover {
        opacity: .8;
      }
    }
  }
</style>

