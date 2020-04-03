//FUNCIONES GLOBALES

//Información hardcodeada con datos agregables de día, horarios y salas
var semana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
var horarios = ["09:00", "10:00", "11:00", "12:00", "13:00", "16:00","17:00","18:00","19:00","20:00"];
var salas = ["Sala VR", "Sala PC"];

//Funcion generar ID para clases
function generarId(length) {
    let id = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      id += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return id;
}

//Musica
function playMusic(musica, btnMusica){
    let audios = ['mario', 'pokemon', 'dragonball'];
    let btnAudios = ['btnMario', 'btnPokemon', 'btnDragonball'];
    for(let i = 0; i<audios.length; i++){
        if(audios[i]!=musica){
            let audio = document.getElementById(audios[i]);
            let btn = document.getElementById(btnAudios[i]);
            if(btn.getAttribute('onclick')==`pauseMusic('${audios[i]}', '${btnAudios[i]}')`){
                btn.setAttribute('onclick', `playMusic('${audios[i]}', '${btnAudios[i]}')`);
                document.getElementById(audios[i]).pause();
            }
        }  
    }
    document.getElementById(musica).play()
    document.getElementById(btnMusica).setAttribute('onclick', `pauseMusic('${musica}', '${btnMusica}')`);
}
function pauseMusic(musica, btnMusica){
    document.getElementById(musica).pause();
    document.getElementById(btnMusica).setAttribute('onclick', `playMusic('${musica}', '${btnMusica}')`);
}

//Funciones generales de local storage
function traerLocalStorage(nombreLS){
    return JSON.parse(localStorage.getItem(nombreLS));
}

function guardarLS(nombreLS, nombreArray){
    localStorage.setItem(nombreLS, JSON.stringify(nombreArray));
}

//Funciones sweet alert
function sweetAlertSinBtn(icono, mensaje){
    Swal.fire({
        icon: icono,
        title: mensaje,
        showConfirmButton: false,
        timer: 1500
      });
}



//Conseguir valor del btn del btn-group de '#Membresia'
$(function() {
    // Get click event, assign button to var, and get values from that var
    $('#Membresia button').on('click', function() {
      let thisBtn = $(this);
      
      thisBtn.addClass('active').siblings().removeClass('active');
      let btnValue = thisBtn.val();      
        document.getElementById('Membresia').value = btnValue;
    })
});

let position=0;
let colorPosition=0;
let colorarray = ['#F3F781', '#D8F781', '#9FF781', '#81F79F', '#81F7D8', '#81BEF7','#8181F7','#DA81F5', '#F78181', '#FAAC58']
//Funcion que cambia de color la nav y el footer
$(window).scroll(function() {
   
    if($("#menu").offset().top ==0){
      $('#menu').attr('style', `background-color: #ed9239;`);
      $('footer').attr('style', `background-color: #ed9239; color: black; font-family: gamer; font-size: 14px;`);
    } else if ($("#menu").offset().top % 50==0) {
        let newPosition = window.scrollY;
        if(newPosition>position){
            if(colorPosition==colorarray.length-1){
                position=window.scrollY;
                colorPosition=0;
            } else { position=window.scrollY;
                colorPosition++;}
        } else{
            position=window.scrollY;
            if(colorPosition!=0){
                colorPosition--;
            } else {
                colorPosition=colorarray.length-1;
            }
        }
        colorRnd = colorarray[colorPosition];
        console.log('position:' + colorPosition);
        console.log('color:'+colorRnd);
      $('#menu').attr('style', `background-color: ${colorRnd}`);
      $('footer').attr('style', `background-color: ${colorRnd};`);
    }
  });


 /*
//Funcion que cambia de color la nav y el footer
$(window).scroll(function() {
    if($("#menu").offset().top ==0){
      $('#menu').attr('style', `background-color: #ed9239;`);
      $('footer').attr('style', `background-color: #ed9239; color: black; font-family: gamer; font-size: 14px;`);
    } else if ($("#menu").offset().top % 50==0) {
      let colorRnd1 = Math.floor(Math.random()*255); 
      let colorRnd2 = Math.floor(Math.random()*255); 
      let colorRnd3 = Math.floor(Math.random()*255);
      let color = `(${colorRnd1},${colorRnd2},${colorRnd3})`; 
      $('#menu').attr('style', `background-color: rgb${color}`);
      $('footer').attr('style', `background-color: rgb${color};`);
    }
  });*/

//Función que cambia clases del scrollbar thumb - da animación a la img
window.addEventListener('scroll', () => {
    document.body.className = document.body.className === 'test' ? 'otra' : 'test';
});



//INICIO JUEGO

class juego{
    constructor(juego, tipoJuego, mentor, cupoMaximo, requiereVr, imgURL){
        this.id = generarId(20);
        
        this.juego=juego;
        this.tipoJuego = tipoJuego;
        this.mentor = mentor;
        this.requiereVr=requiereVr;
        this.cupoMaximo = cupoMaximo;
        this.imgURL = imgURL;
    }
}

//Función que agrega un nuevo juego al LS. Controla que el cupo sea acorde a la sala. Cierra modal
//Controla: campos vacíos y cupos. No controla nombre del juego repetido.
function agregarJuego(){
    let nombreJuego = document.getElementById('juego').value;
    let tipoJuego = document.getElementById('tipoJuego').value;
    let mentor = document.getElementById('mentor').value;
    let requiereVr = document.getElementById('requiereVr').checked;
    let cupoMaximo = document.getElementById('cupoMaximo').value;
    let imgURL = document.getElementById('imgUrl').value;

    if(nombreJuego=="" || mentor=="" || imgURL==""){
        sweetAlertSinBtn('error', 'Complete todos los campos');
    } else if(requiereVr && cupoMaximo>4){
        sweetAlertSinBtn('error', 'Para los juegos VR el cupo máximo no puede ser mayor a 4');
        
    } else if(!requiereVr && cupoMaximo>30) {
        sweetAlertSinBtn('error', 'Para los juegos de PC el cupo máximo no puede ser mayor a 30');
    } else {
        let nuevoJuego = new juego(nombreJuego, tipoJuego, mentor, cupoMaximo, requiereVr, imgURL);
        let juegosLS = traerLocalStorage('juegos');
        if(!juegosLS){
            juegosLS = [];
        } 
        juegosLS.push(nuevoJuego);
        guardarLS('juegos', juegosLS);
        sweetAlertSinBtn('success', `El juego ${nombreJuego} fue correctamente creado y está disponible para sumar a la grilla de horarios`);
        cerrarYvaciarAddJuego();
    }
}

//Funcion que completa el modal de tipos de juego en el modal de agregar juego
function selectTipoJuegoModal(){
    let selectTipoJuego = document.getElementById('tipoJuego');
    selectTipoJuego.innerHTML ="";
    let tiposJuego = traerLocalStorage('tipoJuego');
    if(!tiposJuego){
        let nuevoSelectOption = document.createElement('option');
        nuevoSelectOption.innerText = "No hay tipos de juego creados";
        selectTipoJuego.appendChild(nuevoSelectOption);
        sweetAlertSinBtn('error', 'Agregue primero un tipo de juego');
    } else {
        for(let i =0; i<tiposJuego.length; i++){
            let nuevoSelectOption = document.createElement('option');
            nuevoSelectOption.innerText = tiposJuego[i].nombre;
            nuevoSelectOption.setAttribute("value", tiposJuego[i].nombre);
            selectTipoJuego.appendChild(nuevoSelectOption);
        }
    }
}


//Función que cierra y vacía modal de agregar Juego. Se usa en fcion AgregarJuego
function cerrarYvaciarAddJuego(){
    $('#AddJuego').modal('hide');
    document.getElementById('juego').value = "";
    document.getElementById('mentor').value = "";
    document.getElementById('cupoMaximo').value = "1";
}
//FIN JUEGO



//INICIO TIPO JUEGO
class tipoJuego{
    constructor(nombre){
        this.id = generarId(20);
        this.nombre = nombre;
    }
}

//Función que agrega un nuevo juego al LS. Controla que el cupo sea acorde a la sala. Cierra modal
//Controla: campos vacíos y cupos. No controla nombre del juego repetido.
function agregarJuego(){
    let nombreJuego = document.getElementById('juego').value;
    let tipoJuego = document.getElementById('tipoJuego').value;
    let mentor = document.getElementById('mentor').value;
    let requiereVr = document.getElementById('requiereVr').checked;
    let cupoMaximo = document.getElementById('cupoMaximo').value;
    let imgURL = document.getElementById('imgUrl').value;
    if(nombreJuego=="" || mentor=="" || imgURL == '' || cupoMaximo == ''){
        sweetAlertSinBtn('error', 'Complete todos los campos');
    } else if(requiereVr && cupoMaximo>4){
        sweetAlertSinBtn('error', 'Para los juegos VR el cupo máximo no puede ser mayor a 4');
        
    } else if(!requiereVr && cupoMaximo>30) {
        sweetAlertSinBtn('error', 'Para los juegos de PC el cupo máximo no puede ser mayor a 30');
    } else {
        let nuevoJuego = new juego(nombreJuego, tipoJuego, mentor, cupoMaximo, requiereVr, imgURL);
        let juegosLS = traerLocalStorage('juegos');
        if(!juegosLS){
            juegosLS = [];
        } 
        juegosLS.push(nuevoJuego);
        guardarLS('juegos', juegosLS);
        sweetAlertSinBtn('success', `El juego ${nombreJuego} fue correctamente creado y está disponible para sumar a la grilla de horarios`);
        cerrarYvaciarAddJuego();
    }
}
//Funcion que agrega categoria y la almacena en LS.
//Controla: no se repita nombre del tipo de juego
function agregarCategoria(){
    let tiposJuego = traerLocalStorage('tipoJuego');
    if(!tiposJuego){
        tiposJuego=[];
    }
    let tipoJuegoNombre = document.getElementById('input_categoria').value;
    if(tipoJuegoNombre==""){
        sweetAlertSinBtn('error', 'Ingrese un tipo de juego');
    } else {
        let existe = tiposJuego.find(elemento => elemento.nombre.toUpperCase() == tipoJuegoNombre.toUpperCase());
        if(existe){
            sweetAlertSinBtn('error', 'Ese tipo de juego ya existe');
        } else {
            let nuevoTipoJuego = new tipoJuego(tipoJuegoNombre);
            tiposJuego.push(nuevoTipoJuego);
            guardarLS('tipoJuego', tiposJuego);
            cerrarYvaciarAgregarCategoria();
            sweetAlertSinBtn('success', 'El tipo de juego '+tipoJuegoNombre+" ha sido creado");
        }
    }
}

//Funcion que cierra y vacía modal agregarCategoria.
//Se usa en fcion agregarCategoria
function cerrarYvaciarAgregarCategoria(){
    $('#AddCategory').modal('hide');
    document.getElementById('input_categoria').value = "";
}

//Funcion que trae todos los tipos de juego y llena el select
function selectTipoJuegoModal(){
    let selectTipoJuego = document.getElementById('tipoJuego');
    selectTipoJuego.innerHTML ="";
    let tiposJuego = traerLocalStorage('tipoJuego');
    if(!tiposJuego){
        let nuevoSelectOption = document.createElement('option');
        nuevoSelectOption.innerText = "No hay tipos de juego creados";
        selectTipoJuego.appendChild(nuevoSelectOption);
        sweetAlertSinBtn('error', 'Agregue primero un tipo de juego');
    } else {
        for(let i =0; i<tiposJuego.length; i++){
            let nuevoSelectOption = document.createElement('option');
            nuevoSelectOption.innerText = tiposJuego[i].nombre;
            nuevoSelectOption.setAttribute("value", tiposJuego[i].nombre);
            selectTipoJuego.appendChild(nuevoSelectOption);
        }
    }
}

//Funcion que carga el select segun uso de VR o no. Se llama en la semana - ventana admin
function cargarSelect(esVR){
    let juegos = traerLocalStorage('juegos');
    let juegosFiltrados = [];

    if(esVR){
    juegosFiltrados = juegos.filter(juego => juego.requiereVr == true);    
    } else {
    juegosFiltrados = juegos.filter(juego => juego.requiereVr == false);
    }

    let selectJuegos = document.getElementById('juegos');
    selectJuegos.innerHTML="";
    for(let i = 0; i<juegosFiltrados.length; i++){
        let newSelect = document.createElement('option');
        newSelect.innerText = juegosFiltrados[i].juego;
        selectJuegos.appendChild(newSelect);
    }
}
//FIN TIPO JUEGO


//INICIO TURNO
class turno {
    constructor(dia, hora, juego, sala, cupo){
        this.id = generarId(20);
        
        this.dia = dia;
        this.hora = hora;
        this.juego = juego;
        this.sala = sala;
        this.alumnos = [];
        this.cupoDisponible = cupo;
    }
}

function agregarTurno(dia, horario, sala, cupo, imgUrl){
    $('#AddAsignarJuego').modal('toggle');
    $('#AddAsignarJuego').modal('show');
    document.getElementById('diaModal').value = dia;
    document.getElementById('horarioModal').value = horario;
    document.getElementById('salaModal').value = sala;
    document.getElementById('cupoModal').value = cupo;
    document.getElementById('imgUrlModal').value = imgUrl;


    let requiereVr = sala == "Sala VR" ? true : false;
    cargarSelect(requiereVr);
}

//Funcion que crea un nuevo turno desde el acordeon del administrador
function crearTurno(){
    let dia = document.getElementById('diaModal').value
    let horario = document.getElementById('horarioModal').value;
    let sala = document.getElementById('salaModal').value;
    let cupo = document.getElementById('cupoModal').value;
    let juego = document.getElementById('juegos').value;

    let nuevoTurno = new turno(dia, horario, juego, sala, cupo)
    let turnos = traerLocalStorage('turnos');
    turnos = !turnos ? [] : turnos;
    turnos.push(nuevoTurno);
    guardarLS('turnos', turnos);
    sweetAlertSinBtn('success', `Turno guardado: ${dia} - ${horario} - ${juego}`);
    $('#AddAsignarJuego').modal('hide');
    generarAcordeones();
}

//Funcion que trae la informacion del turno segun dia y hora y devuelve los datos de un horario específico
function getTurnos(dia, hora){
    let turnos = traerLocalStorage('turnos');
    if(!turnos) {
        return false;
    } else {
        let turnosPorDia = turnos.filter(turno => turno.dia == dia);
        if(!turnosPorDia) {
            return false;
        } else {
            let turnosPorHora = turnosPorDia.filter(turno => turno.hora == hora);
            if(!turnosPorHora || turnosPorHora.length==0){
                return false;
            } else {
                return turnosPorHora;
            }
        }
    }
}

//Funciones para generar las salas: vacias y llenas, retornan string para asignar al interior de la rowSala del dia
function generarSalaVacia(dia, horario, sala){
    let cupo = sala=="Sala VR" ? 4 : 30;
    let img = sala=="Sala VR" ? './img/headset.png' : './img/monitor.png';
    let salaVacia = `
    <!--Inicio de sala: ${sala}-->
        <div class="col-sm-6 bg-primary">
            <div class="card">
                <div class="card-body">
                    <img src="${img}" alt="">
                    <h5 class="card-title font-weight-bold mt-2">${sala}</h5>
                    <button class="btn btn-primary border border-dark animated pulse infinite rounded-pill px-5" onclick="agregarTurno('${dia}', '${horario}', '${sala}', '${cupo}')">Agregar</button>
                </div>
            </div>
        </div>
    <!--Fin de Sala: ${sala}-->
    `;
    return salaVacia;
}

//Funcion que genera una sola que ya tiene asignado un juego
function generarSalaOcupada(turno){
    let img = turno.sala=="Sala VR" ? './img/headset.png' : './img/monitor.png';
    let salaOcupada = `
    <!--Inicio de sala: ${turno.sala}-->
        <div class="col-sm-6 bg-primary">
            <div class="card">
                <div class="card-body">
                    <img src="${img}" alt="">
                    <h5 class="card-title font-weight-bold mt-2">${turno.juego}: ${turno.cupoDisponible} cupo máx.</h5>
                    <button class="btn btn-danger border border-dark animated pulse infinite rounded-pill px-5" onclick="eliminarTurno('${turno.id}')">Eliminar</button>
                </div>
            </div>
        </div>
    <!--Fin de Sala: ${turno.sala}-->
    `;
    return salaOcupada;
}

//Funcion que genera el acordeon con los datos de los turnos de la semana
function generarAcordeones(){
    let divSemana = document.getElementById('semana');
    for(let i=0; i<semana.length;i++){
        let acordeon = document.createElement('div');
        acordeon.setAttribute('class', 'accordion');
        let idAcordeon = 'accordion'+semana[i];
        acordeon.setAttribute('id', idAcordeon);
        let idBody = "cardBody"+semana[i];
        let acordeonCard = `
        <!--Inicio de Card ${semana[i]}-->
                <div class="card text-center bg-primary" >
                  <div class="card-header" id="headingOne">
                    <h2 class="mb-0">
                      <button class="btn btn-link text-white" onclick="generarSalas('${semana[i]}', '09:00')"  type="button" data-toggle="collapse" data-target="#${semana[i]}" aria-expanded="false" aria-controls="collapseOne">
                        ${semana[i]}
                      </button>
                    </h2>
                  </div>
                  <div id="${semana[i]}" class="collapse" style="background-image: url(./img/pacman.png); background-color: black;" aria-labelledby="headingOne" data-parent="#${idAcordeon}">
                    <div class="card-body" id="${idBody}">
                        
                    </div>
                    <h5 class='text-center text-white' id='tituloHorarios${semana[i]}'>Horario seleccionado: 09:00 hs.</h5>
                    <div class="card card-body" style="background-image: url(./img/pacman.png); background-color: black;">
                        <div class="row" id="rowSalas${semana[i]}">
                        </div>
                    </div>
                  </div>
                </div>
                <!--Final de Card ${semana[i]}-->
        `;
        divSemana.appendChild(acordeon);
        document.getElementById(idAcordeon).innerHTML = acordeonCard;
        generarHorarios(semana[i], idBody);
        
    }
}

//Funcion que elimina un turno del listado de turnos
function eliminarTurno(id){
    let turnos = traerLocalStorage('turnos');
    let index = turnos.findIndex(turno => turno.id == id);
    if(turnos[index].alumnos.length==0){
        turnos.splice(index, 1);
        guardarLS('turnos', turnos);
        sweetAlertSinBtn('success', 'Turno eliminado');
        generarAcordeones();
    } else {
        sweetAlertSinBtn('error', 'No podés borrar un turno con alumnos inscriptos!');
    }
    
}

//Funcion que vacia el LS del usuario Logueado. Se ejecuta en: login y cuando se desloguea el usuario
function limpiarLsUsuarioLogueado(){
    let usuarioLogueado = traerLocalStorage('usuarioLogueado');
    if(usuarioLogueado){
        localStorage.removeItem('usuarioLogueado');
        $('#AddExit').modal('hide');
        location.href = "inicio.html";
    }
}

//Funcion que genera los botones de los horarios con las funciones que traen la info de las salas
//Se llama en generarAcordeones
function generarHorarios(dia, idCardBody){
    let cardBody = document.getElementById(idCardBody);
    for(let i =0; i < horarios.length; i++){
        let btn = document.createElement("button");
        btn.innerText = horarios[i];
        btn.setAttribute('class', 'btn btn-primary mx-2 my-1');
        btn.setAttribute('onclick', `generarSalas('${dia}', '${horarios[i]}')`);
        cardBody.appendChild(btn);
    }

}

//Esta función genera las salas segun dia y horario y las inserta en la row correspondiente al dia
function generarSalas(dia, horario){
    let idSalasBody = "rowSalas"+dia;
    let salasBody = document.getElementById(idSalasBody);
    salasBody.innerHTML ="";
    let salasEnUso = getTurnos(dia, horario);
    if(!salasEnUso || salasEnUso==false){
        for(let i=0; i<salas.length;i++){
            salasBody.innerHTML+= generarSalaVacia(dia, horario, salas[i]);
        }
    } else {
        for(let i=0; i<salas.length;i++){
            let salaUsandose = salasEnUso.filter(turno => turno.sala==salas[i]);
            salasBody.innerHTML += salaUsandose.length>0 ? generarSalaOcupada(salaUsandose[0]) : generarSalaVacia(dia, horario, salas[i]);
        }
    }
    let idH5 = 'tituloHorarios'+dia;
    document.getElementById(idH5).innerText = `Horario seleccionado: ${horario} hs.`;
}

//FIN TURNO


//INICIO CLIENTE
//Hardcode de administrador
const administrador = {
    usuario: "admin",
    pass: "admin"
}


//Class cliente
class cliente{
    constructor(nombre, apellido, dni, telefono, observaciones, membresia){
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.telefono = telefono;
        this.observaciones = observaciones;
        this.membresia = membresia;
        this.usuario = dni;

        this.id = generarId(20);
        this.pass = generarId(4);
        this.habilitado = true;
        this.horasSemanalesOcupadas = 0;
        this.clasesSemana=[];
    }
}

//Login - Admin y usuario - Cambio de contraseña del cliente cuando ingresa por primera vez
function loginUsuario() {
    event.preventDefault();
    let usuario = document.getElementById("input_usuario").value;
    let pass = document.getElementById("input_password").value;

    if(usuario==null || usuario==undefined || usuario ==""){
        sweetAlertSinBtn('error', 'Ingrese un usuario');
    } else if(pass==null || pass==undefined || pass.length <4){
        sweetAlertSinBtn('error', 'Ingrese una password');
    } else {
        if(usuario=="admin" && pass == "admin"){
            location.href = "agregarCliente.html";
            listarClientes();
        } else {
            let listadoClientes = traerLocalStorage('clientes');
            if(!listadoClientes){
                sweetAlertSinBtn('error', 'No hay clientes registrados');
            } else {
                let usuarioExiste = listadoClientes.find(cliente => cliente.usuario == usuario);
                if(!usuarioExiste){
                    sweetAlertSinBtn('error', 'Usuario no registrado');
                } else {
                    let indexUsuario= listadoClientes.findIndex(cliente => cliente.usuario==usuario);
                    if(pass!=listadoClientes[indexUsuario].pass){
                        sweetAlertSinBtn('error', 'Contraseña incorrecta')
                    } else {
                       if(listadoClientes[indexUsuario].pass.length==4){
                        document.getElementById('form_login').innerHTML = `<label class="mb-2" style="font-family: gamer;" for="input_nuevaPass">Nueva Contraseña</label> <br><input placeholder="******" type="password" id="input_nuevaPass"><br>
                        <button class="btn btn-primary text-white mt-4 px-5" type="button" onclick="modificarPass(${indexUsuario})">Cambiar Password</button>`;       
                    } else {
                                let usuarioLogueado = traerLocalStorage('usuarioLogueado');
                                if(!usuarioLogueado){
                                    usuarioLogueado = [];
                                }
                                usuarioLogueado.push(listadoClientes[indexUsuario]);
                                guardarLS('usuarioLogueado', usuarioLogueado);
                                location.href = "clientes.html";
                               
                       }
                    }
                }
            }
    
        }
    }
}

//Funcion que modifica la Pass del usuario la primera vez que ingresa y la guarda en LS
function modificarPass(usuarioId){
    let nuevaPass = document.getElementById('input_nuevaPass').value;
    if(!nuevaPass){
        sweetAlertSinBtn('error', 'Ingresa una nueva contraseña!')
    } else {
        if(nuevaPass.length<6){
            sweetAlertSinBtn('error', 'La contraseña debe tener al menos 6 caracteres');
        } else {
            let listadoClientes = traerLocalStorage('clientes');
            listadoClientes[usuarioId].pass = nuevaPass;
            guardarLS('clientes', listadoClientes);
            sweetAlertSinBtn('success', 'Contraseña actualizada correctamente');
            setTimeout(()=>location.href = "index.html", 1500);
        }
    }
}

//Crear cliente
function crearCliente(){
    let nombre = document.getElementById('Nombre').value;
    let apellido = document.getElementById('Apellido').value;
    let telefono = document.getElementById('Telefono').value;
    let observaciones = document.getElementById('Observaciones').value;
    let membresia = document.getElementById('Membresia').value;
    let dni = document.getElementById('DNI').value;
    if(nombre==undefined || apellido==undefined || telefono==undefined || dni==undefined || nombre=='' || apellido=='' || dni==''){
        sweetAlertSinBtn('error', 'Llene todos los campos');
    } else {
        let listadoClientes = traerLocalStorage('clientes');
        
        if(!listadoClientes){
            listadoClientes=[];
        }
    
        let dniExiste = false;
        if(listadoClientes.length>0){
            dniExiste = listadoClientes.find(cliente => cliente.dni == dni);
        }
        if(dniExiste){
            sweetAlertSinBtn('error', 'El usuario ya está en uso');
        } else if(dni.length<7 || dni.length>8){
            sweetAlertSinBtn('error', 'El dni debe tener entre 7 y 8 caracteres');
        } else if(telefono.length<9 || telefono.length>11){
            sweetAlertSinBtn('error', 'El teléfono tiene que tener entre 9 y 11 caracteres');
        } else {
            observaciones? observaciones: observaciones="No hay observaciones";
            let nuevoCliente = new cliente(nombre, apellido, dni, telefono, observaciones, membresia);
            listadoClientes.push(nuevoCliente);
            guardarLS('clientes', listadoClientes);
            sweetAlertSinBtn('success', `Nuevo cliente: ${nombre} ${apellido}`);
            cerrarYvaciarAddClientModal();
            
            listarClientes();
            
        }
    }
}

//Funcion que cierra y vacia modal de AddCliente
function cerrarYvaciarAddClientModal(){
    $('#AddClient').modal('hide');
    document.getElementById('Nombre').value = "";
    document.getElementById('Apellido').value = "";
    document.getElementById('Telefono').value = "";
    document.getElementById('Observaciones').value = "";
    document.getElementById('Membresia').value = "";
    document.getElementById('DNI').value = "";
}

//Listar clientes
function listarClientes(){
    let listadoClientes = traerLocalStorage('clientes');
    if(!listadoClientes){
        listadoClientes=[];
    }
    if(listadoClientes.length==0){
        sweetAlertSinBtn('info', 'No tiene clientes creados');
    } else {
        let contenedorListaClientes = document.getElementById('listadoClientes');
        contenedorListaClientes.innerHTML="";
        for (let index = 0; index < listadoClientes.length; index++) {
            let nombre = listadoClientes[index].nombre;
            let apellido = listadoClientes[index].apellido;
            let telefono = listadoClientes[index].telefono;
            let dni = listadoClientes[index].dni;
            let membresia = listadoClientes[index].membresia;
            if(membresia=="Bronce"){
                membresia="./img/bronze.png";
            } else if(membresia=="Plata"){
                membresia="./img/silver.png";
            } else if(membresia =="Oro"){
                membresia="./img/oro.png";
            } else {
                membresia="./img/champion.png";
            }


            let id = listadoClientes[index].id;
            let observaciones = listadoClientes[index].observaciones;
            let habilitado = listadoClientes[index].habilitado;

            let card = document.createElement('div');
            card.setAttribute("class", "col mb-5");
            card.innerHTML = `
            <div class="col mb-5">
                <div class="card h-100" style="box-shadow: 2px 2px 3px 0px rgba(163,163,163,0.75);">
                <div style="max-width: 540px;">
                    <div class="row no-gutters"  >
                    <div class="col-4 col-lg-4 col-md-12" style="background-image: url(./img/marco.png);">
                        <img src="./img/folder.png"  max class="img-fluid mt-5" alt="...">
                    </div>
                    <div class="col-8 col-lg-8 col-md-12" style="background-color: #ffffff;">
                        <nav>
                        <div class="nav nav-tabs" id="nav-tab" role="tablist" style="background-color: #ed9239;">
                            <a class="nav-item nav-link active" id="nav-home-tab-${id}" data-toggle="tab" href="#nav-home-${id}" role="tab" aria-controls="nav-home-${id}" aria-selected="true"><img src="./img/xbox.png" /></a>
                            <a class="nav-item nav-link" id="nav-profile-tab-${id}" data-toggle="tab" href="#nav-profile-${id}" role="tab" aria-controls="nav-profile-${id}" aria-selected="false"><img src="./img/laptop.png" /></a>
                            <a class="nav-item nav-link" id="nav-contact-tab-${id}" data-toggle="tab" href="#nav-contact-${id}" role="tab" aria-controls="nav-contact-${id}" aria-selected="false"><img src="./img/hp.png" /></a>
                        </div>
                        </nav>
                        <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-home-${id}" role="tabpanel" aria-labelledby="nav-home-${id}-tab-${id}"><div class="card-body">
                            <p class="card-title">${nombre} ${apellido}</p>
                            <!--Condición-->
                            <div id="btn-membresia">
                            <button type="button"  class="btn text-success" id="btnHabilitado-${id}" onclick="habilitarUsuario('${id}')"><i class="fas fa-gamepad" style="font-size: 30px;"></i> Activado</button>
                            <button type="button"  class="btn text-danger" id="btn-suspendido-${id}" onclick="suspenderUsuario('${id}')"><i class="fas fa-skull-crossbones" style="font-size: 30px;"></i> Suspendido</button>
                            </div>
                        </div></div>
                        <div class="tab-pane fade text-center mt-2 mb-3" id="nav-profile-${id}" role="tabpanel" aria-labelledby="nav-profile-tab-${id}"><i class="fas fa-id-card mt-2 mr-2" style="font-size: 20px;"></i>${dni}<br><i class="fas fa-phone mt-2 mr-2 " style="font-size: 20px;"></i>${telefono}<br><img src="${membresia}" class="img-fluid mt-1 mb-1" alt="Responsive image" style="max-height: 72px; max-width: 72px;"></div>
                        <div class="tab-pane fade mt-4 text-center" id="nav-contact-${id}" role="tabpanel" aria-labelledby="nav-contact-tab-${id}"><i class="fas fa-first-aid mt-4 mr-2" style="font-size: 30px;"></i><div class="mt-3 mb-5">${observaciones}</div></div>
                        </div>
                    </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>`
            contenedorListaClientes.appendChild(card);

            let btnHabilitado = `btnHabilitado-${id}`;
            let btnSuspendido = `btn-suspendido-${id}`;
            habilitado? document.getElementById(btnHabilitado).disabled=true : document.getElementById(btnHabilitado).disabled=false;
            habilitado? document.getElementById(btnHabilitado).setAttribute("class", "btn border border-success") : document.getElementById(btnHabilitado).setAttribute("class", "btn text-success");
            
            !habilitado? document.getElementById(btnSuspendido).disabled=true : document.getElementById(btnSuspendido).disabled=false;
            !habilitado? document.getElementById(btnSuspendido).setAttribute("class", "btn border border-danger"):document.getElementById(btnSuspendido).setAttribute("class", "btn text-danger");
                    
        }
    }
}

//Funcion que cambia la habilitacion del usuario a true
function habilitarUsuario(id){
    let listadoClientes = traerLocalStorage('clientes');
    let indexCliente = listadoClientes.findIndex(cliente => cliente.id==id);
    listadoClientes[indexCliente].habilitado = true;
    guardarLS('clientes', listadoClientes);
    sweetAlertSinBtn('success', `Usuario ${listadoClientes[indexCliente].nombre} ${listadoClientes[indexCliente].apellido} habilitado`);
   listarClientes();
    
}
//Funcion que cambia la habilitacion del usuario a false
function suspenderUsuario(id){
    let listadoClientes = traerLocalStorage('clientes');
    let indexCliente = listadoClientes.findIndex(cliente => cliente.id==id);
    listadoClientes[indexCliente].habilitado = false;
    sweetAlertSinBtn('success', `Usuario ${listadoClientes[indexCliente].nombre} ${listadoClientes[indexCliente].apellido} suspendido`);
    guardarLS('clientes', listadoClientes);
    listarClientes();
}
//FIN CLIENTE


//Funcion del administrador que reinicia la semana completa, en clientes y en turnos
function borrarSemanaCompleta(){
    let clientes = traerLocalStorage('clientes');
    let turnos = traerLocalStorage('turnos');

    for(let i=0; i<clientes;i++){
        clientes[i].clasesSemana = [];
    }
    for(let i=0; i<turnos;i++){
        turnos[i].alumnos = [];
    }
    sweetAlertSinBtn('success', 'La semana se ha reseteado');
}

//FUNCIONES DEL LADO DEL CLIENTE

//Funcion que pone el nombre del usuario en la nav
function getNombreUsuario(){
    let usuarioLogueado = traerLocalStorage('usuarioLogueado')[0];
    document.getElementById('Usuario').innerText = usuarioLogueado.nombre + ' ' + usuarioLogueado.apellido;
}

//Funcion que trae cuantos turnos le quedan disponibles al cliente
//Consigue los datos desde el LS
function turnosRestantes(){
    let cliente = traerLocalStorage('usuarioLogueado')[0];
    let membresia=0;
    switch(cliente.membresia){
        case 'Bronce': membresia=2; break;
        case'Plata': membresia=3; break;
        case 'Oro': membresia=4; break;
        case 'Champion': membresia=6; break;
    }
    let turnosRestantes = membresia - cliente.clasesSemana.length;
    if(turnosRestantes>0){
        document.getElementById('vidas').innerText = 'X '+turnosRestantes;
    } else {
        document.getElementById('vidas').innerText = 'X 0';
        noTieneTurnosRestantes();
    }
}

//Funcion accesoria que transforma la membresia en horas disponibles
function switchMembresia(membresiaCliente){
    let membresia;
    switch(membresiaCliente){
        case 'Bronce': membresia=2; break;
        case'Plata': membresia=3; break;
        case 'Oro': membresia=4; break;
        case 'Champion': membresia=6; break;
    }
    return membresia;
}

//Funcion que se ejecuta cuando el usuario no tiene más turnos disponibles: Game over
function noTieneTurnosRestantes(){
    let divTurnos = document.getElementById('divTurnos');
    divTurnos.innerHTML = ``;
}

//Funcion accesoria que devuelve un string con el nombre del dia sigte
function switchDay(dia){
    let diaSigte;
    switch(dia){
        case 1: diaSigte = 'Martes'; break;
        case 2: diaSigte='Miércoles'; break;
        case 3: diaSigte='Jueves'; break;
        case 4: diaSigte='Viernes'; break;
        case 5: diaSigte='Sábado'; break;
        case 6: diaSigte='Lunes'; break;
        case 6: diaSigte='Lunes'; break;
    }
    return diaSigte;
}

//Funcion que trae los turnos del dia siguiente. Si es sabado trae los del lunes
function turnosDiaSigte(){
    let turnosAsignados = traerLocalStorage('turnos');
    if(!turnosAsignados){
        turnosAsignados=[];
    }
    let dia = new Date().getDay();
    let diaSigte = switchDay(dia);
    let findDia = turnosAsignados.find(turno=> turno.dia==diaSigte);
    if(!findDia){
        document.getElementById('gameOver').innerHTML = `<h5 style="font-family: gamer;">No hay turnos para el dia de mañana</h5><img src="./img/gameover.gif" style="max-width: 300px;" alt="">`;
    } else {
        let turnosFiltradosPorDiaSgte = turnosAsignados.filter(turno=> turno.dia==diaSigte);
        if(turnosFiltradosPorDiaSgte.length==0){
            document.getElementById('gameOver').innerHTML = `<h5 style="font-family: gamer;">No hay turnos para el dia de mañana</h5><img src="./img/gameover.gif" style="max-width: 300px;" alt="">`;
        } else {
            let divTurnos = document.getElementById('divTurnos');
        divTurnos.innerHTML = '';
    
        for(let i = 0; i < turnosFiltradosPorDiaSgte.length; i++){
            if(turnosFiltradosPorDiaSgte[i].cupoDisponible==0){
                divTurnos.innerHTML+= crearTurnoVacio(turnosFiltradosPorDiaSgte[i]);
            }
            else {
                divTurnos.innerHTML+=crearTurnoConCupo(turnosFiltradosPorDiaSgte[i]);
            }
        }
        }
        
    }
    
    
}

//Funcion que crea un turno sin cupo y lo retorna
function crearTurnoVacio(turno){
    let juegos = traerLocalStorage('juegos');
    let index = juegos.findIndex(juego => juego.juego == turno.juego);
    let imgUrl = juegos[index].imgURL;
    
    let img = turno.sala == "Sala VR" ? "./img/headset.png" : "./img/monitor.png";
    return `<!--Inicio Card-->  
    <div class="card text-white text-center mx-auto mb-5" style="width: 270px; background: transparent;">
      <div class=" mb-0" style="background-color: #ff971f;">
        <img src="${imgUrl}" alt="" style="height: 10rem; width: 100%; ">
        <p class=" bg-primary text-white" style="color:orangered;">${turno.hora}</p>
        <h5 class=" font-weight-bold mt-1 text-white" style="color:orangered; font-family: gamer; font-size: 18px;">${turno.juego}<img class="ml-2" src="${img}" style=" max-width: 50px;" alt=""></h5>
        <footer id="menu" class="mt-2 text-white" style="background: red;">
          <p style="color: black; font-family: Arial, Helvetica, sans-serif;">Sin cupo disponible</p>
          <button class="bg-primary border infinite border-0 text-white mx-5 mb-2 px-3 py-1 text-center rounded-pill"
          style="font-size: 15px; disabled"><i class="fas fa-caret-right mr-2"></i>Agregar<i
            class="fas fa-caret-left ml-2"></i></button>
        </footer>
      </div>
    </div>
    <!--Fin Card-->`;
}

//Funcion que crea un turno con cupo disponible
function crearTurnoConCupo(turno){
    let juegos = traerLocalStorage('juegos');
    let index = juegos.findIndex(juego => juego.juego == turno.juego);
    let imgUrl = juegos[index].imgURL;
    let usuarioLogueado = traerLocalStorage('usuarioLogueado')[0];
    
    let turnos = traerLocalStorage('turnos');
    let turnoElegido = turnos.filter(elemento => elemento.id == turno.id);
    let usuarioEnClase = turnoElegido[0].alumnos.findIndex(alumno => alumno==`${usuarioLogueado.nombre} ${usuarioLogueado.apellido}`);
    let disabled = usuarioEnClase!=-1 ? `<p class=' mx-2 mb-2 px-3 pb-4' style="padding-botom:font-family: Arial, Helvetica, sans-serif;">Ya estás inscripto a esta clase</p>` : `<button class="animated pulse bg-primary border infinite mt-4 border-0 text-white mx-5 px-3 py-1 text-center rounded-pill" style="font-size: 15px; margin-bottom: 15px" onclick="asignarTurno('${turno.id}')"><i class="fas fa-caret-right mr-2"></i>Agregar<i class="fas fa-caret-left ml-2"></i></button>`;
    
    let img = turno.sala == "Sala VR" ? "./img/headset.png" : "./img/monitor.png";
    return `<!--Inicio Card-->  
    <div class="card text-white text-center border-0 mx-auto mb-5" style="width: 270px; background: transparent;">
      <div class="mb-0" style="background-color: #ff971f;">
        <img src="${imgUrl}" alt="" style="height: 10rem; width: 100%;">
        <p class=" bg-primary text-white" style="color: orangered;">${turno.hora}</p>
        <h5 class=" font-weight-bold mt-1 text-white mb-0" style="color: orangered; font-family: gamer; font-size: 18px;">${turno.juego}<div><img class="ml-2 my-2" src="${img}" style=" max-width: 50px;" alt=""></div></h5></div>
        <footer id="menu" class="mb-4" style="color: black; background-color: #ff971f; style="font-family: Arial, Helvetica, sans-serif;">
          <p class="pt-2" style=" color: black; font-family: Arial, Helvetica, sans-serif;">Cupo disponible: ${turno.cupoDisponible}</p>
          ${disabled}
        </footer>
      </div>
    </div>
    <!--Fin Card-->`;
}

//Funcion que crea un nuevo turno al listado de turnos del usuario.Chequea si el cliente ya esta inscripto en esa clase
function asignarTurno(idTurno){
    let usuarioLogueado = traerLocalStorage('usuarioLogueado')[0];
    let clientes = traerLocalStorage('clientes');
    let turnos = traerLocalStorage('turnos');


    let indexUsuario = clientes.findIndex(cliente => cliente.id == usuarioLogueado.id);
    let indexTurno = turnos.findIndex(turno => turno.id == idTurno);
    let nombreUsuario = clientes[indexUsuario].nombre + ' ' + clientes[indexUsuario].apellido;
    let userInTurno = turnos[indexTurno].alumnos.find(alumno => alumno==nombreUsuario);
    if(clientes[indexUsuario].habilitado==false){
        sweetAlertSinBtn('error', 'No puedes inscribirte si estás suspendido. Contactate con el administrador');
    } else if(userInTurno){
        sweetAlertSinBtn('error', `Ya estás inscripto en esta clase`);
    } else{
        let userHasClaseInthatTime = usuarioLogueado.clasesSemana.find(turno => turno.horario == turnos[indexTurno].hora);
        if(userHasClaseInthatTime){
            sweetAlertSinBtn('error', `Ya estás inscripto en una clase a las ${turnos[indexTurno].hora}`);
        } else {
            turnos[indexTurno].alumnos.push(`${clientes[indexUsuario].nombre} ${clientes[indexUsuario].apellido}`);
            turnos[indexTurno].cupoDisponible--;
            let nuevaClase = new claseInscripta(turnos[indexTurno].dia, turnos[indexTurno].hora, turnos[indexTurno].juego, turnos[indexTurno].id);
            clientes[indexUsuario].clasesSemana.push(nuevaClase);
            clientes[indexUsuario].horasSemanalesOcupadas++;
            let usuarioLogueadoActualizado=[];
            usuarioLogueadoActualizado.push(clientes[indexUsuario]);
            guardarLS('clientes', clientes);
            localStorage.removeItem('usuarioLogueado');
            guardarLS('usuarioLogueado', usuarioLogueadoActualizado);
            guardarLS('turnos', turnos);
            turnosCliente();
            turnosRestantes();
            turnosDiaSigte();
            sweetAlertSinBtn('success', `Te inscribiste a la clase de mañana a las ${turnos[indexTurno].hora} para el juego ${turnos[indexTurno].juego}`);
        }
    }
}


//Funcion que trae los turnos ya elegidos del cliente.
//Se muestran en la parte superior de la pantalla del cliente
function turnosCliente(){
    let usuarioLogueado = traerLocalStorage('usuarioLogueado')[0];
    let turnos = usuarioLogueado.clasesSemana;
    let membresia = switchMembresia(usuarioLogueado.membresia);
    let turnosDisponibles = membresia-turnos.length;
    let turnosOcupados = turnos.length;

    let divTurnosCliente = document.getElementById('divTurnosCliente');
    divTurnosCliente.innerHTML='';
    if(turnos.length == 0){
        for(let i=0; i<membresia; i++){
            divTurnosCliente.innerHTML+=turnoDisponibleCliente();
        }
    } else {
        for(let i=0; i<turnosOcupados;i++){
            divTurnosCliente.innerHTML+=turnoOcupadoCliente(turnos[i]);
        }
        for(let i=0; i<turnosDisponibles;i++){
            divTurnosCliente.innerHTML+=turnoDisponibleCliente();
        }
    }
    
    if(membresia==turnos.length){
        let divGameOver = document.getElementById('gameOver');
        divGameOver.innerHTML = '';
        divGameOver.innerHTML=`
        <!--Game over-->
        <p style="font-family: gamer; font-size: 20px; color: #000;">Intenta nuevamente la semana que viene</p>
        <img src="./img/gameover.gif" style="max-width: 300px;" alt="">
        <!--Fin de Game over-->
        `;
        document.getElementById('divTurnos').innerHTML = '';
    }
}

//Funcion que retorna string de turnos que todavía no ocupó el cliente
function turnoDisponibleCliente(){
    return `
    <!--Inicio Card-->
    <div class="card text-white text-center mx-auto" style=" border: 3px dashed orangered; width: 270px; opacity: 60%;">
      <div class=" mb-0">
        <img src="./img/select.gif" alt="" style="height: 12rem; width: 100%; ">
        <footer id="menu" class="bg-primary text-white pt-1 pb-2">
          Agrega un juego
        </footer>
      </div>
    </div>
    <!--Fin Card-->`;
}

//Funcion que retorna un turno ya saleccionado por cliente. Requiere el index para poder eliminar el turno. Poner que solo traiga el btn eliminar si el curr day es = al dia sgte
function turnoOcupadoCliente(turno){
    let juegos = traerLocalStorage('juegos');
    let juegoSeleccionado = juegos.find(juego => juego.juego == turno.juego);
    let imgJuego = juegoSeleccionado.imgURL;
    let dia = new Date().getDay();
    let diaSigte = switchDay(dia);
    let btn = diaSigte == turno.dia ? `<button class="btn btn-warning ml-2" onclick="quitarTurno('${turno.id}')"><i class="fas fa-trash"></i></button>` : `<button class="btn btn-secondary disabled ml-2" ><i class="fas fa-trash"></i></button>`;

    return `
    <!--Inicio Card-->
    <div class="card text-center bg-primary mx-auto border-0" style="width: 270px;">
      <img src="${imgJuego}" alt="" style="height: 12rem; width: 100%;">
      <footer id="menu" class="bg-primary text-white text-center pt-1 pb-2">
        ${turno.dia}: ${turno.horario}
        ${btn}
      </footer>
    </div>
    <!--Fin Card-->`;
}

//Function que elimina la clase de la lista de clases del cliente
function quitarTurno(idTurno){
    let turnos = traerLocalStorage('turnos');
    let indexTurno = turnos.findIndex(elemento => elemento.id == idTurno);

    let usuarioLogueado = traerLocalStorage('usuarioLogueado');
    let nombreUsuario = usuarioLogueado[0].nombre + ' ' + usuarioLogueado[0].apellido;

    let clientes = traerLocalStorage('clientes');
    
    let indexUsuarioLogueado = clientes.findIndex(usuario => usuario.nombre == usuarioLogueado[0].nombre);
    let indexTurnoEnUsuario = clientes[indexUsuarioLogueado].clasesSemana.findIndex(turno => turno.id == indexTurno);
    
    let indexUsuarioEnTurno = turnos[indexTurno].alumnos.findIndex(alumno => alumno == nombreUsuario);
    let indexTurnoEnUsuarioLogueado = usuarioLogueado[0].clasesSemana.find(elemento => turno.id ==idTurno);
    usuarioLogueado[0].clasesSemana.splice(indexTurnoEnUsuarioLogueado, 1);
    turnos[indexTurno].alumnos.splice(indexUsuarioEnTurno, 1);
    clientes[indexUsuarioLogueado].clasesSemana.splice(indexTurnoEnUsuario,1)
    turnos[indexTurno].cupoDisponible++;
    
    guardarLS('usuarioLogueado', usuarioLogueado);
    guardarLS('clientes', clientes);
    guardarLS('turnos', turnos);
    turnosCliente();
    turnosDiaSigte();
    turnosRestantes();
    sweetAlertSinBtn('success', 'Clase eliminada');
}

//Class clase inscripta que almacena los datos de las clases del cliente
class claseInscripta {
    constructor(dia, horario, juego, idTurno){
        this.id = idTurno;
        this.dia = dia;
        this.horario = horario;
        this.juego = juego;
    }
}


//Listado de juegos en el ADMIN
function listarTurnos(){
    let divTurnos = document.getElementById('turnos');
    divTurnos.innerHTML = '';
    let turnos = traerLocalStorage('turnos');
    let juegos = traerLocalStorage('juegos');
    for(let i=0; i<turnos.length; i++){
        let img = juegos.find(elemento => elemento.juego == turnos[i].juego).imgURL;
        let card = `<!--Inicio Card-->
    <div class="card text-center bg-primary mx-auto border-0" style="width: 270px;">
      <img src="${img}" alt="" style="height: 12rem; width: 100%;">
      <div class="bg-primary text-white pt-2 pb-1">
        <p>${turnos[i].dia} ${turnos[i].hora}</p>
        <p>${turnos[i].juego}</p>
        <button type='submit' class='btn btn-warning' onclick="eliminarTurnoListado('${turnos[i].id}')"><i class="fas fa-trash"></i></button>
      </div>
    </div>
    <!--Fin Card-->`;
    divTurnos.innerHTML+=card;
    }
}

//Funcion que elimina los turnos desde la pagina de listarTurnos
function eliminarTurnoListado(id){
    let turnos = traerLocalStorage('turnos');
    let index = turnos.findIndex(turno => turno.id == id);
    if(turnos[index].alumnos.length==0){
        turnos.splice(index, 1);
        guardarLS('turnos', turnos);
        listarTurnos();
        sweetAlertSinBtn('success', 'Turno eliminado');
    } else {
        sweetAlertSinBtn('error', 'No podés borrar un turno con alumnos inscriptos!');
    }
    
}