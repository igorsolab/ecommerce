// # arquivo de produto

var telaProdutos = '';

// Tela de pesquisa do Produto
function telaPesquisaProd() {
    let modal = $("#mPesquisaProduto")
  
    modal.modal('show');
}

// fecha tela de modal
function fechaTelaPesquisaProduto() {
    $("#mPesquisaProduto").modal('hide')
}
  
function viewProduto(idproduto) {

    let tela    = $('#dados');
    let sql     = "";
    
    sql = `SELECT * FROM AD_ECMPRODUTOS WHERE IDPRODUTO = ${idproduto}`;
    let produto = getDadosSql(sql,true);
    console.log(idproduto)
    sql = `SELECT * FROM TGFPRO WHERE CODPROD = ${produto[0].PRODUTOIDSK}`;
    let produtosk = getDadosSql(sql,true);

    sql = `SELECT * FROM TGFGRU WHERE CODGRUPOPROD = ${produtosk[0].CODGRUPOPROD}`;
    let grupoprod = getDadosSql(sql,true);
    sql = `SELECT * FROM AD_ECMCATEGORIAS ae RIGHT JOIN AD_ECMPRODUTOS ae2 ON ae2.CATEGORYID = ae.IDCATEGORIA WHERE ae2.IDPRODUTO = ${idproduto}`;
    let categoriaProdutos = getDadosSql(sql, true);
    tela.empty();   
    // menu da tela de produtos
    tela.append(`<nav class="navbar navbar-expand-sm mb-2 bg-light navbar-light">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="#">
            <i class="fs-5 fa-sharp fa-solid fa-boxes-stacked"></i> <span class=" fs-6 ms-1 d-none d-sm-inline" > Produtos - Edição </span> 
            </a>
          </li>
          <li class="nav-item">
            <a class="btn btn btn-outline-secondary" onclick="gridProdutos();" href="#"><i class="fa-solid fa-arrow-left"></i> Voltar p/Grid de Produtos</a>
            <a class="btn btn btn-outline-primary" onclick="saveProduto(${idproduto});" href="#"><i class="fa-regular fa-floppy-disk"></i> Salvar</a>
          </li>
        </ul>
      </nav>`);

    // formulario  do cabeçalho
    tela.append(`
        <style>
        select option[value="N"]{
                color: red;
            }
        </style>
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header bg-primary text-white">
                        # ${produto[0].IDPRODUTO} - ${produto[0].NAME}
                    </div>
                    <div class="card-body">
                      <form>
                        <div class="row">
                            <div class="col-2">
                                <label class="form-label" for="codigoSk">Cod. ERP</label>
                                <input type="text" class="form-control form-control-sm" name="codigoSk"  id="codigoSk" value="" disabled>
                            </div>
                            <div class="col-2">
                                <label class="form-label" for="sku">SKU</label>
                                <input type="text" class="form-control form-control-sm" name="sku" id="sku" value="" disabled>
                            </div>
                            <div class="col-2">
                                <label class="form-label" for="codigoEcm">Id ECOMMERCE</label>
                                <input type="text" class="form-control form-control-sm" name="codigoEcm" id="codigoEcm" value="" disabled>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-6">
                                <label class="form-label" for="descErp">Descrição ERP</label>
                                <input type="text" class="form-control form-control-sm" name="descErp" id="descErp" value="" disabled>
                                <label class="form-label" for="descEcommerce">Descrição ECOMMERCE</label>
                                <input type="text" class="form-control form-control-sm" name="descEcommerce" id="descEcommerce" value="">
                            </div>
                            <div class="col-6">
                                <label class="form-label" for="categoriaErp">Categoria ERP</label>
                                <input type="text" class="form-control form-control-sm" name="categoriaErp" id="categoriaErp" value="" disabled>
                                <label class="form-label" for="categoriaEcm">Categoria ECOMMERCE</label>
                                <select class="form-select form-select-sm" id="categoriaEcm">
                                    <option value="">Sem Categoria</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <label class="form-label" for="tituloPagina">Titulo da Pagina</label>
                                <input type="text" class="form-control form-control-sm" name="tituloPagina" id ="tituloPagina" value="" disabled>
                            </div>
                            <div class="col-6">
                                <label class="form-label" for="urlFriendly">Url Amigavel</label>
                                <input type="text" class="form-control form-control-sm" name="urlFriendly" id="urlFriendly" value="" disabled>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-12">
                                <ul class="nav nav-tabs">
                                    <li class="nav-item">
                                        <a class="nav-link active" data-bs-toggle="tab" href="#descr">Descrição</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-bs-toggle="tab" href="#configs">Outras Configurações</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-bs-toggle="tab" href="#produtos">Campos estendidos</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-bs-toggle="tab" href="#skus">SKUs</a>
                                    </li>
                                </ul>
                                <!-- Tab panes -->
                                <div class="tab-content">
                                    <div class="tab-pane active" id="descr">

                                        <div class="row mt-3">
                                            <div class="col-6">
                                                <label class="form-label" for="descricaoCurta">Descrição Curta</label>
                                                <input type="text" class="form-control form-control-sm" name="descricaoCurta" id="descricaoCurta" value="">
                                            </div>
                                            <div class="col-6">
                                                <label class="form-label" for="metaDescricao">Meta Descrição</label>
                                                <input type="text" class="form-control form-control-sm" name="metaDescricao" id="metaDescricao" value="">
                                            </div>
                                        </div>

                                        <div class="row mt-3">
                                            <div class="col">
                                                <label class="form-label" for="editor">Descrição Longa</label>
                                                <textarea id="editor" name="editor"></textarea>
                                                <script>
                                                    var editor = new Simditor({
                                                        textarea: $('#editor')
                                                        //optional options
                                                    });
                                                </script>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="tab-pane fade" id="configs">
                                        <div class="row mt-3">
                                            <div class="col-6">
                                                <label class="form-label" for="palavrasChave">Palavras Chaves</label>
                                                <input type="text" class="form-control form-control-sm" name="palavrasChave" id="palavrasChave" value="">
                                            </div>
                                            <div class="col-6">
                                                <label class="form-label" for="garantia">Descrição da Garantia</label>
                                                <input type="text" class="form-control form-control-sm" name="garantia" id="garantia" value="" disabled>
                                            </div>
                                        </div>
                                        <div class="row mt-3">
                                            <div class="col-2">
                                                <label class="form-label" for="exibeDisponibilidade">Exibe Disponibilidade</label>
                                                <select class="form-select form-select-sm" id="exibeDisponibilidade">
                                                    <option value="S">Sim</option>
                                                    <option value="N">Não</option>
                                                </select>
                                            </div>
                                            <div class="col-2">
                                                <label class="form-label" for="exibePreco">Exibe Preço</label>
                                                <select class="form-select form-select-sm" id="exibePreco">
                                                    <option value="S">Sim</option>
                                                    <option value="N">Não</option>
                                                </select>
                                            </div>
                                            <div class="col-2">
                                                <label class="form-label" for="produtoNovo">Produto Novo</label>
                                                <select class="form-select form-select-sm" id="produtoNovo">
                                                    <option value="S">Sim</option>
                                                    <option value="N">Não</option>
                                                </select>
                                            </div>
                                            <div class="col-2">
                                                <label class="form-label" for="produtoDeletado">Produto Deletado</label>
                                                <select class="form-select form-select-sm" id="produtoDeletado">
                                                    <option value="S">Sim</option>
                                                    <option value="N">Não</option>
                                                </select>
                                            </div>
                                            <div class="col-2">
                                                <label class="form-label" for="pesquesavel">Produto Pesquisavel</label>
                                                <select class="form-select form-select-sm" id="pesquisavel">
                                                    <option value="S">Sim</option>
                                                    <option value="N">Não</option>
                                                </select>
                                            </div>
                                            <div class="col-2">
                                                <label class="form-label" for="freteGratis">Frete Gratis</label>
                                                <select class="form-select form-select-sm" id="freteGratis">
                                                    <option value="S">Sim</option>
                                                    <option value="N">Não</option>
                                                </select>
                                            </div>
                                            <div class="col-2">
                                                <label class="form-label" for="produtoDemanda">Produto por Demanda</label>
                                                <select class="form-select form-select-sm" id="produtoDemanda">
                                                    <option value="S">Sim</option>
                                                    <option value="N">Não</option>
                                                </select>
                                            </div>
                                            <div class="col-2">
                                                <label class="form-label" for="enviaMarketplace">Envia p/MarketPlace</label>
                                                <select class="form-select form-select-sm" id="enviaMarketplace">
                                                    <option value="S">Sim</option>
                                                    <option value="N">Não</option>
                                                </select>
                                            </div>
                                            <div class="col-2">
                                                <label class="form-label" for="exibeEstoque">Exibe Estoque</label>
                                                <select class="form-select form-select-sm" id="exibeEstoque">
                                                    <option value="S">Sim</option>
                                                    <option value="N">Não</option>
                                                </select>
                                            </div>
                                            <div class="col-4">
                                                <label class="form-label" for="usuarioTermos">Usuario precisa Aceitar os Termos </label>
                                                <select class="form-select form-select-sm" id="usuarioTermos">
                                                    <option value="S">Sim</option>
                                                    <option value="N">Não</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="row mt-3">
                                            <div class="col-2">
                                                <label class="form-label" for="visivel">Visivel no Site</label>
                                                <select class="form-select form-select-sm" id="visivel">
                                                    <option value="S">Sim</option>
                                                    <option value="N">Não</option>
                                                </select>
                                            </div>
                                            <div class="col-2">
                                                <label class="form-label" for="visivelApartir">Visivel Apartir de </label>
                                                <input type="datetime-local" class="form-control mt-2 form-control-sm" name="visivelApartir" id="visivelApartir" value="">
                                            </div>
                                            <div class="col-2">
                                                <label class="form-label" for="visivelAte">Visivel Até </label>
                                                <input type="datetime-local" class="form-control mt-2 form-control-sm" name="visivelAte" id="visivelAte" value="">
                                            </div>
                                            <div class="col-2">
                                                <label class="form-label" for="registroOcp">Registro OCP</label>
                                                <input type="text" class="form-control mt-2 form-control-sm" name="registroOcp" id="registroOcp" value="" disabled>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane container fade" id="produtos">
                                            <div class="row mt-3" id="produtoMetaDado"></div>
                                    </div>
                                    <div class="tab-pane container fade" id="skus">
                                        <div class="row mt-3">
                                            <div class="col-6">
                                                <div class="card">
                                                    <div class="card-header bg-info text-white">Skus Importados</div>
                                                    <div class="card-body">
                                                        <table class="table" style="font-size: 0.70rem">
                                                            <thead>
                                                                <tr>
                                                                    <th>SKU</th>
                                                                    <th>DESCRIÇÃO</th>
                                                                    <th>ESTOQUE</th>
                                                                    <th>STATUS</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id="tbskusimp">
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="card">
                                                    <div class="card-header bg-secondary text-white">Skus Não Importados</div>
                                                    <div class="card-body">
                                                        <table class="table" style="font-size: 0.70rem">
                                                            <thead>
                                                                <tr>
                                                                    <th>SKU</th>
                                                                    <th>DESCRIÇÃO</th>
                                                                    <th>ESTOQUE</th>
                                                                    <th>STATUS</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id="tbskusnimp">
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </form>
                    </div>
                </div>
            <div>
        </div>
    `);

    // incluir dados nos campos 
    selectCategorias('categoriaEcm');

    $("#codigoSk").val(produto[0].PRODUTOIDSK);
    $("#sku").val(produto[0].SKU);
    $("#codigoEcm").val(produto[0].PRODUCTID);
    $("#descErp").val(produtosk[0].DESCRPROD);
    $("#descEcommerce").val(produto[0].NOMEPROD);
    $("#categoriaErp").val(grupoprod[0].CODGRUPOPROD +' - '+ grupoprod[0].DESCRGRUPOPROD);
    $("#categoriaEcm").val(produto[0].CATEGORYID);
    $("#tituloPagina").val(produto[0].NOMEPROD);
    $("#urlFriendly").val(produto[0].URLFRIENDLY);
    $("#descricaoCurta").val(produto[0].SHORTDESCRIPTION);
    $("#metaDescricao").val(produto[0].METADESCRIPTION);
    editor.setValue(produto[0].LONGDESCRIPTION);
    
    let palavrasChaves = "";
    let palavrasChavesCategorias = verificaPalavraChavePai(categoriaProdutos[0].IDCATEGORIA)
    console.log(palavrasChavesCategorias)
    let palavrasChavesProduto = produto[0].METAKEYWORDS 
    if(palavrasChavesProduto){
        palavrasChaves += (palavrasChavesProduto+",")
        console.log(palavrasChaves)
    }
    if(palavrasChavesCategorias){
        palavrasChaves += (palavrasChavesCategorias+",")
        console.log(palavrasChaves)
    }
    let palavrasChavesSemRepeticao = verificaSeHaPalavrasChavesIguais(palavrasChaves)

    $("#palavrasChave").val(palavrasChavesSemRepeticao)
    $("#garantia").val(produto[0].WARRANTYDESCRIPTION == "" || produto[0].WARRANTYDESCRIPTION == null ? produtosk[0].AD_GARANTIAMESES + " meses" : produto[0].WARRANTYDESCRIPTION );
    $("#exibeDisponibilidade").val(produto[0].DISPLAYAVAILABILITY);
    $("#exibePreco").val(produto[0].DISPLAYPRICE);
    $("#produtoNovo").val(produto[0].ISNEW);
    $("#produtoDeletado").val(produto[0].ISDELETED);
    $("#pesquisavel").val(produto[0].ISSEARCHABLE);
    $("#freteGratis").val(produto[0].ISFREESHIPPING);
    $("#produtoDemanda").val(produto[0].ISUPONREQUEST);
    $("#enviaMarketplace").val(produto[0].SENDTOMARKETPLACE);
    $("#usuarioTermos").val(produto[0].USEACCEPTANCETERM);
    $("#visivel").val(produto[0].ISVISIBLE);
    $("#exibeEstoque").val(produto[0].DISPLAYSTOCKQTY);
    $("#registroOcp").val(produtosk[0].AD_OCP);
    montaTabelaSkuEcm(produto[0].IDPRODUTO);
    montaTabelaSkuNImp(produto[0].SKU, produto[0].IDPRODUTO);
    buscaMetaDado(produto[0].IDPRODUTO,produto[0].CATEGORYID);
    

}

function verificaSeHaPalavrasChavesIguais(str){
    let arraysconcat = str.split(",")
    const arraySemRepeticoes = arraysconcat.filter((array, index, self) => {
        return (
            index === self.findIndex((arr) => JSON.stringify(arr) === JSON.stringify(array))
        );
    });
    console.log(arraySemRepeticoes)
    return arraySemRepeticoes
}

function sqlRetornaPalavraChave(idPai){
    let sql = `SELECT KEYWORDS, IDCATEGORIAPAI,NIVEL  FROM AD_ECMCATEGORIAS WHERE IDCATEGORIA = ${idPai}`
    let dados = getDadosSql(sql)
    return dados
}

function verificaPalavraChavePai(idCategoria) {
    let palavrasChaves = []
    let dados = sqlRetornaPalavraChave(idCategoria)
    // console.log(dados[0][0])s
    console.log(dados.length)
    if(dados.length > 0) {
        palavrasChaves.push(dados[0][0])
        if(dados[0][2] == 3) {
            let dadosNivel2 = sqlRetornaPalavraChave(dados[0][1])
            dadosNivel2[0][0] ? palavrasChaves.push(dados[0][0]) : ""
            let dadosNivel1 = sqlRetornaPalavraChave(dadosNivel2[0][1])
            dadosNivel1[0][0] ? palavrasChaves.push(dados[0][0]) : ""
            console.log("Sou nivel 3")
            console.log(palavrasChaves)
        }
        else if(dados[0][2] == 2) {
            let dadosNivel1 = sqlRetornaPalavraChave(dados[0][1])
            dadosNivel1[0][0] ? palavrasChaves.push(dados[0][0]) : ""
            console.log("Sou nivel 2")
        }
    }
    let arraysconcat = ""
    if(palavrasChaves.length > 0){
        arraysconcat = palavrasChaves.join(",")
        return arraysconcat
    }
}

function buscaMetaDado(idProduto,idCategoria){


    let selectMetaDados = `
    SELECT 
    emd.IDMETA,
    emd.PROPERTYNAME , 
    emd.INPUTTYPEID, 
    emd.DISPLAYNAME,
    ec.NAME,
    ec.NIVEL,
    ec.CONTA,
    ec.IDCATEGORIAPAI
    FROM AD_ECMMETADATA emd
    inner JOIN AD_ECMCATMETADATA ecmd ON ecmd.IDMETA =  emd.IDMETA 
    inner JOIN AD_ECMCATEGORIAS ec ON ec.IDCATEGORIA = ecmd.IDCATEGORIA 
    WHERE ec.IDCATEGORIA IN (${idCategoria})
    AND ecmd.ATIVO = 'S'
    AND emd.INPUTTYPEID IS NOT NULL`;
    
    
    let dados = getDadosSql(selectMetaDados)
    let cards_meta="";
    if(dados.length === 0){
        cards_meta += "Não há metadados definidos para essa categoria ou o tipo não foi definido"
    }
    else{
    let categoriasPais = autorizaCategoriasPai(dados[0][6],dados[0][5]);
    if(categoriasPais){

        let arraysconcat = dados.concat(categoriasPais)
        const arraySemRepeticoes = arraysconcat.filter((array, index, self) => {
            return (
              index === self.findIndex((arr) => JSON.stringify(arr) === JSON.stringify(array))
            );
          });

        for(let i = 0; i < arraySemRepeticoes.length; i++){
            if(arraySemRepeticoes[i]===undefined){
                break;
            }
            let idmeta = arraySemRepeticoes[i][0];
            let propertyName = arraySemRepeticoes[i][1];
            let inputTypeId = arraySemRepeticoes[i][2];
            let displayName = arraySemRepeticoes[i][3];
            let nameCategoria = arraySemRepeticoes[i][4];
            let nivel = arraySemRepeticoes[i][5];
            let conta = arraySemRepeticoes[i][6];
            let idCategoriaPai = arraySemRepeticoes[i][7];
            cards_meta += `                                            
            <div class="col-4 mt-3">
                <div class="card">
                    <div class="card-body">
                        <h6>${displayName}</h6>
                        <p style="font-size:12px">${nameCategoria}</p>
                        <p class="card-text">`;

                            if(inputTypeId==1){
                                cards_meta+=htmlEcm(idmeta,idProduto);
                            }else if(inputTypeId==3){
                                cards_meta+=multiEcm(idmeta,idProduto);
                            }else if(inputTypeId==4){
                                cards_meta+=listaEcm(idmeta,idProduto);
                            }else if(inputTypeId==7){
                                cards_meta+=numeroEcm(idmeta,idProduto);
                            }else if(inputTypeId==9){
                                cards_meta+=logicoEcm(idmeta,idProduto);
                            }else if(inputTypeId==0){
                                cards_meta+=textEcm(idmeta,idProduto);
                            }else{
                                cards_meta+="";
                            }
                            
                        cards_meta+=`</p>
                    </div>
                </div>
            </div><!-- col-4 -->`;
        }
    } 
}
$('#produtoMetaDado').append(cards_meta);

let sqlValores = `
SELECT PMDT.VALOR, ECM.IDPRODUTO, PMDT.IDMETA,MDT.INPUTTYPEID 
FROM AD_ECMPRODUTOMETADADOS PMDT 
inner JOIN AD_ECMMETADATA MDT ON MDT.IDMETA = PMDT.IDMETA
inner JOIN AD_ECMPRODUTOS ECM ON ECM.IDPRODUTO = pmdt.IDPRODUTO
WHERE ECM.IDPRODUTO = ${idProduto}
`

let dadosValores = getDadosSql(sqlValores,true)

dadosValores.map((res) => {
    let idmeta = res.IDMETA;
    let valor = res.VALOR;
    let idProduto = res.IDPRODUTO;
    let inputTypeId = res.INPUTTYPEID;
    if(inputTypeId == 1) {
        $(`textarea[name="mid_${idmeta}_${idProduto}"]`).val(valor);
    }
    else if(inputTypeId == 3) {
        let valoresArray = valor.split(",");
        for(let i = 0; i < valoresArray.length; i++) {
            var checkbox = $(`input[name="mid_${idmeta}_${idProduto}"][value="${valoresArray[i]}"]`);
            if(checkbox.length > 0){
                checkbox[0].setAttribute("checked", "checked");
            }
        }
    }
    else if(inputTypeId == 4 ||  inputTypeId == 9){
        $(`select[name="mid_${idmeta}_${idProduto}"]`).val(valor)
    }
    else if(inputTypeId == 7 || inputTypeId == 0) {
        $(`input[name="mid_${idmeta}_${idProduto}"]`).val(valor);
    }
})


           

}
function autorizaCategoriasPai(conta, nivel){
    let selectCategoriasPai = `
    SELECT IDCATEGORIA, CONTA , NIVEL , NAME 
    FROM AD_ECMCATEGORIAS
    WHERE CONTA LIKE '${conta.substring(0,1)}%'
    and nivel < ${nivel}`; 
    let dados = getDadosSql(selectCategoriasPai);
    if(!dados){}
    else{
        let selectMetaDados= "";
        let dadosRecebidos = []
        
        for(let i = 0; i < dados.length; i++){
            selectMetaDados = `
            SELECT 
            emd.IDMETA,
            emd.PROPERTYNAME , 
            emd.INPUTTYPEID, 
            emd.DISPLAYNAME,
            ec.NAME,
            ec.NIVEL,
            ec.CONTA,
            ec.IDCATEGORIAPAI
            FROM AD_ECMMETADATA emd
            INNER JOIN AD_ECMCATMETADATA ecmd ON ecmd.IDMETA =  emd.IDMETA 
            INNER JOIN AD_ECMCATEGORIAS ec ON ec.IDCATEGORIA = ecmd.IDCATEGORIA 
            WHERE ec.IDCATEGORIA = ${dados[i][0]}
            AND ecmd.ATIVO = 'S'
            AND emd.INPUTTYPEID IS NOT NULL`;

            let arraysDados =  getDadosSql(selectMetaDados);
            dadosRecebidos.push(arraysDados);
        }
            for (let i = dadosRecebidos.length - 1; i >= 0; i--) {
                if (Array.isArray(dadosRecebidos[i]) && dadosRecebidos[i].length === 0) {
                dadosRecebidos.splice(i, 1);
                }
            }
            return dadosRecebidos[0];
    }  
    
}

function saveHtmlEcm(idmeta,idProduto){
        let sql = `
        SELECT PMDT.IDPRDMETA
        FROM AD_ECMPRODUTOMETADADOS PMDT 
        inner JOIN AD_ECMMETADATA MDT ON MDT.IDMETA = PMDT.IDMETA
        inner JOIN AD_ECMPRODUTOS ECM ON ECM.IDPRODUTO = pmdt.IDPRODUTO
        WHERE PMDT.IDMETA = ${idmeta}
        AND ECM.IDPRODUTO = ${idProduto}
    `

    let idMeta = getDadosSql(sql,true)

    let idPrdMeta = null
    if(idMeta.length>0){
        idPrdMeta = idMeta[0].IDPRDMETA
    }
    let valor = $(`textarea[name="mid_${idmeta}_${idProduto}"]`).val();

    let fields = {};
    fields.IDPRODUTO = dataFormatSankhya(idProduto);
    fields.IDMETA = dataFormatSankhya(idmeta);
    fields.VALOR = dataFormatSankhya(valor);
    let key = {}
    if(idPrdMeta) {
        key =   {
                    "IDPRDMETA" : dataFormatSankhya(idPrdMeta),
                    "IDPRODUTO" : dataFormatSankhya(idProduto)
                }
                saveRecord('AD_ECMPRODUTOMETADADOS',fields,key);
    }else{
        saveRecord('AD_ECMPRODUTOMETADADOS',fields)
    }
}
function saveCheckEcm(idmeta,idProduto){
        let sql = `
        SELECT PMDT.IDPRDMETA
        FROM AD_ECMPRODUTOMETADADOS PMDT 
        inner JOIN AD_ECMMETADATA MDT ON MDT.IDMETA = PMDT.IDMETA
        inner JOIN AD_ECMPRODUTOS ECM ON ECM.IDPRODUTO = pmdt.IDPRODUTO
        WHERE PMDT.IDMETA = ${idmeta}
        AND ECM.IDPRODUTO = ${idProduto}
        `

        let idMeta = getDadosSql(sql,true)

        let idPrdMeta = null
        if(idMeta.length>0){
            idPrdMeta = idMeta[0].IDPRDMETA
        }
        let valor = $(`input[name="mid_${idmeta}_${idProduto}"]`);
        let checkboxValue = [];
        valor.each(function() {
            if ($(this).prop('checked')) {
                checkboxValue.push($(this).attr('value'));
            }
        });
        const valuesString = checkboxValue.join(',');
        let fields = {};
        fields.IDPRODUTO = dataFormatSankhya(idProduto);
        fields.IDMETA = dataFormatSankhya(idmeta);
        fields.VALOR = dataFormatSankhya(valuesString);
        let key = {}

        if(idPrdMeta) {
            key =   {
                        "IDPRDMETA" : dataFormatSankhya(idPrdMeta),
                        "IDPRODUTO" : dataFormatSankhya(idProduto)
                    }
                    saveRecord('AD_ECMPRODUTOMETADADOS',fields,key);
        }else{
            saveRecord('AD_ECMPRODUTOMETADADOS',fields)
        }
        console.log(fields,key)
}

function saveSelectEcm(idmeta,idProduto){
        let sql = `
        SELECT PMDT.IDPRDMETA
        FROM AD_ECMPRODUTOMETADADOS PMDT 
        inner JOIN AD_ECMMETADATA MDT ON MDT.IDMETA = PMDT.IDMETA
        inner JOIN AD_ECMPRODUTOS ECM ON ECM.IDPRODUTO = pmdt.IDPRODUTO
        WHERE PMDT.IDMETA = ${idmeta}
        AND ECM.IDPRODUTO = ${idProduto}
    `

    let idMeta = getDadosSql(sql,true)

    let idPrdMeta = null
    if(idMeta.length>0){
        idPrdMeta = idMeta[0].IDPRDMETA
    }

    console.log(idPrdMeta)
    let valor = $(`select[name="mid_${idmeta}_${idProduto}"]`).val();
    console.log(valor)
    let fields = {};
    fields.IDPRODUTO = dataFormatSankhya(idProduto);
    fields.IDMETA = dataFormatSankhya(idmeta);
    fields.VALOR = dataFormatSankhya(valor);
    let key = {}
    console.log(fields)
    if(idPrdMeta) {        
        console.log("Id produto Metadado: "+idPrdMeta)
        key =   {
                    "IDPRDMETA" : dataFormatSankhya(idPrdMeta),
                    "IDPRODUTO" : dataFormatSankhya(idProduto)
                }
                saveRecord('AD_ECMPRODUTOMETADADOS',fields,key);
    }else{        
        console.log("Salvando dados não criados")
        saveRecord('AD_ECMPRODUTOMETADADOS',fields)
    }
    console.log(fields, key)
}



function saveNumberEcm(idmeta,idProduto){
            let sql = `
        SELECT PMDT.IDPRDMETA
        FROM AD_ECMPRODUTOMETADADOS PMDT 
        inner JOIN AD_ECMMETADATA MDT ON MDT.IDMETA = PMDT.IDMETA
        inner JOIN AD_ECMPRODUTOS ECM ON ECM.IDPRODUTO = pmdt.IDPRODUTO
        WHERE PMDT.IDMETA = ${idmeta}
        AND ECM.IDPRODUTO = ${idProduto}
    `

    let idMeta = getDadosSql(sql,true)

    let idPrdMeta = null
    if(idMeta.length>0){
        idPrdMeta = idMeta[0].IDPRDMETA
    }

    let valor = $(`input[name="mid_${idmeta}_${idProduto}"]`).val();

    let fields = {};
    fields.IDPRODUTO = dataFormatSankhya(idProduto);
    fields.IDMETA = dataFormatSankhya(idmeta);
    fields.VALOR = dataFormatSankhya(valor);
    let key = {}

    if(idPrdMeta) {
        key =   {
                    "IDPRDMETA" : dataFormatSankhya(idPrdMeta),
                    "IDPRODUTO" : dataFormatSankhya(idProduto)
                }
                saveRecord('AD_ECMPRODUTOMETADADOS',fields,key);
    }else{
        saveRecord('AD_ECMPRODUTOMETADADOS',fields)
    }
}

function saveBoolEcm(idmeta,idProduto){
            let sql = `
        SELECT PMDT.IDPRDMETA
        FROM AD_ECMPRODUTOMETADADOS PMDT 
        inner JOIN AD_ECMMETADATA MDT ON MDT.IDMETA = PMDT.IDMETA
        inner JOIN AD_ECMPRODUTOS ECM ON ECM.IDPRODUTO = pmdt.IDPRODUTO
        WHERE PMDT.IDMETA = ${idmeta}
        AND ECM.IDPRODUTO = ${idProduto}
    `

    let idMeta = getDadosSql(sql,true)

    let idPrdMeta = null
    if(idMeta.length>0){
        idPrdMeta = idMeta[0].IDPRDMETA
    }
    

    let valor = $(`select[name="mid_${idmeta}_${idProduto}"]`).val();

    let fields = {};
    fields.IDPRODUTO = dataFormatSankhya(idProduto);
    fields.IDMETA = dataFormatSankhya(idmeta);
    fields.VALOR = dataFormatSankhya(valor);
    let key = {}

    if(idPrdMeta) {
        key =   {
                    "IDPRDMETA" : dataFormatSankhya(idPrdMeta),
                    "IDPRODUTO" : dataFormatSankhya(idProduto)
                }
                saveRecord('AD_ECMPRODUTOMETADADOS',fields,key);
    }else{
        saveRecord('AD_ECMPRODUTOMETADADOS',fields)
    }
}
function saveTextEcm(idmeta,idProduto){
            let sql = `
        SELECT PMDT.IDPRDMETA
        FROM AD_ECMPRODUTOMETADADOS PMDT 
        inner JOIN AD_ECMMETADATA MDT ON MDT.IDMETA = PMDT.IDMETA
        inner JOIN AD_ECMPRODUTOS ECM ON ECM.IDPRODUTO = pmdt.IDPRODUTO
        WHERE PMDT.IDMETA = ${idmeta}
        AND ECM.IDPRODUTO = ${idProduto}
    `

    let idMeta = getDadosSql(sql,true)

    let idPrdMeta = null
    if(idMeta.length>0){
        idPrdMeta = idMeta[0].IDPRDMETA
    }
    
    let valor = $(`input[name="mid_${idmeta}_${idProduto}"]`).val();

    let fields = {};
    fields.IDPRODUTO = dataFormatSankhya(idProduto);
    fields.IDMETA = dataFormatSankhya(idmeta);
    fields.VALOR = dataFormatSankhya(valor);
    let key = {}

    if(idPrdMeta) {
        key =   {
                    "IDPRDMETA" : dataFormatSankhya(idPrdMeta),
                    "IDPRODUTO" : dataFormatSankhya(idProduto)
                }
                saveRecord('AD_ECMPRODUTOMETADADOS',fields,key);
    }else{
        saveRecord('AD_ECMPRODUTOMETADADOS',fields)
    }
}


function htmlEcm(idmeta,idProduto){
    return `<textarea onfocusout="saveHtmlEcm(${idmeta},${idProduto});" name="mid_${idmeta}_${idProduto}" placeholder="Digite texto em HTML"></textarea>`
}

function multiEcm(idmeta,idProduto){
    let select = `SELECT * FROM AD_ECMMETADATAOPTS WHERE IDMETA = ${idmeta}`;
    let arrayDoId = getDadosSql(select)

    let itensCheckbox = "";
    for(let i = 0; i<arrayDoId.length;i++){
        itensCheckbox += 
        `
        <div class="form-check">
            <input class="form-check-input" value="${arrayDoId[i][3]}" name="mid_${idmeta}_${idProduto}" onfocusout="saveCheckEcm(${idmeta},${idProduto});" type="checkbox">
            <label class="form-check-label" for="flexCheckDefault">
                ${arrayDoId[i][3]}
            </label>
        </div>
        `;

    }
    return itensCheckbox;
}

function listaEcm(idmeta,idProduto){
   let select = `SELECT * FROM AD_ECMMETADATAOPTS WHERE IDMETA = ${idmeta}`;
    let arrayDoId = getDadosSql(select)
    let selectLista = ""; 

    if(arrayDoId.length < 1){
        selectLista+=`<select class="form-select mb-3" disabled><option></option></select>`;
    }else{
    selectLista = `<select name="mid_${idmeta}_${idProduto}" onfocusout="saveSelectEcm(${idmeta},${idProduto});" class="form-select mb-3">`;
    selectLista+=`<option selected></option>`;
    for(let i = 0; i < arrayDoId.length; i++){
        selectLista+=`<option value="${arrayDoId[i][3]}">${arrayDoId[i][3]}</option>`;
    }
    selectLista+=`</select>`;

}
return selectLista;
}


function numeroEcm(idmeta,idProduto){
    return `<input name="mid_${idmeta}_${idProduto}" onfocusout="saveNumberEcm(${idmeta},${idProduto});" type="number" class="form-control" placeholder="Digite um número aqui"/>`
}
function logicoEcm(idmeta,idProduto){
    return `
    <select id="valorBool" name="mid_${idmeta}_${idProduto}" onfocusout="saveBoolEcm(${idmeta},${idProduto})" class="form-select form-select-lg mb-3">
    <option selected></option>
    <option value="sim">Sim</option>
    <option value="nao">Não</option>
    </select>
    `;
}
function textEcm(idmeta,idProduto){
    return `<input onfocusout="saveTextEcm(${idmeta},${idProduto});" name="mid_${idmeta}_${idProduto}" type="text" class="form-control" placeholder="Digite um texto"/>`
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

// monta tabela skus
function montaTabelaSkuNImp(sku,idproduto){
    let skus = listSkusSk(sku,idproduto);
    let html = "";
    let tela = $('#tbskusnimp');


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
                <td>${skus[i].REFERENCIA}</td>
                <td>${skus[i].COMPLDESC}</td>
                <td style="text-align: right;">${skus[i].ESTOQUE}</td>
                <td style="text-align: center;">${status}</td>
            </tr>
        `;
    } 

    tela.empty();
    tela.append(html);

}

// pesquisa de produto
function pesquisaProduto(){
    
    let   prodesc = $('#proddesc').val()
  
    if(prodesc.length >= 2 ) {
  
      let   sql     = `SELECT z.CODPROD, 
                              z.COMPLDESC AS DESCRICAO , 
                              z.REFERENCIA AS SKU, 
                              z.MARCA,
                              z.ATIVO, 
                              z.AD_FORADELINHA,
                              ISNULL((SELECT DISTINCT 'S' FROM sankhya.TGFICP t  WHERE t.CODPROD = z.CODPROD),'N') as KIT
                              FROM TGFPRO z
                              WHERE z.USOPROD = 'R' 
                              AND CONCAT(z.COMPLDESC ,' ', z.MARCA, ' ', z.CODPROD) like UPPER('%`+prodesc+`%')
                              AND z.CODPROD NOT IN (SELECT PRODUTOIDSK FROM AD_ECMSKUS) 
                              ORDER BY z.REFERENCIA`;
  
      let   data    = getDadosSql(sql, true);
      
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
                        "<td>"+data[i].MARCA+"</td>"+
                        "<td>"+data[i].SKU+"</td>"+
                        '<td style="text-align: center;">'+status+'</td>'+
                        '<td style="text-align: center;">'+botao+'</td>'+
                      "</tr>")
  
      }
    }
  
}
  
  // importar produto e skus para ecommerce 
function importarProduto(codprod) {
    
    fechaTelaPesquisaProduto();
    
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
    tela.append(`<nav class="navbar navbar-expand-sm mb-2 bg-light navbar-light">
                  <ul class="navbar-nav">
                    <li class="nav-item active">
                      <a class="nav-link" href="#">
                      <i class="fs-5 fa-sharp fa-solid fa-boxes-stacked"></i> <span class=" fs-6 ms-1 d-none d-sm-inline" >Produtos</span> 
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="btn btn btn-outline-secondary" onclick="telaPesquisaProd();" href="#">Importar Produto</a>
                    </li>
                  </ul>
                </nav>`);
  
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


function saveProduto(idproduto){

    let codprod;
    let result;
    url = "http://"+hostname+":"+port+"/mge/service.sbr?serviceName=CRUDServiceProvider.saveRecord&outputType=json&mgeSession="+jnid;

    // pegando dados
    let sku                 = $("#sku").val();
    let name                = $("#descEcommerce").val();
    let categoryid          = $("#categoriaEcm").val();
    let pageTitle           = $("#tituloPagina").val();
    let urlFriendly         = $("#urlFriendly").val();
    let shortDescription    = $("#descricaoCurta").val();
    let metaDescription     = $("#metaDescricao").val();
    let longDescription     = $("#editor").val();
    let keyWords            = $("#palavrasChave").val();
    console.log(keyWords)
    let warrantyDescription = $("#garantia").val();
    let displayAvailability = $("#exibeDisponibilidade").val();
    let displayPrice        = $("#exibePreco").val();
    let isNew               = $("#produtoNovo").val();
    let isDeleted           = $("#produtoDeletado").val();
    let isSearchable        = $("#pesquisavel").val();
    let isFreeshipping      = $("#freteGratis").val();
    let isUponresquest      = $("#produtoDemanda").val();
    let sendtoMarketplace   = $("#enviaMarketplace").val();
    let useAcceptanceterm   = $("#usuarioTermos").val();
    let isvisible           = $("#visivel").val();
    let displayStockqty     = $("#exibeEstoque").val();

    if(categoryid){

        const data = JSON.stringify({
            "serviceName":"CRUDServiceProvider.saveRecord",
            "requestBody":{
                "dataSet":{
                    "rootEntity":"AD_ECMPRODUTOS",
                    "includePresentationFields":"S",
                    "dataRow":{
                        "localFields":{
                            "NOMEPROD":{
                                "$" : name
                            },
                            "SENDTOMARKETPLACE" : {
                                "$" : sendtoMarketplace
                            },
                            "URLFRIENDLY":{
                                "$" : urlFriendly
                            },
                            "DISPLAYAVAILABILITY":{
                                "$" : displayAvailability
                            },
                            "LONGDESCRIPTION" : {
                                "$" : longDescription
                            },
                            "SHORTDESCRIPTION" : {
                                "$" : shortDescription
                            },
                            "METADESCRIPTION" : {
                                "$" : metaDescription
                            },
                            "ISNEW":{
                                "$": isNew
                            },
                            "USEACCEPTANCETERM" : {
                                "$" : useAcceptanceterm
                            },
                            "METAKEYWORDS" : {
                                "$" : keyWords
                            },
                            "WARRANTYDESCRIPTION" : {
                                "$" : warrantyDescription
                            },
                            "ISDELETED":{
                                "$": isDeleted
                            },
                            "DISPLAYPRICE":{
                                "$": displayPrice
                            },
                            "DISPLAYSTOCKQTY":{
                                "$": displayStockqty
                            },
                            "ISFREESHIPPING":{
                                "$": isFreeshipping
                            },
                            "ISSEARCHABLE":{
                                "$": isSearchable
                            },
                            "ISUPONREQUEST":{
                                "$": isUponresquest
                            },
                            "ISVISIBLE":{
                                "$": isvisible
                            },
                            "PAGETITLE" : {
                                "$" : pageTitle
                            },
                            "CATEGORYID" : {
                                "$" : categoryid
                            },
                            "ENVIAR" : {
                                "$" : "S"
                            }
                        },
                        "key" : {
                            "IDPRODUTO" : {
                                "$" : idproduto
                            }
                        }
                    }, 
                    "entity":{
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
                alertaMsg('Produto atualizado com sucesso! ','S');
                result = data2.responseBody.entities.entity;
            }else{
              alertaMsg('Erro ao atualizar produto! <br> Erro : <br> '+this.responseText,'E');
            }
        }});
    
        let dataJson = JSON.parse(data)
        console.log(dataJson)
    
        xhr.open("POST", url, false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);
        console.log(data)
        return result
    }
    else{
        alertaMsg("Erro, o campo categoria deve estar preenchido","E")
    }

}


  
// modal de pesquisa 
function modalPesquisaProduto() {
    return  `<div class="modal" id="mPesquisaProduto" data-backdrop="static">
    <div class="modal-dialog modal-xl" >
      <div class="modal-content">

        <div class="modal-header">
          <h4 class="modal-title">Importar produto</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <form class="mb-3">
            <div class="form-group">
              <label for="email">Produto:</label>
              <input type="email" class="form-control" onkeyup="pesquisaProduto();" placeholder="Digite para pesquisar" id="proddesc">
            </div>
          </form>
          <div style="overflow-x:auto; overflow-y:auto;  height: 300px;>
            <div class="table-responsive-lg">
              <table class="table table-bordered table-striped" style=" font-size: 0.85rem">
                <thead class="table-dark" style="position: sticky; top: 0;">
                  <tr>
                    <th>Codigo</th>
                    <th>Descrição</th>
                    <th>Marca</th>
                    <th>SKU</th>
                    <th>STATUS</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody id="tbprodutos">
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

