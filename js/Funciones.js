import UI from './Classes/UI.js'
import Presupuesto from './Classes/Presupuesto.js';
import {formulario} from './Selectores.js'

const ui = new UI();
let presupuesto;


export function preguntarPresupuesto(){
    const presupuestoUsuario = prompt('¿Cual es tu presupuesto?');

    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0){
        window.location.reload();
    }

    //Presupuesto valido
    presupuesto = new Presupuesto(presupuestoUsuario);

    ui.insertarPresupuesto(presupuesto);
}


export function agregarGasto(e){
    e.preventDefault();

    //Leer los datos del formulario
    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    //Validar
    if(nombre === '' || cantidad === ''){
        ui.imprimirAlerta('Ambos campos son obligatorios','error');
       
        return;
    }else if(cantidad <= 0 || isNaN(cantidad) ){
        ui.imprimirAlerta('Cantidad no valida', 'error')
        return; 
    }

    // Generar un objeto con el gasto

    const gasto = {nombre, cantidad, id: Date.now()  };

    // Añade un nuevo gasto
    presupuesto.nuevoGasto( gasto );

    ui.imprimirAlerta('Gasto agregado Correctamente')

    // Imprimir los gastos 
    const {gastos, restante} = presupuesto;
    ui.mostrarGastos(gastos);

    ui.actualizarRestante(restante);

    ui.comprobarPresupuesto(presupuesto);

    // Reinicia el formulario
    formulario.reset()
}

export function mostrarGastos(id){
    // Los elimina del objeto
    presupuesto.mostrarGastos(id);

    // Elimina los gastos del HTML
    const {gastos, restante} = presupuesto;
    ui.mostrarGastos(gastos);
    ui.actualizarRestante(restante);
    ui.comprobarPresupuesto(presupuesto);
}