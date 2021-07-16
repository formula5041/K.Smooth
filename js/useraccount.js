let userlogging = JSON.parse(localStorage.getItem('userlogging'));
let productItems = JSON.parse(localStorage.getItem('productItem'));
// 畫面刷新時，登入者投像置換與tags標籤建立
let logo = document.querySelector('.logo');
let loginIcon = document.querySelector('.loginIcon');
if(userlogging){
    loginIcon.insertAdjacentHTML('afterbegin',
    `
    <div class="memberIcon">
          <img class="iconArea" src="${userlogging.avatar}">
          <span class="outArea">logout</span>
    </div>
    `);
    // 判斷購物車是否有東西存在? 若有顯示數量;若無不顯示
    let logs = document.querySelector('#logs');
    let result = 0;
    userlogging.products.forEach(function(items){
        result += parseInt(items.quantity);
    })
    logs.insertAdjacentHTML('afterend',
    `
        <span id="pCount">${result}</span>
    `)
    console.log('exisits')
} else{
    console.log('No exisits')
    let logs = document.querySelector('#logs');
    let result = 0;
    productItems.forEach(function(items){
        result += parseInt(items.quantity);
    })
    logs.insertAdjacentHTML('afterend',
    `
        <span id="pCount">${result}</span>
    `)
}


// 登出
document.addEventListener('click',function(e){
    if(e.target.classList.contains('outArea')){
        if(confirm('Are you sure to log out?')){
            localStorage.removeItem('userlogging');
            location.reload();
        }
    }
})

// 點大頭照，進入會員account頁面
document.addEventListener('click',function(e){
    if(e.target.classList.contains('iconArea')){
        window.location.replace('./account.html')
    }
})


