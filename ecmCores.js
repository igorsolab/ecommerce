function mostraPaleta() {
    let importacaoProdutos = `
    <div id="paletaCores" class="d-flex flex-row justify-content-between">
        <div class="col-6">
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title mb-3 text-center">Cadastro de hexadecimal</h3>
                    <div class="d-flex justify-content-around align-items-end">
                        <div class="col-3">
                            <label for="coresSankhya">Selecione o titulo</label>
                            <select class="form-select" id="coresSankhya" aria-label="Categorias">
                                <option value="" selected>Selecione uma cor</option>
                            </select>
                        </div>
                        <div class="col-3 form-group">
                            <label for="hexadecimal" class="form-label">Selecione a cor</label>
                            <div id="hexadecimal" class="d-flex justify-content-center">
                                <input id="inputtexthex" maxlength="7" class="form-control" type="text" oninput="alteraCorInputColor()"/>
                                <input id="inputcolorhex" style="height:50px;width:100px" type="color" value="" disabled/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary" onclick="salvarCor()">Adicionar cor</button>
                </div>
            </div>
        </div>
        <div class="col-5">
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title mb-3 text-center">Cores já cadastradas</h3>
                    <div class="d-flex justify-content-around align-items-end">
                        <div class="col-3">
                            <label for="coresSankhya">Selecione o titulo</label>
                            <select class="form-select" id="coresCadastradas" onchange="mudaCorPaleta()" aria-label="Categorias">
                                <option value="" selected>Selecione uma cor</option>
                            </select>
                        </div>
                        <div class="col-3 form-group">
                            <label for="hexadecimal" class="form-label">Selecione a cor</label>
                            <div id="hexadecimal" class="d-flex justify-content-center">
                                <input id="inputcadastradotext" maxlength="7" class="form-control" type="text" oninput="alteraCorInputColor()" disabled/>
                                <input id="inputcadastradohex" style="height:50px;width:100px" type="color" value="" disabled/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;

    let tela    = $('#dados');
    tela.empty();
    tela.append(importacaoProdutos);
    
    pesquisaProduto()
    selectCoresSankhya()
    selectCoresCadastradas()
    // console.log(tela[0].outerHTML)
}

function selectCoresSankhya(){
  let coresSankhya = $("#coresSankhya")
  let sql = `
    SELECT * FROM AD_GRADEX ag WHERE HEXADECIMAL IS NULL ORDER BY DCRGRADEX 
  `
  let dados = getDadosSql(sql,true)

  let options = ""
  dados.forEach((element) => {
    options += `<option value="${element.IDGRADEX}">${element.DCRGRADEX}</option>`
  })
  coresSankhya.append(options)
}



function selectCoresCadastradas(){
    let coresSankhya = $("#coresCadastradas")
    let sql = `
      SELECT * FROM AD_GRADEX ag WHERE HEXADECIMAL IS NOT NULL ORDER BY DCRGRADEX 
    `
    let dados = getDadosSql(sql,true)
  
    let options = ""
    dados.forEach((element) => {
      options += `<option value="${element.IDGRADEX}">${element.DCRGRADEX}</option>`
    })
    coresSankhya.append(options)
  }


function mudaCorPaleta(){
    console.log("Entrei")
    let corcadastrada = $("#coresCadastradas").val()
    let inputtext = $("#inputcadastradotext")
    let inputhex = $("#inputcadastradohex")

    let sql = `SELECT * FROM AD_GRADEX WHERE IDGRADEX = ${corcadastrada}`
    let dadocor = getDadosSql(sql,true)
    console.log(dadocor)

    if(dadocor[0].HEXADECIMAL.includes('#')){
        inputtext.val(dadocor[0].HEXADECIMAL)
        inputhex.val(dadocor[0].HEXADECIMAL)
    }
    else{
        inputtext.val("#"+dadocor[0].HEXADECIMAL)
        inputhex.val("#"+dadocor[0].HEXADECIMAL)
    }

}


function alteraCorInputColor(){
    let texthex = $("#inputtexthex").val()
    if(texthex.includes('#')){
        $("#inputcolorhex").val(texthex)
    }
    else{
        $("#inputcolorhex").val("#"+texthex)
    }
}


function salvarCor(){
    let coresSankhya = $("#coresSankhya").val();
    let corhexadecimal = $("#inputcolorhex").val()

    let fields = {} 
    let key = {
        "IDGRADEX": dataFormatSankhya(coresSankhya)
    }
    fields.HEXADECIMAL = dataFormatSankhya(corhexadecimal)
    saveRecord('AD_GRADEX', fields, key)
    mostraPaleta()
}