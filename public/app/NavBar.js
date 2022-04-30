/*
 *  Main
 *  @Copyright: (C) 2022, Jonathan
 *  @Author: Jonathan Dean Damiani
 *  @Version:  1.0.0
 *
 *  @summary: Main class for application.
 */
'use strict';

export default class NavBar {
  constructor(elementId, baseClass) {
    this.elementId = elementId
    this.baseClass = baseClass
    this.navInfo = {}
    this.navBarIndicator = document.createElement('div');

    window.addEventListener('resize', () =>this.onResize());
  }

  async fetchLinks (url) {
    const res = await fetch(url);
    const data = await res.json();
    this.navInfo = data
  }

  generateNavBar () {
    const navBarContainer = document.createElement('ul');
    navBarContainer.classList.add(`${this.baseClass}__container`);

    this.navBarIndicator.classList.add(`${this.baseClass}__indicator`);

    navBarContainer.appendChild(this.navBarIndicator)

    this.navInfo.cities.forEach(link => {
      const navBarItem = document.createElement('li');
      const navBarLink = document.createElement('a');

      navBarItem.classList.add(`${this.baseClass}__item`);
      navBarLink.classList.add(`${this.baseClass}__link`);
      
      navBarLink.href = `#${link.section}`
      navBarLink.innerText = link.label
      
      navBarItem.appendChild(navBarLink);
      navBarContainer.appendChild(navBarItem);

      navBarLink.addEventListener('click', (e) => {
        this.setActiveLink(e.target.href);
        this.setIndicatorLocationAndSize(e.target)
      });

    });

    return navBarContainer;
  }

  setActiveLink (currentLink) {
    const allLinkElements = document.querySelectorAll(`.${this.baseClass}__link`);
    if (currentLink == undefined) {
      currentLink = window.location.href
    }
    allLinkElements.forEach((el) => {
      if (el.href == currentLink) {
        el.classList.add(`${this.baseClass}__link--active`);
      } else {
        el.classList.remove(`${this.baseClass}__link--active`);
      }
    });
  }

  

  setIndicatorLocationAndSize (refElement) {
    if (refElement == undefined) {
      refElement = document.querySelector(`.${this.baseClass}__link--active`);
      if (refElement == undefined) return
    }
    this.navBarIndicator.style.left = `${refElement.offsetLeft}px`
    this.navBarIndicator.style.width = `${refElement.offsetWidth}px`
  }

  onResize() {
    this.setIndicatorLocationAndSize(undefined);
  }

  render () {
    const navBarElement = document.getElementById(this.elementId);
    const navBar = this.generateNavBar();
    
    navBarElement.appendChild(navBar);

    this.setActiveLink(undefined)
    this.setIndicatorLocationAndSize(undefined)
  }
} 
