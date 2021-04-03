export default class Presupuesto{
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