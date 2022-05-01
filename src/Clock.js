/*
 *  Main
 *  @Copyright: (C) 2022, Jonathan
 *  @Author: Jonathan Dean Damiani
 *  @Version:  1.0.0
 *
 *  @summary: Clock class to create a timer basen on timezone information.
 */
'use strict';


export default class Clock {
  /**
    * contructor
    *
    * @param {string} clockElementId Id of element to add clock
    * @param {string} refSelector Selector(id, class) of element with data property with timezone
    * @param {string} refDataForTimezone Data Property Name of element from refSelector that you stored timezone information
    * @example "clock-element-id", ".time-zone-element", "data-time-zone"
    * @example refDataForTimezone needs to have value like: "data-time-zone": 'America/Los_Angeles' from Date().toLocaleTimeString() 
   */
  constructor(clockElementId, refSelector, refDataForTimezone) {
    this.refSelector = refSelector;
    this.refDataForTimezone = refDataForTimezone;
    this.clockElement = document.getElementById(clockElementId)
  }

  /**
    * Render Clock
  */
  render () {
    setInterval(() => {
      const el = document.querySelector(this.refSelector);
      const currentTimeZone = el.getAttribute(this.refDataForTimezone);
      const currentTime = new Date().toLocaleTimeString("en-US", {timeZone: currentTimeZone})
      this.clockElement.innerText = currentTime
    }, 400);
  }
} 
