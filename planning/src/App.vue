<template>
  <div class="planning">
    <div class="planning__item top-line">
      <span class="top-line__item title-label title-label--gray">Итоги по задачам:</span>
      <a :href="setData.distributeTasks.link" class="top-line__item distribute-tasks">
        <div class="distribute-tasks__dot dot "></div>
        <div class="distribute-tasks__name name">Распределить задачи:</div>
        <div class="distribute-tasks__count count">{{setData.distributeTasks.count}}</div>
      </a>
      <a :href="setData.distributeDocs.link" class="top-line__item distribute-docs">
        <div class="distribute-docs__dot dot "></div>
        <div class="distribute-docs__name name">Распределить документы:</div>
        <div class="distribute-docs__count count">{{setData.distributeDocs.count}}</div>
      </a>
      <a :href="setData.expired.link" class="top-line__item expired">
        <div class="expired__alarm alarm"></div>
        <div class="expired__name name">Просрочено:</div>
        <div class="expired__count count">{{setData.expired.count}}</div>
      </a>
      <a :href="setData.work.link" class="top-line__item work">
        <div class="work__icon icon icon--man-play"></div>
        <div class="work__name name">В работе:</div>
        <div class="work__count count">{{setData.work.count}}</div>
      </a>
      <a :href="setData.scheduled.link" class="top-line__item scheduled">
        <div class="scheduled__icon icon icon--man-cross"></div>
        <div class="scheduled__name name">Запланированы на период отстутствия:</div>
        <div class="scheduled__count count">{{setData.scheduled.count}}</div>
      </a>
    </div>
    <div class="planning__item bottom-line">
      
      <span class="bottom-line__item title-label title-label--gray">План на 30 дней:</span>

      <div class="wrapper">
        <a :href="setData.overload.link" class="bottom-line__item overload">
          <div class="overload__name name">Сотрудников перегружено:</div>
          <div class="overload__count count">{{setData.overload.count}}</div>
        </a>
        <div class="overload__icon icon icon--question" title="План на 30 дней больше нормы рабочего времени"></div>
      </div>

      <div class="wrapper">
        <a :href="setData.plan.link" class="bottom-line__item plan">
          <div class="scheduled__icon icon icon--calendar"></div>
          
          <div class="plan__item name underloadedDays__name" v-if="!!setData.plan.underloadedDays">
            <span class="inclined-word" v-inclined-word="{number: setData.plan.underloadedDays, titles: ['Переработан', 'Переработка', 'Переработка']}"></span> 
            {{setData.plan.underloadedDays}} 
            <span class="inclined-word" v-inclined-word="{number: setData.plan.underloadedDays, titles: ['день', 'дня', 'дней']}"></span>,
          </div>

          <div class="fact__item name underloadedDays__name" v-else>
            Нет переработки,
          </div>
          
          <div class="plan__item name notUnderloadedDays__name " v-if="!!setData.plan.notUnderloadedDays">
          <span class="inclined-word" v-inclined-word="{number: setData.plan.underloadedDays, titles: ['недогружен', 'недогружено', 'недогружено']}"></span> 
          {{setData.plan.notUnderloadedDays}} 
          <span class="inclined-word" v-inclined-word="{number: setData.plan.notUnderloadedDays, titles: ['день', 'дня', 'дней']}"></span>
          </div>

          <div class="fact__item name underloadedDays__name" v-else>
            нет недоработки
          </div>
        </a>
        <div class="overload__icon icon icon--question" title="Подсветить рабочие дни сотрудников, в которые факт отклоняется от нормы рабочего времени на 30 мин и более"></div>

      </div>


      <div class="wrapper">
        <span class="bottom-line__item title-label title-label--gray">Факт за прошлые 30:</span>

        <a :href="setData.fact.link" class="bottom-line__item fact">
          <div class="scheduled__icon icon icon--calendar"></div>
          
          <div class="fact__item name underloadedDays__name" v-if="!!setData.fact.underloadedDays">
            <span class="inclined-word" v-inclined-word="{number: setData.fact.underloadedDays, titles: ['Переработан', 'Переработка', 'Переработка']}"></span> 
            {{setData.fact.underloadedDays}} 
            <span class="inclined-word" v-inclined-word="{number: setData.fact.underloadedDays, titles: ['день', 'дня', 'дней']}"></span>,
          </div>

          <div class="fact__item name underloadedDays__name" v-else>
            Не было переработки,
          </div>
          
          <div class="fact__item name notUnderloadedDays__name " v-if="!!setData.fact.notUnderloadedDays">
          <span class="inclined-word" v-inclined-word="{number: setData.fact.underloadedDays, titles: ['недогружен', 'недогружено', 'недогружено']}"></span> 
          {{setData.fact.notUnderloadedDays}} 
          <span class="inclined-word" v-inclined-word="{number: setData.fact.notUnderloadedDays, titles: ['день', 'дня', 'дней']}"></span>
          </div>

          <div class="fact__item name underloadedDays__name" v-else>
            не было недоработки
          </div>

        </a>
        <div class="overload__icon icon icon--question" title="Подсветить рабочие дни сотрудников, в которые факт отклоняется от нормы рабочего времени на 30 мин и более"></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  computed: {
    setData(){
      return this.$store.getters.getData;
    }
  },
};
</script>

<style lang="less">
@import url("./mixins/mixin.less");
.planning {
  background: #E8F8C4;
  padding: 2px 4px;

  min-width: 1000px;
  &__item{
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &:first-child{
      margin-bottom: 6px;
    }
  }
}

.top-line,
.bottom-line{

  &__item{
    display: flex;
    justify-content: flex-start;
    align-items: center;

    white-space: nowrap;

    text-decoration: none;

    margin: 0 6px;
  }
}

.title-label{

  &--gray{
    font-size: 11px;
    line-height: 13px;

    color: #9B9B9B;
  }
}

.distribute-tasks,
.distribute-docs,
.expired,
.work,
.scheduled,
.scheduled,
.overload,
<<<<<<< HEAD
.plan,
.fact{
=======
.underloadedDays,
.notUnderloadedDays{
>>>>>>> feature/planning

  &__dot{
    background: #00A5B2;
  }
  &__name{
    color: #1C55AE;

    margin: 0 3px;

    border-bottom: 1px solid #1C55AE;
  }
  &__count{
    color: #1C55AE;
    text-decoration: none;
  }
}

.dot{
  width: 6px;
  height: 6px;

  border-radius: 10px;
}

.name{
  
  font-size: 11px;
  line-height: 16px;
}

.count{
  font-weight: bold;
  font-size: 11px;
  line-height: 16px;
}

.alarm{
  width: 16px;
  height: 16px;

  background-image: url('./img/АРБИС_Будильник.png');
}
.fact,
.plan{

  &__item{
    margin: 0;
    padding: 0 3px;
  }
}

.wrapper{
  display: flex;
  align-items: center;
}

.icon{

  width: 16px;
  height: 16px;
  &--man-play{

    background-image: url('./img/АРБИС_СтатусЗадачаВРаботе.png');
  }

  &--man-cross{

    background-image: url('./img/АРБИС_СтатусЗадачаОтменена.png');
  }

  &--question{

    background-image: url('./img/Mask Group.png');
    background-repeat: no-repeat;
    background-position: center;

    margin-left: -5px;
  }

  &--calendar{
    background-image: url('./img/АРБИС_ПодсветитьГрафик.png');
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>
