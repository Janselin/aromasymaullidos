let age_min_value;
let age_max_value;


// Función asíncrona:
// Almacenar respuesta de conexión fetch con un JSON. Usarla para dibujar esos elementos en el DOM.
// Y filtrar en el momento qué se necesite con ésa respuesta del DOM según lo que se necesite.
async function llamar_gatos() {
    const response = await fetch('api_cards_landing.json')
    const gatos = await response.json()
    dibujar_gatos(gatos);
    check_age(gatos);
    check_sex(gatos);
    check_color(gatos);
    /* dibujar_gatos(gatos.filter((cat) => cat.nombre.includes('ia'))); */
}

// Filtrar el elemento age en la respuesta del JSON, y mostrar solo los gatos que cumplen con la condición dada en edad.
// Limpia el DOM y dibuja la respuesta.
function check_age(gatos) {
    $('#filter_cat_age').click(function () {
        console.log('Entré a Age')
        let x = document.getElementById('add_cats');

        // Fail, pero por qué no funciona adecuadamente el 100% de las veces!? -> Pendiente

        /*      if (age_min_value <= age_max_value ){
                    console.log('El valor min es ' + age_min_value + ' y El valor max es ' + age_max_value)
                    x.innerHTML = '';
                    dibujar_gatos(gatos.filter((cat) => cat.edad>=age_min_value && cat.edad <= age_max_value))
                }else if(age_max_value < age_min_value){
                    alert('Haz seleccionado los valores al revés, ningún Gato es mayor a ' + age_min_value + ' Y menor a ' + age_max_value)
                } */

        console.log('El valor min es ' + age_min_value + ' y El valor max es ' + age_max_value)
        x.innerHTML = '';
        dibujar_gatos(gatos.filter((cat) => cat.edad >= age_min_value && cat.edad <= age_max_value))
    });
}

// Filtrar el elemento sex en la respuesta del JSON, y mostrar solo los gatos que cumplen con la condición dada en sexo.
// Limpia el DOM y dibuja la respuesta.
function check_sex(gatos) {
    $('#filter_cat_sex').click(function () {
        console.log('Entré a sex')
        let x = document.getElementById('add_cats');

        if ($('input[name=sex_m]').is(':checked')) {
            x.innerHTML = ''
            dibujar_gatos(gatos.filter((cat) => cat.sexo === 'macho'));
            return ('macho');
        } else if ($('input[name=sex_h]').is(':checked')) {
            x.innerHTML = ''
            dibujar_gatos(gatos.filter((cat) => cat.sexo === 'hembra'));
        } else {
            x.innerHTML = ''
            dibujar_gatos(gatos.filter((cat) => cat.sexo === 'macho' || cat.sexo === 'hembra')); // Dibujar en caso de ningún check puesto
        }
    });
}

// Filtrar el elemento color en la respuesta del JSON, y mostrar solo los gatos que cumplen con la condición dada en color.
// Limpia el DOM y dibuja la respuesta.
function check_color(gatos) {
    $('#filter_cat_color').click(function () {
        let x = document.getElementById('add_cats');
        let color_value = document.getElementById('filtro_color').value;
        let color = document.getElementById('filtro_color');

        x.innerHTML = ''
        dibujar_gatos(gatos.filter((cat) => cat.color === color_value));

        // --- En teoría esto es lo mismo qué lo que se está haciendo con JS puro, pero por qué no funca JQuery --- //
        /*Why this dont work!?
        $('#add_cats').innerHTML = '';

        Por qué no funciona con jQuery?????????
        let color_value = $('#filtro_color').value;
        console.log(color_value); */
    });
}

// Chequea los checkbox y el que esté seleccionado deshabilita el otro a modo de validación.
function check_sex_chck() {
    if ($('#checkm').is(':checked')) {
        $('#checkh').attr('disabled', true)
    } else {
        $('#checkh').attr('disabled', false)
    }

    if ($('#checkh').is(':checked')) {
        $('#checkm').attr('disabled', true)
    } else {
        $('#checkm').attr('disabled', false)
    }
}

// Togglea una clase a un determinado elemento
function rotate_container() {
    $('.container').toggleClass('container_rotate')
}

//  Obtiene el value escodigo por el usuario en ciertos inputs y los asigna a las variables globales
function getvaluerange() {
    console.log('Hola')
    age_min = $('#filtro_edad_range_min').val()
    age_max = $('#filtro_edad_range_max').val()
    let min_edad_cat = document.getElementById('min_edad');
    let max_edad_cat = document.getElementById('max_edad');

    min_edad_cat.innerText = age_min;
    max_edad_cat.innerText = age_max;

    age_min_value = age_min;
    age_max_value = age_max;

    console.log(age_min_value)
    console.log(age_max_value)
}

// Muestra una sección específica al cliquear en cierto elemento
$('.filtro__title__rspnsv').click(function () {
    $('.color_list_rspnsv').fadeIn();
});

// Cierra cierta sección específica al cliquear en determinado elemento
$('.close_filters svg').click(function () {
    $('.color_list_rspnsv').fadeOut();
});

/* $('input[type=checkbox]').on('change', function() {
    alert("Pruebas")
}); */



function dibujar_gatos(data) {
    console.log('Entré')
    let cont_cats = document.getElementById('add_cats');

    for (let i = 0; i < data.length; i++) {
        let box_back_cat = `<div class="box_card">
        <div class="container" onclick="rotate_container()">
            <div class="front card">
                <div>
                    <img src="${data[i].foto}" alt="gatito en adopción de color ${data[i].color}">
                </div>

            </div>
            <div class="back card">
                <div class="cont_back_card">
                    <ul>
                        <li><p>Nombre:</p> <span>${data[i].nombre}</span></li>
                        <li><p>Edad:</p> <span class="sex_cat">${data[i].edad} Años</span></li>
                        <li><p>Sexo:</p> <span>${data[i].sexo}</span></li>
                        <li><p>Color:</p> <span>${data[i].color}</span></li>
                        <li><p>Esterilizado:</p> <span>${data[i].esterilizado}</span></li>
                        <li><p>Vacunado:</p> <span>${data[i].vacunado}</span></li>
                        <li><p>Discapacidad:</p> <span>${data[i].discapacidad}</span></li>
                        <li><p>Estado:</p> <span>${data[i].estado}</span></li>
                        <button class="button btn_cats_adopt_me" onclick="adopt_me()">¡Adóptame!</button>
                    </ul>
                </div>
            </div>
            <div class="title">
                <p>${data[i].nombre}</p>
            </div>
        </div>
    </div>`
        cont_cats.innerHTML += box_back_cat
    }
}

// Abre el form de adopción al cliquear en el bitón de adopción.
function adopt_me() {
    console.log('click');
    $(".overlay_form").addClass("active_form_overlay");
    console.log('click_overlay');
    $(".popup_form").addClass("active_form");
}

// Cierra el form de adopció al cliquear en la X del form
$(".btn-cerrar-popup").click(e => {
    e.preventDefault();
    console.log('click');
    $(".overlay_form").removeClass("active_form_overlay");
    console.log('click_overlay');
    $(".popup_form").removeClass("active_form");
});

// Cuando se carga el DOM completamente ejecuta la funcón principal de llamada a los gatos.
window.onload = llamar_gatos();

// --------- Éste código está bueno pero no lo supimos implementar -------------------- //

/* let items = [];
let x;

const fetchData = () => {
  return new Promise(async function (resolve, reject) {
    try {
      fetch('/api_cards_landing.json', {
        method: 'GET',
      })
      .then(function (res) { return res.json() })
      .then(function (data) {
        return resolve({
          error: null,
          items: data
        });
      });
    } catch (e) {
      return reject({
        error: e.message,
        items: null,
      });
    }
  })
}

async function init () {
  items = await fetchData();
  console.log(items)
  x = items;
  console.log(x[0]);
}

init(); */