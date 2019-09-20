<template>
  <div class="messenger__form form" ref="form" v-if="formData !== null && formData.types.length !== 0">
    <span class="form__count form__count--unread" v-if="!hasAgendaItem && unreadCount > 0" v-show="isScrollBtnVisible" :style="{ top: isShowBanner ? getBottomPosition - 36 - 4 + 'px' : 0 + getBottomPosition - 4 + 'px' }">
      {{ unreadCount }}
    </span>
    <Banner class="form__banner"
            v-if="isShowBanner && !hasAgendaItem"

            :style="{ top: getBottomPosition + 'px' }"

            @openHint="openHint"
            @closeBanner="closeBanner">
    </Banner>
    <!-- <button @click="scrollToBottom" class="form__button-down" v-show="isScrollBtnVisible" :style="{ top: getBottomPosition + isShowBanner ? 40 : 0 + 'px' }"> -->
    <button @click="scrollToBottom" class="form__button-down" v-show="!hasAgendaItem && isScrollBtnVisible" :style="{ top: isShowBanner ? getBottomPosition + -36 + 'px' : 0 + getBottomPosition + 'px' }">
      <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.6196 7.30861L12.9979 1.93013C13.3402 1.588 13.3402 1.03328 12.9979 0.691313C12.6559 0.349316 12.1012 0.349316 11.7593 0.691313L7.00028 5.45043L2.24146 0.691451C1.89933 0.349453 1.34469 0.349453 1.0027 0.691451C0.66056 1.03345 0.66056 1.58814 1.0027 1.93027L6.38109 7.30875C6.55217 7.47975 6.77615 7.56515 7.00025 7.56515C7.22445 7.56515 7.4486 7.47958 7.6196 7.30861Z" fill="#7C7C7C"/>
      </svg>
    </button>
    <div class="form__input">
      <div class="form__header" ref="formHeader">

        <Select
                  @form:action="showSelect"
                  @select:set="setSelectValue"

                  :selectTitle="selectTitle"
                  :isVisible="isVisible"
                  :items="formData.types">

        </Select>
        
        <!-- type: task-type (assignee) -->
        <div v-if="selectTitle.type === 'task-type'" class="form__item control control--member">
          <div class="control__title">
            <a class="control__name" href="feed://form/assignee">{{ assignee.text }}</a>
          </div>
        </div>

        <!-- type: cabinet -->
        <Toggle
                class="form__item"
                v-if="selectTitle.type === 'cabinet'"

                @setValue="handleSetValue">

        </Toggle>

        <!-- type: event, task -->
        
        <div class="form__item">
          <date-pick
                    v-model="date"
                    v-if="getParentType === 'event' || getParentType === 'task'"
                    
                    nextMonthCaption="Следующий месяц"
                    prevMonthCaption="Предыдущий месяц"
                    
                    
                    :format="'DD.MM.YYYY'"
                    :weekdays="[ 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс' ]"
                    :months="[ 'Январь', 'Февраль', 'Март', 'Апрель',
                               'Май', 'Июнь', 'Июль', 'Август',
                               'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ]">
        
          </date-pick>
        </div>


        <!-- type: event, task -->
        <TimePicker
                    v-if="getParentType === 'event' || getParentType === 'task'"
                    :startTime="startTime"
                    :endTime="endTime"
                    :selectedTime="selectedTime"
                    :fullDay="isFullDay"
                    :isTop="true"
                    :hasBorder="false"
                    mainColor="#629100"

                    @change="pickTime">
          
        </TimePicker>

        <Reminder
          v-if="getParentType === 'event'"
          class="form__item"

          :pickedValue="pickedValue"
          :pickedSeconds="pickedSeconds"
          :time="time"

          @reminder:set="setReminder"
          @value:set="setValue"
        >

        </Reminder>


        <!-- type: email -->

        <Dropdown class="control--member" v-if="selectTitle.type === 'email'"
                        
                        :items="fromItems[selectTitle.type]"
                        type="member"

                        @dropdown:set="pickFrom">
          От&nbsp;<span class="control__name">{{ from.name }}</span>
        </Dropdown>

        <!-- type: email, message (not cabinet) -->
        <!-- {{ toItems[selectTitle.type] }}
        {{ selectTitle.type }} -->
        <Dropdown class="control--member"
                  v-if="selectTitle.type === 'email' ||
                        selectTitle.type === 'telegram' ||
                        selectTitle.type === 'vk' ||
                        selectTitle.type === 'viber'"

                  :items="toItems[selectTitle.type]"
                  :activeItem="to"

                  type="member"
                  mode="check"

                  @dropdown:set="pickTo">
          Кому&nbsp;<span class="control__name">{{ to.name }}</span>
        </Dropdown>
        
        <div class="form__item control control--member" v-if="selectTitle.error">
          <div class="control__alert">
            {{ selectTitle.error }}
          </div>

          <div class="control__title" :class="{ 'control__title--empty': selectTitle.error }">
            <svg v-if="selectTitle.error" width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.40374 1.6C8.09583 1.06667 7.32602 1.06667 7.0181 1.6L1.31016 11.4864C1.00224 12.0198 1.38714 12.6864 2.00299 12.6864H13.4189C14.0347 12.6864 14.4196 12.0198 14.1117 11.4864L8.40374 1.6ZM9.44298 0.999998C8.67317 -0.333335 6.74867 -0.333332 5.97887 1L0.270932 10.8864C-0.498868 12.2198 0.463386 13.8864 2.00299 13.8864H13.4189C14.9585 13.8864 15.9207 12.2198 15.1509 10.8864L9.44298 0.999998ZM6.88668 10.8225C6.88668 10.3806 7.24486 10.0225 7.68668 10.0225H7.80414C8.24597 10.0225 8.60414 10.3806 8.60414 10.8225V10.9399C8.60414 11.3818 8.24597 11.7399 7.80414 11.7399H7.68668C7.24486 11.7399 6.88668 11.3818 6.88668 10.9399V10.8225ZM7.68668 3.72503C7.24486 3.72503 6.88668 4.0832 6.88668 4.52503V8.36363C6.88668 8.80546 7.24486 9.16363 7.68668 9.16363H7.80414C8.24597 9.16363 8.60414 8.80546 8.60414 8.36363V4.52503C8.60414 4.0832 8.24597 3.72503 7.80414 3.72503H7.68668Z" fill="#A93634"/>
            </svg>
          </div>
        </div>

        <!-- type: email -->
        <div v-if="selectTitle.type === 'email'" class="form__item control control--theme">
          <span class="control__title">
            Тема
          </span>
          <input id="feed__subject" type="text" class="control__input"
                 
                 :value="inputSubject"
                 @input="handleInputSubject"
                 @focus="handleFocus"
                 @blur="handleBlur">
        </div>

        <!-- type: events, message, email -->
        <!-- <Dropdown class="control--template"
                  v-if="selectTitle.type !== 'comment' &&
                        selectTitle.type !== 'task-type'"

                  :items="formData.templates[getParentType]"
                  :right="true"
                  :type="getParentType"

                  :mode="'template'"

                  title="Заполнить по шаблону"

                  @dropdown:set="pickTemplate">

          <svg class="template-svg" width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">te
            <path d="M10.3693 6.02855H3.70678V7.53549H6.29196V12.0563H7.77251V7.53549H10.3693V6.02855Z" fill="#919191"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3666 9.88182e-05H3.70408C3.55472 -0.00189171 3.40645 0.0262074 3.2678 0.0827785C3.12916 0.13935 3.00288 0.223275 2.89623 0.329723C2.78958 0.436171 2.70467 0.563039 2.64639 0.703023C2.63937 0.719898 2.63275 0.736923 2.62653 0.754084H1.89511C1.39249 0.754084 0.910465 0.957305 0.555064 1.31904C0.199662 1.68078 0 2.17139 0 2.68296V13.1411C0 13.6527 0.199662 14.1433 0.555064 14.505C0.910465 14.8668 1.39249 15.07 1.89511 15.07H12.1701C12.6728 15.07 13.1548 14.8668 13.5102 14.505C13.8656 14.1433 14.0652 13.6527 14.0652 13.1411V2.68296C14.0652 2.17139 13.8656 1.68078 13.5102 1.31904C13.1548 0.957305 12.6728 0.754084 12.1701 0.754084H11.4293C11.3727 0.597935 11.283 0.454604 11.1648 0.33508C10.9526 0.120514 10.6657 9.23155e-05 10.3666 9.88182e-05ZM10.0334 1.50704V3.05165H4.0372V1.50704H10.0334ZM2.55665 3.40578V2.26102H1.89511C1.78516 2.26102 1.67972 2.30548 1.60197 2.38461C1.52423 2.46374 1.48055 2.57106 1.48055 2.68296V13.1411C1.48055 13.253 1.52423 13.3603 1.60197 13.4395C1.67972 13.5186 1.78516 13.5631 1.89511 13.5631H12.1701C12.2801 13.5631 12.3855 13.5186 12.4633 13.4395C12.541 13.3603 12.5847 13.253 12.5847 13.1411V2.68296C12.5847 2.57106 12.541 2.46374 12.4633 2.38461C12.3855 2.30548 12.2801 2.26102 12.1701 2.26102H11.4992V3.40578C11.4972 3.71091 11.3773 4.00299 11.1653 4.21876C10.9533 4.43452 10.6664 4.55661 10.3666 4.55859H3.70408C3.55437 4.55958 3.40593 4.53055 3.26724 4.47315C3.12855 4.41575 3.00233 4.33111 2.89578 4.22407C2.78923 4.11702 2.70445 3.98966 2.64626 3.84925C2.58807 3.70885 2.55762 3.55816 2.55665 3.40578Z" fill="#919191"/>
          </svg>

        </Dropdown> -->
        
        
        <alert :state="alert" class="form__alert" v-click-outside="clickOutsideAlert"></alert>

        <button class="form__settings" :class="{ 'form__settings--active': alert.isAlertVisible}" @click="handleAlertClick">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 10.2277C5.99377 10.2277 4.77273 9.00665 4.77273 7.50034C4.77273 5.99404 5.99377 4.77295 7.5 4.77295C9.00623 4.77295 10.2273 5.99404 10.2273 7.50034C10.2273 9.00665 9.00623 10.2277 7.5 10.2277ZM8.86364 7.50034C8.86364 8.2535 8.25312 8.86404 7.5 8.86404C6.74688 8.86404 6.13636 8.2535 6.13636 7.50034C6.13636 6.74719 6.74688 6.13665 7.5 6.13665C8.25312 6.13665 8.86364 6.74719 8.86364 7.50034Z" fill="#BDBDBD"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0383 13.5668L13.55 12.055L13.0176 10.1207L13.2495 9.56668L15 8.57891V6.44106L13.2545 5.44916L13.0264 4.89614L13.5656 2.96083L12.0528 1.45018L10.1184 1.98246L9.56565 1.7507L8.57783 0H6.44007L5.44822 1.74556L4.89535 1.97359L2.96044 1.4338L1.45002 2.94429L1.98237 4.87909L1.75062 5.43185L0 6.41971V8.55696L1.74391 9.55106L1.97217 10.1046L1.43316 12.0395L2.94415 13.5506L4.87887 13.0182L5.43166 13.25L6.4195 15H8.55671L9.55005 13.256L10.1034 13.0277L12.0383 13.5668ZM12.1723 8.60876L11.5779 10.0285L12.0247 11.6518L11.6371 12.0394L10.0173 11.5881L8.59702 12.1739L7.76409 13.6363H7.21562L6.3896 12.173L4.97151 11.5784L3.34736 12.0253L2.96047 11.6384L3.41172 10.0184L2.82601 8.59822L1.36364 7.7646V7.21604L2.82757 6.38995L3.42218 4.97174L2.97529 3.34752L3.36137 2.96141L4.9812 3.4133L6.40196 2.82732L7.23362 1.3637H7.78154L8.60759 2.8277L10.0257 3.42234L11.6502 2.97533L12.0381 3.36265L11.5869 4.98224L12.1728 6.40295L13.6364 7.23464V7.78258L12.1723 8.60876Z" fill="#BDBDBD"/>
          </svg>
        </button>

      </div>
      <div class="form__body">
        <div class="form__area">
          <HtmlTemplate class="form__html-template"
                        ref="htmlTemplate"
                        v-show="hasHtmlTemplate"

                        :template="htmlTemplate"
                        :type="getParentType"
                        
                        @template:close="closeHtmlTemplate"></HtmlTemplate>
          <div style="position: relative; width: 100%; height: 0px; overflow: hidden;">
            <div ref="textareaWrap" class="textarea-wrap"></div>
          </div>
          <!-- htmlTemplateHeight -->
          <textarea
                    id="feed__text"
                    placeholder="Введите описание..."
                    ref="area"
                    class="form__textarea"

                    :value="inputMessage"
                    :style="{ 'border-radius': hasQuote ? '8px 8px 0px 0px': '8px',
                              'height': hasHtmlTemplate ? htmlTemplateHeight + 8 + 'px': '40px' }"

                    :disabled="hasHtmlTemplate"

                    @input="handleInputMessage"

                    @keypress="handleKeyPress">
          
          
          </textarea>
          <!-- <a class="form__attach-btn" href="feed://form/attachment/add">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.39766 16.6032C3.26241 18.4656 6.29546 18.4656 8.15662 16.6032L13.5729 11.1855C14.1379 10.6204 14.4485 9.87134 14.4485 9.07093C14.4485 8.27291 14.1367 7.52387 13.5741 6.9588C12.9923 6.3782 12.2266 6.08671 11.4608 6.08671C10.6963 6.08671 9.93297 6.37582 9.35001 6.9588L6.8151 9.49264C6.34802 9.96453 6.11508 10.5726 6.11508 11.1819C6.11508 11.7935 6.34802 12.404 6.8151 12.8711L11.0392 8.64803C11.2697 8.41507 11.6496 8.41507 11.8849 8.65042C12.0366 8.80214 12.0593 8.97894 12.0593 9.07093C12.0593 9.16411 12.0366 9.34212 11.8849 9.49384L6.46748 14.9139C5.53809 15.8446 4.02097 15.8446 3.08681 14.9139C2.15622 13.9833 2.15622 12.4661 3.08681 11.5355L8.50664 6.11538L11.5349 3.08696C12.4655 2.15633 13.9826 2.15633 14.9132 3.08696C15.845 4.01759 15.845 5.53479 14.9132 6.46541L14.7997 6.5801C15.3385 7.29688 15.6383 8.20362 15.6383 9.11872L16.6023 8.15464C18.4659 6.29219 18.4659 3.25899 16.6023 1.39773C15.6718 0.467106 14.4473 0 13.2241 0C12.0008 0 10.7763 0.467106 9.84577 1.39773L1.39766 9.84626C-0.465889 11.7087 -0.465889 14.7395 1.39766 16.6032Z" fill="#7C7C7C"/>
            </svg>


            <span v-if="attachments.length > 0" class="form__count form__count--attachments">
              {{ attachments.length }}
            </span>
          </a> -->
          <div class="form__attach-btn">
            <Dropdown class="control--template"
                      v-if="selectTitle.type !== 'comment' &&
                            selectTitle.type !== 'task-type'"

                      :items="formData.templates[getParentType]"
                      :right="true"
                      :type="getParentType"

                      :mode="'template'"

                      title="Заполнить по шаблону"

                      @dropdown:set="pickTemplate">

              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5397 7.20066H4.48267V9.00058H7.60897V14.4004H9.39943V9.00058H12.5397V7.20066Z" fill="#7C7C7C"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5365 0.000118031H4.4794C4.29878 -0.0022595 4.11948 0.0313028 3.95181 0.0988728C3.78415 0.166443 3.63143 0.266686 3.50246 0.39383C3.37349 0.520974 3.27081 0.672509 3.20033 0.839709C3.19183 0.859865 3.18382 0.8802 3.17631 0.900697H2.29178C1.68397 0.900697 1.10104 1.14343 0.671248 1.5755C0.241455 2.00756 0 2.59357 0 3.2046V15.6961C0 16.3071 0.241455 16.8931 0.671248 17.3252C1.10104 17.7573 1.68397 18 2.29178 18H14.7176C15.3254 18 15.9083 17.7573 16.3381 17.3252C16.7679 16.8931 17.0093 16.3071 17.0093 15.6961V3.2046C17.0093 2.59357 16.7679 2.00756 16.3381 1.5755C15.9083 1.14343 15.3254 0.900697 14.7176 0.900697H13.8216C13.7532 0.714189 13.6448 0.542991 13.5018 0.400229C13.2452 0.143945 12.8982 0.000110264 12.5365 0.000118031ZM12.1336 1.80004V3.64497H4.88226V1.80004H12.1336ZM3.0918 4.06795V2.70062H2.29178C2.15882 2.70062 2.03131 2.75372 1.93729 2.84824C1.84328 2.94275 1.79046 3.07094 1.79046 3.2046V15.6961C1.79046 15.8298 1.84328 15.9579 1.93729 16.0525C2.03131 16.147 2.15882 16.2001 2.29178 16.2001H14.7176C14.8505 16.2001 14.978 16.147 15.072 16.0525C15.1661 15.9579 15.2189 15.8298 15.2189 15.6961V3.2046C15.2189 3.07094 15.1661 2.94275 15.072 2.84824C14.978 2.75372 14.8505 2.70062 14.7176 2.70062H13.9062V4.06795C13.9038 4.43241 13.7588 4.78127 13.5024 5.03899C13.246 5.29671 12.899 5.44254 12.5365 5.4449H4.4794C4.29836 5.44608 4.11885 5.41141 3.95113 5.34285C3.78341 5.27429 3.63077 5.1732 3.50192 5.04533C3.37307 4.91747 3.27053 4.76535 3.20016 4.59765C3.12979 4.42995 3.09297 4.24996 3.0918 4.06795Z" fill="#7C7C7C"/>
              </svg>

            </Dropdown>
            <input @change="loadFiles" class="form__attach-input" type="file" name="files" id="files" multiple>
            <label class="form__attach-file" for="files" title="Прикрепить файлы">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.7407 2.78082C12.2619 2.88187 12.136 2.9866 12.0212 3.0606L11.8703 3.2L11.5639 3.50943C10.1292 4.94342 8.79217 6.32395 6.87224 8.2449L5.61175 9.50608C4.23867 10.8799 3.84833 11.393 3.43939 11.8661C3.05561 12.3101 2.76348 12.8108 2.74867 13.3666C2.72861 14.119 2.93581 14.5429 3.63725 15.2439C4.01735 15.6238 4.72061 15.8474 5.35113 15.7553C6.00092 15.6604 6.36969 15.4311 6.72351 15.1259L11.5569 10.2059C12.1683 9.59474 11.9536 8.98675 11.7366 8.74765C11.6212 8.62055 11.4712 8.54072 11.286 8.53625C11.0938 8.5316 10.8909 8.47677 10.4901 8.87734C10.1557 9.21163 9.84955 9.51279 9.56776 9.79002C9.20048 10.1514 8.87418 10.4724 8.58062 10.7728C8.41692 10.9403 8.27067 11.0942 8.14074 11.2367L5.78928 13.5869C5.59392 13.2659 5.45405 12.9201 5.40319 12.5458C5.31268 11.8796 5.53067 11.3145 5.83346 10.8313C6.13413 10.3515 6.58068 9.85608 7.10302 9.32162C7.40176 9.01595 7.74943 8.67376 8.1301 8.29909C8.41245 8.0212 8.71312 7.72527 9.02527 7.4133C9.65647 6.78244 10.2647 6.65254 11.0472 6.67143C11.8365 6.6905 12.5643 6.99741 13.082 7.56774C14.131 8.7235 14.2152 10.4771 13.0217 11.6699L8.52845 16.3399L8.12715 16.7066C7.6919 17.1016 6.90638 17.5449 5.89773 17.6923C4.85786 17.8442 3.52171 17.657 2.37228 16.5082C1.14448 15.2811 0.743591 14.0713 0.835282 12.9197C0.921948 11.8312 1.41261 11.0329 1.97454 10.402C2.39025 9.93536 2.77374 9.41597 4.14734 8.0416L5.4068 6.78144C7.32127 4.86596 8.85085 3.29593 10.2859 1.8617C10.7608 1.34939 11.6355 0.838922 12.5271 0.798322C13.5163 0.753278 15.0941 0.946523 16.1297 1.98162C17.2912 3.14239 17.5496 4.5786 17.5036 5.68423C17.4599 6.73352 16.8838 7.71248 16.3694 8.27863L15.6229 9.03713L14.7917 9.85544C14.7919 9.22247 14.8856 8.63173 14.189 7.666L14.9075 6.85662C15.2741 6.33811 15.4598 5.86375 15.5244 5.41761C15.5757 5.06313 15.6472 4.12169 14.7855 3.26054C14.3617 2.8369 13.2388 2.67569 12.7407 2.78082Z" fill="#7C7C7C"/>
              </svg>
            </label>
            <span v-if="attachments.length > 0" class="form__count form__count--attachments">
              {{ attachments.length }}
            </span>
          </div>
          <div class="form__quote quote" v-if="hasQuote">
            <div class="quote__wrap">
              <p class="quote__text" v-html="quote.content">
                <!-- {{ quote.text }} -->
              </p>
              <div class="quote__info">
                {{ quote.title }}
              </div>

              <button class="quote__btn" @click="closeQuote">
                <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M14 7.5C14 11.366 10.866 14.5 7 14.5C3.13403 14.5 0 11.366 0 7.5C0 3.63403 3.13403 0.5 7 0.5C10.866 0.5 14 3.63403 14 7.5ZM3.88263 10.6174C3.67133 10.406 3.67133 10.0635 3.88263 9.85205L6.23553 7.49902L3.88446 5.14795C3.67316 4.93652 3.67316 4.59399 3.88446 4.38281C4.09576 4.17139 4.43835 4.17139 4.64972 4.38281L7.00079 6.73389L9.35199 4.38257C9.56329 4.17139 9.90588 4.17139 10.1172 4.38257C10.3285 4.59399 10.3285 4.93652 10.1172 5.14795L7.76605 7.49902L10.1191 9.85205C10.3304 10.0635 10.3304 10.406 10.1191 10.6174C9.90778 10.8286 9.56519 10.8286 9.35388 10.6174L7.00085 8.2644L4.64783 10.6174C4.51758 10.7476 4.33752 10.7976 4.16901 10.7673C4.06409 10.7485 3.96368 10.6985 3.88263 10.6174Z" fill="#629100"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <!-- <a  ref="submitBtn"
            href="feed://form/submit"
            class="form__submit"
            
            @mouseenter="handleAlertEnter"
            @mouseleave="handleAlertLeave"
            @click="sendAct"> -->
        <a  ref="submitBtn"
            href="feed://form/submit"
            class="form__submit"
            
            @click="sendAct">
            
          <img title="Добавить" v-if="getParentType !== 'message' && getParentType !== 'email'" src="data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9 0.5C8.44772 0.5 8 0.947715 8 1.5V8H1.5C0.947715 8 0.5 8.44772 0.5 9C0.5 9.55229 0.947715 10 1.5 10H8V16.5C8 17.0523 8.44772 17.5 9 17.5C9.55229 17.5 10 17.0523 10 16.5V10H16.5C17.0523 10 17.5 9.55229 17.5 9C17.5 8.44772 17.0523 8 16.5 8H10V1.5C10 0.947715 9.55229 0.5 9 0.5Z' fill='%233E3E3E'/%3E%3C/svg%3E" alt="">
          <img title="Отправить" v-else src="data:image/svg+xml,%3Csvg width='17' height='14' viewBox='0 0 17 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16.8087 6.5785C16.9969 6.77885 16.9443 7.10897 16.6938 7.21866C16.4163 7.34047 16.1322 7.44808 15.8505 7.56055C14.8761 7.94949 13.9017 8.33774 12.9272 8.72634C11.8216 9.16718 10.7161 9.60769 9.61048 10.0489C8.5184 10.4845 7.42666 10.9205 6.33492 11.3562C5.26982 11.7811 4.20472 12.2054 3.13963 12.6303C2.3043 12.9635 1.46897 13.2964 0.633991 13.63C0.473084 13.6944 0.32602 13.6708 0.200755 13.5521C0.0765284 13.4345 0.0498838 13.2878 0.103173 13.1276C0.338477 12.4216 0.574819 11.7164 0.810814 11.0109C1.26516 9.6506 1.71985 8.29033 2.17212 6.92972C2.18457 6.89201 2.18457 6.84322 2.17212 6.8055C1.48766 4.75074 0.801126 2.69668 0.113554 0.64331C0.0574965 0.475829 0.0633791 0.321844 0.191758 0.191735C0.313216 0.0688924 0.462703 0.0384413 0.622918 0.101766C1.21983 0.337415 1.8157 0.576872 2.41192 0.814597C3.4521 1.22949 4.49193 1.64404 5.53211 2.05894C6.5934 2.48214 7.65469 2.90569 8.71564 3.32889C9.80945 3.76524 10.9036 4.20193 11.9974 4.63863C13.1144 5.08432 14.2314 5.53001 15.3488 5.97571C15.7924 6.15253 16.2367 6.32832 16.68 6.50652C16.7253 6.52417 16.7661 6.55393 16.8087 6.5785ZM1.98076 11.7119C6.42973 9.94057 8.19831 9.28276 12.631 7.51764C12.6103 7.50587 12.5923 7.50449 12.5743 7.50449C8.7665 7.50449 7.20796 7.53909 3.40019 7.53771C3.3476 7.53771 3.29569 7.58996 3.28012 7.63667C2.78148 9.13673 2.59289 9.87517 2.09322 11.3749C2.01156 11.6206 2.06796 11.4507 1.98076 11.7119ZM12.5289 6.27468C12.5289 6.26741 12.5289 6.26015 12.5289 6.25288C8.09416 4.48741 6.35845 3.82891 1.91363 2.05894C1.92401 2.09181 1.92989 2.11154 1.93647 2.13126C2.51054 3.85348 2.70432 4.43377 3.27631 6.15668C3.29638 6.21758 3.32407 6.23212 3.38566 6.23212C7.18339 6.23039 8.66304 6.26499 12.4608 6.26568C12.4836 6.26603 12.5064 6.27157 12.5289 6.27468Z' fill='%233E3E3E'/%3E%3C/svg%3E" alt="">
        </a>
      </div>
    </div>
    <ul class="form__files">
      <li class="form__file" v-for="(attachment, index) in attachments" :key="index" :title="attachment.name">
        {{ attachment.name }}
        <button class="form__btn" @click="removeFile(index)">
          <img src="data:image/svg+xml,%3Csvg width='8' height='8' viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.698519 6.91551C0.487212 6.7042 0.487212 6.3616 0.698519 6.15029L6.16791 0.680822C6.37922 0.469512 6.72182 0.469511 6.93312 0.680821C7.14443 0.892131 7.14443 1.23473 6.93312 1.44604L1.46373 6.91551C1.25242 7.12682 0.909826 7.12682 0.698519 6.91551Z' fill='%23fff'/%3E%3Cpath d='M6.93406 6.91562C6.72275 7.12693 6.38016 7.12693 6.16885 6.91562L0.699458 1.44616C0.488151 1.23485 0.488151 0.892245 0.699458 0.680935C0.910765 0.469626 1.25336 0.469626 1.46467 0.680935L6.93406 6.1504C7.14537 6.36171 7.14537 6.70431 6.93406 6.91562Z' fill='%23fff'/%3E%3C/svg%3E" alt="">
        </button>
      </li>
    </ul>

    <button class="form__btn-show" :class="{ 'form__btn-show--expired': hasExpired }" v-show="!agendaState && agenda.length > 0" @click="agendaShow">
      <!-- <img src="data:image/svg+xml,%3Csvg width='19' height='20' viewBox='0 0 19 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M17.0328 3.2168H1.59683V17.8428H17.0328V3.2168ZM0 1.61997V19.4396H18.6297V1.61997H0Z' fill='%23555151'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.04992 4.04992V0H5.82418V4.04992H4.04992Z' fill='%23555151'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.9598 4.04992V0H14.734V4.04992H12.9598Z' fill='%23555151'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M18.6297 7.35927H0V5.76244H18.6297V7.35927Z' fill='%23555151'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.72288 11.3282H4.04992V9.73139H6.72288V11.3282ZM10.7728 11.3282H8.09985V9.73139H10.7728V11.3282ZM14.8227 11.3282H12.1498V9.73139H14.8227V11.3282Z' fill='%23555151'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.72288 15.3781H4.04992V13.7813H6.72288V15.3781ZM10.7728 15.3781H8.09985V13.7813H10.7728V15.3781ZM14.8227 15.3781H12.1498V13.7813H14.8227V15.3781Z' fill='%23555151'/%3E%3C/svg%3E" alt=""> -->
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5429 2.8131H1.45714V15.6036H15.5429V2.8131ZM0 1.41667V17H17V1.41667H0Z" fill="#555151"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.69565 3.54167V0H5.3147V3.54167H3.69565Z" fill="#555151"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.8261 3.54167V0H13.4451V3.54167H11.8261Z" fill="#555151"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M17 6.4357H0V5.03927H17V6.4357Z" fill="#555151"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.13478 9.90655H3.69565V8.51012H6.13478V9.90655ZM9.83044 9.90655H7.3913V8.51012H9.83044V9.90655ZM13.5261 9.90655H11.087V8.51012H13.5261V9.90655Z" fill="#555151"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.13478 13.4482H3.69565V12.0518H6.13478V13.4482ZM9.83044 13.4482H7.3913V12.0518H9.83044V13.4482ZM13.5261 13.4482H11.087V12.0518H13.5261V13.4482Z" fill="#555151"/>
      </svg>

      <span class="form__count form__count--agenda">
        {{ agenda.length }}
      </span>
    </button>
  </div>
  <div v-else class="messenger__form form">
    <div class="form__row">
      <div class="form__block form__block--theme"></div>
      <div class="form__block form__block--template"></div>
    </div>
    <div class="form__row form__row--last">
      <div class="form__block form__block--input"></div>
      <div class="form__block form__block--send"></div>
    </div>
  </div>
</template>

<script>


import EventBus from '@/src/utils/event-bus.js';
import { roundTime } from '@/src/utils/round-time.js';

import { getParentType,
         
         setStateAttachments,
         setStateFrom,
         setStateTo,
         setStateText,
         setStateSubject,
         setStateApproval,
         setStateDate,
         setAgendaEvent,
         setStateReminder,
         setHtmlTemplate,
         clearStateEvent } from '@/src/utils/globals.js';

import Select from '@/src/components/select/Select.vue';
import Toggle from '@/src/components/toggle/Toggle.vue';
import Dropdown from '@/src/components/dropdown/Dropdown.vue';
import HtmlTemplate from '@/src/components/html-template/HtmlTemplate.vue';

import TimePicker from '../../../../components/timepicker/src/TimePicker.vue';

import Alert from '@/src/components/alert/Alert.vue';

import Banner from '@/src/components/Banner.vue';
import Reminder from '@/src/components/Reminder.vue';

import moment from 'moment';
import DatePick from 'vue-date-pick';

export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    selectTitle: {
      type: Object,
      default: () => ({})
    },
    formData: {
      type: Object, 
      default: () => ({})
    },
    from: {
      type: Object,
      default: () => ({ id: '', name: '' })
    },
    fromItems: {
      type: Object,
      default: () => ({})
    },
    to: {
      type: Object,
      default: () => ({ id: '', name: '' })
    },
    toItems: {
      type: Object,
      default: () => ({})
    },
    agenda: {
      type: Array,
      default: () => []
    },
    agendaState: {
      type: Boolean,
      default: false
    },
    inputMessage: {
      type: String,
      default: ''
    },
    inputSubject: {
      type: String,
      default: ''
    },
    assignee: {
      // id: '',
      // text: ''
      type: Object,
      defualt: null
    },
    isScrollBtnVisible: {
      type: Boolean,
      default: false
    },
    quote: {
      type: Object,
      default: null
    },
    unreadCount: {
      type: Number,
      default: 0
    },
    alert: {
      type: Object,
      default: () => ({})
    },
    agendaText: {
      type: Object,
      default: () => ({ text: '' })
    },
    agendaId: {
      type: String,
      default: null
    },
    agendaMargin: {
      type: Number,
      default: 0
    },
    isShowBanner: {
      type: Boolean,
      default: false
    },
    hasAgendaItem: {
      type: Boolean,
      default: false
    },
    htmlTemplate: {
      type: Object,
      default: () => ({})
    }
  },
  created() {
    let now = moment();

    this.date = now.format('DD.MM.YYYY');

    let time = roundTime();

    this.selectedTime.start = this._getMinutes(time);
    this.selectedTime.end = this._getMinutes(time) + 30;
  },
  mounted() {
    // EventBus.$on('attachments:add', attachments => {
    //   attachments.forEach(attachment => {
    //     this.attachments.push(attachment);
    //   })
    // })

    EventBus.$on('attachments:clear', () => {
      setStateAttachments([]);
      this.attachments = [];
    });

    
    
    EventBus.$on('reminder:clear', () => {
      this.pickedValue = 'за 1 час';
      this.pickedSeconds = 3600;
      this.time.seconds = null;
      this.time.value = null;
    });
  },
  data() {
    return {
      attachments: [],
      startTime: {
        start: 480,
        end: 1170,
        step: 30
      },
      endTime: {
        start: 510,
        end: 1200,
        step: 30
      },
      selectedTime: {
        start: 0,
        end: 90
      },
      date: '',
      isFullDay: false,
      agendaHeight: 44,
      // htmlTemplate: {},
      htmlTemplateHeight: 0,
      pickedValue: 'за 1 час',
      pickedSeconds: 3600,
      time: {
        seconds: null,
        value: null
      },
    }
  },
  methods: {
    setReminder(seconds, obj) {
      if (seconds >= 0) {
        setStateReminder(seconds);
        return;
      }

      const times = obj.time.split(':');
      const dateUTC = moment(obj.date, 'DD.MM.YYYY').add(times[0], 'hours').add(times[1], 'minutes').format('YYYY-MM-DDTHH:mm:ss');

      setStateReminder(seconds, dateUTC);
    },
    handleAlertClick() {
      this.alert.isAlertVisible = !this.alert.isAlertVisible;
    },
    clickOutsideAlert(e) {
      if (e.target.closest('.form__settings')) {
        return;
      }

      this.alert.isAlertVisible = false;
    },
    openHint(e) {
      this.$emit('openHint');
    },
    closeBanner(e) {
      this.$emit('closeBanner');
    },
    removeFile(index) {
      // this.attachments = this.attachments.filter(file => file.id !== id);
      this.attachments.splice(index, 1);
    },
    showSelect(value) {
      this.$emit('form:action', value);
    },
    handleInputMessage(e) {
      this.$emit('inputMessage:set', e.target.value);

      this.$nextTick(() => {
        this.$refs.textareaWrap.innerHTML = this.inputMessage;
        this.$refs.area.style.height = this.$refs.textareaWrap.scrollHeight + 'px';
      })

      this.$nextTick(() => {
        this.$emit('inputMessageHeight:set', this.$refs.form.scrollHeight);
      })
    },
    handleInputSubject(e) {
      this.$emit('inputSubject:set', e.target.value);
    },
    pickTime(start, end, isFullDay) {
      if (isFullDay) {
         this.selectedTime.start = 0;
         this.selectedTime.end = 1439;
      }
    },
    pickFrom(items) {
      this.$emit('dropdown-from:set', items[0]);

      setStateFrom(items[0]);
    },
    pickTo(items) {
      this.$emit('dropdown-to:set', items); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

      setStateTo(items)
    },
    pickTemplate(items) {
      
      if (items[0].html) {
        this.$emit('template:set', items[0]);

        this.$nextTick(() => {
          this.htmlTemplateHeight = this.$refs.htmlTemplate.$el.clientHeight;

          setHtmlTemplate(this.htmlTemplate.id);
        })

        return;
      }

      this.$emit('template:set', {});
      this.message = items[0].text;


      setHtmlTemplate('');
    },
    handleFocus() {
      if (this.$refs.form.scrollWidth > 850) {
        return;
      }

      this.$refs.formHeader.classList.add('form__header--active');
    },
    handleBlur() {
      this.$refs.formHeader.classList.remove('form__header--active');
    },
    handleSetValue(value) {
      setStateApproval(value);
    },
    setSelectValue(obj) {
      this.$emit('select:set', obj);
      this.message = '';
    },
    sendAct() {
      clearStateEvent();

      if (this.agendaId.length !== 0) {
        for (let i = 0; i < this.agenda.length; i++) {
          if (this.agenda[i].id === this.agendaId) {
            setAgendaEvent(this.agendaId, this.agenda[i].table, this.agendaText[this.agendaId].text);
          }
        }
      }
      
      this.$emit('clearAgendaId', false);
      
      setStateText(this.inputMessage);
      setStateSubject(this.inputSubject);
      setStateAttachments(this.attachments);
      setStateDate(this._parseTime(this.selectedTime.start), this._parseTime(this.selectedTime.end));

      this.$refs.area.blur();
    },
    handleKeyPress(e) {
      const { shiftKey, keyCode } = e;

      if (keyCode === 13) {
        if (shiftKey && !this.alert.isSendByEnter) {
          this.sendAct();
        }

        if (!shiftKey && this.alert.isSendByEnter) {
          this.sendAct();
        }
      }
    },
    scrollToBottom() {
      this.$emit('to-bottom');
    },
    closeQuote() {
      this.$emit('quote:close', null);
    },
    loadFiles(e) {
      let files = e.target.files;

      for (let i = 0; i < files.length; i++) {
        let name = files[i].name;
        let size = files[i].size;

        let reader = new FileReader();

        reader.readAsDataURL(files[i]);

        reader.addEventListener('load', () => {
          this.attachments.push({
            id: name + '_' + Math.random().toString(16).substr(2, 9),
            name,
            size,
            base64: reader.result
          })
        })
      }
    },
    agendaShow() {
      EventBus.$emit('agenda:setState', true);
    },
    isScheduled(value) {
      const today = moment(new Date());
      return today.diff(moment(value), 'days') <= 0;
    },
    closeHtmlTemplate() {
      this.$emit('template:set', {});
      setHtmlTemplate('');  
    },
    setValue(value, seconds) {
      this.pickedValue = value;
      this.pickedSeconds = seconds;
    },
    // _closeAllAgendaEdit(index = -1) {
    //   for (let i = 0; i < this.agenda.length && i !== index; i++) {
    //     this.agenda[i].isOpen = false;
    //   }
    // },
    _parseTime(time) {
      
      const times = this._convertToMinsHrs(time).split(':');
      const dateUTC = moment(this.date, 'DD.MM.YYYY').add(times[0], 'hours').add(times[1], 'minutes').format('YYYY-MM-DDTHH:mm:ss');

      return dateUTC;
    },
    _convertToMinsHrs(minutes) {
        let h = Math.floor(minutes / 60);
        let m = minutes % 60;
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;

        return `${h}:${m}`;
    },
    _getMinutes(value) {
      const times = value.split(':');
      return Number(times[0]) * 60 + Number(times[1]);
    },
    _getCaret() { 
      if (this.$refs.area.selectionStart) { 
          return this.$refs.area.selectionStart; 
      }
      else if (document.selection) { 
          this.$refs.area.focus();
          var r = document.selection.createRange(); 
          if (r == null) { 
              return 0;
          }
          var re = this.$refs.area.createTextRange(), rc = re.duplicate();
          re.moveToBookmark(r.getBookmark());
          rc.setEndPoint('EndToStart', re);
          return rc.text.length;
      }  

      return 0; 
    }

  },
  watch: {
    htmlTemplate: {
      handler: function() {
         this.$nextTick(() => {
          this.htmlTemplateHeight = this.$refs.htmlTemplate.$el.clientHeight;
        })
      },
      deep: true
    }
  },
  computed: {
    getParentType() {
      return getParentType(this.selectTitle.type);
    },
    getBottomPosition() {
      if (!this.agendaState) {
        // return -68;
        return -38;
      }

      return -(this.agenda.length * 28 + 50 + this.agendaMargin);
    },
    hasHtmlTemplate() {
      return this.htmlTemplate.id;
    },
    hasQuote() {
      return this.quote !== null && this.quote.text;
    },
    hasExpired() {
      for (let i = 0; i < this.agenda.length; i++) {
        if (!this.isScheduled(this.agenda[i].date)) {
          return true;
        }
      }

      return false;
    },
  },
  components: {
    Select,
    HtmlTemplate,
    TimePicker,
    Dropdown,
    Toggle,
    DatePick,
    Alert,
    Banner,
    Reminder
  }
}
</script>

<style lang="scss">
  $vdpColor: #629100;
  @import 'vue-date-pick/src/vueDatePick.scss';

  
  .vdpOuterWrap.vdpFloating {
    position: absolute;
    left: 0 !important;
    bottom: 100% !important;

    padding: 0;
    padding-bottom: 17px; 
  }

  .vdpComponent.vdpWithInput>input {
    padding-right: 0;

    cursor: pointer;
  }

  .vdpCell:hover .vdpCellContent {
    color: #fff;
    background: #629100;
  }
  .vdpComponent {
    padding-left: 18px;
    margin-left: 8px;
    &:after {
      content: '';

      position: absolute;
      top: 50%;
      left: 3px;

      width: 11px;
      height: 11px;

      background: url("data:image/svg+xml,%3Csvg width='11' height='13' viewBox='0 0 11 13' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.6381 1.82024H0.903571V10.0964H9.6381V1.82024ZM0 0.916667V11H10.5417V0.916667H0Z' fill='%23BDBDBD'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M2.29167 2.29167V0H3.29563V2.29167H2.29167Z' fill='%23BDBDBD'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.33333 2.29167V0H8.3373V2.29167H7.33333Z' fill='%23BDBDBD'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M10.5417 4.16427H0V3.2607H10.5417V4.16427Z' fill='%23BDBDBD'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M3.80417 6.41012H2.29167V5.50655H3.80417V6.41012ZM6.09583 6.41012H4.58333V5.50655H6.09583V6.41012ZM8.3875 6.41012H6.875V5.50655H8.3875V6.41012Z' fill='%23BDBDBD'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M3.80417 8.70179H2.29167V7.79821H3.80417V8.70179ZM6.09583 8.70179H4.58333V7.79821H6.09583V8.70179ZM8.3875 8.70179H6.875V7.79821H8.3875V8.70179Z' fill='%23BDBDBD'/%3E%3C/svg%3E") no-repeat center center;

      transform: translate(0, -50%);
    }

    & input {
      width: 70px;

      font-family: Arial, Helvetica;
      font-size: 14px;
      color: #4D4D4D;
      border: none;
      
      &:focus {
        outline: none;
      }
    }

    & .vdpClearInput {
      display: none;
    }
  }

  .form {
    padding-right: 15px;
    padding-left: 15px;

    &__row {
      display: flex;
      justify-content: space-between;

      padding-top: 8px;


      &--last {
        padding-bottom: 30px;
      }
    }

    &__block {
      background: #F0F0F0;
      border-radius: 6px;

      &--theme {
        width: 69%;
        height: 22px;
      }

      &--template {
        height: 22px;
        width: 22px;

        margin-right: 5px;
      }

      &--input {
        flex: 1;

        width: 100%;
        height: 53px;
      }

      &--send {
        width: 30px;
        height: 30px;

        margin-left: 14px;

        align-self: center;
      }
    }

    &__html-template {
  		position: absolute;

      top: 4px;
      left: 4px;
    }

    &__settings {
      position: absolute;

      top: 50%;
      right: 8px;

      background: transparent;

      transform: translate(0, -50%);

      cursor: pointer;

      &:focus {
        outline: none;
      }

      &:hover {
        svg {
          path {
            fill: #1B1919;
          }
        }
      }

      &--active {
        svg {
          path {
            fill: #1B1919;
          }
        }
      }
    }

    &__header {
      position: relative;
      
      display: flex;
      // align-items: center;
      align-items: stretch;

      padding-right: 44px;

      &--active {
        .control--member {
          display: none;
        }

        .control--theme {
          flex: 1;
          width: 100%;
        }

        .control--reminder {
          height: 100%;
        }
      }
    }

    &__input {
      display: flex;
      flex-direction: column;
    }

    &__body {
      display: flex;
    }

    &__area {
      display: flex;
      flex-direction: column;

      position: relative;
      flex: 1;

      // overflow-x: hidden;
      // overflow-y: hidden;
    }

    &__textarea {
      padding-top: 11px;
      padding-right: 45px;
      padding-left: 11px;
      
      width: 100%;
      min-height: 53px;
      max-height: 253px;

      font-family: Arial, Helvetica;
      font-size: 14px;

      border: none;

      background: #F0F0F0;
      resize: none;

      box-sizing: border-box;
      overflow-y: auto;
    }

    &__submit {
      position: relative;
      
      display: flex;
      justify-content: center;
      align-items: center;

      margin-top: 11px;
      margin-left: 14px;

      width: 30px;
      height: 30px;

      background: #FEDD46;
      border-radius: 5px;
      
      &:hover {
        background: #D3B83F;
      }
    }

    &__alert {
      position: absolute;

      bottom: calc(100% - 10px);
      right: 16px;

      padding-bottom: 10px;

      z-index: 20;
    }

    &__attach-btn {
      position: absolute;
      top: 17px;
      right: 18px;

      // svg {
      //   path {
      //     transition: .2s;
      //   }
      // }

      // &:hover {

      //   .form__count {
      //     background: #D3B83F;
      //   }

      //   svg {
      //     path {
      //       fill: #252323;
      //     }
      //   }
      // }
    }

    &__attach-input {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0 0 0 0);
    }

    &__attach-file {
      cursor: pointer;

       &:hover {

        .form__count {
          background: #D3B83F;
        }

        svg {
          path {
            fill: #252323;
          }
        }
      }
    }

    &__count {
      position: absolute;
      right: -7px;

      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 10px;
      font-weight: 700;
      color: #3E3E3E;

      width: 14px;
      height: 14px;

      border-radius: 14px;

      background: #FEDD46;

      &--agenda {
        top: 14px;
        right: 1px;
        
        background: #555151;
        color: #fff;
      }

      &--unread {
        right: 45px;

        z-index: 3;
      }

      &--attachments {
        top: 11px;
      }
    }

    &__files {
      display: flex;
      flex-wrap: wrap;

      height: 14px;

      padding-top: 8px;
      padding-bottom: 8px;
      padding-left: 12px;
    }

    &__file {
      display: flex;
      align-items: center;

      font-size: 12px;
      color: #7E7E7E;

      margin-right: 8px;
    }

    &__btn {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 12px;
      height: 12px;

      margin-left: 6px;

      border: none;
      border-radius: 12px;
      background: #919191;

      transition: background .2s;
      cursor: pointer;

      &:hover {
        background: #333;
      }

      &:focus {
        outline: none;
      }
    }

    &__item {
      display: flex;
      // margin-left: 10px;
      align-items: center;
    }

    &__btn-show {
      display: flex;
      align-items: center;
      justify-content: center;

      position: absolute;
    
      // right: 28px;
      left: 7px;
      bottom: 100%;

      width: 38px;
      height: 28px;

      background: #FEDD46;

      border: none;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;

      transition: background .2s;

      cursor: pointer;

      &:hover {
        background: #D3B83F;
      }

      &:focus {
        outline: none;
      }

      &--expired {
        background: #EF5350;

        svg {
          path {
            fill: #fff;
          }
        }

        .form__count--agenda {
          background: #6E3332;
        }

        &:hover {
          background: #6E3332;
        }
      }
    }

    &__banner {
      
      position: absolute;
      top: -100px;;
      right: 24px;

      z-index: 20;
      // right: 27px;
    }

    &__button-down {
      position: absolute;
      right: 27px;
      
      display: flex;
      justify-content: center;
      align-items: center;
      
      width: 28px;
      height: 28px;

      background: #F0F0F0;
      border-radius: 16px;
    
      cursor: pointer;

      &:focus {
        outline: none;
      }

      &:hover {
        background: #C6C6C6;
      }
    }

    .textarea-wrap {
      position: absolute;
      top: 0;
      left: 150%;

      padding-top: 11px;
      padding-right: 45px;
      padding-left: 11px;
      padding-bottom: 2px;
      
      width: 100%;
      min-height: 38px;

      font-family: Arial, Helvetica;
      font-size: 14px;

      border: none;
      border-radius: 8px;

      box-sizing: border-box;
    
      white-space: pre-line;
    }
  }

  .quote {
    position: relative;
    top: -1px;

    padding-left: 30px;
    padding-right: 100px;
    padding-top: 8px;
    padding-bottom: 16px;

    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;

    background: #F0F0F0;

    &::before {
      content: '';

      position: absolute;
      top: 6px;
      left: 13px;

      width: 6px;
      height: calc(100% - 17px);

      background: #76AE00;
      border-radius: 4px 0px 0px 4px;

    }

    &__wrap {
      position: relative;

      display: inline-flex;
      flex-direction: column;

      max-width: 100%;
    }

    &__text {
      display: inline-block;

      max-width: 100%;

      font-size: 14px;

      color: #3E3E3E;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__info {
      display: inline-block;

      margin-top: 6px;

      font-size: 11px;
      font-weight: 700;

      color: #576F25;
    }

    &__btn {
      display: flex;
      align-items: center;
      justify-content: center;

      position: absolute;

      top: calc(50% - 7px);
      right: -30px;

      background: transparent;

      cursor: pointer;

      &:focus {
        outline: none;
      }

      &:hover {
        svg {
          path {
            fill: #495D1E;
          }
        }
      }
    }
  }

  .control {
    position: relative;

    display: flex;
    align-items: center;

    margin-left: 10px;

    &:hover {
      .control__alert {
        // display: block;

        opacity: 1;
        visibility: visible;

        // animation: fadeIn .2s;
      }
    }

    &__alert {
      position: absolute;
      bottom: 100%;

      z-index: 12;

      opacity: 0;
      visibility: hidden;

      // display: none;
      // align-items: center;

      line-height: 33px;
      height: 33px;

      padding-right: 14px;
      padding-left: 14px;

      font-size: 14px;
      // font-weight: 700;
      color: #fff;
      white-space: nowrap;

      background: #DC4441;
      border-radius: 4px;

      transition: .2s;
      transition-delay: 1s;
    }

    &--filter {
      position: static;
    }

    

    &--member:hover {
      .control__name {
        color: #629100;
        border-bottom: 1px solid #629100; 
      }
    }

    &--template {
      position: absolute;
      z-index: 3;
      top: 9px;
      right: 22px;

      width: 18px;
      height: 22px;

      transform: translate(0, -50%);
      height: 100%;

      &:hover {
        path {
          fill: #333;
        }
      }
    }

    &--theme {
      // width: 225px;

      // margin-right: 0;
      // margin-left: auto;
      // transition: .4s;

      flex-grow: 1;
      padding-left: 10px;

    }

    &__title {
      display: flex;
      align-items: center;

      align-self: stretch;

      font-size: 14px;
      color: #B1B1B1;

      transition: color .2s;

      cursor: pointer;
      white-space: nowrap;

      // svg {
      //   margin-right: 5px;
      // }

      &--empty {
        color: #A93634;

        svg {
          margin-right: 5px;
        }
      }
    }

    &__input {
      height: 21px;
      width: 100%;

      margin-left: 10px;

      padding-right: 7px;
      padding-left: 7px;

      background: #F0F0F0;

      border: none;
      border-radius: 3px;
    }

    &__name {
      max-width: 140px;
      text-overflow: ellipsis;
      overflow: hidden;

      color: #4D4D4D;
      transition: .4s;

      border-bottom: 1px solid #D6D6D6;
      text-decoration: none;
    }
  }

  .agenda-badge {
    width: 100%;
    height: 40px;

    background: rgba(145, 145, 145, 0.5);

    &__body {
      display: flex;
      align-items: center;

      padding-left: 10px;

      width: 100%;
      height: 40px;

      font-weight: 700;
      font-size: 14px;
      color: #fff;

      background: #FF8F00;
      border-radius: 4px 4px 0px 0px;

      box-sizing: border-box;
    }
  }


  .icon-agenda {
    &--incoming-call {
      background: url('../assets/agenda/agenda-incoming-call.svg') no-repeat center center;
    }

    &--incoming-message {
      background: url('../assets/agenda/agenda-incoming-message.svg') no-repeat center center;
    }

    &--meeting {
      background: url('../assets/agenda/agenda-meeting.svg') no-repeat center center;
    }

    &--other {
      background: url('../assets/agenda/agenda-other.svg') no-repeat center center;
    }
    
    &--outgoing-call {
      background: url('../assets/agenda/agenda-outgoing-call.svg') no-repeat center center;
    }

    &--outgoing-message {
      background: url('../assets/agenda/agenda-outgoing-message.svg') no-repeat center center;
    }

    &--task {
      background: url('../assets/agenda/agenda-task.svg') no-repeat center center;
    }
  }

  .form__input input:not(.control__input), .time-wrapper input {
    &:hover {
      color: #629100;
    } 
  }

  .btn-down {
    &__unread {
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

</style>

