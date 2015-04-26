'use strict';

/**
 * @ngdoc overview
 * @name moleAppApp
 * @description
 * # moleAppApp
 *
 * Main module of the application.
 */
angular
  .module('moleAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'wam.service',
    'ngMaterial'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/game', {
        templateUrl: 'views/game.html',
        controller: 'GameCtrl'
      })
      .when('/over', {
        templateUrl: 'views/gameover.html',
        controller: 'GameoverCtrl'
      })
      .when('/kill', {
        templateUrl: 'views/killAll.html',
        controller: 'KillAllCtrl'
      })
      .otherwise({
        redirectTo: '/main'
      });
  });
