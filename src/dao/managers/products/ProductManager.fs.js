const fs = require("fs/promises");
const path = require("path");//importo el modulo de fileSystemPath para pasar de una manera más facil la ruta donde voy a almacenar mis productos.
const filePath = path.join(__dirname, "products.json");


class ProductManager {
  constructor(filePath) {
    this.filePath = filePath
  }

    async getProductos() {
        try {
          const datos = await fs.readFile(this.filePath, "utf-8");
          const productos = JSON.parse(datos)
          if (productos.length > 0) {
            return productos;
          }
          return []; // Devuelve un array vacío si no hay productos
        } catch (err) {
          console.log("Aquí está el error", err);
        }
      }

      async addProduct(producto) {
        try {
            const datos = await fs.readFile(this.filePath, "utf-8");
            const productos = JSON.parse(datos);
    
            const existingProduct = productos.find((p) => p.code === producto.code);
            if (existingProduct) {
                console.log('Error: Ya existe un producto con el mismo código.');
                return null;
            }
    
            let newProductId;
            if (productos.length > 0 && productos[productos.length - 1].id) {
                newProductId = productos[productos.length - 1].id;
            } else {
                newProductId = 0;
            }
    
            const newProduct = {
                ...producto,
                id: newProductId + 1
            };
    
            productos.push(newProduct);
    
            await fs.writeFile(this.filePath, JSON.stringify(productos, null, 2));
            
            return newProduct;
        } catch (err) {
            console.log("ERROR POR ACA --> ", err);
            return null;
        }
    }

    async getById(id) {
        try { 
            const datos = await fs.readFile(this.filePath, "utf-8");
            const productos = JSON.parse(datos)
            const productoEncontrado = productos.find(producto => producto.id === id);

            if (productoEncontrado) {
                return productoEncontrado;
            } else {
                return null;
            }


        }
        catch (err) {
            console.log("MIRAME ESTE NUEVO ERROR POR ACÁ", err);

        }
    }

    async updateProduct(id, producto) {
        try {
            const datos = await fs.readFile(this.filePath, "utf-8");
            const productos = JSON.parse(datos)
            const productoEncontrado = productos.find(producto => producto.id === +id);

            if (productoEncontrado) {
                productoEncontrado.title = producto.title || productoEncontrado.title;
                productoEncontrado.descripcion = producto.descripcion || productoEncontrado.descripcion;
                productoEncontrado.price = producto.price || productoEncontrado.price
                productoEncontrado.thumbnail = producto.thumbnail || productoEncontrado.thumbnail
                productoEncontrado.code = producto.code || productoEncontrado.code
                productoEncontrado.stock = producto.stock || productoEncontrado.stock

                await fs.writeFile(this.filePath, JSON.stringify(productos, null, 2));

            return productoEncontrado;
        } else {
            return null;
        }
        }
        catch (err) {
            console.log("ATENTO AL ERROR ACÁ", err);
        }
    }

    async deleteProduct(id) {
        try {
          const datos = await fs.readFile(this.filePath, "utf-8");
          const productos = JSON.parse(datos);
          const productoIndex = productos.findIndex((producto) => producto.id === id);
      
          if (productoIndex !== -1) {
            productos.splice(productoIndex, 1);
            console.log("Producto eliminado");
      
            await fs.writeFile(this.filePath, JSON.stringify(productos, null, 2));
            return true; // Agrega un retorno indicando que el producto se eliminó correctamente
          } else {
            return false; // Agrega un retorno indicando que el producto no se encontró
          }
        } catch (err) {
          console.log("nuevo error", err);
          return false; // Agrega un retorno en caso de error
        }
      }      

}


module.exports = ProductManager






