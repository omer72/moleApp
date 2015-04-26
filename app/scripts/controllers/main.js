'use strict';

/**
 * @ngdoc function
 * @name moleAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the moleAppApp
 */
angular.module('moleAppApp')
  .controller('MainCtrl', function ($window,$scope,loopbackSrv,$location) {
    $scope.score;

    var init = function(){
      if ($window.sessionStorage.getItem('clientId')){
        $location.path('/game');
      }
    };
    $scope.start = function(){
      console.log("start");
      $scope.score.gameOver= false;
      loopbackSrv.register($scope.score).then(
        function success(res){
          $window.sessionStorage.setItem('clientId' , res.id);
          console.log(res);
          $location.path('/game');
        },
        function error(err){
          console.log(err);
        });
    };

    init();
  });
