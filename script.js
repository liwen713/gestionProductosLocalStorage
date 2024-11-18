class Producto {
    constructor(nombre, precio, stock, categoria) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.categoria = categoria;
    }
}

// para gestionar catálogo
class CatalogoProductos {
    constructor() {
        // para verificar si localStorage está disponible
        this.storageAvailable = this.checkLocalStorage();
        this.productos = this.storageAvailable 
            ? JSON.parse(localStorage.getItem('catalogo') || '[]') 
            : JSON.parse(sessionStorage.getItem('catalogo') || '[]');
    }

    checkLocalStorage() {
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return true;
        } catch(e) {
            console.warn('LocalStorage no disponible, usando almacenamiento de sesión');
            return false;
        }
    }

    guardarCatalogo() {
        if (this.storageAvailable) {
            localStorage.setItem('catalogo', JSON.stringify(this.productos));
        } else {
            sessionStorage.setItem('catalogo', JSON.stringify(this.productos));
        }
    }

    agregarProducto(producto) {
        const productoExistente = this.productos.find(p => p.nombre === producto.nombre);
        if (productoExistente) {
            alert('Ya existe un producto con este nombre.');
            return false;
        }
        this.productos.push(producto);
        this.guardarCatalogo();
        return true;
    }

    listarProductos() {
        return this.productos;
    }

    buscarPorCategoria(categoria) {
        return this.productos.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
    }

    actualizarStock(nombre, nuevoStock) {
        const index = this.productos.findIndex(p => p.nombre === nombre);
        if (index !== -1) {
            this.productos[index].stock = nuevoStock;
            this.guardarCatalogo();
            return true;
        }
        return false;
    }

    eliminarProducto(nombre) {
        const index = this.productos.findIndex(p => p.nombre === nombre);
        if (index !== -1) {
            this.productos.splice(index, 1);
            this.guardarCatalogo();
            return true;
        }
        return false;
    }

    calcularValorInventario() {
        return this.productos.reduce((total, producto) => total + (producto.precio * producto.stock), 0);
    }
}

const catalogo = new CatalogoProductos();

function agregarProducto() {
    const nombre = document.getElementById('nombreProducto').value;
    const precio = parseFloat(document.getElementById('precioProducto').value);
    const stock = parseInt(document.getElementById('stockProducto').value);
    const categoria = document.getElementById('categoriaProducto').value;

    if (!nombre || isNaN(precio) || isNaN(stock) || !categoria) {
        alert('Por favor, complete todos los campos correctamente.');
        return;
    }

    const producto = new Producto(nombre, precio, stock, categoria);
    if (catalogo.agregarProducto(producto)) {
        alert('Producto agregado exitosamente.');
        listarProductos();
    }
}

function listarProductos() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    const productos = catalogo.listarProductos();

    if (productos.length === 0) {
        productList.innerHTML = '<p>No hay productos en el catálogo.</p>';
        return;
    }

    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto-item');
        productoDiv.innerHTML = `
            <strong>Nombre:</strong> ${producto.nombre}<br>
            <strong>Precio:</strong> $${producto.precio.toFixed(2)}<br>
            <strong>Stock:</strong> ${producto.stock}<br>
            <strong>Categoría:</strong> ${producto.categoria}
        `;
        productList.appendChild(productoDiv);
    });
}

function buscarPorCategoria() {
    const categoria = document.getElementById('buscarCategoria').value;
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    const productosFiltrados = catalogo.buscarPorCategoria(categoria);

    if (productosFiltrados.length === 0) {
        productList.innerHTML = '<p>No se encontraron productos en esta categoría.</p>';
        return;
    }

    productosFiltrados.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto-item');
        productoDiv.innerHTML = `
            <strong>Nombre:</strong> ${producto.nombre}<br>
            <strong>Precio:</strong> $${producto.precio.toFixed(2)}<br>
            <strong>Stock:</strong> ${producto.stock}<br>
            <strong>Categoría:</strong> ${producto.categoria}
        `;
        productList.appendChild(productoDiv);
    });
}

function actualizarStock() {
    const nombre = document.getElementById('nombreActualizarStock').value;
    const nuevoStock = parseInt(document.getElementById('nuevoStock').value);

    if (!nombre || isNaN(nuevoStock)) {
        alert('Por favor, ingrese un nombre de producto y un stock válido.');
        return;
    }

    if (catalogo.actualizarStock(nombre, nuevoStock)) {
        alert('Stock actualizado exitosamente.');
        listarProductos();
    } else {
        alert('Producto no encontrado.');
    }
}

function eliminarProducto() {
    const nombre = document.getElementById('nombreEliminar').value;

    if (!nombre) {
        alert('Por favor, ingrese un nombre de producto.');
        return;
    }

    if (catalogo.eliminarProducto(nombre)) {
        alert('Producto eliminado exitosamente.');
        listarProductos();
    } else {
        alert('Producto no encontrado.');
    }
}

function calcularValorInventario() {
    const valorTotal = catalogo.calcularValorInventario();
    document.getElementById('valorInventario').textContent = `Valor Total del Inventario: $${valorTotal.toFixed(2)}`;
}

// para cargar productos al inicializar
listarProductos();