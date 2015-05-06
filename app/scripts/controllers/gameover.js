'use strict';


angular.module('moleAppApp')
  .controller('GameoverCtrl', function ($window,$scope,$location) {
    $scope.counter = $window.sessionStorage.getItem('counter');

    $scope.playAgain = function(){
      $location.path('/main');
    }
  });
