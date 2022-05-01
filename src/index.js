/*
 *  Main
 *  @Copyright: (C) 2022, Jonathan
 *  @Author: Jonathan Dean Damiani
 *  @Version:  1.0.0
 *
 *  @summary: Main class for application. Initialize the entery application
 */
'use strict';
import App from './app.js';

document.addEventListener('DOMContentLoaded', (_) => {
  const MyApp = new App()

  MyApp.init()
})
