angular.module('wam.service',[]).
  factory('loopbackSrv',function($q,$http,$location){

    var register = function(data){
      var host = $location.host();
      var deferred = $q.defer();
      $http.post('http://'+host +':3000/api/scoreData',data).
        success(function(data,status){
          deferred.resolve(data);
        }).
        error(function(data,status){
          deferred.reject(status);
        })

      return deferred.promise;
    };

    var updateCounter = function(id,data){
      var host = $location.host();
      var deferred = $q.defer();

      $http.put('http://'+host+':3000/api/scoreData/'+id,data).
        success(function(data,status) {
          deferred.resolve(data);
        }).
        error(function(data,status){
          deferred.reject(status);
        });
      return deferred.promise;
    };


    var killAll = function(){
      var host = $location.host();
      var deferred = $q.defer();
      $http.get('http://'+host+':3000/api/scoreData').
        success(function(res){
          deferred.resolve(res);
          var result = res;
          angular.forEach(res, function(data,key){
            data.gameOver = true;
            $http.put('http://'+host +':3000/api/scoreData',data);
          })
      })
      return deferred.promise;
    }

    var deleteAll = function(){
      var host = $location.host();
      var deferred = $q.defer();
      $http.get('http://'+host+':3000/api/scoreData').
        success(function(res){
          deferred.resolve(res);
          var result = res;
          angular.forEach(res, function(data,key){
            $http.delete('http://'+host +':3000/api/scoreData/'+data.id);
          })
        })
      return deferred.promise;

    }
    return{
      register:register,
      updateCounter:updateCounter,
      killAll : killAll,
      deleteAll : deleteAll
    };

  });
