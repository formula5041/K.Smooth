// Plus and Minus Function
// GET plus
document.querySelector('#plus').addEventListener('click', plus_sum);
function plus_sum(){
    var inputValue = document.querySelector("#sumq").value;
    var inputValue = parseInt(inputValue)+1;
    document.querySelector('#sumq').value = inputValue;
    pCountingFun();
}   
// GET minus
document.querySelector('#minus').addEventListener('click', minus_sum);
function minus_sum(){
    var inputValue = document.querySelector("#sumq").value;
    var inputValue = parseInt(inputValue)-1;
    if(inputValue >= 1){
        document.querySelector('#sumq').value = inputValue;
    }
    pCountingFun();
}   

// Counting Function
function pCountingFun(){
  // input #sumq
  var sumQ = document.querySelector('#sumq').value;
  // p #singlePrice
  var singleP = document.querySelector('#singlePrice').textContent;
}

// reset Function #quantityReset
document.querySelector("#quantityReset").addEventListener('click', resetFun);
function resetFun(){
  let quantityReset = document.querySelector('#quantityReset');
  quantityReset.textContent = 'have reset!';
  quantityReset.style.animationName='btnMove';
  document.querySelector('#sumq').value = 1;
  setTimeout(function(){
    quantityReset.textContent = 'reset';
    quantityReset.style.animationName='';
  },1500)
}


// function area
passingData();

// return policy
document.querySelector('#policyLink').addEventListener('click',()=>{
  let policy = document.querySelector('#policy');
  let policyTitle = document.querySelector('#policyTitle');
  let policyP1 = document.querySelector('#policyP1');
  let policyP2 = document.querySelector('#policyP2');
  let policyP3 = document.querySelector('#policyP3');
  let policyP4 = document.querySelector('#policyP4');
  let policyP5 = document.querySelector('#policyP5');
  let policyImg = document.querySelector('#policyImg');
  
  
  policy.style.width='97%';
  policy.style.height='60%';
  policy.style.border='3px solid black';
  policy.style.zIndex='0';
  
  
  policyTitle.textContent = 'Standard Return Policy';
  policyP1.textContent = 'Start the return process within 30 days of receiving your item.';
  policyP2.textContent = 'We inspect all returned items. The product must be in new or unused condition, with all original product inserts and accessories.';
  policyP3.textContent = 'If something doesn’t work out, you can send most items back within 30 days of delivery.';
  policyP4.textContent = 'We will refund the cost of the merchandise and shipping charges if the return is a result of our error or defective product.';
  policyP5.textContent = 'Ship the product as soon as possible so it arrives at our facility within 45 days  of receipt of the item.';
  policyImg.setAttribute('src','./img/cancel.png');
  setTimeout(function(){
    policy.style.opacity='1';
  },200)
  
  window.scrollTo({ top: 50, left: 0, behavior: 'smooth' });
})

policyImg.addEventListener('click',function(){
  policy.style.opacity='0';
  setTimeout(function(){
    policy.style.width='0';
    policy.style.height='0';
    policy.style.border='0';
    policy.style.zIndex='-99';
    
    policyTitle.textContent = '';
    policyP1.textContent = '';
    policyP2.textContent = '';
    policyP3.textContent = '';
    policyP4.textContent = '';
    policyP5.textContent = '';
    policyImg.setAttribute('src',''); 
  },400)
})


// passing data
function passingData(){
  document.querySelector('#sendToCart').addEventListener('click',function(){
    let addBtn = document.querySelector('#sendToCart');
    // 增加animationName
    addBtn.style.animationName='btnMove';
    addBtn.textContent = 'added!';
    let productName = document.querySelector('#productName').innerHTML;
    let sumq = document.querySelector('#sumq').value;
    let singlePrice = document.querySelector('#singlePrice').innerHTML;
    let productsImg = document.querySelector('#pImg').src;

    //使用者有登入
    let userloggings = JSON.parse(localStorage.getItem('userlogging'));
    if(userloggings){
      // 先push給userloggings
      let task= {
        'name' : productName,
        'quantity' : sumq,
        'price' : singlePrice,
        'img': productsImg
      };
      let allProducts = userloggings.products.map(function(value){
        return value.name;
      })
      let arrayIndex = allProducts.indexOf(productName)      
      if(arrayIndex < 0){
        userloggings.products.unshift(task);
      } else{
        userloggings.products.splice(arrayIndex,1,task);
      }
      localStorage.setItem('userlogging', JSON.stringify(userloggings));

      // 再push給signInfo
      let signInfo = JSON.parse(localStorage.getItem('signInfo'));
      
      let allEmail = signInfo.map(function(value){
        return value.email
      })
      
      let allEmails =allEmail.indexOf(userloggings.email) //0
      //這裡面有沒有同產品名
      // map()products中的陣列
      let productsArray = signInfo[allEmails].products;
      let findName = productsArray.map(function(value){
        return value.name
      })
      let theProduct = findName.indexOf(productName)

      if( theProduct < 0){
        productsArray.unshift(task)
      } else{
        signInfo[allEmails].products.splice(theProduct,1,task);
      }
      
      localStorage.setItem('signInfo', JSON.stringify(signInfo));

      // 購物車同步
      let result = 0;
      userloggings.products.forEach(function(items){
          result += parseInt(items.quantity);
      })
      document.querySelector('#pCount').innerHTML=result;


    }else{
      // 使用者未登入
      // 我有"產品號"=當作array名稱；產品名稱: warrior 1；單價：900；數量：1
      let task = {
        'name' : productName,
        'quantity' : sumq,
        'price' : singlePrice,
        'img' : productsImg
      };
      
      let productItem = JSON.parse(localStorage.getItem('productItem'));

      if(productItem){
        let allName = productItem.map(function(value){
          return value.name
        })
        let arrayIndex = allName.indexOf(productName)
        if(arrayIndex<0){
          productItem.unshift(task);
        } else{
          productItem.splice(arrayIndex,1,task);
        }
      }else{
        productItem = [task];
      }
      localStorage.setItem('productItem', JSON.stringify(productItem));
      // 購物車同步
      let result = 0;
      productItem.forEach(function(items){
          result += parseInt(items.quantity);
      })
      document.querySelector('#pCount').innerHTML=result;
    }

    // 1秒後移除animationName
    setTimeout(function(){
      addBtn.style.animationName='';
      addBtn.textContent = 'add to cart';
    },1500)
  });
}

