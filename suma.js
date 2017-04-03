ejercicio1();
var matriz = new Array(4);
var matriz2 = new Array(4);
var optima = new Array(2);
var puntos = new Array();
var arrayX = new Array();
var arrayY = new Array();
var xmayor = 0;
var ymayor = 0;
var referencia;
var optimo = 0;
var auxoptimo;
var objetivoX;
var objetivoY;
var space = 4;
var maxmin;
var grande = 100000000;
var numPlanos;
var prueba;

function newInput() {
    var c = 0;
    var array = ["<=", "=", ">="];
    var restriction = document.getElementById("restric").value;
    var inpt1 = document.createElement('input');
    var inpt2 = document.createElement('input');
    var inpt3 = document.createElement('input');
    var selectList = document.createElement('select');

    if (restriction) {
        for (var i = 0; i < restriction; i++) {
            inpt1.type = "text";
            inpt1.name = "input1_" + c;
            inpt1.id = "input1_" + c;

            document.f1.appendChild(inpt1);
            document.f1.innerHTML += "<strong>X+</strong>";

            inpt2.type = "text";
            inpt2.name = "input2_" + c;
            inpt2.id = "input2_" + c;

            document.f1.appendChild(inpt2);
            document.f1.innerHTML += "<strong>Y</strong>";

            inpt3.type = "text";
            inpt3.name = "input3_" + c;
            inpt3.id = "input3_" + c;

            selectList.id = "input4_" + c;
            document.f1.appendChild(selectList);

            c += 1;
            if (c == 1) {
                for (var j = 0; j < array.length; j++) {
                    var option = document.createElement("option");
                    option.value = array[j];
                    option.text = array[j];
                    selectList.appendChild(option);
                }
            }

            document.f1.appendChild(inpt3);
            document.f1.innerHTML += "<br/>"
        }
    }
}

function ecuacion() {
    var dimM3;
    var opcion;
    var inX;
    var inY;
    var iguala;
    var x0;
    var y1;
    var x; //cuando la entrada de x sea cero
    var y; //cuando la entrada de y sea cero
    var x1matriz, x2matriz;
    var y1matriz, y2matriz;
    var c1matriz, c2matriz;
    var restriction = document.getElementById("restric").value;
    var solucion = document.getElementById("solucion");
    var solucionZ = document.getElementById("solucionZ");


    maxmin = document.getElementById("maxORmin").value;
    objetivoX = document.getElementById("objX").value; //valores de z
    objetivoY = document.getElementById("objY").value; //valores de z

    if (maxmin == "max")
        maxmin = 0;
    else maxmin = 1;

    dimM3 = restriction * 2;
    for (var i = 0; i < restriction; i++) {
        matriz[i] = new Array(4);
        matriz2[i] = new Array(4);
    }

    for (var i = 0; i < restriction; i++) {
        inX = document.getElementById("input1_" + i).value;
        inY = document.getElementById("input2_" + i).value;
        iguala = document.getElementById("input3_" + i).value;

        seleccion = document.getElementById("input4_" + i).value;
        if (seleccion == "<=")
            opcion = 0;
        else if (seleccion == "=")
            opcion = 1;
        else opcion = 2;

        matriz[i][0] = inX;
        matriz[i][1] = inY;
        matriz[i][2] = iguala;
        matriz[i][3] = opcion;

        if (inY == 0) { //puntos que estan sobre los ejes
            x = iguala / inX;
            if (x > xmayor)
                xmayor = x;
            matriz2[i][0] = x;
            matriz2[i][1] = 0;
            matriz2[i][2] = x;
            matriz2[i][3] = 100;
        } else if (inX == 0) { //puntos que estan sobre los ejes
            y = iguala / inY;
            if (y > ymayor)
                ymayor = y;
            matriz2[i][0] = 100;
            matriz2[i][1] = y;
            matriz2[i][2] = 0;
            matriz2[i][3] = y;
        } else {
            x0 = iguala / inX;
            y1 = iguala / inY;
            if (y1 > ymayor)
                ymayor = y1;
            if (x0 > xmayor)
                xmayor = x0;

            if (x0 < 0 || y1 < 0) {
                matriz2[i][0] = x0;
                matriz2[i][1] = 0;
                matriz2[i][2] = 0;
                matriz2[i][3] = y1;
            }

            if (x0 == 0 && y1 == 0) {
                y = -1 * (inX) / inY;
                x = 1;
                matriz2[i][0] = 0;
                matriz2[i][1] = 0;
                matriz2[i][2] = x;
                matriz2[i][3] = y;
            } else {
                matriz2[i][0] = x0;
                matriz2[i][1] = 0;
                matriz2[i][2] = 0;
                matriz2[i][3] = y1;
            }
        }
    }
    escala();
    /*document.getElementById("total").value=parseFloat(ymayor);*/

    for (var j = 0; j < restriction; j++) {
        var uno, dos, tres, cuatro;
        uno = matriz2[j][0];
        dos = matriz2[j][1];
        puntosVSrestricciones(uno, dos);
        tres = matriz2[j][2];
        cuatro = matriz2[j][3];
        puntosVSrestricciones(tres, cuatro);
    }

    puntosVSrestricciones(0, 0);
    for (var i = 0; i < restriction; i++) {
        for (var j = i + 1; j < restriction; j++) {
            x1matriz = matriz[i][0];
            y1matriz = matriz[i][1];
            c1matriz = matriz[i][2];
            x2matriz = matriz[j][0];
            y2matriz = matriz[j][1];
            c2matriz = matriz[j][2];
            interseccion(x1matriz, y1matriz, c1matriz, x2matriz, y2matriz, c2matriz);
        }
    }


    puntos = convexHull(puntos);
    poligono(puntos);
    puntoConvex(optima[0], optima[1]);
    lineaSolucion(objetivoX, objetivoY, (parseFloat(objetivoX * optima[0]) + parseFloat(objetivoY * optima[1])));

solucion.innerHTML = "La solucion optima es: X=" + optima[0] + ", Y=" + optima[1];
    solucionZ.innerHTML = "El valor optimo es Z = " + (parseFloat(objetivoX * optima[0]) + parseFloat(objetivoY * optima[1]));

    //document.getElementById("total").value=parseFloat(puntos[1][1]);
    //puntoConvex(optima[0],optima[1]);
    //document.getElementById("total").value=parseFloat(matriz2[0][0]);
    //interseccion(x1matriz,y1matriz,c1matriz,x2matriz,y2matriz,c2matriz);
}

function escala() {
    var restriction = document.getElementById("restric").value;
    if (xmayor > ymayor)
        referencia = xmayor;
    else referencia = ymayor;

    numPlanos = referencia/10;
     space = 400/referencia;
  //  if (referencia > 10) {
        dibujaPlanoCartesiano();
        for (var i = 0; i < restriction; i++) {
            if (matriz2[i][0] < 0 || matriz2[i][3] < 0)
                pendiente(matriz2[i][0], matriz2[i][1], matriz2[i][2], matriz2[i][3]);
            else if (matriz2[i][0] == 0 && matriz2[i][1] == 0)
                pendiente(matriz2[i][0], matriz2[i][1], matriz2[i][2], matriz2[i][3]);
            else drawline(matriz2[i][0], matriz2[i][1], matriz2[i][2], matriz2[i][3]);
        }

    //}
  //  if (referencia <= 10) {
    //    dibujaPlanoCartesiano2();
    //    space = 40;
      //  for (var i = 0; i < restriction; i++) {
      //      if (matriz2[i][0] < 0 || matriz2[i][3] < 0)
      //          pendiente(matriz2[i][0], matriz2[i][1], matriz2[i][2], matriz2[i][3]);
        //    else if (matriz2[i][0] == 0 && matriz2[i][1] == 0)
          //      pendiente(matriz2[i][0], matriz2[i][1], matriz2[i][2], matriz2[i][3]);
          //  else drawline(matriz2[i][0], matriz2[i][1], matriz2[i][2], matriz2[i][3]);
      //  }
  //  }
}

function lineaSolucion(x, y, c) {
    var x0, y1;
    x0 = c / x;
    y1 = c / y;
  //  lienzo1.strokeStyle = "red";
    drawline(x0, 0, 0, y1);
}

function convexHull(points) {
    points.sort(function(a, b) {
        //return a.x != b.x ? a.x - b.x : a.y - b.y;
        return a[0] != b[0] ? a[0] - b[0] : a[1] - b[1];
    });

    var n = points.length;
    var hull = [];

    for (var i = 0; i < 2 * n; i++) {
        var j = i < n ? i : 2 * n - 1 - i;
        while (hull.length >= 2 && removeMiddle(hull[hull.length - 2], hull[hull.length - 1], points[j]))
            hull.pop();
        hull.push(points[j]);
    }

    hull.pop();
    return hull;
}

function removeMiddle(a, b, c) {
    var cross = (a[0] - b[0]) * (c[1] - b[1]) - (a[1] - b[1]) * (c[0] - b[0]);
    var dot = (a[0] - b[0]) * (c[0] - b[0]) + (a[1] - b[1]) * (c[1] - b[1]);
    return cross < 0 || cross == 0 && dot <= 0;
}

function poligono(point) {
    var origenX = 80;
    //var space = 4;
    var origenY = 440;
    //linea(origenX+(x0*space),origenY-(y0*space),origenX+(x1*space),origenY-(y1*space));
    lienzo1.beginPath();
    lienzo1.strokeStyle = "red";
    lienzo1.fillStyle = "#5D6D7E";
    lienzo1.moveTo(origenX + (point[0][0] * space), origenY - (point[0][1] * space));
    for (var i = 1; i < puntos.length; i++) {
        lienzo1.lineTo(origenX + (point[i][0] * space), origenY - (point[i][1] * space));
    }
    lienzo1.stroke();
    lienzo1.closePath();
    lienzo1.fill();
}

function puntosVSrestricciones(x, y) {
    var convex = 0;
    var entradas = document.getElementById("restric").value;
    for (var i = 0; i < entradas; i++) {
        if (matriz[i][3] == 0) {
            if ((matriz[i][0] * x + matriz[i][1] * y) <= matriz[i][2])
                convex++;
        }
        if (matriz[i][3] == 1) {
            if ((matriz[i][0] * x + matriz[i][1] * y) == matriz[i][2])
                convex++;
        }
        if (matriz[i][3] == 2) {
            if ((matriz[i][0] * x + matriz[i][1] * y) >= matriz[i][2])
                convex++;
        }
    }
    if (x >= 0 && y >= 0)
        convex++;

    //document.getElementById("total").value=parseFloat(convex);
    convex--;
    if (convex == entradas) {
        //puntoConvex(x,y);
        puntos.push([x, y]);
        if (maxmin == 0) {
            auxoptimo = objetivoX * x + objetivoY * y;
            if (auxoptimo > optimo) {
                optimo = auxoptimo;
                optima[0] = x;
                optima[1] = y;
            }
        } else if (maxmin == 1) {
            auxoptimo = objetivoX * x + objetivoY * y;
            if (auxoptimo < grande) {
                grande = auxoptimo;
                optima[0] = x;
                optima[1] = y;
            }
        }
    }
    //document.getElementById("total").value=parseFloat(convex);

}

function interseccion(x1, y1, c1, x2, y2, c2) {
    var convex = 0;

    var entradas = document.getElementById("restric").value;
    var y;
    var x;

    if (x2 == 0) {
        y = c2 / y2;
        x = (c1 - (y * y1)) / x1;
    } else if (y2 == 0) {
        x = c2 / x2;
        y = (c1 - (x * x1)) / y1;
    } else {
        y = (c1 - ((x1 / x2) * c2)) / (parseFloat((-x1 * y2) / x2) + parseFloat(y1));
        x = (c2 - (y2 * y)) / x2;
    }

    for (var i = 0; i < entradas; i++) {
        if (matriz[i][3] == 0) {
            if ((matriz[i][0] * x + matriz[i][1] * y) <= matriz[i][2])
                convex++;
        }
        if (matriz[i][3] == 1) {
            if ((matriz[i][0] * x + matriz[i][1] * y) == matriz[i][2])
                convex++;
        }
        if (matriz[i][3] == 2) {
            if ((matriz[i][0] * x + matriz[i][1] * y) >= matriz[i][2])
                convex++;
        }
    }
    if (x > 0 && y > 0)
        convex++;

    convex--;
    if (convex == entradas) {
        //puntoConvex(x,y);
        puntos.push([x, y]);
        if (maxmin == 0) {
            auxoptimo = objetivoX * x + objetivoY * y;
            if (auxoptimo > optimo) {
                optimo = auxoptimo;
                optima[0] = x;
                optima[1] = y;
            }
        } else if (maxmin == 1) {
            auxoptimo = objetivoX * x + objetivoY * y;
            if (auxoptimo < grande) {
                grande = auxoptimo;
                optima[0] = x;
                optima[1] = y;
            }
        }
    }
    //document.getElementById("total").value=parseFloat(matriz[0][2]);
}


function pendiente(x0, y0, x1, y1) {
    var m = (y1 - y0) / (x1 - x0);
    var x = 100;
    var yp = m * (x - x0) + y0;
    if (x0 < 0 || y1 < 0) {
        drawline(x, yp, x1, y1);
    } else {
        drawline(x0, y0, x, yp);
    }
}

function puntoConvex(x, y) {
    var origenX = 80;
    //var space = 4;
    var origenY = 440;

    lienzo1.beginPath();
    lienzo1.arc(origenX + (x * space), origenY - (y * space), 4, 0, 2 * Math.PI);
    lienzo1.fillStyle = "red";
    lienzo1.fill();
}

function ejercicio1() {
    ej1 = document.getElementById("lienzo1"); //asigno a una variable el elemento del html que voy a usar
    lienzo1 = ej1.getContext("2d"); //alisto el canvas para que funcione
    lienzo1.lineWidth = 1; //defino el ancho de la linea en pixeles
    lienzo1.strokeStyle = '#000000'; //defino el color en hexadecimal
    lienzo1.font = "bold 17px sans-serif";

    //dibujaPlanoCartesiano();
}

function linea(x0, y0, x1, y1) {
    lienzo1.beginPath(); //pongo el lapiz
    lienzo1.moveTo(x0, y0); //lo ubico para iniciar el dibujo
    lienzo1.lineTo(x1, y1); //trazo la linea hasta este punto
    lienzo1.stroke(); //levanto el lapiz
    lienzo1.closePath(); //me alisto para realizar otra parte del dibujo
}

function dibujaPlanoCartesiano() {
    var aux = 0; //variable auxiliar para dibujar las separaciones en X e Y del plano
    var auxNum1 = 520; //variable para dibujar los numeros en el plano Y
    var auxNum2 = 40; //variable para dibujar los numeros en el plano X
    //linea(x0,y0,x1,y1)
    linea(0, 440, 540, 440); //dibuja el eje X del plano cartesiano
    //linea(x0,y0,x1,y1
    linea(80, 0, 80, 540); //dibuja el eje Y del plano cartesiano

    for (var i = 0; i < 14; i++) {
        linea(aux, 430, aux, 450); //dibuja las separacione en X
        linea(70, aux, 90, aux); //dibuja las separaciones en y
        aux += 40;
    }

    for (var i = 1; i <= 13; i++) { //estructura de repeticion que pinta los numeros
        /*if(auxNum1 == 520)
          lienzo1.fillText("-20",40,530);
        else if(auxNum1 == 480)
            lienzo1.fillText("-10",40,490);
        else*/
        if (auxNum1 < 440)

            lienzo1.fillText(((i - 3) * numPlanos).toFixed(1), 40, auxNum1);

        //if(auxNum2 == 40)
        /*lienzo1.fillText("-10",20,470);
        else*/
        if (auxNum2 > 80)
            lienzo1.fillText(((i - 2) * numPlanos).toFixed(1), auxNum2, 470);
        auxNum1 -= 40;
        auxNum2 += 40
    }
}

function dibujaPlanoCartesiano2() {
    var aux = 0; //variable auxiliar para dibujar las separaciones en X e Y del plano
    var auxNum1 = 520; //variable para dibujar los numeros en el plano Y
    var auxNum2 = 40; //variable para dibujar los numeros en el plano X
    //linea(x0,y0,x1,y1)
    linea(0, 440, 540, 440); //dibuja el eje X del plano cartesiano
    //linea(x0,y0,x1,y1
    linea(80, 0, 80, 540); //dibuja el eje Y del plano cartesiano

    for (var i = 0; i < 14; i++) {
        linea(aux, 430, aux, 450); //dibuja las separacione en X
        linea(70, aux, 90, aux); //dibuja las separaciones en y
        aux += 40;
    }

    for (var i = 1; i <= 13; i++) { //estructura de repeticion que pinta los numeros
        /*if(auxNum1 == 520)
          lienzo1.fillText("-20",40,530);
        else if(auxNum1 == 480)
            lienzo1.fillText("-10",40,490);
        else*/
        if (auxNum1 < 440)
            lienzo1.fillText((i - 3), 40, auxNum1);

        //if(auxNum2 == 40)
        /*lienzo1.fillText("-10",20,470);
        else*/
        if (auxNum2 > 80)
            lienzo1.fillText((i - 2), auxNum2, 470);
        auxNum1 -= 40;
        auxNum2 += 40
    }
}

function drawline(x0, y0, x1, y1) {
    var origenX = 80;
    //var space = 4;
    var origenY = 440;
    linea(origenX + (x0 * space), origenY - (y0 * space), origenX + (x1 * space), origenY - (y1 * space));
}
