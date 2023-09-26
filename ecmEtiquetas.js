// Arquivo de etiquetas 

function gridEtiquetas() {
    let   sql     = `select * from AD_ECMETIQUETAS ae `;
    let   data    = getDadosSql(sql, true);
    let   dados   = [];
    let   tela    = $('#dados');
    tela.empty()

    // menu da tela de produtos
    tela.append(`<nav class="navbar navbar-expand-sm mb-2 bg-light navbar-light">
                    <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">
                        <i class="fs-5 fa-solid fa-tags"></i> <span class=" fs-6 ms-1 d-none d-sm-inline" >Etiquetas</span> 
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="btn btn btn-outline-secondary" onclick="novaEtiqueta();" href="#">Nova Etiqueta</a>
                    </li>
                    </ul>
                </nav>`);

    // inclui tabela
    tela.append(`
            <div class="input-group mb-3 input-group-sm">
                <span class="input-group-text"><i class="fa-solid fa-magnifying-glass"></i></span>
                <input type="text" id="pesquisa" class="form-control">
            </div>
            <table data-toggle="table" data-search="true" data-search-selector="#pesquisa"  id="dataTb" class="table mt-2 table-striped w-100" style ="font-size: 0.80rem;"> 
                <thead class="table-dark text-white">
                    <th data-field="IDETIQUETA" data-sortable="true">ID ETIQUETA</th>
                    <th data-field="LABELID" data-sortable="true">ID ECM</th>
                    <th data-field="NAME" data-sortable="true">DESCRIÇÃO</th>
                    <th data-field="URLFRIENDLY" data-sortable="true">URL AMIGAVEL</th>
                    <th data-field="BOTAO"></th>
                </thead>
            </table>`);

    for(let i = 0; i < data.length; i++){

        let botao = ''// `<button type="button" onclick="viewSku(${data[i].IDSKU});" class="btn btn-success btn-sm"><i class="fa-regular fa-pen-to-square"></i></button>`;
        
        dados.push({"IDETIQUETA"    : data[i].IDETIQUETA, 
                    "LABELID"       : data[i].LABELID,
                    "NAME"          : data[i].NAME,
                    "URLFRIENDLY"   : data[i].URLFRIENDLY,
                    "BOTAO"         : botao });
    
    }
    
    $("#dataTb").bootstrapTable({
        "data"      : dados
    })

}

// function monta formEtiqueta
function novaEtiqueta(){
    let tela = $('#bodyDetalheEtiqueta');
    tela.empty()

    tela.append(`
        <div class="row">
            <div class="col-3">
                <label class="form-label" for="idetiqueta">Id Etiqueta</label>
                <input type="text" class="form-control form-control-sm" id="idetiqueta" value="" disabled>
            </div>
            <div class="col-3">
                <label class="form-label" for="labelid">Id ECOMMERCE</label>
                <input type="text" class="form-control form-control-sm" id="labelid" value="" disabled>
            </div>
        </div>
    `)

    tela.append(`
        <div class="row">
            <div class="col-6">
                <label class="form-label" for="name">Etiqueta</label>
                <input type="text" class="form-control form-control-sm" id="name" value="" >
            </div>
            <div class="col-6">
                <label class="form-label" for="urlfriendly">Url Amigavel</label>
                <input type="text" class="form-control form-control-sm" id="urlfriendly" value="" disabled>
            </div>
        </div>
    `)

    $('#modalDetalheEtiqueta').modal('show');

    $('#name').keyup(function () {
        let txt = $('#name').val()
        $('#urlfriendly').val(formataUrl(txt))
    })

}

// função apra gravar a etiqueta
function gravaEtiqueta() {

    debugger
    let key = $('#idetiqueta').val();
    let obj = {}
    obj.NAME        = $('#name').val();
    obj.URLFRIENDLY = $('#urlfriendly').val();

    saveEtiqueta(obj,key)

    $('#modalDetalheEtiqueta').modal('hide');

    setTimeout( function() {
        startApp();
        gridEtiquetas();
    }, 10000)
}

// save etiqueta
function saveEtiqueta(dados, key){

    let url = "http://"+hostname+":"+port+"/mge/service.sbr?serviceName=CRUDServiceProvider.saveRecord&outputType=json&mgeSession="+jnid;
    let obj = {
        "serviceName":"CRUDServiceProvider.saveRecord",
        "requestBody":{
           "dataSet":{
                "rootEntity":"AD_ECMETIQUETAS",
                "includePresentationFields":"S",
                "dataRow":{
                    "localFields":{
                        "IDETIQUETA" : {
                            "$" : (key != "") ? key : ""
                        },
                        "NAME":{
                        "$": dados.NAME
                        },     
                        "URLFRIENDLY":{
                        "$" : dados.URLFRIENDLY
                        },
                        "ENVIAR" : {
                            "$" : "S"
                        }
                    }
                }, "entity":{
                    "fieldset":{
                        "list":"IDETIQUETA"
                    }
                }
            }
        }
    }

    if(key != "") {
        obj.requestBody.dataSet.dataRow.key = { "IDETIQUETA" : { "$" : key }}
    }

    const data = JSON.stringify(obj);

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
  
    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        //console.log(this.responseText);
        let data2 = JSON.parse(this.response);
        if(data2.responseBody != undefined){
            alertaMsg(`Etiqueta ${data2.responseBody.entities.entity.IDETIQUETA.$ +' - '+data2.responseBody.entities.entity.NAME.$ } criada/editada com sucesso!`,'S');
        }else{
            alertaMsg('Erro ao criar Etiqueta! <br> Erro : <br> '+this.responseText,'E');
        }
    }});
  
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
  
}

// monta modal de detalhes de Etiquetas
function modalDetalheEtiqueta(){
    return `
    <div class="modal" id="modalDetalheEtiqueta" data-bs-backdrop="static">
        <div class="modal-dialog modal-dialog-scrollable modal-xl">
            <div class="modal-content">
        
                <div class="modal-header">
                <h5 class="modal-title">Inclusão/Edição - <span id="titleDetalheEtiqueta"></span></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
        
                <!-- Modal body -->
                <div class="modal-body" id="bodyDetalheEtiqueta">
                ....
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><i class="fa-solid fa-ban"></i> Cancelar</button>
                    <button type="button" class="btn btn-primary" onclick="gravaEtiqueta()" ><i class="fa-regular fa-floppy-disk"></i> Salvar</button>
                </div>
            </div>
        </div>
    </div>`
}