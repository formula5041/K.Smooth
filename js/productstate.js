beSwitch('#switch1', '#productImg','url(./img/photos/index/pswitch/1.png)', '#1 Most Balance Bike', 'Warrior Ⅰ', 'Classic','./products_twoinone_warrior1.html','80%','100%','50%');
beSwitch('#switch2', '#productImg','url(./img/photos/index/pswitch/2.png)', '#2 Most Girls Like', 'Princess', 'Elegant','./products_twoinone_princess.html','100%','50%','80%');
beSwitch('#switch3', '#productImg','url(./img/photos/index/pswitch/3.png)', '#3 Most Speed Bike', ' Brave Ⅰ', 'Natual','./products_twoinone_brave1.html','80%','80%','80%');
beSwitch('#switch4', '#productImg','url(./img/photos/index/pswitch/4.png)', '#4 Most Comfort Bike', 'Brave ⅠⅠ', 'Special','./products_twoinone_brave2.html','50%','50%','100%');


// id= 點擊點, id2=換照片的點, url...=換照片的地址, hashtag = 要換第一行小字的內容, productName = 產品名稱, 
// productType = 產品類型, toProduct = 產品連結, bWidth =Balance狀態寬度, sWidth = Speed狀態寬度, cWidth = Comfort狀態寬度
function beSwitch(id,id2,url,hashtag, productName, productType,toProduct,bWidth,sWidth,cWidth){
    document.querySelector(id).addEventListener('click', switchTime);
    function switchTime(){
        // 換照片
        document.querySelector(id2).style.backgroundImage=url;
        // 換字(第一行)
        document.querySelector('#hashtag').textContent=hashtag;
        // 換字(第二行)
        document.querySelector('#productName').textContent=productName;
        // 換字(第三行)
        document.querySelector('#productType').textContent=productType;
        // 換button的url
        document.querySelector('#toProduct').setAttribute('href',toProduct);
        // 換State的(條)狀態 balance
        document.querySelector('#balance').style.width=bWidth;
        // 換State的(條)狀態 speed
        document.querySelector('#speed').style.width=sWidth;
        // 換State的(條)狀態 comfort
        document.querySelector('#comfort').style.width=cWidth;

        // 判斷條(狀態) 給予相對應的文字 Nice=50% Great=80% Excellent=100%
        var bValue = document.querySelector('#balance');
        var sValue = document.querySelector('#speed');
        var cValue = document.querySelector('#comfort');

        switch(bWidth){
            case '50%':
                bValue.textContent = 'Nice';
                break;
            case '80%':
                bValue.textContent = 'Great';
                break;
            case '100%':
                bValue.textContent = 'Excellent';
                break;
        }
        switch(sWidth){
            case '50%':
                sValue.textContent = 'Nice';
                break;
            case '80%':
                sValue.textContent = 'Great';
                break;
            case '100%':
                sValue.textContent = 'Excellent';
                break;
        }
        switch(cWidth){
            case '50%':
                cValue.textContent = 'Nice';
                break;
            case '80%':
                cValue.textContent = 'Great';
                break;
            case '100%':
                cValue.textContent = 'Excellent';
                break;
        }
    }
}