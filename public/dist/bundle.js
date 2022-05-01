(()=>{"use strict";class e{constructor(e,t){this.elementId=e,this.baseClass=t,this.navInfo={},this.navBarIndicator=document.createElement("div"),window.addEventListener("resize",(()=>this.onResize()))}async fetchLinks(e){const t=await fetch(e),n=await t.json();this.navInfo=n}generateNavBar(){const e=document.createElement("ul");return e.classList.add(`${this.baseClass}__container`),this.navBarIndicator.classList.add(`${this.baseClass}__indicator`),e.appendChild(this.navBarIndicator),this.navInfo.cities.forEach((t=>{const n=document.createElement("li"),i=document.createElement("a");n.classList.add(`${this.baseClass}__item`),i.classList.add(`${this.baseClass}__link`),i.href=`#${t.section}`,i.innerText=t.label,i.dataset.timeZone=t.timezone,n.appendChild(i),e.appendChild(n),i.addEventListener("click",(e=>{this.setActiveLink(e.target.href),this.setIndicatorLocationAndSize(e.target)}))})),e}setActiveLink(e){const t=document.querySelectorAll(`.${this.baseClass}__link`);null==e&&(e=window.location.href),t.forEach((t=>{t.href==e?t.classList.add(`${this.baseClass}__link--active`):t.classList.remove(`${this.baseClass}__link--active`)}))}setIndicatorLocationAndSize(e){null==e&&null==(e=document.querySelector(`.${this.baseClass}__link--active`))||(this.navBarIndicator.style.left=`${e.offsetLeft}px`,this.navBarIndicator.style.width=`${e.offsetWidth}px`)}onResize(){this.setIndicatorLocationAndSize(void 0)}render(){const e=document.getElementById(this.elementId),t=this.generateNavBar();e.appendChild(t),this.setActiveLink(void 0),this.setIndicatorLocationAndSize(void 0)}}class t{constructor(e,t,n){this.refSelector=t,this.refDataForTimezone=n,this.clockElement=document.getElementById(e)}render(){setInterval((()=>{const e=document.querySelector(this.refSelector).getAttribute(this.refDataForTimezone),t=(new Date).toLocaleTimeString("en-US",{timeZone:e});this.clockElement.innerText=t}),400)}}class n{constructor(){this.navBar=new e("navigation-bar","navigation-bar"),this.clock=new t("clock-element-id",".navigation-bar__link--active","data-time-zone")}async init(){await this.navBar.fetchLinks("../navigation.json"),this.navBar.generateNavBar(),this.navBar.render(),this.clock.render()}}document.addEventListener("DOMContentLoaded",(e=>{(new n).init()}))})();