// Variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

// Eventos
EventListeners();
function EventListeners(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto );

    formulario.addEventListener('submit', agregarGasto);
}

// Clases
class Presupuesto{
 constructor(presupuesto){
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto);
    this.gastos = [];
 }

    nuevoGasto(gasto){
         this.gastos = [...this.gastos, gasto];
         this.calcularRestante();
    } 

    calcularRestante(){
        const gastado = this.gastos.reduce( (total, gasto)=> total + gasto.cantidad, 0);
        this.restante = this.presupuesto - gastado;
    }

    mostrarGastos(id){
        this.gastos = this.gastos.filter( gasto => gasto.id !== id);

        this.calcularRestante();
    }
}

class UI{
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
            ui.imprimirAlerta('El presupuesto se ha agotado', 'error');
            formulario.querySelector('button[type="submit"]').disabled = true;
        }
    }
}
const ui = new UI();
let presupuesto;
1

function preguntarPresupuesto(){
    const presupuestoUsuario = prompt('¿Cual es tu presupuesto?');

    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0){
        window.location.reload();
    }

    //Presupuesto valido
    presupuesto = new Presupuesto(presupuestoUsuario);

    ui.insertarPresupuesto(presupuesto);
}


function agregarGasto(e){
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

function mostrarGastos(id){
    // Los elimina del objeto
    presupuesto.mostrarGastos(id);

    // Elimina los gastos del HTML
    const {gastos, restante} = presupuesto;
    ui.mostrarGastos(gastos);
    ui.actualizarRestante(restante);
    ui.comprobarPresupuesto(presupuesto);
}