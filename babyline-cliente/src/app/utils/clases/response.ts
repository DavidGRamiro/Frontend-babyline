import { eCodHhtp } from "./enums";



export class oRespuestaAPI {

  public cod_resultado : number = 0;
  public msg_resultado : string = '';
  public resultado : any = null;

  constructor( resultado : any = null ){

    this.cod_resultado = resultado?.cod_resultado;
    this.msg_resultado = resultado?.msg_resultado;
    this.resultado = resultado;
  }

  capturaResultadoAPI( resultado : any){

    let respuesta = { }

    if(resultado){
      respuesta = {
        cod: eCodHhtp.OK,
        msg: 'Operación realizada con éxito',
        resultado: this.resultado
      }
    }

    if(resultado.cod_resultado ===  eCodHhtp.NO_CONTENT){
      respuesta = {
        cod: eCodHhtp.NO_CONTENT,
        msg: 'No se encontraron datos',
        resultado: resultado
      }
    }

    if(resultado.cod_resultado ===  eCodHhtp.BAD_REQUEST){
      respuesta = {
        cod: eCodHhtp.BAD_REQUEST,
        msg: 'Error en la petición',
        resultado: resultado
      }
    }

    return respuesta;
  }


}
