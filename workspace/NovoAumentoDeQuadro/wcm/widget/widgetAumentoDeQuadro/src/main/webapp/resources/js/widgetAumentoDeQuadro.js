var widgetAumentoDeQuadro = SuperWidget.extend({
  init: function () {
    var mySimpleCalendar = FLUIGC.calendar("#MY_SELECTOR");
    this.updateStepColors(1);

    // Bind global
    window.nextStep = this.nextStep.bind(this);
    window.prevStep = this.prevStep.bind(this);
    window.cancelForm = this.cancelForm.bind(this);
    window.createRequisition = this.createRequisition.bind(this);

    // Inicializar filtros com datasets
    this.initFilters();
  },

  // Inicializa os filtros
  initFilters: function () {
    this.initEmpresaFilter();
    this.initFilialFilter();
    this.initDepartamentoFilter();
    this.initFuncaoFilter();
  },

  // Filtro de Empresa
  initEmpresaFilter: function () {
    var empresas = this.getDatasetEmpresas();

    var settingsEmpresa = {
      source: empresas,
      displayKey: "ZOOMDESCRICAO",
      multiSelect: false,
      style: {
        autocompleteTagClass: "tag-gray",
        tableSelectedLineClass: "info",
      },
      table: {
        header: [
          {
            title: "Empresa",
            size: "col-xs-12",
            dataorder: "ZOOMDESCRICAO",
            standard: true,
          },
        ],
        renderContent: ["ZOOMDESCRICAO"],
      },
      onSelected: function (item) {
        $("#codEmpresa").val(item.ZOOMCODIGO);
        console.log("Empresa selecionada:", item);
      },
      onRemove: function () {
        $("#codEmpresa").val("");
      },
    };

    FLUIGC.filter("#filterEmpresa", settingsEmpresa);
  },

  getDatasetEmpresas: function () {
    try {
      var dataset = DatasetFactory.getDataset("dsEmpresas");
      return dataset.values || [];
    } catch (error) {
      console.error("Erro ao buscar empresas:", error);
      // Fallback estático
      return [
        { ZOOMCODIGO: "1", ZOOMDESCRICAO: "AMVOX - MATRIZ" },
        { ZOOMCODIGO: "2", ZOOMDESCRICAO: "AMVOX - SALVADOR" },
        { ZOOMCODIGO: "3", ZOOMDESCRICAO: "AMVOX - LAURO DE FREITAS" },
        { ZOOMCODIGO: "4", ZOOMDESCRICAO: "AMVOX - SÃO PAULO" },
        { ZOOMCODIGO: "5", ZOOMDESCRICAO: "AMVOX - CODEBRAS" },
        { ZOOMCODIGO: "6", ZOOMDESCRICAO: "AMVOX - PORTO ALEGRE" },
      ];
    }
  },

  // Filtro de Filial
  initFilialFilter: function () {
    var filiais = this.getDatasetFiliais();

    var settingsFilial = {
      source: filiais,
      displayKey: "ZOOMDESCRICAO",
      multiSelect: false,
      style: {
        autocompleteTagClass: "tag-gray",
        tableSelectedLineClass: "info",
      },
      table: {
        header: [
          {
            title: "Filial",
            size: "col-xs-12",
            dataorder: "ZOOMDESCRICAO",
            standard: true,
          },
        ],
        renderContent: ["ZOOMDESCRICAO"],
      },
      onSelected: function (item) {
        $("#codFilial").val(item.ZOOMCODIGO);
        console.log("Filial selecionada:", item);
      },
      onRemove: function () {
        $("#codFilial").val("");
      },
    };

    FLUIGC.filter("#filterFilial", settingsFilial);
  },

  getDatasetFiliais: function () {
    try {
      var dataset = DatasetFactory.getDataset("dsFiliais");
      return dataset.values || [];
    } catch (error) {
      console.error("Erro ao buscar filiais:", error);
      // Fallback estático
      return [
        { ZOOMCODIGO: "F1", ZOOMDESCRICAO: "AMVOX - FILIAL 01 - SEDE" },
        { ZOOMCODIGO: "F2", ZOOMDESCRICAO: "AMVOX - FILIAL 02 - NORTE" },
        { ZOOMCODIGO: "F3", ZOOMDESCRICAO: "AMVOX - FILIAL 03 - SUL" },
        { ZOOMCODIGO: "F4", ZOOMDESCRICAO: "AMVOX - FILIAL 04 - LESTE" },
        { ZOOMCODIGO: "F5", ZOOMDESCRICAO: "AMVOX - FILIAL 05 - OESTE" },
      ];
    }
  },

  // Filtro de Departamento
  initDepartamentoFilter: function () {
    var departamentos = this.getDatasetDepartamentos();

    var settingsDepartamento = {
      source: departamentos,
      displayKey: "ZOOMDESCRICAO",
      multiSelect: false,
      style: {
        autocompleteTagClass: "tag-gray",
        tableSelectedLineClass: "info",
      },
      table: {
        header: [
          {
            title: "Departamento",
            size: "col-xs-12",
            dataorder: "ZOOMDESCRICAO",
            standard: true,
          },
        ],
        renderContent: ["ZOOMDESCRICAO"],
      },
      onSelected: function (item) {
        $("#codDepartamento").val(item.ZOOMCODIGO);
        console.log("Departamento selecionado:", item);
      },
      onRemove: function () {
        $("#codDepartamento").val("");
      },
    };

    FLUIGC.filter("#filterDepartamento", settingsDepartamento);
  },

  getDatasetDepartamentos: function () {
    try {
      var dataset = DatasetFactory.getDataset("dsDepartamento");
      return dataset.values || [];
    } catch (error) {
      console.error("Erro ao buscar departamentos:", error);
      // Fallback estático
      return [
        { ZOOMCODIGO: "D1", ZOOMDESCRICAO: "INTELIGÊNCIA" },
        { ZOOMCODIGO: "D2", ZOOMDESCRICAO: "RH" },
        { ZOOMCODIGO: "D3", ZOOMDESCRICAO: "FINANCEIRO" },
        { ZOOMCODIGO: "D4", ZOOMDESCRICAO: "COMERCIAL" },
        { ZOOMCODIGO: "D5", ZOOMDESCRICAO: "PÓS VENDA" },
        { ZOOMCODIGO: "D6", ZOOMDESCRICAO: "TRANSPORTES" },
        { ZOOMCODIGO: "D7", ZOOMDESCRICAO: "ESTOQUE" },
        { ZOOMCODIGO: "D8", ZOOMDESCRICAO: "PRODUÇÃO" },
        { ZOOMCODIGO: "D9", ZOOMDESCRICAO: "IMPORTAÇÃO" },
        { ZOOMCODIGO: "D10", ZOOMDESCRICAO: "COMPRAS NACIONAL" },
        { ZOOMCODIGO: "D11", ZOOMDESCRICAO: "PRODUTOS" },
        { ZOOMCODIGO: "D12", ZOOMDESCRICAO: "FACILITIES" },
        { ZOOMCODIGO: "D13", ZOOMDESCRICAO: "RH/SESMT" },
        { ZOOMCODIGO: "D14", ZOOMDESCRICAO: "CONTABIL" },
        { ZOOMCODIGO: "D15", ZOOMDESCRICAO: "DIRETORIA" },
      ];
    }
  },

  // Filtro de Função
  initFuncaoFilter: function () {
    var funcoes = this.getDatasetFuncoes();

    var settingsFuncao = {
      source: funcoes,
      displayKey: "ZOOMDESCRICAO",
      multiSelect: false,
      style: {
        autocompleteTagClass: "tag-gray",
        tableSelectedLineClass: "info",
      },
      table: {
        header: [
          {
            title: "Função",
            size: "col-xs-12",
            dataorder: "ZOOMDESCRICAO",
            standard: true,
          },
        ],
        renderContent: ["ZOOMDESCRICAO"],
      },
      onSelected: function (item) {
        $("#codFuncao").val(item.ZOOMCODIGO);
        console.log("Função selecionada:", item);
      },
      onRemove: function () {
        $("#codFuncao").val("");
      },
    };

    FLUIGC.filter("#filterFuncao", settingsFuncao);
  },

  getDatasetFuncoes: function () {
    try {
      var dataset = DatasetFactory.getDataset("dsFuncoes");
      return dataset.values || [];
    } catch (error) {
      console.error("Erro ao buscar funções:", error);
      // Fallback estático
      return [
        {
          ZOOMCODIGO: "Analista de Sistemas",
          ZOOMDESCRICAO: "Analista de Sistemas",
        },
        {
          ZOOMCODIGO: "Desenvolvedor Front-end",
          ZOOMDESCRICAO: "Desenvolvedor Front-end",
        },
        {
          ZOOMCODIGO: "Desenvolvedor Back-end",
          ZOOMDESCRICAO: "Desenvolvedor Back-end",
        },
        {
          ZOOMCODIGO: "Gerente de Projetos",
          ZOOMDESCRICAO: "Gerente de Projetos",
        },
        { ZOOMCODIGO: "Analista de RH", ZOOMDESCRICAO: "Analista de RH" },
        {
          ZOOMCODIGO: "Assistente Administrativo",
          ZOOMDESCRICAO: "Assistente Administrativo",
        },
        { ZOOMCODIGO: "Contador", ZOOMDESCRICAO: "Contador" },
        {
          ZOOMCODIGO: "Analista Financeiro",
          ZOOMDESCRICAO: "Analista Financeiro",
        },
        { ZOOMCODIGO: "Designer Gráfico", ZOOMDESCRICAO: "Designer Gráfico" },
        { ZOOMCODIGO: "Vendedor", ZOOMDESCRICAO: "Vendedor" },
        {
          ZOOMCODIGO: "Operador de Produção",
          ZOOMDESCRICAO: "Operador de Produção",
        },
        { ZOOMCODIGO: "Motorista", ZOOMDESCRICAO: "Motorista" },
        { ZOOMCODIGO: "Advogado", ZOOMDESCRICAO: "Advogado" },
        {
          ZOOMCODIGO: "Analista de Marketing",
          ZOOMDESCRICAO: "Analista de Marketing",
        },
        { ZOOMCODIGO: "Coordenador de TI", ZOOMDESCRICAO: "Coordenador de TI" },
        { ZOOMCODIGO: "Gerente de Vendas", ZOOMDESCRICAO: "Gerente de Vendas" },
        {
          ZOOMCODIGO: "Analista de Logística",
          ZOOMDESCRICAO: "Analista de Logística",
        },
        {
          ZOOMCODIGO: "Especialista em SEO",
          ZOOMDESCRICAO: "Especialista em SEO",
        },
        {
          ZOOMCODIGO: "Gerente de Recursos Humanos",
          ZOOMDESCRICAO: "Gerente de Recursos Humanos",
        },
        { ZOOMCODIGO: "Analista de Dados", ZOOMDESCRICAO: "Analista de Dados" },
        {
          ZOOMCODIGO: "Engenheiro de Software",
          ZOOMDESCRICAO: "Engenheiro de Software",
        },
        {
          ZOOMCODIGO: "Arquiteto de Soluções",
          ZOOMDESCRICAO: "Arquiteto de Soluções",
        },
        {
          ZOOMCODIGO: "Especialista em Segurança da Informação",
          ZOOMDESCRICAO: "Especialista em Segurança da Informação",
        },
      ];
    }
  },

  // Métodos de navegação (mantenha os existentes)
  updateStepColors: function (current) {
    const steps = document.querySelectorAll("#steps-form .step-item");
    steps.forEach((step, index) => {
      step.classList.remove("step-success", "step-active", "step-pending");
      const stepNumber = index + 1;
      if (stepNumber < current) {
        step.classList.add("step-success");
      } else if (stepNumber === current) {
        step.classList.add("step-active");
      } else {
        step.classList.add("step-pending");
      }
    });
  },

  nextStep: function (current) {
    document.querySelector(`#step-${current}`).style.display = "none";
    document.querySelector(`#step-${current + 1}`).style.display = "block";
    this.updateStepColors(current + 1);
  },

  prevStep: function (current) {
    document.querySelector(`#step-${current}`).style.display = "none";
    document.querySelector(`#step-${current - 1}`).style.display = "block";
    this.updateStepColors(current - 1);
  },

  cancelForm: function () {
    if (confirm("Deseja realmente cancelar?")) {
      location.reload();
    }
  },

  createRequisition: function () {
    const formData = {
      justificativa: $("#justificativa").val(),
      previsao: $("#MY_SELECTOR").val(),
      quantidadeVagas: $("#quantidadeVagas").val(),
      empresa: {
        codigo: $("#codEmpresa").val(),
        descricao: $("#filterEmpresa").val(),
      },
      filial: {
        codigo: $("#codFilial").val(),
        descricao: $("#filterFilial").val(),
      },
      departamento: {
        codigo: $("#codDepartamento").val(),
        descricao: $("#filterDepartamento").val(),
      },
      funcao: {
        codigo: $("#codFuncao").val(),
        descricao: $("#filterFuncao").val(),
      },
      tabelaSalarial: $("#tabelaSalarial").val(),
      nivelSalarial: $("#nivelSalarial").val(),
      faixaSalarial: $("#faixaSalarial").val(),
      salarioProposto: $("#salarioProposto").val(),
      exampleInputFile: $("#InputFile").val(),
    };

    console.log("Dados do formulário:", formData);
    FLUIGC.toast({
      title: "Sucesso",
      message: "Requisição criada com sucesso!",
      type: "success",
    });
  },
});
