$(document).ready(function () {
  var mySimpleCalendar = FLUIGC.calendar("#MY_SELECTOR");

  // Função para atualizar as cores e classes dos passos
  function updateStepColors(current) {
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
  }

  window.nextStep = function (current) {
    document.querySelector(`#step-${current}`).style.display = "none";
    document.querySelector(`#step-${current + 1}`).style.display = "block";
    updateStepColors(current + 1);
  };

  window.prevStep = function (current) {
    document.querySelector(`#step-${current}`).style.display = "none";
    document.querySelector(`#step-${current - 1}`).style.display = "block";
    updateStepColors(current - 1);
  };

  window.cancelForm = function () {
    if (confirm("Deseja realmente cancelar?")) {
      location.reload();
    }
  };

  window.createRequisition = function () {
    alert("Requisição criada com sucesso!");
    const formData = {
      justificativa: $("#justificativa").val(),
      previsao: $("#MY_SELECTOR").val(),
      quantidadeVagas: $("#quantidadeVagas").val(),
      empresa: {
        codigo: $("#codEmpresa").val(),
        descricao: $("#zoomEmpresa").val(),
      },
      filial: {
        codigo: $("#codFilial").val(),
        descricao: $("#zoomFilial").val(),
      },
      departamento: {
        codigo: $("#codDepartamento").val(),
        descricao: $("#zoomDepartamento").val(),
      },
      funcao: {
        codigo: $("#codFuncao").val(),
        descricao: $("#zoomFuncao").val(),
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

    // Redirecionar ou limpar o formulário após sucesso
    // setTimeout(() => { location.reload(); }, 2000);
  };

  updateStepColors(1);
});
