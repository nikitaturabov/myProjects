<template>
  <div class="filters">
    <div class="filters__body">
      <div class="filters__col">
        <triple-box :count="getActiveAttachmentsLength"
                    text="Сообщения"

                    v-model="isChecked"
                    @set="setAllFilters"

                  >
        </triple-box>
        
        <div class="filters__checks">
          <Checkbox class="filters__check" v-model="filters.attachments.picture" label="Изображения (png, jpeg, bmp и др.)"></Checkbox>
          <Checkbox class="filters__check" v-model="filters.attachments.word" label="MS Word (doc, docx и др.)"></Checkbox>
          <Checkbox class="filters__check" v-model="filters.attachments.excel" label="MS Exсel (xlsx, xls и др.)"></Checkbox>
          <Checkbox class="filters__check" v-model="filters.attachments.pdf" label="PDF"></Checkbox>
          <Checkbox class="filters__check" v-model="filters.attachments.other" label="Прочее"></Checkbox>
        </div>

      </div>
      <div class="filters__col">
        <Checkbox v-model="filters.tech" label="Технические сообщения"></Checkbox>
      </div>
    </div>
    <div class="filters__actions">
      <button class="filters__btn filters__btn--yellow" @click="acceptFilter">Применить</button>
      <button class="filters__btn filters__btn--gray" @click="clearFilter">Сбросить</button>
    </div>
  </div>
</template>

<script>

import Checkbox from '@/src/components/checkbox/Checkbox.vue';
import TripleBox from '@/src/components/triple-box/Triplebox.vue';

export default {
  props: {
    acceptedFilters: {
      type: Object,
      default: () => ({})
    }
  },
  created() {
    this.filters.attachments.picture = this.acceptedFilters.attachments.picture;
    this.filters.attachments.word = this.acceptedFilters.attachments.word;
    this.filters.attachments.excel = this.acceptedFilters.attachments.excel;
    this.filters.attachments.pdf = this.acceptedFilters.attachments.pdf;
    this.filters.attachments.other = this.acceptedFilters.attachments.other;
    
    this.filters.tech = this.acceptedFilters.tech;
  },
  data() {
    return {
      isAllPicks: false,
      isChecked: false,
      filters: {
        attachments: {
          picture: false,
          word: false,
          excel: false,
          pdf: false,
          other: false
        },
        tech: false
      }
    }
  },
  watch: {
    filters: {
      deep: true,
      handler: function() {
        let keys = Object.keys(this.filters.attachments);
        let picked = keys.filter(key => this.filters.attachments[key]);

        this.isAllPicks = picked.length === keys.length;

        if (this.isAllPicks) {
          this.isChecked = true;
        } else {
          this.isChecked = false;
        }
      }
    },
  },
  computed: {
    getActiveAttachmentsLength() {
      return Object.keys(this.filters.attachments)
              .filter(key => this.filters.attachments[key]).length;
    }
  },
  methods: {
    setAllFilters(value) {
      if (value) {
        Object.keys(this.filters.attachments)
              .forEach(key => { this.filters.attachments[key] = true; });
      } else {
        Object.keys(this.filters.attachments)
              .forEach(key => { this.filters.attachments[key] = false; });
      }
    },
    acceptFilter() {
      this.$emit('filters:set', this.filters);
    },
    clearFilter() {
      this.$emit('filters:set', null);
      
      this.filters.attachments.picture = false;
      this.filters.attachments.word = false;
      this.filters.attachments.excel = false;
      this.filters.attachments.pdf = false;
      this.filters.attachments.other = false;

      this.filters.tech = false;
    }
  },
  components: {
    Checkbox,
    TripleBox
  }
}
</script>

<style lang="scss">
  .filters {
    padding-bottom: 20px;
    
    border: 1px solid #DADADA;
    border-radius: 2px;
    
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.12);

    box-sizing: border-box;

    &__body {
      display: flex;
    }

    &__col {
      flex: 1;

      padding-top: 24px;
      padding-left: 36px;
      padding-right: 48px;
    }

    &__checks {
      margin-top: 10px;
      padding-left: 28px;
    }

    &__check {
      margin-top: 8px;
    }

    &__actions {
      display: flex;
      justify-content: flex-end;

      padding-right: 48px;
    }
    
    &__btn {
      display: flex;
      align-items: center;

      padding-right: 13px;
      padding-left: 13px;

      height: 30px;

      font-size: 10px;
      font-weight: 700;

      text-transform: uppercase;

      border-radius: 5px;

      cursor: pointer;

      &--yellow {
        color: #4D4D4D;
        background: #FEDD46;

        margin-right: 10px;
      }

      &--gray {
        color: #909090;
        background: transparent;
      }
    }
  }
</style>
