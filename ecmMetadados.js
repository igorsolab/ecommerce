// Arquivo de Meta Dados

function gridMetadados(){
    let sql     = "SELECT * FROM AD_ECMMETADATA WHERE ATIVO = 'S'"
    let data    =  getDadosSql(sql, true);
    let dados   = [];
    let tela    = $('#dados');

    tela.empty();

    tela.append(`
                <nav class="navbar navbar-expand-sm mb-2 bg-light navbar-light">
                    <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">
                            <i class="fs-5 fa-solid fa-table"></i><span class=" fs-6 ms-1 d-none d-sm-inline" > Metadados</span> 
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="btn btn btn-outline-secondary" onclick="novoMetadados();" href="#">Novo Metadado</a>
                    </li>
                    </ul>
                </nav>
    `);

    tela.append(`
            <div class="input-group mb-3 input-group-sm">
                <span class="input-group-text"><i class="fa-solid fa-magnifying-glass"></i></span>
                <input type="text" id="pesquisa" class="form-control">
            </div>
            <table 
                    data-toggle="table" 
                    data-search="true"
                    data-search-selector="#pesquisa"  
                    id="dataTb" 
                    class="table mt-2 table-striped w-100" 
                    style ="font-size: 0.80rem;"> 
                <thead class="table-dark text-white">
                    <th data-field="IDMETA" data-sortable="true">ID METADADOS</th>
                    <th data-field="PROPERTYMETADATAID" data-sortable="true">ID ECM</th>
                    <th data-field="DISPLAYNAME" data-sortable="true">LABEL</th>
                    <th data-field="INPUTTYPEID" data-sortable="true">TIPO</th>
                    <th data-field="BOTAO"></th>
                </thead>
            </table>`);

        for(let i = 0; i < data.length; i++){

            let tipo = "Texto"

            if(data[i].INPUTTYPEID == "1") {
                tipo = "Html"
            }else if (data[i].INPUTTYPEID == "3") {
                tipo = "Multipla Seleção" 
            }else if (data[i].INPUTTYPEID == "4") {
                tipo = "Lista Simples"
            }else if (data[i].INPUTTYPEID == "7") {
                tipo = "Numero"
            }else if (data[i].INPUTTYPEID == "9") {
                tipo = "Logico"
            }

            let botao = `
                <button type="button" 
                    onclick="viewMetadado(${data[i].IDMETA});" 
                    class="btn btn-success btn-sm"
                    title="Editar Metadado">
                        <i class="fa-regular fa-pen-to-square"></i>        
                </button>
            
            
                <button 
                    type="button" 
                    onclick="excluirMetaDado(${data[i].IDMETA});" 
                    class="btn btn-danger btn-sm"
                    title="Excluir Metadado">
                        <i class="bi bi-trash3"></i>
                </button>`;
            dados.push({"IDMETA"                : data[i].IDMETA, 
                        "PROPERTYMETADATAID"    : data[i].PROPERTYMETADATAID,
                        "DISPLAYNAME"           : data[i].DISPLAYNAME,
                        "INPUTTYPEID"           : tipo,
                        "BOTAO"           : botao
                });
        
        }
        
        $("#dataTb").bootstrapTable({
            "data"      : dados
        });

}
function excluirMetaDado(id) {
    let entity = 'AD_ECMMETADATA';
    let key = {
        "IDMETA"   : dataFormatSankhya(id)
    }
    let fields={};
    fields.ATIVO        = dataFormatSankhya('N')
    saveRecord(entity,fields,key);
    menu()
    gridMetadados()
}
function novoMetadados(id){
    let tela = $('#bodyDetailXl');
    tela.empty()

    tela.append(`
        <div class="row">
            <div class="col-3">
                <label class="form-label" for="idmeta">Id Metadados</label>
                <input type="text" class="form-control form-control-sm" id="idmeta" value="" disabled>
            </div>
            <div class="col-3">
                <label class="form-label" for="propertymetadataid">Id ECOMMERCE</label>
                <input type="text" class="form-control form-control-sm" id="propertymetadataid" value="" disabled>
            </div>
            <div class="col-6">
                <label class="form-label" for="propertyname">Metadados</label>
                <input type="text" class="form-control form-control-sm" id="propertyname" value="" >
            </div>
        </div>
    `)

    tela.append(`
        <div class="row">
            <div class="col-6">
                <label class="form-label" for="displayname">Etiqueta</label>
                <input type="text" class="form-control form-control-sm" id="displayname" value="" >
            </div>
            <div class="col-2">
                <label class="form-label" for="maxlength">Tamanho Max.</label>
                <input type="text" class="form-control form-control-sm" id="maxlength" value="0" >
            </div>
            <div class="col-2">
                <label class="form-label" for="inputtypeid">Tipo</label>
                <select class="form-select form-select-sm" id="inputtypeid">
                    <option value="0">Texto</option>
                    <option value="1">Html</option>
                    <option value="3">Multipla Seleção</option>
                    <option value="4">Lista Simples</option>
                    <option value="7">Numero</option>
                    <option value="9">Boleano</option>
                </select>
            </div>
            <div class="col-2">
            <label class="form-label" for="isstorevisible">Visivel no site?</label>
            <select class="form-select form-select-sm" id="isstorevisible">
                <option value="S">Sim</option>
                <option value="N">Não</option>
            </select>
        </div>
        </div>
    `)

    tela.append(`
    <h5 class="mt-3">Categorias</h5>
    <hr>
    <div class="card">
        <div class="card-body" style="padding-top : 0;">
            <div class="row">
                <div class="col-3">
                    <label class="form-label" for="select_catmetadado">Categorias</label>
                    <select class="form-select form-select-sm" id="select_catmetadado"></select>
                </div>
                <div class="col-3">
                    <div class="d-grid">
                        <button 
                            type="button"  
                            id="btnsavecategoria" 
                            onclick="addCatMetadado(${id});" 
                            class="btn btn-sm btn-primary" 
                            style="margin-top: 2.2rem">
                                <i class="fa-regular fa-floppy-disk"></i> 
                                Adicionar Categoria
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row mt-2">
        <div class="col-12">
            <table data-toggle="table" id="categoria_metadado" class="table mt-2 table-striped w-100" style ="font-size: 0.80rem;"> 
                <thead class="table-dark text-white">
                    <th data-field="IDCAT" data-sortable="true">ID CATEGORIA</th>
                    <th data-field="CATEGORIA" data-sortable="true">CATEGORIA</th>
                    <th data-field="BOTAO"></th>
                </thead>
            </table>
        </div>
    </div>

    `)

    selectCategorias('select_catmetadado');
    addCategoriaTabela(id)

    tela.append(`
        <div class="row">
            <div class="col-12" id="panelOpt">
            </div>
        </div>
    `)

    // tabela de opções
    tela.append(`
        <div class="row mt-2" id="tb-opts">
        </div>
    `)

    $('#inputtypeid').change(function () {
        let tipo = $('#inputtypeid').val()

        if(tipo == "3" || tipo == "4" || tipo == "1" || tipo =="9") {
            $('#maxlength').val(0);
            $('#maxlength').prop('disabled', true);
        }else {
            $('#maxlength').prop('disabled', false);
            $('#maxlength').val(20);
        }
    })

    $('#modalDetailXl').modal('show');
    $('#btnDetailXl').click(function () {
        gravaMetadados()
    });
} 

function addCatMetadado(id){
    
    let idCategoria = $('#select_catmetadado').val();
    let fields = {};
    let entity = 'AD_ECMCATMETADATA';


    let sql = ` SELECT ecmc.IDCATEGORIA, ecmc.NAME,ecmd.CATEGORIAID,ecmd.ATIVO,ecmd.IDMETA
    FROM AD_ECMCATMETADATA ecmd 
    INNER JOIN AD_ECMCATEGORIAS ecmc ON ecmc.IDCATEGORIA = ecmd.IDCATEGORIA  
    WHERE IDMETA = ${id}`
    let data    = getDadosSql(sql,true) 
    console.log(data)

    for(let i = 0; i< data.length; i++){
        let key = {
            "CATEGORIAID"   : dataFormatSankhya(data[i].CATEGORIAID)
        }
        if(data[i].IDMETA==id && data[i].IDCATEGORIA == idCategoria ){
            console.log("Entrei no if")
            if(data[i].ATIVO == "N"){
                fields.IDMETA = dataFormatSankhya(id);
                fields.IDCATEGORIA = dataFormatSankhya(idCategoria);
                fields.ATIVO = dataFormatSankhya('S')
                console.log(entity,fields,key)
                saveRecord(entity,fields,key);
            }else{
                let msg = "Essa categoria já existe"
                alertaMsg(msg,"E")
            }
        }        
    }
    fields.IDMETA = dataFormatSankhya(id);
    fields.IDCATEGORIA = dataFormatSankhya(idCategoria);
    fields.ATIVO = dataFormatSankhya('S')
    console.log(fields)
    saveRecord(entity,fields);

    addCategoriaTabela(id);



}
function addCategoriaTabela(idmeta){
    $("#categoria_metadado").bootstrapTable('destroy')



    if(idmeta != '' && idmeta != undefined) {
        
        let sql     = ` SELECT ecmc.IDCATEGORIA, ecmc.NAME,ecmd.CATEGORIAID
                        FROM AD_ECMCATMETADATA ecmd 
                        INNER JOIN AD_ECMCATEGORIAS ecmc ON ecmc.IDCATEGORIA = ecmd.IDCATEGORIA  
                        WHERE IDMETA = ${idmeta} 
                        AND ATIVO = 'S'`
        let data    = getDadosSql(sql,true) 
        let dados   = [];

        for(let i = 0; i < data.length; i++){

            let botao = `<button type="button" onclick="excluirCategoriaMetadado(${idmeta},${data[i].CATEGORIAID},${data[i].IDCATEGORIA});" class="btn btn-danger btn-sm"><i class="bi bi-trash"></i></button>`;
            
            dados.push({"IDCAT"             : data[i].IDCATEGORIA, 
                        "CATEGORIA"         : data[i].NAME,
                        "BOTAO"             : botao });
        
        }
        
        $("#categoria_metadado").bootstrapTable({
            "data"      : dados
        })
    }
}

// EXCLUIR CATEGORIA DA TABELA
function excluirCategoriaMetadado(idmeta,pkIdCategoria,idCategoria){
    let entity = 'AD_ECMCATMETADATA';
    let key = {
        "CATEGORIAID"   : dataFormatSankhya(pkIdCategoria)
    }
    let fields={};

    fields.IDMETA       = dataFormatSankhya(idmeta)
    fields.CATEGORIAID  = dataFormatSankhya(pkIdCategoria)
    fields.IDCATEGORIA  = dataFormatSankhya(idCategoria)
    fields.ATIVO        = dataFormatSankhya('N')
    saveRecord(entity,fields,key);


    addCategoriaTabela(idmeta)
}


// exibe tabela de opções
function viewTabelaOpt(idmeta){

    let opt     = $('#panelOpt')
    let tela    = $('#tb-opts')

    opt.empty()
    tela.empty()

    opt.append(`<h5 class="mt-3">Opções</h5>
                <hr>
                <div class="card">
                    <div class="card-body" style="padding-top : 0;">
                        <div class="row">
                            <div class="col-2">
                                <label class="form-label" for="idopt">Id OPT</label>
                                <input type="text" class="form-control form-control-sm" id="idopt" value="" disabled>
                            </div>
                            <div class="col-6">
                                <label class="form-label" for="title">Titulo</label>
                                <input type="text" class="form-control form-control-sm" id="title" value="" >
                            </div>
                            <div class="col-2">
                                <label class="form-label" for="isremoved">Removido?</label>
                                <select class="form-select form-select-sm" id="isremoved">
                                    <option value="N">Não</option>
                                    <option value="S">Sim</option>
                                </select>
                            </div>
                            <div class="col-2">
                                <div class="d-grid">
                                    <button type="button"  id="btnsaveopt" onclick="gravaOpt();" class="btn btn-sm btn-primary" style="margin-top: 2.2rem"><i class="fa-regular fa-floppy-disk"></i> Salvar Opt</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`)

    tela.append(`
            <div class="col-12">
                <table data-toggle="table" data-search="true" id="tbopts" class="table mt-2 table-striped w-100" style ="font-size: 0.80rem;"> 
                    <thead class="table-dark text-white">
                        <th data-field="IDOPT" data-sortable="true">ID OPT</th>
                        <th data-field="METADATAOPTIONID" data-sortable="true">ID ECM</th>
                        <th data-field="TITLE" data-sortable="true">TITULO</th>
                        <th data-field="ISREMOVED" data-sortable="true">REMOVIDO</th>
                        <th data-field="BOTAO"></th>
                    </thead>
                </table>
            </div>
    `)

    if(idmeta != '' && idmeta != undefined) {
        
        let sql     = `SELECT * FROM AD_ECMMETADATAOPTS WHERE IDMETA = ${idmeta} AND ATIVO = 'S'`
        let data    = getDadosSql(sql,true) 
        let dados   = [];

        for(let i = 0; i < data.length; i++){

            let botao = `
                <button type="button" 
                    onclick="editaOpt(${data[i].IDMETA},${data[i].IDOPT});" 
                    class="btn btn-success btn-sm"><i class="fa-regular fa-pen-to-square"></i>
                </button>
                <button type="button" 
                    onclick="excluirOptMetadado(${data[i].IDMETA},${data[i].IDOPT});" 
                    class="btn btn-danger btn-sm"><i class="bi bi-trash3"></i>
                </button>`;
            
            dados.push({"IDOPT"             : data[i].IDOPT, 
                        "METADATAOPTIONID"  : data[i].METADATAOPTIONID,
                        "TITLE"             : data[i].TITLE,
                        "ISREMOVED"         : data[i].ISREMOVED,
                        "BOTAO"             : botao });
        
        }
        
        $("#tbopts").bootstrapTable({
            "data"      : dados
        })
    }
}

function excluirOptMetadado(idmetadado, idopt){
    let entity = 'AD_ECMMETADATAOPTS';
    let key = {
        "IDMETA"    : dataFormatSankhya(idmetadado),
        "IDOPT"     : dataFormatSankhya(idopt)
    }
    let fields={};
    fields.ATIVO        = dataFormatSankhya('N')
    saveRecord(entity,fields,key);
    viewTabelaOpt(idmetadado)
}
// exibe dados do Metadados
function viewMetadado(id) {
    let sql     = `SELECT * FROM AD_ECMMETADATA WHERE IDMETA = ${id}`
    let meta    = getDadosSql(sql,true)
    meta        = meta[0]

    // cria a tela
    novoMetadados(id);
    $('#idmeta').val(meta.IDMETA);
    $('#propertymetadataid').val(meta.PROPERTYMETADATAID);
    $('#propertyname').val(meta.PROPERTYNAME);
    $('#displayname').val(meta.DISPLAYNAME);
    $('#inputtypeid').val(meta.INPUTTYPEID);
    $('#isstorevisible').val(meta.ISSTOREVISIBLE);
    $('#maxlength').val(meta.MAXLENGTH);

    // ajuste na edição
    $('#inputtypeid').prop('enabled',true);

    // exibe opções caso o tipo seja 3 ou 4
    let tipo = $('#inputtypeid').val()

    if(tipo == "3" || tipo == "4" ) {
        viewTabelaOpt(id);
    }
    
}

// grava metadados 
function gravaMetadados() {
    let entity      = "AD_ECMMETADATA";
    let key         = "";
    let fields      = {};
    let idmeta      = $('#idmeta').val();

    fields.PROPERTYMETADATAID   = dataFormatSankhya($('#propertymetadataid').val());
    fields.PROPERTYNAME         = dataFormatSankhya($('#propertyname').val());
    fields.DISPLAYNAME          = dataFormatSankhya($('#displayname').val());
    fields.INPUTTYPEID          = dataFormatSankhya($('#inputtypeid').val());
    fields.ISSTOREVISIBLE       = dataFormatSankhya($('#isstorevisible').val());
    fields.MAXLENGTH            = dataFormatSankhya($('#maxlength').val());
    fields.USEFORRULES          = dataFormatSankhya("N");
    fields.USEFORVARIATION      = dataFormatSankhya("N");
    fields.USEFORPRODUCTLIST    = dataFormatSankhya("S");
    fields.USEFORSORT           = dataFormatSankhya("78");
    fields.DISPLAYTYPE          = dataFormatSankhya("1");
    fields.ENTITYMETADATAID     = dataFormatSankhya("8");
    fields.ATIVO                = dataFormatSankhya("S");

    if(idmeta != "" && idmeta != undefined) {
        key =   {
                    "IDMETA" : dataFormatSankhya(idmeta)
                }
    }

    saveRecord(entity, fields, key)

    metaReload(idmeta);
    // fechaModalMetadado()

}

// edita opção
function editaOpt(idmeta, idopt) {
    let sql = `SELECT * FROM AD_ECMMETADATAOPTS WHERE IDMETA = ${idmeta} AND IDOPT = ${idopt}`;
    let opt = getDadosSql(sql,true);
    opt     = opt[0];

    $('#idopt').val(opt.IDOPT);
    $('#title').val(opt.TITLE);
    $('#isremoved').val(opt.ISREMOVED);
}


// grava opções
function gravaOpt() {
    let entity  = "AD_ECMMETADATAOPTS";
    let key     = "";
    let fields  = {};
    let idopt   = $('#idopt').val();
    let idmeta  = $('#idmeta').val();

    fields.TITLE            = dataFormatSankhya($('#title').val());
    fields.ISREMOVED        = dataFormatSankhya($('#isremoved').val());

    if(idopt != "" && idopt != undefined) {
        key =   {
                    "IDMETA"    : dataFormatSankhya(idmeta),
                    "IDOPT"     : dataFormatSankhya(idopt)
                }
    } else {
        fields.IDMETA           = dataFormatSankhya(idmeta);
        fields.IDOPT            = dataFormatSankhya(idopt);
    }

    let result = saveRecord(entity, fields, key)

    console.log("Teste de saveRecord: ",result);

    viewTabelaOpt(idmeta);

}

function metaReload(idmeta) {
    $('#modalDetailXl').modal('hide');
    alertaMsg("Metadado salvo com sucesso!",'S')
    startApp();
    gridMetadados();
    viewMetadado(idmeta);
}


function fechaModalMetadado(){
    console.log("Fechando modal metadado")
    $('#modalDetailXl').modal('hide');
}