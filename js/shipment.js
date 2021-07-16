// 定義兩個資料table名稱
let signInfo = JSON.parse(localStorage.getItem('signInfo'));
let userloggings = JSON.parse(localStorage.getItem('userlogging'));
// MBMVER LOGIN
// ===============================================================================
function memberFun(){
    let userProducts = userloggings.products;
    for(let i = 0 ; i < userProducts.length; i++){
        let insertPoint = document.querySelector('#insertPoint');
        insertPoint.insertAdjacentHTML('beforebegin',
        `
        <tr class="itemsList">
            <td><img src="${userProducts[i].img}" class="productsImg"></td>
            <td class="productName">${userProducts[i].name}</td>
            <td>
                <span class="sumq">${userProducts[i].quantity}</span>
            </td>
            <td>$<span class="singlePrice">${userProducts[i].price}</span></td>
            <td>$<span class="sum">${userProducts[i].quantity * userProducts[i].price}</span></td>
        </tr>
        `
        );
    }
}
// GUEST NOLOGIN
// ===============================================================================
function guestFun(){
    function createRow(){
        let insertPoint = document.querySelector('#insertPoint');
    
        insertPoint.insertAdjacentHTML('beforebegin',
        `
        <tr class="itemsList">
            <td><img src="" class="productsImg"></td>
            <td class="productName"></td>
            <td>
                <span class="sumq"></span>
            </td>
            <td>$<span class="singlePrice">0</span></td>
            <td>$<span class="sum">0</span></td>
        </tr>
        `
        );
    }
    // 創建table架構，並判斷localStorage中有多少array，建立相對應的數量
    let productItem = JSON.parse(localStorage.getItem('productItem'));
    for(let i = 0 ; i < productItem.length; i++){
        createRow();
    }
    
    // 將localStorage中的資料傳入table中
    function passing(){
        for(let i = 0; i < productItem.length ; i++ ){
            document.querySelectorAll('.productsImg')[i].src=productItem[i].img;
            document.querySelectorAll('.productName')[i].innerHTML = productItem[i].name;
            document.querySelectorAll('.sumq')[i].innerHTML = productItem[i].quantity;
            document.querySelectorAll('.singlePrice')[i].innerHTML = productItem[i].price;
            document.querySelectorAll('.sum')[i].innerHTML = productItem[i].quantity*productItem[i].price;
            // 改變listNumber數字
            // document.querySelectorAll('.listNumber')[i].innerHTML=i+1;
        }
    }
    passing();
}
// ===============================================================================
// 判斷，是否為會員登入狀態
if(userloggings){
    memberFun();
} else{
    guestFun();
}
// ===============================================================================

// 運費資料傳遞到payment
let direcShipping = document.querySelector('#direcShipping');
let drapShipping =  document.querySelector('#drapShipping');

document.querySelector('#submitA').addEventListener('click',function(){
    if(direcShipping.checked || drapShipping.checked){
        let resultShipping = document.querySelector('#resultShipping').innerHTML;
        let shipping = {
            'fee' : resultShipping
        };
        let shippings = JSON.parse(localStorage.getItem('shippings'));
        if(shippings){
            shippings.splice(0,1,shipping);
        }else{
            shippings = [shipping];
        }
        localStorage.setItem('shippings', JSON.stringify(shippings));
    } else {
        alert('Please Check Direct or Drap!')
    }
    
})


let storeName = document.querySelectorAll('.storeName');
let searchStore = document.querySelectorAll('.searchStore');
let directInfo = document.querySelectorAll('.directInfo');
let shipMethodsContainer = document.querySelectorAll('.shipMethodsContainer');
let seven = document.querySelector('#seven');


// inputfocus後判斷
direcShipping.addEventListener('click',function(){
    document.querySelector('#resultShipping').innerHTML = 100;
    document.querySelector('#lasrResultTotal').innerHTML = parseInt(document.querySelector('#totalPrice').innerHTML) + 100 ;
    for (let i = 0 ; i < storeName.length ; i++){
        storeName[i].setAttribute('disabled','');
    }
    for (let i = 0 ; i < searchStore.length ; i++){
        searchStore[i].style.visibility = 'hidden';
    }
    for (let i = 0 ; i < directInfo.length ; i++){
        directInfo[i].removeAttribute('disabled');
        directInfo[i].setAttribute('required','');
    }
    shipMethodsContainer[0].style.backgroundColor = '#E2444420';
    shipMethodsContainer[1].style.backgroundColor = '';
    seven.removeAttribute('required');
})
drapShipping.addEventListener('click',function(){
    document.querySelector('#resultShipping').innerHTML = 60;
    document.querySelector('#lasrResultTotal').innerHTML = parseInt(document.querySelector('#totalPrice').innerHTML) + 60 ;
    for (let i = 0 ; i < storeName.length ; i++){
        storeName[i].removeAttribute('disabled');
    }
    for (let i = 0 ; i < searchStore.length ; i++){
        searchStore[i].style.visibility = '';
    }
    for (let i = 0 ; i < directInfo.length ; i++){
        directInfo[i].setAttribute('disabled','');
        directInfo[i].removeAttribute('required');
    }
    shipMethodsContainer[0].style.backgroundColor = '';
    shipMethodsContainer[1].style.backgroundColor = '#E2444420';
    seven.setAttribute('required','');
})
for (let i = 0 ; i < storeName.length ; i++){
    if(i %2 == 0){
        storeName[i].addEventListener('focus', function(){
            for(let j = 0 ; j < storeName.length ; j ++){
                if(i == 0 && j == 1){
                    storeName[j].setAttribute('required','');
                    storeName[3].removeAttribute('required');
                    storeName[5].removeAttribute('required');
                }else if(i == 2 && j == 3){
                    storeName[j].setAttribute('required','');
                    storeName[1].removeAttribute('required');
                    storeName[5].removeAttribute('required');
                }else if(i == 4 && j == 5){
                    storeName[j].setAttribute('required','');
                    storeName[1].removeAttribute('required');
                    storeName[3].removeAttribute('required');
                }
            }
        })
    }
}


// 算table總價
let sum = document.querySelectorAll('.sum');
let a = 0;
for(let i = 0 ; i <sum.length ; i++){
    a = a + parseInt(sum[i].innerHTML);
    document.querySelector('#totalPrice').innerHTML = a;
    document.querySelector('#subTotal').innerHTML = a;
}

// 畫面刷新時，有登入者快速輸入資料button建立
let directShipping = document.querySelector('.directShipping');
if(userloggings){
    directShipping.insertAdjacentHTML('afterend',`
    <button class="quickInput">Quick input</button>
    `)
}

document.addEventListener('click',function(e){
    if(e.target.classList.contains('quickInput')){
        e.preventDefault();
        document.querySelector('#firstName').value = userlogging.fullname;
        document.querySelector('#email').value = userlogging.email;
        document.querySelector('#telephone').value = userlogging.telephone;
        document.querySelector('#address').value = userlogging.address;
    }
})

// couponFun

document.addEventListener('click',(e)=>{
    if(e.target.id == 'couponClick'){
        let direcShipping = document.querySelector('#direcShipping');
        let drapShipping = document.querySelector('#drapShipping');
        if(direcShipping.checked || drapShipping.checked){
            let enterCoupon = document.querySelector('#enterCoupon');
            let enterCouponV = document.querySelector('#enterCoupon').value;
            let resultShipping = document.querySelector('#resultShipping');
            let lasrResultTotal = document.querySelector('#lasrResultTotal');
            if(enterCouponV=='SAFE10' || enterCouponV=='safe10'){
                if(!resultShipping.classList.contains('VIP945')){
                    e.target.innerHTML = 'Success!';
                    enterCoupon.style.border = '1px solid #bdb000';
                    if(!resultShipping.classList.contains('SAFE10')){
                        document.querySelector('#resultShipping').innerHTML = parseInt(resultShipping.innerHTML)-10;
                        document.querySelector('#lasrResultTotal').innerHTML = parseInt(lasrResultTotal.innerHTML)-10;
                    }
                    resultShipping.classList.add('SAFE10');
                }
            }else if (enterCouponV=='VIP945' || enterCouponV=='vip945') {
                if(!resultShipping.classList.contains('SAFE10')){
                    e.target.innerHTML = 'Success!';
                    enterCoupon.style.border = '1px solid #bdb000';
                    if(!resultShipping.classList.contains('VIP945')){
                        document.querySelector('#resultShipping').innerHTML = parseInt(resultShipping.innerHTML)-60;
                        document.querySelector('#lasrResultTotal').innerHTML = parseInt(lasrResultTotal.innerHTML)-60;
                    }
                    resultShipping.classList.add('VIP945');
                }
            }else{
                alert('This Coupon Numbers is Wrong!')
                e.target.innerHTML = 'Wrong!';
                enterCoupon.style.border = '1px solid #E24444';
                setTimeout(()=>{
                    e.target.innerHTML = 'Check it';
                },2000)
            }
        } else{
            alert('You should check a shipping way!')
        }
    }
})

// 電話號碼輸入數字
let telephone = document.querySelector('#telephone');
telephone.addEventListener('keydown',function(e){
    if(!((e.which >=48 && e.which <= 57) || (e.which == 8) || (e.which == 9))){
        e.preventDefault();
    }
})