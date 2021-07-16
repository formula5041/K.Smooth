imgWindows('#line1','./img/photos/about/timeline_icon/store1.png');
imgWindows('#line2','./img/photos/about/timeline_icon/store2.png');
imgWindows('#line3','./img/photos/about/timeline_icon/factory1.png');
imgWindows('#line4','./img/photos/about/timeline_icon/store4.png');
imgWindows('#line5','./img/photos/about/timeline_icon/store3.png');
imgWindows('#line6','./img/photos/about/timeline_icon/factory2.png');
function imgWindows(id,store){
    document.querySelector(id).addEventListener('click',showImg);
    function showImg(){
        let bg = document.createElement('div');
        let newWindow = document.createElement('div');
        let pic = document.createElement('img');
        let btnClose = document.createElement('button');
        

        pic.setAttribute('src',store);
        pic.style.width='100%';
        pic.style.alignSelf='center';

        btnClose.setAttribute('id','wC');

        btnClose.style.position='absolute';
        btnClose.style.top='3%';
        btnClose.style.right='2%';
        btnClose.style.backgroundColor='#ffffff00';
        btnClose.style.backgroundImage='url(./img/close.svg)';
        btnClose.style.backgroundSize='contain';
        btnClose.style.backgroundRepeat='no-repeat';
        btnClose.style.width='30px';
        btnClose.style.height='30px';
        btnClose.style.border='none';
        btnClose.style.cursor='pointer';
        btnClose.style.animationName='closeJump';
        btnClose.style.animationDuration='1.5s';
        btnClose.style.animationIterationCount='infinite';

        bg.setAttribute('id', 'bg');
        bg.style.width='100%';
        bg.style.height='100%';
        bg.style.position='absolute';
        bg.style.top='0';
        bg.style.left='0';
        bg.style.backgroundColor='#00000050';

        newWindow.appendChild(pic);
        newWindow.appendChild(btnClose);

        newWindow.setAttribute('class','newWindow');
        newWindow.setAttribute('id','newWindows');

        let pWidth = document.body.clientWidth;
        if( pWidth > 1200){
            newWindow.style.width='50%';
        } else if (pWidth < 1199 && pWidth > 768){
            newWindow.style.width='70%';
        } else if (pWidth < 767){
            newWindow.style.width='90%';
        }

        newWindow.style.position='absolute';
        newWindow.style.top='10%';
        newWindow.style.left='50%';
        newWindow.style.transform='translateX(-50%)';
        newWindow.style.border='4px solid #000000';
        newWindow.style.borderRadius='20px';
        newWindow.style.backgroundColor='#f5f5f5';
        newWindow.style.textAlign='center';
        newWindow.style.display='flex';
        newWindow.style.flexDirection='column';
        newWindow.style.justifyContent='center';
        newWindow.style.zIndex='1';
        newWindow.style.overflow='hidden';

        document.querySelector('.container').appendChild(bg);

        // 抓到指定id位置，並在此位置的最後方加上剛剛創的div
        document.querySelector('.timelineContainer').appendChild(newWindow);
        // 螢幕滑到照片處
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth'});


        // 關閉功能呼叫
        document.querySelector('#wC').addEventListener('click',function(){
            var timelineContainer = document.querySelector('.timelineContainer');
            var windowNone = document.querySelector('#newWindows');
            var container = document.querySelector('.container');
            var dbg = document.getElementById('bg');
            container.removeChild(dbg);
            timelineContainer.removeChild(windowNone);
        })
    }
};