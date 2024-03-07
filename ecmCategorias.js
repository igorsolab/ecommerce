// Arquivo de categorias
// Sistema de ecommerce

function gridCategorias() {
    let tela    = $('#dados');
    tela.empty(); 

    tela.append(`<nav class="navbar navbar-expand-sm mb-2 bg-light navbar-light">
                    <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">
                            <i class="fs-5 fa-solid fa-folder-tree"></i> <span class=" fs-6 ms-1 d-none d-sm-inline" >Categorias</span> 
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="btn btn btn-outline-secondary" onclick="novaCategoria();"  href="#">Nova Categoria</a>
                        <a class="btn btn btn-outline-primary" onclick="gravaCategoria();" href="#"><i class="fa-regular fa-floppy-disk"></i> Salvar</a>
                    </li>
                    </ul>
                </nav>`);

    tela.append(`
            <style>
                    /* Remove default bullets */
                    ul, #myUL {
                        list-style-type: none;
                    }

                    /* Remove margins and padding from the parent ul */
                    #myUL {
                        margin: 0;
                        padding: 0;
                    }

                    #treeviewCat {
                        margin : 0;
                    }
                    
                    span[name="cat"] {
                        font-size: 0.80rem;
                    }

                    /* Style the caret/arrow */
                    .caret {
                        cursor: pointer;
                        user-select: none; /* Prevent text selection */
                    }

                    /* Create the caret/arrow with a unicode, and style it */
                    .caret::before {    
                        content: "\\25B6";
                        color: black;
                        display: inline-block;
                        margin-right: 6px;
                    }

                    /* Rotate the caret/arrow icon when clicked on (using JavaScript) */
                    .caret-down::before {
                        transform: rotate(90deg);
                    }

                    /* Hide the nested list */
                    .nested {
                        display: none;
                    }

                    /* Show the nested list when the user clicks on the caret/arrow (with JavaScript) */
                    .active {
                        display: block;
                    }
            </style>`);
    tela.append(`   
            <div class="row">
                <div class="col-3">
                    <div class="card">
                        <div class="card-body" id="treeview" style="height : 650px; overflow-y: auto;">
                        </div>
                    </div>
                </div> 
                <div class="col-9">
                    <div class="card">
                        <div class="card-body" id="formCat" style="height : 650px; overflow-y: auto;">
                        </div>
                    </div>
                </div>
            </div>    `);

    novaFormCat();
    treeViewCategoria();
}


function treeViewCategoria() {
    let tela    = $('#treeview');
    let sql     = "SELECT * FROM AD_ECMCATEGORIAS WHERE NIVEL = 1 ORDER BY IDCATEGORIA";
    let nivel1  = getDadosSql(sql,true);

    tela.empty();

    // inicio da arvore
    tela.append(`
        <div>Árvore de Categorias:</div>
        <div>
        <ul style="padding-left: 0.80rem;" id="treeviewCat">
        </ul>
        </div>`);

    // dados da arvore nivel 1
    for(let i=0; i < nivel1.length; i++) {
        $('#treeviewCat').append(`
            <li><span class="caret"></span> <span name="cat" id="a${nivel1[i].IDCATEGORIA}" onclick="exibeCategoria(${nivel1[i].IDCATEGORIA})" >${nivel1[i].NAME}</span>
                <ul class="nested"  style="padding-left: 0.80rem;" id="cat_${nivel1[i].IDCATEGORIA}">
                </ul>
            </li>`)
    }

    // dados da arvore outros niveis
    sql = "SELECT * FROM AD_ECMCATEGORIAS WHERE NIVEL > 1 ORDER BY NIVEL";
    let niveis = getDadosSql(sql,true);

    for(let i=0; i <  niveis.length; i++) {
        $('#cat_'+niveis[i].IDCATEGORIAPAI).append(`
        <li><span class="caret" idcat="${niveis[i].IDCATEGORIA}" ></span> <span name="cat" id="a${niveis[i].IDCATEGORIA}" onclick="exibeCategoria(${niveis[i].IDCATEGORIA})" >${niveis[i].NAME}</span>
            <ul class="nested" style="padding-left: 0.80rem;"  id="cat_${niveis[i].IDCATEGORIA}">
            </ul>
        </li>`)
    }
    
    // fim da arvore
    tela.append(`
        <script>
            var toggler = document.getElementsByClassName("caret");
            var i;
            
            for (i = 0; i < toggler.length; i++) {
            toggler[i].addEventListener("click", function() {
                this.parentElement.querySelector(".nested").classList.toggle("active");
                this.classList.toggle("caret-down");
            });
            }
        </script>`);

}

function exibeCategoria(idcategoria) {


    // limpar formulario
    novaFormCat()

    let sql = `SELECT * FROM AD_ECMCATEGORIAS WHERE IDCATEGORIA = ${idcategoria}`
    let categoria = getDadosSql(sql,true)

    // inseri dados nos campos
    $('#idcategoria').val(categoria[0].IDCATEGORIA);
    $('#categoryid').val(categoria[0].CATEGORYID);
    $('#name').val(categoria[0].NAME);
    $('#isenabled').val(categoria[0].ISENABLED);
    $('#url').val(categoria[0].URL);
    $('#idcategoriapai').val(categoria[0].IDCATEGORIAPAI);
    // $("#idcategoriapai").prop('disabled',true);
    $('#pagetitle').val(categoria[0].PAGETITLE);
    $('#alternatetitle').val(categoria[0].ALTERNATETITLE);
    $('#keywords').val(categoria[0].KEYWORDS);
    $('#metadescription').val(categoria[0].METADESCRIPTION);

    sql = `SELECT * FROM AD_ECMCATEGORIAGRUPOS WHERE IDCATEGORIA = ${idcategoria} AND ATIVO = 'S'`;
    let gruposcategoria = getDadosSql(sql, true)
    let elementoSelect = $('#selectgrupocategorias')
    
    let gruposSelecionados = gruposcategoria.map(item => item['IDGRUPOS'])
    elementoSelect.val(gruposSelecionados.length === 0 ? 0 : gruposSelecionados)


    //  editor 
    editor.setValue(categoria[0].DESCRIPTION);

    // limpas
    removeClasse()

    // adiciona class no objeto atual
    $('#a'+idcategoria).addClass("badge")
    $('#a'+idcategoria).addClass("bg-info")

}

function novaCategoria() {
    removeClasse()
    novaFormCat()
    document.getElementById("name").focus()
}

function removeClasse() {
    let objs = $('span[name="cat"]')

     // remover class dos objetos
     for(let i=0; i < objs.length; i++){
        $('#'+objs[i].id).removeClass('badge')
        $('#'+objs[i].id).removeClass('bg-info')
    }
}

function novaFormCat() {
    let tela = $("#formCat");
    tela.empty();

    tela.append(`
        <div class="row">
            <div class="col-2">
                <label class="form-label" for="idcategoria">Cod. Categoria</label>
                <input type="text" class="form-control form-control-sm" name="idcategoria" id="idcategoria" value="" disabled>
            </div>
            <div class="col-2">
                <label class="form-label" for="categoryid">Id Ecommerce</label>
                <input type="text" class="form-control form-control-sm" name="categoryid" id="categoryid" value="" disabled>
            </div>
            <div class="col-6">
                <label class="form-label" for="name">Nome Categoria</label>
                <input type="text" class="form-control form-control-sm" style="text-transform:uppercase" name="name" id="name" value="">
            </div>
            <div class="col-2">
                <label class="form-label" for="isenabled">Ativo?</label>
                <select class="form-select form-select-sm" id="isenabled">
                    <option value="S">Sim</option>
                    <option value="N">Não</option>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <label class="form-label" for="url">URL</label>
                <input type="text" class="form-control form-control-sm" name="url" id="url" value="" disabled>
            </div>
            <div class="col-6">
                <label class="form-label" for="idcategoriapai">Categoria Pai</label>
                <select class="form-select form-select-sm" id="idcategoriapai">
                    <option value="">Sem Categoria Pai</option>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <label class="form-label" for="pagetitle">Titulo da Pagina</label>
                <input type="text" class="form-control form-control-sm" name="pagetitle" id="pagetitle" value="">
            </div>
            <div class="col-6">
                <label class="form-label" for="alternatetitle">Titulo Alternativo</label>
                <input type="text" class="form-control form-control-sm" name="alternatetitle" id="alternatetitle" value="">
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <label class="form-label" for="keywords">Palavras Chaves</label>
                <input type="text" class="form-control form-control-sm" name="keywords" id="keywords" value="">
            </div>
            <div class="col-6">
                <label class="form-label" for="metadescription">Meta Descrição</label>
                <input type="text" class="form-control form-control-sm" name="metadescription" id="metadescription" value="">
            </div>
        </div>
        <div class="row">
            <div class="col-8">
                <label class="form-label" for="editor">Descrição</label>
                <textarea id="editor" name="editor" ></textarea>
                <script>
                    var editor = new Simditor({
                        textarea: $('#editor')
                        //optional options
                    });
                </script>
            </div>
            <div class="col-4">
                <label class="form-label" for="metadescricao">Grupos</label>
                <select class="form-select" multiple aria-label="multiple select example" id="selectgrupocategorias">
                    <option selected value="0">Nenhuma das opções</option>
                </select>
            </div>
        </div>`)

        selectCategorias('idcategoriapai');
        selectgrupocategorias()

    $('#name').keyup(function(){
        $('#url').val(formataUrl($('#name').val()))
    });
}

function selectCategorias(select) {

    let componente = $('#'+select);
    let sql = "SELECT IDCATEGORIA, NAME, NIVEL FROM AD_ECMCATEGORIAS ORDER BY CONTA";
    let categorias = getDadosSql(sql,true);

    for(let i =0 ; i < categorias.length; i++) {
        let str = '&nbsp&nbsp'.repeat(categorias[i].NIVEL);
        componente.append(`<option value="${categorias[i].IDCATEGORIA}">${str}${categorias[i].NAME}</option>`);
    }

}

function selectgrupocategorias() {

    let componente = $('#selectgrupocategorias');
    let sql = "select * from AD_ECMGRUPOSDECATEGORIA";
    let categorias = getDadosSql(sql,true);

    for(let i =0 ; i < categorias.length; i++) {
        componente.append(`<option value="${categorias[i].IDGRUPOS}">${categorias[i].NAME}</option>`);
    }

}

function gravaCategoria() {
    let sql                 = ""
    let key                 = $('#idcategoria').val();
    let dados               = {}
    dados.NAME              = $('#name').val();
    dados.DESCRIPTION       = $('#editor').val();
    dados.URL               = $('#url').val();
    dados.KEYWORDS          = $('#keywords').val();
    dados.PAGETITLE         = $('#pagetitle').val();
    dados.ALTERNATETITLE    = $('#alternatetitle').val();
    dados.METADESCRIPTION   = $('#metadescription').val();
    dados.ISENABLED         = $('#isenabled').val();
    dados.IDCATEGORIAPAI    = $('#idcategoriapai').val();
    

    if(dados.IDCATEGORIAPAI == "" || dados.IDCATEGORIAPAI == undefined) {
        dados.NIVEL = 1;
        sql = `SELECT COUNT(*) FROM AD_ECMCATEGORIAS WHERE NIVEL = ${dados.NIVEL}`
        let conta = getDadosSql(sql);
        dados.CONTA = conta[0][0]; 
    } else {
        sql = `SELECT NIVEL, CONTA FROM AD_ECMCATEGORIAS WHERE IDCATEGORIA = ${dados.IDCATEGORIAPAI}`
        let nivel = getDadosSql(sql);
        dados.NIVEL = nivel[0][0] + 1; 

        sql = `SELECT COUNT(*) FROM AD_ECMCATEGORIAS WHERE NIVEL = ${dados.NIVEL} AND IDCATEGORIAPAI = ${dados.IDCATEGORIAPAI}`
        let conta = getDadosSql(sql);
        dados.CONTA = nivel[0][1]+'.'+ conta[0][0]; 
    }

    saveCategoria(dados, key);
    gridCategorias();
}

function saveCategoria(dados, key){

    let url = "http://"+hostname+":"+port+"/mge/service.sbr?serviceName=CRUDServiceProvider.saveRecord&outputType=json&mgeSession="+jnid;
    let obj = {
        "serviceName":"CRUDServiceProvider.saveRecord",
        "requestBody":{
           "dataSet":{
                "rootEntity":"AD_ECMCATEGORIAS",
                "includePresentationFields":"S",
                "dataRow":{
                    "localFields":{
                        "IDCATEGORIA" : {
                            "$" : (key != "") ? key : ""
                        },
                        "NAME":{
                        "$": dados.NAME
                        },
                        "DESCRIPTION":{
                        "$" : dados.DESCRIPTION
                        },      
                        "URL":{
                        "$" : dados.URL
                        },
                        "KEYWORDS":{
                        "$" : dados.KEYWORDS
                        },
                        "PAGETITLE":{
                        "$": dados.PAGETITLE
                        },
                        "ALTERNATETITLE":{
                        "$": dados.ALTERNATETITLE
                        },
                        "METADESCRIPTION" : {
                        "$" : dados.METADESCRIPTION
                        },
                        "ISENABLED" : {
                        "$" : dados.ISENABLED
                        },
                        "IDCATEGORIAPAI" : {
                            "$" : dados.IDCATEGORIAPAI
                        },
                        "NIVEL" : {
                            "$" : dados.NIVEL
                        },
                        "CONTA" : {
                            "$" : dados.CONTA
                        },
                        "ENVIAR" : {
                            "$" : "S"
                        }
                    }
                }, "entity":{
                    "fieldset":{
                        "list":"IDCATEGORIA, NAME"
                    }
                }
            }
        }
    }

    if(key != "") {
        obj.requestBody.dataSet.dataRow.key = { "IDCATEGORIA" : { "$" : key }}
    }

    const data = JSON.stringify(obj);

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
  
    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        //console.log(this.responseText);
        let data2 = JSON.parse(this.response);
        if(data2.responseBody != undefined){
            alertaMsg(`Categoria ${data2.responseBody.entities.entity.IDCATEGORIA.$ +' - '+data2.responseBody.entities.entity.NAME.$ }`,'S');
            return data2.responseBody.entities.entity.IDCATEGORIA.$;
        }else{
            alertaMsg('Erro ao criar Categoria! <br> Erro : <br> '+this.responseText,'E');
        }
    }});
  
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
  

    let categoriagrupo = $("#selectgrupocategorias");
    let fullOptions = categoriagrupo.find("option");
    
    let filteredOptions = fullOptions.filter(function() {
        return $(this).val() !== "0";
    });
    
    if (filteredOptions.length > 0) {
        let fields = {};
        let entity = "AD_ECMCATEGORIAGRUPOS";
        fields.IDCATEGORIA = dataFormatSankhya(key)
        filteredOptions.each((index, option) => {
            console.log("Indice: " + index);
            let idGrupo = parseInt($(option).val());
    
            if ($(option).is(":selected")) {
                let sql = `SELECT * FROM ${entity} WHERE IDCATEGORIA = ${key} AND IDGRUPOS = ${idGrupo}`;
                let dadosCategoriasGrupos = getDadosSql(sql, true);
                console.log("IDGrupo " + idGrupo + " está selecionada");
                if(dadosCategoriasGrupos.length > 0){
                    fields.ATIVO = dataFormatSankhya("S")
                    let chave = {
                        "IDCATEGORIA": dataFormatSankhya(key),
                        "IDCATEGORIAGRP":dataFormatSankhya(dadosCategoriasGrupos[0].IDCATEGORIAGRP)
                    }
                    saveRecord(entity, fields, chave)
                }
                else{
                    fields.ATIVO = dataFormatSankhya("S")
                    fields.IDGRUPOS = dataFormatSankhya(idGrupo)
                    saveRecord(entity, fields)
                }

            } else {
                let sql = `SELECT * FROM ${entity} WHERE IDCATEGORIA = ${key} AND IDGRUPOS = ${idGrupo}`;
                let dadosCategoriasGrupos = getDadosSql(sql, true);

                console.log("IDGrupo " + idGrupo + " não está selecionada");

                if(dadosCategoriasGrupos.length > 0){
                    let chave = {
                        "IDCATEGORIA": dataFormatSankhya(key),
                        "IDCATEGORIAGRP":dataFormatSankhya(dadosCategoriasGrupos[0].IDCATEGORIAGRP)
                    }
                    fields.ATIVO = dataFormatSankhya("N")
                    fields.IDGRUPOS = dataFormatSankhya(idGrupo)
                    saveRecord(entity, fields,chave)
                }
                else{
                    console.log("Id grupo: " +idGrupo+ "; Id Categoria: "+key+"; Não foi salvo no banco pois não existe no banco nem foi selecionado")
                }
            }
        });
    }

}
