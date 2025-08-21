function setSelectedZoomItem(selectedItem) {

    if(selectedItem.inputId == 'zoomFilial'){
        $("#codFilial").val(selectedItem["CODIGO"]);
		//$('table[tablename=tb_produtos] tbody tr').not(':first').remove();
		
		var campos = $('input[name^="txtQuantidade___"]');
		var filial = $("#codFilial").val();
		
		for (var i=0; i < campos.length; i++){
		    var index = campos[i].id.split('___')[1];
		
		    $("#codArmazem___" + index).val('');
		    window['zoomArmazem___' + index].clear();
		    reloadZoomFilterValues("zoomArmazem___" + index, "FILIAL_CONSULTA," + filial);
		}
    }

	else if(selectedItem.inputId == 'zoomUsuarioProtheus'){
        $("#usuarioProtheus").val(selectedItem["idUsuario"]);
    }
    
    else if(selectedItem.inputId.includes('zoomCentroCusto')){
		var index = selectedItem.inputId.split('___')[1]; 
        $("#codCentroCusto___" + index).val(selectedItem["centroCusto"]); 
    }

    else if(selectedItem.inputId.includes('zoomProduto')){
        
        var index = selectedItem.inputId.split('___')[1];        
        $("#codProduto___" + index).val(selectedItem["codProduto"]);
        $("#unidadeMedida___" + index).val(selectedItem["unidadeMedida"]);
        $("#unidadeMedida___" + index).attr("title", selectedItem["descUnidadeMedida"]);

		var ultimoPrecoCompra = selectedItem["ultimoPreco"];
		var qtd = moeda2float($("#txtQuantidade___" + index).val());
		
		var valorTotal = ultimoPrecoCompra * qtd;
		$("#txtValorUnitario___" + index).val(float2moeda(ultimoPrecoCompra));
		$("#txtValorTotal___" + index).val(float2moeda(valorTotal));
		
		var armazemProduto = selectedItem["armazemPadrao"];
        $("#codArmazem___" + index).val(armazemProduto);

		var c1 = DatasetFactory.createConstraint('FILTRO_PRODUTO', armazemProduto, armazemProduto, ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint('FILIAL_CONSULTA', codFilial, codFilial, ConstraintType.MUST);
		var dsArmazem = DatasetFactory.getDataset("dsArmazens_Protheus", null, new Array(c1, c2), null);
		
		if(dsArmazem && dsArmazem.values.length > 0){
			window['zoomArmazem___' + index].setValue(dsArmazem.values[0].ZOOMDESCRICAO);
		}
    }

    else if(selectedItem.inputId.includes('zoomArmazem')){
        
        var index = selectedItem.inputId.split('___')[1];        
        $("#codArmazem___" + index).val(selectedItem["codArmazem"]);
    }
}

function removedZoomItem(removedItem) {
    if(removedItem.inputId == 'zoomFilial'){
        $("#codFilial").val('');
		$('table[tablename=tb_produtos] tbody tr').not(':first').remove();
		
		/*var campos = $('input[name^="txtQuantidade___"]');
		var filial = $("#codFilial").val();
		
		for (var i=0; i < campos.length; i++){
		    var index = campos[i].id.split('___')[1];
		
		    $("#codArmazem___" + index).val('');
		    window['zoomArmazem___' + index].clear();
		    reloadZoomFilterValues("zoomArmazem___" + index, "FILIAL_CONSULTA," + filial);
		}*/
    }

	else if(removedItem.inputId.includes('zoomCentroCusto')){        
        var index = removedItem.inputId.split('___')[1];        
        $("#codCentroCusto___" + index).val('');
    }

    else if(removedItem.inputId.includes('zoomProduto')){        
        var index = removedItem.inputId.split('___')[1];        
        $("#codProduto___" + index).val('');
        $("#unidadeMedida___" + index).val('');
        $("#unidadeMedida___" + index).removeAttr("title");

		$("#codArmazem___" + index).val('');
		window['zoomArmazem___1'].clear()
    }

    else if(removedItem.inputId.includes('zoomArmazem')){        
        var index = removedItem.inputId.split('___')[1];        
        $("#codArmazem___" + index).val();
    }
}