
// tela de SKUS
function gridSKUS(){
    let   sql     = `select  ae.IDSKU,	
                              ae.SKU, 
                              ae.PRODUCTID, 
                              ae.NAME, 
                              ISNULL(( SELECT  CASE  WHEN (ESTOQUE - RESERVADO - 5) > 0 THEN ESTOQUE - RESERVADO - 5 ELSE 0 END  as QTD  FROM TGFEST est WHERE  est.CODEMP = 4 and est.CODLOCAL = 2001 AND est.CODPROD = ae.PRODUTOIDSK  ),0) as ESTOQUE, 
                              ( SELECT CASE WHEN COUNT(*) > 0 THEN 'S' ELSE 'N' END FROM TGFIMAL WHERE CODPROD = ae.PRODUTOIDSK) as FOTO 
                              from AD_ECMSKUS ae `;
  
    let   data    = getDadosSql(sql, true);
    let   dados   = [];
    let   tela    = $('#dados');
  
    tela.empty();
  
    // menu da tela de produtos
    tela.append(`<nav class="navbar navbar-expand-sm mb-2 bg-light navbar-light">
                  <ul class="navbar-nav">
                    <li class="nav-item active">
                      <a class="nav-link" href="#">
                        <i class=" fs-5 fa-solid fa-box"></i> <span class=" fs-6 ms-1 d-none d-sm-inline" >SKUs</span> 
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="btn btn btn-outline-secondary"  href="#">Importar SKU</a>
                    </li>
                  </ul>
                </nav>`);

    tela.append(filtroSkuMarca)
    
  
    // inclui tabela
    tela.append(`
            <div class="input-group mb-3 input-group-sm">
                <span class="input-group-text"><i class="fa-solid fa-magnifying-glass"></i></span>
                <input type="text" id="pesquisa" class="form-control">
            </div>
            <table data-toggle="table" data-search="true" data-search-selector="#pesquisa"  id="dataTb" class="table mt-2 table-striped w-100" style ="font-size: 0.80rem;"> 
                <thead class="table-dark text-white">
                    <th data-field="SKU" data-sortable="true">SKU</th>
                    <th data-field="PRODUCTID" data-sortable="true">ID ECM</th>
                    <th data-field="NAME" data-sortable="true">DESCRIÇÃO</th>
                    <th data-field="ESTOQUE" data-sortable="true">ESTOQUE</th>
                    <th data-field="FOTO">FOTO</th>
                    <th data-field="BOTAO"></th>
                </thead>
            </table>`);
  
  
    for(let i = 0; i < data.length; i++){
  
        let botao = `<button type="button" onclick="viewSku(${data[i].IDSKU});" class="btn btn-success btn-sm"><i class="fa-regular fa-pen-to-square"></i></button>`;
      
      dados.push({  "SKU"       : data[i].SKU, 
                    "PRODUCTID" : data[i].PRODUCTID,
                    "NAME"      : data[i].NAME,
                    "ESTOQUE"   : data[i].ESTOQUE,
                    "FOTO"      : data[i].FOTO,
                    "BOTAO"     : botao });
  
    }
  
    $("#dataTb").bootstrapTable({
        "data"      : dados
    })
  }

  function filtroSkuMarca(){

    let sql = `
                SELECT DISTINCT em.NAME as MARCA,
                em.IDMARCA
                from AD_ECMSKUS ae
                inner join AD_ECMPRODUTOS ep on ep.IDPRODUTO = ae.PRODUTOID 
                inner join AD_ECMMARCAS em on em.IDMARCA  = ep.BRANDID 
                inner join TGFPRO t on t.CODPROD  = ep.PRODUTOIDSK
    `
    let selectDadosMarcas = getDadosSql(sql)

    sql = ` SELECT DISTINCT ep.CATEGORYID as ID_CATEGORIA,
                ae2.NAME
                from AD_ECMSKUS ae
                inner join AD_ECMPRODUTOS ep on ep.IDPRODUTO = ae.PRODUTOID 
                inner join AD_ECMMARCAS em on em.IDMARCA  = ep.BRANDID 
                inner join TGFPRO t on t.CODPROD  = ep.PRODUTOIDSK
                inner join AD_ECMCATEGORIAS ae2 on ae2.IDCATEGORIA = ep.CATEGORYID `;

    let selectDadosCategoria = getDadosSql(sql);

    let selectMarca = `
    <select class="form-select" onchange="filtroMarcaStatus()" id="select_marca">
        <option value="" selected>Todas as marcas</option>`;

        for(let i = 0; i < selectDadosMarcas.length;i++){
            selectMarca+=`<option value="${selectDadosMarcas[i][1]}">${selectDadosMarcas[i][0]}</option>`
        }
    selectMarca+=`</select>`;

    let selectStatus = `
    <select class="form-select" onchange="filtroMarcaStatus()" id="select_status">
        <option value="" selected>Todos os status</option>
        <option value="ativo">ATIVO</option>
        <option value="fora_de_linha">FORA DE LINHA</option>
        <option value="inativo">INATIVO</option>    
    </select>`;
    

    let selectCategoria = `
    <select class="form-select" onchange="filtroMarcaStatus()" id="select_categoria">
        <option value="" selected>Todas as categorias</option>`
        for(let i = 0; i < selectDadosCategoria.length; i++){
            selectCategoria+=`<option value="${selectDadosCategoria[i][0]}">${selectDadosCategoria[i][1]}</option>`
        }
    selectCategoria+=`</select>`;



    let selectFiltro = `
    <div class="row mt-3 mb-5">

        <div class="col-4">
            ${selectMarca}
        </div>
        <div class="col-4">
            ${selectStatus}
        </div>
        <div class="col-4">
            ${selectCategoria}
        </div>
    </div>
    `



    return selectFiltro

  }

  function filtroMarcaStatus(){
    $("#dataTb").bootstrapTable('destroy');

    let selectMarca = $("#select_marca").val();
    let selectStatus = $("#select_status").val();
    let selectCategoria = $("#select_categoria").val();

    let sql = `SELECT   ae.IDSKU,	
                        ae.SKU, 
                        ae.PRODUCTID, 
                        ae.NAME, 
                        ISNULL(( SELECT  CASE  WHEN (ESTOQUE - RESERVADO - 5) > 0 THEN ESTOQUE - RESERVADO - 5 ELSE 0 END  as QTD  FROM TGFEST est WHERE  est.CODEMP = 4 and est.CODLOCAL = 2001 AND est.CODPROD = ae.PRODUTOIDSK  ),0) as ESTOQUE, 
                        ( SELECT CASE WHEN COUNT(*) > 0 THEN 'S' ELSE 'N' END FROM TGFIMAL WHERE CODPROD = ae.PRODUTOIDSK) as FOTO 
                        from AD_ECMSKUS ae 
                        inner join AD_ECMPRODUTOS ep on ep.IDPRODUTO = ae.PRODUTOID 
                        inner join AD_ECMMARCAS em on em.IDMARCA  = ep.BRANDID 
                        inner join TGFPRO t on t.CODPROD  = ep.PRODUTOIDSK  
                        where 1=1 `;

    if(selectMarca!==""){
        sql+=`and em.IDMARCA = ${selectMarca}`
    }
    if(selectStatus!==""){
        if(selectStatus=="ativo"){
            sql+=`  and t.ATIVO = 'S'
                    AND t.AD_FORADELINHA = 'N'`;
        }
        else if(selectStatus=="fora_de_linha"){
            sql+=`  and t.ATIVO = 'S'
                    AND t.AD_FORADELINHA = 'S'`;
        }
        else{
            sql+=`and t.ATIVO = 'N'
                AND t.AD_FORADELINHA = 'N'`
        }
    }
    if(selectCategoria!==""){
        sql+="and ep.CATEGORYID ="+selectCategoria;
    }
    
    let data = getDadosSql(sql,true);
    let dados = [];

    for(let i = 0; i < data.length; i++){
  
        let botao = `<button type="button" onclick="viewSku(${data[i].IDSKU});" class="btn btn-success btn-sm"><i class="fa-regular fa-pen-to-square"></i></button>`;
      
      dados.push({  "SKU"       : data[i].SKU, 
                    "PRODUCTID" : data[i].PRODUCTID,
                    "NAME"      : data[i].NAME,
                    "ESTOQUE"   : data[i].ESTOQUE,
                    "FOTO"      : data[i].FOTO,
                    "BOTAO"     : botao });
  
    }
  
    $("#dataTb").bootstrapTable({
        "data"      : dados
    })

  }
// monta modal de detalhes de sku
function modalDetalheSku(){
    return `
    <div class="modal" id="modalDetalheSku" data-bs-backdrop="static">
        <div class="modal-dialog modal-dialog-scrollable modal-xl">
            <div class="modal-content">
        
                <div class="modal-header">
                <h5 class="modal-title">Edição - <span id="titleDetalheSku"></span></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
        
                <!-- Modal body -->
                <div class="modal-body" id="bodyDetalheSku">
                ....
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><i class="fa-solid fa-ban"></i> Cancelar</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal"><i class="fa-regular fa-floppy-disk"></i> Salvar</button>
                </div>
            </div>
        </div>
    </div>`
}

// exibe edição do SKU
function viewSku(idsku) {
    
    let sql = '';
    sql = `select ae.*,ae2.NOMEPROD  from AD_ECMSKUS ae inner join AD_ECMPRODUTOS ae2 on ae2.IDPRODUTO  = ae.PRODUTOID WHERE IDSKU = ${idsku}`;
    let sku = getDadosSql(sql, true);
    console.log(sql)
    sql = `SELECT *, (select count(*) from AD_PRODUTOVOLUMES ap where ap.CODPROD = p.CODPROD  ) as QTDVOL  FROM TGFPRO p WHERE p.CODPROD = ${sku[0].PRODUTOIDSK}`;
    let produtosk = getDadosSql(sql,true);
    sql = `select * from TGFBAR where CODPROD = ${sku[0].PRODUTOIDSK}`;
    let ean = getDadosSql(sql,true);
    sql = `SELECT * FROM AD_GRADEX WHERE IDGRADEX = ${produtosk[0].AD_IDGRADEX}`;
    let cor = getDadosSql(sql,true);
    sql = `SELECT * FROM AD_GRADEY WHERE IDGRADEY = ${produtosk[0].AD_IDGRADEY}`;
    let voltagem = getDadosSql(sql,true);
    let medidaFrete = '';
    let volumes  = 1;

    // medida frete
    if(produtosk[0].UNIDADE == 'CM') {
        medidaFrete = 'Centimetro'
    } else if (produtosk[0].UNIDADE == 'MM') {
        medidaFrete = 'Milimetro'
    } else if (produtosk[0].UNIDADE == 'M') {
        medidaFrete = 'Metro'
    } else {
        medidaFrete = 'Não informado' 
    }

    // ajusta volumes de acordo com cadastro de produto
    if(produtosk[0].QTDVOL > 0) {
        volumes = produtosk[0].QTDVOL
    }




    // status do produto
    let statusSk = '';
    if(produtosk[0].ATIVO == 'S' && produtosk[0].AD_FORADELINHA == 'S') {
        statusSk = "Fora de Linha";
    } else if (produtosk[0].ATIVO == 'S' && produtosk[0].AD_FORADELINHA == 'N') {
        statusSk = "Ativo";
    } else {
        statusSk = "Inativo";
    }


    // montando a tela 
    let tela = $("#bodyDetalheSku");
    tela.empty()
    let titulo =  $("#titleDetalheSku");
    titulo.empty();
    titulo.append(`
        # ${idsku} - ${sku[0].NAME}  
    `);
    
    tela.append(`
        <form>
            <!-- Primeira linha-->
            <div class="row">
                <div class="col-2">
                    <label class="form-label" for="codigoSk">Cod. ERP</label>
                    <input type="text" class="form-control form-control-sm" name="codigoSk"  id="mCodigoSk" value="" disabled>
                </div>
                <div class="col-2">
                    <label class="form-label" for="sku">SKU</label>
                    <input type="text" class="form-control form-control-sm" name="sku" id="mSku" value="" disabled>
                </div>
                <div class="col-2">
                    <label class="form-label" for="codigoEcm">Id ECOMMERCE</label>
                    <input type="text" class="form-control form-control-sm" name="codigoEcm" id="mCodigoEcm" value="" disabled>
                </div>
                <div class="col-2">
                    <label class="form-label" for="codigoEan">Ean</label>
                    <input type="text" class="form-control form-control-sm" name="codigoEan" id="codigoEan" value="" disabled>
                </div>
                <div class="col-2">
                    <label class="form-label" for="refForn">Ref. Fornecedor</label>
                    <input type="text" class="form-control form-control-sm" name="refForn" id="refForn" value="" disabled>
                </div>
                <div class="col-2">
                    <label class="form-label" for="statusSk">Status Sk</label>
                    <input type="text" class="form-control form-control-sm" name="statusSk" id="statusSk" value="" disabled>
                </div>
            </div>
            
            <!-- Segunda Linha -->
            <div class="row">
                <div class="col-6">
                    <label class="form-label" for="descSk">Descrição SK</label>
                    <input type="text" class="form-control form-control-sm" name="descSk"  id="descSk" value="" disabled>
                </div>
                <div class="col-3">
                    <label class="form-label" for="corSk">Cor</label>
                    <input type="text" class="form-control form-control-sm" name="corSk"  id="corSk" value="" disabled>
                </div>
                <div class="col-3">
                    <label class="form-label" for="voltagemSk">Voltagem</label>
                    <input type="text" class="form-control form-control-sm" name="voltagemSk"  id="voltagemSk" value="" disabled>
                </div>
            </div>

            <!-- Terceira linha -->
            <div class="row">
                <div class="col-12">
                    <label class="form-label">Descrição ECM</label>
                    <input type="text" class="form-control form-control-sm" name="descEcmSku"  id="descEcmSku" value="">
                </div>
            </div>


            <h6 class="mt-3" >Dados Logistico</h6>
            <hr>

            <div class="row">
                <div class="col-2">
                    <label class="form-label" for="altFrete">Altura Frete</label>
                    <input type="text" class="form-control form-control-sm" name="altFrete"  id="altFrete" value="" disabled>
                </div>
                <div class="col-2">
                    <label class="form-label" for="compFrete">Comprimento Frete</label>
                    <input type="text" class="form-control form-control-sm" name="compFrete"  id="compFrete" value="" disabled>
                </div>
                <div class="col-2">
                    <label class="form-label" for="largFrete">Largura Frete</label>
                    <input type="text" class="form-control form-control-sm" name="largFrete"  id="largFrete" value="" disabled>
                </div>
                <div class="col-2">
                    <label class="form-label" for="medidaFrete">Tipo Medida Frete</label>
                    <input type="text" class="form-control form-control-sm" name="medidaFrete"  id="medidaFrete" value="" disabled>
                </div>
                <div class="col-2">
                    <label class="form-label" for="pesoFrete">Peso Frete</label>
                    <input type="text" class="form-control form-control-sm" name="pesoFrete"  id="pesoFrete" value="" disabled>
                </div>
                <div class="col-2">
                    <label class="form-label" sfor="qtdVolumes">QTD. Volumes</label>
                    <input type="text" class="form-control form-control-sm" name="qtdVolumes"  id="qtdVolumes" value="" disabled>
                </div>
            </div>

            <div class="row">
                <div class="col-2">
                    <label class="form-label">Altura Montado</label>
                    <input type="text" class="form-control form-control-sm" name="alturaMontado"  id="alturaMontado" value="">
                </div>
                <div class="col-2">
                    <label class="form-label">Comp. Montado</label>
                    <input type="text" class="form-control form-control-sm" name="compMontado"  id="compMontado" value="">
                </div>
                <div class="col-2">
                    <label class="form-label">Largura Montado</label>
                    <input type="text" class="form-control form-control-sm" name="largMontado"  id="largMontado" value="">
                </div>
                <div class="col-2">
                    <label class="form-label">Tipo Medida Montado</label>
                    <input type="text" class="form-control form-control-sm" name="tipoMedida"  id="tipoMedida" value="">
                </div>
                <div class="col-2">
                    <label class="form-label">Peso Montado</label>
                    <input type="text" class="form-control form-control-sm" name="pesoMontado"  id="pesoMontado" value="">
                </div>
            </div>

            <!-- Abas Funcionais --> 
            <div class="row mt-3">
                <div class="col-12">
                    <ul class="nav nav-tabs">
                        <li class="nav-item">
                            <a class="nav-link active" data-bs-toggle="tab" href="#fotos">Midias</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-bs-toggle="tab" href="#configs">Outras Configurações</a>
                        </li>
                    </ul>
                    <!-- Tab panes -->
                    <div class="tab-content">
                        <div class="tab-pane active" id="fotos">
                        </div>
                        <div class="tab-pane" id="configs">
                            <div class="row mt-3">
                                <div class="col-2">
                                    <label class="form-label" for="permiteDevolucao">Permite Devolução?</label>
                                    <select class="form-select form-select-sm" id="permiteDevolucao">
                                        <option value="S">Sim</option>
                                        <option value="N">Não</option>
                                    </select>
                                </div>
                                <div class="col-2">
                                    <label class="form-label" for="limiteDevolucao">Qtd. Lim. p/Devolução</label>
                                    <input type="text" class="form-control form-control-sm" name="limiteDevolucao"  id="limiteDevolucao" value="">
                                </div>
                                <div class="col-2">
                                    <label class="form-label" for="exibeCondicao">Exibe Condição?</label>
                                    <select class="form-select form-select-sm" id="exibeCondicao">
                                        <option value="S">Sim</option>
                                        <option value="N">Não</option>
                                    </select>
                                </div>
                                <div class="col-2">
                                    <label class="form-label" for="deletado">SKU Deletado?</label>
                                    <select class="form-select form-select-sm" id="deletado">
                                        <option value="S">Sim</option>
                                        <option value="N">Não</option>
                                    </select>
                                </div>
                                <div class="col-2">
                                    <label class="form-label" for="contrlEstoque">Controla Estoque?</label>
                                    <select class="form-select form-select-sm" id="contrlEstoque">
                                        <option value="S">Sim</option>
                                        <option value="N">Não</option>
                                    </select>
                                </div>
                                <div class="col-2">
                                    <label class="form-label" for="qtdMax">Qtd. Maxima</label>
                                    <input type="text" class="form-control form-control-sm" name="qtdMax"  id="qtdMax" value="">
                                </div>
                                <div class="col-2"> 
                                    <label class="form-label" for="qtdMin">Qtd. Minima</label>
                                    <input type="text" class="form-control form-control-sm" name="qtdMin"  id="qtdMin" value="">
                                </div>
                                <div class="col-2">
                                    <label class="form-label" for="visivel">Visivel no Site?</label>
                                    <select class="form-select form-select-sm" id="visivel">
                                        <option value="S">Sim</option>
                                        <option value="N">Não</option>
                                    </select>
                                </div>
                                <div class="col-2"> 
                                    <label class="form-label" for="visivelApartir">Visivel apartir de :</label>
                                    <input type="datetime-local" class="form-control form-control-sm" name="visivelApartir"  id="visivelApartir" value="">
                                </div>
                                <div class="col-2"> 
                                    <label class="form-label" for="visivelAte">Visivel ate :</label>
                                    <input type="datetime-local" class="form-control form-control-sm" name="visivelAte"  id="visivelAte" value="">
                                </div>
                                <div class="col-2">
                                    <label class="form-label" for="prepedido">Pré-Pedido</label>
                                    <select class="form-select form-select-sm" id="prepedido">
                                        <option value="S">Sim</option>
                                        <option value="N">Não</option>
                                    </select>
                                </div>                                
                                <div class="col-2"> 
                                    <label class="form-label" for="prepedidoApartir">Pré-pedido apartir de: </label>
                                    <input type="datetime-local" class="form-control form-control-sm" name="prepedidoApartir"  id="prepedidoApartir" value="">
                                </div>
                                <div class="col-2">
                                    <label class="form-label" for="limiteprepedido">Qtd. Lim p/Pré-pedido</label>
                                    <input type="text" class="form-control form-control-sm" name="limiteprepedido"  id="limiteprepedido" value="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    `);


    // incluindo dados
    $("#mCodigoSk").val(sku[0].PRODUTOIDSK);
    $('#mSku').val(sku[0].SKU);
    $('#mCodigoEcm').val(sku[0].PRODUCTID);
    $('#codigoEan').val(ean[0].CODBARRA);
    $('#refForn').val(produtosk[0].REFFORN);
    $('#statusSk').val(statusSk);
    $('#descSk').val(produtosk[0].DESCRPROD);
    $('#corSk').val(cor[0].DCRGRADEX);
    $('#voltagemSk').val(voltagem[0].DCRGRADEY);
    $('#descEcmSku').val(sku[0].NOMEPROD + " " + cor[0].DCRGRADEX + " " + voltagem[0].DCRGRADEY);
    $('#altFrete').val(produtosk[0].ALTURA);
    $('#largFrete').val(produtosk[0].LARGURA);
    $('#compFrete').val(produtosk[0].ESPESSURA);    
    $('#pesoFrete').val(produtosk[0].PESOBRUTO);
    $('#medidaFrete').val(medidaFrete);
    $('#qtdVolumes').val(volumes);

    let modalSkus = $("#modalDetalheSku");
    modalSkus.modal('show');
    listFotos(sku[0].IDSKU);
}

function fecharModalDetalheSku() {
    let modalSkus = $("#modalDetalheSku");
    modalSkus.modal('hide');
}

// lista skus importados para o ecommerce
function listSkusEcm(idproduto){
    let sql = `SELECT 	ae.SKU,
                        ae.IDSKU,
                        ae.NAME,
                        vp.estoque_disponivel as ESTOQUE,
                        ATIVO,
                        AD_FORADELINHA
                        FROM AD_ECMSKUS ae 
                        INNER JOIN v_precoecommerce vp ON (vp.codproduto = ae.PRODUTOIDSK) 
                        INNER JOIN TGFPRO p on (p.CODPROD = ae.PRODUTOIDSK)
                        WHERE PRODUTOID = ${idproduto}`;
    
    return getDadosSql(sql,true);
}

// lista skus não importados
function listSkusSk(ad_idproduto, idproduto){
    let sql = `SELECT 	ae.REFERENCIA,
                        ae.CODPROD,
                        ae.COMPLDESC,
                        vp.estoque_disponivel as ESTOQUE,
                        ATIVO,
                        AD_FORADELINHA
                        FROM TGFPRO ae 
                        INNER JOIN v_precoecommerce vp ON (vp.codproduto = ae.CODPROD) 
                        WHERE AD_IDPRODUTO = ${ad_idproduto}
                        AND   CODPROD NOT IN (SELECT PRODUTOIDSK FROM AD_ECMSKUS WHERE PRODUTOID = ${idproduto}) `;
    
    return getDadosSql(sql,true);
}

// lista fotos 
function listFotos(idsku){
    // debugger;
    let fotos = $('#fotos');

    let sql = `SELECT COUNT(*) FROM AD_ECMSKUSIMG WHERE IDSKU = ${idsku} `;
    qtdFotos =  getDadosSql(sql);

    // se nao existir o registo de fotos , cria o registro no sankhya
    if(qtdFotos[0][0] == 0 ) {
        criaRegFotos(idsku);
    } 

    sql = `SELECT * FROM AD_ECMSKUSIMG WHERE IDSKU = ${idsku}`

    imgs = getDadosSql(sql, true)
    
    fotos.empty()
    fotos.append(`<div class="row mt-3">
                    <div class="col-3" >
                        <div class="card">
                            <div class="card-body" style="height: 200px;" id="video">
                                
                            </div>
                            <div class="card-footer bg-dark">
                                <label class="form-label text-white ">Url do Video</label>
                                <div class="input-group input-group-sm">
                                    <input type="text" class="form-control form-control-sm " id="urlvideo" name="urlvideo" value="${imgs[0].VIDEO}">
                                    <button class="btn btn-success"  onclick="enviaUrlVideo(${idsku});" type="button"><i class="fa-solid fa-upload"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="card">
                            <div class="card-body" style="height: 200px;">
                                <img style="display:block; width:100%;height:100%;" id="img1" src="${imgs[0].IMG01}" />
                            </div>
                            <div class="card-footer">
                                <label class="form-label">Selecione a Imagem</label>
                                <input type="file" class="form-control form-control-sm" onchange="converteImagem(${idsku},1);" id="img01" name="img01">
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="card">
                            <div class="card-body" style="height: 200px;">
                                <img style="display:block; width:100%;height:100%;" id="img2" src="${imgs[0].IMG02}" />
                            </div>
                            <div class="card-footer">
                                <label class="form-label">Selecione a Imagem</label>
                                <input type="file" class="form-control form-control-sm" onchange="converteImagem(${idsku},2);" id="img02" name="img02">
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="card">
                            <div class="card-body" style="height: 200px;">
                                <img style="display:block; width:100%;height:100%;" id="img3" src="${imgs[0].IMG03}" />
                            </div>
                            <div class="card-footer">
                                <label class="form-label">Selecione a Imagem</label>
                                <input type="file" class="form-control form-control-sm" onchange="converteImagem(${idsku},3);" id="img03" name="img03">
                            </div>
                        </div>
                    </div>  
                </div>`) // linha 01
    fotos.append(`<div class="row mt-3">
                    <div class="col-3">
                        <div class="card">
                            <div class="card-body" style="height: 200px;">
                                <img style="display:block; width:100%;height:100%;" id="img4" src="${imgs[0].IMG04}" />
                            </div>
                            <div class="card-footer ">
                                <label class="form-label">Selecione a Imagem</label>
                                <input type="file" class="form-control form-control-sm" onchange="converteImagem(${idsku},4);" id="img04" name="img04">
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="card">
                            <div class="card-body" style="height: 200px;">
                                <img style="display:block; width:100%;height:100%;" id="img5" src="${imgs[0].IMG05}" />
                            </div>
                            <div class="card-footer">
                                <label class="form-label">Selecione a Imagem</label>
                                <input type="file" class="form-control form-control-sm" onchange="converteImagem(${idsku},5);" id="img05" name="img05">
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="card">
                            <div class="card-body" style="height: 200px;">
                                <img style="display:block; width:100%;height:100%;" id="img6" src="${imgs[0].IMG06}" />
                            </div>
                            <div class="card-footer">
                                <label class="form-label">Selecione a Imagem</label>
                                <input type="file" class="form-control form-control-sm" onchange="converteImagem(${idsku},6);" id="img06" name="img06">
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="card">
                            <div class="card-body" style="height: 200px;">
                                <img style="display:block; width:100%;height:100%;" id="img7" src="${imgs[0].IMG07}" />
                            </div>
                            <div class="card-footer">
                                <label class="form-label">Selecione a Imagem</label>
                                <input type="file" class="form-control form-control-sm" onchange="converteImagem(${idsku},7);" id="img07" name="img07">
                            </div>
                        </div>
                    </div>
                </div>`) // linha 02
                
    // exibe video 
    let url = imgs[0].VIDEO;
    if(url.length > 0) {
            url = url.replace('/watch?v=', '/embed/');
            // url = url.substring(0, url.indexOf('&'));
            $('#video').append('<iframe width="100%" height="100%" src="' + url + '" frameborder="0" allowfullscreen></iframe>');
    }

}

// calcula total de skus 
function qtdSkusImp(idproduto){
    let sql = `SELECT 	COUNT(*) as QTD
                        FROM AD_ECMSKUS 
                        WHERE PRODUTOID = ${idproduto}`;

    let qtd = getDadosSql(sql,true);
    return qtd[0].QTD;
}

// total de skus no sistema 
function qtdSkusTot(idproduto){
    let sql = `SELECT 	COUNT(*) as QTD
                        FROM TGFPRO 
                        WHERE AD_IDPRODUTO = ${idproduto}`;

    let qtd = getDadosSql(sql,true);
    return qtd[0].QTD;
}


// grava dados da url do video no banc  o de dados
function enviaUrlVideo(idsku){
    let urlvideo =  $('#urlvideo').val();
    gravaVideo(idsku, urlvideo);
    listFotos(idsku);
}

// inclusao de sku novo
function novoSku(sku,name,produtoid,produtoidsk){

    url = "http://"+hostname+":"+port+"/mge/service.sbr?serviceName=CRUDServiceProvider.saveRecord&outputType=json&mgeSession="+jnid;
    let dataBr = convertDataToSankhya();

    const data = JSON.stringify({
       "serviceName":"CRUDServiceProvider.saveRecord",
       "requestBody":{
          "dataSet":{
             "rootEntity":"AD_ECMSKUS",
             "includePresentationFields":"S",
             "dataRow":{
                "localFields":{
                    "IDSKU" : {
                      "$" : ''
                    },
                    "SKU":{
                      "$": sku
                    },
                    "NAME":{
                      "$" : name
                    },
                    "DATA_INC":{
                      "$" : dataBr
                    },
                    "MANAGESTOCK":{
                      "$" : "S"
                    },
                    "ISDELETED":{
                      "$": "N"
                    },
                    "ISVISIBLE":{
                      "$": "N"
                    },
                    "PRODUTOID" : {
                      "$" : produtoid
                    },
                    "PRODUTOIDSK" : {
                      "$" : produtoidsk
                    }
                }
             }, "entity":{
                "fieldset":{
                   "list":"IDSKU"
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
          return data2.responseBody.entities.entity.IDSKU.$;
        }else{
          alertaMsg('Erro ao criar SKU! <br> Erro : <br> '+this.responseText,'E');
        }
    }});
  
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
  
}

// inclusao de sku novo
function criaRegFotos(idsku){

    url = "http://"+hostname+":"+port+"/mge/service.sbr?serviceName=CRUDServiceProvider.saveRecord&outputType=json&mgeSession="+jnid;

    const data = JSON.stringify({
       "serviceName":"CRUDServiceProvider.saveRecord",
       "requestBody":{
          "dataSet":{
             "rootEntity":"AD_ECMSKUSIMG",
             "includePresentationFields":"S",
             "dataRow":{
                "localFields":{
                    "IDSKU" : {
                      "$" : idsku
                    },
                    "IDIMG" : {
                        "$" : ""
                    }
                }
             }, "entity":{
                "fieldset":{
                   "list":"IDSKU"
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
          return data2.responseBody.entities.entity.IDSKU.$;
        }else{
          alertaMsg('Erro ao criar Registro de Imagem! <br> Erro : <br> '+this.responseText,'E');
        }
    }});
  
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
  
}

// converte imagem em base64
function converteImagem(idSku, idimg) {

    let file = document.getElementById('img0'+idimg).files;
    let imgb64
    let img 
    
    if(file.length > 0) {
        img = file[0]
        let lerImg = new FileReader();
        lerImg.onload = function(imgconv) {
            // converter
            imgb64 = imgconv.target.result;

            gravaFoto(idSku, idimg, img.name, imgb64)
            listFotos(idSku)    

        }
        
        lerImg.readAsDataURL(img)
    }   

}

// grava foto 
function gravaFoto(idsku, idimg, arquivo, foto){

    url = "http://"+hostname+":"+port+"/mge/service.sbr?serviceName=CRUDServiceProvider.saveRecord&outputType=json&mgeSession="+jnid;

    const data = JSON.stringify({
       "serviceName":"CRUDServiceProvider.saveRecord",
       "requestBody":{
          "dataSet":{
             "rootEntity":"AD_ECMSKUSIMG",
             "includePresentationFields":"S",
             "dataRow":{
                "localFields":{
                    ['IMG0'+idimg] : {
                        "$" : foto
                    },
                    ['IMG0'+idimg+'_N'] : {
                        "$" : arquivo
                    },
                    ['IMG0'+idimg+'_ENV'] : {
                        "$" : "S"
                    }
                },
                "key" : {
                    "IDSKU" : {
                        "$" : idsku
                    },
                    "IDIMG" : {
                        "$" : 1
                    }
                }
             }, "entity":{
                "fieldset":{
                   "list":"IDSKU"
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
          return true
        }else{
          alertaMsg('Erro ao criar Registro de Imagem! <br> Erro : <br> '+this.responseText,'E');
          return false
        }
    }});
  
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
  
}

// grava foto 
function gravaVideo(idsku, urlv){

    url = "http://"+hostname+":"+port+"/mge/service.sbr?serviceName=CRUDServiceProvider.saveRecord&outputType=json&mgeSession="+jnid;

    const data = JSON.stringify({
       "serviceName":"CRUDServiceProvider.saveRecord",
       "requestBody":{
          "dataSet":{
             "rootEntity":"AD_ECMSKUSIMG",
             "includePresentationFields":"S",
             "dataRow":{
                "localFields":{
                    "VIDEO" : {
                        "$" : urlv
                    },
                    "VIDEO_ENV" : {
                        "$" : "S"
                    }
                },
                "key" : {
                    "IDSKU" : {
                        "$" : idsku
                    },
                    "IDIMG" : {
                        "$" : 1
                    }
                }
             }, "entity":{
                "fieldset":{
                   "list":"IDSKU"
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
          return true
        }else{
          alertaMsg('Erro ao criar Registro de Imagem! <br> Erro : <br> '+this.responseText,'E');
          return false
        }
    }});
  
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
  
}