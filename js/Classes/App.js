import {preguntarPresupuesto, agregarGasto} from '../Funciones.js'
import {formulario} from '../Selectores.js';

export default class App{
    constructor(){
        this.initApp();
    }

    initApp(){
        EventListeners();
        function EventListeners(){
             document.addEventListener('DOMContentLoaded', preguntarPresupuesto );
             formulario.addEventListener('submit', agregarGasto);
        }
    }
}