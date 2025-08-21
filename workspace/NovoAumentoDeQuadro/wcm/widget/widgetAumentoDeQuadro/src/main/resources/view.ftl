

<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
<script type="text/javascript" src="/ecm_resources/resources/assets/forms/forms.js"></script>
<div id="widgetAumentoDeQuadro_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="widgetAumentoDeQuadro.instance()">




  <div class="row">

    <div class="col-md-4" style="display: flex; justify-content: center; align-items: center;">
      <ul class="steps-vertical" id="steps-form">
        <li class="step-item" data-step="1">
          <span class="badge rounded-circle">1</span>
          <span class="step-label">Dados básicos</span>
        </li>
        <li class="step-item" data-step="2">
          <span class="badge rounded-circle">2</span>
          <span class="step-label">Local de destino</span>
        </li>
        <li class="step-item" data-step="3">
          <span class="badge rounded-circle">3</span>
          <span class="step-label">Proposta salarial teste</span>
        </li>
        <li class="step-item" data-step="4">
          <span class="badge rounded-circle">4</span>
          <span class="step-label">Informações adicionais</span>
        </li>
      </ul>
    </div>

    <div class="col-md-8">

      <!-- Formulario 01 -->
      <div id="step-1" class="form-step">
        <h3>Dados básicos</h3>
        <div class="form-group">
          <label for="justificativa">Justificativa</label>
          <textarea class="form-control" id="justificativa" name="justificativa" rows="5" placeholder="Insira a justificativa do aumento de quadro."></textarea>
        </div>
        <div class="form-group">
          <label for="previsao">Previsão</label>
          <div class="input-group">
            <input type="text" id="MY_SELECTOR" name="MY_SELECTOR" placeholder="dd/mm/aaaa" class="form-control" />
            <span class="input-group-addon" id="calendar-icon">
              <span class="fluigicon fluigicon-calendar"></span>
            </span>
          </div>
        </div>
        <div class="form-group">
          <label for="quantidadeVagas">Quantidade de vagas</label>
          <input type="number" class="form-control" id="quantidadeVagas" name="quantidadeVagas" placeholder="Ex: 01">
        </div>
        <div class="text-right">
          <button class="btn btn-default" type="button" onclick="cancelForm()">Cancelar
          </button>
          <button class="btn btn-primary" type="button" onclick="nextStep(1)">Avançar
          </button>
        </div>
      </div>

      <!-- Formulario 02 -->
      <div id="step-2" class="form-step" style="display: none;">
        <h3>Local de destino</h3>
        <div class="form-group">
          <label class="required">Empresa</label>
          <input type="hidden" id="codEmpresa" name="codEmpresa">
          <input type="text" id="filterEmpresa" name="filterEmpresa" class="form-control">
        </div>
        
         <div class="form-group">
              <label class="required">Empresa</label>
              <input type="hidden" id="codEmpresa" name="codEmpresa">
              <input type="zoom" id="zoomEmpresa" name="zoomEmpresa" class="form-control" data-zoom="{
      'displayKey':'ZOOMDESCRICAO',
      'datasetId':'dsEmpresas',
      'placeholder':'Selecione a empresa...',
      'fields':[
        {
          'field':'ZOOMDESCRICAO',
          'label':'Descrição',
          'standard':'true'
        }
      ]
    }">
            </div>


        <div class="form-group">
          <label class="required">Filial</label>
          <input type="hidden" id="codFilial" name="codFilial">
          <input type="text" id="filterFilial" name="filterFilial" class="form-control">
        </div>


        <div class="form-group">
          <label class="required">Departamento</label>
          <input type="hidden" id="codDepartamento" name="codDepartamento">
          <input type="text" id="filterDepartamento" name="filterDepartamento" class="form-control">
        </div>


        <div class="text-right">
          <button class="btn btn-default" type="button" onclick="prevStep(2)">Voltar
          </button>
          <button class="btn btn-default" type="button" onclick="cancelForm()">Cancelar
          </button>
          <button class="btn btn-primary" type="button" onclick="nextStep(2)">Avançar
          </button>
        </div>
      </div>

      <!-- Formulario 03 -->
      <div id="step-3" class="form-step" style="display: none;">
        <h3>Dados da vaga</h3>
        <div class="form-group">
          <label class="required">Função</label>
          <input type="hidden" id="codFuncao" name="codFuncao">
          <input type="text" id="filterFuncao" name="filterFuncao" class="form-control">
        </div>


        <h3>Proposta salarial</h3>
        <div class="form-group ">
          <label for="tabelaSalarial">Tabela salarial</label>
          <div class="proposta">
            <input type="text" class="form-control" id="tabelaSalarial" name="tabelaSalarial">
            <button class="btn btn-tabela form-control" type="button">Tabela
              Empresarial</button>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group ">
              <label for="nivelSalarial">Nível salarial</label>
              <input type="text" class="form-control" id="nivelSalarial" name="nivelSalarial">
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="faixaSalarial">Faixa salarial</label>
              <input type="text" class="form-control" id="faixaSalarial" name="faixaSalarial">
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="salarioProposto">Salário proposto (R$)</label>
          <input type="text" class="form-control" id="salarioProposto" name="salarioProposto" placeholder="Exemplo: 2000,00">
        </div>
        <h3>Anexo</h3>
        <div class="form-group">
          <input type="file" id="InputFile" name="InputFile">
          <p class="help-block">Certifique-se de que os documentos estejam legíveis.
            Upload de arquivo de imagem .PNG, .JPEG ou .JPG ou arquivo
            .PDF de até 10 MB.</p>
        </div>
        <div class="text-right">
          <button class="btn btn-default" type="button" onclick="prevStep(3)">Voltar
          </button>
          <button class="btn btn-default" type="button" onclick="cancelForm()">Cancelar
          </button>
          <button class="btn btn-primary" type="button" onclick="nextStep(3)">Avançar
          </button>
        </div>
      </div>

      <!-- Formulario 04 -->
      <div id="step-4" class="form-step" style="display: none;">
        <h3>Informações adicionais</h3>
        <p>Não existem informações adicionais cadastradas no banco de
          dados.</p>
        <div class="text-right">
          <button class="btn btn-default" type="button" onclick="prevStep(4)">Voltar
          </button>
          <button class="btn btn-default" type="button" onclick="cancelForm()">Cancelar
          </button>
          <button class="btn btn-success" type="button" onclick="createRequisition()">Criar requisição</button>
        </div>
      </div>

    </div>
  </div>



  
</div>