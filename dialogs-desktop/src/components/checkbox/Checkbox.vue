<template>
  <div class="check-wrapper">
    <label class="check" v-if="label">
      <input
              type="checkbox"
              class="check__input"

              v-model="isChecked"

              :disabled="disabled"
              
              @change="handleChecked">
      <div class="check__box"></div>
      {{ label }}
    </label>

    <div v-else class="check">
      <input
              type="checkbox"
              class="check__input"

              v-model="isChecked"

              :disabled="disabled"
              
              @change="handleChecked">
      <div class="check__box"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    check: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: () => null
    }
  },
  mounted() {
    this.isChecked = this.check || this.value;
  },
  data() {
    return {
      isChecked: false
    }
  },
  methods: {
    handleChecked(e) {
      this.$emit('input', this.isChecked)
    }
  },
  watch: {
    check: function() {
      this.isChecked = this.check || this.value;
    },
    value: function() {
      this.isChecked = this.check || this.value;
    }
  },
}
</script>

<style lang="scss">

.check-wrapper  {
  display: flex;
}

.check {
  display: flex;
  align-items: center;

  font-family: Arial, Helvetica;
  font-size: 13px;
  color: #797979;
    
  &:hover {
    color: #333;
    
    .check__box {
      border-color: #333;
    }
  }

  &__box {
    display: inline-block;

    margin-right: 8px;
    
    width: 18px;
    height: 18px;
    
    border: 1px solid #C6C6C6;
    border-radius: 5px;
  }
  
  &__input {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);

    
    &:checked + .check__box {
      border-color: #FEDD46;

      background: url("data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='18' height='18' fill='%23FEDD46'/%3E%3Cpath d='M7.29282 12.875L14.2497 6.32174L12.8285 5L7.2572 10.2257L4.4212 7.58813L3 8.90989L7.29282 12.875Z' fill='%23333333'/%3E%3C/svg%3E%0A") no-repeat center center;
    }
        
    &:focus + .check__box {
       border-color: #333;
    }
    
    &:hover:checked + .check__box {
      border-color: #333;
    }
    
    &:hover:disabled + .check__box {
      box-shadow: 0 0 0 0px #E9E9E9;
    }
    
    &:hover:disabled:checked + .check__box {
      box-shadow: 0 0 0 0px #E9E9E9;
    }
        
    &:disabled + .check__box {
      border-color: #E9E9E9;
      background: #E9E9E9;
    }
    
    &:disabled:checked + .check__box {
      border-color: #E9E9E9;
      background: url("data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='18' height='18' fill='%23E9E9E9'/%3E%3Cpath d='M7.29282 12.875L14.2497 6.32174L12.8285 5L7.2572 10.2257L4.4212 7.58813L3 8.90989L7.29282 12.875Z' fill='%23ADADAD'/%3E%3C/svg%3E%0A") no-repeat center center;
    }
  }
}
</style>
