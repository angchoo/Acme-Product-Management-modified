/**
 * Created by jfangchoo on 23/06/2015.
 */
/**
 * Created by Deb on 8/26/2014.
 */
(function () {
    "use strict";

    angular
        .module("productManagement")
        .controller("ProductEditCtrl",
        ["product","$state","productService",
            ProductEditCtrl]);


    function ProductEditCtrl(product,$state,productService) {
        var vm = this;

        vm.product = product;

        if (vm.product && vm.product.productId) {
            vm.title = "Edit: " + vm.product.productName;
        }
        else {
            vm.title = "New Product"
        }

        vm.open=function($event){
            $event.preventDefault();
            $event.stopPropagation();

            vm.opened=!vm.opened;
        };

        vm.submit=function(isInvalid){

            if(isInvalid){
                toastr.error("Please input correct data");
            }else{
                vm.product.$save(function(data){
                    toastr.success("Save Successful");
                });
            }
        };

        vm.cancel=function(){
            $state.go('productList');
        };

        vm.addTags=function(tags){
            if(tags){
                var array=tags.split(',');
                vm.product.tags=vm.product.tags ? vm.product.tags.concat(array) : array;
                vm.newTags="";
            } else {
                alert("Please enter one or more tags separated by commas");
            }
        };

        vm.removeTag=function(idx){
            vm.product.tags.splice(idx,1);
        };

        vm.priceOption="percent";

        vm.marginPercent=function(){
            return productService.calculateMarginPercent(vm.product.price,vm.product.cost);
        };

        vm.calculatePrice = function () {
            var price = 0;

            if (vm.priceOption == 'amount') {
                price = productService.calculatePriceFromMarkupAmount(
                    vm.product.cost, vm.markupAmount);
            }

            if (vm.priceOption == 'percent') {
                price = productService.calculatePriceFromMarkupPercent(
                    vm.product.cost, vm.markupPercent);
            }
            vm.product.price = price;
        };

    }
}());
