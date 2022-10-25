// Función a ejecutar cuando el DOM ha sido cargado en total.
jQuery(document).ready(function ($) {
	console.log("Hola");
	console.log('Hola again')

	// Cuando la página termine de cargar deja de mostrar el Loader
	let loader = document.getElementById('loader_cont_id');
	window.addEventListener('load', function () {
		loader.style.display = 'none';
	});

	/* 	$(".bttn_sldr").click(function () {
			$(".cats_circle li").not(this).removeClass("active");
			$(this).addClass("active");
		}); */

	// Hamburguer Icon and Nav Mobile
	let nav = document.getElementById('nav_respnsv');
	let toggle = document.querySelector('.toggle');

	// Agregar clase para dar efectos al click del hamburguer icon
	// Y al nav en mobile para qué aparezca
	toggle.onclick = function () {
		console.log('entré')
		nav.classList.toggle('hamb_active_nav');
		$('.toggle').toggleClass('hamb_active');
	}

	/* ---------------------------------------------------------------- */
	// NAVs, efectos, redireccionamientos en sus tabs
	$("#enlace-menu").click(function () {
		$("body, html").animate({
			scrollTop: $("#menu_container").offset().top - 140
		}, 800);
	});

	$("#enlace-sobre-nosotros").click(function () {
		$("body, html").animate({
			scrollTop: $("#aboutus").offset().top - 140
		}, 800);
	});

	$("#enlace-menu_mbl").click(function () {
		$("body, html").animate({
			scrollTop: $("#menu_container").offset().top - 140
		}, 800);
		$('.toggle').removeClass('hamb_active');
		$("#nav_respnsv").removeClass('hamb_active_nav');
	});

	$("#enlace-sobre-nosotros_mbl").click(function () {
		$("body, html").animate({
			scrollTop: $("#aboutus").offset().top - 140
		}, 800);
		$('.toggle').removeClass('hamb_active');
		$("#nav_respnsv").removeClass('hamb_active_nav')
	});

	$("#reserva__button_mbl").click(function () {
		$("#nav_respnsv").removeClass('hamb_active_nav')
	});
	/* ---------------------------------------------------------------- */

	reorder_slider_cats_home()
});


/* ----------------------------------------------------------------------- */

// Fail: Esto era para cargar las imagenes de tantas en tantas con un botón
// hasta que llegara al final. Pero no fue posible hacerlo metiéndole animaciones,
// dejamos el código por útil pero lo deshabilitamos.
/* $(function(){
    $(".cafes__item").slice(0, 9).show(); // select the first ten
    $("#load_more").click(function(e){ // click event for load more
        e.preventDefault();
        $(".cafes__item:hidden").slice(0, 20).show(); // select next 10 hidden cafes__items and show them
    });
}); */

//---Load More in Gallery of food and pics---//
$('#load_more').click(function () {
	$('.cafes').toggleClass('load_more_height_first');
	let load_more = document.getElementById('load_more').innerText;
	console.log('El valor es: ' + load_more);

	if (load_more === "Ver Menos") {
		document.getElementById('load_more').innerText = 'Ver Más ';
	} else {
		document.getElementById('load_more').innerText = 'Ver Menos';
	}
});
// Métodos Alternos: Puedes ignorar esto //

/* 	switch (load_more) {
		case "Ver Más":
			document.getElementById('load_more').innerText = 'Ver Menos';
			break;
		case "Ver Menos":
			document.getElementById('load_more').innerText = 'Ver Más';
			break;
	} */

/* 	if (load_more = 'Load More') {
		console.log('Entré aquí');
		document.getElementById('load_more').innerText = 'View Less';
	}

	load_more = document.getElementById('load_more').innerText;
	console.log('El valor es: ' + load_more);

	if(load_more = 'View Less'){
		document.getElementById('load_more').innerText = 'View More';
	} */
/* ----------------------------------------------------------------------- */


//--- Effect Sections Specifics: At last time Slider Cats y Bloque de círculos ---//
// Acá viene el qué es probablemente uno de los dos fracasos más notables que tuvimos.
// Teníamos un efecto para hacer que las secciones aparezcan desde la derecha ó desde la izquierda cuando se entrara en ésa sección.
// Pero el NAV de la página se extendía más allá de lo qué se veía en el body, así que se "cortaba". No lo hemos podido solucionar,
// Ni con propiedades absolutas ni siquiera. Solo queda en el mazo mirar si con overflow hidden se puede. Pero al momento debido a
// lo del nav, aún estamos debatiendo si dejar ó no las animaciones de éste tipo. Igual dejamos el código de una de las soluciones qué
// encontramos porque es de los buenos.

// Animar desde la izquierda <-
/* const observer_left = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		console.log(entry);
		if (entry.isIntersecting) {
			entry.target.classList.add('show');
		}
		// else{
		//		entry.target.classList.remove('show');
		//	}
	});
});

const hiddenElements_left = document.querySelectorAll('.hidden_rgth');
hiddenElements_left.forEach((el) => observer_left.observe(el)); */

// Animar desde la derecha ->
/* const observer_right = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		console.log(entry);
		if (entry.isIntersecting) {
			entry.target.classList.add('show');
		}
		// else {
		//		entry.target.classList.remove('show');
		//	}
	});
});

const hiddenElements_right = document.querySelectorAll('.hidden_lft');
hiddenElements_right.forEach((el) => observer_right.observe(el)); */
/* ----------------------------------------------------------------------- */


// -- Efecto INTRO --- //
// Bienvenidos al segundo fracaso del proyecto. La segunda cosa con la que no pudimos por más que le dimos.
// Esta parte del código está bien. El problema es qué se maneja sola, decidimos dejarla en su punto más estable.

// Crear constantes con texto, tiempo y etiqueta que se va a pasar al DOM.
// Divide el texto, setea el DOM, almacena el valor a pasar, compara, almacena y mira longitud,
// y va agregando al DOM una a una cada letra generando un efecto de máquina de escribir.
const maquina4 = document.getElementById('maquina-escribir4')

const maquinaEscribir3 = (text = '', tiempo = 10, etiqueta = '') => {
	console.log('Hola')
	let arrayCaracteres = text.split('')
	etiqueta.innerHTML = ''
	let i = 0
	let j = text.length
	let escribir = setInterval(function () {
		if (i === arrayCaracteres.length) {
			etiqueta.innerHTML = text.substring(0, j)

			if (j === 0) {
				etiqueta.innerHTML = ''
				i = 0
				j = text.length
			}
		} else {
			etiqueta.innerHTML += arrayCaracteres[i]
			i++
		}
	}, tiempo)
}
maquinaEscribir3("En Aromas & Maullidos somos amantes del café, de crear bonitos recuerdos pero sobre todo de los gatos, por esa razón contamos con una zona exclusiva para que puedas disfrutar de la compañia de gatitos adoptables y degustar de nuestro menú.", 24, maquina4);


// El problema es que si agregamos cualquier evento que nos permita controlar la ejecución del efecto de máquina de escribir, se daña el efecto.
// Se ralentiza ó se detiene sencillamente, y pasa lo mismo si comenzamos a jugar con los valores. Ó, el caso contrario, va muy muy muy rápido.
// No sabemos como lograr que el evento espere a qué el usuario llegue a ésa sección sin qué se dañe. En caso de qué no veas el efecto
// recarga la página justo en el intro, en la frase debajo del header, en cuánto desaparezca el loader verás con un poco de suerte el efecto.
// Dejamos posteriormente algunos de los intentos fallidos de control del código:

/* $(".contenedor__intro").mouseenter(function () {
	console.log('Mouse entró');
	maquinaEscribir3("En Aromas & Maullidos somos amantes del café , de crear bonitos recuerdos pero sobre todo de los gatos, por esa razón contamos con una zona exclusiva para que puedas disfrutar de la compañia de gatitos adoptables, y degustar de nuestro menú.", 24, maquina4);
}); */

/* setTimeout(function() {
	maquinaEscribir3("En Aromas & Maullidos somos amantes del café , de crear bonitos recuerdos pero sobre todo de los gatos, por esa razón contamos con una zona exclusiva para que puedas disfrutar de la compañia de gatitos adoptables, y degustar de nuestro menú.", 24, maquina4);
}, 4000) */