import {promises as fs} from 'fs'
export class ProductManager {
    constructor(path) {
        this.path = path
    }

    static addId(){
        if (this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }
    addProduct = async (product,imgPath) => {
        const read = await fs.readFile(this.path, 'utf-8');
        const data = JSON.parse(read);
        const prodCode = data.map((prod) => prod.code);
        const prodExist = prodCode.includes(product.code); 
        if (prodExist) {
            return console.log (`El código ${product.code} ya existe. Ingrese uno diferente.`)
        } else if (Object.values(product).includes("") || Object.values(product).includes(null)) {
            return console.log("Todos los campos deben ser completados.");
        } else {
            if (imgPath) {
                product.thumbnail = imgPath;
            }            
            const nuevoProducto = {id: product.addId(), ...product};
            data.push(nuevoProducto);
            await fs.writeFile(this.path, JSON.stringify(data), 'utf-8')
            return console.log(`El producto con id: ${nuevoProducto.id} ha sido agregado.`) 
        }
    }

    getProducts = async () => {
        try {
            const read = await fs.readFile(this.path, 'utf-8')
            const prods = await JSON.parse(read)
            if (prods.length != 0) {
                console.log("Listado de productos:");
                return prods
            } 
        } catch {
            await this.createJson();
            await this.createProducts();
            return "Productos iniciales creados."
        }
    }

    getProductById = async (id) => {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const findProduct = prods.find((prod) => prod.id === parseInt(id));
        if (findProduct) {
            console.log("Se ha encontrado el siguiente producto:")
            return findProduct;
        } else {
            return console.log("Product Not found");
        }
    }

    updateProduct = async (id, {nombre, descripcion, precio, img, code, stock}) => {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        if(prods.some(prod => prod.id === parseInt(id))) {
            let index= prods.findIndex(prod => prod.id === parseInt(id))
            prods[index].nombre = nombre
            prods[index].descripcion = descripcion
            prods[index].precio = precio
            prods[index].img = img
            prods[index].code = code
            prods[index].stock = stock
            await fs.writeFile(this.path, JSON.stringify(prods))
            return "Producto actualizado" 
        } else {
            return "Producto no encontrado"
        }
    }

    deleteProduct = async (id) => {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        if(prods.some(prod => prod.id === parseInt(id))) {
            const prodsFiltrados = prods.filter(prod => prod.id !== parseInt(id))
            await fs.writeFile(this.path, JSON.stringify(prodsFiltrados))
            return "Producto eliminado"
        } else {
            return "Producto no encontrado"
        }
    }

    
    async createJson() {
        
        await fs.writeFile(this.path, "[]");
    }

    async createProducts() {
    
    await this.addProduct(p1, ['../public/img/D_NQ_NP_698140-MLA53257761242_012023-W.jpg']);
    await this.addProduct(p2, ['../public/img/D_NQ_NP_735116-MLA44776430902_022021-O.jpg']);
    await this.addProduct(p3, ['../public/img/D_NQ_NP_645391-MLA43793189919_102020-O.jpg']);
    await this.addProduct(p4, ['../public/img/D_NQ_NP_935953-MLA49703675436_042022-O.jpg']);
    }
}