const body=document.querySelector("body"),root=document.documentElement,style=getComputedStyle(root);let fixedItem;function bodyLock(){fixedItem=document.querySelectorAll(".fixed-item");const e=window.innerWidth-body.offsetWidth+"px";body.style.overflow="hidden",body.style.marginRight=e,fixedItem.forEach(r=>r.style.paddingRight=e)}function bodyUnlock(){body.style.overflow="",body.style.marginRight="",fixedItem.forEach(e=>e.style.paddingRight="")}const hamburger=document.querySelector(".hamburger"),hamburgerWrapper=document.querySelector(".hamburger__wrapper"),hamburgerButton=document.querySelector(".hamburger__button");let hamburgerOpen=!1;function openHamburger(){0==hamburgerOpen&&(bodyLock(),hamburger.classList.add("hamburger--open"),hamburgerWrapper.classList.add("hamburger__wrapper--open"),hamburgerOpen=!0)}null!=hamburgerButton&&(hamburgerButton.onclick=openHamburger),window.onclick=function(e){hamburgerOpen&&e.target==hamburger&&(hamburgerWrapper.classList.remove("hamburger__wrapper--open"),setTimeout((function(){hamburger.classList.remove("hamburger--open"),hamburgerOpen=!1,bodyUnlock()}),200))};const accordion=document.querySelectorAll(".accordion"),accordionWrapper=document.querySelectorAll(".accordion__wrapper"),accordionButton=document.querySelectorAll(".accordion__button"),accordionText=[],accordionOpen=[];for(let e=0;e<accordion.length;e++)accordionText[e]=accordion[e].querySelector(".accordion__text"),accordionButton[e].addEventListener("click",()=>accordionClick(e)),accordionWrapper[e].addEventListener("transitionend",()=>accordionTransition(e)),accordionWrapper[e].classList.contains("accordion__wrapper--active")?(accordionOpen[e]=!0,accordionWrapper[e].style.maxHeight=accordionWrapper[e].scrollHeight+"px"):(accordionOpen[e]=!1,accordionWrapper[e].style.maxHeight=0);function accordionClick(e){accordionOpen[e]?(accordionOpen[e]=!1,accordionButton[e].classList.remove("accordion__button--active"),accordionWrapper[e].style.maxHeight=accordionWrapper[e].scrollHeight+"px",setTimeout((function(){accordionWrapper[e].style.maxHeight=0}),0)):(accordionOpen[e]=!0,accordionWrapper[e].classList.add("accordion__wrapper--active"),accordionButton[e].classList.add("accordion__button--active"),accordionWrapper[e].style.maxHeight=0,setTimeout((function(){accordionWrapper[e].style.maxHeight=accordionWrapper[e].scrollHeight+"px"}),0))}function accordionTransition(e){accordionOpen[e]||accordionWrapper[e].classList.remove("accordion__wrapper--active"),accordionWrapper[e].style.maxHeight=""}const anchors=document.querySelectorAll('a[href^="#"]');let hash;window.location.href.indexOf("#")>-1&&(hash=window.location.hash,""!=hash&&("index"==document.querySelector(hash)&&(window.location.href="index"+hash),null!=document.querySelector(""+hash)&&(document.querySelector(""+hash).scrollIntoView({behavior:"auto",block:"start"}),history.replaceState("",document.title,window.location.pathname+window.location.search)))),window.onload=function(){""!=hash&&null!=document.querySelector(""+hash)&&document.querySelector(""+hash).scrollIntoView({behavior:"smooth",block:"start"})};for(let e of anchors)e.addEventListener("click",(function(r){r.preventDefault();let t=e.getAttribute("href");"#"!=t&&(null==document.querySelector(t)&&(window.location.href="index"+t),hamburger.click(),document.querySelector(""+t).scrollIntoView({behavior:"smooth",block:"start"}))}));const modal=document.querySelectorAll(".modal"),modalWrapper=document.querySelectorAll(".modal__wrapper"),modalClose=document.querySelectorAll(".modal__close"),modalImg=document.querySelector(".modal__img-image");let modalClicked,currentModal,modalsCount=0,openModalsCount=document.querySelectorAll(".modal--open").length;const modalButton=[];for(let e=0;e<modal.length;e++)modalButton[e]=document.querySelectorAll(".modal"+(e+1)+"__button"),modal[e].addEventListener("transitionend",modalTransitioned);function modalButtonEvent(e){const r=modalsCount;e.forEach(e=>e.addEventListener("click",e=>toggleModal(r,"open",e))),modalsCount++}function toggleModal(e,r,t=null){null!=t&&t.preventDefault(),sliderLinkDragged||("open"==r?(bodyLock(),openModalsCount=document.querySelectorAll(".modal--open").length,modal[e].classList.add("modal--open"),currentModal=e,null!=t&&null!=t.target.closest(".modal-img")&&null!=modalImg&&(modalImg.src=t.target.closest(".modal-img").dataset.modalImg,modalImg.alt=t.target.closest(".modal-img").dataset.modalImgAlt,"undefined"==modalImg.alt&&(modalImg.alt=""))):modal[e].classList.remove("modal--open"))}modalButton[modal.length-1]=document.querySelectorAll(".modal-img"),modalButton.forEach(e=>modalButtonEvent(e)),window.addEventListener("mousedown",(function(e){for(let r=0;r<modal.length;r++)e.target==modalWrapper[r]&&(modalClicked=!0)})),window.addEventListener("mouseup",(function(e){modalClicked&&e.target==modalWrapper[currentModal]?toggleModal(currentModal,"close"):modalClicked=!1}));for(let e=0;e<modal.length;e++)modalClose[e].onclick=()=>toggleModal(e,"close");function modalTransitioned(){const e=document.elementFromPoint(0,0);for(let r=0;r<modal.length;r++)if(modal[r]==e.closest(".modal")){currentModal=r;break}openModalsCount=document.querySelectorAll(".modal--open").length,0==openModalsCount&&bodyUnlock()}document.addEventListener("keydown",(function(e){27==e.which&&toggleModal(currentModal,"close")}));const slider=document.querySelectorAll(".slider"),sliderWrapper=document.querySelectorAll(".slider__wrapper"),sliderImg=document.querySelectorAll(".slider__img"),sliderLink=document.querySelectorAll(".slider__link"),sliderPrevBtn=document.querySelectorAll(".slider__prev"),sliderNextBtn=document.querySelectorAll(".slider__next");let sliderWrapperTranslate=[],sliderWrapperDragOffset=[];const sliderButton=[],sliderItem=[];let sliderVisibleItems=[],currentSlider=[];for(let e=0;e<slider.length;e++){sliderWrapperTranslate[e]=0,sliderWrapperDragOffset[e]=0,sliderItem[e]=slider[e].querySelectorAll(".slider__item"),sliderButton[e]=slider[e].querySelectorAll(".slider__button");for(let r=0;r<sliderButton[e].length;r++)sliderButton[e][r].addEventListener("click",sliderSwitch);null!=sliderButton[e][0]&&sliderButton[e][0].classList.add("slider__button--active"),sliderVisibleItemsCount(e),currentSlider[e]=0,null!=sliderNextBtn[e]&&sliderNextBtn[e].addEventListener("click",()=>sliderNext(e)),null!=sliderPrevBtn[e]&&sliderPrevBtn[e].addEventListener("click",()=>sliderPrev(e))}function sliderNext(e){currentSlider[e]>=sliderItem[e].length-sliderVisibleItems[e]?(currentSlider[e]=0,sliderMove(e)):(currentSlider[e]++,sliderMove(e))}function sliderPrev(e){0==currentSlider[e]?(currentSlider[e]=sliderItem[e].length-sliderVisibleItems[e],sliderMove(e)):(currentSlider[e]--,sliderMove(e))}function sliderSwitch(){for(let e=0;e<slider.length;e++)for(let r=0;r<sliderButton[e].length;r++)if(this==sliderButton[e][r])return currentSlider[e]=r,void sliderMove(e)}function sliderVisibleItemsCount(e){const r=window.getComputedStyle(sliderItem[e][0]);sliderVisibleItems[e]=Math.round(sliderWrapper[e].offsetWidth/(sliderItem[e][0].offsetWidth+parseInt(r.marginRight)+parseInt(r.marginRight)))}function sliderMove(e){sliderWrapperTranslate[e]=currentSlider[e]*(-1*sliderWrapper[e].offsetWidth/sliderVisibleItems[e]),sliderWrapper[e].style.transform="translateX("+sliderWrapperTranslate[e]+"px)",null!=sliderButton[e][currentSlider[e]]&&(sliderButton[e].forEach(e=>e.classList.remove("slider__button--active")),sliderButton[e][currentSlider[e]].classList.add("slider__button--active")),sliderHeight()}function sliderResize(){for(let e=0;e<slider.length;e++)sliderVisibleItemsCount(e),sliderMove(e)}function sliderHeight(){for(let e=0;e<slider.length;e++)sliderWrapper[e].style.maxHeight=sliderItem[e][currentSlider[e]].offsetHeight+"px"}sliderHeight(),window.addEventListener("load",sliderHeight),sliderImg.forEach(e=>e.addEventListener("load",sliderHeight)),window.addEventListener("resize",sliderResize);let draggedSlider,sliderLinkDragged,sliderDragLinkOffset,scrollX,scrollY,scrollYEnabled,scrollXEnabled,sliderDragged=!1,sliderDragOffset=0;for(let e=0;e<slider.length;e++)slider[e].addEventListener("mousedown",r=>sliderDragStart(r,e)),slider[e].addEventListener("touchstart",r=>sliderDragStart(r,e));window.addEventListener("mousemove",sliderDragMove),window.addEventListener("touchmove",sliderDragMove),window.addEventListener("mouseup",sliderDragEnd),window.addEventListener("touchend",sliderDragEnd);for(let e=0;e<slider.length;e++)slider[e].addEventListener("mouseleave",sliderDragEnd);function sliderLinkClick(e){sliderLinkDragged&&e.preventDefault()}function sliderDragStart(e,r){draggedSlider=r,slider[draggedSlider].classList.add("slider--dragged"),sliderWrapper[draggedSlider].classList.add("slider__wrapper--dragged"),sliderDragged=!0,"touchstart"==e.type?sliderDragOffset=e.touches[0].clientX:(e.preventDefault(),sliderDragOffset=e.clientX,sliderLinkDragged=!1,sliderDragLinkOffset=e.clientX),sliderWrapperDragOffset[draggedSlider]=sliderWrapperTranslate[draggedSlider]}function sliderDragMove(e){if(sliderDragged){const r=10;let t;Math.abs(sliderDragLinkOffset-e.clientX)>r&&(sliderLinkDragged=!0),"touchmove"==e.type?(t=e.touches[0].clientX-sliderDragOffset,sliderDragOffset=e.touches[0].clientX):(t=e.clientX-sliderDragOffset,sliderDragOffset=e.clientX),sliderWrapperDragOffset[draggedSlider]+=t,sliderWrapper[draggedSlider].style.transform="translateX("+sliderWrapperDragOffset[draggedSlider]+"px)",sliderDragCheck()}}function sliderDragCheck(){sliderWrapperTranslate[draggedSlider]<0?sliderWrapperTranslate[draggedSlider]+-1*sliderWrapperDragOffset[draggedSlider]<=sliderWrapper[draggedSlider].offsetWidth/sliderVisibleItems[draggedSlider]*-.3?(sliderDragEnd(),sliderPrev(draggedSlider)):sliderWrapperTranslate[draggedSlider]+-1*sliderWrapperDragOffset[draggedSlider]>=sliderWrapper[draggedSlider].offsetWidth/sliderVisibleItems[draggedSlider]*.3&&(sliderDragEnd(),sliderNext(draggedSlider)):sliderWrapperTranslate[draggedSlider]-sliderWrapperDragOffset[draggedSlider]<=sliderWrapper[draggedSlider].offsetWidth/sliderVisibleItems[draggedSlider]*-.3?(sliderDragEnd(),sliderPrev(draggedSlider)):sliderWrapperTranslate[draggedSlider]-sliderWrapperDragOffset[draggedSlider]>=sliderWrapper[draggedSlider].offsetWidth/sliderVisibleItems[draggedSlider]*.3&&(sliderDragEnd(),sliderNext(draggedSlider))}function sliderDragEnd(){sliderDragged&&(slider[draggedSlider].classList.remove("slider--dragged"),sliderWrapper[draggedSlider].classList.remove("slider__wrapper--dragged"),sliderDragged=!1,sliderWrapper[draggedSlider].style.transform="translateX("+sliderWrapperTranslate[draggedSlider]+"px)")}function scrollStart(e){scrollX=e.touches[0].clientX,scrollY=e.touches[0].clientY,scrollXEnabled=!0,scrollYEnabled=!0}function scrollMove(e){scrollXEnabled&&scrollYEnabled&&(Math.abs(scrollX-e.touches[0].clientX)>10?scrollYEnabled=!1:Math.abs(scrollY-e.touches[0].clientY)>10&&(scrollXEnabled=!1)),0==scrollYEnabled?e.preventDefault():0==scrollXEnabled&&sliderDragEnd()}sliderLink.forEach(e=>e.addEventListener("click",sliderLinkClick)),window.addEventListener("click",(function(){sliderLinkDragged=!1})),window.addEventListener("touchstart",scrollStart),window.addEventListener("touchmove",scrollMove,{passive:!1});const submenu=document.querySelectorAll(".submenu"),submenuButton=document.querySelectorAll(".submenu__button");for(let e=0;e<submenu.length;e++)submenuButton[e].addEventListener("click",()=>submenuToggle(e));function submenuToggle(e){submenuButton[e].classList.contains("submenu__button--open")?submenuClose(e):submenuOpen(e)}function submenuOpen(e){submenu[e].classList.add("submenu--open"),submenuButton[e].classList.add("submenu__button--open")}function submenuClose(e){submenu[e].classList.remove("submenu--open"),submenuButton[e].classList.remove("submenu__button--open")}window.addEventListener("click",(function(e){for(let r=0;r<submenu.length;r++)e.target.closest(".submenu")!=submenu[r]&&e.target.closest(".submenu__button")!=submenuButton[r]&&submenuClose(r)}));const delay=200;let scrollOffset=150,transformOffset=100,animationDisabled=!1;function fade(e,r){document.querySelectorAll("."+e).forEach(t=>{let l=scrollAnimateCount(t);switch(r){case"+":pageYOffset>=l+transformOffset&&setTimeout(scrollAnimate,200,t,e);break;case"-":pageYOffset>=l-transformOffset&&setTimeout(scrollAnimate,200,t,e);break;case"":pageYOffset>=l&&setTimeout(scrollAnimate,200,t,e);break;default:console.log("INVALID SIGN")}})}function scrollAnimate(e,r){e.classList.remove(r),e.classList.add("fade-anim")}function scrollAnimateCount(e){const r=e.getBoundingClientRect(),t=window.pageYOffset||document.documentElement.scrollTop;let l=r.top+t-window.innerHeight;return 1!=e.classList.contains("fade-no-offset")&&(l+=scrollOffset),l}function disableAnimation(e){animItem=document.querySelectorAll("."+e),animItem.forEach(r=>{r.classList.remove(e)})}window.addEventListener("scroll",()=>fade("fade-up","-")),window.addEventListener("scroll",()=>fade("fade-down","+")),window.addEventListener("scroll",()=>fade("fade-left","")),window.addEventListener("scroll",()=>fade("fade-right","")),window.addEventListener("resize",()=>fade("fade-up","-")),window.addEventListener("resize",()=>fade("fade-down","+")),window.addEventListener("resize",()=>fade("fade-left","")),window.addEventListener("resize",()=>fade("fade-right","")),fade("fade-up","-"),fade("fade-down","+"),fade("fade-left",""),fade("fade-right",""),setInterval((function(){0==animationDisabled&&window.innerWidth<=1e3&&(animationDisabled=!0,disableAnimation("fade-up"),disableAnimation("fade-down"),disableAnimation("fade-left"),disableAnimation("fade-right"))}),1);