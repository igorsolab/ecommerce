function gridGrupoCategoria(){
    let tela = $("#dados");
    tela.empty()
    tela.append(cardGrupoCategoria());
}

function cardGrupoCategoria() {
    let sql = `SELECT * FROM AD_ECMGRUPOSDECATEGORIA`
    let gruposcategoria = getDadosSql(sql, true)

    let card = '<div class="d-flex flex-row justify-content-around mt-4">';
    
    gruposcategoria.map((e) => {
        sql = `SELECT ae.*, ae2.NAME FROM AD_ECMCATEGORIAGRUPOS ae INNER JOIN AD_ECMCATEGORIAS ae2 ON ae2.IDCATEGORIA = ae.IDCATEGORIA WHERE IDGRUPOS = ${e.IDGRUPOS} AND ae.ATIVO = 'S'`
        let categoriaGrupo = getDadosSql(sql,true)
        card +=  `
        <div class="card col-5 p-4">
            <h4 class="card-title d-flex justify-content-between">
                <span>${e.NAME}</span>
                <span><strong>#${e.CATEGORYGROUPID}</strong></span>
            </h4>
            <div class="card-body" style="max-height:500px;overflow-y:scroll">`
            categoriaGrupo.forEach(categoria => {
                let iconX = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
                `
                card+= `<li style="list-style-type:none;margin-top:10px;padding-bottom:10px;border-bottom:1px solid #ddd" class="d-flex justify-content-between align-items-center"><p class="mt-3">${categoria.NAME}</p> <button class="btn btn-danger p-2" onclick="abreModalExcluirCategoriaGrupo(${categoria.IDCATEGORIAGRP},${categoria.IDCATEGORIA},'${categoria.NAME}')">${iconX}</button></li>`
            })
            card+=`
            </div>
            <button class="btn btn-primary" onclick="adicionarCategoriaGrp(${e.IDGRUPOS})">Adicionar</button>
        </div>`
    })
    card+=`</div>`

    return card
}


function abreModalExcluirCategoriaGrupo(idgrupo, idcategoria, name){
    let bodyModal = $('#bodyExcluirItemGrpCategoria')
    let modal = new bootstrap.Modal(document.getElementById("modalExcluirItemCategoria"))
    let footer = $("#footer-excluir-categoria")
    // Colocar name no body para poder pegar os dados
    bodyModal.empty()
    footer.empty()
    bodyModal.append(`<p>Excluir categoria ${name} deste grupo?`)
    footer.append(`
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
    <button type="button" onclick="exclusaoCategoriaDoGrupo(${idgrupo},${idcategoria})" class="btn btn-danger">Apagar</button>
    `)
    modal.show()


}


function modalAdicionaNovaCategoria(){
    return `
    <div class="modal fade" id="adicionarNovaCategoriaGrp" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Adicionar categoria ao grupo</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="bodyAdicionarItemGrpCategoria">
                ...
                </div>
                <div class="modal-footer" id="footer-adicionar-categoria">
                </div>
            </div>
        </div>
    </div>`
}


function adicionarCategoriaGrp(idgrupos){
    
    let body  = $('#conteudo2');
    body.append(modalAdicionaNovaCategoria())

    let modal = $("#adicionarNovaCategoriaGrp")
    let bodyModal = $("#bodyAdicionarItemGrpCategoria")
    let footer = $("#footer-adicionar-categoria")

    bodyModal.empty()
    footer.empty()

    let sql = `
    SELECT 
        ae.IDCATEGORIA,
        COALESCE(ae3.IDCATEGORIAGRP, ae3_idgrupos1.IDCATEGORIAGRP) AS IDCATEGORIAGRP,
        COALESCE(ae3.IDGRUPOS, ae3_idgrupos1.IDGRUPOS) AS IDGRUPOS,
        COALESCE(ae3.ATIVO, ae3_idgrupos1.ATIVO) AS ATIVO,
        ae.NAME
    FROM 
        AD_ECMCATEGORIAS ae
        LEFT JOIN AD_ECMCATEGORIAGRUPOS ae3 ON ae.IDCATEGORIA = ae3.IDCATEGORIA AND ae3.IDGRUPOS = ${idgrupos}
        LEFT JOIN AD_ECMCATEGORIAGRUPOS ae3_idgrupos1 ON ae.IDCATEGORIA = ae3_idgrupos1.IDCATEGORIA AND ae3_idgrupos1.IDGRUPOS = ${idgrupos}
    WHERE 
        (ae3.ATIVO IS NULL OR ae3.ATIVO = 'N')
        AND (ae3.IDGRUPOS IS NULL OR ae3.IDGRUPOS = ${idgrupos});
    `
    let categorias = getDadosSql(sql,true)

    console.log(categorias)
    let conteudo = ""
    categorias.map(e => {

        conteudo += `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="${e.IDCATEGORIA}" id="check_${e.IDCATEGORIA}" name="checkcategoria_${idgrupos}">
                <label class="form-check-label" for="check_${e.IDCATEGORIA}">
                    ${e.NAME}
                </label>
            </div>
        `
    })

    footer.append(`
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
    <button type="button" onclick="adicionaCategorias(${idgrupos})" class="btn btn-primary">Adicionar</button>
    `)
    bodyModal.append(conteudo)
    let myModal = new bootstrap.Modal(modal)
    myModal.show()
}


function adicionaCategorias(idgrupo){
    let valor = $(`input[name="checkcategoria_${idgrupo}"]`);
    let checkboxValue = [];
    valor.each(function() {
        if ($(this).prop('checked')) {
            checkboxValue.push($(this).attr('value'));
        }
    });

    let entity = "AD_ECMCATEGORIAGRUPOS"
    let fields = {}
    fields.ATIVO = dataFormatSankhya("S")

    checkboxValue.forEach(element => {
        
        let sql = `SELECT IDCATEGORIAGRP FROM AD_ECMCATEGORIAGRUPOS WHERE IDGRUPOS = ${idgrupo} AND IDCATEGORIA = ${element}`
        let dados = getDadosSql(sql, true)

        if(dados.length > 0){
            let key = {
                "IDCATEGORIA":dataFormatSankhya(element),
                "IDCATEGORIAGRP":dataFormatSankhya(dados[0].IDCATEGORIAGRP)
            }
            saveRecord(entity,fields, key)
        }
        else{
            fields.IDGRUPOS = dataFormatSankhya(idgrupo)
            fields.IDCATEGORIA = dataFormatSankhya(element)
            saveRecord(entity,fields)
        }
    });

    $("#adicionarNovaCategoriaGrp").modal('hide')
    gridGrupoCategoria()

}

function exclusaoCategoriaDoGrupo(idgrupocategoria, idcategoria){
    let entity = "AD_ECMCATEGORIAGRUPOS"
    let fields = {}
    fields.ATIVO = dataFormatSankhya("N")
    let key = {
        "IDCATEGORIA":dataFormatSankhya(idcategoria),
        "IDCATEGORIAGRP":dataFormatSankhya(idgrupocategoria)
    }

    saveRecord(entity, fields, key)

    $("#modalExcluirItemCategoria").modal('hide')
    gridGrupoCategoria()
}