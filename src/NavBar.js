/*
 *  Main
 *  @Copyright: (C) 2022, Jonathan
 *  @Author: Jonathan Dean Damiani
 *  @Version:  1.0.0
 *
 *  @summary: Nav Bar class for application.
 */
'use strict';

export default class NavBar {
  /**
    * contructor
    *
    * @param {string} elementId Id of element to add navigation eg. this_id from <nav id="this_id"></nav>
    * @param {string} baseClass Base class for Navigation
   */
  constructor(elementId, baseClass) {
    this.elementId = elementId
    this.baseClass = baseClass
    this.navInfo = {}
    this.navBarIndicator = document.createElement('div');

    window.addEventListener('resize', () =>this.onResize());
  }

  /**
    * Fetch Links for navigation
    *
    * @param {string} url Url to fetch from
    *
   */
  async fetchLinks (url) {
    const res = await fetch(url);
    const data = await res.json();
    this.navInfo = data
  }

  /**
    * Generate the navbar, you can access the classes of the elemement using $baseClass__container, $baseClass__indicator, $baseClass__item, $baseClass__link 
    * where $baseClass is the one passed on the contructor of this class.
   */
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
      
      navBarLink.href = `#${link.section}`;
      navBarLink.innerText = link.label;
      navBarLink.dataset.timeZone = link.timezone;
      
      navBarItem.appendChild(navBarLink);
      navBarContainer.appendChild(navBarItem);

      navBarLink.addEventListener('click', (e) => {
        this.setActiveLink(e.target.href);
        this.setIndicatorLocationAndSize(e.target)
      });

    });

    return navBarContainer;
  }

  /**
    * Set Active link for the navbar. Add class $baseClass__link--active to actived link. 
    * @param {string} currentLink Current href link
   */

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

  /**
    * Set the position and location of active links
    * @param {HTMLElement} refElement HTML Element to use as reference of size and position of indication of active links
   */
  setIndicatorLocationAndSize (refElement) {
    if (refElement == undefined) {
      refElement = document.querySelector(`.${this.baseClass}__link--active`);
      if (refElement == undefined) return
    }
    this.navBarIndicator.style.left = `${refElement.offsetLeft}px`
    this.navBarIndicator.style.width = `${refElement.offsetWidth}px`
  }

  /**
    * Called on the window resize event happens.
   */
  onResize() {
    this.setIndicatorLocationAndSize(undefined);
  }

  /**
    * Render the navbar
  */
  render () {
    const navBarElement = document.getElementById(this.elementId);
    const navBar = this.generateNavBar();
    
    navBarElement.appendChild(navBar);

    this.setActiveLink(undefined)
    this.setIndicatorLocationAndSize(undefined)

    const activeLinkEl = document.querySelector(`.${this.baseClass}__link--active`);
  
    if (activeLinkEl == undefined) {
      const firstEl =  navBar.querySelector(`.${this.baseClass}__link`);
      window.location = firstEl.href
      this.setActiveLink(undefined)
      this.setIndicatorLocationAndSize(undefined)
    }
  }
} 
