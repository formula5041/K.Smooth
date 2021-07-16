document.querySelector('#ttttt').addEventListener('click',bb);

function bb(){
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
}

createRow()
function createRow(){
    let add = document.querySelector('.footer_allRights');

    add.insertAdjacentHTML('afterbegin',
    `
    <p class='tibame'>
    本網站為緯育TibaMe前端設計工程師班第68期學員專題作品，本平台僅供學習、展示之用。<br>
    This website is the 68th period of the students works of the TibaMe front-end design engineer class of Weiyu. This website is for learning only.<br>
    參考資源：WISHBONE ｜ KINDERFEETS  。若有侵權疑慮，您可私訊TibaMe-前端設計工程師 養成班，後續會由專人協助處理。<br>
    Reference: WISHBONE ｜ KINDERFEETS . If you have any quesion about infringement, you can privately inform the TibaMe-front-end design engineer training class.<br>
    電話：02-27120589 ｜ <span id='deleteAll' style='cursor: pointer;'>Tel:+886227120589</span>
    </p>
    `
    );
}