/*
 *  Main
 *  @Copyright: (C) 2022, Jonathan
 *  @Author: Jonathan Dean Damiani
 *  @Version:  1.0.0
 *
 *  @summary: Main class for application.
 */
'use strict';

import NavBar from "./NavBar.js";
import Clock from "./Clock.js";

export default class App {
  constructor() {
    this.navBar = new NavBar("navigation-bar", "navigation-bar")
    this.clock = new Clock( "clock-element-id", ".navigation-bar__link--active", "data-time-zone");
  } 

  async init () {
    await this.navBar.fetchLinks('../navigation.json');
    this.navBar.generateNavBar();
    this.navBar.render();
    this.clock.render();
  }
} 
