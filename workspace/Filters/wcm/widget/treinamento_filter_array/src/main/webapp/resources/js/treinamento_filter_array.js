var TreinaFilterArray = SuperWidget.extend({
  //variáveis da widget
  variavelNumerica: null,
  variavelCaracter: null,

  //método iniciado quando a widget é carregada
  init: function () {
    this.iniciarFiltroArray();
  },

  //BIND de eventos
  bindings: {
    local: {
      execute: ["click_executeAction"],
    },
    global: {},
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

    var filter = FLUIGC.filter("#filter-example-array", settingsExampleArray);
  },
});
