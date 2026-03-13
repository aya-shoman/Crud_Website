var productname = document.getElementById('productname');
var productprice = document.getElementById('productprice');
var productcategory = document.getElementById('productcategory');
var productdescription = document.getElementById('productdescription');
var addButton = document.getElementById('addBtn');
var updateButton = document.getElementById('updateBtn');
var searchinput = document.getElementById('searchinput');
var productimage = document.getElementById('productimage');
var productcontainer;
if(localStorage.getItem('products')===null)
{
    productcontainer=[];
}else{
    productcontainer=JSON.parse(localStorage.getItem('products'));
    displayproduct();
}
function addproduct(){
    if(validateProduct()==false){
    return;
}
    console.log(productimage.files[0].name);
    var product = {
    code : productname.value,
    price :productprice.value,
    category :productcategory.value,
    desc : productdescription.value,
    image:`imaaage/${productimage.files[0]?.name}`
}
    productcontainer.push(product);
    localStorage.setItem('products',JSON.stringify(productcontainer))
    clearform();
    displayproduct();
    
}
function clearform(){
    productname.value = null;
    productprice.value = null;
    productcategory.value = null;
    productdescription.value = null;
    productimage.value = null;
}
function displayproduct(){
    var cartona='';
    for (var i = 0;i< productcontainer.length; i++) {
        cartona+=`<div class="item">
            <img src="${productcontainer[i].image}" alt="product image"/>
            <h2>${productcontainer[i].code}</h2>
            <p>${productcontainer[i].desc}</p>
            <div class="more_information">
                <span>${productcontainer[i].price}<strong>EGP</strong> </span>
                <span>${productcontainer[i].category}</span>
            </div>
            <button class="deletebtn" onclick="deleteproduct(${i})"> Delete <i class="fa-solid fa-trash"></i></button>
             <button class="updatebtn" style="width:100%" onclick="setformforupdate(${i})"> Update <i class="fa-solid fa-pen"></i></button>
        </div>`
    }
    document.getElementById('rowData').innerHTML=cartona;
}
function deleteproduct(deleteindex){
    productcontainer.splice(deleteindex,1);
        displayproduct();
        localStorage.setItem('products',JSON.stringify(productcontainer));
}
var indexforupdate;
function setformforupdate(updatedindex){
    indexforupdate=updatedindex;
    addButton.classList.add('d-none');
    updateButton.classList.remove('d-none');
    productname.value = productcontainer[updatedindex].code;
    productprice.value = productcontainer[updatedindex].price;
    productcategory.value = productcontainer[updatedindex].category;
    productdescription.value = productcontainer[updatedindex].desc;
}
function Updateproduct(){
    productcontainer[indexforupdate].code = productname.value;
    productcontainer[indexforupdate].price = productprice.value;
    productcontainer[indexforupdate].category = productcategory.value;
    productcontainer[indexforupdate].desc = productdescription.value;
    displayproduct();
    clearform();
    addButton.classList.remove('d-none');
    updateButton.classList.add('d-none');
    localStorage.setItem('products',JSON.stringify(productcontainer));
}
function searchproduct(){
    var term=searchinput.value;
    var cartoona='';
    for (var i = 0;i< productcontainer.length; i++) {
        if (productcontainer[i].code.toLowerCase().includes(term.toLowerCase())==true){
        cartoona+=`<div class="item">
            <img src="${productcontainer[i].image}" alt="product image"/>
            <h2>${productcontainer[i].code}</h2>
            <p>${productcontainer[i].desc}</p>
            <div class="more_information">
                <span>${productcontainer[i].price}<strong>EGP</strong> </span>
                <span>${productcontainer[i].category}</span>
            </div>
            <button class="deletebtn" onclick="deleteproduct(${i})"> Delete <i class="fa-solid fa-trash"></i></button>
             <button class="updatebtn" style="width:100%" onclick="setformforupdate(${i})"> Update <i class="fa-solid fa-pen"></i></button>
        </div>`
        }
    }
    document.getElementById('rowData').innerHTML=cartoona;
}
function validateProduct(){

    var isValid = true;

    nameError.innerHTML = "";
    priceError.innerHTML = "";
    categoryError.innerHTML = "";

    if(productname.value.trim() === ""){
        nameError.innerHTML = "Name is required";
        isValid = false;
    }

    if(productprice.value.trim() === ""){
        priceError.innerHTML = "Price is required";
        isValid = false;
    }
    else if(Number(productprice.value) < 1000){
        priceError.innerHTML = "Minimum price is 1000";
        isValid = false;
    }

    if(productcategory.value.trim() === ""){
        categoryError.innerHTML = "Category is required";
        isValid = false;
    }
    if(!productimage.files.length){
    alert("Image is required");
    return false;
}

    return isValid;
}