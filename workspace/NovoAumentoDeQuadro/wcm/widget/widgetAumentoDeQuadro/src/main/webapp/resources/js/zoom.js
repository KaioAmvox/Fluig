function setSelectedZoomItem(selectedItem) {
  try {
    if (selectedItem.inputId == "zoomEmpresa") {
      $("#codEmpresa").val(selectedItem["ZOOMCODIGO"]);
      console.log(
        "Empresa selecionada:",
        selectedItem["ZOOMCODIGO"],
        selectedItem["ZOOMDESCRICAO"]
      );

      // Limpa filial quando empresa muda
      $("#codFilial").val("");
      if (
        window["zoomFilial"] &&
        typeof window["zoomFilial"].clear === "function"
      ) {
        window["zoomFilial"].clear();
      }
    } else if (selectedItem.inputId == "zoomFilial") {
      $("#codFilial").val(selectedItem["ZOOMCODIGO"]);
      console.log("Filial selecionada:", selectedItem["ZOOMCODIGO"]);
    } else if (selectedItem.inputId == "zoomDepartamento") {
      $("#codDepartamento").val(selectedItem["ZOOMCODIGO"]);
      console.log("Departamento selecionado:", selectedItem["ZOOMCODIGO"]);
    } else if (selectedItem.inputId == "zoomFuncao") {
      $("#codFuncao").val(selectedItem["ZOOMCODIGO"]);
      console.log("Função selecionada:", selectedItem["ZOOMCODIGO"]);
    }
  } catch (error) {
    console.error("Erro em setSelectedZoomItem:", error);
  }
}

function removedZoomItem(removedItem) {
  try {
    if (removedItem.inputId == "zoomEmpresa") {
      $("#codEmpresa").val("");
      $("#codFilial").val("");
      if (
        window["zoomFilial"] &&
        typeof window["zoomFilial"].clear === "function"
      ) {
        window["zoomFilial"].clear();
      }
    } else if (removedItem.inputId == "zoomFilial") {
      $("#codFilial").val("");
    } else if (removedItem.inputId == "zoomDepartamento") {
      $("#codDepartamento").val("");
    } else if (removedItem.inputId == "zoomFuncao") {
      $("#codFuncao").val("");
    }
  } catch (error) {
    console.error("Erro em removedZoomItem:", error);
  }
}

// Verifica se as funções estão sendo atribuídas corretamente
window.setSelectedZoomItem = setSelectedZoomItem;
window.removedZoomItem = removedZoomItem;
