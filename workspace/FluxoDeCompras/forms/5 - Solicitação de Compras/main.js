/*$(window).on("load", function(){
	if($("#codFilial").val() != '' && $("#ATIVI_ATUAL").val() == 1){
		$("#btnAddProduto").attr("disabled", false);	
	}		
});*/


function addItem(){
	
	var codFilial = $("#codFilial").val();
	codFilial = codFilial.substr(0, 2);
	
	if(codFilial == ''){
		FLUIGC.toast({
			title: '',
			message: 'Necessário informar a Filial',
			type: 'info'
		});
		return false
	}else{
		var linha = wdkAddChild('tb_produtos');
		//reloadZoomFilterValues("zoomProduto___" + linha, "FILIALCONSULTA," + codFilial);
		reloadZoomFilterValues("zoomArmazem___" + linha, "FILIAL_CONSULTA," + codFilial);	
	}	
}


function mascaraMoeda(event) {
	const onlyDigits = event.target.value
		.split("")
		.filter(s => /\d/.test(s))
		.join("")
		.padStart(3, "0")
	const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
	event.target.value = maskCurrency(digitsFloat)
}

function maskCurrency(valor, locale = 'pt-BR') {
	return new Intl.NumberFormat(locale, {
		minimumFractionDigits: 2
	}).format(valor)
}

function calcularTotalItem(oElement){
	
	var index = oElement.id.split('___')[1];
	
	var qtd = moeda2float($("#txtQuantidade___" + index).val()); 
	var valorUnit = moeda2float($("#txtValorUnitario___" + index).val()); 
	var total = qtd * valorUnit;
	
	$("#txtValorTotal___" + index).val(float2moeda(total));
	
	calcularTotalPedido();
	
}

function calcularTotalPedido(){
	var soma = 0;
    
	$(".itens-tabela").each(function(){
		
		if(this.id.split("___")[1] == undefined)
			return;
		
		var linha = this.id.split("___")[1];
		var totalItem	= $("#txtValorTotal___"+linha).val();

		soma += moeda2float(totalItem);
	});

	$("#txtTotalPedido").val(float2moeda(soma));
	
}

function moeda2float(moeda){
	if(moeda === '' || moeda === null) return 0;
	if (moeda.indexOf(".")>=0){
		moeda = moeda.replace(".","");
	}

	moeda = moeda.replace(",",".");

	return parseFloat(moeda);
}

function float2moeda(num) {
	
	if(num === "")
		return 0;
	
   x = 0;
   
	if(isNaN(num)) 
		  num = 0;
	
   if(num<0) {
	  num = Math.abs(num);
	  x = 1;
   }   

   cents = Math.floor((num*100+0.5)%100);   
   num = Math.floor((num*100+0.5)/100).toString();
   
   if(cents < 10) cents = "0" + cents;
	  for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
		 num = num.substring(0,num.length-(4*i+3))+"."
			   +num.substring(num.length-(4*i+3));
	ret = num + "," + cents;
	
	if (x == 1) 
		ret = " - " + ret;
	
	return ret;
}

function removeRow(element) {
	fnWdkRemoveChild(element);
	calcularTotalPedido();
}

function removerAcentos(texto) {
    var acentos = {
        'á': 'a', 'à': 'a', 'ã': 'a', 'â': 'a', 'ä': 'a',
        'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
        'í': 'i', 'ì': 'i', 'î': 'i', 'ï': 'i',
        'ó': 'o', 'ò': 'o', 'õ': 'o', 'ô': 'o', 'ö': 'o',
        'ú': 'u', 'ù': 'u', 'û': 'u', 'ü': 'u',
        'ç': 'c', 'Ç': 'C'
    };

    var resultado = '';
    for (var i = 0; i < texto.length; i++) {
        var caractere = texto[i];
        var substituto = acentos[caractere];
        resultado += substituto || caractere;
    }
    return resultado;
}

// Função para lidar com o evento de entrada no campo de texto
function tratarEntrada(event) {
    // Obtém o valor atual do campo de texto
    var valorAtual = event.target.value;
    // Remove os acentos do valor atual
    var valorSemAcentos = removerAcentos(valorAtual);
    // Atualiza o valor do campo de texto sem acentos
    event.target.value = valorSemAcentos;
}