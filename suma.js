ejercicio1();

var c=0;
function newInput(){
  var inpt = document.createElement('input');
  inpt.type = "text";
  inpt.name = "input_"+c;
  inpt.id = "input_"+c;
  c+=1;
  document.f1.appendChild(inpt);
  document.f1.innerHTML+="<br/>";
}


function ecuacion() {
  var inX = document.getElementById("valor1").value;
  var inY = document.getElementById("valor2").value;
  var iguala = document.getElementById("valor3").value;
  var x0;
  var y1;
  var y;
  var x;

  if(inX==0){
    y = iguala;
    drawline(0,y,100,y);
  }
  else if (inY==0){
    x = iguala;
    drawline(x,0,x,100);
  }else {
    x0 = iguala/inX;
    y1 = iguala/inY;
    drawline(x0,0,0,y1);
  }

document.getElementById("total").value=parseFloat(x0);

}

function ejercicio1(){
  ej1=document.getElementById("lienzo1"); //asigno a una variable el elemento del html que voy a usar
  lienzo1=ej1.getContext("2d"); //alisto el canvas para que funcione
  lienzo1.lineWidth=1; //defino el ancho de la linea en pixeles
  lienzo1.strokeStyle = '#000000'; //defino el color en hexadecimal
  lienzo1.font="bold 20px sans-serif";

  dibujaPlanoCartesiano();

}

function linea(x0,y0,x1,y1){
  lienzo1.beginPath(); //pongo el lapiz
  lienzo1.moveTo(x0,y0); //lo ubico para iniciar el dibujo
  lienzo1.lineTo(x1,y1); //trazo la linea hasta este punto
  lienzo1.stroke(); //levanto el lapiz
  lienzo1.closePath(); //me alisto para realizar otra parte del dibujo
}

function dibujaPlanoCartesiano(){
  var aux = 0; //variable auxiliar para dibujar las separaciones en X e Y del plano
  var auxNum1 = 520; //variable para dibujar los numeros en el plano Y
  var auxNum2 = 40; //variable para dibujar los numeros en el plano X
  //linea(x0,y0,x1,y1)
  linea(0,440,540,440); //dibuja el eje X del plano cartesiano
  //linea(x0,y0,x1,y1
  linea(80,0,80,540); //dibuja el eje Y del plano cartesiano

  for(var i=0; i<14; i++){
    linea(aux,430,aux,450); //dibuja las separacione en X
    linea(70,aux,90,aux); //dibuja las separaciones en y
    aux+=40;
    }

  for(var i=1; i<=13; i++){  //estructura de repeticion que pinta los numeros
    if(auxNum1 == 520)
      lienzo1.fillText("-2",40,530);
    else if(auxNum1 == 480)
        lienzo1.fillText("-1",40,490);
    else if(auxNum1 < 440)
      lienzo1.fillText(i-3,40,auxNum1);

    if(auxNum2 == 40)
      lienzo1.fillText("-1",20,470);
      else if(auxNum2 > 80)
        lienzo1.fillText(i-2,auxNum2,470);
    auxNum1-=40;
    auxNum2+=40
  }
}

function drawline(x0,y0,x1,y1){
  var origenX = 80;
  var space = 4;
  var origenY = 440;
  linea(origenX+(x0*space),origenY-(y0*space),origenX+(x1*space),origenY-(y1*space));
}
