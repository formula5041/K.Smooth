// 點hamburger跑出sideBar
document.querySelector("#hamOver").addEventListener('click',clickHam);
function clickHam(e){
    e.preventDefault();
    e.stopPropagation();
    var navContent = document.querySelector("#nav_contents");
    var hamburger = document.querySelector("#hamOver");
    var animationState = navContent.style.animationName;
    if (animationState == ""){
        hamburger.style.transition="all 2s"; 
        hamburger.style.backgroundImage = "url(./img/cancel.png)"
        navContent.style.animationName = "sideMoveLeft";
    } else if(animationState == "sideMoveLeft"){
        hamburger.style.transition="all .5s";
        hamburger.style.backgroundImage = "url(./img/hamburger.png)"
        navContent.style.animationName = "sideMoveRight";
    } else if (animationState == "sideMoveRight"){
        hamburger.style.transition="all 2s";
        hamburger.style.backgroundImage = "url(./img/cancel.png)"
        navContent.style.animationName = "sideMoveLeft";        
    }
}

// 停止 navContent 區域冒泡
let navContent = document.querySelector("#nav_contents");
navContent.addEventListener('click',function(e){
    e.stopPropagation();
})

// 滾動到頁面 300 以上 sidebar縮起來
document.addEventListener('scroll',listenScroll);
function listenScroll(){
    var yAxis = window.scrollY;
    var navContent = document.querySelector("#nav_contents");
    var animationState = navContent.style.animationName;
    var hamburger = document.querySelector("#hamOver");
    if (animationState =='sideMoveLeft' && yAxis > 300){
        hamburger.style.transition="all .5s";
        hamburger.style.backgroundImage = "url(./img/hamburger.png)"
        navContent.style.animationName = "sideMoveRight";
    }
}

// 按container區域，sidebar縮起來
let container = document.querySelector('.container');
container.addEventListener('click',function(){
    var navContent = document.querySelector("#nav_contents");
    var hamburger = document.querySelector("#hamOver");
    if(navContent.style.animationName == 'sideMoveLeft'){
        hamburger.style.transition="all .5s";
        hamburger.style.backgroundImage = "url(./img/hamburger.png)"
        navContent.style.animationName = "sideMoveRight";
    }
})

// 讓漢堡變大變小
// mouseover
var hamburgerIcon = document.querySelector("#hamOver");
hamburgerIcon.addEventListener('mouseover',overHam);

function overHam(){
    hamburgerIcon.style.height= "31px"; //高度變高
    hamburgerIcon.style.width= "31px"; //寬度變寬
    hamburgerIcon.style.opacity= "1"; //透明度調高
}
// mouseleave
hamburgerIcon.addEventListener('mouseleave',leaveHam);

function leaveHam(){
    hamburgerIcon.style.height= "30px"; //高度變低
    hamburgerIcon.style.width= "30px"; //寬度變窄
    hamburgerIcon.style.opacity= ".7"; //透明度調低
}