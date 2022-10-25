/*Para crear las trajetas */
const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carrito = {}

/*Para llamar los elementos de la API */
document.addEventListener('DOMContentLoaded', () => {
    fetchData()
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
})

// Alerta de compra éxitosa
function pay_car() {
    alert('Compra Éxitosa');
    location.assign('index.html');
}

// Escuchar los clicks para ejecutar determinadas acciones
cards.addEventListener('click', e => {
    addCArrito(e)
})

items.addEventListener('click', e => {
    btnAction(e)
})

// Conexión fetch para traer a través del DOM el contenido de un elemento JSON,
// dibujar cada uno de los elementos del array resultante.
const fetchData = async () => {
    try {
        const res = await fetch('api.json')
        const data = await res.json()
        console.log(data);
        pintarCards(data)
    } catch (error) {
        console.log(error)
    }
}

/*Para mostrar los elementos */
const pintarCards = data => {
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.title
        templateCard.querySelector('p').textContent = producto.precio
        templateCard.querySelector('img').setAttribute("src", producto.thumbnailUrl)
        templateCard.querySelector('.btn-dark').dataset.id = producto.id

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

/*Para que el boton haga la función de seleccionar los productos  */
const addCArrito = e => {
    //console.log(e.target)
    //console.log(e.target.classList.contains('btn-dark'))

    if (e.target.classList.contains('btn-dark')) {
        console.log('click');
        show_add_car();
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation() //para que se detengan el evento
}

//Para capturar los elementos
const setCarrito = objeto => {
    //console.log(objeto)
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1

    }
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }
    //Empujar los elementos del carrito
    carrito[producto.id] = {
        ...producto
    }
    pintarCarrito()
}

//Pintar el carrito en el DOM. Almacena cada elemento para pasarlo al template y setea la info en el LocalStorage.
const pintarCarrito = () => {
    items.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })

    items.appendChild(fragment)

    pintarFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))
}

//Pintar el footer y las operaciones de suma y multiplicación
const pintarFooter = () => {
    footer.innerHTML = ''
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = '<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>'
        return
    }

    const nCantidad = Object.values(carrito).reduce((acc, {
        cantidad
    }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {
        cantidad,
        precio
    }) => acc + cantidad * precio, 0)
    //console.log(nCantidad, nPrecio)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad.toFixed(2)
    templateFooter.querySelector('span').textContent = nPrecio.toFixed(2)

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    // Vaciar carrito
    btnVaciar.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })
}

//Funcionalidad de los botones aumentar y disminuir
const btnAction = e => {
    //console.log(e.target)
    //Acción de aumentar
    if (e.target.classList.contains('btn-info')) {
        console.log(carrito[e.target.dataset.id])
        //carrito[e.target.dataset.id]

        const producto = carrito[e.target.dataset.id]
        //producto.cantidad = carrito[e.target.dataset.id].cantidad + 1 //Se puede utilizar este código
        producto.cantidad++ //código reducido
        carrito[e.target.dataset.id] = {
            ...producto
        }
        pintarCarrito()
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        }
        pintarCarrito()
    }
    e.stopPropagation()
}

// Mostrar si un producto ha sido agregado al carrito al darle al botón de "Comprar"
function show_add_car() {
    $(".cont_alert_car").fadeIn();
    setTimeout(function () {
        $('.cont_alert_car').fadeOut();
    }, 1500);
}

// Icono de carrito y X del carrito muestran u ocultan el carrito
$(".car_carrito, .close_car").click(function () {
    $(".cont_car").toggleClass("cont_car_shw");
});