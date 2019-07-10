var tablero = $(".panel-tablero div")
var tiempo=0
var segundos=60

function amarillo (elemento){
  $(elemento).animate(
    {
      color: "Yellow"
    }, 700, function(){
      colororiginal(elemento)
    }
  )
}

function colororiginal (elemento){
  $(elemento).animate(
    {
      color: "red"
    }, 700, function(){
      amarillo(elemento)
    }
  )
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function llena_tablero(){
var factor

  for (var cont = 1; cont<=7; cont++){
    for (var i = 0; i<=tablero.length-1 ; i++){
      var imagen = getRandomInt(1, 5)
      $(tablero[i]).append("<img src='image/" + imagen + ".png' width='73%' class='mover repositorio'>")
    }
  }
  mueve_dulce()

  for (var cont = 1; cont<=7; cont++){
    for (var i = 0; i<=tablero.length-1 ; i++){

      factor=100+(((100/7)*(cont)))
      $(tablero[i].children[7-cont]).css("top", "-" + factor.toString() + "%")
      $(tablero[i].children[7-cont]).animate(
        {
          top:"0%"
        },500
      )
    }
  }

}

function encuentra_horizontal(){
  var contador = 0
  for (var cont = 0; cont<=6; cont++){
    for (var i = 0; i<=(tablero.length-3) ; i++){
      if (($(tablero[i].children[cont]).attr("src") == $(tablero[i+1].children[cont]).attr("src")) && $(tablero[i+1].children[cont]).attr("src") == $(tablero[i+2].children[cont]).attr("src"))
      {
        $(tablero[i].children[cont]).addClass("Borrar")
        $(tablero[i+1].children[cont]).addClass("Borrar")
        $(tablero[i+2].children[cont]).addClass("Borrar")

      }
    }
  }

}

function encuentra_vertical(){
  var contador = 0
  var dulcesconsecutivos
  for (var cont = 0; cont<=6; cont++){
    for (var i = 0; i<=tablero.length-3 ; i++){
      if (($(tablero[cont].children[i]).attr("src") == $(tablero[cont].children[i+1]).attr("src")) && $(tablero[cont].children[i+1]).attr("src") == $(tablero[cont].children[i+2]).attr("src"))
      {
        $(tablero[cont].children[i]).addClass("Borrar")
        $(tablero[cont].children[i+1]).addClass("Borrar")
        $(tablero[cont].children[i+2]).addClass("Borrar")

      }
    }
  }

}

function Rellena_tablero (){
  var clase=""
  var renglon=0
  var longitud_inicial=0
  //$(".mover").css("top", "0%")
    for (var cont = 0; cont<=6; cont++){
      longitud_inicial=tablero[cont].children.length
      for (var i = 0; i< 6 -(longitud_inicial-1); i++){
        var imagen = getRandomInt(1, 5)
        if (longitud_inicial !== 0) {
          renglon=6-(tablero[cont].children.length)
          clase=cont + "-" +  renglon

        //  $(tablero[cont].children[7-tablero[cont].children.length]).append("<img src='image/" + imagen + ".png' width='73%' class='mover repositorio nuevo "+ clase + "'>")
          $("<img src='image/" + imagen + ".png' width='73%' class='mover repositorio nuevo "+ clase + "'>").insertBefore($(tablero[cont].children[0]))
        //  $(tablero[cont].children[7-tablero[cont].children.length]).append("<img src='image/" + imagen + ".png' width='73%' class='mover repositorio nuevo "+ clase + "'>")
        } else {
          renglon=6
          clase=cont + "-" +  renglon

          $(tablero[cont]).append("<img src='image/" + imagen + ".png' width='73%' class='mover repositorio nuevo "+ clase + "'>")
        }
      }
    }
    mueve_dulce()


    $(".nuevo").css("top", "-120%")
    $(".nuevo").animate(
            {
              top:"0%"
            },500
          )

  $(".nuevo").removeClass("nuevo")
}


function mueve_dulce(){
  var repositorio = ""
  var depositante = ""
  $(".mover").draggable()
  $(".repositorio").droppable({
      accept:".mover",
      drop: function(event,ui){
      depositante=$(ui.draggable).attr("src")
      repositorio=$(this).attr("src")
      $(ui.draggable).attr("src", repositorio)
      $(this).attr("src", depositante)
      var x = parseFloat($(ui.draggable).css("left"));
      var y = parseFloat($(ui.draggable).css("top"));
      var x1 = parseFloat($(this).css("left"));
      var y1 = parseFloat($(this).css("top"));
      $("#movimientos-text").text(parseInt($("#movimientos-text").text())+1)

      $(ui.draggable).css("left",x1);
      $(ui.draggable).css("top",y1);

    //  $(ui.draggable).draggable({
  //      revert: true
    //  })
      juego ()
      }
  }
  )
}

function  Ocultar_Dulces (tiempo){
var x=0
  $(".Borrar").fadeOut(tiempo)
  $(".Borrar").fadeIn(tiempo)
  $(".Borrar").fadeOut(tiempo)
  $(".Borrar").fadeIn(tiempo)
  $(".Borrar").fadeOut(tiempo)
  $(".Borrar").fadeIn(200)
  setTimeout(function(){
    $("#score-text").text(parseInt($("#score-text").text())+$(".Borrar").length)
    $(".Borrar").remove()
    Rellena_tablero ()
    setTimeout(function(){
      encuentra_horizontal()
      encuentra_vertical()
      if ($(".Borrar").length!== 0) {
        Ocultar_Dulces (200)
      }
    },1000)
    //alert("listo")
  },1000)

}


function iniciar (){
    $("#movimientos-text").text("0")
    $("#score-text").text("0")
    $("#timer").text("02:00")
    $(".mover").remove()
    $(".repositorio").remove()
    llena_tablero()
   $("#timer").countdown('destroy')
   $("#timer").countdown({until: '+120', compact:true, format: 'MS', onExpiry:Terminar, description:''});
     $("#timer").css("background", "rgba(232, 115, 6, 0.1)")
     $("#timer").css("border", "none")
    juego()

}

function juego (){
//  do {
  encuentra_horizontal()
  encuentra_vertical()
  Ocultar_Dulces(200)
  mueve_dulce()
  }


function Terminar(){
  options = { to: { width: 800, height: 250 } };
  options1 = { to: { width: 0, height: 0 } };

  $(".time").effect("size",options1,500)
  $(".buttons").effect("size",options1,500)


$(".panel-tablero").animate(
        {
          left:"0",
          width:"0",
          height:"0"
        },100, function(){
          $(".panel-tablero").effect("size",options1,50)
          $(".score").animate(
                  {
                    marginleft:"300px",
                    width:"400%"
                  },400
                )
          $(".moves").animate(
                  {
                    marginleft:"300px",
                    width:"400%"
                  },400
                )
        }
      )

}

$(document).ready(function(){


  amarillo($(".main-titulo"))
  $( ".btn-reinicio" ).click(function() {
    iniciar ()
  });

  $("#timer").countdown({until: '+120', compact:true, format: 'MS', onExpiry:Terminar, description:''});
  iniciar ()

})
