$(document).ready(function() {
    // Function to toggle night mode
    function toggleNightMode() {
      var body = $('body');
      var checkbox = $('#night-mode-checkbox');

      if (checkbox.prop('checked')) {
        body.addClass('night-mode','navbar-night','.navbar-nav .nav-item .nav-link .night-mode');
        $('.navbar-nav a').css('color', 'white'); // Muda a cor da classe
        $("#logopreta").attr("hidden", "hidden");
        $("#logobranca").removeAttr("hidden");
      } else {
        body.removeClass('night-mode','navbar-night','.navbar-nav .nav-item .nav-link .night-mode');
        $('.navbar-nav a').css('color', 'black'); // Muda a cor da classe
        $("#logobranca").attr("hidden", "hidden");
        $("#logopreta").removeAttr("hidden");
    }
 }
    // Click event handler for the checkbox
    $('#night-mode-checkbox').click(function() {
      toggleNightMode();
    });
   
    //função que altera a cor do banner ativo
    $('.accordion .card-header').click(function() {
      var navbarColor = $('.navbar').css('background-color');  //recupera a cor da navbar     
      $('.accordion .card-header').css('background-color', '');  // reseta a cor dos inativos
        $('.accordion .card-header .btn:after').css('content', '+');
        //Mudando a cor do ativo
        $(this).css('background-color', navbarColor); 
        $(this).find('.btn:after').css('content', '-'); 
    });
    //função que troca as divs
    $('#botaoCalcular').click(function() {
      // Remove hidden attribute from div1 and add it to div2
      $('#parte2').removeAttr('hidden');
      $("#parte2").fadeIn("slow");
      $('#parte1').attr('hidden', 'hidden'); 
      
  });
  //FUNÇÃO QUE CALCULA O GASTO CALÓRICO DIÁRIO
  function calcularGastoCalorico() {
    var genero = $('input[name="genero"]:checked').val();
    var peso = parseInt($('#peso').val());
    var altura = parseInt($('#altura').val());
    var idade = parseInt($('#idade').val());
    var nivelAtividade = parseFloat($('#nivelAtividade').val());
    var gastoCalorico = 0;

    // Verifica se todos os campos foram preenchidos
    if (genero && peso && altura && idade && nivelAtividade) {
      if (genero === 'masculino') {
        gastoCalorico = (10 * peso) + (6.25 * altura) - (5 * idade) + 5;
      } else if (genero === 'feminino') {
        gastoCalorico = (10 * peso) + (6.25 * altura) - (5 * idade) - 161;
      }

      gastoCalorico *= nivelAtividade;

      // Atribui o valor calórico diário ao campo no final do formulário
      $('#gastoCalorico').val(gastoCalorico.toFixed(2));
    }
  }
  // Evento de mudança nos campos do formulário
  $('input, select').on('change', calcularGastoCalorico);

});

//função que calcula os valores para a hipertrofia
function setValuesHipertrofia(){
  var gastoDiario =  $('#gastoCalorico').val();
  var peso =  $('#peso').val();
  var atividadeSelecionada = $('input[name="atividade"]:checked').val();
  var valor = 0;
  if (atividadeSelecionada === 'leve') {
    valor = 1.12;
  } else if (atividadeSelecionada === 'moderada') {
    valor = 1.2;
  } else if (atividadeSelecionada === 'intensa') {
    valor = 1.3;
  }
  $('#caloriasDiarias').val(gastoDiario * valor);
  //calculado macros (para hipertrofia, assumimos uma dieta de 35% de proteínas,50% de carboidratos e 15% gorduras);
  var proteina = (gastoDiario*35/100)/4;
  $('#proteinaHipertrofia').val(proteina.toFixed(2));
  var carboidratos = (gastoDiario*50/100)/4;
  $('#carboidratoHipertrofia').val(carboidratos.toFixed(2));
  var gorduras = (gastoDiario*15/100)/9;
  $('#gorduraHipertrofia').val(gorduras.toFixed(2));
}

//função que calcula os valores para o emagrecimento
function setValuesEmagrecimento(){
  var gastoDiario =  $('#gastoCalorico').val();
  var peso =  $('#peso').val();
  var atividadeSelecionada = $('input[name="atividade"]:checked').val();
  var valor = 0;
  if (atividadeSelecionada === 'leve') {
    valor = 1.12;
  } else if (atividadeSelecionada === 'moderada') {
    valor = 1.2;
  } else if (atividadeSelecionada === 'intensa') {
    valor = 1.3;
  }
  $('#caloriasDiariasEmagrecimento').val(gastoDiario / valor);
  //calculado macros (para emgrecimento, assumimos uma dieta de 35% de proteínas,50% de carboidratos e 15% gorduras);
  var proteina = (gastoDiario*35/100)/4;
  $('#proteinaEmagrecimento').val(proteina.toFixed(2));
  var carboidratos = (gastoDiario*50/100)/4;
  $('#carboidratoEmagrecimento').val(carboidratos.toFixed(2));
  var gorduras = (gastoDiario*15/100)/9;
  $('#gorduraEmagrecimento').val(gorduras.toFixed(2));
}

function mostraModalCalculadora(){
  $('#modalCalculadora').modal('show');
}
function mostraModalRedes(){
  $('#modalRedes').modal('show');
}



