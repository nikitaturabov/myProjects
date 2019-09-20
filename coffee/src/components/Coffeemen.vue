<template>
  <div class="coffee__men">
    <ul>
      <li class="item" v-for="(men, index) in colleagues" :key="index">
        <div class="element">
          <div class="name">{{men.name}}</div>
          <div class="plus_coffee" @click="increment(men)"></div>
        </div>
        <div class="count">{{men.count}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Coffeemen",
  props: [],
  methods: {
    increment: function(men) {
      if(confirm("Добавить чашку кофе?")){
        this.colleagues.count = men.count++;
        localStorage.setItem(men.id, men.count);
      }
    }
  },
  mounted() {
    this.colleagues.map(function(men) {
      var item = men.id;
      if (localStorage.getItem(item)) {
        console.log();
        men.count = localStorage.getItem(item);
      }
    });
  },
  data() {
    return {
      colleagues: [
        {
          id: "1",
          name: "Турабов Никита",
          count: 0
        },
        {
          id: "2",
          name: "Гайдоренко Никита",
          count: 0
        },
        {
          id: "3",
          name: "Фёдоров Артем",
          count: 0
        },
        {
          id: "4",
          name: "Лютаревич Алексей",
          count: 0
        },
        {
          id: "5",
          name: "Кашина Екатерина",
          count: 0
        },
        {
          id: "6",
          name: "Гнатюк Анна",
          count: 0
        },
        {
          id: "7",
          name: "Михаил Щепин",
          count: 0
        },
        {
          id: "8",
          name: "Проничева Мария",
          count: 0
        }
      ]
    };
  }
};
</script>

<style lang="less">
.coffee__men {
  font-family: Arial, Helvetica, sans-serif;
  margin-top: 40px;
  overflow: auto;
  ul {
    margin-right: 15px;
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      list-style-type: none;

      .element {
        padding: 0 7px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 40px;
        background: #dedede;
        margin: 3px 0px;
        border: 1px solid #b3b3b3;
        border-radius: 4px;
        font-weight: bold;
      }
      .plus_coffee {
        background: #ffffff;
        padding: 5px;
        color: #ffffff;
        font-weight: bold;
        border-radius: 4px;
        &:before {
          content: "";
          background: url("./coffee.svg");
          display: block;
          width: 21px;
          height: 21px;
        }
      }
      .count {
        margin-left: 10px;
        padding: 5px 15px;
        background: #5f4a8b;
        border-radius: 50px;
        border: 1px solid #ffffff;
        color: #ffffff;
        font-weight: bold;
      }
    }
  }
}
</style>
