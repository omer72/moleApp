'use strict';


angular.module('moleAppApp')
  .controller('KillAllCtrl', function ($mdDialog,$scope,loopbackSrv,openstackSrv) {

      $scope.storageList = [];
      $scope.selectdStorage;
      $scope.login = function(){
        openstackSrv.login().then(
            function success(res){
              $scope.logedin = "Logged in";

            },
            function error(err){
              $scope.logedin = "Not Logged in"
            }
        );
      }

      $scope.getStorageList = function () {
        openstackSrv.getStorageList().then(
            function success(res){
              $scope.storageList = res.storages;
            }
        )
      }



      $scope.kill = function(ev){
      var confirm = $mdDialog.confirm()
        .title('Would you like to Kill the game?')
        .content('Killing the game will stop all users.')
        .ok('Please do it!')
        .cancel('No')
        .targetEvent(ev);
      $mdDialog.show(confirm).then(function() {
        $scope.alert = 'You decided to kill the game';
        openstackSrv.detachAndDeleteStorage($scope.selectdStorage),
        loopbackSrv.killAll().then(
          function success(res){
            $scope.gameList = res;
          },function error(err){

          }
        );
      }, function() {
        $scope.alert = 'You decided to keep the game going.';
      })
    }

    $scope.restart = function(ev){

      var confirm = $mdDialog.confirm()
        .title('Would you like to Delete all users?')
        .content('Deleting the users will empty the users list.')
        .ok('Please do it!')
        .cancel('No')
        .targetEvent(ev);
      $mdDialog.show(confirm).then(function() {
        $scope.alert = 'You decided to delete all users';
        loopbackSrv.deleteAll().then(
          function success(res){
            $scope.deleteText = "Delete All Success";
          },function error(err){
            $scope.deleteText = "Delete All Failed";
          }
        );
      }, function() {
        $scope.alert = 'You decided to keep the users.';
      })



    }
  });
