'use strict';


angular.module('moleAppApp')
  .controller('GameoverCtrl', function ($window,$scope) {
    $scope.counter = $window.sessionStorage.getItem('counter');
  });
