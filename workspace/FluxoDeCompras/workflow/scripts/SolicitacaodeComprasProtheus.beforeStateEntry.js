function beforeStateEntry(sequenceId){
	var task_fim = 9;
	if(sequenceId == task_fim){
		
		var datasetToken = DatasetFactory.getDataset('dsToken', null, null, null);
        var EMPRESA = datasetToken.getValue(0, 'empresa');
		var basic = datasetToken.getValue(0, 'basic');

		var clientService = fluigAPI.getAuthorizeClientService();
		
		//var EMPRESA 	= hAPI.getCardValue("cmbEmpresa");      
	    var FILIAL		= hAPI.getCardValue("codFilial");
	    
	    //var SOLICITANTE	= hAPI.getCardValue("zoomUsuarioProtheus");
	    //var COD_SOLICITANTE	= hAPI.getCardValue("usuarioProtheus");
	    
	    var SOLICITANTE	= hAPI.getCardValue("txtNomeSolicitante");
	    var COD_SOLICITANTE	= "";
	    var NUMFLUIG	= getValue("WKNumProces");
		
		var ITENS = [];
		
		var indexes = hAPI.getChildrenIndexes("tb_produtos");
	
		for (var i = 0; i < indexes.length; i++) {
			
			log.info("Observação do item--> " + hAPI.getCardValue("obsItem___" + indexes[i]));
			var obs = removerAcentos(hAPI.getCardValue("obsItem___" + indexes[i]));
			log.info("Observação removerAcentos--> " + obs);

			ITENS.push({
					codProduto :	hAPI.getCardValue("codProduto___" + indexes[i]),
					quantidade : 	moeda2float(hAPI.getCardValue("txtQuantidade___" + indexes[i])),
					preco : 		moeda2float(hAPI.getCardValue("txtValorUnitario___" + indexes[i])),
					centroCusto :	hAPI.getCardValue("codCentroCusto___" + indexes[i]),
					previsaoEntrega:convertDataToBR(hAPI.getCardValue("dtEntrega___" + indexes[i])),
					observacao : 	hAPI.getCardValue("obsItem___" + indexes[i]),
					local : 		hAPI.getCardValue("codArmazem___" + indexes[i]),
					idFluig : 		NUMFLUIG,
					//necessidade : 	hAPI.getCardValue("txtNecessidade___" + indexes[i]),
				});
		}
		
		var data = {
		        companyId : getValue("WKCompany") + '',
		        serviceCode : 'PROTHEUS_REST',
		        endpoint : '/serviceSolicitacaoCompras/incluiSolicitacaoCompras',
		        method : 'POST',
		        timeoutService: '5000', // segundos
		        params : {
					solicitacaoCompras:{
			        	empresa: 				EMPRESA,
			        	filial: 				FILIAL,
			        	solicitante:			SOLICITANTE,
						codigoSolicitante:		COD_SOLICITANTE,				 
						itensSolicitacaoCompras:ITENS
					}
		        },
		        options : {
		            mediaType: 'application/json',
		            useSSL : false
		         },
		        headers: {
					'Content-Type' : 'application/json;charset=UTF-8',
		            Basic: '' + basic
		        }            
		    }
		
		log.info("#### REQUISIÇÃO SOLICITAÇÃO DE COMPRA -->");
		log.dir(data);
		
		var dados = clientService.invoke(JSON.stringify(data, replacer));
		
		var json = JSON.parse(dados.getResult());
		
		if(json["success"] == true){
			hAPI.setCardValue("txtNumSC", json["data"]["numeroSolicitacao"]);
			hAPI.setCardValue("txtNumFluig", NUMFLUIG);
		}else{
			throw 'Erro ao gravar dados no Protheus. ' + json["message"] + ' Contate o administrador do sistema.';
		}
	}
}

function moeda2float(moeda){
	if(moeda === '' || moeda === null) return 0;
	if (moeda.indexOf(".")>=0){
		moeda = moeda.replace(".","");
	}

	moeda = moeda.replace(",",".");

	return parseFloat(moeda);
}

var replacer = function(key, value) {
   var returnValue = value;
   try {
      if (value.getClass() !== null) { // If Java Object
         // qie.debug(key + ': value.getClass() = ' + value.getClass());
         if (value instanceof java.lang.Number) {
            returnValue = 1 * value;
         } else if (value instanceof java.lang.Boolean) {
            returnValue = value.booleanValue();
         } else { // if (value instanceof java.lang.String) {
            returnValue = '' + value;
         }
      }else{
    	  returnValue = '';
      }
   } catch (err) {
	   log.info('ERROR REPLACE =>' + err + " : KEY =>" + key);
   }
   return returnValue;
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

function convertDataToBR(strData){
    if(strData == '')
		return '';

	if(strData.indexOf("/") >= 0)
        strData = strData.split('/');
    else
        strData = strData.split('-');    

    if(strData[0].length == 4)
        return strData[0] + '/' + strData[1] + '/' + strData[2];
    else
       return strData[2] + '/' + strData[1] + '/' + strData[0];
}