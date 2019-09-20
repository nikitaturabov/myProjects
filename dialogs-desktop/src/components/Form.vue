<template>
  <div class="form" :class="{ 'form--edit': isSupportMode }">
    <!-- <span class="form__title" v-if="!isSupportMode">
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.0361 3.47253V3.46344C10.0361 3.09692 9.73793 2.7998 9.37008 2.7998L0.665796 2.7998C0.297946 2.7998 -0.000255585 3.09692 -0.000255585 3.46344V3.47253C-0.000255585 3.83905 0.297946 4.13617 0.665796 4.13617L9.37008 4.13617C9.73793 4.13617 10.0361 3.83905 10.0361 3.47253Z" fill="#00640B"/>
        <path d="M10.0361 6.80261V6.79352C10.0361 6.427 9.73793 6.12988 9.37008 6.12988L0.665795 6.12988C0.297945 6.12988 -0.000255585 6.427 -0.000255585 6.79352V6.80261C-0.000255585 7.16913 0.297945 7.46625 0.665795 7.46625L9.37008 7.46625C9.73793 7.46625 10.0361 7.16913 10.0361 6.80261Z" fill="#00640B"/>
        <path d="M6.68848 10.1284H6.6976C7.06524 10.1284 7.36328 9.8313 7.36328 9.46478L7.36328 0.792053C7.36328 0.425537 7.06524 0.128418 6.6976 0.128418H6.68848C6.32083 0.128418 6.02279 0.425537 6.02279 0.792053L6.02279 9.46478C6.02279 9.8313 6.32083 10.1284 6.68848 10.1284Z" fill="#00640B"/>
        <path d="M3.34033 10.1284H3.34945C3.7171 10.1284 4.01514 9.8313 4.01514 9.46478L4.01514 0.792053C4.01514 0.425537 3.7171 0.128418 3.34945 0.128418H3.34033C2.97268 0.128418 2.67465 0.425537 2.67465 0.792053L2.67465 9.46478C2.67465 9.8313 2.97268 10.1284 3.34033 10.1284Z" fill="#00640B"/>
      </svg>

      Согласовать бизнес-план
    </span> -->
    <div class="form__input-wrap">
      <div class="form__input" v-if="!isSupportMode">
        <div class="textarea-wrap" ref="textareaWrap"></div>

        <textarea class="form__textarea" 
                  placeholder="Введите описание..."

                  ref="textarea"

                  :value="formText"
                  :class="{ 'form__textarea--has-quote': quote }"
                
                  @input="handleInput"
                >
        </textarea>
        
        <div class="form__quote quote" v-if="quote && quote.id">
          <div class="quote__content">
            <!-- <p class="quote__text" v-html="quote.text"> -->
            <p class="quote__text">{{ quote.text }}
              <button class="quote__close" @click="closeQuote">
                <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M14 7.5C14 11.366 10.866 14.5 7 14.5C3.13403 14.5 0 11.366 0 7.5C0 3.63403 3.13403 0.5 7 0.5C10.866 0.5 14 3.63403 14 7.5ZM3.88263 10.6174C3.67133 10.406 3.67133 10.0635 3.88263 9.85205L6.23553 7.49902L3.88446 5.14795C3.67316 4.93652 3.67316 4.59399 3.88446 4.38281C4.09576 4.17139 4.43835 4.17139 4.64972 4.38281L7.00079 6.73389L9.35199 4.38257C9.56329 4.17139 9.90588 4.17139 10.1172 4.38257C10.3285 4.59399 10.3285 4.93652 10.1172 5.14795L7.76605 7.49902L10.1191 9.85205C10.3304 10.0635 10.3304 10.406 10.1191 10.6174C9.90778 10.8286 9.56519 10.8286 9.35388 10.6174L7.00085 8.2644L4.64783 10.6174C4.51758 10.7476 4.33752 10.7976 4.16901 10.7673C4.06409 10.7485 3.96368 10.6985 3.88263 10.6174Z" fill="#765FA7"/>
                </svg>
              </button>
            </p>
            <div class="quote__title">
              {{ quote.author }} · {{ quote.service }} · {{ getDate(quote.unix) }}
            </div>
          </div>
        </div>
      </div>

      <div class="form__support support" v-if="isSupportMode">
        <span class="support__text">
          {{ getSupportText }}
        </span>
        <button class="support__btn-back"
                @click="backToNormalMode">
          Отменить
        </button>
      </div>


      <a href="#" class="form__send-btn"
                  :class="{ 'form__send-btn--purple': isPrivateMessage,
                            'form__send-btn--support': isSupportMode }"
                            
                  @click="sendForm">
        <svg v-if="isSupportMode" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M3.6716 6.73162C3.78354 5.78999 4.03626 4.78399 4.56515 3.92817C5.30243 2.73517 6.64692 1.71762 9.29429 1.71762C11.6389 1.71762 12.86 2.70031 13.5486 3.89959C14.0448 4.7638 14.2854 5.78218 14.3886 6.73162H13.4023C12.8501 6.73162 12.4023 7.17974 12.4023 7.73251V12.9139C12.4023 13.4667 12.8501 13.9148 13.4023 13.9148H14.333C14.2514 14.2071 14.1076 14.4732 13.8958 14.6909C13.5488 15.0476 12.9246 15.3711 11.8076 15.3711H10.8709C10.5803 14.6451 9.85238 14.1303 9.00032 14.1303C7.8927 14.1303 6.9948 15.0001 6.9948 16.0732C6.9948 17.1462 7.8927 18.0161 9.00032 18.0161C9.77297 18.0161 10.4436 17.5928 10.7785 16.9725H11.8076C13.2442 16.9725 14.3237 16.5465 15.042 15.8082C15.5813 15.2539 15.8628 14.5792 15.9669 13.9148H16.5002C17.0525 13.9148 17.5002 13.4667 17.5002 12.9139V7.73251C17.5002 7.17974 17.0525 6.73162 16.5002 6.73162H16.0974C15.9892 5.57698 15.7026 4.23616 15.0225 3.05175C14.0294 1.32228 12.245 0.0161133 9.29429 0.0161133C6.11249 0.0161133 4.19411 1.29404 3.11938 3.0331C2.38222 4.22592 2.07892 5.57671 1.9611 6.73162H1.5C0.947716 6.73162 0.5 7.17974 0.5 7.73251V12.9139C0.5 13.4667 0.947715 13.9148 1.5 13.9148H4.59783C5.15011 13.9148 5.59783 13.4667 5.59783 12.9139V7.73251C5.59783 7.17974 5.15011 6.73162 4.59783 6.73162H3.6716ZM4.09783 8.23295V12.4135H2.79622V8.23295H4.09783ZM15.2238 12.4135V8.23295H13.9023V12.4135H15.2238Z" fill="white"/>
        </svg>
        <svg v-else width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.8926 6.20103C16.0714 6.39191 16.0215 6.70641 15.7835 6.81092C15.5199 6.92696 15.25 7.02949 14.9825 7.13663C14.0569 7.50718 13.1313 7.87707 12.2058 8.24729C11.1556 8.66729 10.1055 9.08696 9.05532 9.50729C8.01799 9.92234 6.981 10.3377 5.944 10.7528C4.93231 11.1576 3.92062 11.5618 2.90892 11.9666C2.11548 12.2841 1.32204 12.6012 0.528922 12.919C0.376083 12.9804 0.236393 12.9579 0.117409 12.8449C-0.000588894 12.7328 -0.0258976 12.593 0.0247198 12.4404C0.248225 11.7678 0.472717 11.096 0.696879 10.4238C1.12844 9.12784 1.56033 7.8319 1.98992 6.53564C2.00176 6.49971 2.00176 6.45323 1.98992 6.41729C1.33979 4.45971 0.687676 2.5028 0.0345803 0.546538C-0.0186665 0.386978 -0.0130789 0.240275 0.108863 0.116319C0.224231 -0.000713314 0.366223 -0.0297242 0.518404 0.0306053C1.08538 0.25511 1.65138 0.483242 2.2177 0.709725C3.20573 1.105 4.19342 1.49994 5.18145 1.89522C6.18952 2.2984 7.1976 2.70192 8.20534 3.1051C9.24432 3.52082 10.2836 3.93686 11.3226 4.3529C12.3836 4.77752 13.4446 5.20213 14.5059 5.62675C14.9273 5.79521 15.3493 5.96268 15.7703 6.13246C15.8134 6.14927 15.8522 6.17762 15.8926 6.20103ZM1.80816 11.0917C6.03406 9.4041 7.71396 8.7774 11.9244 7.09575C11.9047 7.08454 11.8876 7.08323 11.8705 7.08323C8.25366 7.08323 6.77327 7.11619 3.15642 7.11487C3.10646 7.11487 3.05716 7.16465 3.04237 7.20916C2.56874 8.63828 2.3896 9.34179 1.91498 10.7706C1.83741 11.0046 1.89099 10.8428 1.80816 11.0917ZM11.8274 5.91158C11.8274 5.90466 11.8274 5.89773 11.8274 5.89081C7.61503 4.20884 5.96635 3.58148 1.7444 1.89522C1.75426 1.92653 1.75984 1.94533 1.76609 1.96412C2.31138 3.60488 2.49544 4.15774 3.03876 5.79916C3.05782 5.85718 3.08411 5.87103 3.14262 5.87103C6.74993 5.86938 8.15538 5.90235 11.7627 5.90301C11.7844 5.90334 11.8061 5.90861 11.8274 5.91158Z" fill="#3e3e3e"/>
        </svg>
      </a>

      <div class="form__action-wrap" v-click-outside="() => this.isIncreaseWidth = false" v-if="!isEditMode && !isSupportMode">
        <button @click="increaseWidth" class="form__action-arrow" :class="{ 'form__action-arrow--invisible': isIncreaseWidth }">
          <svg width="7" height="16" viewBox="0 0 7 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 15L1 8L6 1" stroke="#B2B2B2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <!-- <ul class="form__action-buttons" :class="{ 'form__action-buttons--active': isIncreaseWidth }" v-if="!isSupportMode"> -->
        <ul class="form__action-buttons" :class="{ 'form__action-buttons--active': isIncreaseWidth }">
          <li class="form__action-item">
            <button class="form__action-btn" @click="sendToSupport">
              <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.1716 7.45955C3.28354 6.51876 3.53626 5.51364 4.06515 4.65859C4.80243 3.46664 6.14692 2.45 8.79429 2.45C11.1389 2.45 12.36 3.43181 13.0486 4.63003C13.5448 5.49348 13.7854 6.51095 13.8886 7.45955H12.9023C12.3501 7.45955 11.9023 7.90727 11.9023 8.45955V13.6364C11.9023 14.1887 12.3501 14.6364 12.9023 14.6364H13.833C13.7514 14.9284 13.6076 15.1943 13.3958 15.4118C13.0488 15.7681 12.4246 16.0914 11.3076 16.0914H10.3709C10.0803 15.366 9.35238 14.8516 8.50032 14.8516C7.3927 14.8516 6.4948 15.7207 6.4948 16.7928C6.4948 17.8649 7.3927 18.734 8.50032 18.734C9.27297 18.734 9.94357 18.3111 10.2785 17.6914H11.3076C12.7442 17.6914 13.8237 17.2657 14.542 16.5281C15.0813 15.9743 15.3628 15.3002 15.4669 14.6364H16.0002C16.5525 14.6364 17.0002 14.1887 17.0002 13.6364V8.45955C17.0002 7.90727 16.5525 7.45955 16.0002 7.45955H15.5974C15.4892 6.30593 15.2026 4.9663 14.5225 3.78295C13.5294 2.05501 11.745 0.75 8.79429 0.75C5.61249 0.75 3.69411 2.02679 2.61938 3.76431C1.88222 4.95607 1.57892 6.30566 1.4611 7.45955H1C0.447716 7.45955 0 7.90727 0 8.45955V13.6364C0 14.1887 0.447715 14.6364 1 14.6364H4.09783C4.65011 14.6364 5.09783 14.1887 5.09783 13.6364V8.45955C5.09783 7.90727 4.65011 7.45955 4.09783 7.45955H3.1716ZM3.59783 8.95955V13.1364H2.29622V8.95955H3.59783ZM14.7238 13.1364V8.95955H13.4023V13.1364H14.7238Z" fill="#7C7C7C"/>
              </svg>
            </button>
          </li>
          <li class="form__action-item">
            <button class="form__action-btn" @click="togglePrivateMessage">
              <svg v-if="!isPrivateMessage" width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.44204 11.9124C7.83636 11.6725 8.09993 11.2369 8.09993 10.7393C8.09993 9.98269 7.49047 9.36934 6.73866 9.36934C5.98688 9.36934 5.37743 9.98269 5.37743 10.7393C5.37743 11.2368 5.64097 11.6724 6.03523 11.9124V13.5679H7.44204V11.9124Z" fill="#7C7C7C"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.66667 0C2.85714 0 1.90476 2.94352 1.90476 4.52482V6.43739H1.76958C0.792267 6.43739 0 7.23289 0 8.21418V14.2232C0 15.2045 0.792266 16 1.76958 16H11.5638C12.5411 16 13.3333 15.2045 13.3333 14.2232V8.21418C13.3333 7.23289 12.5411 6.43739 11.5638 6.43739H3.61486V4.52482C3.61486 3.23218 4.32659 1.58276 6.66667 1.57969C9.08229 1.57969 9.35647 3.40867 9.51587 4.47191L9.52381 4.52482H11.2339C11.2339 2.73392 10.3105 0 6.66667 0ZM1.49259 8.88831C1.49259 8.39766 1.88873 7.99991 2.37738 7.99991H10.8879C11.3765 7.99991 11.7727 8.39766 11.7727 8.88831V13.6028C11.7727 14.0935 11.3765 14.4912 10.8879 14.4912H2.37738C1.88873 14.4912 1.49259 14.0935 1.49259 13.6028V8.88831Z" fill="#7C7C7C"/>
              </svg>
              <svg v-else width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.47236 11.9124C7.86828 11.6725 8.13293 11.2369 8.13293 10.7393C8.13293 9.98269 7.52099 9.36934 6.76611 9.36934C6.01127 9.36934 5.39933 9.98269 5.39933 10.7393C5.39933 11.2368 5.66395 11.6724 6.05981 11.9124V13.5679H7.47236V11.9124Z" fill="#7C7C7C"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.91252 4.52482C1.91252 2.94352 2.86878 0 6.69382 0C10.3525 0 11.2797 2.73392 11.2797 4.52482V6.43739H11.6109C12.5922 6.43739 13.3876 7.23289 13.3876 8.21418V14.2232C13.3876 15.2045 12.5922 16 11.6109 16H1.77679C0.795493 16 0 15.2045 0 14.2232V8.21418C0 7.23289 0.795494 6.43739 1.77679 6.43739H1.91252V4.52482ZM9.55463 4.47191L9.56261 4.52482V6.43739H3.62958V4.52482C3.62958 3.23218 4.34422 1.58276 6.69382 1.57969C9.11929 1.57969 9.39459 3.40867 9.55463 4.47191ZM1.49867 8.88831C1.49867 8.39766 1.89642 7.99991 2.38707 7.99991H10.9322C11.4229 7.99991 11.8206 8.39766 11.8206 8.88831V13.6028C11.8206 14.0935 11.4229 14.4912 10.9322 14.4912H2.38707C1.89642 14.4912 1.49867 14.0935 1.49867 13.6028V8.88831Z" fill="#7C7C7C"/>
              </svg>
            </button>
          </li>
          <li class="form__action-item">
            <dropdown
                      :items="templates"
                      
                      @dropdown:set="setText">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5397 7.20066H4.48267V9.00058H7.60897V14.4004H9.39943V9.00058H12.5397V7.20066Z" fill="#7C7C7C"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5365 0.000118031H4.4794C4.29878 -0.0022595 4.11948 0.0313028 3.95181 0.0988728C3.78415 0.166443 3.63143 0.266686 3.50246 0.39383C3.37349 0.520974 3.27081 0.672509 3.20033 0.839709C3.19183 0.859865 3.18382 0.8802 3.17631 0.900697H2.29178C1.68397 0.900697 1.10104 1.14343 0.671248 1.5755C0.241455 2.00756 0 2.59357 0 3.2046V15.6961C0 16.3071 0.241455 16.8931 0.671248 17.3252C1.10104 17.7573 1.68397 18 2.29178 18H14.7176C15.3254 18 15.9083 17.7573 16.3381 17.3252C16.7679 16.8931 17.0093 16.3071 17.0093 15.6961V3.2046C17.0093 2.59357 16.7679 2.00756 16.3381 1.5755C15.9083 1.14343 15.3254 0.900697 14.7176 0.900697H13.8216C13.7532 0.714189 13.6448 0.542991 13.5018 0.400229C13.2452 0.143945 12.8982 0.000110264 12.5365 0.000118031ZM12.1336 1.80004V3.64497H4.88226V1.80004H12.1336ZM3.0918 4.06795V2.70062H2.29178C2.15882 2.70062 2.03131 2.75372 1.93729 2.84824C1.84328 2.94275 1.79046 3.07094 1.79046 3.2046V15.6961C1.79046 15.8298 1.84328 15.9579 1.93729 16.0525C2.03131 16.147 2.15882 16.2001 2.29178 16.2001H14.7176C14.8505 16.2001 14.978 16.147 15.072 16.0525C15.1661 15.9579 15.2189 15.8298 15.2189 15.6961V3.2046C15.2189 3.07094 15.1661 2.94275 15.072 2.84824C14.978 2.75372 14.8505 2.70062 14.7176 2.70062H13.9062V4.06795C13.9038 4.43241 13.7588 4.78127 13.5024 5.03899C13.246 5.29671 12.899 5.44254 12.5365 5.4449H4.4794C4.29836 5.44608 4.11885 5.41141 3.95113 5.34285C3.78341 5.27429 3.63077 5.1732 3.50192 5.04533C3.37307 4.91747 3.27053 4.76535 3.20016 4.59765C3.12979 4.42995 3.09297 4.24996 3.0918 4.06795Z" fill="#7C7C7C"/>
              </svg>
            </dropdown>
          </li>
          <li class="form__action-item">
            <a class="form__action-btn" href="">
              <svg width="20" height="19" style="margin-top: 2px;" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.55822 7.65338L5.93323 6.38132L8.67713 8.91977L14.0671 3.89078L15.4421 5.16283L8.71134 11.4697L8.24043 11.043L8.23132 11.0514L4.55822 7.65338Z" fill="#7C7C7C"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.952381 0.360352C0.426395 0.360352 0 0.784503 0 1.30772V14.0972C0 14.6204 0.426395 15.0446 0.952381 15.0446H13.9855L18.5015 18.1891C18.7924 18.3917 19.1725 18.4164 19.4874 18.2533C19.8024 18.0901 20 17.7662 20 17.413V1.30772C20 0.784503 19.5736 0.360352 19.0476 0.360352H0.952381ZM1.90476 13.1498V2.25509H18.0952V15.5934L14.8319 13.3211C14.6718 13.2096 14.4811 13.1498 14.2857 13.1498H1.90476Z" fill="#7C7C7C"/>
              </svg>
            </a>
          </li>
          <li class="form__action-item">
            <label for="file" class="form__action-label">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.2338 2.78082C11.755 2.88187 11.6292 2.9866 11.5144 3.0606L11.3635 3.2L11.0571 3.50943C9.62231 4.94342 8.28533 6.32395 6.36541 8.2449L5.10491 9.50608C3.73184 10.8799 3.3415 11.393 2.93256 11.8661C2.54877 12.3101 2.25664 12.8108 2.24183 13.3666C2.22178 14.119 2.42897 14.5429 3.13041 15.2439C3.51052 15.6238 4.21377 15.8474 4.84429 15.7553C5.49409 15.6604 5.86285 15.4311 6.21668 15.1259L11.05 10.2059C11.6615 9.59474 11.4468 8.98675 11.2297 8.74765C11.1144 8.62055 10.9643 8.54072 10.7791 8.53625C10.5869 8.5316 10.3841 8.47677 9.98329 8.87734C9.64882 9.21163 9.34271 9.51279 9.06093 9.79002C8.69365 10.1514 8.36734 10.4724 8.07379 10.7728C7.91009 10.9403 7.76383 11.0942 7.6339 11.2367L5.28244 13.5869C5.08708 13.2659 4.94721 12.9201 4.89636 12.5458C4.80585 11.8796 5.02383 11.3145 5.32663 10.8313C5.62729 10.3515 6.07384 9.85608 6.59618 9.32162C6.89492 9.01595 7.24259 8.67376 7.62327 8.29909C7.90562 8.0212 8.20629 7.72527 8.51843 7.4133C9.14963 6.78244 9.75791 6.65254 10.5403 6.67143C11.3297 6.6905 12.0574 6.99741 12.5751 7.56774C13.6242 8.7235 13.7084 10.4771 12.5149 11.6699L8.02161 16.3399L7.62032 16.7066C7.18507 17.1016 6.39954 17.5449 5.39089 17.6923C4.35102 17.8442 3.01488 17.657 1.86544 16.5082C0.637644 15.2811 0.236755 14.0713 0.328446 12.9197C0.415112 11.8312 0.905771 11.0329 1.46771 10.402C1.88342 9.93536 2.2669 9.41597 3.6405 8.0416L4.89997 6.78144C6.81443 4.86596 8.34401 3.29593 9.77902 1.8617C10.2539 1.34939 11.1286 0.838922 12.0202 0.798322C13.0094 0.753278 14.5872 0.946523 15.6229 1.98162C16.7843 3.14239 17.0427 4.5786 16.9967 5.68423C16.9531 6.73352 16.377 7.71248 15.8626 8.27863L15.1161 9.03713L14.2849 9.85544C14.2851 9.22247 14.3788 8.63173 13.6821 7.666L14.4007 6.85662C14.7673 6.33811 14.9529 5.86375 15.0175 5.41761C15.0689 5.06313 15.1403 4.12169 14.2787 3.26054C13.8548 2.8369 12.7319 2.67569 12.2338 2.78082Z" fill="#7C7C7C"/>
              </svg>
            </label>
            <input @input="loadFiles" class="hidden" type="file" id="file" multiple>
            <span v-if="files.length > 0" class="form__count" :class="{ 'form__count--purple': isPrivateMessage }">
              {{ files.length }}
            </span>
          </li>
        </ul>
      </div>
      <div v-else-if="isEditMode" class="form__action-wrap form__action-wrap--edit">
        <button class="form__action-btn form__action-btn--edit" @click="cancelEdit">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5207 0.47926C14.8817 -0.159754 13.8457 -0.159753 13.2067 0.47926L8 5.68593L2.79333 0.47926C2.15432 -0.159753 1.11827 -0.159754 0.47926 0.47926C-0.159753 1.11827 -0.159753 2.15432 0.47926 2.79333L5.68593 8L0.47926 13.2067C-0.159752 13.8457 -0.159753 14.8817 0.47926 15.5207C1.11827 16.1598 2.15432 16.1598 2.79333 15.5207L8 10.3141L13.2067 15.5207C13.8457 16.1598 14.8817 16.1598 15.5207 15.5207C16.1598 14.8817 16.1598 13.8457 15.5207 13.2067L10.3141 8L15.5207 2.79333C16.1598 2.15432 16.1598 1.11827 15.5207 0.47926Z" fill="#B2B2B2"/>
          </svg>
        </button>
      </div>
    </div>
    <ul class="form__files" v-if="!isSupportMode && files.length > 0 && !isEditMode">
      <li class="form__file file" v-for="(file, index) in files" :key="index">
        {{ file.name }}
        <button class="file__close-btn"
                @click="removeFile(file.id)"
              >
          <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="7.55753" height="0.927581" rx="0.463791" transform="matrix(0.707102 -0.707111 0.707102 0.707111 0.015625 5.34412)" fill="white"/>
            <rect width="7.55753" height="0.927581" rx="0.463791" transform="matrix(-0.707102 -0.707111 0.707102 -0.707111 5.36133 6)" fill="white"/>
          </svg>

        </button>
      </li>
    </ul>
  </div>
</template>

<script>

import Dropdown from '@/src/components/dropdown/Dropdown.vue';

import { getDate } from '@/src/utils/date.js';

export default {
  props: {
    quote: {
      type: Object,
      default: null
    },
    isSupportMode: {
      type: Boolean,
      default: false
    },
    isEditMode: {
      type: Boolean,
      default: false
    },
    pickedMessageCount: {
      type: Number,
      default: 0
    },
    templates: {
      type: Array,
      default: () => []
    },
    formText: {
      type: String,
      default: null
    },
    files: {
      type: Array,
      default: () => []
    },
    isPrivateMessage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isIncreaseWidth: false,
      messageText: ''
    }
  },
  methods: {
    removeFile(id) {
      for (let i = 0; i < this.files.length; i++) {
        if (this.files[i].id === id) {
          this.files.splice(i, 1);
        }
      }
    },
    getDate(date) {
      return getDate(date);
    },
    closeQuote() {
      this.$emit('quote:close');
    },
    togglePrivateMessage() {
      this.$emit('privateMode:set', !this.isPrivateMessage);
    },
    sendToSupport() {
      this.$emit('privateMode:set', false);

      this.$emit('supportMode:set', !this.isSupportMode);
    },
    backToNormalMode() {
      this.$emit('supportMode:set', false);
    },
    setText(value) {
      this.messageText = value.text;
    },
    increaseWidth() {
      this.isIncreaseWidth = true;
    },
    sendForm() {
      this.$emit('form:send');
    },
    handleInput(e) {
      let text = e.target.value;
      
      this.$refs.textareaWrap.innerHTML = text;

      this.$nextTick(() => {
        this.$refs.textarea.style.height = this.$refs.textareaWrap.scrollHeight + 'px';
      })

      this.$emit('formText:set', text);
    },
    cancelEdit() {
      this.$emit('editMode:cancel');
    },
    loadFiles(e) {
      let files = e.currentTarget.files;

      for (let i = 0; i < files.length; i++) {
        let name = files[i].name;
        let size = files[i].size;

        let reader = new FileReader();

        reader.readAsDataURL(files[i]);

        reader.addEventListener('load', () => {
          this.$emit('file:add', {
            id: name + '_' + Math.random().toString(16).substr(2, 9),
            name,
            size,
            base64: reader.result
          })
        })
      }
    },
  },
  computed: {
    getSupportText() {
      return this.pickedMessageCount === 0 ? 'Выберите сообщения для отправки в техническую поддержку':
             this.pickedMessageCount === 1 ? 'Выбрано 1 сообщение':
             this.pickedMessageCount === 2 || this.pickedMessageCount === 3 || this.pickedMessageCount === 4 ? `Выбрано ${this.pickedMessageCount} сообщения`: `Выбрано ${this.pickedMessageCount} сообщений`
    }
  },
  components: {
    Dropdown
  }
}
</script>

<style lang="scss">
  .form {
    padding: 13px 17px 7px 14px;
    
    box-shadow: 0px -2px 10px rgba(139, 139, 139, 0.25);

    &--edit {
      padding-top: 4px;
      padding-bottom: 15px;
    }

    &__title {
      display: flex;
      align-items: center;

      font-size: 10px;
      font-weight: 700;
      color: #00640B;

      text-transform: uppercase;

      svg {
        margin-right: 3px;
      }
    }

    &__input-wrap{
      position: relative;

      display: flex;
      align-items: center;

      padding-top: 11px;
    }

    &__action-wrap {
      position: absolute;

      top: 21px;
      right: 58px;

      display: flex;
      align-items: center;

      &--edit {
        top: 30px;
      }
    }

    &__action-arrow {
      display: flex;
      justify-content: center;
      align-items: center;

      margin-right: 6px;

      background: transparent;

      &--invisible {
        display: none;
      }
    }

    &__action-buttons {
      display: flex;
      justify-content: flex-end;

      width: 79px;
      height: 35px;

      transition: .1s;
      overflow: hidden;

      &--active {
        width: 122px;
      }
    }

    &__action-item {
      display: flex;
      align-items: center;

      margin-right: 6px;

      svg {
        path {
          transition: .2s;
        }
      }

      &:hover {
        svg {
          path {
            fill: #000;
          }
        }
      }
    }

    &__action-btn {
      &:hover {
        svg {
          path {
            fill: #1B1919;
          }
        }
      }
    }

    &__action-btn, &__action-label {
      display: flex;
      align-items: center;
      justify-content: center;

      background: transparent;

      cursor: pointer;

      &:focus {
        outline: none;
      }
    }

    &__input {
      position: relative;

      display: flex;
      flex-direction: column;
      // align-items: center;

      flex: 1;

      overflow: hidden;
    }

    &__support {
      display: flex;
      justify-content: space-between;

      flex: 1;
    }

    &__quote {
      padding: 11px;

      padding-right: 65px;

      background: #F0F0F0;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }

    &__textarea {
      flex: 1;

      min-height: 54px;
      
      padding: 11px;
      padding-right: 140px;

      font-family: Arial, Helvetica;
      font-size: 14px;
    
      border: 0;
      border-radius: 8px;

      background: #F0F0F0;
      
      box-sizing: border-box;
      resize: none;

      &--has-quote {
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
      }

      &:focus {
        outline: none;
      }
    }

    &__count {
      position: absolute;

      top: 18px;
      right: 0px;

      display: flex;
      justify-content: center;
      align-items: center;

      width: 14px;
      height: 14px;

      font-size: 10px;
      font-weight: 700;
      color: #3E3E3E;

      background: #FEDD46;
      border-radius: 14px;
      
      &--purple {
        background: #9173D0;
        color: #fff;
      }
    }

    &__send-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      align-self: flex-start;

      margin-top: 11px;

      width: 30px;
      height: 30px;

      margin-left: 14px;

      background: #FEDD46;
      border-radius: 5px;

      transition: background .2s;

      &:hover  {
        background: #D3B83F;
      }

      &--support {
        align-self: center;
        margin-top: 0px;

        background: #9173D0;
      }

      &--purple {
        position: relative;

        background: #9173D0;

        svg {
          path {
            fill: #fff;
          }
        }

        &:after {
          content: '';

          position: absolute;

          bottom: -4px;
          right: -4px;

          width: 16px;
          height: 16px;

          background: url("data:image/svg+xml,%3Csvg width='17' height='17' viewBox='0 0 17 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8.05518' cy='8.05518' r='8.05518' fill='%23685394'/%3E%3Cpath d='M8.05493 3.22217C6.02963 3.22217 5.5233 4.89671 5.5233 5.73399H6.53595C6.62034 5.17581 6.81085 4.17621 8.05493 4.17459C9.29901 4.17296 9.48952 5.17581 9.5739 5.73399H10.5866C10.5866 4.78573 10.0802 3.22217 8.05493 3.22217Z' fill='white'/%3E%3Cpath d='M6.53595 5.73399H5.5233L5.52299 6.74662H5.31626C4.87138 6.74662 4.51074 7.10726 4.51074 7.55214V11.0044C4.51074 11.4492 4.87139 11.8099 5.31626 11.8099H10.7938C11.2387 11.8099 11.5993 11.4492 11.5993 11.0044V7.55214C11.5993 7.10726 11.2387 6.74662 10.7938 6.74662H10.5859L10.5866 5.73399H9.5739L9.57323 6.74662H6.53564L6.53595 5.73399Z' fill='white'/%3E%3C/svg%3E");
        }
      }
    }

    &__files {
      display: flex;
      align-items: center;

      padding-left: 10px;
      margin-top: 7px;

      min-height: 14px;
    }
  }

  .support {
    &__text {
      font-size: 13px;
      font-weight: 700;
      color: #765FA7;
    }

    &__btn-back {

      font-size: 12px;
      font-weight: 700;
      color: #765FA7;

      text-transform: uppercase;

      background: transparent;
    }
  }

  .file {
    display: flex;
    align-items: center;

    font-size: 12px;
    color: #7E7E7E;

    &__close-btn {
      display: flex;
      justify-content: center;
      align-items: center;

      margin-left: 6px;

      width: 12px;
      height: 12px;

      background: #919191;
      border-radius: 12px;

      &:focus {
        outline: none;
      }
    }

    &:not(:last-child) {
      margin-right: 11px;
    }
  }

  .textarea-wrap {
    position: absolute;

    top: 0;
    left: 150%;

    padding: 11px;
    padding-right: 140px;

    min-height: 54px;
    width: 100%;

    font-family: Arial, Helvetica;
    font-size: 14px;

    border: 0;
    border-radius: 8px;
    box-sizing: border-box;

    background: #F0F0F0;
  }
</style>
