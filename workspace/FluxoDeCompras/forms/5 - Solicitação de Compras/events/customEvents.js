var parameters = {
	processNumber:parseInt(getValue("WKNumProces")),
	processName:getValue("WKDef"),
	currentTask:parseInt(getValue('WKNumState')),
	nextTask:parseInt(getValue("WKNextState")),
	currentUser:getValue("WKUser"),
	currentUserName:null,
	currentUserMail:null,
	userIdSubtitute:getValue("WKReplacement"),
	companyCode:getValue("WKCompany"),
	documentId:getValue("KFormId"),
	task_initial:1,
	form:null
}

function validateInput(input,description){
	if(parameters.form.getValue(input) == null || parameters.form.getValue(input) == ""){
		var isMobile = parameters.form.getMobile();
		if(!isMobile){
			throw '<p class="text-danger"><b>Atenção!</b></p><p>O preenchimento do campo <b>' + description + '</b> é obrigatório.</p>';
		}else{
			throw 'O preenchimento do campo ' + description + ' é obrigatório';
		}
	}
}

function validateInputPxF(table,input,message){
	var isMobile = parameters.form.getMobile();
	var indexes = parameters.form.getChildrenIndexes(table);
	if(indexes.length > 0){
		for(var y = 0;y < indexes.length;y++){
			if(parameters.form.getValue(input + "___" + indexes[y]) == null || parameters.form.getValue(input + "___" + indexes[y]) == ""){
				if(!isMobile){
					throw '<p class="text-danger"><b>Atenção!</b></p><p>O preenchimento do campo <b>' + message + '</b> é obrigatório.</p>';
				}else{
					throw 'O preenchimento do campo ' + message + ' é obrigatório.';
				}
			}
		}
	}
}

function tableRequired(table,tableDescription){
	var isMobile = parameters.form.getMobile();
	if(!Array.isArray(table)){
		table = [table];
	}
	if(!Array.isArray(tableDescription)){
		tableDescription = [tableDescription];
	}
	for(var i = 0;i < table.length;i++){
		var indexes = parameters.form.getChildrenIndexes(table[i]);
		if(indexes.length == 0 || indexes.length == undefined || indexes.length == "" || indexes.length == null){
			if(!isMobile){
				throw '<p class="text-danger"><b>Atenção!</b></p><p>É obrigatório a inclusão de no mínimo <b>01</b> registro na tabela de <b>' + tableDescription[i] + '</b></p>';
			}else{
				throw 'É obrigatório a inclusão de no mínimo 01 registro na tabela de ' + tableDescription[i];
			}
		}
	}
}

function validateInteraction(){
	var isMobile = parameters.form.getMobile();
	var error = true;
	var lastIndex = isNaN(parameters.form.getValue('indexInteractions')) ? 0 : Number(parameters.form.getValue('indexInteractions'));
	var currentIndex = isNaN(parameters.form.getChildrenIndexes('tblInteractions').length) ? 0 : Number(parameters.form.getChildrenIndexes('tblInteractions').length);
	if(currentIndex > 0){
		if(currentIndex > lastIndex){
			error = false;
		}
	}
	if(error){
		if(customizeMessage() && !isMobile){
			throw '<p class="text-danger"><b>Atenção!</b></p><p>É obrigatório a inclusão de registro na <u><b>tabela de Observações</b></u> no painel de Observações, inclua uma linha e detalhe o motivo do envio.</p>';
		}else{
			throw 'É obrigatório a inclusão de registro na tabela de Observações no painel de Observações, inclua uma linha e detalhe o motivo do envio.';
		}
	}
}

function replaceAll(str,de,para){
	try{
		var pos = str.indexOf(de);
		while(pos > -1){
			str = str.replace(de,para);
			pos = str.indexOf(de);
		}
		return(str);
	}catch(e){
		throw e;
	}
}
