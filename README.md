# gestionProductosLocalStorage
Este código permite la gestión de un catálogo de productos usando localStorage.
Incluye las funcionalidades solicitadas:
1. Agregar Producto: captura valores de los inputs, los valida con un if, crea un nuevo producto con los valores capturados y usa la función agregarProducto para luego mostrar un alert que dice que el producto se agregó de manera correcta.
2. Listar Productos: primero limpia el contenedor de la lista, luego obtiene los productos del catálogo y verifica si hay productos. Luego recorre y muestra cada producto.
3. Buscar por Categoría: obtiene la categoría que el usuario ingresa desde el input, usa la función buscarPorCategoria y filtra los productos usando una comparación case-insensitive. Luego muestra los productos encontrados en el área de lista de productos (productList)
4. Actualizar Stock: captura los datos de entrada, valida los datos y actualiza el stock en el catálogo.
5. Eliminar Producto: captura el nombre del producto con un getElementById, luego valida que el nombre no esté vacío con un if, e intenta eliminar el producto. Si el producto no se encuentra, se muestra unn alert.
6. Calcular Valor Total del Inventario: evalúa el valor total del inventario multiplicando el precio por la cantidad de cada producto, y suma los valores individualmente para obtener un total global.
