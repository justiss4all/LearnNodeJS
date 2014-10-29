tipCalculator = angular.module('TipCalculator', []); 

// Main controller
tipCalculator.controller('Main.Controller', ['$scope', function($scope) {

  $scope.goCalculate = false; 
  $scope.highlight = "danger"; 

  var mealCost = 0; 
  var taxRate = 0; 
  var subTotal = 0; 
  var tipAmount = 0; 


  $scope.calculateSubTotal = function(cost,tax) {
    mealCost = Number(cost); 
    taxRate = Number(tax); 
    subTotal = mealCost + (mealCost * taxRate/100); 
    return subTotal; 
  }

// This function changes the color of the tip amount. Ex: Under 10% is red. 
  $scope.calculateTip = function(tip){
    if(tip >= 20){
      $scope.highlight = "success"; 
    }
    else if(tip >= 11 && tip <= 19) {
      $scope.highlight = "warning"; 
    }
    else {
      $scope.highlight = "danger"; 
    }

    tipAmount = (subTotal * (Number(tip)/100)); 
    return tipAmount; 
  }

  $scope.calculateTotal = function(){
    var total = subTotal + tipAmount; 

    if(!isNaN(total)){
      return total; 
    }
  }

}]); 

