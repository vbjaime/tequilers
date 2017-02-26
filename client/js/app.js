(function(){
    
    var app = angular.module("app", ["ngRoute"]);
    
    app.config(function($routeProvider){
        $routeProvider
            .when("/", {
                templateUrl: "views/login.html",
                controller: "loginController"
            })
            .when("/find-patient/:token/:uid", {
                templateUrl: "views/find-patient.html",
                controller: "findPatientController"
            })
            .when("/location", {
                templateUrl: "views/location.html",
                controller: "locationController"
            })
            .when("/message-template", {
                templateUrl: "views/message-template.html",
                controller: "messageTemplateController"
            })
            .when("/patient-messages", {
                templateUrl: "views/patient-messages.html",
                controller: "patientMessagesController"
            })
            .when("/personal-messages", {
                templateUrl: "views/personal-messages.html",
                controller: "personalMessagesController"
            })
            .otherwise({redirectTo:"/"});
    });
    
}());