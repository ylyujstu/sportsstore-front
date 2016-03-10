angular.module("sportsStoreAdmin")
	.constant("productUrl", "http://localhost:2403/products/")
	.config(function($httpProvider) {
	    $httpProvider.defaults.withCredentials = true;
	})//$resource服务是简历在$http服务所提供的特性的基础上的。这意味着我需要弃用withCredentials选项。我没有权限有$http服务产生的请求，但我通过调用木块上的config方法改变Ajax请求的默认设置，并声明以来与$http服务的提供其prodiver
	.controller("productCtrl", function ($scope, $resource, productUrl) {

	    $scope.productsResource = $resource(productUrl + ":id", { id: "@id" });

	    $scope.listProducts = function () {
	        $scope.products = $scope.productsResource.query();
	    }

	    $scope.deleteProduct = function (product) {
	        product.$delete().then(function () {
	            $scope.products.splice($scope.products.indexOf(product), 1);
	        });
	    }

	    $scope.createProduct = function (product) {
	        new $scope.productsResource(product).$save().then(function (newProduct) {
	            $scope.products.push(newProduct);
	            $scope.editedProduct = null;
	        });
	    }

	    $scope.updateProduct = function (product) {
	        product.$save();
	        $scope.editedProduct = null;
	    }

	    $scope.startEdit = function (product) {
	        $scope.editedProduct = product;
	    }

	    $scope.cancelEdit = function () {
	        $scope.editedProduct = null;
	    }

	    $scope.listProducts();
	});
