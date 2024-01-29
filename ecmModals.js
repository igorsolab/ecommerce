/*
* Arquivo: simulador de preço Modals
* Funçao: funçoes de modal da tela de simulaçao de preço
* Autor: Waldecy Fialho
* Data: 01-04-2022
* Modificaçao: 14-04-2022
*
*/


// modals do projeto
function initModals(){
  let conteudo2  = $('#conteudo2');
  conteudo2.empty();
  conteudo2.append(modalAlert());
  conteudo2.append(modalDetalheXl());
  conteudo2.append(modalDetalheSku()); // arquivo ecmSkus.js
  conteudo2.append(modalDetalheMarca()); // arquivo ecmMarcas.js
  conteudo2.append(modalDetalheEtiqueta()); // arquivo ecmEtiquetas.js
  conteudo2.append(ModalExcluirItemGrpCategoria())
}


function modalAlert(){
  return `<div class="modal fade text-left modal-warning" id="alertModal" style="z-index:9999;">
            <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 50%;">
              <div class="modal-content">
                <div class="modal-header text-white" id="headerAlertModal">
                  <div class="modal-topo">
                    <h5 class="modal-title text-left float-left" id="tituloAlertModal">
                    </h5>
                  </div>
                  <button type="button" class="btn btn-link btn-sm" data-bs-dismiss="modal"><h4><i class="bi bi-x-lg text-white"></i></h4></button>
                </div>
                <div class="modal-body">
                  <div class="modal-topo">
                    <h1> <span class="" id="msgIcone"></span> <h5> Oi <span id="nomeUsuAlertModal"></span> </h5> </h1>
                  </div>

                  <div class="text-wrap text-break" id="msgmodal"></div>
                </div>
              </div>
            </div>
          </div>`;
}

function modalDetalheXl(){
  return `
  <div class="modal" id="modalDetailXl" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-scrollable modal-xl">
          <div class="modal-content">
      
              <div class="modal-header">
              <h5 class="modal-title"><span id="titleDetailXl"></span></h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
      
              <!-- Modal body -->
              <div class="modal-body" id="bodyDetailXl">
              ....
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><i class="fa-solid fa-ban"></i> Cancelar</button>
                  <button type="button" class="btn btn-primary" id="btnDetailXl" ><i class="fa-regular fa-floppy-disk"></i> Salvar</button>
              </div>
          </div>
      </div>
  </div>`
}

function ModalExcluirItemGrpCategoria(){
return `<div class="modal fade" id="modalExcluirItemCategoria" tabindex="-1">
<div class="modal-dialog modal-sm">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Apagar categoria do grupo</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="bodyExcluirItemGrpCategoria">
          ...
        </div>
        <div class="modal-footer" id="footer-excluir-categoria">
        </div>
    </div>
</div>
</div>`
}