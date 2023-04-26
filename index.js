const express = require("express");
const app = express();
const port = 3000;
const repository = require("./repository"); //ACA TENGO MI CONEXION A LA BASE DE DATOS
//Luego de instalar npm install mercadopago
const mercadopago = require("mercadopago");




app.get("/api/products", async (req, res) => {
 /*
 Esto es lo que se mostrara en el localhost:3030
 Debo lograr que se muestre lo que viene de la base de datos
 al hacer /api/products mostrara la el array de productos de
 la base de datos
 */

  //res.send(products);
  const productsBD = await repository.obtenerTabla();
  console.log(productsBD);
  res.send(productsBD); //Me llegan los productos de la base de datos


});

app.use(express.json()); //Para poder leer el body

let products = [
  {
    id: 1,
    name: "2 Mancuernas",
    price: 50,
    image: "images/product-1.jpg",
    stock: 3,
  },
  {
    id: 2,
    name: "Banco ajustable",
    price: 50,
    image: "images/product-2.jpg",
    stock: 3,
  },
  {
    id: 3,
    name: "Kit de pesas con estuche",
    price: 50,
    image: "images/product-3.jpg",
    stock: 3,
  },
  {
    id: 4,
    name: "Pesas",
    price: 50,
    image: "images/product-4.jpg",
    stock: 3,
  },
  {
    id: 5,
    name: "Pesa de 30Kg",
    price: 50,
    image: "images/product-5.jpg",
    stock: 3,
  },
  {
    id: 6,
    name: "Bolsa de boxeo con pie",
    price: 50,
    image: "images/product-6.jpg",
    stock: 3,
  },
];



app.post("/api/pago", async (req,res) => {
  /*
  Cuando me hagan un post desde frontend a esta url
  desde el script.js
  */
 //console.log(req.body); //Accedemos al body que es lo que me estan mandando


 //Control de stock de mis productos
 const ids = req.body;
//  let copyProducts = products.map((p)=>({...p}));//Copia del array products
 const copyProducts = await repository.obtenerTabla();

 //COPIA DE LOS PRODUCTOS, POR SI DOS PERSONAS ESTAN COMPRANDO AL MISMO TIEMPO
let error = false;
 ids.forEach((id) => {

  const product = copyProducts.find( (p) => p.id === id);
  if(product.stock > 0) {
    product.stock--; //Descuento 1 del stock por cada uno de los productos
    preference.items.push({
      title:product.nombre,
      unit_price:product.precio,
      quantity:1,

    })
  }
  else{
    error = true;
  }
 /*
  Para saber si esta descontando stock, debemos
  ir a la funcion de pago(dentro de network) y ver
  si esta descontando el stock de mi producto
  */
});
if(error) {
  res.send("Sin stock").statusCode(400);
}
else {
//  const response = await mercadopago.preferences.create(preference);
// const preferenceId = response.body.id;
//  products = copyProducts;
//  res.send({preferenceId});
 res.send(copyProducts);
}

 });

app.get('/feedback',function(req,res) {

  res.json({
    Payment:req.query.payment_id,
    Status:req.query.status,
    MerchantOrder : req.query.merchant_order_id
  })

});

app.use("/", express.static("frontend"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
