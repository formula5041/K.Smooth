let mapArea = document.querySelectorAll('area');
let taiwanMap = document.querySelector('#taiwanMap');
for(let i = 0 ; i < mapArea.length ; i++){
    mapArea[i].addEventListener('click',function(){
        if(mapArea[i].getAttribute('coords')== "191,3,294,100"){
            taiwanMap.src = './img/photos/about/src/tw_taipei.svg';            
        } else if(mapArea[i].getAttribute('coords')== "66,145,210,207"){
            taiwanMap.src = './img/photos/about/src/tw_taichung.svg';
        } else if(mapArea[i].getAttribute('coords')== "1,308,104,357"){
            taiwanMap.src = './img/photos/about/src/tw_tainan.svg';
        } else if(mapArea[i].getAttribute('coords')== "125,314,238,521"){
            taiwanMap.src = './img/photos/about/src/tw_taitung.svg';
        }
    })
}

for(let i = 0 ; i < mapArea.length ; i++){
    mapArea[i].addEventListener('click',function(){
        let infoText = document.querySelectorAll('.infoText');
        if(mapArea[i].getAttribute('coords') == "191,3,294,100"){
            infoText[0].style.display = 'block';
            infoText[1].style.display = 'none';
            infoText[2].style.display = 'none';
            infoText[3].style.display = 'none';
        } else if(mapArea[i].getAttribute('coords')== "66,145,210,207"){
            infoText[0].style.display = 'none';
            infoText[1].style.display = 'block';
            infoText[2].style.display = 'none';
            infoText[3].style.display = 'none';
        } else if(mapArea[i].getAttribute('coords')== "1,308,104,357"){
            infoText[0].style.display = 'none';
            infoText[1].style.display = 'none';
            infoText[2].style.display = 'block';
            infoText[3].style.display = 'none';
        } else if(mapArea[i].getAttribute('coords')== "125,314,238,521"){
            infoText[0].style.display = 'none';
            infoText[1].style.display = 'none';
            infoText[2].style.display = 'none';
            infoText[3].style.display = 'block';
        }
    })

}

let imgSide = document.querySelectorAll('.imgSide');
let btnA = document.querySelectorAll('.btnA');
let clickArea = document.querySelectorAll('.click');
for(let i = 0 ; i < btnA.length ; i++){
    btnA[i].addEventListener('click',function(){
        let aTag = this.closest('.click');
        let aTags = aTag.querySelectorAll('.btnA');
        aTags.forEach(function(item){
            item.style.backgroundColor='#00000090';
        })
        this.style.backgroundColor = '#116975';
    })
}

for(let i = 0 ; i < btnA.length ; i++){
    btnA[i].addEventListener('click',function(){
        let findClick= this.closest('.click');
        let findImgContainer = findClick.previousElementSibling;
        let findImg = findImgContainer.querySelectorAll('img');
        if(this.classList.contains('-01')){
            findImg.forEach(function(item){
                item.style.left = '0';
            })
        } else if(this.classList.contains('-02')){
            findImg.forEach(function(item){
                item.style.left = '-100%';
            })
        } else if(this.classList.contains('-03')){
            findImg.forEach(function(item){
                item.style.left = '-200%';
            })
        }
    })
}