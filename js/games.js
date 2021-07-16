document.addEventListener('click',(e)=>{
    if(e.target.id == 'playButton'){
        playAudio();
        e.target.innerHTML=
        `
        <p>Move on the kangaroo and double click "i" to get coupon!</p>
        <div class='checkArea'>
            <button type='button' id='ok'>OK</button>
            <button type='button' id='close'>Cancel</button>
        </div>

        `;

        let countArea = document.querySelector('.countArea');
        let playArea = e.target.closest('div.playArea');
        let ok = document.querySelector('#ok');
        let close = document.querySelector('#close');

        // 關閉
        // 點擊關
        close.addEventListener('click',()=>{
            e.target.innerHTML=
            `
            Play
            `;
            playAudio();
        })
        // 鍵盤關
        document.addEventListener('keydown',(e)=>{
            if(e.keyCode == 76 && close){
                close.click();
                playAudio();
            }
        })
        
        // 確認(進遊戲)
        // 點擊關
        ok.addEventListener('click',()=>{
            playAudio();
            playBM();
            e.target.style.display ='none';
            countArea.style.opacity = '1';
            playArea.insertAdjacentHTML('afterbegin',
            `
            <img src="./img/logo_noLetters_700x400.png" id="kangarooGame">
            <div class="couponGame">Coupon</div>
            <div class="couponGame">Coupon</div>
            <div class="couponGame">Coupon</div>
            <div class="couponGame">Coupon</div>
            `)
            
            // GameArea
            let kangaroo = document.querySelector('#kangarooGame');
            let aBtn = document.querySelector('#a');
            let wBtn = document.querySelector('#w');
            let dBtn = document.querySelector('#d');
            let sBtn = document.querySelector('#s');
            let iBtn = document.querySelector('#i');
            let lBtn = document.querySelector('#l');
            let couponGame = document.querySelectorAll('.couponGame');
            let couponShow = document.querySelectorAll('.couponShow');
            
            function switchFun(dom, left , up , right, down, iOk, lCancel, key, key2, tragetE, sec){
                switch (dom){
                    case left:
                        aBtn.style.backgroundColor = '#242323';
                        let inrervalLeft = setInterval(() => {
                            kangaroo.style.left = kangaroo.offsetLeft-10+'px';
                            if(kangaroo.offsetLeft<0){
                                kangaroo.style.left = 0+'px';
                            }
                        }, sec);
                        document.addEventListener(key,()=>{
                            aBtn.style.backgroundColor = '#E24444';
                            clearInterval(inrervalLeft);
                        })
                        break;
                    case up:
                        wBtn.style.backgroundColor = '#242323';
                        let inrervalUp = setInterval(() => {
                            kangaroo.style.top = kangaroo.offsetTop-10+'px';
                            if(kangaroo.offsetTop<0){
                                kangaroo.style.top = 0+'px';
                            }
                        }, sec);
                        document.addEventListener(key,()=>{
                            wBtn.style.backgroundColor = '#E24444';
                            clearInterval(inrervalUp);
                        })
                        break;
                    case right:
                        dBtn.style.backgroundColor = '#242323';
                        let inrervalRight = setInterval(() => {
                            kangaroo.style.left = kangaroo.offsetLeft+10+'px';
                            if(kangaroo.offsetLeft>340){
                                kangaroo.style.left = 340+'px';
                            }
                        }, sec);
                        document.addEventListener(key,()=>{
                            dBtn.style.backgroundColor = '#E24444';
                            clearInterval(inrervalRight);
                        })
                        break;
                    case down:
                        sBtn.style.backgroundColor = '#242323';
                        let inrervalDown = setInterval(() => {
                            kangaroo.style.top = kangaroo.offsetTop+10+'px';
                            if(kangaroo.offsetTop>295){
                                kangaroo.style.top = 295+'px';
                            }
                        }, sec);
                        document.addEventListener(key,()=>{
                            sBtn.style.backgroundColor = '#E24444';
                            clearInterval(inrervalDown);
                        })
                        break;
                    // check btn
                    case iOk:
                        iBtn.style.backgroundColor = '#242323';
                        document.addEventListener(key2,()=>{
                            iBtn.style.backgroundColor = '#E24444';
                        })
                        playGetC()
                        getCouponFun(key2, tragetE)
                        break;
                    case lCancel:
                        lBtn.style.backgroundColor = '#242323';
                        document.addEventListener(key2,()=>{
                            lBtn.style.backgroundColor = '#E24444';
                        })
                        getCouponFun(key2,tragetE)
                        break;
                }
            }

            function getCouponFun(key, traget){
                // 1
                if(kangaroo.offsetLeft>180 && kangaroo.offsetLeft<360){
                    if(kangaroo.offsetTop>-1 && kangaroo.offsetTop<40){
                        document.addEventListener(key,(e)=>{
                            if(traget){
                                couponGame[3].style.animationName='getCoupon';
                                couponGame[3].style.animationIterationCount= '1';
                                couponGame[3].style.animationFillMode='forwards' ;
                                couponShow[0].innerHTML='1：EMPTY >A<';
                            }
                        })
                    }
                }
                // 2
                if(kangaroo.offsetLeft>101 && kangaroo.offsetLeft<289){
                    if(kangaroo.offsetTop>41 && kangaroo.offsetTop<129){
                        document.addEventListener(key,(e)=>{
                            if(traget){
                                couponGame[0].style.animationName='getCoupon';
                                couponGame[0].style.animationIterationCount= '1';
                                couponGame[0].style.animationFillMode='forwards' ;
                                couponShow[1].innerHTML='2：EMPTY >A<';
                            }
                        })
                    }
                }
                // 3
                if(kangaroo.offsetLeft>10 && kangaroo.offsetLeft<160){
                    if(kangaroo.offsetTop>150 && kangaroo.offsetTop<250){
                        document.addEventListener(key,(e)=>{
                            if(traget){
                                couponGame[1].style.animationName='getCoupon';
                                couponGame[1].style.animationIterationCount= '1';
                                couponGame[1].style.animationFillMode='forwards';
                                couponShow[2].innerHTML='3：EMPTY >A<';
                            }
                        })
                    }
                }
                // 4
                if(kangaroo.offsetLeft>240 && kangaroo.offsetLeft<450){
                    if(kangaroo.offsetTop>225 && kangaroo.offsetTop<350){
                        document.addEventListener(key,(e)=>{
                            if(traget){
                                couponGame[2].style.animationName='getCoupon';
                                couponGame[2].style.animationIterationCount= '1';
                                couponGame[2].style.animationFillMode='forwards' ;
                                couponShow[3].innerHTML='4：NICE! <span style="color:red;">VIP945</span>';
                                playSuccess();
                                setTimeout(() => {
                                    alert('Congratulation! You got -60$ disscount "VIP945"');
                                    location.reload();
                                }, 1000);
                            }
                        })
                    }
                }
            }
            let pWidth =document.body.clientWidth;
            // 鍵盤觸動
            document.addEventListener('keydown', (e)=>{
                switchFun(e.keyCode, 65, 87, 68, 83, 73, 76, 'keyup','keydown', e.keyCode === 73, 20)
            })
            // 點擊觸動
            if(pWidth>900){
                document.addEventListener('mousedown',function(e){
                    switchFun(e.target, aBtn, wBtn, dBtn, sBtn, iBtn, lBtn, 'mouseup', 'click', iBtn, 20)
                });
            } else if(pWidth<899){
                // 手機觸動
                document.addEventListener('touchstart',function(e){
                    switchFun(e.target, aBtn, wBtn, dBtn, sBtn, iBtn, lBtn, 'touchend', 'click', iBtn, 20)
                });
            }
        })
        // 鍵盤確認(進遊戲)
        document.addEventListener('keydown',(e)=>{
            let kangarooGame = document.querySelector('#kangarooGame');
            if(!kangarooGame){
                if(e.keyCode == 73 || e.keyCode == 13 ){
                    ok.click();
                    playAudio();
                    playBM();
                }
            }
        })
    }
})

document.addEventListener('keydown', (e)=>{
    let playButton = document.querySelector('#playButton');
    if(e.keyCode === 13 && playButton.innerHTML == 'Play'){
        playButton.click();
        playAudio();
    }
})
// soundFun
function playAudio() {
    let audio = document.querySelector(".clickSound");
    audio.play();
}

function playBM() {
    let audio = document.querySelector(".backgroundSound");
    audio.volume=0.3;
    audio.play();
}

function playGetC() {
    let audio = document.querySelector(".getCoupon");
    audio.play();
    setTimeout(() => {
        audio.pulse();
    }, 1000);
}

function playSuccess() {
    let audio = document.querySelector(".successSound");
    audio.play();
    setTimeout(() => {
        audio.pulse();
    }, 1000);
}


let pWidth =document.body.clientWidth;
if(pWidth<899){
    let doubleClick = document.querySelector('#doubleClick');
    doubleClick.innerHTML=' (Click!) ';
}

let playZone = document.querySelector('.playZone');

playZone.addEventListener('contextmenu',(e)=>{
    e.preventDefault();
})