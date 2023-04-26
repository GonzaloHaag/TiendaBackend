let carrito = [];
let total = 0;
let productList = [];

function add(productId, price) {
  //CONTROL DE STOCK LUEGO DE HABER MODIFICADO EL BACKEND PARA Q LO DESCUENTE
    const product = productList.find( p => p.id === productId);
    product.stock--;
    console.log(productId, price);
    carrito.push(productId);
    total = total + price;
    document.getElementById("checkout").innerHTML = `Pagar $${total}`

    displayProducts();
}

async function pago() {
  //Funcion cuando se presiona el boton pagar
   // window.alert(products.join(", \n"));

   try {
     productList = await (await fetch("/api/pago",{
      /*
      Un post a la url de /api/pago
      Hacemos un post y vamos a enviar dentro del body los
      productos que hemos seleccionado
      */

      /*
      Dentro de mi backend debemos definir que hago cuando me
      hacen un post a esta url
      app.post("/api/pago",(req,res) => {
      }
    */

      method : "post",
      body: JSON.stringify(carrito),
      headers : {
        "Content-Type": "application/json"
      }

   })).json();



   }
   catch (error) {
    window.alert("Sin stock");
   }
   carrito = [];
   total = 0;
   await fetchProducts();
   document.getElementById("checkout").innerHTML = `Pagar $${total}`; //Para que se redibuje cuanto es el total


}

//-----
function displayProducts() {
  /*Recorro el array y los muestro, estan en el backend*/
    let productsHTML = '';
    console.log(productList);

    productList?.forEach(producto => {


      let buttonHtml = `<button class="button-add" onclick="add(${producto.id}, ${producto.price})">Agregar</button>`;

      if(producto.stock <= 0) {
        //Si no hay stock del producto
        buttonHtml = `<button class="button-add disabled" onclick="add(${producto.id}, ${producto.price})">Sin stock</button>`;

      }
        productsHTML +=
        `<div class="product-container">
            <h3>${producto.name}</h3>
            <img src="${producto.image}" />
            <h1>${producto.price}</h1>
            ${buttonHtml}
        </div>`
    });
    document.getElementById('page-content').innerHTML = productsHTML;
}

async function fetchProducts() {
   //Apenas se cargue la ventana, quiero esto
  //Cuando se cargue la pagina la variable productList ya tendra cosas
  productList  = await fetch("http://localhost:3000/api/products").then((res)=>res.json());
  console.log(productList);
  displayProducts();

  // productList = await fetch("/api/products").then((res)=>{
  //   res.json();
  // });
  // displayProducts(productList);
}



window.onload = async() => {

  await fetchProducts(productList);

}

