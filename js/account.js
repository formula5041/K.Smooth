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
                <button type="button" class="plus"></button> 
                <span class="sumq">${userProducts[i].quantity}</span>
                <button type="button" class="minus"></button>
            </td>
            <td>$<span class="singlePrice">${userProducts[i].price}</span></td>
            <td>$<span class="sumC">${userProducts[i].quantity * userProducts[i].price}</span></td>
            <td><img src="./img/trash.png" alt="trash" class="trash bin"></td>
        </tr>
        `
        );
    }

    // Total加總
    let sumC = document.querySelectorAll('.sumC')
    let result = 0
    for(let i = 0 ; i < sumC.length ; i++){
        result += parseInt(sumC[i].innerHTML);
    }
    document.querySelector('#totalPrice').innerHTML = result;


    // myCart delete function
    document.addEventListener('click', function(e){
        if(e.target.classList.contains('bin')){
            if(confirm('Are you sure you want to remove THIS ITEMS?')){
                // 頁面刪除
                e.target.closest('tr.itemsList').remove('li');

                // localStorage刪除
                // 會員now
                let allProduct =userloggings.products.map(function(value){
                    return value.name
                })
                let nowProduct = e.target.closest('tr').querySelector('.productName').innerHTML;
                let deleteNumber = allProduct.indexOf(nowProduct);
                userloggings.products.splice(deleteNumber,1)
                localStorage.setItem('userlogging', JSON.stringify(userloggings));

                // 會員資料庫
                let findEmail =signInfo.map(function(value){
                    return value.email
                })
                let arrayEmail = findEmail.indexOf(userloggings.email) //判斷userloggings 在 signInfo中的哪一個 
                signInfo[arrayEmail].products.splice(deleteNumber,1)
                localStorage.setItem('signInfo', JSON.stringify(signInfo));

                // 加總
                let allSum = document.querySelectorAll('.sumC');
                let empty = 0;
                allSum.forEach(element => {
                    empty += parseInt(element.innerHTML);
                });
                document.querySelector('#totalPrice').innerHTML = empty;
            }
        } else if(e.target.classList.contains('aBin')){
            if(e.target.closest('tbody').querySelector('.itemsList')){
                if(confirm('Are you sure you want to remove ALL ITEMS?')){
                    let itemsList = document.querySelectorAll('.itemsList');
                    itemsList.forEach(element => {
                        element.remove('li');
                    });
                    // 加總
                    let allSum = document.querySelectorAll('.sumC');
                    let empty = 0;
                    allSum.forEach(element => {
                        empty += parseInt(element.innerHTML);
                    });
                    document.querySelector('#totalPrice').innerHTML = empty;
                    // 刪除全部購物車資料
                    // localStorage刪除
                    // 會員now
                    userloggings.products = [];
                    localStorage.setItem('userlogging', JSON.stringify(userloggings));
                    // 會員資料庫
                    let findEmail =signInfo.map(function(value){
                        return value.email;
                    })
                    let arrayEmail = findEmail.indexOf(userloggings.email); //判斷userloggings 在 signInfo中的哪一個 
                    signInfo[arrayEmail].products = [];
                    localStorage.setItem('signInfo', JSON.stringify(signInfo));
                }
            } else {
                e.preventDefault();
            }
        }
    })

    // 加減
    document.addEventListener('click',function(e){
        if(e.target.classList.contains('plus')){
            let sumqNode = e.target.nextElementSibling.innerHTML;
            e.target.nextElementSibling.innerHTML = parseInt(sumqNode)+1;
            let sumq = e.target.nextElementSibling.innerHTML;

            let priceNode = e.target.closest('tr').querySelector("tr.itemsList > td:nth-child(4) > span");
            let price = parseInt(priceNode.innerHTML);

            let sumNode = e.target.closest('tr').querySelector("tr.itemsList > td:nth-child(5) > span");
            sumNode.innerHTML = sumq*price;

            // 加總
            let allSum = document.querySelectorAll('.sumC');
            let empty = 0;
            allSum.forEach(element => {
                empty += parseInt(element.innerHTML);
            });
            document.querySelector('#totalPrice').innerHTML = empty;

            // 資料更新
            // 會員now
            let sumqValue = e.target.closest('tr.itemsList').querySelector('.sumq').innerHTML;
            let thisProduct = e.target.closest('tr.itemsList').querySelector('.productName').innerHTML;

            let nameResult = userloggings.products.map(function(value){
                return value.name
            })
            let productArray = nameResult.indexOf(thisProduct) //是product中的判斷第幾個
            userloggings.products[productArray].quantity = sumqValue;        
            localStorage.setItem('userlogging', JSON.stringify(userloggings));

            // 會員資料庫
            let findEmail =signInfo.map(function(value){
                return value.email;
            })
            let arrayEmail = findEmail.indexOf(userloggings.email); //判斷userloggings 在 signInfo中的哪一個 
            signInfo[arrayEmail].products[productArray].quantity = sumqValue;
            localStorage.setItem('signInfo', JSON.stringify(signInfo));

        } else if(e.target.classList.contains('minus')){
            let sumqs = e.target.previousElementSibling.innerHTML;
            if(sumqs > 1){
                e.target.previousElementSibling.innerHTML = parseInt(sumqs)-1;
                let sumq = e.target.previousElementSibling.innerHTML;

                let priceNode = e.target.closest('tr').querySelector("tr.itemsList > td:nth-child(4) > span");
                let price = parseInt(priceNode.innerHTML);

                let sumNode = e.target.closest('tr').querySelector("tr.itemsList > td:nth-child(5) > span");
                sumNode.innerHTML = sumq*price;

                // 加總
                let allSum = document.querySelectorAll('.sumC');
                let empty = 0;
                allSum.forEach(element => {
                    empty += parseInt(element.innerHTML);
                });
                document.querySelector('#totalPrice').innerHTML = empty;

                // 資料更新
                // 會員now
                let sumqValue = e.target.closest('tr.itemsList').querySelector('.sumq').innerHTML;
                let thisProduct = e.target.closest('tr.itemsList').querySelector('.productName').innerHTML;

                let nameResult = userloggings.products.map(function(value){
                    return value.name
                })
                let productArray = nameResult.indexOf(thisProduct) //是product中的判斷第幾個
                userloggings.products[productArray].quantity = sumqValue;        
                localStorage.setItem('userlogging', JSON.stringify(userloggings));

                // 會員資料庫
                let findEmail =signInfo.map(function(value){
                    return value.email;
                })
                let arrayEmail = findEmail.indexOf(userloggings.email); //判斷userloggings 在 signInfo中的哪一個 
                signInfo[arrayEmail].products[productArray].quantity = sumqValue;
                localStorage.setItem('signInfo', JSON.stringify(signInfo));
            }
        }
    })
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
                <button type="button" class="plus"></button> 
                <span class="sumq"></span>
                <button type="button" class="minus"></button>
            </td>
            <td>$<span class="singlePrice">0</span></td>
            <td>$<span class="sum">0</span></td>
            <td><img src="./img/trash.png" alt="trash" class="trash bin"></td>
        </tr>
        `
        );
    }
    // 創建table架構，並判斷localStorage中有多少array，建立相對應的數量
    let productItem = JSON.parse(localStorage.getItem('productItem'));
    if(productItem){
        for(let i = 0 ; i < productItem.length; i++){
            createRow()
        }
    }
   
    
    // 將localStorage中的資料傳入table中
    passing();
    function passing(){
        for(let i = 0; i < productItem.length ; i++ ){
            document.querySelectorAll('.itemsList')[i].setAttribute('data-id', i);
            document.querySelectorAll('.productsImg')[i].src=productItem[i].img;
            document.querySelectorAll('.productName')[i].innerHTML = productItem[i].name;
            document.querySelectorAll('.sumq')[i].innerHTML = productItem[i].quantity;
            document.querySelectorAll('.singlePrice')[i].innerHTML = productItem[i].price;
            document.querySelectorAll('.sum')[i].innerHTML = productItem[i].quantity*productItem[i].price;
        }
        let sum =document.querySelectorAll('.sum');
        let sumBox = 0;
        for(let i = 0 ; i < sum.length ; i++){
            sumBox = sumBox + parseInt(sum[i].textContent);
        }
        document.querySelector('#totalPrice').textContent = sumBox;
    }
    
    
    cartDeleteFun();
    // myCart delete function
    function cartDeleteFun(){
        document.addEventListener('click', function(e){
            if(e.target.classList.contains('bin')){
                if(confirm('Are you sure you want to remove THIS ITEMS?')){
                    e.target.closest('tr.itemsList').remove('li');
                    let trNode = e.target.closest('tr.itemsList').getAttribute('data-id');
                    productItem.splice([trNode], 1);
                    localStorage.setItem('productItem', JSON.stringify(productItem));
                    // 重新定義itemsList中的 data-id
                    let trNodeAttribute = document.querySelectorAll('.itemsList');
                    for(let i = 0 ; i<trNodeAttribute.length; i++){
                        trNodeAttribute[i].setAttribute('data-id',i);
                    }
                    // 加總
                    let allSum = document.querySelectorAll('.sum');
                    let empty = 0;
                    allSum.forEach(element => {
                        empty += parseInt(element.innerHTML);
                    });
                    document.querySelector('#totalPrice').innerHTML = empty;
                }
            } else if(e.target.classList.contains('aBin')){
                if(e.target.closest('tbody').querySelector('.itemsList')){
                    if(confirm('Are you sure you want to remove ALL ITEMS?')){
                        let itemsList = document.querySelectorAll('.itemsList');
                        itemsList.forEach(element => {
                            element.remove('li');
                        });
                        // 加總
                        let allSum = document.querySelectorAll('.sum');
                        let empty = 0;
                        allSum.forEach(element => {
                            empty += parseInt(element.innerHTML);
                        });
                        document.querySelector('#totalPrice').innerHTML = empty;
                        // 刪除全部購物車資料
                        productItem = [];
                        localStorage.setItem('productItem', JSON.stringify(productItem));
                    }
                } else{
                    e.preventDefault;
                }
            }
        })
    }
    
    // 加減
    document.addEventListener('click',function(e){
        if(e.target.classList.contains('plus')){
            let sumqNode = e.target.nextElementSibling.innerHTML;
            e.target.nextElementSibling.innerHTML = parseInt(sumqNode)+1;
            let sumq = e.target.nextElementSibling.innerHTML;
    
            let priceNode = e.target.closest('tr').querySelector("tr.itemsList > td:nth-child(4) > span");
            let price = parseInt(priceNode.innerHTML);
    
            let sumNode = e.target.closest('tr').querySelector("tr.itemsList > td:nth-child(5) > span");
            sumNode.innerHTML = sumq*price;
    
            // 加總
            let allSum = document.querySelectorAll('.sum');
            let empty = 0;
            allSum.forEach(element => {
                empty += parseInt(element.innerHTML);
            });
            document.querySelector('#totalPrice').innerHTML = empty;
    
            // 資料更新
            let trNode = e.target.closest('tr.itemsList').getAttribute('data-id');
            productItem[trNode].quantity = sumq;
            localStorage.setItem('productItem', JSON.stringify(productItem));
    
        } else if(e.target.classList.contains('minus')){
            let sumqs = e.target.previousElementSibling.innerHTML;
            if(sumqs > 1){
                e.target.previousElementSibling.innerHTML = parseInt(sumqs)-1;
                let sumq = e.target.previousElementSibling.innerHTML;
    
                let priceNode = e.target.closest('tr').querySelector("tr.itemsList > td:nth-child(4) > span");
                let price = parseInt(priceNode.innerHTML);
    
                let sumNode = e.target.closest('tr').querySelector("tr.itemsList > td:nth-child(5) > span");
                sumNode.innerHTML = sumq*price;
                
                // 加總
                let allSum = document.querySelectorAll('.sum');
                let empty = 0;
                allSum.forEach(element => {
                    empty += parseInt(element.innerHTML);
                });
                document.querySelector('#totalPrice').innerHTML = empty;
    
                // 資料更新
                let trNode = e.target.closest('tr.itemsList').getAttribute('data-id');
                productItem[trNode].quantity = sumq;
                localStorage.setItem('productItem', JSON.stringify(productItem));
            }
        }
    })
}
// ===============================================================================
// 判斷，是否為會員登入狀態
if(userloggings){
    memberFun();
} else{
    guestFun();
}
//================================================================================
// 換分頁function().....
document.addEventListener('click',function(e){
    if(e.target.id ==('cartBtn')){
        showCart();
    }else if(e.target.id ==('shipmentBtn')){
        if(userloggings){
            showShipment();
        } else{
            e.preventDefault;
        }
    }else if(e.target.id ==('historyBtn')){
        if(userloggings){
            showHistory();
        } else{
            e.preventDefault;
        }
    }
})

// 抓btn
let cartBtn = document.getElementById("cartBtn");
let shipmentBtn = document.getElementById("shipmentBtn");
let historyBtn = document.getElementById("historyBtn");
// 抓要換的頁面
let cart = document.getElementById("cart");
let shipment = document.getElementById("shipment");
let history = document.getElementById("history");


function showCart(){
    cart.style.display="inline-table";
    shipment.style.display="none";
    history.style.display="none";
    // Btn Color
    cartBtn.style.backgroundColor="black";
    cartBtn.style.color="white";
    shipmentBtn.style.backgroundColor="white";
    shipmentBtn.style.color="black";
    historyBtn.style.backgroundColor="white";
    historyBtn.style.color="black";
}
function showShipment(){
    shipment.style.display="inline-table";
    cart.style.display="none";
    history.style.display="none";
    // Btn Color
    cartBtn.style.backgroundColor="white";
    cartBtn.style.color="black";
    shipmentBtn.style.backgroundColor="black";
    shipmentBtn.style.color="white";
    historyBtn.style.backgroundColor="white";
    historyBtn.style.color="black";
}
function showHistory(){
    history.style.display="inline-table";
    cart.style.display="none";
    shipment.style.display="none";
    // Btn Color
    cartBtn.style.backgroundColor="white";
    cartBtn.style.color="black";
    shipmentBtn.style.backgroundColor="white";
    shipmentBtn.style.color="black";
    historyBtn.style.backgroundColor="black";
    historyBtn.style.color="white";
}
//================================================================================

// MEMBER
// ===================================================================================
// 大頭照上傳
document.addEventListener('change',function(e){
    if(e.target.id == 'upload'){
        // 更新頁面
        let file = e.target.files[0];
        let avatarImg = document.getElementById("avatarImg");
        avatarImg.src = `./img/avatar/${file.name}`; 

        // 更新localStorage資料
        userlogging.avatar = `./img/avatar/${file.name}`;
        
        //(1).更新userlogging中的照片資料(登入中會員資料庫)
        localStorage.setItem('userlogging', JSON.stringify(userlogging));

        //(2).更新signInfo中的照片資料(全部會員資料庫)
        //2-1 先找signInfo中的全部email (用map())
        //2-2 找到userlogging中的email
        //2-3 利用2-2 email 比對 2-1 email
        //2-4 獲取其索引值 利用2-2 email 資料，置換 signInfo資料庫中的第[X]之email
        let resultEmail = signInfo.map(function(value){
            return value.email;
        })
        let signIfonIndex = resultEmail.indexOf(userlogging.email);
        
        signInfo[signIfonIndex].avatar = userlogging.avatar;
        localStorage.setItem('signInfo', JSON.stringify(signInfo));
    }
});
// ===================================================================================
// 有登入者頁面渲染
let personalImg = document.querySelector('.personalImg');
let personalImgChild = document.querySelector('.imgBanner');

if(userloggings){
    personalImgChild.remove();
    personalImg.insertAdjacentHTML('afterend',`
    <div class="personalImg">
                    <div class="headshot">
                        <div class="imgArea">
                            <img src="${userloggings.avatar}" alt="haedshot" id="avatarImg">
                        </div>
                        <label for="upload">Change Avatar</label>
                        <input type="file" accept="image/*" id="upload" />
                    </div>
                    <div class="info">
                        <div>
                            <img src="./img/account/id.svg" alt="id">
                            <p id="userName" class="memberDetail">${userloggings.fullname}</p>
                        </div>
                        <div>
                            <img src="./img/account/email.svg" alt="id">
                            <p id="userEmail" class="memberDetail">${userloggings.email}</p>
                        </div>
                        <div>
                            <img src="./img/account/padlock.svg" alt="id">
                            <p id="userPassword" class="memberDetail">${userloggings.password}</p>    
                        </div>
                        <div>
                            <img src="./img/account/telphone.svg" alt="id">
                            <p id="userTel" class="memberDetail">${userloggings.telephone}</p>
                            <input type="text" class="editInput" maxlength="10">
                            <button type="button" class="editButton -phone">edit</button>
                        </div>        
                        <div>
                            <img src="./img/account/mailbox.svg" alt="id">
                            <p id="userAddress" class="memberDetail">${userloggings.address}</p>
                            <input type="text" class="editInput">
                            <button type="button" class="editButton -address">edit</button>
                        </div>     
                    </div>
                </div>
    `)
}
// ===================================================================================
// edit功能
document.addEventListener('click',function(e){
    if(e.target.classList.contains('editButton')){
        let inputTag = e.target.previousElementSibling;
        let pTag = inputTag.previousElementSibling;

        if(!inputTag.classList.contains('-on')){
            inputTag.value=pTag.innerHTML;
            inputTag.classList.add('-on')
            pTag.classList.add('-off')
            // RWD
            let pWidth = document.body.clientWidth;
            if (pWidth < 750 && pWidth > 560){ 
                inputTag.style.fontSize='10px';
                inputTag.style.fontWeight='normal';
            }  else if (pWidth < 559 && pWidth > 440){
                inputTag.style.fontSize='10px';
                inputTag.style.fontWeight='normal';
                inputTag.style.width='120px';
            } else if (pWidth < 439){
                inputTag.style.fontSize='10px';
                inputTag.style.fontWeight='normal';
                inputTag.style.width='100px';
            }
        } else{
            if(inputTag.value==''){
                alert('error input!')
            } else{
                pTag.innerHTML=inputTag.value;
                inputTag.classList.remove('-on')
                pTag.classList.remove('-off')

                
                // 修改資料(用email判斷第幾個)
                let resultEmail = signInfo.map(function(value){
                    return value.email;
                })
                let signIfonIndex = resultEmail.indexOf(userlogging.email);
                

                if(e.target.classList.contains('-phone')){
                    signInfo[signIfonIndex].telephone = inputTag.value;
                    localStorage.setItem('signInfo', JSON.stringify(signInfo));

                    //修改userlogging的資料
                    userloggings.telephone = inputTag.value;
                    localStorage.setItem('userlogging', JSON.stringify(userloggings));
                } else if(e.target.classList.contains('-address')){
                    signInfo[signIfonIndex].address = inputTag.value;
                    localStorage.setItem('signInfo', JSON.stringify(signInfo));

                    //修改userlogging的資料
                    userloggings.address = inputTag.value;
                    localStorage.setItem('userlogging', JSON.stringify(userloggings));
                }
            }
        }
    }
})
// ===================================================================================
// 判斷若無商品，無法點擊名為 id='checkOut'的button
document.addEventListener('click',function(e){
    if(e.target.id=='checkOut'){
        if(e.target.closest('tbody').querySelector('.itemsList')){

        } else{
            e.preventDefault();
        }        
    }
})
// ===================================================================================
// history
if(userloggings){
    let findEmail =signInfo.map(function(value){
        return value.email;
    })
    let arrayEmail = findEmail.indexOf(userloggings.email); //判斷userloggings 在 signInfo中的哪一個 
    let userHistory = signInfo[arrayEmail].history;
    //把user的購買歷史紀錄渲染到頁面中
    for(let i =0 ; i< userHistory.length; i++){
        history.insertAdjacentHTML('afterbegin', 
        `
            ${userHistory[i]}
        `);
    }
}