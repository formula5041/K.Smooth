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

// 動態resultShipping的值
let shippings = JSON.parse(localStorage.getItem('shippings'));
document.querySelector('#resultShipping').innerHTML = shippings[0].fee;
// 以下的shippingfree是為了傳遞到本code最後面的加總
let shippingfee = parseInt(document.querySelector('#resultShipping').innerHTML);


// 判斷cardNumber, securityCode 為數字
let cardNumber = document.getElementById("cardNumber");
let userNumber = document.getElementById('userNumber');
let securityCode = document.getElementById('securityCode');

cardNumber.addEventListener('keydown',function(e){
    if((e.which >=48 && e.which <= 57) || (e.which == 8)){        
    } else{
        e.preventDefault();
    }
})
cardNumber.addEventListener('keyup',function(e){
    if((e.which >=48 && e.which <= 57) || (e.which == 8)){
        document.getElementById('userNumber').value = cardNumber.value;        
    } else{
        e.preventDefault();
    }
})

securityCode.addEventListener('keydown',function(e){
    if((e.which >=48 && e.which <= 57) || (e.which == 8)){        
    } else{
        e.preventDefault();
    }
})

// 按下pay後的事情
document.addEventListener('click',function(e){
    if(e.target.id == 'pay'){
        let visa = document.querySelector('#visa');
        let master = document.querySelector('#master');
        let cardNumber = document.querySelector('#cardNumber');
        let expiryDate = document.querySelector('#expiryDate');
        let securityCode = document.querySelector('#securityCode');
        let checkboxAccept = document.querySelector('#checkboxAccept');
        if(visa.checked || master.checked){
            if(cardNumber.value !==''){
                if(expiryDate !==''){
                    if(securityCode !==''){
                        if(checkboxAccept.checked){
                            // button(submit)預設行為
                            e.preventDefault();
                            // 設定1成機率失敗 demo用 (網路不穩)
                            let randomN = Math.floor(Math.random()*10)+1;
                            if(randomN>1){
                                alertFun('Payment Completed','Thank you!','./img/payment_icon/success.png');

                                // 判斷user有無登入 更新不同資料
                                if(userloggings){
                                    let findEmail =signInfo.map(function(value){
                                        return value.email;
                                    })
                                    let arrayEmail = findEmail.indexOf(userloggings.email); //判斷userloggings 在 signInfo中的哪一個
                                    //儲存到user的history
                                    let userHistory = signInfo[arrayEmail].history;
                                    let cart = document.querySelector('#cart').innerHTML;
                                    userHistory.unshift(cart);
                                    // 刪除全部購物車資料
                                    // 會員now
                                    userloggings.products = [];
                                    localStorage.setItem('userlogging', JSON.stringify(userloggings));
                                    // 會員資料庫
                                    signInfo[arrayEmail].products = [];
                                    localStorage.setItem('signInfo', JSON.stringify(signInfo));
                                } else{
                                    productItem = [];
                                    localStorage.setItem('productItem', JSON.stringify(productItem));
                                }
                                setTimeout(()=>{
                                    window.location.replace('./index.html');
                                },3000)
                            } else{
                                alertFun('Your Payment Failed','Please try again!','./img/payment_icon/success_no.png');
                            }
                        }
                    }
                }
            }
        }
    }
})

// 付款成功or失敗的彈跳視窗
function alertFun(letter1, letter2, img){
    // 創建div,p, button元素
    let bg = document.createElement('div');
    let newWindow = document.createElement('div');
    let pic = document.createElement('img');
    let p_1 = document.createElement('h2');
    let p_2 = document.createElement('p');
    let btnClose = document.createElement('button');
    // 創建p中的文字內容
    let p_1Letters = document.createTextNode(letter1);
    let p_2Letters = document.createTextNode(letter2);
    // p中加入文字內容_樣式
    p_1.appendChild(p_1Letters);
    p_1.style.color='#000000';
    p_2.appendChild(p_2Letters);
    p_2.style.color='#000000';
    // img(pic)中加入圖片與修改樣式
    pic.setAttribute('src', img);
    pic.style.width='10vw';
    pic.style.height='10vw';
    pic.style.alignSelf='center';
    pic.style.marginTop='2%'; 
    
    bg.setAttribute('id', 'bg');
    bg.style.width='100%';
    bg.style.height='100%';
    bg.style.position='absolute';
    bg.style.top='0';
    bg.style.left='0';
    bg.style.backgroundColor='#00000050';

    // button給予id屬性，並加上名稱
    btnClose.setAttribute('id','wC');

    // button修改樣式
    btnClose.style.position='absolute';
    btnClose.style.top='3%';
    btnClose.style.right='2%';
    btnClose.style.backgroundColor='#ffffff00';
    btnClose.style.backgroundImage='url(./img/payment_icon/closebtn.svg)';
    btnClose.style.backgroundSize='contain';
    btnClose.style.backgroundRepeat='no-repeat';
    if(document.body.clientWidth < 420){
        btnClose.style.width='20px';
        btnClose.style.height='20px';
    } else{
        btnClose.style.width='30px';
        btnClose.style.height='30px';
    }
    btnClose.style.border='none';
    btnClose.style.cursor='pointer';

    // newWindow中加入p,pic,btn
    newWindow.appendChild(pic);
    newWindow.appendChild(p_1);
    newWindow.appendChild(p_2);
    newWindow.appendChild(btnClose);

    // div給予class屬性，並加上名稱
    newWindow.setAttribute('class','newWindow');
    newWindow.setAttribute('id','newWindows');

    // 增加div的各種style
    
    if(document.body.clientWidth < 420){
        newWindow.style.width='100%';
        newWindow.style.top='20%';
    } else{
        newWindow.style.width='65%';
        newWindow.style.top='10%';
    }
    newWindow.style.position='absolute';
    newWindow.style.left='50%';
    newWindow.style.transform='translateX(-50%)';
    newWindow.style.border='3px solid #00000090';
    newWindow.style.borderRadius='20px';
    newWindow.style.backgroundColor='#f5f5f5';
    newWindow.style.textAlign='center';
    newWindow.style.display='flex';
    newWindow.style.flexDirection='column';
    newWindow.style.justifyContent='center';
    newWindow.style.zIndex='2';
    // 加上淡黑背景
    document.querySelector('.container').appendChild(bg);
    // 抓到指定id位置，並在此位置的最後方加上剛剛創的div
    document.getElementById('formPayment').appendChild(newWindow);
    // 按下Pay後，頁面移動到最上端
    window.scrollTo({ top: 200, left: 0, behavior: 'smooth' });

    // 關閉功能呼叫
    document.addEventListener('click',function(e){
        if(e.target.id == 'wC'){
            e.preventDefault(); 
            var container = document.querySelector('.container');
            var dbg = document.getElementById('bg');
            let windowNone = document.getElementById('newWindows');
            let formParent = document.getElementById('formPayment');
            // 判斷是成功付款，還是失敗付款
            let h2Node = e.target.previousElementSibling.innerHTML;
            if(h2Node == 'Thank you!'){
                formParent.removeChild(windowNone);
                container.removeChild(dbg);
                window.location.replace('./index.html');
            } else if(h2Node !== 'Thank you!'){
                formParent.removeChild(windowNone);
                container.removeChild(dbg);
            }   
        }
    })
}

// 金額加總
let sum = document.querySelectorAll('.sum');
let a = 0;
for(let i = 0 ; i <sum.length ; i++){
    a = a + parseInt(sum[i].innerHTML);
    document.querySelector('#lastResultTotal').innerHTML = a + shippingfee;
}