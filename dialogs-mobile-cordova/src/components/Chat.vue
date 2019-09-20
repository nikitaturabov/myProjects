<template>
    <div class="chat">
        
        <div class="chat__headline headline">
            <div class="headline__empty"></div>
            <div class="headline__title">Чат</div>
            <div class="headline__icons icons">
                <div class="icons__item find">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.502 14.0012H14.708L14.432 13.7272C15.407 12.5902 16 11.1162 16 9.50119C16 5.91119 13.09 3.00119 9.5 3.00119C5.91 3.00119 3 5.91119 3 9.50119C3 13.0912 5.91 16.0012 9.5 16.0012C11.115 16.0012 12.588 15.4092 13.725 14.4352L14.001 14.7092V15.5012L18.999 20.4922L20.49 19.0012L15.502 14.0012ZM9.5 14.0012C7.014 14.0012 5 11.9872 5 9.50119C5 7.01619 7.014 5.00119 9.5 5.00119C11.985 5.00119 14 7.01619 14 9.50119C14 11.9872 11.985 14.0012 9.5 14.0012Z" fill="#F75837"/>
                    </svg>
                </div>
                <div class="icons__item filter">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6H20V8H4V6Z" fill="#F75837"/>
                    <path d="M7 11H17V13H7V11Z" fill="#F75837"/>
                    <path d="M14 16H10V18H14V16Z" fill="#F75837"/>
                    </svg>
                </div>
                <div class="icons__item menu">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6 8C7.1 8 8 7.1 8 6C8 4.9 7.1 4 6 4C4.9 4 4 4.9 4 6C4 7.1 4.9 8 6 8ZM6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10ZM6 16C4.9 16 4 16.9 4 18C4 19.1 4.9 20 6 20C7.1 20 8 19.1 8 18C8 16.9 7.1 16 6 16Z" fill="#F75837"/>
                    </svg>
                </div>
            </div>
        </div>
        
        <div class="chat__messages messages">
            <div class="messages__item title-date title-date--day">5 июля 2019</div>
            <div class="messages__item message message--outgoing">
                <div class="message__main-info">
                    <span class="message__author">Серегин Матвей Михайлович</span>
                    <div class="message__text">Это самое обычное слово</div>
                </div>
                <div class="message__other">
                    <img src="https://pm1.narvii.com/6761/f941d12b64013da8900363f2d74366c60533358av2_hq.jpg" alt="avatar" class="message__avatar">
                    <time class="message__date">16:08</time>
                </div>
                
            </div>
            <div class="messages__item message message--incoming">
                 <div class="message__main-info">
                    <span class="message__author">Ивлев Павел Андреевич</span>
                    <div class="message__text">Это самое обычное слово</div>
                </div>
                <div class="message__other">
                    <img src="https://tntmusic.ru/media/content/article/2018-07-23_13-39-09__c6ad796c-8e7d-11e8-8f7f-81b45a60fe41.jpg" alt="avatar" class="message__avatar">
                    <time class="message__date">16:08</time>
                </div>
            </div>

            <div class="messages__item title-date title-date--day">6 июля 2019</div>
            <div class="messages__item message message--outgoing">
                <div class="message__main-info">
                    <span class="message__author">Серегин Матвей Михайлович</span>
                    <div class="message__text">Это сообщение с согласованием, его можно согласовать или отклонить</div>
                </div>
                <div class="message__other">
                    <img src="https://pm1.narvii.com/6761/f941d12b64013da8900363f2d74366c60533358av2_hq.jpg" alt="avatar" class="message__avatar">
                    <time class="message__date">16:08</time>
                </div>
            </div>

            <div class="messages__item message message--outgoing">
                <div class="message__main-info">
                    <span class="message__author">Серегин Матвей Михайлович</span>
                    <div class="message__text">Добрый день! Заинтересовали ваши услуги. Расскажите, пожалуйста, подробнее.Добрый день! Заинтересовали ваши услуги. Расскажите, пожалуйста, подробнее.</div>
                </div>
                <div class="message__other">
                    <img src="https://pm1.narvii.com/6761/f941d12b64013da8900363f2d74366c60533358av2_hq.jpg" alt="avatar" class="message__avatar">
                    <time class="message__date">16:08</time>
                </div>

            </div>
            <div class="messages__item message message--incoming">
                 <div class="message__main-info">
                    <span class="message__author">Ивлев Павел Андреевич</span>
                    <div class="message__text">Это самое обычное  сообщение, без дополнительных опций</div>
                </div>
                <div class="message__other">
                    <img src="https://tntmusic.ru/media/content/article/2018-07-23_13-39-09__c6ad796c-8e7d-11e8-8f7f-81b45a60fe41.jpg" alt="avatar" class="message__avatar">
                    <time class="message__date">16:08</time>
                </div>
            </div>

            <div class="messages__item title-date title-date--day">6 июля 2019</div>
            <div class="messages__item message message--outgoing">
                <div class="message__main-info">
                    <span class="message__author">Серегин Матвей Михайлович</span>
                    <div class="message__text">Это сообщение с согласованием, его можно согласовать или отклонить</div>
                </div>
                <div class="message__other">
                    <img src="https://pm1.narvii.com/6761/f941d12b64013da8900363f2d74366c60533358av2_hq.jpg" alt="avatar" class="message__avatar">
                    <time class="message__date">16:08</time>
                </div>
            </div>

            <div class="messages__item message message--outgoing">
                <div class="message__main-info">
                    <span class="message__author">Серегин Матвей Михайлович</span>
                    <div class="message__text">Добрый день! Заинтересовали ваши услуги. Расскажите, пожалуйста, подробнее.Добрый день! Заинтересовали ваши услуги. Расскажите, пожалуйста, подробнее.</div>
                </div>
                <div class="message__other">
                    <img src="https://pm1.narvii.com/6761/f941d12b64013da8900363f2d74366c60533358av2_hq.jpg" alt="avatar" class="message__avatar">
                    <time class="message__date">16:08</time>
                </div>

            </div>
            <div class="messages__item message message--incoming">
                 <div class="message__main-info">
                    <span class="message__author">Ивлев Павел Андреевич</span>
                    <div class="message__text">Это самое обычное  сообщение, без дополнительных опций</div>
                </div>
                <div class="message__other">
                    <img src="https://tntmusic.ru/media/content/article/2018-07-23_13-39-09__c6ad796c-8e7d-11e8-8f7f-81b45a60fe41.jpg" alt="avatar" class="message__avatar">
                    <time class="message__date">16:08</time>
                </div>
            </div>
        </div>

        <form class="chat__input-message input-message">
            <button class="input-message__btn btn btn--plus">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6 0V6H0V8H6V14H8V8H14V6H8V0H6Z" fill="black" fill-opacity="0.5"/>
                </svg>
            </button>
            <textarea class="input-message__text-area" rows="1" placeholder="Введите сообщение"></textarea>
            <button class="input-message__btn btn btn--submit-message">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="#F75837"/>
                </svg>
            </button>
        </form>

        </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less">

.chat{

    height: 100vh;
    width: 100%;

    position: relative;

    &__headline{
        display: flex;
        justify-content: space-between;

        background: linear-gradient(131.47deg, #FEE25F 29.93%, #FFC528 120.72%);

        width: 100%;

        padding: 15px 0;
    }

    &__input-message{

        width: 100%;
        height: 52px;
        background: #FFFFFF;

        display: flex;
        justify-content: space-around;
        align-items: center;
    }
}

.headline{

    &__empty{

        width: 117px;
    }

    &__title{

        font-size: 20px;
    }

    &__icons{

        display: flex;
    }
}

.icons{

    &__item{

        margin-left: 15px;
    }
}

.messages{

    height: 85vh;
    overflow-y: auto;
}

.title-date{

    &--day{

        margin: 18px 0;

        font-size: 12px;
        line-height: 16px;

        color: #9E9888;
    }
}

.message--outgoing{

    display: flex;
    justify-content: flex-end;

    align-items: center;

    margin: 12px;
    & .message{

        &__author{

            font-weight: bold;
            font-size: 12px;

            text-align: right;
            letter-spacing: 0.01em;

            color: #FD866C;

            margin-bottom: 5px;
        }

        &__text{

            font-size: 16px;
            line-height: 20px;

            letter-spacing: 0.01em;

            color: #FFFFFF;

            padding: 9px 25px 9px 13px;
            background: linear-gradient(86.47deg, #FE7D61 -1.79%, #ECA79C 129.65%);
            box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.07);
            border-radius: 10px;

            text-align: left;

        }

        &__avatar{

            width: 40px;
            height: 40px;

            border-radius: 50px;

            margin-bottom: 5px;
        }

        &__date{

            font-weight: bold;
            font-size: 12px;

            text-align: center;

            color: #FD866C;
        }

        &__main-info{

            display: flex;
            flex-direction: column;
        }

        &__other{

            display: flex;
            flex-direction: column;

            margin-left: 10px;
        }

    }
}

.message--incoming{

    display: flex;
    justify-content: flex-start;

    align-items: center;

    margin: 12px;
    & .message{

        &__author{

            font-weight: bold;
            font-size: 12px;

            text-align: left;
            letter-spacing: 0.01em;

            color: #9E9888;

            margin-bottom: 5px;
        }

        &__text{

            font-size: 16px;
            line-height: 20px;

            letter-spacing: 0.01em;

            color: #000000;

            padding: 9px 25px 9px 13px;
            background: #FFFFFF;
            box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.07);
            border-radius: 10px;

            text-align: left;

        }

        &__avatar{

            width: 40px;
            height: 40px;

            border-radius: 50px;

            margin-bottom: 5px;
        }

        &__date{

            font-weight: bold;
            font-size: 12px;

            text-align: center;

            color: #9E9888;
        }

        &__main-info{

            display: flex;
            flex-direction: column;
            order: 1;
        }

        &__other{

            display: flex;
            flex-direction: column;

            margin-right: 10px;
        }

    }
}

.btn{

    &--plus{

        background: #FFFFFF;
    }

    &--submit-message{
        background: #FFFFFF;
    }
}

.input-message{

    position: absolute;

    bottom: 0;


    &__text-area{

        width: 70vw;

        &:focus{
            outline: none;
        }

        &:placeholder{

            margin-top: 20px;
        }
    }
}
</style>