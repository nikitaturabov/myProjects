<template>
  <label class="box">
    <button
            class="box__input"
            :class="{ 'box__input--checked': isChecked, 'box__input--fill': isFill }"
            @click="handleClick">
    </button>
    {{ text }}
  </label>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    isFill: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      isChecked: false
    }
  },
  watch: {
    value: function() {
      if (this.value) {
        this.isChecked = true;
      } else {
        this.isChecked = false;
      }
    }
  },
  methods: {
    handleClick(e) {
      this.isChecked = !this.isChecked;
      this.$emit('input', this.isChecked)
    }
  },
}
</script>

<style lang="scss">

.box {
  display: inline-flex;
  align-items: center;

  font-family: Arial, Helvetica;
  font-size: 13px;
  color: #797979;

  &:hover {
    button {
      border-color: #333;
    }

    color: #333;
  }


  &__input {
    width: 20px;
    height: 20px;

    margin-right: 7px;

    border-radius: 5px;
    border: 1px solid #C6C6C6;

    background: #fff;

    &--checked {
      border-color: #FEDD46;

      background: url("data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='18' height='18' fill='%23FEDD46'/%3E%3Cpath d='M7.29282 12.875L14.2497 6.32174L12.8285 5L7.2572 10.2257L4.4212 7.58813L3 8.90989L7.29282 12.875Z' fill='%23333333'/%3E%3C/svg%3E%0A") no-repeat center center;
    }
    
    &--fill {
      border-color: #FEDD46;

      background: url("data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='18' height='18' fill='%23FEDD46'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M4 9C4 8.44772 4.44772 8 5 8H13C13.5523 8 14 8.44772 14 9C14 9.55228 13.5523 10 13 10H5C4.44772 10 4 9.55228 4 9Z' fill='%23333333'/%3E%3C/svg%3E%0A") no-repeat center center !important;
    }
  
    &:focus {
      outline: none;
    }
  }
}
</style>
