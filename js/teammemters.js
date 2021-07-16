document.addEventListener('click',(e)=>{
    if(e.target.classList.contains('teamInfo')){
        if(!e.target.classList.contains('trunOverBrand')){
            e.target.classList.add('trunOverBrand');
            e.target.querySelectorAll('p')[0].classList.add('trunOverP');
            e.target.querySelectorAll('p')[1].classList.add('trunOverP');
            if(e.target.classList.contains('coupon')){
                e.target.insertAdjacentHTML('beforeend',
                `
                    <p class="sorry" style="transform: scaleX(-1); font-size: 2vw; margin:1px;">Coupon Number Is</p>
                    <p class="try" style="transform: scaleX(-1); font-size: 4vw; margin:1px; color:#bdb000;">SAFE10</p>
                `)
            } else{
                e.target.insertAdjacentHTML('beforeend',
                `
                    <p class="sorry" style="transform: scaleX(-1); font-size: 2vw; margin:1px;">Sorry, please</p>
                    <p class="try" style="transform: scaleX(-1); font-size: 2vw" margin:1px;>try another one!</p>
                `)
            }
        } else{
            e.target.classList.remove('trunOverBrand');
            e.target.querySelectorAll('p')[0].classList.remove('trunOverP');
            e.target.querySelectorAll('p')[1].classList.remove('trunOverP');
            e.target.querySelector('.try').remove();
            e.target.querySelector('.sorry').remove();
        }
    }
})

if(document.body.clientWidth >433){
    let teamMembers = document.querySelector('.teamMembers');
    teamMembers.insertAdjacentHTML('beforeend',
    `
        <span id='couponArea'>
            Turn over the brand to find Coupon↓.
        </span>
        <img src="./img/fliphead.png" alt="fliphead" id="fliphead"">
    `
    );
}
// click 袋鼠顯示coupon資訊 || 若有此標籤再執行以下程式
let fliphead = document.querySelector('#fliphead');
if(fliphead){
    document.addEventListener('click',(e)=>{
        if(e.target.id == 'fliphead'){
            document.querySelector('#couponArea').style.opacity='1';
        } else {
            document.querySelector('#couponArea').style.opacity='0';
        }
    })
}

