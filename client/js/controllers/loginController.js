(function() {
	var app = angular.module("app");
	var loginController = function($scope, $http, $location) {
		$scope.login = function(user, pwd) {
			var authReq = {
				method : 'post',
				url : '/api/HospitalUsers/login',
				headers : {
					'Content-Type' : 'application/json',
					'Accept' : 'application/json',
					'Accept-Language' : 'en-US,en;q=0.5',
					'Accept-Encoding' : 'gzip, deflate, br'
				},
				data : {
					"email" : user,
					"password" : pwd
				}
			};

			$http(authReq).then(
					function(response) {
						// handle success
						$scope.test = response.data.id;
						// email: $scope.user,
						// password: $scope.pwd
						$location.path("find-patient/" + response.data.id + "/"
								+ response.data.userId);
					}, function(response) {
						$scope.test = true;
					});

			/*
			 * $scope.test ="Entro";
			 * $http.post('https://localhost:3443/api/HospitalUsers/login', { , })
			 * .then(function mySuccess(response) { $scope.test = response.id;
			 * callback(response); }, function myError(response) { $scope. });
			 */
		}

	};
	app.controller("loginController", [ "$scope", "$http", "$location",
			loginController ]);
}());

/*
 * TODO > Añadir url de api > en el html, mandar llamar el controller
 */