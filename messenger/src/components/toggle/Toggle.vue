<template>
  <div class="slider">
    <input @click="handleInput" v-model="isChecked" type="checkbox" id="slider__check" class="slider__check">
    <label for="slider__check" class="slider__label" :class="{ 'slider__label--checked': isChecked }"></label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isChecked: false
    }
  },
  methods: {
    handleInput() {
      this.$nextTick(() => {
        this.$emit('setValue', this.isChecked);
      })
    }
  }
}
</script>

<style lang="scss">
.slider {
  display: flex;
  align-items: center;
  
  width: 141px;

  margin-left: 10px;
  
  &__check {
    display: none;
    
    &:checked + .slider__label {
      background: #6A8534;
    }    
    
    &:checked + .slider__label::after {
      left: 12px;
    }
  }
  
  
  &__label {
    position: relative;
    
    width: 25px;
    height: 14px;
    
    background: #CACACA;
    border-radius: 11px;
    transition: .2s;

    &--checked {
      &::before {
        color: #6A8534 !important;
      }
    }
    
    &::after {
      content: '';
      
      position: absolute;
      top: 1px;
      left: 1px;
      
      width: 12px;
      height: 12px;
      border-radius: 10px;
      
      background: #fff;
      transition: .2s;
    }

    &::before {
      content: 'На согласование';

      position: absolute;
      bottom: -1px;
      left: 100%;

      margin-left: 5px;
    
      font-size: 14px;
      color: #4D4D4D;
      
      transition: .2s;

      white-space: nowrap;
    }
  }
}
</style>
