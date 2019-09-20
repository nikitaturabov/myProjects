<template>
  <div class="message">
    <div class="message__body message__body--tech" :class="[{ 'message__body--picked': isSupportMode }]">
      <div class="message__title" :class="`message__title--${stage}`">
        {{ getMessageTitle() }}
      </div>

      <div class="message__content">
        <div class="message__inner" :class="[ `message__inner--${stage}` ]">
          <p class="message__text message__text--tech" v-html="text">
            <!-- {{ text }} -->
          </p>

          <div v-show="!isEditComment && !isShowComment && !setResolved" class="message__feedback feedback">
            <div v-if="feedback.text" class="feedback__content">
              <p class="feedback__description">{{ feedback.text }}</p>
              <button @click="editComment" class="feedback__btn-edit">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.32373 0.0175781L9.34131 0H9.30566L9.32373 0.0175781Z" fill="white"/>
                  <path d="M9.32373 0.0175781L7.7876 1.54932L10.4824 4.23584L12 2.68652L9.32373 0.0175781Z" fill="white"/>
                  <path d="M2.15527 7.16406L6.64648 2.68652L9.34082 5.37305L4.8501 9.85059L2.15527 7.16406Z" fill="white"/>
                  <path d="M0.898438 8.41797L0 12L3.59277 11.1045L0.898438 8.41797Z" fill="white"/>
                </svg>
              </button>
            </div>

            <div v-if="!feedback.text" class="feedback__item">
              <span class="feedback__text">
                Оставить комментарий
              </span>
              <button @click="showComment" class="feedback__btn">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.99982 0C6.54498 0 6.17627 0.368713 6.17627 0.823547V6.17645H0.823547C0.368713 6.17645 0 6.5451 0 6.99994C0 7.45477 0.368713 7.82349 0.823547 7.82349H6.17627V13.1765C6.17627 13.6312 6.54498 14 6.99982 14C7.45465 14 7.82336 13.6312 7.82336 13.1764V7.82349H13.1765C13.6313 7.82349 14 7.45477 14 6.99994C14 6.5451 13.6313 6.17645 13.1765 6.17645H7.82336V0.823547C7.82336 0.368713 7.45465 0 6.99982 0Z" fill="white"/>
                </svg>
              </button>
            </div>
          </div>

          <span v-if="feedback.type"
                  class="message__icon"
                  
                  :class="[ `message__icon--${feedback.type}` ]">

          </span>
        </div>
      </div>
      <div v-if="isShowComment || isEditComment" class="message__edit edit">
        <div class="edit__input-wrap">
          <textarea placeholder="Напишите комментарий" class="edit__textarea" v-model="comment"></textarea>
          <button class="edit__btn-cancel" @click="handleCancelButton">
            Отменить
          </button>
        </div>
        <a href="" class="edit__btn-send" @click="sendMessage">
          <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.8591 8.13885C21.0937 8.38938 21.0282 8.80217 20.7158 8.93933C20.3699 9.09164 20.0157 9.2262 19.6645 9.36683C18.4497 9.85318 17.2349 10.3387 16.0201 10.8246C14.6417 11.3758 13.2634 11.9266 11.8851 12.4783C10.5236 13.0231 9.16256 13.5683 7.8015 14.113C6.47365 14.6444 5.14581 15.1748 3.81796 15.7062C2.77657 16.1229 1.73517 16.5391 0.69421 16.9562C0.493609 17.0367 0.310265 17.0073 0.154099 16.8589C-0.000772933 16.7118 -0.0339906 16.5283 0.0324447 16.328C0.325796 15.4453 0.620441 14.5635 0.914654 13.6812C1.48108 11.9803 2.04794 10.2794 2.61177 8.57803C2.62731 8.53087 2.62731 8.46986 2.61177 8.4227C1.75847 5.85338 0.902575 3.28492 0.0453867 0.717331C-0.0244998 0.507909 -0.0171661 0.315361 0.142883 0.152669C0.294303 -0.000936223 0.480668 -0.0390131 0.680405 0.0401694C1.42457 0.334832 2.16743 0.634255 2.91073 0.931514C4.20752 1.45031 5.50387 1.96867 6.80065 2.48747C8.12375 3.01665 9.44685 3.54627 10.7695 4.07545C12.1332 4.62107 13.4972 5.16713 14.8609 5.71318C16.2535 6.27049 17.646 6.8278 19.039 7.3851C19.592 7.60621 20.146 7.82602 20.6986 8.04885C20.7551 8.07092 20.806 8.10813 20.8591 8.13885ZM2.37321 14.5578C7.9197 12.3429 10.1246 11.5203 15.6508 9.31318C15.6249 9.29846 15.6025 9.29673 15.58 9.29673C10.8329 9.29673 8.88991 9.34 4.14281 9.33827C4.07723 9.33827 4.01253 9.40361 3.99311 9.46202C3.37147 11.3377 3.13635 12.2611 2.51342 14.1364C2.41161 14.4436 2.48192 14.2311 2.37321 14.5578ZM15.5235 7.75895C15.5235 7.74986 15.5235 7.74078 15.5235 7.73169C9.99472 5.5241 7.83083 4.70069 2.28952 2.48747C2.30246 2.52858 2.3098 2.55324 2.31799 2.5779C3.03368 4.73141 3.27527 5.45703 3.98837 7.6114C4.01339 7.68755 4.0479 7.70573 4.12469 7.70573C8.85928 7.70356 10.7039 7.74683 15.4385 7.7477C15.467 7.74813 15.4955 7.75505 15.5235 7.75895Z" fill="white"/>
          </svg>
        </a>
      </div>
      <div class="message__reactions reactions" v-if="setResolved">
        <a href="#" class="reactions__btn reactions__btn--small">
          <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.10347 9.90479H0.66748V19.7447H7.10347V9.90479Z" fill="#009646"/>
            <path d="M22.4259 11.2008C23.5986 10.028 23.2363 7.67289 21.2054 7.67289H15.8754C16.0852 6.53825 16.3713 4.66943 16.3617 4.4978C16.1771 3.1658 15.7643 1.8756 15.1413 0.683881C14.865 0.402 14.5204 0.196686 14.1409 0.0880445C13.7615 -0.0205969 13.3604 -0.0288411 12.9769 0.064119C11.6992 0.340628 11.5657 1.16062 11.5657 1.37992C11.5657 1.37992 11.6229 3.61107 11.6325 4.24036C11.0222 5.54663 8.91504 9.07451 8.27621 9.35102C8.12447 9.25698 7.94938 9.20743 7.77086 9.208H1.02976C0.894529 9.208 0.760623 9.23463 0.635687 9.28638C0.510751 9.33813 0.397231 9.41399 0.301609 9.50961C0.205987 9.60523 0.130136 9.71875 0.0783857 9.84369C0.0266355 9.96862 0 10.1025 0 10.2378L0 19.5437C0.0145959 19.7866 0.121459 20.0146 0.298714 20.1813C0.475969 20.3479 0.710208 20.4404 0.95348 20.44H7.01761C7.27049 20.44 7.51302 20.3395 7.69183 20.1607C7.87064 19.9819 7.97109 19.7394 7.97109 19.4865V19.1814C8.08455 19.1701 8.19906 19.1865 8.30481 19.2291C8.73427 19.5578 9.25233 19.7504 9.79224 19.7821H18.8217C22.197 19.7821 21.8347 16.7882 21.5296 16.3782C21.855 16.0421 22.0711 15.6154 22.1493 15.1542C22.2276 14.693 22.1645 14.2189 21.9682 13.7942C22.3011 13.461 22.5235 13.0335 22.6054 12.5696C22.6873 12.1057 22.6246 11.6279 22.4259 11.2008ZM6.80785 19.4674H0.95348V10.1805H6.80785V19.4674ZM20.8526 11.115L20.7954 11.3438C22.3496 11.7919 21.52 13.5845 20.4045 13.6989V13.9277C21.8919 14.3091 21.1768 16.1493 20.0135 16.2828L19.9563 16.5117C21.1768 16.7119 20.9098 18.7809 19.0029 18.7809H9.81131C9.16294 18.7809 8.57179 18.0372 8.09505 18.0372H7.67552V10.8861C8.20106 10.5749 8.70443 10.2276 9.18201 9.84683C9.85899 9.27474 12.5955 4.85059 12.5955 4.29757C12.5955 3.74455 12.5383 1.34178 12.5383 1.34178C12.5383 1.34178 13.0722 0.664812 14.3022 1.17016C14.8655 2.22949 15.2428 3.37761 15.4178 4.56455C15.4178 4.56455 14.9315 7.64429 14.6836 8.65498H21.0528C22.6166 8.65498 22.321 10.8861 20.8526 11.115Z" fill="#009646"/>
            <path d="M4.90023 10.6069H4.8907C4.3799 10.6069 3.96582 11.021 3.96582 11.5318V11.5413C3.96582 12.0521 4.3799 12.4662 4.8907 12.4662H4.90023C5.41103 12.4662 5.82511 12.0521 5.82511 11.5413V11.5318C5.82511 11.021 5.41103 10.6069 4.90023 10.6069Z" fill="white"/>
            <path d="M4.90023 13.0793H4.8907C4.3799 13.0793 3.96582 13.4934 3.96582 14.0042V14.0138C3.96582 14.5246 4.3799 14.9386 4.8907 14.9386H4.90023C5.41103 14.9386 5.82511 14.5246 5.82511 14.0138V14.0042C5.82511 13.4934 5.41103 13.0793 4.90023 13.0793Z" fill="white"/>
          </svg>
        </a>
        <a href="#" class="reactions__btn reactions__btn--small">
          <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.10298 10.5354H0.666992V0.695484H7.10298V10.5354Z" fill="#E24D4D"/>
            <path d="M22.4254 9.23892C23.5981 10.4117 23.2358 12.7668 21.2049 12.7668H15.875C16.0847 13.9014 16.3708 15.7703 16.3612 15.9419C16.1766 17.2739 15.7638 18.5641 15.1408 19.7558C14.8646 20.0377 14.5199 20.243 14.1405 20.3517C13.7611 20.4603 13.3599 20.4685 12.9764 20.3756C11.6987 20.0991 11.5652 19.2791 11.5652 19.0598C11.5652 19.0598 11.6224 16.8286 11.632 16.1993C11.0217 14.8931 8.91455 11.3652 8.27572 11.0887C8.12398 11.1827 7.94889 11.2323 7.77038 11.2317H1.02927C0.894041 11.2317 0.760135 11.2051 0.635199 11.1533C0.510263 11.1016 0.396743 11.0257 0.301121 10.9301C0.205499 10.8345 0.129648 10.7209 0.0778974 10.596C0.0261472 10.4711 -0.000488281 10.3372 -0.000488281 10.2019L-0.000488281 0.895969C0.0141077 0.653135 0.120971 0.425062 0.298226 0.258444C0.475481 0.0918236 0.70972 -0.000741959 0.952992 -0.000303268H7.01713C7.27001 -0.000303268 7.51253 0.100151 7.69134 0.278965C7.87015 0.457777 7.97061 0.700298 7.97061 0.953178V1.25829C8.08406 1.2696 8.19857 1.25324 8.30433 1.21062C8.73378 0.881874 9.25184 0.689262 9.79175 0.657598H18.8212C22.1965 0.657598 21.8342 3.65153 21.5291 4.06153C21.8545 4.3976 22.0706 4.82431 22.1489 5.28552C22.2271 5.74672 22.164 6.22083 21.9677 6.64546C22.3006 6.97872 22.5231 7.40624 22.6049 7.87012C22.6868 8.33401 22.6241 8.81185 22.4254 9.23892ZM6.80736 0.972248H0.952992V10.2591H6.80736V0.972248ZM20.8521 9.32474L20.7949 9.0959C22.3491 8.64777 21.5196 6.85522 20.404 6.74081V6.51197C21.8914 6.13058 21.1763 4.29036 20.0131 4.15687L19.9559 3.92804C21.1763 3.72781 20.9093 1.65875 19.0024 1.65875H9.81082C9.16246 1.65875 8.5713 2.40247 8.09456 2.40247H7.67503V9.55357C8.20058 9.86483 8.70395 10.2121 9.18153 10.5929C9.8585 11.165 12.595 15.5891 12.595 16.1421C12.595 16.6951 12.5378 19.0979 12.5378 19.0979C12.5378 19.0979 13.0717 19.7749 14.3017 19.2695C14.865 18.2102 15.2423 17.0621 15.4173 15.8751C15.4173 15.8751 14.931 12.7954 14.6831 11.7847H21.0524C22.6161 11.7847 22.3205 9.55357 20.8521 9.32474Z" fill="#E24D4D"/>
            <path d="M4.89974 9.83276H4.89021C4.37941 9.83276 3.96533 9.41868 3.96533 8.90789V8.89835C3.96533 8.38756 4.37941 7.97348 4.89021 7.97348H4.89974C5.41054 7.97348 5.82462 8.38756 5.82462 8.89835V8.90789C5.82462 9.41868 5.41054 9.83276 4.89974 9.83276Z" fill="white"/>
            <path d="M4.89974 7.36011H4.89021C4.37941 7.36011 3.96533 6.94603 3.96533 6.43523V6.4257C3.96533 5.9149 4.37941 5.50082 4.89021 5.50082H4.89974C5.41054 5.50082 5.82462 5.9149 5.82462 6.4257V6.43523C5.82462 6.94603 5.41054 7.36011 4.89974 7.36011Z" fill="white"/>
          </svg>
        </a>
        <button class="reactions__btn reactions__btn--big" @click="addQuestionComment">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.0743 2.92559C13.1737 -0.975006 6.82658 -0.97539 2.92559 2.92559C-0.97539 6.82658 -0.975006 13.1733 2.92559 17.0743C6.82619 20.9752 13.1733 20.9752 17.0743 17.0743C20.9749 13.1733 20.9749 6.82619 17.0743 2.92559ZM13.9452 13.9452C13.6446 14.2457 13.1575 14.2457 12.857 13.9452L9.99993 11.0881L7.00704 14.081C6.70652 14.3815 6.21938 14.3815 5.91886 14.081C5.61834 13.7805 5.61834 13.2933 5.91886 12.9928L8.91175 9.99993L6.05469 7.14287C5.75417 6.84235 5.75417 6.35483 6.05469 6.05469C6.35521 5.75417 6.84235 5.75417 7.14287 6.05469L9.99993 8.91175L12.7208 6.19091C13.0213 5.89039 13.5084 5.89039 13.8089 6.19091C14.1095 6.49143 14.1095 6.97857 13.8089 7.27909L11.0881 9.99993L13.9452 12.857C14.2457 13.1575 14.2457 13.6446 13.9452 13.9452Z" fill="#E24D4D"/>
          </svg>
          Мой вопрос не решен
        </button>
      </div>
      <!-- <ul class="message__files" v-for="(file, index) in files" :key="index">
        <li class="message__file">
          {{ file.name }}
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script>

import Message from '@/src/mixins/Message.vue'; 

import { setFeedback } from '@/src/utils/globals.js';

export default {
  mixins: [ Message ],
  data() {
    return {
      isShowComment: false,
      isEditComment: false,
      comment: ''
    }
  },
  methods: {
    showReaction() {
      if (this.feedback.text.length !== 0) { return; }

      this.isShowComment = false;
    },
    showComment() {
      this.isShowComment = !this.isShowComment;
    },
    editComment() {
      this.isEditComment = !this.isEditComment;
      this.comment = this.feedback.text;
    },
    handleCancelButton() {
      this.isShowComment = false;
      this.isEditComment = false;
    },
    sendMessage(e) {
      this.isEditComment = false;

      setFeedback(this.id, this.comment);
    },
    addQuestionComment() {
      this.isEditComment = true;
    }
  }
}
</script>

<style lang="scss">
  .reactions {
    display: flex;

    justify-content: center;
    align-items: center;

    padding-top: 7px;


    &__btn {
      display: flex;
      justify-content: center;
      align-items: center;

      height: 46px;

      background: #F1F1F1;
      border-radius: 12px;

      transition: background .2s;

      &--small {
        margin-right: 9px;

        width: 56px;
      }

      &--big {
        padding-right: 20px;
        padding-left: 20px;

        font-weight: bold;
        font-size: 14px;

        color: #E24D4D;

        svg {
          margin-right: 7px;
        }
      }

      &:focus {
        outline: none;
      }

      &:hover {
        background: #C6C6C6;
      }
    }
  }

  .feedback {
    &__item {
      display: flex;
      justify-content: space-between;
      align-items: center;

      padding-right: 20px;
      padding-left: 20px;

      height: 45px;
    }

    &__content {
      position: relative;
    }

    &__description {
      padding-top: 13px;
      padding-bottom: 13px;
      padding-left: 21px;
      padding-right: 40px;

      white-space: pre-line;
    }

    &__text {
      font-size: 14px;

      color: #20AE58;
    }

    &__btn {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 22px;
      height: 22px;

      background: #20AE58;
      border-radius: 6px;
    
      cursor: pointer;

      &:focus {
        outline: none;
      }
    }

    &__btn-edit {
      position: absolute;

      right: 11px;
      bottom: 11px;

      display: flex;
      justify-content: center;
      align-items: center;

      width: 22px;
      height: 22px;

      background: #20AE58;
      border-radius: 6px;
    }
  }

  .edit {
    display: flex;
    padding-right: 15px;
    
    &__input-wrap {
      display: flex;
      flex: 1;

      flex-direction: column;
    }
    
    &__textarea {
      flex: 1;
      min-height: 82px;

      padding: 14px 21px;

      font-family: Arial, Helvetica;
      font-size: 14px;
      color: #364339;

      background: #F1F1F1;

      border: 0;
      border-radius: 8px;
    
      box-sizing: border-box;
      overflow-y: auto;

      resize: none;
    }

    &__btn-cancel {
      margin-top: 5px;

      max-width: 98px;
      height: 25px;

      font-weight: bold;
      font-size: 12px;
      text-transform: uppercase;

      color: #848484;

      border: 1px solid #858585;
      background: transparent;

      box-sizing: border-box;
      border-radius: 8px;

      transition: background .2s;

      &:focus {
        outline: none;
      }

      &:hover {
        background: #EAEAEA;
      }
    }

    &__btn-send {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 38px;
      height: 38px;

      margin-top: 4px;
      margin-left: 16px;
      
      background: #B1B1B1;
      border-radius: 10px;

      transition: background .2s;

      &:hover {
        background: #6E6E6E;
      }
    }
  }
</style>

