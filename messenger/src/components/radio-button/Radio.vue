<template>
  <label class="radio"

         :style="{ 'margin-top': top + 'px' }"
         :for="name">
    <input 
          class="radio__input"
          type="radio"
          ref="radio"

          
          :id="name"
          :name="groupName"
          :disabled="disabled"
          :checked="checked"
          
          @change="change">
    <div class="radio__box"></div>

    <slot></slot>
  </label>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: null
    },
    groupName: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    top: {
      type: Number,
      default: 0
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    change(e) {
      this.$emit('changeState', e.target.checked);
    }
  }
}
</script>

<style lang="scss">
  .radio {
    display: inline-flex;
    align-items: flex-start;
    
    color: #4D4D4D;

    &__box {
      width: 14px;
      height: 14px;

      min-width: 14px;
      

      border-radius: 14px;
      border: 1px solid #C6C6C6;

      margin-right: 14px;

    }

    &__input {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0 0 0 0);

      &:checked + .radio__box {
        display: flex;
        align-items: center;
        justify-content: center;
      
        background: #FEDD46;
        border-color: #FEDD46;

        &::before {
          content: '';

          width: 6px;
          height: 6px;

          border-radius: 6px;

          background: #333;
        }
      }

      &:hover + .radio__box, &:focus + .radio__box {
        border: 1px solid #333333
      }

      &:disabled + .radio__box {
        display: flex;
        align-items: center;
        justify-content: center;
      
        border-color: transparent;
        background: #E9E9E9;

        &::before {
          content: '';

          width: 6px;
          height: 6px;

          border-radius: 6px;

          background: #ADADAD;
        }
      }
    }
  }
</style>
