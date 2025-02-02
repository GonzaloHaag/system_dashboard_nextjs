//la idea es indicar el formato de moneda correto con javascript 
export const FormatoMoneda = ( value:number ) => {
    return new Intl.NumberFormat('es-AR',{
      style:'currency',
      currency:'ARS',
      minimumFractionDigits:2,
      maximumSignificantDigits:3,
  
    }).format(value); //que me formatee el valor que recibo, la idea es usarla donde tenemos que mostrar precios
  }