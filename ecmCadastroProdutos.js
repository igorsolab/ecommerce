function modalPesquisaProduto() {
    let importacaoProdutos = `
    <div id="mPesquisaProduto">

        <div class="row d-flex align-items-center">
          <div class="col-3">
            <form class="mb-3">
                <div class="form-group">
                    <label for="email">Produto:</label>
                    <input type="text" class="form-control" onkeyup="pesquisaProduto();" placeholder="Digite para pesquisar" id="proddesc">
                </div>
            </form>
          </div>
          <div class="form-check col-3">
            <input class="form-check-input" onchange="pesquisaProduto();" type="checkbox" id="checkprodutosativos" checked>
            <label class="form-check-label" for="flexCheckChecked">
              Apenas ativos
            </label>
          </div>
          <div class="form-check col-3">
          <input class="form-check-input" onchange="pesquisaProduto();" type="checkbox" id="checkestoque" checked>
          <label class="form-check-label" for="flexCheckChecked">
            Apenas produtos com estoque
          </label>
        </div>
          <div class="col-3" onchange="pesquisaProduto();">
            <select class="form-select" id="categoriasProdutos" aria-label="Categorias">
              <option value="" selected>Selecione uma categoria</option>
            </select>
          </div>

        </div>

        <div style="overflow-x:auto; overflow-y:auto;  height: 80vh;>
            <div class="table-responsive-lg">
                <table class="table table-hover table-bordered table-striped" style=" font-size: 0.85rem"
                    id="table_import_product"
                    data-search="true" 
                    data-search-selector="#pesquisa">
                    <thead class="table-dark" style="position: sticky; top: 0;">
                        <tr>
                            <th style="cursor:pointer" title="Ordenar por código" onclick="pesquisaProduto('z.CODPROD')">Codigo</th>
                            <th style="cursor:pointer" title="Ordenar por descrição" onclick="pesquisaProduto('z.COMPLDESC')">Descrição</th>
                            <th style="cursor:pointer" title="Ordenar por categoria" onclick="pesquisaProduto('gru.DESCRGRUPOPROD')">Categoria</th>
                            <th>SKU</th>
                            <th>STATUS</th>
                            <th style="cursor:pointer" title="Ordenar por estoque" onclick="pesquisaProduto('vp.estoque_disponivel DESC')">ESTOQUE</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="tbprodutos"></tbody>
                </table>
            </div>
        </div>
    </div>`;

    let tela    = $('#dados');
    tela.empty();
    tela.append(importacaoProdutos);
    
    pesquisaProduto()
    selectCategoriaImport()
    // console.log(tela[0].outerHTML)
}

function selectCategoriaImport(){
  let categoriasProdutos = $("#categoriasProdutos")
  let sql = `
    SELECT gru.CODGRUPOPROD, gru.DESCRGRUPOPROD FROM TGFGRU gru
    INNER JOIN TGFPRO z ON z.CODGRUPOPROD = gru.CODGRUPOPROD
    WHERE z.USOPROD = 'R'   
    AND z.CODPROD NOT IN (SELECT PRODUTOIDSK FROM AD_ECMSKUS) 
    GROUP BY gru.CODGRUPOPROD, gru.DESCRGRUPOPROD , z.USOPROD 
  `
  let dados = getDadosSql(sql,true)

  let options = ""
  dados.forEach((element) => {
    options += `<option value="${element.CODGRUPOPROD}">${element.DESCRGRUPOPROD}</option>`
  })
  categoriasProdutos.append(options)
}

// monta tabela skus
function montaTabelaSkuEcm(idproduto){
    let skus = listSkusEcm(idproduto);
    let html = "";
    let tela = $('#tbskusimp');


    for(let i=0; i < skus.length; i++){

        let status = "";

        if(skus[i].ATIVO == 'S' && skus[i].AD_FORADELINHA == 'S'){
            status = `<span class="badge bg-warning">Fora de Linha</span>`;
        }else if(skus[i].ATIVO == 'S' && skus[i].AD_FORADELINHA == 'N'){
            status = `<span class="badge bg-info">Ativo</span>`;
        }else {
            status = `<span class="badge bg-secondary">Inativo</span>`;
        }

        html += `
            <tr>
                <td>${skus[i].SKU}</td>
                <td>${skus[i].NAME}</td>
                <td style="text-align: right;">${skus[i].ESTOQUE}</td>
                <td style="text-align: center;">${status}</td>
            </tr>
        `;
    } 

    tela.empty();
    tela.append(html);
}
// pesquisa de produto
function pesquisaProduto(ordenacao){
    
    let prodesc = $('#proddesc').val();
    let ativo   = $("#checkprodutosativos");
    let categoria = $("#categoriasProdutos").val();
    let checkestoque = $("#checkestoque");
    console.log("Categoria: ",categoria)
  
    // if(prodesc.length >= 2 ) {
  
      let   sql     = ` SELECT z.CODPROD, 
                            z.COMPLDESC AS DESCRICAO , 
                            z.REFERENCIA AS SKU, 
                            gru.DESCRGRUPOPROD as CATEGORIA,
                            z.ATIVO, 
                            z.AD_FORADELINHA,
                            vp.estoque_disponivel as ESTOQUE,
                            ISNULL((SELECT DISTINCT 'S' FROM sankhya.TGFICP t  WHERE t.CODPROD = z.CODPROD),'N') as KIT
                            FROM TGFPRO z
                            INNER JOIN v_precoecommerce vp ON vp.codproduto = z.CODPROD
                            INNER JOIN TGFGRU gru ON gru.CODGRUPOPROD = z.CODGRUPOPROD
                            WHERE z.USOPROD = 'R' 
                            ${categoria ? `AND gru.CODGRUPOPROD = ${categoria}` : ""}
                            ${ativo.prop('checked') ? "AND z.ATIVO = 'S' AND z.AD_FORADELINHA = 'N'" : ''}
                            ${checkestoque.prop('checked') ? "AND vp.estoque_disponivel > 0" : ''}
                            AND CONCAT(z.COMPLDESC ,' ', z.MARCA, ' ', z.CODPROD) like UPPER('%`+prodesc+`%')
                            AND z.CODPROD NOT IN (SELECT PRODUTOIDSK FROM AD_ECMSKUS) 
                            ORDER BY ${ordenacao ? ordenacao : "z.REFERENCIA"}`;
  
      let   data    = getDadosSql(sql, true);
      console.log(sql)

      let tabela    = $("#tbprodutos")
      tabela.empty();


      for(let i = 0; i < data.length; i++){
  
        let disabled = ""
        let botaoCls = "btn-outline-primary"
  
        if(data[i].ATIVO == 'N' || data[i].AD_FORADELINHA == 'S' || data[i].KIT == 'S') {
          disabled = 'disabled';
          botaoCls = 'btn-outline-secondary';
        } 
  
        let botao = `
        <div class="d-grid">
          <button type="button" onclick="importarProduto(`+data[i].CODPROD+`)" class="btn ${botaoCls} btn-block btn-sm" style="font-size: 0.70rem" ${disabled}>Importar</button>
        </div>`
        let status = "";
  
        if(data[i].ATIVO == 'S' && data[i].AD_FORADELINHA == 'N') {
          status =`<span class="badge bg-success">Ativo</span>`;
        }else if(data[i].ATIVO == 'S' && data[i].AD_FORADELINHA == 'S'){
          status = `<span class="badge bg-warning">Fora de Linha</span>`
        }else{
          status = `<span class="badge bg-secondary">Inativo</span>`
        }
  
        tabela.append("<tr>"+
                        "<td>"+data[i].CODPROD+"</td>"+
                        "<td>"+data[i].DESCRICAO+"</td>"+
                        "<td>"+data[i].CATEGORIA+"</td>"+
                        "<td>"+data[i].SKU+"</td>"+
                        '<td style="text-align: center;">'+status+'</td>'+
                        "<td>"+data[i].ESTOQUE+"</td>"+
                        '<td style="text-align: center;">'+botao+'</td>'+
                      "</tr>")
  
      }
    // }
  
}
  
  // importar produto e skus para ecommerce 
function importarProduto(codprod) {
    
    // fechaTelaPesquisaProduto();
    
    let sql = "select * from TGFPRO where codprod = "+codprod;
    let produto = getDadosSql(sql,true);
  
    sql = "select count(*) from AD_ECMPRODUTOS WHERE SKU ='"+produto[0].AD_IDPRODUTO+"'";
    let qtdprod = getDadosSql(sql);
  
    sql = "select ISNULL(MAX(IDPRODUTO),0) + 1 FROM AD_ECMPRODUTOS ae "
    let numeracao   = getDadosSql(sql);
    let urlfrendly  = formataUrl(produto[0].DESCRPROD);
    let sku         = produto[0].AD_IDPRODUTO;
    let name        = produto[0].DESCRPROD.trim();
    let idproduto   = 0;
    let marca       = produto[0].MARCA.trim();
    
    sql = `SELECT COUNT(*) FROM AD_ECMMARCAS WHERE NAME = '${marca}'`;
    let qtdMarca    = getDadosSql(sql); 
    let idmarca     = 0;
  
  
    if(qtdprod[0][0] > 0 && qtdsku[0][0] > 0 ) {
      alertaMsg("Produto já importado ! SKU ja importado");
    } 
  
    if(qtdMarca == 0 ) {
        let obj = {}
        obj.NAME            = marca
        obj.URL             = ''
        obj.URLFRIENDLY     = formataUrl(marca)
        obj.PAGETITLE       = txCapitular(marca)
        obj.ALTERNATETITLE  = txCapitular(marca)
        obj.ISENABLED       = 'S'
        obj.KEYWORDS        = ''
        obj.DESCRIPTION     = ''
        obj.METADESCRIPTION = ''
        obj.ENVIAR          = 'N'

        idmarca = saveMarca(obj,'')
    }else{
      sql = `SELECT IDMARCA FROM AD_ECMMARCAS WHERE NAME = '${marca}'`;
      idmarca = getDadosSql(sql);
      idmarca = idmarca[0][0];
    }
  
    if(qtdprod[0][0] == 0 ) {
      idproduto = novoProduto(numeracao[0][0],sku, idmarca, name, urlfrendly, codprod);
    }
  
    if(idproduto == 0  || idproduto == undefined){
      sql = `SELECT IDPRODUTO FROM AD_ECMPRODUTOS WHERE SKU = '`+sku+`'`;
      prod = getDadosSql(sql);
      idproduto = prod[0][0];
    }
  
    sql = `SELECT * FROM TGFPRO WHERE AD_IDPRODUTO = ${sku}`;
    produtos = getDadosSql(sql,true);
  
    // varre em busca de skus
    for(let i=0; i < produtos.length; i++){
  
      sql = `SELECT count(*) from AD_ECMSKUS WHERE PRODUTOIDSK = ${produtos[i].CODPROD}`;
      let qtdsku = getDadosSql(sql);
  
      if(qtdsku[0][0] > 0) continue;
  
      if(produtos[i].ATIVO == 'N') continue;
  
      if(produtos[i].AD_FORADELINHA == 'S') continue;
  
      novoSku(produtos[i].REFERENCIA, produtos[i].COMPLDESC.trim(), idproduto, produtos[i].CODPROD);
  
    }
  
  
    startApp();
    gridProdutos();
  
}

// monta tela de Produtos
function gridProdutos(){
    let   sql     = `SELECT   ep.SKU,
                              ep.PRODUCTID,
                              ep.IDPRODUTO,
                              ep.NAME,
                              ae.NAME AS MARCA,
                              (SELECT COUNT(*) FROM AD_ECMSKUS WHERE PRODUTOID = ep.IDPRODUTO) AS QTDSKUS
                              FROM AD_ECMPRODUTOS ep 
                              INNER JOIN AD_ECMMARCAS ae on (ep.BRANDID = ae.IDMARCA)
                              ORDER BY IDPRODUTO DESC`;
  
    let   data    = getDadosSql(sql, true);
    let   dados   = [];
    let   tela    = $('#dados');
  
    tela.empty();
  
    // menu da tela de produtos
    // tela.append(`<nav class="navbar navbar-expand-sm mb-2 bg-light navbar-light">
    //               <ul class="navbar-nav">
    //                 <li class="nav-item active">
    //                   <a class="nav-link" href="#">
    //                   <i class="fs-5 fa-sharp fa-solid fa-boxes-stacked"></i> <span class=" fs-6 ms-1 d-none d-sm-inline" >Produtos</span> 
    //                   </a>
    //                 </li>
    //                 <li class="nav-item">
    //                   <a class="btn btn btn-outline-secondary" onclick="telaPesquisaProd();" href="#">Importar Produto</a>
    //                 </li>
    //               </ul>
    //             </nav>`);
  
    // inclui tabela
    tela.append(`
                        <div class="input-group mb-3 input-group-sm">
                            <span class="input-group-text"><i class="fa-solid fa-magnifying-glass"></i></span>
                            <input type="text" id="pesquisa" class="form-control">
                        </div>
                        <table  data-toggle="table" 
                                data-search="true" 
                                data-search-selector="#pesquisa"  
                                id="dataTb" class="table mt-2 table-striped w-100" style ="font-size: 0.80rem;"> 
                            <thead class="table-dark text-white">
                                <th data-field="SKU" data-sortable="true">SKU</th>
                                <th data-field="PRODUCTID" data-sortable="true">ID ECM</th>
                                <th data-field="NAME" data-sortable="true">PRODUTO</th>
                                <th data-field="MARCA" data-sortable="true">MARCA</th>
                                <th data-field="QTDSKUS">QTD SKUs</th>
                                <th data-field="BOTAO"></th>
                            </thead>
                        </table>`);
  
    for(let i = 0; i < data.length; i++){
  
        let botao = `<button type="button" onclick="viewProduto(${data[i].IDPRODUTO});" class="btn btn-success btn-sm"><i class="fa-regular fa-pen-to-square"></i></button>`;
  
        dados.push({    "SKU"       : data[i].SKU, 
                        "PRODUCTID" : data[i].PRODUCTID,
                        "NAME"      : data[i].NAME,
                        "MARCA"     : data[i].MARCA,
                        "QTDSKUS"   : data[i].QTDSKUS,
                        "BOTAO"     : botao });
    }
    
  
    $("#dataTb").bootstrapTable({
        "data"      : dados
    })
}

// inclui novo produto
function novoProduto(idproduto, sku, idmarca, name, urlfrendly, produtoidsk){

    let codprod;

    url = "http://"+hostname+":"+port+"/mge/service.sbr?serviceName=CRUDServiceProvider.saveRecord&outputType=json&mgeSession="+jnid;
    let dataBr = convertDataToSankhya();

    const data = JSON.stringify({
       "serviceName":"CRUDServiceProvider.saveRecord",
       "requestBody":{
          "dataSet":{
             "rootEntity":"AD_ECMPRODUTOS",
             "includePresentationFields":"S",
             "dataRow":{
                "localFields":{
                    "IDPRODUTO" : {
                      "$" : idproduto
                    },
                    "SKU":{
                      "$": sku
                    },
                    "NAME":{
                      "$" : name
                    },
                    "BRANDID" : {
                      "$" : idmarca
                    },
                    "DATA_INC":{
                      "$" : dataBr
                    },
                    "SENDTOMARKETPLACE" : {
                        "$" : "N"
                    },
                    "URLFRIENDLY":{
                      "$" : urlfrendly
                    },
                    "DISPLAYAVAILABILITY":{
                        "$": "S"
                    },
                    "ISNEW":{
                      "$": "S"
                    },
                    "USEACCEPTANCETERM" : {
                        "$" : "N"
                    },
                    "ISDELETED":{
                      "$": "N"
                    },
                    "DISPLAYPRICE":{
                        "$": "S"
                    },
                    "DISPLAYSTOCKQTY":{
                      "$": "N"
                    },
                    "ISFREESHIPPING":{
                        "$": "N"
                    },
                    "ISSEARCHABLE":{
                        "$": "S"
                    },
                    "DISPLAYSTOCKQTY" :{
                        "$" : "N"
                    },
                    "ISUPONREQUEST":{
                        "$": "N"
                    },
                    "ISVISIBLE":{
                        "$": "N"
                    },
                    "PAGETITLE" : {
                      "$" : name
                    },
                    "PRODUTOIDSK" : {
                      "$" : produtoidsk
                    }
                }
             }, "entity":{
                "fieldset":{
                   "list":"IDPRODUTO"
                }
             }
          }
       }
    });

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        //console.log(this.responseText);
        let data2 = JSON.parse(this.response);
        if(data2.responseBody != undefined){
          codprod =  data2.responseBody.entities.entity.IDPRODUTO.$;
        }else{
          alertaMsg('Erro ao criar produto! <br> Erro : <br> '+this.responseText,'E');
        }
    }});

    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);

    return codprod;
}

