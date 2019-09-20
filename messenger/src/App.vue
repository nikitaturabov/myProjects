<template>
  <div    ref="messenger"
          class="messenger"
          :class="{ 'messenger--disabled': isDisabled || isOpenFirstEvent }"

          @click="closeSelect"
        >

    <messenger-head class="messenger__head"
    
                    :messagesFilter="formData !== null ? formData.filters.message: []"
                    :phoneList="phoneList"
                    :style="{ 'z-index': isOpenFirstEvent ? '5': '20' }"   
                    
                    @head:action="actionHead"></messenger-head>
    <first-event
                  class="messenger__first-event"
                  v-if="isShowFirstEvent"
                  
                  :firstEvent="firstEvent"

                  @open="handleOpenFirstEvent"
    >
    </first-event>

    <div class="global-loader" v-if="isShowLoader" :style="{ 'height': isEmptyFormData ? 'calc(100% - 121px)' : '100%' }">
      <svg width="134" height="91" viewBox="0 0 134 91" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M85.4454 19.5363C82.0712 11.6653 76.3374 5.94094 68.405 2.55597C64.4404 0.864161 60.2867 0 55.9474 0C51.6088 0 47.4858 0.856 43.5255 2.55597C35.6589 5.93194 29.8996 11.6526 26.5194 19.5363C24.8256 23.4859 24 27.6238 24 31.9648C24 36.3067 24.8256 40.4789 26.5194 44.4294C29.8996 52.3131 35.6596 58.0681 43.5255 61.4449C47.4865 63.1448 51.6087 64 55.9474 64C60.2861 64 64.4404 63.1358 68.4044 61.4449C76.3367 58.0598 82.0706 52.2997 85.4455 44.4294C87.1445 40.4662 88 36.3067 88 31.9648C88 27.6238 87.1452 23.4993 85.4454 19.5363ZM80.3372 46.11C77.8252 50.4204 74.3838 53.8399 70.0496 56.3681C65.7416 58.8815 61.0214 60.149 55.9481 60.149C52.1343 60.149 48.4951 59.4141 45.0305 57.9083C41.566 56.4033 38.5747 54.4247 36.0725 51.9217C33.5702 49.4181 31.5786 46.396 30.0893 42.9236C28.6044 39.464 27.8849 35.7816 27.8849 31.965C27.8849 26.8882 29.1315 22.1893 31.6294 17.8909C34.1362 13.5768 37.5782 10.1537 41.8818 7.63274C46.1847 5.11193 50.8742 3.85111 55.9474 3.85111C61.0214 3.85111 65.7408 5.11936 70.0488 7.63274C74.3831 10.1611 77.817 13.5841 80.3364 17.8908C82.8558 22.1968 84.1152 26.8882 84.1152 31.9648C84.1152 37.0417 82.8641 41.7726 80.3372 46.11Z" :fill="getLoaderColor"/>
        <path d="M57.9771 31.6848V13.549C57.9771 12.4637 57.0321 11.5884 55.9473 11.5884C54.9328 11.5884 54.0228 12.4637 54.0228 13.549V31.9648C54.0228 32 54.093 32.1404 54.093 32.2451C54.0228 32.8754 54.1983 33.4005 54.6178 33.821L65.0809 44.2891C65.781 44.9896 67.0755 44.9896 67.7751 44.2891C68.5797 43.484 68.5267 42.3157 67.7751 41.5583L57.9771 31.6848Z" :fill="getLoaderColor"/>
        <path d="M3.49609 76.5898L0.683594 75.9355C1.28906 73.6048 3.01107 72.4395 5.84961 72.4395C7.5293 72.4395 8.79557 72.8105 9.64844 73.5527C10.5078 74.2884 10.9375 75.1543 10.9375 76.1504C10.9375 76.834 10.7422 77.4525 10.3516 78.0059C9.96094 78.5527 9.375 79.0345 8.59375 79.4512C9.54427 79.7767 10.2572 80.2389 10.7324 80.8379C11.2077 81.4303 11.4453 82.1628 11.4453 83.0352C11.4453 84.2917 10.9831 85.3073 10.0586 86.082C9.14062 86.8568 7.76367 87.2441 5.92773 87.2441C4.43034 87.2441 3.2487 86.9967 2.38281 86.502C1.51693 86.0007 0.865885 85.0664 0.429688 83.6992L3.07617 82.8301C3.34961 83.6895 3.71094 84.2461 4.16016 84.5C4.61589 84.7539 5.17578 84.8809 5.83984 84.8809C6.7513 84.8809 7.41536 84.6855 7.83203 84.2949C8.2487 83.8978 8.45703 83.4453 8.45703 82.9375C8.45703 82.3516 8.2194 81.8796 7.74414 81.5215C7.27539 81.1634 6.56576 80.9844 5.61523 80.9844H4.96094V78.8262H5.29297C6.17839 78.8262 6.85547 78.6276 7.32422 78.2305C7.79297 77.8333 8.02734 77.306 8.02734 76.6484C8.02734 76.1276 7.83529 75.6882 7.45117 75.3301C7.07357 74.972 6.52995 74.793 5.82031 74.793C4.60938 74.793 3.83464 75.3919 3.49609 76.5898ZM28.1043 87H24.9598L23.7098 83.748H17.9871L16.8055 87H13.7391L19.3152 72.6836H22.3719L28.1043 87ZM22.782 81.3359L20.8094 76.0234L18.8758 81.3359H22.782ZM30.9937 72.6836H40.691V75.0859H33.8844V87H30.9937V72.6836ZM43.3949 87V72.6836H48.0336C49.7914 72.6836 50.9372 72.7552 51.4711 72.8984C52.2914 73.1133 52.9783 73.582 53.5316 74.3047C54.085 75.0208 54.3617 75.9486 54.3617 77.0879C54.3617 77.9668 54.2022 78.7057 53.8832 79.3047C53.5642 79.9036 53.1573 80.3757 52.6625 80.7207C52.1742 81.0592 51.6762 81.2839 51.1684 81.3945C50.4783 81.5312 49.4789 81.5996 48.1703 81.5996H46.2855V87H43.3949ZM46.2855 75.1055V79.168H47.8676C49.0069 79.168 49.7686 79.0931 50.1527 78.9434C50.5368 78.7936 50.8363 78.5592 51.0512 78.2402C51.2725 77.9212 51.3832 77.5501 51.3832 77.127C51.3832 76.6061 51.2302 76.1764 50.9242 75.8379C50.6182 75.4993 50.2309 75.2878 49.7621 75.2031C49.4171 75.138 48.7237 75.1055 47.682 75.1055H46.2855ZM56.2062 72.6836H59.4387L62.7785 80.1152L65.6301 72.6836H68.6477L63.8137 83.5625C63.2863 84.7409 62.7492 85.6393 62.2023 86.2578C61.6555 86.8698 60.9491 87.1758 60.0832 87.1758C59.2303 87.1758 58.563 87.1204 58.0812 87.0098V84.8613C58.4914 84.8874 58.8625 84.9004 59.1945 84.9004C59.8651 84.9004 60.3436 84.7799 60.6301 84.5391C60.923 84.2917 61.203 83.7643 61.4699 82.957L56.2062 72.6836ZM73.3438 76.5898L70.5312 75.9355C71.1367 73.6048 72.8587 72.4395 75.6973 72.4395C77.377 72.4395 78.6432 72.8105 79.4961 73.5527C80.3555 74.2884 80.7852 75.1543 80.7852 76.1504C80.7852 76.834 80.5898 77.4525 80.1992 78.0059C79.8086 78.5527 79.2227 79.0345 78.4414 79.4512C79.3919 79.7767 80.1048 80.2389 80.5801 80.8379C81.0553 81.4303 81.293 82.1628 81.293 83.0352C81.293 84.2917 80.8307 85.3073 79.9062 86.082C78.9883 86.8568 77.6113 87.2441 75.7754 87.2441C74.278 87.2441 73.0964 86.9967 72.2305 86.502C71.3646 86.0007 70.7135 85.0664 70.2773 83.6992L72.9238 82.8301C73.1973 83.6895 73.5586 84.2461 74.0078 84.5C74.4635 84.7539 75.0234 84.8809 75.6875 84.8809C76.599 84.8809 77.263 84.6855 77.6797 84.2949C78.0964 83.8978 78.3047 83.4453 78.3047 82.9375C78.3047 82.3516 78.0671 81.8796 77.5918 81.5215C77.123 81.1634 76.4134 80.9844 75.4629 80.9844H74.8086V78.8262H75.1406C76.026 78.8262 76.7031 78.6276 77.1719 78.2305C77.6406 77.8333 77.875 77.306 77.875 76.6484C77.875 76.1276 77.6829 75.6882 77.2988 75.3301C76.9212 74.972 76.3776 74.793 75.668 74.793C74.457 74.793 73.6823 75.3919 73.3438 76.5898ZM85.0906 72.6836H87.9812V78.7773C88.6258 78.7122 89.062 78.5462 89.2898 78.2793C89.5177 78.0124 89.8693 77.2702 90.3445 76.0527C90.9435 74.5033 91.5457 73.5397 92.1512 73.1621C92.7501 72.7845 93.7169 72.5957 95.0516 72.5957C95.1167 72.5957 95.2566 72.5924 95.4715 72.5859V74.7246L95.0613 74.7148C94.4689 74.7148 94.0359 74.7897 93.7625 74.9395C93.4891 75.0827 93.2677 75.304 93.0984 75.6035C92.9292 75.903 92.6785 76.5182 92.3465 77.4492C92.1707 77.944 91.9786 78.3574 91.7703 78.6895C91.5685 79.0215 91.2072 79.334 90.6863 79.627C91.3309 79.8092 91.8615 80.1771 92.2781 80.7305C92.7013 81.2839 93.1635 82.0651 93.6648 83.0742L95.618 87H92.2195L90.5105 83.2988C90.4845 83.2467 90.4292 83.1458 90.3445 82.9961C90.312 82.944 90.1915 82.7194 89.9832 82.3223C89.6121 81.6191 89.3061 81.1797 89.0652 81.0039C88.8309 80.8281 88.4695 80.737 87.9812 80.7305V87H85.0906V72.6836ZM111.359 87H108.214L106.964 83.748H101.242L100.06 87H96.9938L102.57 72.6836H105.627L111.359 87ZM106.037 81.3359L104.064 76.0234L102.13 81.3359H106.037ZM114.082 87V84.2559H116.827V87H114.082ZM120.849 87V84.2559H123.593V87H120.849ZM127.615 87V84.2559H130.359V87H127.615Z" :fill="getLoaderColor"/>
      </svg>
    </div>

    <div  class="messenger__body"
          ref="messengerBody"
          id="feed__body"

          :style="{ 'padding-top': isShowFirstEvent ? '150px': '25px' }"

          @scroll="handleScroll">

      <!-- <div class="messenger-layer" v-if="agendaId.length > 0" :style="{ height: `calc(100% - ${40 + textareaHeight}px)` }"></div> -->
      <div class="messenger-layer" v-if="agendaId.length > 0 && hasAgendaItem" :style="{ height: `calc(100% - ${40 + textareaHeight}px)` }"></div>
      
      <div style="overflow: hidden;">
        <div ref="textareaAgendaWrap" class="textarea-agenda-wrap"></div>
      </div>
      <div class="messenger__page-buttons" v-if="pageButtons && pageButtons.length > 0 && acts.length !== 0">
        <!-- <a @click="loadNext" class="messenger__next-btn messenger__next-btn--all" href="feed://show/all">Показать все</a> -->
        <a @click="loadNext" class="messenger__next-btn" :class="btn.main ? 'messenger__next-btn--all': 'messenger__next-btn--half'" v-for="(btn, index) in pageButtons" :href="btn.url" :key="index">
          {{ btn.text }}
        </a>
        <div class="feed-loader"
              :class="{ 'feed-loader--active': isLoaderActive }"
              ref="loader">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.119 12.159H12.042C11.8033 12.159 11.5744 12.2538 11.4056 12.4226C11.2368 12.5914 11.142 12.8203 11.142 13.059C11.142 13.2977 11.2368 13.5266 11.4056 13.6954C11.5744 13.8642 11.8033 13.959 12.042 13.959H14.202C13.2092 14.9965 11.929 15.7134 10.5256 16.0177C9.12233 16.3219 7.66009 16.1996 6.3268 15.6665C4.99351 15.1334 3.85008 14.2138 3.04343 13.0259C2.23678 11.8379 1.80376 10.4359 1.8 9C1.8 8.7613 1.70518 8.53239 1.5364 8.3636C1.36761 8.19482 1.13869 8.1 0.9 8.1C0.661305 8.1 0.432387 8.19482 0.263604 8.3636C0.0948211 8.53239 0 8.7613 0 9C0.00475799 10.7575 0.523999 12.4752 1.49364 13.941C2.46329 15.4069 3.8409 16.5567 5.45647 17.2487C7.07204 17.9407 8.85486 18.1445 10.5849 17.835C12.315 17.5255 13.9166 16.7162 15.192 15.507V17.1C15.192 17.3387 15.2868 17.5676 15.4556 17.7364C15.6244 17.9052 15.8533 18 16.092 18C16.3307 18 16.5596 17.9052 16.7284 17.7364C16.8972 17.5676 16.992 17.3387 16.992 17.1V13.05C16.9898 12.8175 16.8976 12.5948 16.7349 12.4287C16.5722 12.2626 16.3514 12.166 16.119 12.159ZM9 0C6.69275 0.00658097 4.47614 0.899022 2.808 2.493V0.9C2.808 0.661305 2.71318 0.432387 2.5444 0.263604C2.37561 0.0948211 2.14669 0 1.908 0C1.6693 0 1.44039 0.0948211 1.2716 0.263604C1.10282 0.432387 1.008 0.661305 1.008 0.9V4.95C1.008 5.18869 1.10282 5.41761 1.2716 5.5864C1.44039 5.75518 1.6693 5.85 1.908 5.85H5.958C6.19669 5.85 6.42561 5.75518 6.5944 5.5864C6.76318 5.41761 6.858 5.18869 6.858 4.95C6.858 4.71131 6.76318 4.48239 6.5944 4.3136C6.42561 4.14482 6.19669 4.05 5.958 4.05H3.798C4.79022 3.01308 6.06968 2.29635 7.47216 1.9918C8.87464 1.68724 10.3361 1.80877 11.669 2.34078C13.002 2.87278 14.1455 3.79099 14.9528 4.97754C15.7601 6.1641 16.1945 7.56485 16.2 9C16.2 9.23869 16.2948 9.46761 16.4636 9.6364C16.6324 9.80518 16.8613 9.9 17.1 9.9C17.3387 9.9 17.5676 9.80518 17.7364 9.6364C17.9052 9.46761 18 9.23869 18 9C18 7.8181 17.7672 6.64778 17.3149 5.55585C16.8626 4.46392 16.1997 3.47177 15.364 2.63604C14.5282 1.80031 13.5361 1.13738 12.4442 0.685084C11.3522 0.232792 10.1819 0 9 0Z" fill="#D5D5D5"/>
          </svg>
        </div>
      </div>

      <div class="messenger__logo" v-if="isNeededLoader">
        <h1>Вы ещё не общались в этом диалоге</h1>
        <p>Обсудите имеющиеся вопросы с клиентами</p>
      </div>

      <div 
          class="messenger__act"
          v-for="(act, index) in acts"
          :key="index">

        <date-line :date="act.date" :last-date="acts[index - 1] ? acts[index - 1].date : '' "></date-line>

        <!-- <transition name="fade"> -->
          <component
                      :is="act.type"

                      :id="act.id"
                      :type="act.type"
                      :url="act.url"
                      :table="act.table"

                      :way="act.way"
                      :header="act.header"
                      :status="act.status"
                      
                      :unread="act.unread"
                      
                      :author="act.author"
                      :to="checkLastTo(act.options.to, act.way)"
                      :actions="act.actions"
                      :date="act.date"
                      :files="act.attachments"
                      :state="act.options"

                      :stamp="act.stamp"
                      
                      :callFrom="act.options.from"
                      :callTo="act.options.to"
                      :passcall="act.options.passcall"

                      :buttons="act.buttons"

                      :content="act.content"
                      :statusType="act.options.type"

                      :newMessage="act.options.unread"

                      :important="act.important"
                      
                      :options="act.options[act.options.type]"
                      :theme="act.options.theme"

                      :accountId="act.options.accountId"
                      :authorId="act.options.authorId"

                      :sent="act.options.sent"
                      :error="act.options.error"

                      :quote="act.quote"
                      
                      @quote:set="handleQuote">
          </component>
        <!-- </transition> -->

      </div>
      <div style="height: 22px; width: 100%; background: transparent;" class="empty-box"></div>
    </div>

    <div class="agenda-badge"
         
         v-if="hasAgendaItem">
      <div class="agenda-badge__body">
        <button @click="backToEdit(agendaId)" class="agenda__button agenda__button--back">
          <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.215872 6.59406L4.74173 11.7537C5.02962 12.0821 5.4964 12.0821 5.78416 11.7537C6.07195 11.4256 6.07195 10.8935 5.78416 10.5654L1.77948 5.99991L5.78405 1.43457C6.07183 1.10635 6.07183 0.574263 5.78405 0.24617C5.49626 -0.0820566 5.02951 -0.0820566 4.74161 0.24617L0.215756 5.4059C0.0718647 5.57002 3.28879e-07 5.7849 3.27724e-07 5.99989C3.26569e-07 6.21498 0.0720045 6.43001 0.215872 6.59406Z" fill="white"/>
          </svg>
        </button>
        Для завершения запланируйте следующее событие
      </div>
    </div>
    
    <div ref="agenda" class="messenger__agenda agenda" style="position: relative;" v-show="agendaState && agenda.length > 0 && !hasAgendaItem">
      <div class="agenda__container">
        
        <ul class="agenda__list">
          <li
              class="agenda__item"
              v-for="(item, index) in agenda"
              :key="item.id"
              
              v-click-outside="clickOutside(item.id)">

              <div class="agenda__link" :id="`agenda-${item.id}`" @click="openEdit(index)">
                <div class="agenda__date"
                      :class="isScheduled(item.date) ? 'agenda__date--scheduled' : 'agenda__date--expired'"
                      :style="{ 'padding-right': item.date.length === 0 ? '3px' : '9px' }">
                  <div class="agenda__icon"
                      :class="`icon-agenda--${item.type}`"></div><span class="agenda__date-value" style="margin-left: 3px;" v-if="item.date.length > 0">
                        {{ getFormatDate(item.date) }}
                  </span>
                </div>

                <div class="agenda__text" style="position: relative;">
                  <span>{{ item.text }}</span>
                </div>
              </div>
              <div class="agenda__form" v-show="item.isOpen">
                <textarea @input="handleInput($event, item.id)" placeholder="Введите результат..." class="agenda__input" v-model="agendaText[item.id].text"></textarea>
                <a class="agenda__button agenda__button--complete" @click="completeEvent(item.id, item.table)" :href="item.complete">
                  <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.02892 7.48943L0 4.4683L1.51615 2.95774L4.54034 5.9707L10.4832 0L12 1.51057L4.57687 9L4.05931 8.49484L4.05052 8.50351L3.20821 7.66448L3.02892 7.48943Z" fill="#3E3E3E"/>
                  </svg>
                </a>
                <a class="agenda__button agenda__button--open" :href="item.url">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.4409 12.4515H1.55909V1.55909H7V0H1.55909C1.14559 0 0.749033 0.164261 0.456647 0.456647C0.164261 0.749033 0 1.14559 0 1.55909L0 12.4515C0.00280045 12.8632 0.168297 13.257 0.46038 13.5471C0.752463 13.8372 1.14743 14 1.55909 14H12.4409C12.8526 14 13.2475 13.8372 13.5396 13.5471C13.8317 13.257 13.9972 12.8632 14 12.4515V7H12.4409V12.4515ZM8.55909 0V1.55909H11.3591L3.73333 9.17424L4.79394 10.2348L12.4091 2.60909V5.45152H14V0H8.55909Z" fill="#919191"/>
                  </svg>
                </a>
              </div>
          </li>
        </ul>

        <button class="agenda__btn" @click="agendaClose">
          <img src="data:image/svg+xml,%3Csvg width='10' height='7' viewBox='0 0 10 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.87914 5.88032L9.74888 2.01047C9.99517 1.7643 9.99517 1.36517 9.74888 1.11912C9.50281 0.873053 9.10371 0.873053 8.85766 1.11912L5.43353 4.54335L2.00952 1.11922C1.76335 0.873153 1.36429 0.873153 1.11822 1.11922C0.872051 1.36529 0.872051 1.76439 1.11822 2.01056L4.98802 5.88042C5.11111 6.00346 5.27227 6.0649 5.43351 6.0649C5.59483 6.0649 5.75611 6.00334 5.87914 5.88032Z' fill='%23919191'/%3E%3C/svg%3E" alt="">
        </button>
      </div>
    </div>

    <!-- <ul style="max-height: 250px; overflow: scroll">
      <li v-for="(act, index) in acts" :key="index">
        {{ act.id }} ------------ {{ act.content || act.header }} ---------------- {{ index }}
      </li>
    </ul> -->
    
    <!-- <input-form
                v-if="formData !== null && formData.types.length !== 0" -->

    <!-- <input-form
                :class="{ 'feed-blur': formData !== null && isShowLoader }" -->
    
    <input-form

                :isVisible="isVisible"
                :selectTitle="selectTitle"
                :formData="formData"
                :agendaState="agendaState"
                :agenda="agenda"

                :inputMessage="inputMessage"
                :inputSubject="inputSubject"

                :from="from"
                :fromItems="formData !== null ? formData.from : {}"
                :to="to"
                :toItems="formData !== null ? formData.to : {}"
                :assignee="assignee"
                :unreadCount="unreadCount"

                :agendaText="agendaText"
                :agendaId="agendaId"
                :agendaMargin="agendaMargin"

                :hasAgendaItem="hasAgendaItem"


                :isScrollBtnVisible="isScrollBtnVisible"

                :quote="quoteForm"
                :alert="alert"

                :isShowBanner="isShowBanner"

                :htmlTemplate="htmlTemplate"
                
                @template:set="setTemplate"
                @dropdown-from:set="setFrom"
                @dropdown-to:set="setTo"
                @form:action="showSelect"
                @select:set="setSelectValue"
                @inputMessage:set="setInputMessage"
                @inputSubject:set="setInputSubject"
                @inputMessageHeight:set="setInputHeight"

                @quote:close="handleQuote"
                
                @to-bottom="_scrollToBottom"
                

                @openHint="openHint"
                @closeBanner="closeBanner">
      </input-form>
  
      <Welcome v-if="isShowHint" @close="isShowHint = false"></Welcome>
  </div>
</template>

<script>

import EventBus from '@/src/utils/event-bus.js';
import { getParentType, setStateType, setStateAssignee, setStateTo, setStateFrom, setStateQuote, setEnter, clearStateEvent, setAgendaEvent, setAgendaState, setHtmlTemplate } from '@/src/utils/globals.js';

import Comment from '@/src/components/acts/Comment.vue';
import Event from '@/src/components/acts/Event.vue';
import Task from '@/src/components/acts/Task.vue';
import Document from '@/src/components/acts/Document.vue';
import PhoneCall from '@/src/components/acts/PhoneCall.vue';
import Message from '@/src/components/acts/Message.vue';
import System from '@/src/components/acts/System.vue';
import Paid from '@/src/components/acts/Paid.vue';

import NewDate from '@/src/components/NewDate.vue';
import NewMessage from '@/src/components/NewMessage.vue';
import Form from '@/src/components/Form.vue';
import FirstEvent from '@/src/components/FirstEvent.vue';

import Head from '@/src/components/Head.vue';

import Welcome from '@/src/components/Welcome.vue';

import lodashClone from 'lodash/cloneDeep.js';

import moment from 'moment';

let lastDate = '';
let lastTo = '';

export default {
  mounted() {
    EventBus.$on('template:clear', () => {
      this.htmlTemplate = {};

      setHtmlTemplate('');
    });

    EventBus.$on('acts:render', (acts, isNew) => {
      
      this.isShowLoader = false;
      this.isNewActs = isNew;

      // if (acts.length === 0) {
      //   this.isEmptyActs = true;
      // } else {
      //   this.isEmptyActs = false;
      // }

      if (isNew) {
        this.acts = [];
        this.positionInActs = {};

        // alert('clear acts');
      }

      if (this.acts.length === 0) {
        
        for (let i = 0; i < acts.length; i++) {
          this.acts.push(lodashClone(acts[i]));
          this.$set(this.positionInActs, acts[i].id, i);
        }

        // alert('render');

      } else {
        
        this._mergeActs(acts);

      }

      //scroll
      if (isNew || this.$refs.messengerBody.scrollTop + this.$refs.messengerBody.clientHeight === this.$refs.messengerBody.scrollHeight) {
        this.$nextTick(() => {
          this._scrollToBottom();
        })
      }
    });

    EventBus.$on('message:reply', data => {
      this.selectTitle.type = data.type;
      this.selectTitle.text = data.text;
      
      this._setContactsTo();
      this._setContactsFrom();

      if (formData.from[this.selectTitle.type]) {
        formData.from[this.selectTitle.type].forEach(author => {
          if (data.authorId === author.id) {
            this.from.id = author.id;
            this.from.name = author.text;
          }
        })
      }

      if (formData.to[this.selectTitle.type]) {
        formData.to[this.selectTitle.type].forEach(account => {
          if (data.accountId === account.id) {
            this.to.id = account.id;
            this.to.name = account.text;
          }
        })
      }

      setStateType(this.selectTitle.type, getParentType(this.selectTitle.type), this.selectTitle.id);

      if (data.isQuote) {
        this.handleQuote(data);
        
        return;
      }


      this.inputSubject = data.theme;
    });

    EventBus.$on('formdata:render', formData => {

      this.formData = lodashClone(formData);

      if (this.formData === null) { return; }


      this.assignee = this.formData.to.task[0];

      let firstItemType = this.formData.types[0];

      if (firstItemType.childs.length > 0) {
        this.selectTitle.id = firstItemType.childs[0].id;
        this.selectTitle.text = firstItemType.childs[0].title;
        this.selectTitle.type = firstItemType.childs[0].type;
        this.selectTitle.error = firstItemType.childs[0].error;
      } else {
        this.selectTitle.id = firstItemType.id;
        this.selectTitle.text = firstItemType.title;
        this.selectTitle.type = firstItemType.type;
        this.selectTitle.error = firstItemType.error;
      }


      this._setContactsTo();
      this._setContactsFrom();

      setStateType(this.selectTitle.type, firstItemType.type, this.selectTitle.id);
      setStateAssignee(this.formData.to.task || this.formData.to.task[0]);
    });

    EventBus.$on('agenda:set', agenda => {
      this.agenda = agenda;
      
      clearStateEvent();
      
      this.agenda.forEach(item => {

        if (!this.agendaText[item.id]) {
          this.$set(this.agendaText, item.id, { text: '' });
        }
      })
    });

    EventBus.$on('agenda:setState', state => {
      this.agendaState = state;

      setAgendaState(state);
    });

    EventBus.$on('form-text:set', value => {
      if (value.length === 0) {
        document.querySelector('#feed__text').style.height = '38px';
      }

      this.inputMessage = value;
    });

    EventBus.$on('assignee:set', assignee => {
      this.assignee = assignee;

      setStateAssignee(assignee);
    })

    EventBus.$on('task:set', task => {
      this.selectTitle.id = task.id;
      this.selectTitle.text = task.text;
      this.selectTitle.type = 'task-type';

      setStateType('', 'task', task.id);
    });
    
    EventBus.$on('form-subject:set', value => {
      this.inputSubject = value;
    });

    EventBus.$on('phone-list:set', phoneList => {
      this.phoneList = phoneList;
    })

    EventBus.$on('page-buttons:set', buttons => {
      this.pageButtons = buttons;
      this.isLoaderActive = false;
    });
    
    EventBus.$on('quote:clear', () => {
      this.handleQuote(null);
    });

    EventBus.$on('new-message:set', (id, count) => {
      if (id === null) {

        this._getItem(this.lastUnreadId) && (this._getItem(this.lastUnreadId).unread = false);

        this.lastUnreadId = '';
        this.unreadCount = 0;


        return;
      }


      if (this.lastUnreadId) {
        this._getItem(this.lastUnreadId).unread = false;
      }

      if (id) {
        this._getItem(id).unread = true;
      }

      this.lastUnreadId = id;
      this.unreadCount = count;
    });
    
    EventBus.$on('send-enter:set', value => {
      this.alert.isSendByEnter = value;
      setEnter(value);
    });

    EventBus.$on('agenda-id:set', agendaId => {
      this.agendaId = agendaId;

      for (let i = 0; i < this.agenda.length; i++) {
        if (this.agenda[i].id === this.agendaId) {
          this.agenda[i].isOpen = false;

          break;
        }
      }
    });

    
    EventBus.$on('banner:show', () => {
      this.isShowBanner = true;
    });

    EventBus.$on('hint:show', () => {
      this.isShowHint = true;
    });

    
    EventBus.$on('loader:show', () => {
      this.isShowLoader = true;
    });

    EventBus.$on('firstEvent:set', firstEvent => {
      if (firstEvent !== null && Object.keys(firstEvent).length > 0) {
        this.isShowFirstEvent = true;
        this.isOpenFirstEvent = true;
        this.firstEvent = firstEvent;

        return;
      }

      this.isShowFirstEvent = false;

    });

    
    EventBus.$on('template:set', template => {
      this.$set(this.htmlTemplate, 'id', template.id);
      this.$set(this.htmlTemplate, 'text', template.text);

      this.inputMessage = '';
      this.inputSubject = '';

      setHtmlTemplate(this.htmlTemplate.id);
    });

    
    this._setContactsTo();
    this._setContactsFrom();

  },
  data() {
    return {
      acts: [],
      positionInActs: {},
      isVisible: false,
      isShowLoader: false,
      firstEvent: {},
      isShowFirstEvent: false,
      selectTitle: {
        id: '',
        text: 'Viber1',
        type: 'viber1'
      },
      formData: {
        types: [],
        to: {},
        from: {},
        templates: {},
        filters: {
          message: []
        }
      },
      from: {
        id: '',
        name: ''
      },
      to: {
        id: '',
        name: ''
      },
      agenda: [],
      assignee: {},
      agendaState: true,
      inputMessage: '',
      inputSubject: '',
      phoneList: [],
      lastScrollTop: 0,
      isScrollBtnVisible: true,
      isDisabled: false,
      quoteForm: {},
      pageButtons: [],
      isLoaderActive: false,
      lastUnreadId: null,
      unreadCount: 0,
      alert: {
         isAlertVisible: false,
         isSendByEnter: false
      },
      agendaText: {},
      agendaId: '',
      textareaHeight: 119,
      agendaMargin: 0,
      isShowHint: false,
      isShowBanner: false,
      // isEmptyActs: false,
      isNewActs: false,
      htmlTemplate: {},
      isOpenFirstEvent: false
    }
  },
  methods: {
    setTemplate(template) {
      this.htmlTemplate = template;

      if (template.html) {
        this.inputMessage = '';
        this.inputSubject = '';
      }
    },
    checkLastTo(name, way) {
      let current = `${name}-${way}`;

      if (lastTo === current) {
        return '';
      }

      lastTo = current;
      return name;
    },
    openHint(e) {
      this.isShowHint = true;
    },
    closeBanner(e) {
      this.isShowBanner = false;
    },
    closeSelect(e) {
      if (e.target.closest('.select__link--hoverable')) { return; };
      if (!e.target.closest('.select__input')) { this.isVisible = false; };
    },
    showSelect(value) {
      this.isVisible = value;
    },
    setFrom(item) {
      this.from.id = item.id;
      this.from.name = item.text;
    },
    setTo(items) {
      if (items.length > 1) {
        this.to.id = '';
        this.to.name = `${items.length} представителя`

        return;
      }

      this.to.id = items[0].id;
      this.to.name = items[0].text;
    },
    setSelectValue(obj) {
      this.selectTitle.text = obj.value;
      this.selectTitle.type = obj.type;
      this.selectTitle.error = obj.error;

      this._setContactsTo();
      this._setContactsFrom();

    },
    setInputHeight(height) {
      if (height > 319) { return; }


      this.$nextTick(() => {
        this.textareaHeight = height;
      })
    },
    setInputMessage(value) {
      this.inputMessage = value;
    },
    setInputSubject(value) {
      this.inputSubject = value;
    },
    handleScroll(e) {
      if (this.$refs.messengerBody.scrollTop + this.$refs.messengerBody.clientHeight === this.$refs.messengerBody.scrollHeight) {
        this.isScrollBtnVisible = false;
      } else {
        this.isScrollBtnVisible = true;
      }
    },
    actionHead(value) {
      this.isDisabled = value;
    },
    handleQuote(data) {
      if (data !== null) {
        setStateType(this.selectTitle.type, getParentType(this.selectTitle.type), this.selectTitle.id);
      }

      this.quoteForm = data;
      setStateQuote(data);
    },
    loadNext() {
      this.isLoaderActive = true;
    },
    agendaClose() {
      this.agendaState = false;

      setAgendaState(false);
    },
    clickOutside(id) {
      return () => {
        for (let i = 0; i < this.agenda.length; i++) {
          if (this.agenda[i].id === id) {
            // this.$refs.textareaAgendaWrap.innerHTML = '';
            this.agenda[i].isOpen = false;
            break;
          }
        }
      }
    },
    isScheduled(value) {
      const today = moment(new Date());
      return today.diff(moment(value), 'days') <= 0;
    },
    getFormatDate(value) {
      if (moment(value).format('HH:mm') === '00:00') {
        return moment(value).format('DD.MM');
      }

      return moment(value).format('DD.MM в HH:mm');
    },
    openEdit(index) {
      let agendaID = this.agenda[index].id;

      this.agenda[index].isOpen = !this.agenda[index].isOpen;
      
      this.$nextTick(() => {
        document.querySelector(`#agenda-${agendaID}`).scrollIntoView();

        this.$refs.textareaAgendaWrap.innerHTML = this.agendaText[agendaID].text;
      });

    },
    completeEvent(id, table) {
      setAgendaEvent(id, table, this.agendaText[id].text);
    },
    backToEdit(id) {
      for (let i = 0; i < this.agenda.length; i++) {
        if (this.agenda[i].id === id) {
          this.$nextTick(() => {
            this.agenda[i].isOpen = true;
          })

          this.agendaId = '';
          break;
        }
      }
    },
    handleInput(e, id) {
      this.$refs.textareaAgendaWrap.innerHTML = this.agendaText[id].text;
      this.$nextTick(() => {
        e.target.style.height = this.$refs.textareaAgendaWrap.scrollHeight + 'px';

        if (this.$refs.textareaAgendaWrap.scrollHeight <= 160) {
          this.agendaMargin = this.$refs.textareaAgendaWrap.scrollHeight;
        } else {
          this.agendaMargin = 160;
        }
      })
    },
    handleOpenFirstEvent(b) {
      this.isOpenFirstEvent = b;
    },
    _getItem(id) {

      for (let i = 0; i < this.acts.length; i++) {
        if (this.acts[i].id === id) {
          return this.acts[i];
        }
      }

      return undefined;

    },
    _mergeActs(acts) {
      for (let i = 0; i < acts.length; i++) {
        let pos = this.positionInActs[acts[i].id];

        if (pos !== undefined) {
          // alert('repaint');

          this.$set(this.acts, pos, acts[i]);

          acts.splice(i, 1);
          continue;
        }

        // return;
      }

      if (acts.length > 0 && acts[acts.length - 1].stamp <= this.acts[0].stamp) {
        // alert('unshift');

        for (let i = acts.length - 1; i >= 0; i--) {
          
          Object.keys(this.positionInActs).forEach(key => {
            this.positionInActs[key] = this.positionInActs[key] + 1;
          })


          this.acts.unshift(acts[i]);
          this.positionInActs[acts[i].id] = 0;
        }

        return;
      }
      

      if (acts.length > 0 && acts[0].stamp >= this.acts[this.acts.length - 1].stamp) {
        // alert('push');

        for (let i = 0; i < acts.length; i++) {
          this.acts.push(acts[i]);
          this.positionInActs[acts[i].id] = Object.keys(this.positionInActs).length;
        }

        return;
      }

      for (let i = 0; i < acts.length; i++) {
        let newPosition = 0;

        for (let j = 0; j < this.acts.length; j++) {
          if (acts[i].stamp > this.acts[j].stamp) {
            newPosition = j;
          }
        }

        // alert('splice');

        Object.keys(this.positionInActs).forEach(key => {
          this.positionInActs[key] = this.positionInActs[key] + 1;
        })

        
        this.positionInActs[acts[i].id] = newPosition;

        this.acts.splice(newPosition, 0, acts[i]);
      }
    },
    _setContactsTo() {
      const to = this.formData.to[this.selectTitle.type];

      this.to.id = '';
      this.to.name = '';
      setStateTo([]);

      if (to && to.length !== 0) {
        this.to.id = to[0].id;
        this.to.name = to[0].text;

        setStateTo([this.to]);
      }
    },
    _setContactsFrom() {
      const from = this.formData.from[this.selectTitle.type];

      this.from.id = '';
      this.from.name = '';
      setStateFrom('');
      
      if (from && from.length !== 0) {
        this.from.id = from[0].id;
        this.from.name = from[0].text;

        setStateFrom(this.from);
      }
    },
    _scrollToBottom() {
      this.$refs.messengerBody.scrollTop = this.$refs.messengerBody.scrollHeight;
    }
  },
  computed: {
    getLoaderColor() {
      return this.formData !== null ? '#888888' : '#F0F0F0';
    },
    isNeededLoader() {
      return this.acts.length === 0 && this.isNewActs;
    },
    isEmptyFormData() {
      return this.formData === null;
    },
    hasAgendaItem() {
      for (let i = 0; i < this.agenda.length; i++) {
        if (this.agenda[i].id === this.agendaId) {
          return true;
        }
      }

      return false;
    },
    hasAgendaOpenItem() {
      for (let i = 0; i < this.agenda.length; i++) {
        if (this.agenda[i].isOpen) {
          return true;
        }
      }

      return false;
    }
  },
  watch: {
    agenda: {
      deep: true,
      handler: function(val) {
        for (let i = 0; i < val.length; i++) {
          if (val[i].isOpen === true) {
            this.$refs.textareaAgendaWrap.innerHTML = this.agendaText[val[i].id];

            this.$nextTick(() => {
              this.agendaMargin = this.$refs.textareaAgendaWrap.scrollHeight;
            })
            
            return;
          }
        }

        this.agendaMargin = 0;
      }
    }
  },
  components: {
    'comment': Comment,
    'event': Event,
    'task': Task,
    'document': Document,
    'phonecall': PhoneCall,
    'message': Message,
    'system': System,
    'paid': Paid,
    'date-line': NewDate,
    'input-form': Form,
    'messenger-head': Head,
    'unread': NewMessage,
    'firstEvent': FirstEvent,
    Welcome
  }
}
</script>

<style lang="scss">
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video, button {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    // font: inherit;
    vertical-align: baseline;
  }
  
  ul {
    list-style: none;
  }

  @mixin font($fontSize, $fontWeight, $color) {
    font-size: $fontSize + px;
    font-weight: $fontWeight;

    color: $color;
  }

  input {
    &::-ms-clear {
      display: none;
    }
  }

  .act__author {
    // max-width: 50%;

    margin-right: 20px;

    color: #919191;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .act--message-out {
    .act__author {
      color: #576F25;
    }
  }

  .act--message-in {
    .act__author {
      color: #919191;
    }
  }

  .textarea-agenda-wrap {
    position: absolute;
    top: 0;
    left: 0;

    z-index: -5;
    visibility: hidden;

    padding: 11px;
    
    width: calc(100% - 99px);
    min-height: 40px;

    font-family: Arial, Helvetica;
    font-size: 14px;

    border: none;
    border-radius: 8px;

    box-sizing: border-box;
  
    white-space: pre-line;
  }

  .messenger {
    font-family: Arial, Helvetica;
  }

  .messenger-layer {
    position: fixed;
    
    top: 0;
    left: 0;

    z-index: 15;

    // height: calc(100% - 159px);
    height: 100%;
    width: 100%;

    background: rgba(145, 145, 145, 0.5);
  }

  .messenger-wrap {
    height: 100vh;
  }

  .messenger {
    display: flex;
    flex-direction: column;

    position: relative;

    height: 100%;
    width: 100%;

    min-width: 700px;

    &__first-event {
      position: absolute;

      left: 7px;
      top: 33px;
      
      width: calc(100% - 14px);

      z-index: 25;

      background: #FFFFFF;
      box-shadow: 0px -2px 10px rgba(139, 139, 139, 0.34);
      border-radius: 4px;
    }

    &__logo {
      display: flex;
      flex-direction: column;

      align-items: center;
      justify-content: flex-end;

      margin-top: 50px;
      margin-left: auto;
      margin-right: auto;

      width: 393px;
      height: 375px;

      background: url('./assets/logo.png') no-repeat top center;

      h1 {
        font-size: 18px;
        font-weight: 700;

        color: #4D4D4D;

        text-transform: uppercase;
        text-align: center;
      }

      p {
        margin-top: 8px;
        margin-right: auto;
        margin-left: auto;

        max-width: 240px;

        font-size: 15px;
        font-weight: 700;

        color: #C4C4C4;

        text-align: center;
      }
    }

    &__agenda {

      // padding-right: 27px;
      padding-left: 10px;
      padding-right: 10px;

      box-sizing: border-box;
    }

    &__head {
      position: absolute;
      top: 0;
      left: 0;

      z-index: 20;
      
      width: 100%;

      box-sizing: border-box;
    }

    &__body {
      position: relative;      

      margin-top: 9px;

      padding-top: 25px;
      // padding-bottom: 25px;
      
      flex: 1;

      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 10px;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        border: 1px solid #fff;
        background-color: #D6D6D6;
      }
    }

    &__form {
      position: relative;
      z-index: 16;
      box-shadow: 0px -2px 10px rgba(139, 139, 139, 0.25);
    }

    &__page-buttons {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__next-btn {
      display: inline-flex;
      align-items: center;

      height: 28px;
      padding-right: 12px;
      padding-left: 12px;
      
      border-radius: 7px;

      font-size: 12px;
      color: #3E3E3E;
      text-decoration: none;

      transition: .2s;

      margin-right: 6px;

      &--all {
        background: #FEDD46;

        &:hover {
          background: #D3B83F;
        }
      }

      &--half {
        background: #F0F0F0;

        &:hover {
          background: #C6C6C6;
        }
      }
    }

    &--disabled {
      overflow-y: hidden;

      &::after {
        content: '';

        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        background: #919191;
        opacity: .5;

        z-index: 16;
      }
    }
  }

  .agenda {
    &__container {
      position: relative;

      border-radius: 4px;
      background: #fff;
      box-shadow: 0px -2px 10px rgba(139, 139, 139, 0.25);
    }

    &__list {
      padding-bottom: 2px;
      padding-bottom: 7px;

      padding-left: 28px;
      padding-right: 10px;

    }

    &__icon {
      position: absolute;
      top: 50%;
      left: 5px;

      transform: translate(0, -50%);

      min-width: 20px;
      min-height: 16px;

      width: 20px;
      height: 100%;
    }


    &__date {
      position: relative;

      line-height: 24px;
      height: 23px;

      padding-left: 28px;
      padding-right: 9px;

      white-space: nowrap;

      font-size: 11px;
      font-weight: 700;
      color: #fff;

      border-radius: 16px;


      box-sizing: border-box;

      transition: .2s;

      &--expired {
        background: #EF5350;
      }

      &--scheduled {
        background: #00B1B5;
      }
    }

    &__text {
      margin-left: 7px;

      overflow: hidden;
      text-overflow: ellipsis;

      white-space: nowrap;

      width: 100%;
    }
    
    &__link {
      display: flex;
      align-items: center;

      padding-top: 5px;

      font-size: 13px;
      color: #7C7C7C;
      text-decoration: none;

      cursor: pointer;
    
      &:hover {

        color: #4D4D4D;

        .agenda__date--expired {
          background: #A82927;
        }
        .agenda__date--scheduled {
          background: #00636B;
        }
      }
    }

    &__btn {
      position: absolute;

      bottom: 5px;
      left: 2px;

      display: flex;
      justify-content: center;
      align-items: center;

      padding: 0;

      width: 21px;
      height: 21px;

      background: transparent;

      border: none;
      border-radius: 4px;

      cursor: pointer;

      &:hover {
        background: #C6C6C6;
      }

      &:focus {
        outline: none;
      }
    }

    &__form {
      display: flex;
      align-items: center;

      padding-top: 4px;
    }

    &__input {
      flex: 1;

      height: 40px;
      max-height: 160px;

      padding: 11px;

      font-family: Arial, Helvetica;
      font-size: 14px;

      background: #F0F0F0;
      border: none;
      border-radius: 8px;

      box-sizing: border-box;

      resize: none;
      outline: none;
      overflow-y: auto;
    }

    &__button {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 24px;
      height: 24px;

      transition: .2s;

      border-radius: 5px;
      background: transparent;
      cursor: pointer;
      
      &--complete {
        margin-left: 10px;

        background: #FEDD46;

        &:hover {
          background: #D3B83F;
        }
      }

      &--open {
        margin-left: 3px;
        
        &:hover {
          background: #F0F0F0;
        }
      }

      &--back {
        margin-right: 9px;

        &:hover {
          background: #C36F03;
        }
      }
    }
  }

  .act--phone-out .act__call-content {
    color: #779733;
  }

  .act {
    margin-top: 15px;
    margin-right: 12px;
    margin-left: 12px;

    &--message-in {
      .act__status {
        border: 1px solid #919191;
        color: #919191;
      }
    }

    &--phone-out {
      .act__duration {
        color: #779733;
        border-color: #779733;
      }
    }

    .wrap {
      flex-grow: 1;
      flex-shrink: 1;

      // flex: 1;
      // flex: auto;
      margin-right: 16px;
      // margin-left: 16px;

      &--empty {
        display: flex;
        align-items: center;
      }
    }

    &__call-content {
      margin-top: 10px;
      margin-left: 36px;

      font-size: 15px;
      font-style: italic;
      font-weight: 400;
      color: #999;
    }

    &__content {
      position: relative;

      display: flex;
      
      padding: 14px;

      box-sizing: border-box;

      border-radius: 10px;

      &--wait {
        &::before {
          content: '';

          position: absolute;

          bottom: 0;
          left: -24px;

          width: 19px;
          height: 19px;

          background: url("data:image/svg+xml,%3Csvg width='19' height='19' viewBox='0 0 19 19' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.0909 8.18182H9.81818V4.09091H8.18182V9.81818H13.0909V8.18182Z' fill='%239E9E9E'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18ZM9 16.3636C13.0668 16.3636 16.3636 13.0668 16.3636 9C16.3636 4.93318 13.0668 1.63636 9 1.63636C4.93318 1.63636 1.63636 4.93318 1.63636 9C1.63636 13.0668 4.93318 16.3636 9 16.3636Z' fill='%239E9E9E'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
        }
      }

      &--error {
        &::before {
          content: '';

          position: absolute;

          bottom: 0;
          left: -24px;

          width: 19px;
          height: 17px;

          background: url("data:image/svg+xml,%3Csvg width='19' height='17' viewBox='0 0 19 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.00079 12.7997C9.4528 12.7997 9.81923 12.4415 9.81923 11.9997C9.81923 11.5578 9.4528 11.1996 9.00079 11.1996C8.54879 11.1996 8.18236 11.5578 8.18236 11.9997C8.18236 12.4415 8.54879 12.7997 9.00079 12.7997Z' fill='%23EF5350'/%3E%3Cpath d='M9.82165 4.79907H8.18478V10.3995H9.82165V4.79907Z' fill='%23EF5350'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M17.5434 11.1635L11.8119 1.58223C11.2365 0.606768 10.164 0.00132984 9.00417 2.18854e-06C7.8442 -0.00132561 6.77135 0.601614 6.18878 1.58227L0.455129 11.167C-0.139411 12.1446 -0.152861 13.3695 0.423017 14.3685C0.999373 15.3684 2.07856 15.9906 3.25241 15.9999L14.7377 16C15.9238 15.9887 17.0009 15.3684 17.5772 14.3695C18.1528 13.3717 18.1399 12.1494 17.5434 11.1635ZM1.86455 11.9799L7.60245 2.38812C7.89303 1.89899 8.42598 1.59947 9.00226 1.60013C9.57847 1.60079 10.1112 1.90154 10.397 2.38598L16.133 11.9748C16.4337 12.4718 16.4402 13.0837 16.152 13.5833C15.8634 14.0835 15.3239 14.3942 14.7297 14.3999L3.25907 14.3998C2.67768 14.3952 2.13712 14.0835 1.84847 13.5828C1.56015 13.0826 1.56689 12.4694 1.86455 11.9799Z' fill='%23EF5350'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-size: 18px 16px;
          background-position: center center;
        }
      }
    }

    &__title {
      @include font(14, 400, #4D4D4D);

      font-style: normal;

      &--wrap {
        white-space: pre-line;
      }
    }

    &__head {
      display: flex;
      align-items: center;

      min-width: 20px;
    }

    &__icon {
      align-self: flex-start;
      flex-shrink: 0;

      margin-right: 10px;

      width: 20px;
      height: 20px;
    }

    &__text {
      @include font(12, 400, #212121);

      width: 100%;
      word-break: break-word;
      word-wrap: break-word;

      &--wrap {
        white-space: pre-line;
      }

      &--comment {
        font-size: 14px;
      }

      &--cloud {
        margin-left: 10px;
      }
    }

    &__info {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      margin-bottom: 6px;

      padding-right: 8px;
      padding-left: 8px;

      @include font(11, 700, #AEAEAE);

      time {
        white-space: pre;
      }

      &--opacity {
        opacity: 0.35;
      }

      &--out, &--in {
        display: flex;

        width: 84%;

        white-space: nowrap;

        box-sizing: border-box;
      }

      &--out {
        margin-right: 0;
        margin-left: auto;
      }
    }

    &__body {
      display: flex;

      // padding-top: 25px;
      // padding-bottom: 25px;
    }

    &__inner {
      &--opacity {
        position: relative;

        &::after {
          content: '';

          position: absolute;

          top: 0;
          left: 0;

          width: 100%;
          height: 100%;
          opacity: 0.65;
          background: #fff;
        }
      }
    }

    &__name {
      @include font(11, 700, #3E3E3E);
    }

    &:hover {
      .actions__item:not(.actions__item--preview) {
        opacity: 1;
      }
    }
    
    &__more {
      padding-top: 10px;
      
      text-align: left;
    }

    &__link {
      font-size: 10px;
      color: #999;
      
      text-decoration: none;

      border-bottom: 1px solid #999;
    }

    &__holder {
      display: flex;

      &--cabinet {
        flex-direction: column;
      }
    }

    &__time {
      white-space: nowrap;
    }

    &__angle {
      position: absolute;
      bottom: 0;

      width: 12px;
      height: 10px;

      &--opacity {
        opacity: 0.35;
      }
    
      &--out {
        left: 100%;
        background: url('./assets/angle-out.svg');
      }
    
      &--in {
        right: 100%;
        background: url('./assets/angle-in.svg');
      }
    }

    &__quote {
      max-width: 405px;;

      margin-top: 13px;
      margin-left: 10px;

      padding-left: 10px;
      
      font-size: 13px;
      color: #3E3E3E;

      word-break: break-word;
      word-wrap: break-word;

      border-left: 6px solid #76AE00;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    &__status {
      &--email {
        align-self: flex-start;

        padding: 4px 9px;
        margin-top: -3px;
        margin-left: 7px;

        font-size: 11px;
        font-weight: 700;
        font-style: normal;

        color:#779733;

        white-space: nowrap;
        
        border: 1px solid #779733;
        border-radius: 20px;
      }
    }
  }

  .scroll {
    position: absolute;
    top: 0;
    right: 0;
    
    z-index: 5;
    
    width: 8px;
    height: calc(100% - 123px);
    
    background: #fff;

    cursor: pointer;

    &__item {
      position: absolute;
      
      top: 0;
      right: 2px;
      
      width: 6px;
      height: 32px;
      
      background: #D6D6D6;
      border-radius: 4px;
    }
  }

  .act__icon--cloud {
    margin-right: 0;
  }

  .act--message-out {
    .act__icon--cloud {
      background: url('./assets/cloud-out.svg') no-repeat center center;
    }
  }

  .act--message-in {
    .act__icon--cloud {
      background: url('./assets/cloud-in.svg') no-repeat center center;
    }
  }

  .icon {

    // DOCUMENT ICONS

    &--commercial {
      background: url("./assets/documents/commercial.svg") no-repeat center center;
    }
    
    &--template {
      background: url("./assets/documents/template.svg") no-repeat center center;
    }

    &--contract {
      background: url("./assets/documents/contract.svg") no-repeat center center;
    }

    &--eaudit {
      background: url("./assets/documents/eaudit.svg") no-repeat center center;
    }

    &--invoice {
      background: url("./assets/documents/invoice.svg") no-repeat center center;
    }

    // EVENT ICONS

    &--call-in {
      background: url("./assets/events/call-in.svg") no-repeat center center;
    }

    &--call-out {
      background: url("./assets/events/call-out.svg") no-repeat center center;
    }

    &--email-in {
      background: url("./assets/events/email-in.svg") no-repeat center center;
    }

    &--email-out {
      background: url("./assets/events/email-out.svg") no-repeat center center;
    }

    &--meeting {
      background: url("./assets/events/meeting.svg") no-repeat center center;
    }

    &--other {
      background: url("./assets/events/other.svg") no-repeat center center;
    }
  }

  // .is-agenda {
  //   width: 100%;
  //   background: transparent;
  // }

  .feed-loader {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &--active {
      animation: rotate 1s infinite;
      animation-timing-function: linear;
    }
  }

  .animate-act {
    animation: act_fade .3s ease;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }
  @keyframes act_fade {
    0% {
      transform: translateY(-25px);
      opacity: 0;
    }

    100% {
      transform: translateY(0px);
      opacity: 1;
    }
  }

  // .act-fade-enter-active {
  //   transition: all .3s ease;
  // }
  // .act-fade-leave-active {
  //   transition: all 0;
  // }

  // .act-fade-enter, .act-fade-leave-to {
  //   transform: translateY(-25px);
  //   opacity: 0;
  // }

  .global-loader {
    position: absolute;

    top: 0;
    left: 0;

    z-index: 25;

    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    background: rgba(255, 255, 255, 0.7);
  }

  // .feed-blur {
  //   filter: blur(3px);
  //     -webkit-filter: blur(3px);
  //     -moz-filter: blur(3px);
  //     -o-filter: blur(3px);
  //     -ms-filter: blur(3px);
  //   filter: url(#blur);
  //   filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius='3');
  // }

  
</style>



