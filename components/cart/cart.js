angular.module("cart", [])
	.factory('cart', function () {//工厂函数，传入服务名称“购物车”
		var cartData = [];

		return {
			addProduct: function (id, name, price) {
				var addedToExistingItem = false;
				for (var i = 0; i < cartData.length; i++) {
					if (cartData[i].id == id) {
						cartData[i].count++;
						addedToExistingItem = true;
						break;
					}
				}

				if (!addedToExistingItem) {
					cartData.push({
						count: 1,
						id: id,
						price: price,
						name: name
					});
				}
			},

			removeProduct: function (id) {//不是减1，而是删除全部这类商品
				for (var i = 0; i < cartData.length; i++) {
					if (cartData[i].id == id) {
						cartData.splice(i, 1);
						break;
					}
				}
			},

			getProducts: function () {
				return cartData;
			}

		}
	})
	//添加指令
	.directive("cartSummary", function (cart) {
		return {
			restrict: "E",
			templateUrl: "components/cart/cartSummary.html",
			controller: function ($scope) {

				var cartData = cart.getProducts();
				
				$scope.total = function () {
					var total = 0;
					for (var i = 0; i < cartData.length; i++) {
						total += (cartData[i].price * cartData[i].count);
					}
					return total;
				}

				$scope.itemCount = function () {
					var total = 0;
					for (var i = 0; i < cartData.length; i++) {
						total += cartData[i].count;
					}
					return total;
				}
			}
		};
	});
















