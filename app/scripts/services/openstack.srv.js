angular.module('wam.service.openstack',[]).
  factory('openstackSrv',function($q,$http,$location){
      var tenant;
    var login = function(data){
      var host = $location.host();
      var deferred = $q.defer();
      data = {"auth":{"passwordCredentials":{"username":"gpaz","password":"Admin11!"}}};
      var config = {'Content-Type':'application/json'}
      $http.post('/al-openstack/v2.0/tokens',data,config).
        success(function(data,status){

            function getTenants(arrTenants){
              for (var i = 0; i <arrTenants.length; i++){
                if (arrTenants[i].id == '1'){
                  return arrTenants[i];
                }
              }
              return arrTenants[0];
            }
            $http.defaults.headers.common['X-Auth-Token'] = data.access.token.id;
            var tenatsUrl = '/al-openstack/identity/v2.0/tenants';
            $http.get(tenatsUrl).then(
                function success(response){
                  tenant = getTenants(response.data.tenants);
                  var loginObj = {"auth":{"tenantId":tenant.id,"passwordCredentials":{"username":"gpaz","password":"Admin11!"}}};
                  $http.post('/al-openstack/v2.0/tokens',loginObj).then(
                      function sucess(response){
                        var objToken = response.data.access.token;
                      }
                  )
                }
            )
          deferred.resolve(data);
        }).
        error(function(data,status){
          deferred.reject(status);
        })

      return deferred.promise;
    };

      var getStorageList = function(){
        var deferred = $q.defer();
         $http.get('/al-web/api/storage/listStorages').then(
            function success (response){
              deferred.resolve(response.data);
            }
        ),function error(err){
            deferred.reject(err);

        }
        return deferred.promise;

      }

      var detachAndDeleteStorage = function(selectdStorage) {
          $http.get('al-web/api/storage/detachStorage?storageId='+selectdStorage).then(
              function success(res){
                  console.log("detach Storage ");
                  $http.get('al-web/api/storage/deleteStorage?storageId='+selectdStorage).then(
                      function success(res){
                          console.log("storage deleted");
                      }
                  )
              }
          )
      }


    return{
      login:login,
      getStorageList : getStorageList,
      detachAndDeleteStorage:detachAndDeleteStorage
    };

  });
