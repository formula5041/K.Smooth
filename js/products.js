// user點擊，儲存該產品名稱
let a = document.querySelectorAll('a');
a.forEach(function(item){
    item.addEventListener('click',function(e){
        let thisProduct = this.querySelector('h3').innerHTML;
        let pTitle = document.querySelector('#pTitle').innerHTML;
        let productPage ={
            'pName' : thisProduct,
            'pTitle': pTitle,
            'href':location.href
        };
        let productPages = JSON.parse(localStorage.getItem('productPages'));
        if(productPages){
            productPages.splice(0,1,productPage);
        } else{
            productPages = [productPage];
        }
        localStorage.setItem('productPages',JSON.stringify(productPages));
    })
})

