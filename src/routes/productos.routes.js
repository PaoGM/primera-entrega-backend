import { Router } from "express";
import { ProductManager } from "../controllers/ProductManager.js";

const routerProduct = Router()
const productManager = new ProductManager('src/models/productos.json')

routerProduct.get('/', async (req, res) => {
    const { limit } = req.query;
    console.log(limit)
    const productos = await productManager.getProducts()
    console.log(productos)
    res.send(JSON.stringify(productos))
})

routerProduct.get('/:id', async (req, res) => {
    const product = await productManager.getProductById(req.params.id)
    console.log(product)
    res.send(JSON.stringify(product))
})


routerProduct.delete("/:id", async (req, res) => {
    const product = await productManager.deleteProduct(parseInt(req.params.id));
    res.send(`Producto ${JSON.stringify(product)} eliminado`);
  });

routerProduct.post("/", async (req, res) => {
    const product = await productManager.addProduct(req.body);
    res.send(JSON.stringify(product));
});

routerProduct.put("/:id", async (req, res) => {
    const product = await productManager.updateProduct(
        parseInt(req.params.id),
        req.body
    );
    res.send(JSON.stringify(product))
});


export default routerProduct;