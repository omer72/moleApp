'use strict';


angular.module('moleAppApp')
  .controller('GameCtrl', function ($window,$scope,$interval, loopbackSrv,$mdDialog,$location) {
    var hole = 9;
    var currentMoleIndex = 0;
    var gameInterval;
    var canHit = true;
    var intervalDelay = 2000;
    $scope.counter = 0;

    $scope.moles = [];
    var init = function(){
      if (!$window.sessionStorage.getItem('clientId')){
        $location.path('/main');
      }
      for(var i=0; i <hole; i++){
        $scope.moles.push({
          index:i,
          style :'background-color:#d4d4d4',
          img : 'Penguin_peeps_right.svg'

        })
      }
      startGame();
    };

    $scope.hit = function(index){
      if (canHit) {

        if (index == currentMoleIndex) {
          $scope.moles[index].style = 'background-color:#ffb200';
          $scope.moles[index].img = 'Penguin_seeing_stars.svg';
          var clientId = $window.sessionStorage.getItem('clientId');
          $scope.counter++;
          $window.sessionStorage.setItem('counter', $scope.counter);
          var score = {id: clientId, score: $scope.counter};
          loopbackSrv.updateCounter(clientId, score).then(
            function success(res) {
              console.log(res);
              if (res.gameOver) {
                stopGame();
              }
            },
            function error(err) {
              console.log(err);
            }
          );
        } else {
          canHit = false;
        }
      }

    }

    var stopGame = function(){
      $interval.cancel(gameInterval);
      $scope.gameOver = "Game Over";
      showGameOverDialog();
    }
    var alert;
    var showGameOverDialog = function(ev){
      $window.sessionStorage.removeItem('clientId');
      alert = $mdDialog.alert({
        title: 'Attention',
        content: 'Game Over',
        ok: 'Close'
      });
      $mdDialog
        .show( alert )
        .finally(function() {
          alert = undefined;
          $location.path('/over');
        });
    }
    var resetColor = function(){
      for(var i=0; i <hole; i++){
        $scope.moles[i].style='background-color:#d4d4d4';
        $scope.moles[i].img='Penguin_peeps_right.svg';
      }
    }

    var startGame = function(){
      $interval.cancel(gameInterval);
      gameInterval = $interval(gamePlay,intervalDelay)
    }

    var gamePlay = function() {
      resetColor();
      currentMoleIndex = Math.floor((Math.random() * hole));
      canHit = true;
      $scope.moles[currentMoleIndex].style = 'background-color:#0286d1';
      $scope.moles[currentMoleIndex].img = 'Sitting_Penguin.svg';
      $interval.cancel(gameInterval);
      intervalDelay = Math.floor((Math.random() * 3000));
      startGame();
    }

    init();
  });
