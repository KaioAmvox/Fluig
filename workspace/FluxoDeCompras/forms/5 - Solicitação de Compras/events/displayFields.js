function displayFields(form,customHTML){
	
	customHTML.append("<script>");
	customHTML.append("function getNumState(){ return "+ getValue("WKNumState") +"; }");	
	customHTML.append("function getNextState(){ return "+ getValue("WKNextState") +"; }");
	customHTML.append("function getNumProcess(){ return "+ getValue("WKNumProces") +"; }");	
	customHTML.append("function getFormMode(){ return '"+ form.getFormMode() +"'; }");
	customHTML.append("</script>");
	
	/*if(form.getValue("txtDtSolicitacao") == '' || form.getValue("txtDtSolicitacao") == null){
		form.setValue("txtDtSolicitacao",getDate());
	}
	
	if(form.getValue("txtNomeSolicitante") == '' || form.getValue("txtNomeSolicitante") == null){
		
		var usuarioLogado = fluigAPI.getUserService().getCurrent();		
		form.setValue('txtNomeSolicitante', usuarioLogado.getFullName());
		form.setValue('txtCodSolicitante', usuarioLogado.getCode());
		form.setValue('txtEmailSolicitante', usuarioLogado.getEmail());
	}*/
	
	if(form.getValue('txtNomeSolicitante') == ''){
		var usuarioLogado = fluigAPI.getUserService().getCurrent();
		
		form.setValue('txtNomeSolicitante', usuarioLogado.getFullName());
		form.setValue('txtCodSolicitante', usuarioLogado.getCode());
		form.setValue('txtEmailSolicitante', usuarioLogado.getEmail());
		
		var dataHoje = new Date();
		dataHoje = dataHoje.toISOString().substr(0,10).split('-').reverse().join('/')
		form.setValue('txtDtSolicitacao', dataHoje);
		//form.setValue('txtDtSolicitacao', new Date().toLocaleDateString("pt-BR"));
	}
	
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	
	if(form.getFormMode() == 'VIEW' || (getValue("WKNumState") != 1 && getValue("WKNumState") != 0)){
		displayBtnitens();
	}
	
	function displayBtnitens(){
		customHTML.append("<script>");
			customHTML.append("$('.hidden-delete').hide();");
			customHTML.append("$('#btnAddProduto').hide();");
		customHTML.append("</script>");
	}
	
	
}