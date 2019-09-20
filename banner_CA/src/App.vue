<template>
  <div class="banners">

    <div class="banners__sales-audit-banner sales-audit-banner" 
        :class="{'sales-audit-banner--not-involved': setData.centralizedAudit.salesAudit.notInvolved}">
      <div class="banners__wrapper-title" v-if="setData.centralizedAudit.salesAudit.auditStarted">
        <div class="sales-audit-banner__title title title--not-active "
              v-if="setData.centralizedAudit.salesAudit.notInvolved">
          Вы не участвуете в аудите продаж за {{setData.centralizedAudit.salesAudit.quarter}}
        </div>
        <div class="sales-audit-banner__title title title--top "
              v-else>
          Вы участвуете в аудите продаж за {{setData.centralizedAudit.salesAudit.quarter}}
        </div>
      </div>
      <div v-else class="sales-audit-banner__title title title--top">
        Аудит продаж
      </div>

      <div  v-if="!setData.centralizedAudit.salesAudit.auditStarted" class="sales-audit-banner__audit-started audit-started">
        <div class="sales-audit-banner__check check check--main">
          Проверка за {{setData.centralizedAudit.salesAudit.quarter}}
        </div>

        <div v-if="setData.centralizedAudit.salesAudit.successfullyСompleted" class="big-banner__audit audit audit--success">Аудит пройден</div>
        <div v-else class="big-banner__audit audit audit--not-success"> Аудит не пройден, {{setData.centralizedAudit.salesAudit.criticalBugs}} кр.
          <span class="bugs_word" v-inclined-word="{number: setData.centralizedAudit.salesAudit.criticalBugs, titles: ['ошибка', 'ошибки', 'ошибок']}"></span>
        </div>

        <div class="sales-audit-banner__benchmark benchmark">
            <span class="benchmark__subscription">Набрано баллов</span>
            <span class="benchmark__count">{{setData.centralizedAudit.salesAudit.scoredPoints}} из {{setData.centralizedAudit.salesAudit.fullPoints}} / проходной {{setData.centralizedAudit.salesAudit.passingScore}}</span> 
        </div>
        <a :href="setData.centralizedAudit.links.reviewASMore" class="sales-audit-banner__btn btn btn--white">Подробнее</a>
      </div>

      <div v-else class="sales-audit-banner__audit-not-started audit-not-started">
        <span class="audit-not-started__text">Аудит пройдет с {{setData.centralizedAudit.salesAudit.dateStart}} по {{setData.centralizedAudit.salesAudit.dateEnd}}</span>
        <div class="audit-not-started__icons icons">
          <div class="icons__item icon icon--green"  v-if="setData.centralizedAudit.salesAudit.tariff">
            <div class="icon__popup popup"> 
              <span class="popup__text">Согласованы с УК тарифы Комплексный сервис и Отчетность </span>
            </div>
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.76188 3.00288C8.7686 3.01676 8.78967 3.04991 8.84852 3.10172C8.9619 3.20153 9.16335 3.3202 9.47141 3.43284C10.0829 3.65643 10.9843 3.80926 12.0538 3.81749C13.1312 3.82578 14.0065 3.6988 14.5887 3.48839C15.1983 3.26805 15.2523 3.05835 15.256 3.01795C15.2516 3.00573 15.2348 2.97178 15.1777 2.91633C15.0797 2.82117 14.9006 2.70267 14.6141 2.58614C14.0436 2.35415 13.1667 2.17797 12.0315 2.14553C10.896 2.11309 10.0096 2.24596 9.43264 2.46751C8.84629 2.69265 8.76759 2.91944 8.76188 3.00288ZM15.2562 4.54617C15.1733 4.58278 15.0898 4.61595 15.0071 4.64587C14.2363 4.92446 13.2003 5.05712 12.0443 5.04822C10.8805 5.03927 9.83036 4.87454 9.04876 4.58876C8.95062 4.55288 8.85459 4.51432 8.76151 4.47291V5.69546C8.77565 5.71399 8.80497 5.74719 8.86172 5.79433C9.00134 5.91033 9.23387 6.04584 9.55726 6.17373C10.1997 6.42779 11.0948 6.61015 12.0387 6.59428C13.0016 6.5781 13.8841 6.40545 14.5059 6.16606C14.8194 6.04536 15.0367 5.91915 15.1638 5.8113C15.2197 5.76394 15.2454 5.73178 15.2562 5.71561V4.54617ZM15.2562 7.18435C15.1566 7.23067 15.0535 7.27407 14.9481 7.31465C14.1698 7.61428 13.141 7.8067 12.0594 7.82488C10.959 7.84337 9.90258 7.63381 9.10464 7.31825C8.98655 7.27155 8.87174 7.22159 8.76151 7.16848V8.47304C8.77505 8.48832 8.79717 8.51058 8.83197 8.53959C8.9538 8.64116 9.16494 8.76601 9.47375 8.88688C10.086 9.12653 10.9843 9.31238 12.0491 9.31238C12.7841 9.31238 13.6767 9.18865 14.3683 8.97098C14.7172 8.86119 14.9767 8.73923 15.1358 8.62405C15.2114 8.56934 15.2437 8.53228 15.2562 8.51461V7.18435ZM15.2562 9.95387C15.0895 10.026 14.9145 10.0894 14.7378 10.145C13.9133 10.4045 12.8946 10.5431 12.0491 10.5431C10.8521 10.5431 9.79893 10.3358 9.02515 10.033C8.93467 9.99757 8.84662 9.9603 8.76151 9.92123V10.9952C8.78166 11.0117 8.80894 11.0321 8.84497 11.0559C9.01252 11.1669 9.28046 11.2945 9.63014 11.4155C10.3264 11.6564 11.2341 11.8329 12.0491 11.8329C12.8709 11.8329 13.7591 11.6716 14.4291 11.4414C14.7665 11.3255 15.0181 11.2024 15.1722 11.0946C15.2114 11.0672 15.2383 11.0452 15.2562 11.029V9.95387ZM15.2883 10.9951C15.2884 10.9951 15.2874 10.9968 15.2846 11.0002C15.2867 10.9968 15.2881 10.9951 15.2883 10.9951ZM7.53074 11.9485V13.225C7.51974 13.2359 7.50303 13.2509 7.47836 13.2697C7.36721 13.3545 7.16994 13.4555 6.87706 13.5505C6.29811 13.7383 5.48273 13.8592 4.61876 13.8592C3.77062 13.8592 2.96076 13.7105 2.37962 13.5068C2.0861 13.4039 1.8796 13.2969 1.75957 13.2087C1.74256 13.1962 1.72879 13.1853 1.71777 13.176V11.8612C1.82682 11.8969 1.94104 11.9311 2.05879 11.9637C2.76845 12.1598 3.69637 12.3195 4.60012 12.3468C5.51215 12.3745 6.45417 12.2496 7.18031 12.054C7.30045 12.0216 7.4179 11.9865 7.53074 11.9485ZM0.487 7.50377C0.487 7.11125 0.670947 6.77362 0.904596 6.51414C1.13963 6.25312 1.45652 6.03328 1.8156 5.85644C2.53563 5.50187 3.51071 5.27777 4.61876 5.27777C5.71006 5.27777 6.67902 5.45854 7.39867 5.76803C7.44326 5.78721 7.48732 5.80706 7.53074 5.8276V3.0133C7.53074 2.14393 8.24319 1.60585 8.99146 1.31853C9.77557 1.01745 10.8406 0.880234 12.0667 0.915264C13.2929 0.950301 14.3273 1.14084 15.0777 1.44606C15.4517 1.59813 15.7854 1.79087 16.0352 2.03347C16.2877 2.27874 16.487 2.61038 16.487 3.01329V11.127C16.487 11.6114 16.1196 11.9338 15.878 12.1028C15.594 12.3017 15.2243 12.4696 14.829 12.6054C14.0336 12.8787 13.0104 13.0636 12.0491 13.0636C11.0808 13.0636 10.037 12.8587 9.22765 12.5786C9.06627 12.5227 8.90965 12.4623 8.76151 12.3979V13.2851C8.76151 13.7331 8.48158 14.0524 8.22498 14.2482C7.95996 14.4504 7.61765 14.6042 7.25685 14.7212C6.52846 14.9575 5.58016 15.09 4.61876 15.09C3.64153 15.09 2.6932 14.9209 1.97249 14.6683C1.6151 14.543 1.28476 14.3872 1.03068 14.2004C0.810484 14.0386 0.487 13.7346 0.487 13.2851V7.50377ZM7.53074 7.35416C7.52918 7.34497 7.51738 7.30331 7.44531 7.22974C7.34919 7.13164 7.17783 7.01282 6.91241 6.89868C6.38377 6.67132 5.58905 6.50854 4.61876 6.50854C3.66521 6.50854 2.88211 6.70315 2.35934 6.96059C2.09704 7.08976 1.92138 7.22425 1.81922 7.33771C1.76922 7.39323 1.74278 7.43707 1.72966 7.46608C1.72327 7.48023 1.72034 7.49016 1.71901 7.49596C1.71834 7.49887 1.71804 7.50088 1.7179 7.50206L1.71778 7.50336C1.71778 7.52567 1.72284 7.58932 1.84395 7.69877C1.97129 7.81383 2.18431 7.93709 2.48591 8.04849C3.08598 8.27013 3.89002 8.39154 4.61876 8.39154C5.37623 8.39154 6.17486 8.31181 6.76186 8.10048C7.36047 7.88496 7.53044 7.62539 7.53074 7.35416ZM1.71777 9.06086V10.5448C1.86764 10.6148 2.09493 10.6967 2.38674 10.7774C3.01006 10.9497 3.84034 11.0925 4.6374 11.1166C5.42618 11.1405 6.24784 11.0305 6.86018 10.8656C7.16849 10.7825 7.39511 10.6931 7.53074 10.6169V9.11089C7.41454 9.16724 7.29623 9.2162 7.17878 9.25848C6.39401 9.54102 5.42895 9.62231 4.61876 9.62231C3.77982 9.62231 2.82568 9.48603 2.05948 9.20303C1.94402 9.16038 1.82941 9.11316 1.71777 9.06086ZM1.67839 13.1369C1.67869 13.1368 1.68094 13.1394 1.68422 13.1445C1.67972 13.1394 1.67808 13.1369 1.67839 13.1369Z" fill="white"/>
            </svg>
          </div>

          <div class="icons__item icon icon--red" v-else>
            <div class="icon__popup popup"> 
              <span class="popup__text">Согласованы с УК тарифы Комплексный сервис и Отчетность.</span>
              <span class="popup__text popup__text--red">У вас нет тарифов Отчетность и Комплексный сервис.</span>
            </div>
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.76188 3.00288C8.7686 3.01676 8.78967 3.04991 8.84852 3.10172C8.9619 3.20153 9.16335 3.3202 9.47141 3.43284C10.0829 3.65643 10.9843 3.80926 12.0538 3.81749C13.1312 3.82578 14.0065 3.6988 14.5887 3.48839C15.1983 3.26805 15.2523 3.05835 15.256 3.01795C15.2516 3.00573 15.2348 2.97178 15.1777 2.91633C15.0797 2.82117 14.9006 2.70267 14.6141 2.58614C14.0436 2.35415 13.1667 2.17797 12.0315 2.14553C10.896 2.11309 10.0096 2.24596 9.43264 2.46751C8.84629 2.69265 8.76759 2.91944 8.76188 3.00288ZM15.2562 4.54617C15.1733 4.58278 15.0898 4.61595 15.0071 4.64587C14.2363 4.92446 13.2003 5.05712 12.0443 5.04822C10.8805 5.03927 9.83036 4.87454 9.04876 4.58876C8.95062 4.55288 8.85459 4.51432 8.76151 4.47291V5.69546C8.77565 5.71399 8.80497 5.74719 8.86172 5.79433C9.00134 5.91033 9.23387 6.04584 9.55726 6.17373C10.1997 6.42779 11.0948 6.61015 12.0387 6.59428C13.0016 6.5781 13.8841 6.40545 14.5059 6.16606C14.8194 6.04536 15.0367 5.91915 15.1638 5.8113C15.2197 5.76394 15.2454 5.73178 15.2562 5.71561V4.54617ZM15.2562 7.18435C15.1566 7.23067 15.0535 7.27407 14.9481 7.31465C14.1698 7.61428 13.141 7.8067 12.0594 7.82488C10.959 7.84337 9.90258 7.63381 9.10464 7.31825C8.98655 7.27155 8.87174 7.22159 8.76151 7.16848V8.47304C8.77505 8.48832 8.79717 8.51058 8.83197 8.53959C8.9538 8.64116 9.16494 8.76601 9.47375 8.88688C10.086 9.12653 10.9843 9.31238 12.0491 9.31238C12.7841 9.31238 13.6767 9.18865 14.3683 8.97098C14.7172 8.86119 14.9767 8.73923 15.1358 8.62405C15.2114 8.56934 15.2437 8.53228 15.2562 8.51461V7.18435ZM15.2562 9.95387C15.0895 10.026 14.9145 10.0894 14.7378 10.145C13.9133 10.4045 12.8946 10.5431 12.0491 10.5431C10.8521 10.5431 9.79893 10.3358 9.02515 10.033C8.93467 9.99757 8.84662 9.9603 8.76151 9.92123V10.9952C8.78166 11.0117 8.80894 11.0321 8.84497 11.0559C9.01252 11.1669 9.28046 11.2945 9.63014 11.4155C10.3264 11.6564 11.2341 11.8329 12.0491 11.8329C12.8709 11.8329 13.7591 11.6716 14.4291 11.4414C14.7665 11.3255 15.0181 11.2024 15.1722 11.0946C15.2114 11.0672 15.2383 11.0452 15.2562 11.029V9.95387ZM15.2883 10.9951C15.2884 10.9951 15.2874 10.9968 15.2846 11.0002C15.2867 10.9968 15.2881 10.9951 15.2883 10.9951ZM7.53074 11.9485V13.225C7.51974 13.2359 7.50303 13.2509 7.47836 13.2697C7.36721 13.3545 7.16994 13.4555 6.87706 13.5505C6.29811 13.7383 5.48273 13.8592 4.61876 13.8592C3.77062 13.8592 2.96076 13.7105 2.37962 13.5068C2.0861 13.4039 1.8796 13.2969 1.75957 13.2087C1.74256 13.1962 1.72879 13.1853 1.71777 13.176V11.8612C1.82682 11.8969 1.94104 11.9311 2.05879 11.9637C2.76845 12.1598 3.69637 12.3195 4.60012 12.3468C5.51215 12.3745 6.45417 12.2496 7.18031 12.054C7.30045 12.0216 7.4179 11.9865 7.53074 11.9485ZM0.487 7.50377C0.487 7.11125 0.670947 6.77362 0.904596 6.51414C1.13963 6.25312 1.45652 6.03328 1.8156 5.85644C2.53563 5.50187 3.51071 5.27777 4.61876 5.27777C5.71006 5.27777 6.67902 5.45854 7.39867 5.76803C7.44326 5.78721 7.48732 5.80706 7.53074 5.8276V3.0133C7.53074 2.14393 8.24319 1.60585 8.99146 1.31853C9.77557 1.01745 10.8406 0.880234 12.0667 0.915264C13.2929 0.950301 14.3273 1.14084 15.0777 1.44606C15.4517 1.59813 15.7854 1.79087 16.0352 2.03347C16.2877 2.27874 16.487 2.61038 16.487 3.01329V11.127C16.487 11.6114 16.1196 11.9338 15.878 12.1028C15.594 12.3017 15.2243 12.4696 14.829 12.6054C14.0336 12.8787 13.0104 13.0636 12.0491 13.0636C11.0808 13.0636 10.037 12.8587 9.22765 12.5786C9.06627 12.5227 8.90965 12.4623 8.76151 12.3979V13.2851C8.76151 13.7331 8.48158 14.0524 8.22498 14.2482C7.95996 14.4504 7.61765 14.6042 7.25685 14.7212C6.52846 14.9575 5.58016 15.09 4.61876 15.09C3.64153 15.09 2.6932 14.9209 1.97249 14.6683C1.6151 14.543 1.28476 14.3872 1.03068 14.2004C0.810484 14.0386 0.487 13.7346 0.487 13.2851V7.50377ZM7.53074 7.35416C7.52918 7.34497 7.51738 7.30331 7.44531 7.22974C7.34919 7.13164 7.17783 7.01282 6.91241 6.89868C6.38377 6.67132 5.58905 6.50854 4.61876 6.50854C3.66521 6.50854 2.88211 6.70315 2.35934 6.96059C2.09704 7.08976 1.92138 7.22425 1.81922 7.33771C1.76922 7.39323 1.74278 7.43707 1.72966 7.46608C1.72327 7.48023 1.72034 7.49016 1.71901 7.49596C1.71834 7.49887 1.71804 7.50088 1.7179 7.50206L1.71778 7.50336C1.71778 7.52567 1.72284 7.58932 1.84395 7.69877C1.97129 7.81383 2.18431 7.93709 2.48591 8.04849C3.08598 8.27013 3.89002 8.39154 4.61876 8.39154C5.37623 8.39154 6.17486 8.31181 6.76186 8.10048C7.36047 7.88496 7.53044 7.62539 7.53074 7.35416ZM1.71777 9.06086V10.5448C1.86764 10.6148 2.09493 10.6967 2.38674 10.7774C3.01006 10.9497 3.84034 11.0925 4.6374 11.1166C5.42618 11.1405 6.24784 11.0305 6.86018 10.8656C7.16849 10.7825 7.39511 10.6931 7.53074 10.6169V9.11089C7.41454 9.16724 7.29623 9.2162 7.17878 9.25848C6.39401 9.54102 5.42895 9.62231 4.61876 9.62231C3.77982 9.62231 2.82568 9.48603 2.05948 9.20303C1.94402 9.16038 1.82941 9.11316 1.71777 9.06086ZM1.67839 13.1369C1.67869 13.1368 1.68094 13.1394 1.68422 13.1445C1.67972 13.1394 1.67808 13.1369 1.67839 13.1369Z" fill="white"/>
            </svg>
          </div>

          <div class="icons__item icon icon--green" v-if="setData.centralizedAudit.salesAudit.certificate" >
            <div class="icon__popup popup"> 
              <span class="popup__text">Есть сертифицированные МПП, ГБ и это 2 разных сотрудника</span>
            </div>
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M2.62812 13.6573C1.95596 12.9852 1.76313 11.9599 1.97393 10.6146C0.873611 9.8124 0.284973 8.95106 0.284973 8.00049C0.284973 7.04992 0.873611 6.18857 1.97393 5.38637C1.76313 4.04108 1.95596 3.01579 2.62812 2.34363C3.30027 1.67148 4.32557 1.47865 5.67085 1.68944C6.47306 0.589126 7.3344 0.000488281 8.28497 0.000488281C9.23554 0.000488281 10.0969 0.589126 10.8991 1.68944C12.2444 1.47865 13.2697 1.67148 13.9418 2.34363C14.614 3.01579 14.8068 4.04108 14.596 5.38637C15.6963 6.18857 16.285 7.04992 16.285 8.00049C16.285 8.95106 15.6963 9.8124 14.596 10.6146C14.8068 11.9599 14.614 12.9852 13.9418 13.6573C13.2697 14.3295 12.2444 14.5223 10.8991 14.3115C10.0969 15.4119 9.23554 16.0005 8.28497 16.0005C7.3344 16.0005 6.47306 15.4119 5.67085 14.3115C4.32557 14.5223 3.30027 14.3295 2.62812 13.6573ZM5.85049 12.799C6.14571 12.7358 6.44929 12.8615 6.61334 13.115C7.25389 14.1047 7.82507 14.5459 8.28497 14.5459C8.74488 14.5459 9.31606 14.1047 9.95661 13.115C10.1207 12.8615 10.4242 12.7358 10.7195 12.799C11.8722 13.0459 12.5881 12.954 12.9133 12.6288C13.2385 12.3036 13.3304 11.5877 13.0835 10.435C13.0203 10.1398 13.146 9.83617 13.3995 9.67212C14.3892 9.03157 14.8304 8.46039 14.8304 8.00049C14.8304 7.54059 14.3892 6.96941 13.3995 6.32885C13.146 6.16481 13.0203 5.86122 13.0835 5.566C13.3304 4.41325 13.2385 3.69735 12.9133 3.37215C12.5881 3.04695 11.8722 2.95508 10.7195 3.20195C10.4242 3.26518 10.1207 3.13943 9.95661 2.88597C9.31606 1.89628 8.74488 1.45503 8.28497 1.45503C7.82507 1.45503 7.25389 1.89628 6.61334 2.88597C6.44929 3.13943 6.14571 3.26518 5.85049 3.20195C4.69773 2.95508 3.98184 3.04695 3.65664 3.37215C3.33144 3.69735 3.23956 4.41325 3.48644 5.566C3.54966 5.86122 3.42392 6.16481 3.17046 6.32885C2.18077 6.96941 1.73952 7.54059 1.73952 8.00049C1.73952 8.46039 2.18077 9.03157 3.17046 9.67212C3.42392 9.83617 3.54966 10.1398 3.48644 10.435C3.23956 11.5877 3.33144 12.3036 3.65664 12.6288C3.98184 12.954 4.69773 13.0459 5.85049 12.799ZM10.6798 5.30442L7.55771 8.42653L5.89015 6.75897L4.86163 7.78749L7.55771 10.4836L11.7083 6.33294L10.6798 5.30442Z" fill="white"/>
            </svg>
          </div>

          <div class="icons__item icon icon--red" v-else>
            <div class="icon__popup popup"> 
              <span class="popup__text">Есть сертифицированные МПП, ГБ и это 2 разных сотрудника.</span>
              <span class="popup__text popup__text--red">У вас нет сертифицированных МПП и ГБ.</span>
            </div>
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M2.62812 13.6573C1.95596 12.9852 1.76313 11.9599 1.97393 10.6146C0.873611 9.8124 0.284973 8.95106 0.284973 8.00049C0.284973 7.04992 0.873611 6.18857 1.97393 5.38637C1.76313 4.04108 1.95596 3.01579 2.62812 2.34363C3.30027 1.67148 4.32557 1.47865 5.67085 1.68944C6.47306 0.589126 7.3344 0.000488281 8.28497 0.000488281C9.23554 0.000488281 10.0969 0.589126 10.8991 1.68944C12.2444 1.47865 13.2697 1.67148 13.9418 2.34363C14.614 3.01579 14.8068 4.04108 14.596 5.38637C15.6963 6.18857 16.285 7.04992 16.285 8.00049C16.285 8.95106 15.6963 9.8124 14.596 10.6146C14.8068 11.9599 14.614 12.9852 13.9418 13.6573C13.2697 14.3295 12.2444 14.5223 10.8991 14.3115C10.0969 15.4119 9.23554 16.0005 8.28497 16.0005C7.3344 16.0005 6.47306 15.4119 5.67085 14.3115C4.32557 14.5223 3.30027 14.3295 2.62812 13.6573ZM5.85049 12.799C6.14571 12.7358 6.44929 12.8615 6.61334 13.115C7.25389 14.1047 7.82507 14.5459 8.28497 14.5459C8.74488 14.5459 9.31606 14.1047 9.95661 13.115C10.1207 12.8615 10.4242 12.7358 10.7195 12.799C11.8722 13.0459 12.5881 12.954 12.9133 12.6288C13.2385 12.3036 13.3304 11.5877 13.0835 10.435C13.0203 10.1398 13.146 9.83617 13.3995 9.67212C14.3892 9.03157 14.8304 8.46039 14.8304 8.00049C14.8304 7.54059 14.3892 6.96941 13.3995 6.32885C13.146 6.16481 13.0203 5.86122 13.0835 5.566C13.3304 4.41325 13.2385 3.69735 12.9133 3.37215C12.5881 3.04695 11.8722 2.95508 10.7195 3.20195C10.4242 3.26518 10.1207 3.13943 9.95661 2.88597C9.31606 1.89628 8.74488 1.45503 8.28497 1.45503C7.82507 1.45503 7.25389 1.89628 6.61334 2.88597C6.44929 3.13943 6.14571 3.26518 5.85049 3.20195C4.69773 2.95508 3.98184 3.04695 3.65664 3.37215C3.33144 3.69735 3.23956 4.41325 3.48644 5.566C3.54966 5.86122 3.42392 6.16481 3.17046 6.32885C2.18077 6.96941 1.73952 7.54059 1.73952 8.00049C1.73952 8.46039 2.18077 9.03157 3.17046 9.67212C3.42392 9.83617 3.54966 10.1398 3.48644 10.435C3.23956 11.5877 3.33144 12.3036 3.65664 12.6288C3.98184 12.954 4.69773 13.0459 5.85049 12.799ZM10.6798 5.30442L7.55771 8.42653L5.89015 6.75897L4.86163 7.78749L7.55771 10.4836L11.7083 6.33294L10.6798 5.30442Z" fill="white"/>
            </svg>
          </div>

          <div class="icons__item icon icon--green" v-if="setData.centralizedAudit.salesAudit.havePageOnSite" >
            <div class="icon__popup popup"> 
              <span class="popup__text">Есть выгруженная страничка <br> партнера на сайте www.1cbo.ru</span>
            </div>
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.08295 0.000488281C12.5012 0.000488281 16.0829 3.58221 16.0829 8.00049C16.0829 12.4188 12.5012 16.0005 8.08295 16.0005C3.66467 16.0005 0.0829468 12.4188 0.0829468 8.00049C0.0829468 3.58221 3.66467 0.000488281 8.08295 0.000488281ZM14.5711 8.87061C13.8 9.27165 12.7846 9.607 11.6315 9.83821C11.4676 11.5124 11.0799 12.9903 10.516 14.0788C12.6681 13.2166 14.2557 11.2445 14.5711 8.87061ZM10.2548 8.58558C10.2614 8.39297 10.2648 8.19783 10.2648 8.00049C10.2648 4.35248 9.10578 1.45503 8.08295 1.45503C7.06011 1.45503 5.90113 4.35248 5.90113 8.00049C5.90113 8.20919 5.90492 8.41543 5.91227 8.61882C6.59452 8.69014 7.32351 8.72775 8.08295 8.72775C8.83062 8.72775 9.56421 8.67502 10.2548 8.58558ZM11.7166 8.33075C11.7184 8.22119 11.7193 8.11108 11.7193 8.00049C11.7193 5.58039 11.2789 3.39489 10.516 1.92217C12.6805 2.78937 14.274 4.77922 14.5764 7.17149C14.2342 7.55562 13.1547 8.01193 11.7166 8.33075ZM6.03124 10.0931C6.68368 10.1519 7.37086 10.1823 8.08295 10.1823C8.78355 10.1823 9.47382 10.1426 10.1377 10.0689C9.80965 12.6854 8.90258 14.5459 8.08295 14.5459C7.26583 14.5459 6.36183 12.6968 6.03124 10.0931ZM4.45062 8.40064C4.0332 8.31736 3.64417 8.21931 3.28895 8.10776C2.38681 7.82446 1.79727 7.47723 1.58524 7.20586C1.87661 4.79829 3.47504 2.79352 5.64989 1.92217C4.88699 3.39489 4.44658 5.58039 4.44658 8.00049C4.44658 8.13462 4.44794 8.26803 4.45062 8.40064ZM4.5405 9.89926C4.70779 11.5483 5.09289 13.0036 5.64989 14.0788C3.53514 13.2315 1.96539 11.3126 1.61237 8.99377C2.37127 9.38904 3.37264 9.69627 4.5405 9.89926Z" fill="white"/>
            </svg>
          </div>

          <div class="icons__item icon icon--red" v-else>
            <div class="icon__popup popup"> 
              <span class="popup__text popup__text--red">Нет выгруженной странички<br> партнера на сайте www.1cbo.ru</span>
            </div>
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.08295 0.000488281C12.5012 0.000488281 16.0829 3.58221 16.0829 8.00049C16.0829 12.4188 12.5012 16.0005 8.08295 16.0005C3.66467 16.0005 0.0829468 12.4188 0.0829468 8.00049C0.0829468 3.58221 3.66467 0.000488281 8.08295 0.000488281ZM14.5711 8.87061C13.8 9.27165 12.7846 9.607 11.6315 9.83821C11.4676 11.5124 11.0799 12.9903 10.516 14.0788C12.6681 13.2166 14.2557 11.2445 14.5711 8.87061ZM10.2548 8.58558C10.2614 8.39297 10.2648 8.19783 10.2648 8.00049C10.2648 4.35248 9.10578 1.45503 8.08295 1.45503C7.06011 1.45503 5.90113 4.35248 5.90113 8.00049C5.90113 8.20919 5.90492 8.41543 5.91227 8.61882C6.59452 8.69014 7.32351 8.72775 8.08295 8.72775C8.83062 8.72775 9.56421 8.67502 10.2548 8.58558ZM11.7166 8.33075C11.7184 8.22119 11.7193 8.11108 11.7193 8.00049C11.7193 5.58039 11.2789 3.39489 10.516 1.92217C12.6805 2.78937 14.274 4.77922 14.5764 7.17149C14.2342 7.55562 13.1547 8.01193 11.7166 8.33075ZM6.03124 10.0931C6.68368 10.1519 7.37086 10.1823 8.08295 10.1823C8.78355 10.1823 9.47382 10.1426 10.1377 10.0689C9.80965 12.6854 8.90258 14.5459 8.08295 14.5459C7.26583 14.5459 6.36183 12.6968 6.03124 10.0931ZM4.45062 8.40064C4.0332 8.31736 3.64417 8.21931 3.28895 8.10776C2.38681 7.82446 1.79727 7.47723 1.58524 7.20586C1.87661 4.79829 3.47504 2.79352 5.64989 1.92217C4.88699 3.39489 4.44658 5.58039 4.44658 8.00049C4.44658 8.13462 4.44794 8.26803 4.45062 8.40064ZM4.5405 9.89926C4.70779 11.5483 5.09289 13.0036 5.64989 14.0788C3.53514 13.2315 1.96539 11.3126 1.61237 8.99377C2.37127 9.38904 3.37264 9.69627 4.5405 9.89926Z" fill="white"/>
            </svg>
          </div>

        </div>

      </div>

    </div>




    <div class="banners__big-banner big-banner">
      <div class="big-banner__top-line">
        <div class="big-banner__title title title--top">Централизованный аудит</div>
        <div class="big-banner__period" v-if="setData.centralizedAudit.upcomingAudit !== null">старт - {{setData.centralizedAudit.upcomingAuditStartDate}}</div>
      </div>
      <div class="big-banner__columns columns">
        <div class="columns__item column column-x1">
          <div class="big-banner__check check check--main">Проверка УК {{setData.centralizedAudit.previousAuditPeriod}}</div>
          <div v-if="setData.centralizedAudit.previousAudit !== null" class="big-banner__block_info">
            
            <div v-if="setData.centralizedAudit.previousAudit.successfullyСompleted" class="big-banner__audit audit audit--success">Аудит пройден</div>
            <div v-else class="big-banner__audit audit audit--not-success"> Аудит не пройден, {{setData.centralizedAudit.previousAudit.criticalBugs}} кр.
              <span class="bugs_word" v-inclined-word="{number: setData.centralizedAudit.previousAudit.criticalBugs, titles: ['ошибка', 'ошибки', 'ошибок']}"></span>
            </div>
            <div class="big-banner__benchmark benchmark">
              <div class="benchmark__subscription">Итого</div>
              <div class="benchmark__counts">
                <div class="benchmark__count">
                  {{setData.centralizedAudit.previousAudit.numberOrganizations}}
                  <div class="benchmark__popup">количество проверенных<br>организаций</div>
                  <div class="benchmark__triangle"></div>
                </div>/
                <div class="benchmark__count">
                  {{setData.centralizedAudit.previousAudit.averageNumberErrors}}
                  <div class="benchmark__popup">среднее количество<br>ошибок</div>
                  <div class="benchmark__triangle"></div>
                </div>/
                <div class="benchmark__count">
                  {{setData.centralizedAudit.previousAudit.totalAmountErrors}}
                  <div class="benchmark__popup">общее количество<br>ошибок</div>
                  <div class="benchmark__triangle"></div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="big-banner__block_info">
            <div class="big-banner__message">Не участвовал</div>
          </div>
  
          <a
            :href="setData.centralizedAudit.links.reviewMCMore"
            class="big-banner__btn btn btn--white"
            v-if="setData.centralizedAudit.previousAudit !== null">Подробнее</a>

        </div>

        <div class="columns__item column column-x2" v-if="setData.centralizedAudit.upcomingAudit !== null">
          <div class="big-banner__check check check--main">Самостоятельная подготовка к аудиту {{setData.centralizedAudit.upcomingAuditPeriod}}</div>
          
          <div class="big-banner__block_info" v-if="setData.centralizedAudit.upcomingAudit.startedTraining">
            <div class="big-banner__audit audit audit--success" v-if="setData.centralizedAudit.upcomingAudit.successfullyСompleted">Аудит пройден</div>
            <div v-else class="big-banner__audit audit audit--not-success">Аудит не пройден, {{setData.centralizedAudit.upcomingAudit.criticalBugs}} кр. ошибок</div>
            <div class="big-banner__line-results line-results">
              <div class="big-banner__benchmark benchmark">
                <div class="benchmark__subscription">Итого</div>
                <div class="benchmark__counts">
                  <div class="benchmark__count">
                    {{setData.centralizedAudit.upcomingAudit.numberOrganizations}}
                    <div class="benchmark__popup">количество проверенных<br>организаций</div>
                    <div class="benchmark__triangle"></div>
                  </div>/
                  <div class="benchmark__count">
                    {{setData.centralizedAudit.upcomingAudit.averageNumberErrors}}
                    <div class="benchmark__popup">среднее количество<br>ошибок</div>
                    <div class="benchmark__triangle"></div>
                  </div>/
                  <div class="benchmark__count">
                    {{setData.centralizedAudit.upcomingAudit.totalAmountErrors}}
                    <div class="benchmark__popup">общее количество<br>ошибок</div>
                    <div class="benchmark__triangle"></div>
                  </div>
                </div>
              </div>
              <div
                v-if="setData.centralizedAudit.upcomingAudit.successfullyСompleted && setData.centralizedAudit.upcomingAudit.unverifiedCustomers === 0"
                class="big-banner__date-result"
              >Результат на {{dateResult}}</div>
              <div
                v-else
                class="big-banner__date-result"
              >По {{setData.centralizedAudit.upcomingAudit.unverifiedCustomers}} клиентам не проведена проверка</div>

              <div class="icon" v-if="showWarningIcon">
                <svg
                  width="12"
                  height="10"
                  viewBox="0 0 12 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.7795 7.84285L7.18344 0.648062C6.92426 0.242276 6.48184 0 5.99999 0C5.51811 0 5.07569 0.242276 4.81658 0.648062L0.22049 7.84282C-0.0553732 8.27472 -0.073674 8.82218 0.172885 9.27163C0.419444 9.72089 0.891172 10 1.40398 10H10.596C11.1089 10 11.5806 9.72093 11.8272 9.27151C12.0737 8.82218 12.0554 8.27475 11.7795 7.84285ZM5.99999 8.78893C5.57734 8.78893 5.23476 8.44664 5.23476 8.02442C5.23476 7.60216 5.57738 7.25987 5.99999 7.25987C6.42265 7.25987 6.76523 7.60216 6.76523 8.02442C6.76523 8.44664 6.42261 8.78893 5.99999 8.78893ZM7.06067 3.47626L6.68376 6.01153C6.62828 6.38473 6.28049 6.64231 5.90698 6.58689C5.60521 6.5421 5.37896 6.30573 5.33244 6.02017L4.92314 3.48991C4.82785 2.90079 5.22862 2.34604 5.8183 2.25084C6.40798 2.15564 6.96326 2.55603 7.05854 3.14515C7.07646 3.25608 7.07584 3.37061 7.06067 3.47626Z"
                    fill="#FFD21C"
                  ></path>
                </svg>

                <div
                  class="benchmark__popup"
                >По {{setData.centralizedAudit.upcomingAudit.notActualCustomers}} клиентам проверка не актуальна</div>
              </div>
            </div>
          </div>

          <div class="big-banner__block_info" v-else>
            <div class="recomendation">Рекомендуем пройти подготовку к ЦА</div>
          </div>

          <div class="big-banner__buttons buttons" v-if="setData.centralizedAudit.upcomingAudit.startedTraining">
            <a
              :href="setData.centralizedAudit.links.runwSelfMore"
              class="big-banner__btn btn btn--yellow"
            >Пройти ещё раз</a>
            <a
              :href="setData.centralizedAudit.links.reviewSelfMore"
              class="big-banner__btn btn btn--white"
            >Подробнее</a>
          </div>

          <div class="big-banner__buttons buttons" v-else>
            <a
              :href="setData.centralizedAudit.links.runwSelfMore"
              class="big-banner__btn btn btn--white"
            >Начать подготовку</a>
          </div>

        </div>

        <div class="columns__item column column-x2" v-if="setData.centralizedAudit.upcomingAudit === null">
          <div class="column__null_text null_text">
            Подготовка к следующему
            <br>аудиту еще не началась
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showWarningIcon: false
    };
  },
  components: {},
  methods: {},
  computed: {
    dateResult() {
      var options = {
        year: "numeric",
        month: "numeric",
        day: "numeric"
      };
      
      let date = new Date(
          this.setData.centralizedAudit.upcomingAudit.actualDate
        ),
        dateNow = new Date();
      Date.parse(dateNow) - Date.parse(date) > 691200000
        ? (this.showWarningIcon = true)
        : (this.showWarningIcon = false);
      return date.toLocaleString("ru", options);
    },
    setData() {
      return this.$store.getters.getDataBanner;
    }
  },
  mounted() {
    const block = document.querySelector('.page-tasks');
    
    block.style.display = 'none';
    block.style.display = 'table';
  },
};
</script>

<style lang="less">

.banners{

  &__sales-audit-banner{

    position: relative;
    max-width: 271px;

    background: #FFFFFF;

    border-left: 4px solid #fcde63;

    flex-shrink: 0;
    flex: 0.94;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    padding: 24px 66px 32px 21px;

    margin-right: 12px;

    &:after{
      
      content: "";

      display: block;

      width: 95px;
      height: 98px;

      background: url("./img/graphs-img.svg");

      position: absolute;
      bottom: -4px;
      right: -7px;
      z-index: 0;
    }
  }

  &__big-banner{

    flex-shrink: 0;
    flex: 2;

    padding: 24px 24px 24px 21px;

    transition: all 0.3s;
    background: #ffffff;

    border-left: 4px solid #fcde63;

    position: relative;

    &:after {

      content: "";
      display: block;

      position: absolute;

      background: url("./img/img_CA.png") no-repeat;
      bottom: 0;
      right: 0;

      width: 128px;
      height: 111px;

      opacity: 1;
      transition: all 0.3s;
    }
  }

  &__wrapper-title{

    max-width: 300px;
  }
}

.sales-audit-banner{

  &__title{

    margin-bottom: 17px;
  }

  &__check{

    margin-bottom: 7px;
  }

  &__audit{

    font-weight: bold;
    font-size: 16px;

    margin-bottom: 8px;
    white-space: nowrap;
  }

  &__benchmark{

    margin-bottom: 14px;
    white-space: nowrap;         
  }

  &__btn{

    
  }

  &__audit-started{

    z-index: 2;
  }

  &__audit-not-started{

    height: 84px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

  }

  &--not-involved{

    border-left: 4px solid #D1D1D1;
  }
}

.btn{

  &--white{

    font-size: 12px;

    color: #3A3A3A;
    padding: 5px 13px;

    border: 1px solid #E3E3E3;
    box-sizing: border-box;

    border-radius: 5px;

    text-decoration: none;
    white-space: nowrap;

    &:hover {
      transition: all 0.3s;
      border: 1px solid #b7b7b7;
    }
  }

  &--yellow{

    font-size: 12px;

    color:  #3A3A3A;
    padding: 5px 13px;

    background: #FCDE63;
    box-sizing: border-box;

    border-radius: 5px;

    text-decoration: none;
    white-space: nowrap;

    &:hover {
      transition: all 0.3s;
      background: #ffd836;
    }
  }

}

.big-banner{

  &__top-line {

    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 17px;
  }

  &__audit {
    
    font-weight: bold;
    
    font-size: 16px;
    line-height: normal;

    white-space: nowrap;

    margin-bottom: 8px;
  }

  &__period {
    
    font-size: 12px;
    
    color: #808080;
  }

  &__columns{

    display: flex;
    justify-content: flex-start;
  }

  &__benchmark{

    display: flex;
  }

  &__check{

    margin-bottom: 7px;
  }

  &__audit{

    margin-bottom: 9px;
  }

  &__line-results{

    display: flex;
    justify-content: flex-start;

  
  }

  &__block_info{

    margin-bottom: 16px;
  }

  &__date-result{

    white-space: nowrap;

    font-size: 12px;
    line-height: normal;

    color: #808080;
  }
}

.title{

  &--top{

    font-weight: bold;

    font-size: 17px;

    color: #3A3A3A;

  }

  &--benchmarks{

    font-weight: bold;
    font-size: 18px;

    color: #3A3A3A;
  }

  &--not-active{
    font-weight: bold;
    font-size: 17px;

    color: #727272;
  }
}

.check{

  &--main{
    
    font-weight: bold;

    font-size: 12px;
    margin-bottom: 7px;

    color: #464646;

    white-space: nowrap;

  }
}

.benchmark{

  &__subscription{
    font-size: 12px;
    line-height: 14px;

    color: #808080;
  }

  &__count{

    font-size: 12px;
    line-height: 14px;

    color: #3A3A3A;

    cursor: pointer;
    padding: 0 5px;
    position: relative;
    
    &:hover {
      .benchmark__popup {
        display: block;
      }
      .benchmark__triangle {
        display: block;
      }
    }
    .benchmark__popup {
      display: none;
      position: absolute;
      left: -150%;
      top: -56px;
      white-space: nowrap;
      text-align: left;
      justify-content: center;
      padding: 10px;
      background: #fcde63;
      box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.15);
      font-size: 12px;
      color: #313131;
      border-radius: 5px;
    }
    .benchmark__triangle {
      display: none;
      position: absolute;
      width: 11px;
      height: 9px;
      background: #fcde63;
      transform: rotate(-136deg);
      bottom: 19px;
      right: 30%;
    }

  }

  &__counts{
    display: flex;

  }

  &__counts{

    font-size: 12px;
  }
}

.audit{

  &--success{

    color: #00AA45;
  }

  &--not-success{

    color: #FF3939;
  }
}

.audit-not-started{

  &__text{

    font-size: 12px;

    color: #808080;
  }

  &__icons{

    display: flex;

  }
}

.icon{

  &--green{

    background: #00AA45;
  }

  &--red{

    background: #F85A4A;
  }

  &__popup{

    position: absolute;
    bottom: 38px;
    left: -7px;

    z-index: 22;

    background: #FCDE63;
    
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.15);
    
    border-radius: 5px;
    padding: 9px;

    display: none;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;

    &:after{
      content: "";
      display: block;
      position: absolute;
      width: 11px;
      height: 9px;
      background: #fcde63;
      transform: rotate(-136deg);
      bottom: -4px;
      left: 13px;
    }
  }
}

.popup{
  
  &__text{
    font-size: 10px;
    line-height: 15px;

    color: #313131;

    white-space: nowrap;
    
    &--red{
      
      color: #DD1F26;
    }
  }
}

.icons{

  &__item{

    width: 26px;
    height: 26px;

    border-radius: 50px;

    display: flex;
    justify-content: center;
    align-items: center;

    margin-right: 12px;

    position: relative;

    &:hover{
      
      .icon__popup{

        display: flex;
      }
    }
  }
}
.columns{

  &__item{

    &:nth-child(2){

      margin-left: 20px;

      border-left: 1px solid #efefef;
      padding-left: 35px;
    }
  }
}



@media screen and (max-width: 1500px) and (min-width: 1270px) {
  .banners {
    .big-banner {
      border-left: 4px solid #fcde63;
      &:after {
        transition: all 0.3s;
        opacity: 0;
      }
    }

    .right_block {
      .small_banner_x1,
      .small_banner_x2 {
        &:after {
          transition: all 0.3s;
          opacity: 0;
        }
      }
    }
  }
}
@media screen and (max-width: 1150px) {
  .banners {
    .big-banner {
      border-left: 4px solid #fcde63;
      &:after {
        transition: all 0.3s;
        opacity: 0;
      }
    }

    .right_block {
      .small_banner_x1,
      .small_banner_x2 {
        &:after {
          transition: all 0.3s;
          opacity: 0;
        }
      }
    }
  }
}

.banners {
  display: flex;
  justify-content: flex-start;
  .big_banner {
    flex-shrink: 0;
    transition: all 0.3s;
    background: #ffffff;
    height: 200px;
    border-left: 4px solid #fcde63;
    position: relative;
    flex: 2;

    // min-width: 752px;

    &:after {
      content: "";
      display: block;
      position: absolute;
      background: url("./img/img_CA.png") no-repeat;
      bottom: 0;
      right: 0;
      width: 128px;
      height: 111px;
      opacity: 1;
      transition: all 0.3s;
    }
    .top_line {
      padding: 25px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &__audit {
        font-weight: bold;
        font-size: 17px;
        line-height: normal;
        color: #3a3a3a;
      }
      &__period {
        font-size: 12px;
        color: #808080;
      }
    }
    .columns {
      display: flex;
      justify-content: flex-start;
      padding: 0 25px;
      .column_x1 {
        margin-right: 35px;
      }
      .column_x1,
      .column_x2 {
        height: 110px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .null_text {
          color: #464646;
          font-size: 20px;
          line-height: 30px;
        }
        .message {
          font-weight: bold;
          font-size: 16px;
          line-height: 18px;
          color: #8c8c8c;
          margin-right: 180px;
        }
        .review {
          font-weight: bold;
          font-size: 12px;
          line-height: normal;
          color: #464646;
        }
        .big-banner__block_info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 45px;

          .audited {
            font-weight: bold;
            font-size: 16px;
            line-height: 18px;
            white-space: nowrap;
            &.success {
              color: #00aa45;
            }
            &.with_bugs {
              color: #ff3939;
            }
          }

          .recomendation {
            font-weight: bold;
            font-size: 16px;
            line-height: 18px;
            color: #ff7918;
          }
          .summary_result {
            display: flex;
            justify-content: flex-start;
            &__text {
              font-size: 12px;
              color: #808080;
            }
            &__count {
              font-size: 12px;
              line-height: normal;
              color: #3a3a3a;
              display: flex;
              justify-content: flex-start;
              .count_item {
                cursor: pointer;
                padding: 0 5px;
                position: relative;
                &:hover {
                  .popup {
                    display: block;
                  }
                  .triangle {
                    display: block;
                  }
                }
                .popup {
                  display: none;
                  position: absolute;
                  left: -150%;
                  top: -56px;
                  white-space: nowrap;
                  text-align: left;
                  justify-content: center;
                  padding: 10px;
                  background: #fcde63;
                  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.15);
                  font-size: 12px;
                  color: #313131;
                  border-radius: 5px;
                }
                .triangle {
                  display: none;
                  position: absolute;
                  width: 11px;
                  height: 9px;
                  background: #fcde63;
                  transform: rotate(-136deg);
                  bottom: 19px;
                  right: 30%;
                }
              }
            }
          }
        }

        .btn_more {
          display: flex;

          .btn {
            transition: all 0.3s;
            padding: 6px 10px;
            font-size: 12px;
            line-height: normal;
            color: #3a3a3a;
            border: 1px solid #e3e3e3;
            box-sizing: border-box;
            border-radius: 5px;
            text-decoration: none;

            &:hover {
              transition: all 0.3s;
              border: 1px solid #b7b7b7;
            }
          }
          .empty_btn {
            height: 32px;
          }
        }
      }
      .column_x2 {
        padding: 0 35px;
        border-left: 1px solid #efefef;
        .preparation {
          font-weight: bold;
          font-size: 12px;
          line-height: normal;
          color: #464646;
        }
        .line-results {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .summary_result {
            margin-right: 38px;
          }
          .date_result {
            white-space: nowrap;
            font-size: 12px;
            line-height: normal;
            color: #808080;
          }
          .icon {
            margin-left: 7px;
            padding: 0 5px;
            position: relative;
            cursor: pointer;
            z-index: 4;
            &:hover {
              .popup {
                display: block;
              }
            }
            .popup {
              display: none;
              position: absolute;
              right: -107px;
              top: -44px;
              width: 230px;
              padding: 10px 8px;
              background: #fcde63;
              box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.15);
              font-size: 12px;
              color: #464646;
              border-radius: 5px;
              z-index: 3;
              &:after {
                content: "";
                display: block;
                position: absolute;
                width: 11px;
                height: 9px;
                background: #fcde63;
                transform: rotate(-136deg);
                bottom: -3px;
                left: 50%;
              }
            }
          }
        }

        .buttons {
          display: flex;
          justify-content: flex-start;
          .buttons__block {
            .btn_again {
              display: inline-block;
              transition: all 0.3s;
              background: #fcde63;
              border-radius: 5px;
              padding: 6px 10px;
              font-size: 12px;
              line-height: normal;
              color: #3a3a3a;
              margin-right: 10px;
              text-decoration: none;
              &:hover {
                transition: all 0.3s;
                background: #ffd836;
              }
            }
            .btn_more {
              display: inline-block;
              transition: all 0.3s;
              padding: 6px 10px;
              font-size: 12px;
              line-height: normal;
              color: #3a3a3a;
              border: 1px solid #e3e3e3;
              box-sizing: border-box;
              border-radius: 5px;
              text-decoration: none;
              &:hover {
                transition: all 0.3s;
                border: 1px solid #b7b7b7;
              }
            }
          }
        }
      }
    }
  }
  .right_block {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    flex-shrink: 0;

    .small_banner_x1,
    .small_banner_x2 {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 62px;
      text-decoration: none;
      border-left: 4px solid #fcde63;
      position: relative;
      background: #ffffff;
          padding: 16px 18px;
      // min-width: 400px;
      &:after {
        content: "";
        display: block;
        position: absolute;
        bottom: 0;
        right: 0;
        background: url("./img/img_UFA.png") no-repeat;
        width: 156px;
        height: 90px;
        opacity: 1;
        transition: all 0.3s;
      }
      &__text {
        max-width: 140px;
        min-width: 100px;
        font-size: 12px;
        line-height: 16px;
        color: #797979;
      }
      &__percent {
        font-weight: bold;
        &.red {
          color: #fb373f;
        }
        &.green {
          color: #00aa45;
        }
      }
    }
    .small_banner_x2 {
      &:after {
        background: url("./img/img_time.png") no-repeat;
      }
    }
  }
}

.white-stats-sales-report {
  padding: 7px 13px 7px 33px !important;
  font-weight: 400 !important;
  border-radius: 5px;
  border-right: none !important;
  font-size: 12px !important;
  &:before {
    top: 9px !important;
    left: 18px !important;
    width: 8px !important;
    height: 9px !important;
    background: url("./img/icon_sell.svg") no-repeat !important;
  }
}

.page-tasks .content > .item.col-2x > :first-child {
  width: 120%;
}

.page-tasks .content>.item.grow-1>*, .page-tasks .content>.item>* {

  width: inherit;
}

@media only screen and (max-width: 1400px) and (min-width: 1270px) {
  .page-tasks .content > .item.col-2x > :first-child {
    width: auto;
  }
}

@media only screen and (max-width: 1400px) and (min-width: 1270px) {
  .page-tasks .content > .item.col-2x > :first-child {
    width: auto;
  }
}

@media only screen and (max-width: 1120px) {
  .page-tasks .content > .item.col-2x > :first-child {
    width: auto;
  }
}

</style>
