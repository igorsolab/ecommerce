function gridMarcas(){
    let   sql     = `select 	ae.IDMARCA, 
                                ae.BRANDID, 
                                ae.NAME, 
                                ae.URLFRIENDLY, 
                                (SELECT COUNT(*) FROM AD_ECMPRODUTOS ap WHERE ap.BRANDID = ae.IDMARCA) AS QTDPROD, 
                                (SELECT COUNT(*) FROM AD_ECMPRODUTOS ap INNER JOIN AD_ECMSKUS es ON (es.PRODUTOID = ap.IDPRODUTO)  WHERE ap.BRANDID = ae.IDMARCA) AS QTDSKU 
                                from AD_ECMMARCAS ae `;

    let   data    = getDadosSql(sql, true);
    let   dados   = [];
    let   tela    = $('#dados');

    tela.empty();

    // menu da tela de produtos
    tela.append(`<nav class="navbar navbar-expand-sm mb-2 bg-light navbar-light">
                    <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">
                        <i class="fs-5 fa-regular fa-copyright"></i> <span class=" fs-6 ms-1 d-none d-sm-inline" >Marcas</span> 
                        </a>
                    </li>
                    <li class="nav-item">
                        <!-- <a class="btn btn btn-outline-secondary"  href="#">Importar Marcas</a> -->
                    </li>
                    </ul>
                </nav>`);

    // inclui tabela
    tela.append(`<table id="dataTb" class="table mt-2 table-striped table-bordered w-100 dtTable" style="font-size: 0.80rem;">
                                <thead>
                                    <tr class="bg-dark text-white">
                                        <th>ID</th>
                                        <th>ID ECM</th>
                                        <th>MARCA</th>
                                        <th>URL AMIGAVEL</th>  
                                        <th>QTD PRODs</th>
                                        <th>QTD SKUs</th>
                                        <th></th>
                                    </tr>
                                </thead>
                            </table>`)


    for(let i = 0; i < data.length; i++){

        let botao = `<button type="button" onclick="viewMarca(${data[i].IDMARCA});" class="btn btn-sm btn-success"><i class="fa-solid fa-pen-to-square"></i></button>`;
        
        dados.push([data[i].IDMARCA,data[i].BRANDID,data[i].NAME,data[i].URLFRIENDLY,data[i].QTDPROD,data[i].QTDSKU,botao]);

    }

    montarDataTable('dataTb',dados,0,"desc","450px",true,false);
}


// edita marca
function viewMarca(idmarca) {
  // debugger
  let modalMarca = $('#modalDetalheMarca');
  let sql   = `SELECT * FROM AD_ECMMARCAS WHERE IDMARCA = ${idmarca}`;
  let marca = getDadosSql(sql,true);
  let form  = $('#bodyDetalheMarca');
  let titulo = $('#titleDetalheMarca');

  titulo.empty();
  form.empty();

  titulo.append(marca[0].IDMARCA + ' - ' +  marca[0].NAME)

  form.append(`
    <div class="row">
      <div class="col-2">
        <label class="form-label" for="idmarca">Id Marca</label>
        <input type="text" class="form-control form-control-sm" name="idmarca"  id="idmarca" value="" disabled>
      </div>
      <div class="col-2">
        <label class="form-label" for="brandid">Id Ecommerce</label>
        <input type="text" class="form-control form-control-sm" name="brandid"  id="brandid" value="" disabled>
      </div>
      <div class="col-2">
        <label class="form-label" for="isenabled">Ativo</label>
        <select class="form-select form-select-sm" id="isenabled">
            <option value="S">Sim</option>
            <option value="N">Não</option>
        </select>
      </div>
      <div class="col-6">
        <label class="form-label" for="name">Marca</label>
        <input type="text" class="form-control form-control-sm" name="name"  id="name" value="">
      </div>
    </div>
  `);

  form.append(`
    <div class="row">
      <div class="col-6">
        <label class="form-label" for="url">URL</label>
        <input type="text" class="form-control form-control-sm" name="url"  id="url" value="">
      </div>
      <div class="col-6">
        <label class="form-label" for="urlfriendly">URL Amigavel</label>
        <input type="text" class="form-control form-control-sm" name="urlfriendly"  id="urlfriendly" value="" disabled>
      </div>
    </div>
  `)

  form.append(`
    <div class="row">
      <div class="col-6">
        <label class="form-label" for="pagetitle">Titulo da Pagina</label>
        <input type="text" class="form-control form-control-sm" name="pagetitle"  id="pagetitle" value="" disabled>
      </div>
      <div class="col-6">
        <label class="form-label" for="alternatetitle">Titulo Alternativo</label>
        <input type="text" class="form-control form-control-sm" name="alternatetitle"  id="alternatetitle" value="">
      </div>
    </div>
  `)

  form.append(`
    <div class="row">
      <div class="col-6">
        <label class="form-label" for="keywords">Palavras Chaves</label>
        <input type="text" class="form-control form-control-sm" name="keywords"  id="keywords" value="" >
      </div>
      <div class="col-6">
        <label class="form-label" for="metadescription">Meta Descrição  </label>
        <input type="text" class="form-control form-control-sm" name="metadescription"  id="metadescription" value="">
      </div>
    </div>
  `)

  form.append(`
    <div class="row mb-2">
      <div class="col-12">
        <label class="form-label" for="editor">Descrição</label>
        <textarea id="editor" name="editor" ></textarea>
        <script>
            var editor = new Simditor({
                textarea: $('#editor')
                //optional options
            });
        </script>
      </div>
    </div>
  `)

  modalMarca.modal('show');

  $('#idmarca').val(marca[0].IDMARCA);
  $('#brandid').val(marca[0].BRANDID);
  $('#name').val(marca[0].NAME);
  $('#url').val(marca[0].URL);
  $('#urlfriendly').val(marca[0].URLFRIENDLY);
  $('#pagetitle').val(marca[0].PAGETITLE);
  $('#alternatetitle').val(marca[0].ALTERNATETITLE);
  $('#isenabled').val(marca[0].ISENABLED);
  editor.setValue(marca[0].DESCRIPTION);
  $('#keywords').val(marca[0].KEYWORDS);
  $('#metadescription').val(marca[0].METADESCRIPTION);

  $('#name').keyup(function () {
    let txt = $('#name').val()
    $('#pagetitle').val(txCapitular(txt))
    $('#alternatetitle').val(txCapitular(txt))
    $('#urlfriendly').val(formataUrl(txt))
  })

} 


// grava marca 

function gravaMarca() {
  let key = $('#idmarca').val();
  let obj = {}
  obj.NAME            = $('#name').val();
  obj.BRANDID         = $('#brandid').val();
  obj.URL             = $('#url').val();
  obj.URLFRIENDLY     = $('#urlfriendly').val();
  obj.PAGETITLE       = $('#pagetitle').val();
  obj.ALTERNATETITLE  = $('#altenatetitle').val();
  obj.ISENABLED       = $('#isenabled').val();
  obj.DESCRIPTION     = $('#editor').val();
  obj.KEYWORDS        = $('#keywords').val();
  obj.METADESCRIPTION = $('#metadescription').val();
  obj.ENVIAR          = 'S';

  let idmarca = saveMarca(obj,key);

  if(isinteger(idmarca)) alertaMsg('Marca gravada com sucesso!','S');

  $('modalDetalheMarca').modal('hide');

}

// monta modal de detalhes de sku
function modalDetalheMarca(){
  return `
  <div class="modal" id="modalDetalheMarca" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-scrollable modal-xl">
          <div class="modal-content">
      
              <div class="modal-header">
              <h5 class="modal-title">Edição #<span id="titleDetalheMarca"></span></h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
      
              <!-- Modal body -->
              <div class="modal-body" id="bodyDetalheMarca">
              ....
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><i class="fa-solid fa-ban"></i> Cancelar</button>
                  <button type="button" class="btn btn-primary" onclick="gravaMarca();" data-bs-dismiss="modal"><i class="fa-regular fa-floppy-disk"></i> Salvar</button>
              </div>
          </div>
      </div>
  </div>`
}


// inclui e edita marca
function saveMarca(dados, key){
  let codprod;

  let url = "http://"+hostname+":"+port+"/mge/service.sbr?serviceName=CRUDServiceProvider.saveRecord&outputType=json&mgeSession="+jnid;
  let dataBr = convertDataToSankhya();
  let obj = {
    "serviceName":"CRUDServiceProvider.saveRecord",
    "requestBody":{
       "dataSet":{
          "rootEntity":"AD_ECMMARCAS",
          "includePresentationFields":"S",
          "dataRow":{
             "localFields":{
                 "NAME":{
                   "$" : dados.NAME
                 },
                 "URL" : {
                  "$" : dados.URL
                 },
                 "URLFRIENDLY":{
                   "$" : dados.URLFRIENDLY
                 }, 
                 "ISENABLED":{
                   "$" : dados.ISENABLED
                 },
                 "PAGETITLE" : {
                   "$" : dados.PAGETITLE
                 },
                 "ALTERNATETITLE" : {
                   "$" : dados.ALTERNATETITLE
                 },
                 "DESCRIPTION" : {
                   "$" : dados.DESCRIPTION
                 },
                 "KEYWORDS" : {
                   "S" : dados.KEYWORDS
                 },
                 "METADESCRIPTION" : {
                   "$" : dados.METADESCRIPTION
                 },
                 "ENVIAR" : {
                   "$" : dados.ENVIAR
                 }
             }
          }, "entity":{
             "fieldset":{
                "list":"IDMARCA"
             }
          }
       }
    }
  }

  if(key != "") {
      obj.requestBody.dataSet.dataRow.key = { "IDMARCA" : { "$" : key }}
  } else {
      obj.requestBody.dataSet.dataRow.localFields.DATA_INC = {"$" : dataBr}
  }

  const data = JSON.stringify(obj);

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
      //console.log(this.responseText);
      let data2 = JSON.parse(this.response);
      if(data2.responseBody != undefined){
        codprod =  data2.responseBody.entities.entity.IDMARCA.$;
      }else{
          alertaMsg('Erro ao criar/editar Marca! <br> Erro : <br> '+this.responseText,'E');
      }
  }});

  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(data);

  return codprod;
}