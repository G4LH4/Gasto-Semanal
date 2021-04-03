import {formulario, gastoListado} from '../Selectores.js';
import {mostrarGastos} from '../Funciones.js'
import Presupuesto from './Presupuesto.js'



export default class UI{

    insertarPresupuesto(cantidad){
        //Extrallendo los valores
        const {presupuesto,restante} = cantidad;
        //Agregar al HTML
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    imprimirAlerta(mensaje,tipo){
        // Crear el div
        const divAlerta = document.createElement('div');
        divAlerta.classList.add('text-center', 'alert');

        if(tipo === 'error'){
            divAlerta.classList.add('alert-danger');
        }else{
            divAlerta.classList.add('alert-success');
        }

        //Mensaje de error
        divAlerta.textContent = mensaje;

        // Insertar en el HTML 

        document.querySelector('.primario').insertBefore(divAlerta, formulario);
    
        // Quitar del HTML

        setTimeout(()=>{
              divAlerta.remove();
        },3000)
    };

        mostrarGastos(gastos){

            this.limpiarHTML(); // Elmina el HTML previo
        // Iterar sobre los gastos
       
        gastos.forEach(gasto =>{
            const {cantidad,nombre,id} = gasto;

            // Crear un LI
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id;

            // Agregar el HTML del gasto
            nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill"> $ ${cantidad} </span>

            `;

            // Boton para borrar el gasto
            
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn','btn-danger','borrar-gasto');
            btnBorrar.innerHTML = 'Borrar &times';
            btnBorrar.onclick = () => {
                mostrarGastos(id);
            }

            nuevoGasto.appendChild(btnBorrar);

            // Agregar al html

            gastoListado.appendChild(nuevoGasto);
            
            
        })
    }

    limpiarHTML(){
        while (gastoListado.firstChild){
            gastoListado.removeChild(gastoListado.firstChild);
        }
    }
    
    actualizarRestante(restante){
        document.querySelector('#restante').textContent = restante;
    }

    comprobarPresupuesto(prespuestoObj){
        const {presupuesto,restante} = prespuestoObj;
        const restanteDiv = document.querySelector('.restante');

        // Comprobar 25%
        if((presupuesto / 4) > restante){
            restanteDiv.classList.remove('alert-succes', 'alert-warning')
            restanteDiv.classList.add('alert-danger');
        } else if( (presupuesto / 2) > restante){
            restanteDiv.classList.remove('alert-succes')
            restanteDiv.classList.add('alert-warning')
        }else{
            restanteDiv.classList.remove('alert-danger', 'alert-warning');
            restanteDiv.classList.add('alert-succes');
        }



        // Si el total es 0 o menor
        if(restante <= 0){
            UI.imprimirAlerta('El presupuesto se ha agotado', 'error');
            formulario.querySelector('button[type="submit"]').disabled = true;
        }
    }
}