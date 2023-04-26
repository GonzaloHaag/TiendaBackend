//aqui debo implementar la conexion a la base de datos
//npm install pg para postgress
const {Client}= require('pg');



const obtenerTabla = async() => { //Esta funcion esta bien, representa al read de el

  const client = new Client({
    user : "postgres",
    host : "localhost",
    database : "Tienda - backend",
    password : "admin123",
    port : 5433
  })
  await client.connect(); //Conextamos con el cliente

  const respuesta = await client.query("SELECT * FROM productos");
  const resultado = respuesta.rows;






  await client.end(); //Cerramos conexion

  return resultado;
};
obtenerTabla().then(resultado => {

   console.log(resultado);
})






module.exports = {
  obtenerTabla, //Para exportar la funcion

}
