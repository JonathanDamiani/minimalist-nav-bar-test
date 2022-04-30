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

export default class App {
  constructor() {
    this.navBar = new NavBar("navigation-bar", "navigation-bar")
  } 

  async init () {
    await this.navBar.fetchLinks('../navigation.json')
    this.navBar.generateNavBar()
    this.navBar.render()
  }
} 
