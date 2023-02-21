import { promises as fs } from 'fs'

export class ProductManager {
    constructor(path) {
        this.path = path
    }

    static incrementarID(idAnterior) {
        if (!idAnterior) {
            idAnterior = 10;
        }
        return idAnterior + 1;
    }

    async addProduct(producto) {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        producto.id = ProductManager.incrementarID()
        prods.push(producto)
        await fs.writeFile(this.path, JSON.stringify(prods))
        return "Producto creado"
    }
    async getProducts() {
        try {
            const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            return prods
        } catch (error) {
            return error
        }

    }

    async getProductById(id) {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        if (prods.some(prod => prod.id === parseInt(id))) {
            return prods.find(prod => prod.id === parseInt(id))
        } else {
            return "Producto no encontrado"
        }
    }

    async updateProduct(id, { nombre, descripcion, precio, img, code, stock }) {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        if (prods.some(prod => prod.id === parseInt(id))) {
            let index = prods.findIndex(prod => prod.id === parseInt(id))
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

    async deleteProduct(id) {
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        if (prods.some(prod => prod.id === parseInt(id))) {
            const prodsFiltrados = prods.filter(prod => prod.id !== parseInt(id))
            await fs.writeFile(this.path, JSON.stringify(prodsFiltrados))
            return "Producto eliminado"
        } else {
            return "Producto no encontrado"
        }
    }

}