
document.addEventListener("DOMContentLoaded", () => {
    const products = [
        { id : 1, name : "product 1", price : 12},
        { id : 2, name : "product 1", price : 23},
        { id : 3, name : "product 1", price : 34},
        { id : 4, name : "product 1", price : 45},
    ]

    let cart = [];

    const productlist = document.getElementById("product-list");
    const cartitems= document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("cart-items");
    const carttotal = document.getElementById("cart-total");
    const totalpricedisplay = document.getElementById("total-price");
    const checkoutbtn= document.getElementById("checkout-btn");

    products.forEach((product)=>{
        const productdiv = document.createElement("div");
        productdiv.classList.add("product");
        productdiv.innerHTML = `
        <span>${product.name} - $${product.price}</span>
        <button data-id = "${product.id}">add to cart</button>
        `
        productlist.appendChild(productdiv);
    })
    productlist.addEventListener("click", (e) => {
        if(e.target.tagName === "BUTTON"){
            carttotal.classList.remove("hidden");
            const productid = parseInt(e.target.getAttribute("data-id"));
            const product = products.find((p) => p.id === productid);
            addtocart(product);
        }
    })
    function addtocart(product){
        cart.push(product);
        rendercart();
    }
    function rendercart(){
        let totalprice = 0;
        emptyCartMessage.textContent = "";

        if(cart.length > 0){
            cart.forEach((item)=>{
                totalprice += item.price;
                const cartitem = document.createElement("div");
                cartitem.classList.add("product");
                cartitem.innerHTML = `
                ${item.name} - $${item.price}
                <button class="remove-btn" data-id="${item.id}">remove</button>
                `
                cartitems.appendChild(cartitem);
               
            })
        }else{
            cartitems.innerHTML = "<p>Your cart is empty</p>";
        }
        totalpricedisplay.textContent = `$${totalprice}`;
    }


    

    cartitems.addEventListener("click", (e)=>{
        if(e.target.tagName === "BUTTON"){
            const productid = parseInt(e.target.getAttribute("data-id"));
            //const product = products.find((p) => p.id === productid);

           // cartitems.classList.remove("product");
            //removefromcart(productid);
            cart = cart.filter((p) => p.id !== productid)
            //console.log(cart);
            rendercart();
        }
    })
    checkoutbtn.addEventListener("click", ()=> {
        if(cart.length > 0){
        alert("successfull");
        }
        else{
            alert("please select atleast one product");
        }
        cart.length = 0;  
        carttotal.classList.add("hidden");
        totalpricedisplay.textContent = `$0.00`;
        rendercart();     
    })
})
