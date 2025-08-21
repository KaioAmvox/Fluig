function validateForm(form) {
	
	parameters.form = form;
	
	if (parameters.currentTask != parameters.nextTask) {

		validateInput("zoomFilial","Filial");
		
		tableRequired("tb_produtos", "Itens da Solicitação");

		validateInputPxF("tb_produtos", "zoomProduto",		"Item");
		validateInputPxF("tb_produtos", "dtEntrega",		"Data Necessidade");
		validateInputPxF("tb_produtos", "zoomArmazem",		"Armazém");
		validateInputPxF("tb_produtos", "zoomCentroCusto",	"Centro de Custo");
		validateInputPxF("tb_produtos", "txtQuantidade",	"Quantidade");
		//validateInputPxF("tb_produtos", "txtValorUnitario", "Valor Unitário");
	}
}
