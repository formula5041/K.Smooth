// let headshot turn over
var kHead =document.querySelectorAll('.kHead');
for(let i=0 ; i < kHead.length ; i++){
    kHead[i].addEventListener('click', function(){
        if(this.style.animationName == ''){
           for(let j = 0 ; j < kHead.length; j++){
               kHead[j].style.animationName = '';
           }
            this.style.animationName = 'kSwing';
        } else if(this.style.animationName == 'kSwing'){
            this.style.animationName = '';
        }
    });
}

// 傳入資料
let infoContainers = JSON.parse(localStorage.getItem('infoContainers'));
let postPoint = document.querySelector('#postPoint');
if(infoContainers){
    for(let i = 0 ; i < infoContainers.length ; i++){
        postPoint.insertAdjacentHTML('afterend',
        `
        <div class="bookContainer">
            <div class="messageArea">
                <div class="headShot">
                    <div class="img" style="background-image: url(${infoContainers[i].kheadSrc});"></div>
                    <span>${infoContainers[i].name}</span>
                </div>
                <div class="messageInfo">
                    <span>${infoContainers[i].time}</span>
                    <p class="topic">${infoContainers[i].topic}</p>
                    <p class="messageDetail">
                        ${infoContainers[i].message}
                    </p>
                </div>
            </div>
        </div>
        `);
    }
}




document.addEventListener('click',(e)=>{
    if(e.target.id == 'submit'){
        // 創一個物件來裝資訊
        let infoContainer = {
            'kheadSrc' : '../img/headshot/brown.png',
            'name' : '',
            'topic' : '',
            'message' : '',
            'time':''
        }
        let kHead = e.target.closest('form').querySelectorAll('img');
        let userName = e.target.closest('form').querySelector('#name').value;
        let userTopic = e.target.closest('form').querySelector('#topic').value;
        let userMessage = e.target.closest('form').querySelector('#message').value;

        if(!userName=="" && !userTopic=='' && !userMessage==''){
            // 抓user輸入的文字
            infoContainer.name = userName;
            infoContainer.topic = userTopic;
            infoContainer.message = userMessage;
            
            // 找user選的袋鼠
            kHead.forEach(element => {
                if(element.style.animationName == 'kSwing'){
                    infoContainer.kheadSrc = element.src;
                }
            });

            // 獲取現在時間
            let now = new Date();
            let year = now.getFullYear();
            let mounth = now.getUTCMonth()+1;
            let date = now.getDate();
            let hour = now.getHours();
            let minutes = now.getMinutes();
            let seconds = now.getSeconds();
            infoContainer.time = year+'/'+mounth+'/'+date+' '+hour+':'+minutes+':'+seconds;

            postPoint.insertAdjacentHTML('afterend',
            `
            <div class="bookContainer">
                <div class="messageArea">
                    <div class="headShot">
                        <div class="img" style="background-image: url(${infoContainer.kheadSrc});"></div>
                        <span>${infoContainer.name}</span>
                    </div>
                    <div class="messageInfo">
                        <span>${year+'/'+mounth+'/'+date+' '+hour+':'+minutes+':'+seconds}</span>
                        <p class="topic">${infoContainer.topic}</p>
                        <p class="messageDetail">
                            ${infoContainer.message}
                        </p>
                    </div>
                </div>
            </div>
            `)
            // 傳入資料
            if(infoContainers){
                infoContainers.push(infoContainer);
            } else {
                infoContainers = [infoContainer];
            }
            localStorage.setItem('infoContainers', JSON.stringify(infoContainers));
        }
    }
})


