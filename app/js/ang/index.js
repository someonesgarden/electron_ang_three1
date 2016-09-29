var request = require('request');
var cheerio = require('cheerio');
require('date-utils');

var myApp = angular.module('myApp',[]);
myApp.controller('myController', ['$scope', function($scope){

        initTest($scope);

        $scope.menuAction=function(num){
            console.log("clicked:"+num);
        }

}]);

var initTest = function($scope){
    console.log("myController init");
}
