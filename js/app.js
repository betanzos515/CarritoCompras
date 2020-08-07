// VARIABLES
const carrito = document.querySelector('#carrito');
const cursos = document.querySelector('#lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventListener();

//LISTENERS.
function cargarEventListener(){
    // Dispara cuando se presiona agregar carrito
    cursos.addEventListener('click',comprarCurso);

    //cuando se elimina un curso del carrito
    carrito.addEventListener('click',eliminarCurso)

    //Al vaciar el carrito
    vaciarCarritoBtn.addEventListener('click',vaciarCarrito);

    //Al cargar la pagina se tiene que renderizar los cursos que persistieron en el LocalStorage.

    document.addEventListener('DOMContentLoaded',renderizarCursos);
}

//FUNCIONES
function comprarCurso(e){
    e.preventDefault();
    let curso = '';
    if(e.target.classList.contains('agregar-carrito')){
        curso = e.target.parentElement.parentElement;
        leerDatosCurso(curso);
    }
}

function leerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('p').textContent,
        id : curso.querySelector('a').getAttribute('data-id')
    }
    console.log(infoCurso);
    insertarCarrito(infoCurso);  
}

function insertarCarrito(infoCurso){
    const row = document.createElement('tr'); 
    row.innerHTML =`
        <td>
            <img src="${infoCurso.imagen}" width=100>
        </td>
        <td>${infoCurso.titulo}</td>
        <td>${infoCurso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${infoCurso.id}">X</a>
        </td>
    `;
    listaCursos.appendChild(row);
    guardarCursoLocalStorage(infoCurso)
}

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        let cursoEliminar = e.target.parentElement.parentElement;
        eliminarLocalStorage(cursoEliminar);
        cursoEliminar.remove();
        
    }
}
//elimina los cursos del carrito en el dom.
function vaciarCarrito(){
    //Existen dos formas de vaciar el carrito una mas rapida que la otra.
    /*Esta es la forma mas lenta pero con menos codigo
    istaCursos.innerHTML=''
    */
    //Esta es la forma mas optima para eliminar los elementos.
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }
    return false;
    localStorage.clear();
}


function guardarCursoLocalStorage(curso){
    let cursos = obtenerLocalStorage();
    cursos.push(curso);
    localStorage.setItem('cursos',JSON.stringify(cursos));
}

function obtenerLocalStorage(){
    let cursos;
    if(localStorage.getItem('cursos')== null){
        cursos = [];
    }
    else{
        cursos = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursos;
}

function renderizarCursos(){
    const cursos = obtenerLocalStorage();
    cursos.forEach(curso=>{
        const row = document.createElement('tr'); 
        row.innerHTML =`
            <td>
                <img src="${curso.imagen}" width=100>
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        `;
        listaCursos.appendChild(row);
    })
}

function eliminarLocalStorage(curso){
    let eliminar = curso.querySelector('a').getAttribute('data-id');
    const cursosStorage = obtenerLocalStorage();
    cursosStorage.forEach((curso,indice)=>{
        if(curso.id == eliminar){
            cursosStorage.splice(indice,1);
            localStorage.setItem('cursos',JSON.stringify(cursosStorage));
        }
    });
}

