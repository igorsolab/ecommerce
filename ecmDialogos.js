/*
* Arquivo: simulador de preço Dialogos
* Funçao: funçoes de dialogos com o usuario
* Autor: Waldecy Fialho
* Data: 01-04-2022
* Modificaçao: 14-04-2022
*
*/


// funçao para incluir produtos
function dialogoIncluirProdutos(idsimulacao,codparc){
  //debugger;
  let html      = '';
  let sql       = `select * from VW_FORNECEDOR_PRODUTOS x where x.CODPARC = ${codparc} `;
  let produtos  = getDadosSql(sql);
  let tabela    = '';
  let codprods  = [] ;

  // valida se o fornecedor tem produtos para exibir
  if(produtos.length == 0 ){
    alertaMsg('Fornecedor não tem produtos para exibir!','E');
  } else {
    sql = `select CODPARC, NOMEPARC from TGFPAR where CODPARC = ${codparc}`;
    let fornecedor = getDadosSql(sql);
    $('#tituloIncProdutosModal').empty().append(fornecedor[0][0]+' - '+fornecedor[0][1]);

    // percorrendo os dados do produtos
    for(let i = 0; i < produtos.length; i++){
      sql = `select count(*)
                    from AD_SIMULADORDEPRECOITEM
                    WHERE id = ${idsimulacao}
                    AND   codprod = ${produtos[i][1]}`;
      console.log('##SQL STATUS PRODUTO', sql);
      let verificador = getDadosSql(sql);
      let status = '';

      if(verificador[0][0] == 0 ){
        status = '<span class="badge bg-success">Incluir</span>';
      }else{
        status = '<span class="badge bg-secondary">Já incluso</span>';
      }

      tabela += `
            <tr>
              <td>${produtos[i][1]}</td>
              <td>${produtos[i][2]}</td>
              <td>${status}</td>
            </tr>
      `;

    }

    html = `
          <div class="table-responsive-md"  style="overflow-x:hidden; overflow-y:auto;  height: 300px;">
            <table class="table table-striped table-hover" style="font-size: 12px">
              <thead class="bg-dark text-white" style="position: sticky; top: 0;">
                <tr>
                  <th>Cod. Produto</th>
                  <th>Descrição</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
              ${tabela}
              </tbody>
            </table>
          </div>
          <p class="text-danger" style="font-size: 10px"> * Serão incluidos somente os produtos com status <span class="badge bg-success">Incluir</span> <br> ** O sistema so carrega produtos que o fornecedor teve movimentaçao de compras!</p>

            `;
    let tela = $('#dadosProdutos');
    let botoes = $('#botoesProdutos');
    tela.empty();
    tela.append(html);
    botoes.empty();
    let htmlbotoes = `
      <button type="button" class="btn btn-success btn-sm" onclick="incluirProdutosLista(${idsimulacao},${codparc})">Incluir Produtos</button>
      <button type="button" class="btn btn-danger btn-sm" data-bs-dismiss="modal">Fechar</button>
    `
    botoes.append(htmlbotoes);

    // exibe modal
    $('#incProdutosModal').modal('show');
  }

}

// funçao de alerta
function alertaMsg(msg,tipo){

  let vMsg    = $("#msgmodal");
  let vIcone  = $("#msgIcone");
  let vHeader = $("#headerAlertModal");
  let vTitulo = $("#tituloAlertModal");
  let vNome   = $("#nomeUsuAlertModal");


  vMsg.empty();
  vMsg.append(msg);
  vIcone.empty();
  vTitulo.empty();
  vNome.empty();
  vNome.append(nomeUsuario);

  vHeader.removeClass("bg-danger bg-warning bg-info")

  if(tipo == "E"){
    vHeader.addClass("bg-danger");
    vTitulo.append('ERRO');
    vIcone.append('<i class="bi bi-emoji-frown"></i>');
  }

  if(tipo == "I"){
    vHeader.addClass("bg-info");
    vTitulo.append('INFO');
    vIcone.append('<i class="bi bi-emoji-smile"></i>');
  }

  if(tipo == "S"){
    vHeader.addClass("bg-success");
    vTitulo.append('SUCESSO');
    vIcone.append('<i class="fa-regular fa-face-laugh"></i>');
  }

  if(tipo == "A"){
    vHeader.addClass("bg-warning");
    vTitulo.append('ALERTA');
    vIcone.append('<i class="bi bi-emoji-smile"></i>');
  }

  $('#alertModal').modal('show');
}
