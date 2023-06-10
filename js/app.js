'use strict';

function AppState() {
  this.allProducts = [];
}

AppState.prototype.instantiateProducts = function () {

  const productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];

  for (let i = 0; i < productNames.length; i++) {
    if (productNames[i] === 'sweep') {
      this.allProducts.push(new Product(productNames[i], 'png'))
    } else {
      this.allProducts.push(new Product(productNames[i]))
    }
  }

}

AppState.prototype.saveToLocalStorage = function () {
  // TODO: Fill in this instance method to save product data to local storage
  let productData = JSON.stringify(this.allProducts);
  localStorage.setItem('ProductData', productData);
}

AppState.prototype.loadItems = function () {

  let previousProductArray = localStorage.getItem('ProductData');
  let reconstructedProduct;
  // TODO: Update this instance method to retrieve data from local storage instead of creating new Products on each page load
  if(previousProductArray){
    previousProductArray = JSON.parse(previousProductArray);
    for(let i=0; i < previousProductArray.length; i++){
      if(previousProductArray[i].name === 'sweep'){
        reconstructedProduct = new Product(previousProductArray[i].name, 'png');
        reconstructedProduct.source = previousProductArray[i].source;
        reconstructedProduct.timesClicked = previousProductArray[i].timesClicked;
        reconstructedProduct.timesShown = previousProductArray[i].timesShown;
        this.allProducts.push(reconstructedProduct);
      } else{
        reconstructedProduct = new Product(previousProductArray[i].name);
        reconstructedProduct.source = previousProductArray[i].source;
        reconstructedProduct.timesClicked = previousProductArray[i].timesClicked;
        reconstructedProduct.timesShown = previousProductArray[i].timesShown;
        this.allProducts.push(reconstructedProduct);
      }
    }
  }
  else{
    this.instantiateProducts();
  }

}


function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.source = `assets/${name}.${fileExtension}`;
  this.timesClicked = 0;
  this.timesShown = 0;
}
