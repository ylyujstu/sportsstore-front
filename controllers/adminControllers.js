angular.module("sportsStoreAdmin")
	.constant("authUrl", "http://localhost:2403/users/login")
	.controller("authCtrl", function ($scope, $http, $location, authUrl) {
		$scope.authenticate = function (user, pass) {
			$http.post(authUrl, {
				username: user,
				password: pass
			}, {
				withCredentials: true //启用跨域请求（cross-origin requests）
			}).success(function (data) {
				$location.path("/main");
			}).error(function (error) {
				$scope.authenticationError = error;
			});
		}
	});