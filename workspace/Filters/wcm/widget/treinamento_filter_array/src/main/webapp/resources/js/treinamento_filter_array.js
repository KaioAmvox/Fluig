var TreinaFilterArray = SuperWidget.extend({
  //variáveis da widget
  variavelNumerica: null,
  variavelCaracter: null,
  filter: null,

  //método iniciado quando a widget é carregada
  init: function () {
    this.iniciarFiltroArray();
    this.initFilterDatasets();
    this.initialFilterApi();
  },

  //BIND de eventos
  bindings: {
    local: {
      "filter-add-item": ["click_add"],
      "filter-remove-all": ["click_removeAll"],
      "filter-get-selected-items": ["click_getSelectedItems"],
      "filter-reload": ["click_reload"],
      "filter-focus": ["click_focus"],
      "filter-disable": ["click_disable"],
      "filter-enable": ["click_enable"],
      "filter-open": ["click_open"],
      "filter-close": ["click_close"],
    },
    global: {},
  },

  initialFilterApi: function () {
    var settings = {
      source: {
        url: "/process-management/api/v2/processes",
        contentType: "application/json",
        root: "items",
        pattern: "",
        limit: 10,
        offset: 0,
        patternKey: "processDescription",
        limitkey: "pageSize",
        offsetKey: "page",
      },
      displayKey: "processDescription",
      multiSelect: true,
      style: {
        autocompleteTagClass: "tag-gray",
        tableSelectedLineClass: "info",
      },
      table: {
        header: [
          {
            title: "Processo",
            size: "col-xs-3",
          },
        ],
        renderContent: ["processDescription"],
        formatData: function (data) {
          if (data && data.items && Array.isArray(data.items)) {
            data.items.forEach((item) => {
              item.processDescription = item.processDescription.toUpperCase();
            });
          } else {
            console.warn(
              "data.items não está disponível ou não é um array.",
              data
            );
          }
          return data;
        },
      },
    };

    var filter = FLUIGC.filter(
      "#filter-example-api_" + this.instanceId,
      settings
    );
  },

  initFilterDatasets: function () {
    var users = this.getDatasetUsers();

    var settingsExampleDataset = {
      source: users,
      displayKey: "colleagueName",
      multiSelect: true,
      style: {
        autocompleteTagClass: "tag-gray",
        tableSelectedLineClass: "info",
      },
      table: {
        header: [
          {
            title: "colleagueName",
            size: "col-xs-9",
            dataorder: "colleagueName",
            standard: true,
          },
        ],
        renderContent: ["colleagueName"],
      },
    };

    var filter = FLUIGC.filter(
      "#filter-example-dataset_" + this.instanceId,
      settingsExampleDataset
    );
  },

  getDatasetUsers: function () {
    try {
      // Busca o dataset de usuários
      var dataset = DatasetFactory.getDataset("colleague");
      var users = dataset.values;
      return users;
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  //métodos da widget
  add: function () {
    var item = {
      company: "Treinamento",
      id: 8,
    };
    this.filter.add(item);
  },

  removeAll: function () {
    this.filter.removeAll();
  },

  getSelectedItems: function () {
    console.log(this.filter.getSelectedItems());
  },

  reload: function (settings) {
    var source = [
      {
        company: "Reloaded",
        id: 0,
      },
      {
        company: "Wonka Industries",
        id: 1,
      },
      {
        company: "Acme Corp",
        id: 2,
      },
      {
        company: "Stark Industries",
        id: 3,
      },
      {
        company: "Ollivander's Wand Shop",
        id: 4,
      },
      {
        company: "Wayne Enterprises",
        id: 5,
      },
      {
        company: "Cheers",
        id: 6,
      },
      {
        company: "Gekko & Co",
        id: 7,
      },
      {
        company: "Treinamento",
        id: 8,
      },
    ];
    var settingsExampleArray = {
      source: source,
      displayKey: "company",
      multiSelect: true,
      style: {
        autocompleteTagClass: "tag-danger",
        tableStyle: "table-hover table-bordered",
        filterIconClass: "flaticon flaticon-user-search icon-sm",
      },
      table: {
        header: [
          {
            title: "Company Name",
            size: "col-md-3",
            dataorder: "company",
            standard: true,
            display: "true",
          },
          {
            title: "ID",
            size: "col-md-2",
            dataorder: "id",
            standard: false,
            display: "true",
          },
        ],
        renderContent: ["company", "id"],
      },
    };

    this.filter.reload(settingsExampleArray);
  },

  focus: function () {
    this.filter.focus();
  },

  disable: function (state) {
    this.filter.disable(true);
  },

  enable: function () {
    this.filter.disable(false);
  },
  open: function () {
    this.filter.open();
  },

  close: function () {
    this.filter.close();
  },

  iniciarFiltroArray: function () {
    var source = [
      {
        company: "Wonka Industries",
        id: 1,
      },
      {
        company: "Acme Corp",
        id: 2,
      },
      {
        company: "Stark Industries",
        id: 3,
      },
      {
        company: "Ollivander's Wand Shop",
        id: 4,
      },
      {
        company: "Wayne Enterprises",
        id: 5,
      },
      {
        company: "Cheers",
        id: 6,
      },
      {
        company: "Gekko & Co",
        id: 7,
      },
      {
        company: "Treinamento",
        id: 8,
      },
    ];

    var settingsExampleArray = {
      source: source,
      displayKey: "company",
      multiSelect: true,
      style: {
        autocompleteTagClass: "tag-gray",
        tableSelectedLineClass: "info",
      },
      table: {
        header: [
          {
            title: "Empresa",
            size: "col-xs-9",
            dataorder: "company",
            standard: true,
          },
          {
            title: "Identificador",
            size: "col-xs-9",
            dataorder: "id",
            standard: false,
          },
        ],
        renderContent: ["company", "id"],
      },
    };

    this.filter = FLUIGC.filter(
      "#filter-example-array_" + this.instanceId,
      settingsExampleArray
    )
      .on("fluig.filter.item.added", function (data) {
        console.log("[fluig.filter.item.added]", data);
      })
      .on("fluig.filter.beforeItemAdd", function () {
        console.log("[fluig.filter.beforeItemAdd]");
      });
  },
});
