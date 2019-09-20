<template>
  <div class="control" v-click-outside="() => this.isVisible = false">
    <button class="control__btn" :class="{ 'control__btn--active': isVisible }" @click="handleClick">
      <slot></slot>
    </button>
      <!-- <div  class="dropdown"
            :class="{ 'filters--right': right, 'filters--left': !right, 'filters--down': down }"
            v-if="isVisible"> -->
      <div  class="dropdown"
            v-if="isVisible">

          <ul class="dropdown__list" :class="{ 'dropdown__list--empty': items.length === 0  }">
            <li v-for="item in items"
                class="dropdown__item dropdown__item--btn"
                @click="pickItem(item)"
                :key="item.id">

                <a class="dropdown__link" :href="`feed://form/template/${item.id}`">
                  {{ item.text }}
                </a>
            </li>
            <li class="dropdown__item dropdown__item--ref">
              <a :href="`feed://form/template`">
                Список шаблонов
              </a>
            </li>
          </ul>
      </div>
  </div>
</template>

<script>

export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      isVisible: false,
    }
  },
  methods: {
    pickItem(item) {
      this.$emit('dropdown:set', item);

      this.isVisible = false;
    },
    handleClick() {
      this.isVisible = !this.isVisible;
    },
  }
}
</script>


<style lang="scss">
  .control {
    // position: relative;

    display: flex;
    align-items: stretch;

    &__btn {
      display: flex;
      align-items: center;

      background: transparent;

      cursor: pointer;

      &--active {
        svg {
          path {
            fill: #1B1919;
          }
        }
      }
    }
  }

  .dropdown {
    position: absolute;
    bottom: 100%;
    right: 0;
    // left: 0;

    z-index: 5;

    padding-bottom: 4px;

    font-family: Arial, Helvetica;
    
    &__list { 
      display: flex;
      flex-direction: column;

      padding-top: 8px;

      border: 1px solid #DADADA;
      background: #fff;

      &--empty {
        padding-top: 0;
        border-top: 0;
      }
    }

    &__link {
      display: block;

      width: 100%;

      padding-right: 12px;
      padding-left: 16px;

      color: #4D4D4D;
      text-decoration: none;
      white-space: nowrap;

      box-sizing: border-box;
    }

    &__item {
      display: flex;
      align-items: center;

      min-width: 148px;

      height: 28px;

      font-size: 14px;
      color: #4D4D4D;

      border: none;
      background: transparent;

      transition: .2s;
      background: #fff;

      border-radius: 2px;

      box-sizing: border-box;

      cursor: pointer;

      &--ref {
        
        display: inline-block;
          

        height: 41px;

        padding: 0;

        border-top: 1px solid #DADADA;
        background: #F9F9F9;

        a {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex: 1;

          height: 41px;

          padding-left: 16px;
          padding-right: 16px;

          color: #4D4D4D;
          text-decoration: none;

          transition: .2s;
          
          &:hover {
            background: #E9E9E9;
          }
        }
      }

      &--btn {
        &:hover {
          color: #4C4C4C;
          background: #FEDD46;
        }
      }
    }
  }

  .filters {
    &--right {
      right: 0px;
      left: auto;
    }

    &--left {
      left: 0px;
      right: auto;
    }

    &--down {
      top: 24px;
      left: auto;
      right: -14px;
    }
  }
</style>


