import { 
Typography,
Link } from "@mui/material";

export function Copyright(props) {
    return (
      <Typography
        variant='body2'
        color='text.secondary'
        align='center'
        {...props}
      >
        {'Copyright © '}
        <Link color='inherit' href='#'>
          SoftBear
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  var data = new Date();
export function DataAtualDoSistema(){

var dia = String(data.getDate()).padStart(2, '0');
var mes = String(data.getMonth() + 1).padStart(2, '0');
var ano = data.getFullYear();
var dataAtual = dia + '/' + mes + '/' + ano;
return dataAtual
}

export function HoraAtualDoSistema(){

    var hora = data.getHours();          // 0-23
    var min  = data.getMinutes();
    var HoraAtual = hora + ':' + min
    return HoraAtual

}



