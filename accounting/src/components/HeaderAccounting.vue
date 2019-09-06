<template>
    <div class="wrap_header">
        <div class="line">
            <div class="days" v-if="!setHeader.report_sent && !preloaderSwitch">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z" fill="#676767"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4C8.55228 4 9 4.44772 9 5V7.61257L10.6838 7.05132C11.2077 6.87667 11.774 7.15983 11.9487 7.68377C12.1233 8.20772 11.8402 8.77403 11.3162 8.94868L8.31623 9.94868C8.01128 10.0503 7.67606 9.99919 7.41529 9.81124C7.15452 9.62329 7 9.32144 7 9V5C7 4.44772 7.44772 4 8 4Z" fill="#676767"></path>
                </svg>
                До автоматической отправки отчёта
                <div class="time">
                    &nbsp <div class="count_day">{{setHeader.time_before_sending.days}}</div>&nbsp
                  <span class="inc_word" v-inclined-word="{number: setHeader.time_before_sending.days, titles: ['день', 'дня', 'дней']}"></span>
                    &nbsp
                  <div class="count_hours">{{setHeader.time_before_sending.hours}}</div>&nbsp
                  <span class="inc_word" v-inclined-word="{number: setHeader.time_before_sending.hours, titles: ['час', 'часа', 'часов']}"></span>
                    &nbsp
                </div>
            </div>
            <div class="days" v-if="setHeader.report_sent">
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z"
                        fill="#00963D"></path>
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.4472 4.10557C11.9412 4.35256 12.1414 4.95323 11.8944 5.44721L8.89443 11.4472C8.76755 11.701 8.53887 11.8889 8.26534 11.9642C7.99181 12.0394 7.69918 11.995 7.46033 11.8419L4.46033 9.9188C3.99538 9.62075 3.86007 9.00221 4.15812 8.53726C4.45617 8.0723 5.07471 7.937 5.53967 8.23504L7.60309 9.55775L10.1056 4.55279C10.3526 4.05881 10.9532 3.85858 11.4472 4.10557Z"
                        fill="#00963D"></path>
                </svg>
                Отчёт отправлен
            </div>
            <div class="not_ready" v-if="preloaderSwitch">
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2 2H14V14H2V2ZM0 2C0 0.895431 0.895431 0 2 0H14C15.1046 0 16 0.895431 16 2V14C16 15.1046 15.1046 16 14 16H2C0.895431 16 0 15.1046 0 14V2ZM5 4C4.44771 4 4 4.44771 4 5C4 5.55228 4.44771 6 5 6H11C11.5523 6 12 5.55228 12 5C12 4.44771 11.5523 4 11 4H5ZM4 8C4 7.44771 4.44771 7 5 7H11C11.5523 7 12 7.44771 12 8C12 8.55228 11.5523 9 11 9H5C4.44771 9 4 8.55228 4 8ZM5 10C4.44771 10 4 10.4477 4 11C4 11.5523 4.44771 12 5 12H11C11.5523 12 12 11.5523 12 11C12 10.4477 11.5523 10 11 10H5Z"
                        fill="#676767"></path>
                </svg>
                Отчет еще не готов
            </div>

            <div class="right_content">
                <a
                    :href="setHeader.bugs_db_link"
                    v-if="setHeader.haveBugs"
                    class="bugs_banner"
                    ref="bugs_banner">
                    {{setHeader.mistakes.count}}
                    <div
                        class="inc_word"
                        v-inclined-word="{number: setHeader.mistakes.count, titles: ['ошибка', 'ошибки', 'ошибок']}"></div>в данных клиентов
                    <div class="hidden_part">, пожалуйста, внесите изменения до
                        {{getDate(setHeader.mistakes.date)}}.</div>
                </a>

                <a
                    :href="setHeader.bugs_journals_link"
                    v-if="setHeader.haveNonFormedJournals"
                    class="no_formed_journals_banner"
                    ref="no_formed_journals_banner">
                    {{setHeader.nonFormedJournals.count}}
                    <div
                        class="inc_word"
                        v-inclined-word="{number: setHeader.nonFormedJournals.count, titles: ['журнал', 'журнала', 'журналов']}"></div><div
                        class="inc_word"
                        v-inclined-word="{number: setHeader.nonFormedJournals.count, titles: ['не сформирован', 'не сформировано', 'не сформировано']}"></div>
                    <transition name="slide-fade">
                        <div class="hidden_part">, пожалуйста, внесите изменения до
                            {{getDate(setHeader.nonFormedJournals.date)}}.</div>
                    </transition>
                </a>

                <a :href="setHeader.dialogs_link" class="plain">
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12.8727 15.9838C12.7273 15.9838 12.6545 15.9111 12.5091 15.8385L8.50909 12.787L6.32727 14.5307C6.18182 14.676 5.96364 14.676 5.74545 14.6034C5.52727 14.5307 5.38182 14.3127 5.38182 14.0948L4.29091 9.51761L0.436364 7.84658C0.145455 7.84658 0 7.55597 0 7.26535C0 6.97474 0.145455 6.68413 0.363636 6.61147L15.0545 0.0726535C15.2 0 15.2727 0 15.3455 0H15.4182C15.5636 0 15.7091 0.0726535 15.8545 0.217961C15.8545 0.217961 15.8545 0.217961 15.8545 0.290614C15.9273 0.363268 16 0.508575 16 0.653882C16 0.726535 16 0.726535 16 0.799189V0.871842L13.5273 15.4025C13.4545 15.6205 13.3091 15.8385 13.1636 15.9111C13.0182 15.9838 12.9455 15.9838 12.8727 15.9838ZM8.87273 11.4066L12.4364 14.0948L14.4 2.76083L7.41818 10.2441L8.87273 11.4066C8.87273 11.334 8.87273 11.334 8.87273 11.4066ZM5.89091 10.7527L6.4 12.787L7.41818 11.9878L6.03636 10.9707C5.96364 10.898 5.89091 10.8254 5.89091 10.7527ZM2.4 7.26535L6.69091 9.08169L12.6545 2.68818L2.4 7.26535Z"
                            fill="#676767"></path>
                    </svg>

                    <span class="text_plain">Диалоги с УК</span>
                </a>
                <div class="dots" @click="toggleElement()">
                    <svg
                        width="18"
                        height="6"
                        viewBox="0 0 18 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M2.72815 5.29984C4.10327 5.29984 5.21814 4.18655 5.21814 2.81325C5.21814 1.43994 4.10327 0.32666 2.72815 0.32666C1.35303 0.32666 0.238281 1.43994 0.238281 2.81325C0.238281 4.18655 1.35303 5.29984 2.72815 5.29984ZM9.11877 5.29984C10.4939 5.29984 11.6088 4.18655 11.6088 2.81325C11.6088 1.43994 10.4939 0.32666 9.11877 0.32666C7.74365 0.32666 6.62891 1.43994 6.62891 2.81325C6.62891 4.18655 7.74365 5.29984 9.11877 5.29984ZM17.9994 2.81325C17.9994 4.18655 16.8845 5.29984 15.5094 5.29984C14.1343 5.29984 13.0195 4.18655 13.0195 2.81325C13.0195 1.43994 14.1343 0.32666 15.5094 0.32666C16.8845 0.32666 17.9994 1.43994 17.9994 2.81325Z"
                            fill="#676767"></path>
                    </svg>
                </div>
                <div class="menu" v-show="showMenu">
                    <a :href="setHeader.table_view_link" class="menu_element">
                        <div class="icon btn_tab_view">
                            <svg
                                width="12"
                                height="11"
                                viewBox="0 0 12 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M0 0H12V3H0V0ZM7 5H12V7H7V5ZM5 5H0V7H5V5ZM7 9H12V11H7V9ZM5 9H0V11H5V9Z"
                                    fill="#838383"></path>
                            </svg>
                        </div>
                        <div class="btn_text">Табличный вид</div>
                    </a>
                    <div @click="$emit('show-video')" class="menu_element">
                        <div class="icon btn_video">
                            <svg
                                width="12"
                                height="13"
                                viewBox="0 0 12 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <mask id="path-1-inside-1" fill="white">
                                    <path
                                        d="M0 12.297V0.702966C0 0.161239 0.621762 -0.176288 1.11686 0.0966718L11.6315 5.89371C12.1228 6.16456 12.1228 6.83544 11.6315 7.10629L1.11686 12.9033C0.621762 13.1763 0 12.8388 0 12.297Z"></path>
                                </mask>
                                <path
                                    d="M1.11686 12.9033L0.151237 11.1519L0.151235 11.1519L1.11686 12.9033ZM11.6315 7.10629L10.6659 5.35484L10.6659 5.35484L11.6315 7.10629ZM11.6315 5.89371L10.6659 7.64516L10.6659 7.64516L11.6315 5.89371ZM1.11686 0.0966718L0.151236 1.84812L0.151236 1.84812L1.11686 0.0966718ZM-2 0.702966V12.297H2V0.702966H-2ZM2.08248 14.6548L12.5972 8.85774L10.6659 5.35484L0.151237 11.1519L2.08248 14.6548ZM12.5972 4.14226L2.08248 -1.65478L0.151236 1.84812L10.6659 7.64516L12.5972 4.14226ZM12.5972 8.85774C14.4676 7.82651 14.4676 5.17348 12.5972 4.14226L10.6659 7.64516C9.77803 7.15564 9.77802 5.84437 10.6659 5.35484L12.5972 8.85774ZM-2 12.297C-2 14.5482 0.422067 15.5702 2.08248 14.6548L0.151235 11.1519C0.544569 10.935 0.990469 10.9653 1.32695 11.148C1.66778 11.333 2 11.7413 2 12.297H-2ZM2 0.702966C2 1.25869 1.66778 1.667 1.32695 1.85202C0.990469 2.03468 0.544569 2.06498 0.151236 1.84812L2.08248 -1.65478C0.422066 -2.57021 -2 -1.54824 -2 0.702966H2Z"
                                    fill="#838383"
                                    mask="url(#path-1-inside-1)"></path>
                            </svg>
                        </div>
                        <div class="btn_text">Видео</div>
                    </div>
                    <a :href="setHeader.refresh_link" class="menu_element">
                        <div class="icon btn_refresh">
                            <svg
                                width="13"
                                height="13"
                                viewBox="0 0 13 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M11.983 5.25899V5.22861H11.9983C11.9935 5.19506 11.9884 5.1616 11.983 5.12823V1.46165L10.9135 2.53371C9.81216 0.998658 8.02127 0 5.99915 0C2.9495 0 0.425794 2.27143 0 5.22861H1.88062C2.28465 3.29082 3.98623 1.85294 5.99915 1.85294C7.50374 1.85294 8.83438 2.6563 9.57922 3.87129L8.19489 5.259L11.983 5.25899ZM0.000460625 10.5688L1.09365 9.47294C2.19533 11.0052 3.98455 12.0017 6.0045 12.0017C9.05411 12.0017 11.5778 9.73032 12.0036 6.77319H10.123C9.71894 8.71093 8.01739 10.1488 6.0045 10.1488C4.50208 10.1488 3.17311 9.34773 2.42766 8.13568L3.78856 6.77145L0.000459671 6.77146L0.000460625 10.5688Z"
                                    fill="#838383"></path>
                            </svg>
                        </div>
                        <div class="btn_text">Обновить</div>
                    </a>
                    <div @click="$emit('register-pp')" class="menu_element">
                        <div class="icon btn_catalog">
                            <svg
                                width="12"
                                height="10"
                                viewBox="0 0 12 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M0 1C0 0.447715 0.447715 0 1 0H11C11.5523 0 12 0.447715 12 1C12 1.55228 11.5523 2 11 2H1C0.447715 2 0 1.55228 0 1ZM0 5C0 4.44772 0.447715 4 1 4H11C11.5523 4 12 4.44772 12 5C12 5.55228 11.5523 6 11 6H1C0.447715 6 0 5.55228 0 5ZM1 8C0.447715 8 0 8.44771 0 9C0 9.55228 0.447715 10 1 10H5C5.55228 10 6 9.55228 6 9C6 8.44771 5.55228 8 5 8H1Z"
                                    fill="#838383"></path>
                            </svg>
                        </div>
                        <div class="btn_text">Перечень ПП</div>
                    </div>
                    <a :href="setHeader.helper_link" class="menu_element no_active">
                        <div class="icon btn_help">
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0)">
                                    <path
                                        d="M5.83734 0C7.91305 0 9.95661 0.955959 9.95661 3.24253C9.95661 5.35115 7.54031 6.16207 7.02138 6.924C6.6318 7.49077 6.76191 8.28715 5.69153 8.28715C4.99427 8.28715 4.65368 7.72 4.65368 7.20107C4.65368 5.27002 7.49094 4.83299 7.49094 3.24291C7.49094 2.3677 6.90848 1.84877 5.93492 1.84877C3.85921 1.84877 4.66975 3.98877 3.09766 3.98877C2.53013 3.98877 2.04297 3.64818 2.04297 2.9999C2.04259 1.40945 3.85845 0 5.83734 0ZM5.75659 9.33992C6.48523 9.33992 7.08644 9.93922 7.08644 10.6702C7.08644 11.4011 6.48638 12.0004 5.75659 12.0004C5.0268 12.0004 4.42636 11.4019 4.42636 10.6702C4.42636 9.9396 5.0268 9.33992 5.75659 9.33992Z"
                                        fill="#838383"></path>
                                </g>
                                <defs>
                                    <clipPath id="clip0">
                                        <rect width="12" height="12" fill="white"></rect>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div class="btn_text">Справка</div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["preloaderSwitch"],
        data() {
            return {showMenu: false, header: {}, windowShow: "", hide_part_journals: false, hide_part_data: false};
        },
        methods: {
            toggleElement() {
                this.showMenu = !this.showMenu;
            },
            hideMenu() {
                this.showMenu = false;
            },
            showHiddenPart() {
                //this.$refs.bugs_banner.offsetWidth
            },
            hideShowingPart() {},
            getDate(incomingDate) {
                let optionDate = {
                    month: "long",
                    day: "numeric"
                };

                let date = new Date(incomingDate);
                return date.toLocaleString("ru", optionDate);
            }
        },
        computed: {
            setHeader() {
                this.windowShow = this.$store.getters.getMainInfo.firstStart;
                return this.$store.getters.getMainInfo.header;
            }
        },
        mounted() {
            document.addEventListener("click", e => {
                if (!e.target.matches(".dots, .dots *")) {
                    this.hideMenu(e);
                }
            });
        }
    };
</script>

<style lang="less">
    .wrap_header {
        display: block;

        .line {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 0 15px;
            .bugs_banner,
            .no_formed_journals_banner {
                overflow: hidden;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                border-radius: 4px;
                line-height: normal;
                font-size: 12px;
                text-align: center;
                padding: 8px 16px;
                margin: 0 7.5px;
                white-space: nowrap;
                display: flex;
                justify-content: flex-start;
                align-items: center;

                .hidden_part {
                    margin-left: 30px;
                    transition-delay: 1s;
                }
                .inc_word {
                    margin: 0 3px;
                }

                &:before {
                    content: "";
                    flex-grow: 1;
                    flex-shrink: 0;
                    margin-right: 7px;
                }
            }

            .no_formed_journals_banner {
                background: #ef5350;
                color: #ffffff;
                margin-right: 36px;
                width: 188px;
                transition: all 1s;
                transition-delay: 0.3s;

                &:before {
                    background: url("../assets/images/fire.svg") no-repeat;
                    width: 12px;
                    height: 12px;
                }

                &:hover {
                    transition: all 1s;
                    overflow: hidden;
                    width: 447px;
                    .hidden_part {
                        transition-delay: 0.1s;
                        margin-left: 0;
                    }
                }
            }
            .bugs_banner {
                background: #ffc700;
                color: #232323;

                width: 188px;
                transition: all 1s;
                transition-delay: 0.3s;

                &:before {
                    background: url("../assets/images/mark.svg") no-repeat;
                    width: 12px;
                    height: 12px;
                }

                &:hover {
                    transition: all 1s;
                    width: 447px;
                    .hidden_part {
                        transition-delay: 0.1s;
                        margin-left: 0;
                    }
                }
            }
            .days {
                display: flex;
                align-items: center;
                font-weight: bold;
                font-size: 14px;
                color: #3a3a3a;
                margin-left: 15px;
                white-space: nowrap;
                svg {
                    margin-right: 5px;
                }
                .time {
                    margin-left: 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-weight: normal;
                    font-size: 10px;
                    color: #626262;
                    .count_day,
                    .count_hours {
                        margin-left: 7px;
                        width: 25px;
                        height: 25px;
                        border: 1px solid #ffb72a;
                        box-sizing: border-box;
                        border-radius: 5px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-weight: bold;
                        flex-shrink: 0;
                        font-size: 13px;
                        color: #3a3a3a;
                    }
                }
            }
            .not_ready {
                display: flex;
                align-items: center;
                font-weight: bold;
                font-size: 14px;
                color: #3a3a3a;
                svg {
                    margin-right: 7px;
                }
            }
            .warn {
                background: #fcd202;
                padding: 10px 73px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                border-radius: 4px;
                font-weight: bold;
                line-height: normal;
                font-size: 14px;
                color: #4d4d4d;
            }
            .right_content {
                width: 950px;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                margin-right: 15px;
                position: relative;
                .plain {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 11px;
                    letter-spacing: 0.07em;
                    text-transform: uppercase;
                    font-weight: bold;
                    color: #676767;
                    white-space: nowrap;
                    flex-shrink: 0;
                    .text_plain {
                        margin-left: 10px;
                    }
                }
                .plain {
                    cursor: pointer;
                }
                .dots {
                    flex-shrink: 0;
                    cursor: pointer;
                    padding: 10px 15px;
                    svg {
                        z-index: -1;
                    }
                }
            }
            .menu {
                position: absolute;
                top: 47px;
                right: -4px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                width: 172px;
                background: #ffffff;
                border: 1px solid #dadada;
                box-sizing: border-box;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.12);
                border-radius: 5px;
                z-index: 3;
                .menu_element {
                    display: flex;
                    align-items: center;
                    padding: 10px 16px;
                    white-space: nowrap;
                    cursor: pointer;
                    color: #838383;
                    text-decoration: none;
                    .btn_text {
                        margin-left: 12px;
                        line-height: 21px;
                        font-size: 14px;
                        letter-spacing: 0.02em;
                    }
                    &:hover {
                        background: #f7f7f7;
                    }
                    &:first-child {
                        border-radius: 5px 5px 0 0;
                    }
                    &:last-child {
                        border-radius: 0 0 5px 5px;
                    }
                    // &.no_active {
                    //   color: #cccccc;
                    //   cursor: pointer;
                    //   path {
                    //     fill: #cccccc;
                    //   }
                    //   &:hover {
                    //     background: #ffffff;
                    //   }
                    // }
                    .icon {
                        &.btn_refresh {
                            height: 13px;
                            width: 13px;
                        }
                    }
                }
            }
        }
    }
</style>