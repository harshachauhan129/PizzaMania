// =============menu section side bar=================

const ham=document.getElementById('ham');
const menu_section=document.querySelector('.menu_section');
ham.addEventListener('click',function(){
    menu_section.classList.add('active');
});
const account=document.getElementById('account');
account.addEventListener('click',function(){
    menu_section.classList.add('active');
});
const cross=document.getElementById('cross');
cross.addEventListener('click',function(){
    menu_section.classList.remove('active');
});

// ===================end menu section================

// =================veg toggle======================

const veg_button=document.getElementById("veg_button");
const veg=document.getElementsByClassName("veg");
veg_button.addEventListener('click',function(){
  veg_button.classList.toggle("veg");
  Array.from(veg).forEach(elem=>{
    if(veg=='veg'){
      elem.parentElement.parentElement.parentElement.classList.toggle("hide");
    }
    else{
      elem.parentElement.parentElement.parentElement.classList.toggle("visible");
    }
  })
});
// =================veg toggle end======================
// =====================Mobile nav==========

const cart=document.querySelector('.cart');
const cart_section=document.querySelector('.cart_right');
cart.addEventListener('click',function(){
    cart_section.classList.toggle('view');
    window.scrollTo(300,4800);
});
const search1=document.querySelector('.search');
const search_bar=document.querySelector('.nav-2');
search1.addEventListener('click',function(){
    search_bar.classList.toggle('block');
});
const home=document.querySelector('.home');
home.addEventListener('click',function(){
    window.scrollTo(0,0);
});

// ========================mobile nav ends=========
// =====================search==========================
const headings=document.getElementsByTagName("h3");
const search=document.getElementById('search');
const card_title=document.getElementsByClassName("card-title");
search.addEventListener("input",function(){
    Array.from(card_title).forEach(elem=>{
    if(elem.innerText.toLowerCase().includes(search.value.toLowerCase())){
      elem.parentElement.parentElement.style.display="block";
    }
    else{
      elem.parentElement.parentElement.style.display="none";
    }
  })
});
// =====================search end=====================

//=================add to cart========================
const addtocart=document.querySelectorAll('.add-to-cart');
console.log(addtocart);

let items=[];
for(let i=0;i<addtocart.length;i++){
    addtocart[i].addEventListener('click',function(e){

        //checking the cart:
        if (typeof (Storage) !== 'undefined') {
            console.log('storage is working');
            console.log();
            let item={
                id:i+1,
                name:e.target.parentElement.parentElement.children[0].innerText,
                price:e.target.parentElement.children[0].children[1].children[0].innerText,
                no:1
            };
            if(JSON.parse(localStorage.getItem('items'))===null){

                items.push(item);
                localStorage.setItem("items",JSON.stringify(items));
                window.location.reload();
            }
            else{
                const localItem=JSON.parse(localStorage.getItem('items'));
                localItem.map(data=>{
                    if(item.id==data.id){
                        item.no =data.no+ 1;
                    }
                    else{
                        items.push(data);
                    }
                });
                items.push(item);
                localStorage.setItem('items',JSON.stringify(items));
                window.location.reload();
            }
        } else {
            console.log('storage is not working');
        }
    })
}


//==========UI Of Cart=====================
const cart_empty=document.querySelector('.cart_empty');
function getItems(){
    const localItem=JSON.parse(localStorage.getItem('items'));
    console.log(localItem);
    cart_empty.innerHTML="";
    let total=0;
    let qty=0;
    let str="";
    if(localItem!=null){
        cart_empty.innerHTML="";
        cart_empty.innerHTML=`<h1 class="m-2 text-center" >Cart</h1>`;
        Object.values(localItem).map(items=>{
            qty=items.no * items.price;
            total=total+qty;
            str+=`<div class"rounded bg-light">
                <p class="fw-bold" >${items.name}</p>
                <p class="text-center"> <span>+</span>${items.no}<span>-</span></p>
                </div>
                `;
        });
        cart_empty.innerHTML+=`${str}
        <p class="mt-5 m-2 fw-bold text-left">Any instructions to make your order standout?</p>
        <p>Our team will try to make it happen!</p>
        <input type="text" placeholder="e.g. Add extra cutlery" style="width:100%" class="rounded py-2">
        <hr class="my-5 mt-5">
        <h6 class="fs-6 fw-bold">Pay Amount: ${total} </h6>
        <button onclick="cartEmpty()" style="width:80%"  class="text-light fw-bold p-2 px-5 btn bg-danger m-auto" id="checkout">Checkout</button>`
    }
    else{
        cart_empty.innerHTML=`<h1>Cart Empty</h1>
    <img src="images/Categories/empty-cart.png" class="img-fluid" width="400" alt="empty cart">
    <p class="fw-bold text-center">Empty Cart</p>
    <p class="text-center">Let your standout experience begin!</p>`;
    }


}

//to empty the cart
function cartEmpty(){
    localStorage.clear();
    alert("Thanks for eating with US! Enjoy your meal!!");
    window.location.reload();
    cart_empty.innerHTML=`<h1>Cart Empty</h1>
    <img src="images/Categories/empty-cart.png" class="img-fluid" width="400" alt="empty cart">
    <p class="fw-bold text-center">Let your standout experience begin!</p>`
}

getItems();