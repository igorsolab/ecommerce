// Arquivo de funçoes do App de simulacao de precoBase
const hostname      = location.hostname;
const port          = location.port;
const user          = getUserLogado();
const jnid          = getJNID();
const nomeUsuario   = nomeUsu(user);
const numberFormat  = { minimumFractionDigits: 2 , style: 'currency', useGrouping: 'true', currency: 'BRL' };
const percentFormat = { minimumFractionDigits: 2 , style: 'percent', useGrouping: 'true', currency: 'BRL' };
const decimalFormat = { minimumFractionDigits: 2 , style: 'decimal', useGrouping: 'true', currency: 'BRL' };
const integerFormat = { minimumFractionDigits: 0 , style: 'decimal', useGrouping: 'true', currency: 'BRL' };
const localFormat   = "pt-BR";


// variaveis de tela
var telaProduto = "";

// função para capturar session do usuario logado
function getJNID(){

    let JSESSIONID = document.cookie.split('; ').find(row => row.startsWith('JSESSIONID=')).split('=')[1];
    return JSESSIONID;

}

// função para capturar codigo do usuario logado
function getUserLogado(){

    let userLogado = document.cookie.split('; ').find(row => row.startsWith('userIDLogado=')).split('=')[1];
    return userLogado;

}

//funçao para retornar o nome do usuario logado
function nomeUsu(user){
    let sql = `select NOMEUSU from TSIUSU u where u.CODUSU = ${user}`;
    let nome = getDadosSql(sql);

    return nome[0][0].replace('.', ' ');
}

// funçao de start do APP
function startApp(){

  // inicializando HTML #conteudo1
  initHtml();
  // menu lateral
  menu();
  // modals
  initModals();

}

// inicializando conteudo1
function initHtml(){
  let conteudo1 = $('#conteudo1');
  conteudo1.empty();
  
  let html = `
            <div class="row flex-nowrap" >
              <div class="bg-dark col-auto col-md-2 col-lg-2 min-vh-100 d-flex flex-column justify-content-between">
                <div class="bg-dark p-2">
                  <a class="d-flex text-decoration-none mt-1 align-items-center text-white">
                    <span class="fs-5 d-none d-sm-inline">Ecommerce</span>
                  </a>
                  <ul class="nav nav-pills flex-column mt-2" id="menu">
                  </ul>
                </div>
                <a class="d-flex text-decoration-none m-1 align-items-center text-white">
                  <span class="fs-8 d-none d-sm-inline">Solab - 2023</span>
                </a>
              </div>
              <div class="col-md-10 col-lg-10 p-3">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-12" id="dados">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `;
  html += customCSS();
  conteudo1.append(html);
}

// menu lateral
function menu() {

  let sql = `SELECT COUNT(*) FROM AD_ECMPRODUTOS`
  let qtdProd = getDadosSql(sql);
  sql = `SELECT COUNT(*) FROM AD_ECMSKUS`
  let qtdSKU = getDadosSql(sql);
  sql = `SELECT COUNT(*) FROM AD_ECMCATEGORIAS`
  let qtdCat = getDadosSql(sql);
  sql = `SELECT COUNT(*) FROM AD_ECMGRUPOSDECATEGORIA`
  let qtdGrp = getDadosSql(sql);  
  sql = `SELECT COUNT(*) FROM AD_ECMETIQUETAS`
  let qtdEtq = getDadosSql(sql);
  sql = `SELECT COUNT(*) FROM AD_ECMMARCAS`
  let qtdMarcas = getDadosSql(sql);
  sql = `SELECT COUNT(*) FROM AD_ECMMETADATA`
  let qtdMetadados = getDadosSql(sql);

  let html =`
        <li class="nav-item py-2 py-sm-0">
          <a href="#" class="nav-link text-white" aria-current="page"> 
            <i class="fs-5 fa fa-gauge"></i> <span class=" fs-6 ms-1 d-none d-sm-inline">Dashboard</span> 
          </a>
        </li>
        <li class="nav-item py-2 py-sm-0">
          <a href="#"  onclick="gridProdutos();" class="nav-link text-white" aria-current="page"> 
            <i class="fs-5 fa-sharp fa-solid fa-boxes-stacked"></i>  <span class=" fs-8 ms-1 d-none d-sm-inline">Produtos</span> <span class="badge fs-9 ms-1 bg-info">${qtdProd[0][0]}</span>
          </a>
        </li>
        <li class="nav-item py-2 py-sm-0">
          <a href="#" onclick="gridSKUS()" class="nav-link text-white" aria-current="page"> 
             <i class=" fs-5 fa-solid fa-box"></i> <span class=" fs-7 ms-1 d-none d-sm-inline">SKUs</span> <span class="badge fs-10 ms-1 bg-info">${qtdSKU[0][0]}</span> 
          </a>
        </li>
        <li class="nav-item py-2 py-sm-0">
          <a href="#" onclick="gridCategorias()" class="nav-link text-white" aria-current="page"> 
            <i class="fs-5 fa-solid fa-folder-tree"></i> <span class=" fs-7 ms-1 d-none d-sm-inline">Categorias</span> <span class="badge fs-9 ms-1 bg-info">${qtdCat[0][0]}</span> 
          </a>
        </li>
        <li class="nav-item py-2 py-sm-0">
        <a href="#" class="nav-link text-white" aria-current="page"> 
          <i class="fs-5 fa-regular fa-object-group"></i> <span class=" fs-8 ms-1 d-none d-sm-inline">Grupos de Categorias</span> <span class="badge fs-9 ms-1 bg-info">${qtdGrp[0][0]}</span>
        </a>
      </li>
      <li class="nav-item py-2 py-sm-0">
      <a href="#" onclick="gridEtiquetas()" class="nav-link text-white" aria-current="page"> 
        <i class="fs-5 fa-solid fa-tags"></i>  <span class=" fs-7 ms-1 d-none d-sm-inline">Etiquetas</span> <span class="badge fs-9 ms-1 bg-info">${qtdEtq[0][0]}</span> 
      </a>
      </li>
      <li class="nav-item py-2 py-sm-0">
      <a href="#" onclick="gridMarcas();" class="nav-link text-white" aria-current="page"> 
        <i class="fs-5 fa-regular fa-copyright"></i> <span class=" fs-7 ms-1 d-none d-sm-inline">Marcas</span> <span class="badge fs-9 ms-1 bg-info">${qtdMarcas[0][0]}</span> 
      </a>
      </li>
      <li class="nav-item py-2 py-sm-0">
      <a href="#" onclick="gridMetadados();" class="nav-link text-white" aria-current="page"> 
        <i class="fs-5 fa-solid fa-table"></i> <span class=" fs-7 ms-1 d-none d-sm-inline">Metadados</span> <span class="badge fs-9 ms-1 bg-info">${qtdMetadados[0][0]}</span> 
      </a>
      </li>
  `;

  let menu = $('#menu');
  menu.empty();
  menu.append(html);

}

// // modald e alerta
// function modalAlerta() {
//   return `<div class="modal fade text-left modal-warning" id="alertModal">
//                     <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 50%;">
//                       <div class="modal-content">
//                         <div class="modal-header text-white" id="headerAlertModal">
//                           <div class="modal-topo">
//                             <h4 class="modal-title text-left float-left" id="tituloAlertModal">
//                             </h4>
//                           </div>
//                           <button type="button" class="btn btn-link btn-sm" data-bs-dismiss="modal"><h4><i class="bi bi-x-lg text-white"></i></h4></button>
//                         </div>
//                         <div class="modal-body">
//                           <div class="modal-topo">
//                             <h1> <span class="" id="msgIcone"></span> <h5> Oi <span id="nomeUsuAlertModal"></span> </h5> </h1>
//                           </div>
//                           <div class="text-wrap text-break" id="msgmodal"></div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>`;
// }

// css da pagina
function customCSS(){
  return `<style type="text/css">
                 .accordion:not(.collapsed)::before {
                    background-color: #ff6613;
                    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%230c63e4'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
                    transform: rotate(360deg);
                    background-size: auto;
                    background-position: left;
                 }

                .accordion.collapsed {
                        background-color: #ffff;
                        background-image: url("/img/Home/FAQ/arrow-down.png");
                        background-size: auto;
                        background-position: center;
                }

                .form-label {
                  margin-top : 0.50rem !important;
                  margin-botton : 0.50rem !important;
                  font-size : 0.85rem !important; 
                  font-weight: bold !important;
                }

                .edtlabel {
                    min-width: 125px;
                }

                .inputmargem {border-style: solid  solid  solid none}
                
                .masterTooltip{
                  transition:background-color .5s;
                }
                
                .masterTooltip:hover{
                  background-color: #ffffe6;
                }
                
                .tooltipExtra {
                  display:none;
                  position:absolute;
                  border:1px solid #333;
                  background-color:#161616;
                  border-radius:5px;
                  padding:10px;
                  color:#fff;
                  font-size:12px Arial;
                }

                .inputmargem {border-style: solid  solid  solid none}
                  .masterTooltip{
                    transition:background-color .5s;
                  }
            
                .masterTooltip:hover{
                  background-color: #ffffe6;
                }
            
              .tooltipExtra {
                display:none;
                position:absolute;
                border:1px solid #333;
                background-color:#161616;
                border-radius:5px;
                padding:10px;
                color:#fff;
                font-size:12px Arial;
              }

              .nav-pills li a:hover {
                background-color: blue;
              }

              .dataTables_scrollBody {
                font-size: 0.80rem
              }

              .dataTables_info {
                font-size: 0.80rem
              }
          </style>`;  
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
    vIcone.append('<i class="bi bi-emoji-smile"></i>');
  }

  if(tipo == "A"){
    vHeader.addClass("bg-warning");
    vTitulo.append('ALERTA');
    vIcone.append('<i class="bi bi-emoji-smile"></i>');
  }

  $('#alertModal').modal('show');  
}



// monta data table
function montarDataTable(objeto,dados,coluna,sentido,altura,scroll,paginacao){
  $('#'+objeto).DataTable( {
      data: dados,
      order: [[ coluna, sentido ]],
      scrollY:        altura,
      scrollCollapse: scroll,
      paging:         paginacao,
      "language":{
          "emptyTable":     "Sem dados para exibir",
          "info":           "Exibindo _START_ de _END_ de um total de  _TOTAL_ registros",
          "infoEmpty":      "Exibindo 0 de 0 registros",
          "infoFiltered":   "(filtrado  _MAX_ total de registros)",
          "infoPostFix":    "",
          "thousands":      ",",
          "lengthMenu":     "Exibindo _MENU_ registros",
          "loadingRecords": "Carregando...",
          "processing":     "Processando...",
          "search":         "Pesquisar:",
          "zeroRecords":    "Nenhum registro encontrado",
          "paginate": {
              "first":      "Primeiro",
              "last":       "Ultimo",
              "next":       "Proximo",
              "previous":   "Anterior"
          }
      }
  });
}

// executa comando SQL
function getDadosSql(sql, resultAsObject, resultAsArrayPutFieldNames, convertDataToNativeType){
  if ( resultAsObject == null ) resultAsObject = false;
  var dados;
  var data = JSON.stringify({
  "serviceName": " DbExplorerSP.executeQuery",
  "requestBody": {
      "sql": sql
  }});

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {

        let data2 = JSON.parse(this.response);
  		let fieldsMetaData = data2.responseBody.fieldsMetadata;

        if ( convertDataToNativeType ){
           for (let z = 0; z < data2.responseBody.rows.length; z++){
              var baseObject = new Object();
              for (let y = 0; y < fieldsMetaData.length; y++){
                if ( fieldsMetaData[y].userType == 'F' ) {
                    data2.responseBody.rows[z][y] = parseFloat(data2.responseBody.rows[z][y]) || 0;
                } else if ( fieldsMetaData[y].userType == 'I' ){
                    data2.responseBody.rows[z][y] = parseInt(data2.responseBody.rows[z][y]) || 0 ;
                }
             }
           }
        }
  		  
        if ( resultAsObject ) {
  			  dados = [];
  			  for (let z = 0; z < data2.responseBody.rows.length; z++){
  				  var baseObject = new Object();
  				  for (let y = 0; y < fieldsMetaData.length; y++){
  					baseObject[fieldsMetaData[y].name] = data2.responseBody.rows[z][y];
                    baseObject[fieldsMetaData[y].name.toLowerCase()] = data2.responseBody.rows[z][y];
  				  }
  				  dados.push(baseObject);
  			  }
  		  } else {
            dados = data2.responseBody.rows;            
            if ( resultAsArrayPutFieldNames ){
  		          fieldNames = [];
                  for (let y = 0; y < fieldsMetaData.length; y++){
  					fieldNames.push(fieldsMetaData[y].name);
  				  }                  
                  dados.splice(0, 0, fieldNames); // adicionar os nomes dos campos na primeira linha
                                                  // util quando exporta array para csv
            }
  		  }

      }
    });

    xhr.open("POST", "http://"+hostname+":"+port+"/mge/service.sbr?serviceName=DbExplorerSP.executeQuery&outputType=json&mgeSession="+jnid, false);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(data);

    return dados;

}

// salva dados no Sankhya
function saveRecord(entity,fields,key){

  let result;

  let url = "http://"+hostname+":"+port+"/mge/service.sbr?serviceName=CRUDServiceProvider.saveRecord&outputType=json&mgeSession="+jnid;
  let obj = {
      "serviceName":"CRUDServiceProvider.saveRecord",
      "requestBody":{
         "dataSet":{
              "rootEntity":entity,
              "includePresentationFields":"S",
              "dataRow":{
                  "localFields": fields
              }, "entity":{
                  "fieldset":{
                      "list":"*"
                  }
              }
          }
      }
  }

  if(key != "") {
      obj.requestBody.dataSet.dataRow.key = key
  }

  const data = JSON.stringify(obj);

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
      let data2 = JSON.parse(this.response);
      if(data2.responseBody != undefined){
          result = data2.responseBody.entities.entity;
      }else{
          alertaMsg(`Erro ao salvar dados! <br> Erro : <br> ${this.responseText}`,'E');
      }
  }});

  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(data);
  console.log(data)

  return result
}

// convert data para sankhya
function convertDataToSankhya(data) {
  let date = '';
  let convertedDate = '';
  if(!data){
      date = new Date;
      convertedDate = date.toLocaleString();
  } else {
      date = doncDate;
  
      const ano = date.slice(0, 4);
      const mes = date.slice(5, 7);
      const dia = date.slice(8, 10);
      const horas = date.slice(11, 13);
      const minutos = date.slice(14, 16);
      const segundos = date.slice(17, 19);
  
      convertedDate = `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
  }
  return convertedDate.replace(',','');;
}


// formata data padrao sankhya
function dataFormatSankhya(data) {
    return {
              "$" : data
          }
}


// deleta simulaçao
function deleteSimulacao(id){

    url = "http://"+hostname+":"+port+"/mge/service.sbr?serviceName=CRUDServiceProvider.removeRecord&mgeSession="+jnid;
    let data = `<serviceRequest serviceName="CRUDServiceProvider.removeRecord">
                  <requestBody>
                    <entity rootEntity="AD_SIMULADORDEPRECO">
                      <id>
                        <ID>${id}</ID>
                      </id>
                    </entity>
                  </requestBody>
                </serviceRequest>`;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        //console.log(this.responseText);
        tabelaSimulacao();
    }});

    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);

}

// deleta item da simulação
function deleteItem(id,iditem){

    url = "http://"+hostname+":"+port+"/mge/service.sbr?serviceName=CRUDServiceProvider.removeRecord&mgeSession="+jnid;
    var data = `<serviceRequest serviceName="CRUDServiceProvider.removeRecord">
                  <requestBody>
                    <entity rootEntity="AD_SIMULADORDEPRECOITEM">
                      <id>
                        <ID>${id}</ID>
                        <IDITEM>${iditem}</IDITEM>
                      </id>
                    </entity>
                  </requestBody>
                </serviceRequest>`;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        //console.log(this.responseText);
        editarSimulacao(id);
    }});

    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);

}

function incrementDate( dateInput, increment ) {
  var dateFormatTotime = new Date(dateInput);
  var increasedDate = new Date(dateFormatTotime.getTime() +(increment *86400000));
  return increasedDate;
}


function exportToCsv(filename, rows, sep) {
    var processRow = function (row) {
        var finalVal = '';
        for (var j = 0; j < row.length; j++) {
            var innerValue = row[j] === null ? '' : row[j].toString();
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString();
            } else if(typeof row[j] == 'number' && !isNaN(row[j])){
                innerValue = row[j].toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 12
                            });
            }
                
            
            
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0) // incluir o SEP
                result = '"' + result + '"';
            if (j > 0)
                finalVal += sep;
            finalVal += result;
        }
        return finalVal + '\n';
    };

    var csvFile = '';
    for (var i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
    }

    var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

function exportarExcel(){
    let idSimulacao = $('#idsimulacao').text();
    sql = `SELECT 
                PRO.CODPROD,  
                PRO.DESCRPROD,
                SPI.*
            FROM 
                AD_SIMULADORDEPRECOITEM SPI LEFT JOIN 
                TGFPRO PRO ON ( SPI.CODPROD = PRO.CODPROD )
            WHERE 
                ID  = ${idSimulacao} `;

    linhasCsv = getDadosSql(sql, false, true, true);
    exportToCsv('simulacao_produtos', linhasCsv, ';');
}        

function pesquisaTabela(baseIdName, tabela, campoBusca, campoRetorno, extraFilter, onResult){
  let valor = $('#'+baseIdName).val();
  
  if ( baseIdName.toUpperCase() == 'FORNECEDOR' ){
     sql = `select 	f.CODPARC,
                  		f.NOMEPARC,
                  		f.CGC_CPF,
                  		c.NOMECID,
                  		u.UF
                  		from TGFPAR f
                  		inner join TSICID c on (c.CODCID = f.CODCID)
                  		inner join TSIUFS u on (u.CODUF = c.UF)
                  		where f.FORNECEDOR = 'S' and
                    ${campoBusca} = ${valor} ${extraFilter} order by 2`;
  } else { 
    sql = 'SELECT * '+			
		' FROM '+
			tabela +
		' WHERE '+
			campoBusca + ' = ' + valor+
			extraFilter;
  }

  // console.log(sql);			
  let dados =  getDadosSql(sql, true);
  
  if (onResult != null){	
	  eval( onResult+'(dados);');  
  }
  
  if ( dados.length == 0){
	  $('#desc'+baseIdName).val('');	
	  alert('Registro Não Localizado');
  } else {
	  $('#desc'+baseIdName).val(dados[0][campoRetorno.toUpperCase()]);	
  }
  // console.log(dados);
}	

function campoBusca(nomeCampo, label, tabela, campoBusca, campoDescricao, extraFilter, onResult, defaultValue, defaultDescription){
	let html;	
  
  defaultValue = defaultValue || '';
  defaultDescription = defaultDescription || '';
  
	html = `	
    <div class="row">
		<div class="col-2 pe-0">
			<label for="`+nomeCampo+`">`+label+`</label>
			<div class="input-group col-2">
				<input class="form-control" type="search" id="`+nomeCampo+`" onBlur="pesquisaTabela('`+nomeCampo+`', '`+tabela+`', '`+campoBusca+`', '`+campoDescricao+`', '`+extraFilter+`','`+onResult+`', '`+`', '');" value="${defaultValue}">
				<span class="input-group-append">
					<button class="btn btn-outline-secondary" type="button" id="btnBusca`+nomeCampo+`" onclick="pesquisaTabela('`+nomeCampo+`', '`+tabela+`', '`+campoBusca+`', '`+campoDescricao+`', '`+extraFilter+`','`+onResult+`', '`+`', '');">
						<i class="bi bi-search"></i>
					</button>
				</span>
			</div>
		</div>
		<div class="col-9 ps-1">
			<div class="input-group col-12">
				  <label for="desc`+nomeCampo+`">`+'&nbsp'+`</label>
				  <div class="input-group col-2">
					<input type="text" class="form-control text-uppercase" name="desc`+nomeCampo+`" id="desc`+nomeCampo+`" value="${defaultDescription}" readonly/>
				  </div>
			</div>
		</div>		
    </div>`;			
	return html;
}	


function groupCheckBox(chk){
  var state = $(chk)[0].checked, 
      id = $(chk)[0].id;

      g = $(chk).data('group');
    $('input[data-group]').each(function () {      
      if ( g == $(this).data('group') && state && id != $(this)[0].id && $(this)[0].checked ){
        $(this)[0].checked =  false;
      }
    });
}
