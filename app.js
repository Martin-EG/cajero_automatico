// Cajero automatico

// Un usuario pueda ingresar y realizar distintas operaciones:

// 1. Iniciar sesion
// 2. Registrarse


// 1. Consultar su saldo.
// 2. Puede retirar dinero.
// 3. Puede ingresar dinero.
// 4. Puede transferir dinero.
// 5. Consultar historial de movimientos.
// 5. Salir

// Funciones ->
// Ciclos ->
// Condicionales -> 
// Switch -> 

//Arrays
//Objetos
//Funciones de orden superior

// Usuario
// tarjeta
// Nombre
// dineroEnElBanco

class Usuario {
  constructor(nombre, tarjeta, dineroEnElBanco) {
    this.nombre = nombre;
    this.tarjeta = tarjeta;
    this.dineroEnElBanco = parseInt(dineroEnElBanco);
    this.movimientos = []
  }
  agregarMovimiento(movimiento) {
    this.movimientos.push(movimiento);
  }
  restarDinero(dinero) {
    this.dineroEnElBanco -= dinero;
  }
}

class Movimientos {
  constructor(dinero, tipoDeMovimiento, fechaDeMovimiento) {
    this.dinero = parseFloat(dinero);
    this.tipoDeMovimiento = tipoDeMovimiento;
    this.fechaDeMovimiento = fechaDeMovimiento;
  }
}

function iniciarSesion(nombre, tarjeta){
  usuarioLogIn = usuarios.find((usuario) => usuario.nombre === nombre && usuario.tarjeta === tarjeta );
  
  if(usuarioLogIn) {
    localStorage.setItem('usuario', nombre);

    let mensajeBienvenida = document.getElementById('bienvenida');
    let nombreUsuario = document.getElementById('nombreUsuario');
    mensajeBienvenida.className = '';
    nombreUsuario.innerText = nombre;

    formularioIniciarSesion.className = 'hidden';
  formularioRegistrarse.className = 'hidden';
  } else {
    alert('No se encuentra este usuario.');
  }
}

function registrarse(nombre, tarjeta, dinero) {

  usuarios.push(new Usuario(nombre, tarjeta, dinero));
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  iniciarSesion(nombre, tarjeta);
}

//Funciones del cajero
function consultarDinero() {
  alert(`Usuario, su saldo actual es $${usuarioLogIn.dineroEnElBanco}`);
}

function validarSaldo(dineroARetirar) {
   if(dineroARetirar > usuarioLogIn.dinero) {
    alert("No cuentas con el dinero suficiente.");
    return false;
  } else {
    usuarioLogIn.restarDinero(dineroARetirar);
    return true;
  }
}

const retirarDinero = function () {
  let dineroARetirar = parseInt(prompt("Cuanto dinero desea retirar? \nCuento con billetes de $500, $200, $100 y $50"));
  let resultado = validarSaldo(dineroARetirar);
  if(resultado) {
    const fecha = new Date();
    usuarioLogIn.agregarMovimiento(new Movimientos(dineroARetirar, 'Retiro', fecha));
    alert(`El retiro se realizo con exito, su nuevo saldo es de ${usuarioLogIn.dineroEnElBanco}`);
  }

}

const depositarDinero = () => {
  let dineroADepositar = parseInt(prompt("Cuanto dinero desea depositar?"));
  if(dineroADepositar > 0) {
    usuarioLogIn.dineroEnElBanco += dineroADepositar;
    const fecha = new Date();
    usuarioLogIn.agregarMovimiento(new Movimientos(dineroADepositar, 'Deposito', fecha));
    alert(`Su nuevo saldo es de ${usuarioLogIn.dineroEnElBanco}`)
  } else {
    alert('El valor es incorrecto.')
  }
}

const transferirDinero = () => {
  let dineroATrasferir = parseInt(prompt("Cuanto dinero desea transferir?"));
  let resultado = validarSaldo(dineroATrasferir);
  if(resultado) {
    const fecha = new Date();
    usuarioLogIn.agregarMovimiento(new Movimientos(dineroATrasferir, 'Transferencia', fecha));
    alert(`La transferencia se realizo con exito, su nuevo saldo es de ${diusuarioLogIn.dineroneroDelUsuario}`);
  }
}

const consultarMovimientos = () => {
  usuarioLogIn.movimientos.forEach((movimiento) => {
    alert(`Fecha: ${movimiento.fechaDeMovimiento}.\nOperacion: ${movimiento.tipoDeMovimiento}.\nDinero: $${movimiento.dinero}.`);
  })
}

function seleccionarOperacionDelMenu(operacion) {
switch (operacion) {
    case 1:
      consultarDinero();
      break;
    case 2:
      retirarDinero();
      break;
    case 3:
      depositarDinero();
      break;
    case 4:
      transferirDinero();
      break;
    case 5:
      consultarMovimientos();
      break;
    case 6:
      console.log('Nos vemos.');
      localStorage.removeItem('usuario');
      break;
    default:
      break;
  }
}

// function menuDeOperaciones() {
// do {
//   opcionMenu = prompt("Ingresa la operaciona a realizar. \n1. Consultar saldo. \n2. Retirar dinero. \n3. Depositar dinero. \n4. Transferir dinero. \n5. Ver movimientos. \n5. Salir.")
//   seleccionarOperacionDelMenu(opcionMenu);
// } while( opcionMenu !== '6' );
// }

let formularioIniciarSesion = document.getElementById('iniciarSesion');
let formularioRegistrarse = document.getElementById('registrarse');
let menuDeOperaciones = document.getElementById('operaciones');

let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let usuarioLogIn = localStorage.getItem('usuario');


if(usuarioLogIn) {
  let mensajeBienvenida = document.getElementById('bienvenida');
  let nombreUsuario = document.getElementById('nombreUsuario');
  mensajeBienvenida.className = '';
  nombreUsuario.innerText = usuarioLogIn;
  menuDeOperaciones.className = 'row gx-5 gy-2';
  formularioIniciarSesion.className = 'hidden';
  formularioRegistrarse.className = 'hidden';

  let botones = document.getElementsByClassName('btn-secondary');
  botones[0].addEventListener('click', () => seleccionarOperacionDelMenu(1));
  botones[1].addEventListener('click', () => seleccionarOperacionDelMenu(2));
  botones[2].addEventListener('click', () => seleccionarOperacionDelMenu(3));
  botones[3].addEventListener('click', () => seleccionarOperacionDelMenu(4));
  botones[4].addEventListener('click', () => seleccionarOperacionDelMenu(5));
  botones[5].addEventListener('click', () => seleccionarOperacionDelMenu(6));
} else {
  formularioIniciarSesion.className = '';
  formularioRegistrarse.className = ' mt-2';

  formularioIniciarSesion.addEventListener('submit', (e) => {
    e.preventDefault();
    let usuario = document.getElementById('usuario').value;
    let numeroTarjeta = document.getElementById('numeroTarjeta').value;

    if(usuario != '' && numeroTarjeta != '') {
      iniciarSesion(usuario, numeroTarjeta);
    } else {
      alert('Todos los datos son obligatorios');
    }
  });

    formularioRegistrarse.addEventListener('submit', (e) => {
    e.preventDefault();
    let usuario = document.getElementById('usuarioRegistrado').value;
    let numeroTarjeta = document.getElementById('numeroTarjetaRegistrado').value;
    let dinero = document.getElementById('dinero').value;

    if(usuario != '' && numeroTarjeta != '' && dinero != '') {
      registrarse(usuario, numeroTarjeta, parseFloat(dinero));
    } else {
      alert('Todos los datos son obligatorios');
    }
  });
}

// do {
//   opcionInicio = prompt("Bienvenido que desea hacer?\n1.Iniciar sesion.\n2.Registrarse.\n3.Salir");
//   switch(opcionInicio) {
//     case '1':
//       iniciarSesion();
//       break;
//     case '2':
//       registrarse();
//       break;
//     case '3':
//       alert('Nos vemos.');
//       break;
//     default:
//       alert('Opcion incorrecta.');
//       break;
//   }
// } while(opcionInicio != 3);