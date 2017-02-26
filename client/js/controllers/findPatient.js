(function() {
	var app = angular.module("app");
	var findPatientController = function($scope, $http) {
		$scope.patientSearchView = true;
		$scope.locationView = false;
		
		$scope.searchPatient = function(patientName) {
			$http.get("/api/Patients/query?term=" + patientName).then(onQueryComplete, onError);
		};
		
		$scope.searchFirstPatient = function() {
			$http.get('/api/Patients?filter={"limit":6}').then(onFirstQueryComplete, onError);
		};
		
		$scope.clickRequestToMeet = function() {
			var authReq = {
					method : 'get',
					url : '/api/MessageTemplates/58b1c646a05aa81df86c31fe'
				};

			$http(authReq).then(function(response) {
				$scope.messageTemplate = response.data;
				$scope.selectActionView = false;
				$scope.locationView = true;
			}, function(response) {
				$scope.test = true;
			});
		};
		
		$scope.clickRequestMedicine = function() {
			var authReq = {
					method : 'get',
					url : '/api/MessageTemplates/58b1c6aea05aa81df86c31ff'
				};

			$http(authReq).then(function(response) {
				$scope.messageTemplate = response.data;
				$scope.selectActionView = false;
				$scope.locationView = true;
			}, function(response) {
				$scope.test = true;
			});
		};
		
		$scope.clickRequestBlood = function() {
			var authReq = {
					method : 'get',
					url : '/api/MessageTemplates/58b1c715a05aa81df86c3200'
				};

			$http(authReq).then(function(response) {
				$scope.messageTemplate = response.data;
				$scope.selectActionView = false;
				$scope.locationView = true;
			}, function(response) {
				$scope.test = true;
			});
		};
		
		$scope.clickRequestCustomMsg = function() {
			var authReq = {
				method : 'get',
				url : '/api/MessageTemplates/58b1c753a05aa81df86c3201'
			};

		$http(authReq).then(function(response) {
			$scope.messageTemplate = response.data;
			$scope.selectActionView = false;
			$scope.locationView = true;
		}, function(response) {
			$scope.test = true;
		});
		};
		
		$scope.clickBackToAction = function() {
			$scope.selectActionView = true;
			$scope.locationView = false;
			$scope.other = false;
		};
		
		$scope.clickBackToLocation = function() {
			$scope.locationView = true;
			$scope.messageTemplateView = false;
			$scope.other = false;
		};
		
		$scope.clickBackToPatients = function() {
			$scope.other = false;
			$scope.patientSearchView = true;
			$scope.selectActionView = false;
		};
		
		$scope.clickLocation = function(_location) {
			$scope.location = _location
			$scope.messageReplaced = $scope.messageTemplate.text.replace("LOCATION",$scope.location);
			$scope.locationView = false;
			$scope.messageTemplateView = true;
		};
		
		$scope.clickOtherNext = function() {
			$scope.localView = false;
			$scope.otherLocation = true;
		};
		
		$scope.clickOther = function() {
			$scope.other = true;
		};
		
		var onQueryComplete = function(response) {
			$scope.array = response.data;
			$scope.patients = $scope.array.results;
		};
		
		var onFirstQueryComplete = function(response) {
			$scope.array = response.data;
			$scope.patients = $scope.array;
		};
		
		var onError = function(response) {
			$scope.error = "Could not fetch the patient.";
		};
		
		$scope.selectPatient = function(patient) {
			$scope.patientSearchView = false;
			$scope.selectActionView = true;
			//$scope.locationView = true;
			$scope.patientName = patient.name;
		};
	};
	app.controller("findPatientController", ["$scope", "$http", findPatientController]);
}());

$("#other").click(function() {
	$("#form-other-location").show();
});

/*$(window).load(function(){
	var searchInput = document.getElementById('searchInput');
	searchInput.addEventListener('keyup', function(){
		console.log(this.value);
	});
});*/