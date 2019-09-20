<script>

import { getDate } from '@/src/utils/date.js';

export default {
  props: {
    id: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null
    },
    way: {
      type: String,
      default: null
    },
    text: {
      type: String, 
      defualt: null
    },
    author: {
      type: String,
      default: null
    },
    service: {
      type: String,
      default: null
    },
    tags: {
      type: Array,
      default: () => []
    },
    files: {
      type: Array,
      default: () => []
    },
    unix: {
      type: Number,
      default: null
    },
    setResolved: {
      type: Boolean,
      default: false
    },
    feedback: {
      type: Object,
      default: () => ({ type: '', text: '' })
    },
    stage: {
      type: String,
      default: null
    },
    quotes: {
      type: Array,
      default: () => []
    },

    isPickedMessage: {
      type: Boolean,
      default: false
    },
    isSupportMode: {
      type: Boolean,
      default: false
    },
    movedTo: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    getMessageTitle() {
      return `${this.author} · ${this.service} · ${this._getMessageDate}`;
    },
    getDate(date) {
      return getDate(date);
    }
  },
  computed: {
    _getMessageDate() {
      return getDate(this.unix);
    }
  }
}
</script>

<style lang="scss">
  .message {
    position: relative;

    &__title {

      font-size: 11px;
      font-weight: 700;

      &--in {
        padding-left: 10px;
        color: #929292;
      }

      &--out {
        padding-right: 10px;

        text-align: right;
        color: #765FA7;
      }

      &--private {
        padding-right: 10px;

        text-align: right;
        color: #765FA7;
      }


      &--cancel { color: #DE3045; }
      &--complete { color: #1DAC4D; }
      &--information { color: #754475; }

      &--moved {
        margin-top: 6px;

        color: #929292;
      }
    }

    &__body {
      position: relative;

      margin-top: 15px;

      transition: .2s;

      &--in {
        width: 84%;
        margin-left: 10px;
      }

      &--out {
        width: 84%;
        margin-right: 10px;
        margin-left: auto;
      }

      &--private {
        width: 84%;
        margin-right: 10px;
        margin-left: auto;
      }

      &--picked {
        width: 84%;
        margin-left: 10px;
        margin-right: auto;
      }

      &--tech {
        flex: 1;

        margin-right: 12px;
        margin-left: 12px;
      }
    }

    &__content {
      display: flex;

      margin-top: 7px;
    }

    &__inner {
      position: relative;

      flex: 1;

      padding-top: 18px;
      padding-bottom: 22px;
      padding-right: 22px;
      padding-left: 22px;

      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      
      &--in {
        background: #F1F1F1;
        border-bottom-right-radius: 10px;

        &:after {
          content: '';

          position: absolute;
          bottom: 0;
          left: -10px;

          width: 12px;
          height: 10px;

          background: url("data:image/svg+xml,%3Csvg width='12' height='10' viewBox='0 0 12 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 10H0C5.25859 10 9.79557 5.94635 12 0V10Z' fill='%23F0F0F0'/%3E%3C/svg%3E") no-repeat center center;
        }
      }

      &--out {
        background: #E4DFFC;
        border-bottom-left-radius: 10px;

        &:after {
          content: '';

          position: absolute;
          bottom: 0;
          right: -10px;

          width: 12px;
          height: 10px;

          background: url("data:image/svg+xml,%3Csvg width='12' height='10' viewBox='0 0 12 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10H12C6.74141 10 2.20443 5.94635 0 0V10Z' fill='%23E4DFFC'/%3E%3C/svg%3E") no-repeat center center;
        }
      }

      &--private {
        border: 1px solid #B8B8B8;
        border-radius: 10px 10px 0px 10px;

        &:after {
          content: '';

          position: absolute;
          bottom: -1px;
          right: -11px;

          // z-index: -1;

          width: 11px;
          height: 10px;

          background: url("data:image/svg+xml,%3Csvg width='13' height='10' viewBox='0 0 13 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.5 0.5H0.655136C2.27643 4.66414 5.0561 7.9386 8.46851 9.5H0.5V0.5Z' fill='white' stroke='%23B7B7B7'/%3E%3Cpath d='M1 2.5L0 0.5V9H1V2.5Z' fill='white'/%3E%3C/svg%3E") no-repeat center center;
        }

        &:before {
          content: '';

          position: absolute;
          top: 15px;
          right: 21px;
          
          width: 8px;
          height: 9px;

          background: url("data:image/svg+xml,%3Csvg width='8' height='9' viewBox='0 0 8 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.54419 0.0708008C1.51889 0.0708008 1.01256 1.74535 1.01256 2.58262H2.02521C2.1096 2.02444 2.30011 1.02484 3.54419 1.02322C4.78827 1.02159 4.97878 2.02444 5.06316 2.58262H6.07581C6.07581 1.63437 5.56949 0.0708008 3.54419 0.0708008Z' fill='%23929292'/%3E%3Cpath d='M2.02521 2.58262H1.01256L1.01225 3.59525H0.805518C0.360643 3.59525 0 3.9559 0 4.40077V7.85299C0 8.29786 0.360643 8.65851 0.805518 8.65851H6.28304C6.72791 8.65851 7.08855 8.29787 7.08855 7.85299V4.40077C7.08855 3.9559 6.72791 3.59525 6.28304 3.59525H6.07514L6.07581 2.58262H5.06316L5.06249 3.59525H2.0249L2.02521 2.58262Z' fill='%23929292'/%3E%3C/svg%3E");
        }
      }

      &--cancel { padding-top: 18px; padding-bottom: 18px; background: linear-gradient(90deg, #F4622C 0%, #F35F2E 25.17%, #EE5533 49.92%, #E7443B 71.66%, #DE3045 92.07%, #DE3045 100%); border-radius: 12px; }
      &--complete { padding-top: 18px; padding-bottom: 18px; background: linear-gradient(90deg, #36BA9F 0%, #35B99C 25.17%, #32B892 49.92%, #2DB581 71.66%, #26B169 92.07%, #1DAC4D 100%); border-radius: 12px; }
      &--information { padding-top: 18px; padding-bottom: 18px; background: linear-gradient(90deg, #A136BA 0%, #9E35B9 25.17%, #9431B7 49.92%, #832BB4 71.66%, #6B22AF 92.07%, #5F1DAC 100%); border-radius: 12px; }
    }

    &__tags {
      margin-bottom: 8px;
    }

    &__text {
      font-size: 13px;
      white-space: pre-line;

      &--in { color: #364339; }
      &--out { color: #2A242E; }
      &--tech { font-weight: 700; color: #fff; }
      &--private {
        color: #364339;
      }
    }

    &__files {
      display: flex;
      flex-direction: column;

      &--in {
        align-items: flex-start;
      }

      &--out {
        align-items: flex-end;
      }
    }

    &__file {
      margin-top: 5px;
    }

    &__link {
      display: flex;
      align-items: center;

      height: 34px;
      padding-left: 10px;

      font-size: 15px;

      border-radius: 10px;
      text-decoration: none;
      
      &--in {
        color: #7E7E7E;
        background: #F0F0F0;

        transition: color .2s;

        &:hover {
          color: #313030;
          
          .message__link-icon--in {
            background: #6E6E6E;
          }
        }
      }
      &--out {
        color: #765FA7;
        background: #E4DFFC;

        transition: color .2s;

        &:hover {
          color: #503F75;
          
          .message__link-icon--out {
            background: #5C4C80;
          }
        }
      }
    }

    &__link-icon {

      display: flex;
      
      justify-content: center;
      align-items: center;

      width: 35px;
      height: 34px;

      margin-left: 14px;

      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      
      &--in {
        background: #B1B1B1;

        transition: background .2s;
      }
      &--out {
        background: #765FA7;

        transition: background .2s;
      }
    }

    &__quote {
      margin-top: 12px;
    }

    &__actions {
      display: flex;
      align-items: flex-start;
      align-content: flex-start;
      flex-wrap: wrap;

      max-width: 72px;

      &--private {
        order: -1;
        padding-right: 3px;
      }

      &--in {
        padding-left: 3px;

        li {
          margin-left: 2px;
          margin-bottom: 2px;
        }
      }

      &--out {
        order: -1;

        padding-right: 3px;

        li {
          margin-right: 2px;
          margin-bottom: 2px;
        }
      }

      &--private {
        order: -1;

        padding-right: 3px;

        li {
          margin-right: 2px;
          margin-bottom: 2px;
        }
      }
    }

    &__action {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 22px;
      height: 22px;

      border-radius: 6px;
  
      transition: background .2s;

      cursor: pointer;

      &--in {
        background: #F0F0F0;

        svg {
          path {
            fill: #929292;
          }
        }

        &:hover {
          background: #C6C6C6;
        }
      }

      &--out {
        background: #E4DFFC;

        svg {
          path {
            fill: #765FA7;
          }
        }

        &:hover {
          background: #C5C1D7;
        }
      }

      &--private {
        background: transparent;

        svg {
          path {
            fill: #919191;
          }
        }

        &:hover {
          background: #C6C6C6;
        }
      }
    }

    &__icon {
      position: absolute;
      
      top: 11px;
      right: 18px;

      width: 35px;
      height: 35px;
            
      &--unresolved {
        background: url("data:image/svg+xml,%3Csvg width='35' height='35' viewBox='0 0 35 35' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='17.5' cy='17.5' r='16.56' fill='%23E24D4D' stroke='white' stroke-width='1.88'/%3E%3Cpath d='M15.0103 19.2731C15.295 19.8547 16.0172 21.0179 17.5447 21.9042C18.7876 23.303 19.2355 26.4017 19.3396 27.1564C19.4438 27.918 21.2108 28.5132 21.433 26.0552C21.6552 23.5972 21.433 21.6826 21.433 21.6826L25.4117 21.6826C27.6161 21.6826 27.6197 18.6049 25.7798 18.6049C27.6197 18.6049 27.0833 15.8837 25.9637 15.8837L25.2277 15.8837C25.7905 15.8837 25.2277 15.8837 25.9637 15.8837C27.0833 15.725 26.8501 13.3948 25.4117 13.3948C27.0833 12.0437 24.9519 10.9919 24.9519 10.9919C24.9519 10.9919 23.3533 10.466 22.8205 10.466C20.6643 10.466 19.1602 10.2653 16.9592 10.466L15.3606 10.9919L12.1636 10.9919L12.1636 19.2731L15.0173 19.2731L15.0103 19.2731Z' fill='white'/%3E%3Cpath d='M12.1636 20.345L14.6556 20.345L14.6556 10.377L12.1636 10.377L12.1636 20.345Z' fill='%23E24D4D'/%3E%3Cpath d='M7.17969 20.345L13.4097 20.345L13.4097 10.377L7.17969 10.377L7.17969 20.345Z' fill='white'/%3E%3Cellipse rx='1.246' ry='1.246' transform='matrix(1 -1.74846e-07 -1.74846e-07 -1 8.98575 18.3712)' fill='%23E24D4D'/%3E%3C/svg%3E");
      }
      &--resolved {
        background: url("data:image/svg+xml,%3Csvg width='35' height='35' viewBox='0 0 35 35' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='17.5' cy='17.5' r='16.56' fill='%23269E86' stroke='white' stroke-width='1.88'/%3E%3Cpath d='M14.7214 15.9711C15.012 15.3895 15.7491 14.2264 17.3084 13.3401C18.5771 11.9413 19.0343 8.84288 19.1406 8.08817C19.2469 7.32659 21.0507 6.7315 21.2775 9.18935C21.5043 11.6472 21.2775 13.5617 21.2775 13.5617L25.3388 13.5617C27.589 13.5617 27.5927 16.6392 25.7145 16.6392C27.5927 16.6392 27.0451 19.3603 25.9023 19.3603L25.151 19.3603C25.7255 19.3603 25.1511 19.3603 25.9023 19.3603C27.0451 19.5189 26.8072 21.849 25.3388 21.849C27.0451 23.2 24.8695 24.2518 24.8695 24.2518C24.8695 24.2518 23.2377 24.7777 22.6938 24.7777C20.4928 24.7777 18.9575 24.9784 16.7107 24.7777L15.0789 24.2518L11.8154 24.2518L11.8154 15.9711L14.7285 15.9711L14.7214 15.9711Z' fill='white'/%3E%3Cpath d='M11.8154 15.0557L13.9958 15.0557L13.9958 24.8674L11.8154 24.8674L11.8154 15.0557Z' fill='%23269E86'/%3E%3Cpath d='M6.36426 15.0557L12.9054 15.0557L12.9054 24.8674L6.36426 24.8674L6.36426 15.0557Z' fill='white'/%3E%3Cellipse cx='8.19098' cy='17.0098' rx='1.19' ry='1.19' fill='%23269E86'/%3E%3C/svg%3E");
      }

      &:focus {
        outline: none;
      }
    }

    &__feedback {
      // margin-left: 14px;
      // margin-right: 14px;
      // margin-bottom: 14px;
      position: relative;

      margin-top: 20px;

      font-size: 14px;
      color: #364339;

      background: #ffffff;
      border-radius: 8px;

      &:after {
        content: '';

        position: absolute;

        top: -10px;
        right: 12px;

        height: 10px;
        width: 12px;

        background: url("data:image/svg+xml,%3Csvg width='10' height='12' viewBox='0 0 10 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 12L10 -4.37114e-07C10 5.25859 5.94635 9.79557 0 12L10 12Z' fill='white'/%3E%3C/svg%3E%0A");
      }
    }

    &__edit {
      margin-top: 7px;
    }

    &--picked {
      cursor: pointer;

      &:hover {
        .message-circle {
          background: #C6C6C6;
        }

        .message-circle.message-circle--picked {
          background: #5C4C80;
        }
      }
    }
  }

  .message-circle {
    position: absolute;

    top: 50%;
    right: 40px;

    display: flex;
    align-items: center;
    justify-content: center;

    transform: translateY(-50%);

    width: 26px;
    height: 26px;

    background: #D6D6D6;
    border-radius: 26px;

    transition: .3s;

    &--picked {
      background: #9173D0;
    }
  }

  .opacity-message {
    opacity: 0.35;
  }
</style>

