// click SIGN UP
document.getElementById("maskSignUp").addEventListener("click",showSignUp);
function showSignUp(){
    let l1_1 = document.getElementById("l1_1");
    let l1_2 = document.getElementById("l1_2");
    let l2_1 = document.getElementById("l2_1");
    let l2_2 = document.getElementById("l2_2");
    l1_1.style.zIndex="-11";
    l1_2.style.zIndex="11";
    l2_1.style.zIndex="11";
    l2_1.style.animationName="open";
    l2_2.style.zIndex="-11";
    l2_2.style.opacity="0";
    l2_2.style.animationName="";
}

// click SIGN IN
document.getElementById("maskSignIn").addEventListener("click",showSignIn);
function showSignIn(){
    let l1_1 = document.getElementById("l1_1");
    let l1_2 = document.getElementById("l1_2");
    let l2_1 = document.getElementById("l2_1");
    let l2_2 = document.getElementById("l2_2");
    l1_1.style.zIndex="11";
    l1_2.style.zIndex="-11";
    l2_1.style.zIndex="-11";
    l2_1.style.opacity="0";
    l2_1.style.animationName="";
    l2_2.style.zIndex="11";
    l2_2.style.animationName="open";
}


// passing data to localStorage
// signUp
// 電話號碼只能輸入數字
let form = document.querySelector('#signUpForm');
let input = form.querySelectorAll('input');
input.forEach(function(item,){
    item.addEventListener('keydown',function(e){
        if(item.name=='telephone' && !((e.which >=48 && e.which <= 57) || (e.which == 8) || (e.which == 9))){
            e.preventDefault();
        }
    })
})


// 建立帳號
document.addEventListener('click',function(e){
    if(e.target.id == 'signUp'){
        //停止submit預設
        e.preventDefault();
        let phoneReg = /^09\d{8}$/;
        let emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        let passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/;
        let allInput = e.target.closest('form').querySelectorAll('input');
        let fullName = allInput[0];
        let telephone = allInput[1];
        let email = allInput[2];
        let password = allInput[3];
        let alertArea = document.querySelector('.alertArea');


        if(fullName.value =='' || !phoneReg.test(telephone.value) || !emailReg.test(email.value) || !passwordReg.test(password.value)){
            if(fullName.value ==''){
                fullName.style.border='2px solid #E24444';
                alertArea.innerHTML = 'Your Name is empty!';
                alertArea.classList.add('alertOn');
                fullName.addEventListener('focus',function(){
                    fullName.style.border='2px solid #116975';
                    alertArea.innerHTML = 'or use your email for registration';
                    alertArea.classList.remove('alertOn');
                })
            } else if (!phoneReg.test(telephone.value)){
                telephone.style.border='2px solid #E24444';
                alertArea.innerHTML = 'Ex:0930663220, 10 length';
                alertArea.classList.add('alertOn');
                telephone.addEventListener('focus',function(){
                    telephone.style.border='2px solid #116975';
                    alertArea.innerHTML = 'or use your email for registration';
                    alertArea.classList.remove('alertOn');
                })
            } else if (!emailReg.test(email.value)){
                email.style.border='2px solid #E24444';
                alertArea.innerHTML = 'Your E-mail is wrong!';
                alertArea.classList.add('alertOn');
                email.addEventListener('focus',function(){
                    email.style.border='2px solid #116975';
                    alertArea.innerHTML = 'or use your email for registration';
                    alertArea.classList.remove('alertOn');
                })
            } else if (!passwordReg.test(password.value)){
                password.style.border='2px solid #E24444';
                alertArea.innerHTML = '8 length at least, numbers + letters';
                alertArea.classList.add('alertOn');
                password.addEventListener('focus',function(){
                    password.style.border='2px solid #116975';
                    alertArea.innerHTML = 'or use your email for registration';
                    alertArea.classList.remove('alertOn');
                })
            }
        } else{
            // 註冊成功畫面
            let signUpUp = e.target.closest('form').previousElementSibling;
            signUpUp.style.marginBottom='100px';
            
            e.target.closest('form').style.display='none';
            
            alertArea.style.transform ='translateY(20px)';
            alertArea.innerHTML = `<h1 style='color:#E24444'>Successful Up!</h1>`;

            // 存到localStorage
            let infoObj= {
                'fullname': allInput[0].value,
                'telephone': allInput[1].value,
                'email': allInput[2].value,
                'password': allInput[3].value,
                'avatar': './img/avatar/avatar.svg', //預設大頭照
                'address' : 'No.1, Dana Rd., Dann Dist., Taipei City',
                'products' :[],
                'history' : []
            }
            let signInfo = JSON.parse(localStorage.getItem('signInfo'));
            
            if(signInfo){
                signInfo.unshift(infoObj);
            } else{
                signInfo =[infoObj];
            }
            // 更新資料
            localStorage.setItem('signInfo', JSON.stringify(signInfo));

            // 讓使用者創建完後直接登入
            let signInfos = signInfo[0];
            localStorage.setItem('userlogging', JSON.stringify(signInfos));
            

            // 3秒後跳轉首頁
            setTimeout(function(){
                window.location.replace('./index.html');
            },2000)
        }
    }
})

// 登入帳號
document.addEventListener('click',function(e){
    if(e.target.id == 'signIn'){
        //關掉submit預設
        e.preventDefault()
        
        let signUp = document.querySelector('.signUpTitle');
        let alertAreas = document.querySelector('.alertAreas');

        let allInput = e.target.closest('form').querySelectorAll('input');
        let userEmail = allInput[0];
        let userPassword = allInput[1];

        // 抓localStorage上的帳號、密碼
        let signInfo = JSON.parse(localStorage.getItem('signInfo'));
        let resultEmail = signInfo.map(function(value){
            return value.email;
        })
        let resultPassword = signInfo.map(function(value){
            return value.password;
        })
        
        // 判斷user輸入是否符合localStorage上的帳號、密碼
        if(resultEmail.indexOf(userEmail.value) == -1 || resultPassword.indexOf(userPassword.value) == -1){
            
            if(resultEmail.indexOf(userEmail.value) == -1){
                userEmail.style.border='2px solid #E24444';
                alertAreas.innerHTML = 'your email is wrong!';
                alertAreas.classList.add('alertOn');
                userEmail.addEventListener('focus',function(){
                    userEmail.style.border='2px solid #116975';
                    alertAreas.innerHTML = 'or use your email for registration';
                    alertAreas.classList.remove('alertOn');
                })
            } else if (resultPassword.indexOf(userPassword.value) == -1){
                userPassword.style.border = '2px solid #E24444';
                alertAreas.innerHTML = 'your password is wrong!';
                alertAreas.classList.add('alertOn');
                userPassword.addEventListener('focus',function(){
                    userPassword.style.border='2px solid #116975';
                    alertAreas.innerHTML = 'or use your email for registration';
                    alertAreas.classList.remove('alertOn');
                })
            }           
        } else{
            // 判斷User Name
            // 判斷是第幾個email -> 用第幾個email判斷是第幾個陣列 ->這個陣列中的fullname
            let userName = signInfo[resultEmail.indexOf(userEmail.value)].fullname;

            // 判斷是哪一個user，將資料傳到localStorage的 userlogging裡面(用來判斷user登入資料)
            let userAllInfo = signInfo[resultEmail.indexOf(userEmail.value)];
            localStorage.setItem('userlogging', JSON.stringify(userAllInfo));

            // 登入成功畫面
            signUp.style.opacity='0';
            e.target.closest('form').style.display='none';
            alertAreas.style.fontWeight='bold';
            alertAreas.style.color='#E24444';
            alertAreas.innerHTML=
                                `
                                    <span style='color:#E24444;'>HI! </span>
                                    <span style='color:#116975;'>${userName}</span> 
                                    <br>WELCOME BACK!
                                `;
            alertAreas.style.transition= 'all .5s';
            alertAreas.style.textAlign= 'center';

            if(document.body.clientWidth > 1000){
                alertAreas.style.fontSize='48px'
                alertAreas.style.marginTop='70px'
            } else if (document.body.clientWidth < 999 && document.body.clientWidth >450){
                alertAreas.style.fontSize='34px'
                alertAreas.style.marginTop='80px'                
            } else {
                alertAreas.style.fontSize='26px'
                alertAreas.style.marginTop='60px'  
            }
            // 3秒後跳轉首頁
            setTimeout(function(){
                window.location.replace('./index.html');
            },2000)
        }
    }
})

document.addEventListener('click',function(e){
    if(e.target.id == 'deleteAll'){
        localStorage.removeItem('signInfo');
    }
})