var URL_cats = 'https://api.thecatapi.com/v1/images/search'
var api_key = 'live_nQaV2rAWiMpU642YGwytDwMDv6t48OAUVs1PklfDv92T8r2weL68u0jcBAYFLL4y'

buildCatsContent(50)


// Ésta función se conecta a la API de imagenes random de Gatos
// por medio de fetch.
async function get_cats_request(limit) {
    return new Promise((resolve) => {
        fetch(URL_cats + '?limit=' + limit + '&api_key=' + api_key, {
                method: 'GET',
            }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => resolve(response));
    });
};

// Tomar un límite para indicarle al DOM cuantas imagenes recibe
// como límite. Y las almacena, las guarda en un array vacío y retorna.
async function get_cats(limit) {
    if (limit === undefined) {
        limit = 50
    }
    response = await get_cats_request(limit)

    let array = []

    for (let i = 0; i < response.length; i++) {
        array.push(response[i].url)
    }

    return array
}


// Esta función recibe el límte indicado por el usuario, y el id que le indica en qué parte del html
// va a intervenir el DOM.
async function buildCatsContent(limit, id) {
    if (limit === undefined) {
        limit = 5
    }

    console.log('entro en tabla 2')
    data = await get_cats(limit)

    let table_data = document.getElementById('cats_adopted');

    for (let i = 0; i < data.length; i++) {
        let row = `<div>
                        <img src="${data[i]}">
                    </div>`
        table_data.innerHTML += row;
    }
}
// Nota: En ésta función hubo qué dejar el ID fijo ('cats_adopted') porque al pasarle el ID indicado de que
// vaya y busque en el DOM lo lanza como indefinido. La teoría es qué al agregar elementos a través del DOM
// se "congela" el html, ó no lo sabemos, porque estamos apuntando a un elemento qué existe desde el html y no se
// crea a través del DOM. Aún no tenemos respuesta a ésta incógnita.


/*
    Fail con Axios:
    async function get_cats_request1(limit){
    try{
        response = await axios.get(URL_cats + '?limit=' + limit  + '&api_key=' + api_key)
    }catch(error){
        console.error('Error', error);
    }
}
*/