<template>
    <div class="benchmarks">
        <span class="benchmarks__title title--benchmarks">
            Статистика за прошлый месяц
        </span>
        <div class="benchmarks__percents percents">
            <a :href="setData.deployment.link" class="percents__item percents--integration">
                <span class="percents__count percents__count--green">{{setData.deployment.percent}}%</span>
                <div class="percents__text">Уровень внедрения УФА в прошлом месяце</div>
            </a>
            <a :href="setData.timeAccounting.link" class="percents__item percents--work-time">
                <span class="percents__count percents__count--red">{{setData.timeAccounting.percent}}%</span>
                <div class="percents__text">Учет рабочего времени в прошлом месяце</div>
            </a>
        </div>
    </div>
</template>

<script>

    export default{
        
        data() {
            return {
                
            }
        },
        computed:{
            setData(){
                return this.$store.getters.getDataBanner;
            }
        }
    }

</script>

<style lang="less">

    .benchmarks{
        
        background: #ffffff;
        
        padding: 18px 20px;

        border-bottom: 4px solid #f16546;
        
        &__percents{

            display: flex;
            justify-content: flex-start;

            padding: 15px 0;
        }

        &__title{

            text-decoration: none;
            border-bottom: 1px solid transparent;
        }
    }

.percents{

    &__item{

        text-decoration: none;
        
        display: flex;
        align-items: center;

        &:nth-child(2){

            margin-left: 20px;
        }
    }

    &__count{

        font-size: 28px;

        letter-spacing: 0.01em;
        text-transform: uppercase;

        &--green{

            color: #00AA45;
        }

        &--red{

            color: #FB373F;
        }
    }

    &__text{

        font-size: 12px;
        line-height: 16px;
    
        color: #797979;

        width: 140px;

        margin-left: 10px;
    }
}
</style>

