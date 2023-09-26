// Arquivo de funçoes 

// converte texto para minuscula com a primeira letra em maiusculo
function txCapitular(str){
    str = str[0].toUpperCase() + str.substring(1).toLowerCase()
    return str
}

// formata url no modelo do sistema linx
function formataUrl(str) {

    str = str.toLowerCase()
    str = str.trim()
    str = str.replace(/ /g, '-')
    str = str.replace(/ç/g, 'c' )
    str = str.replace(/[áàãâä]/g, 'a')
    str = str.replace(/[éèêë]/g, 'e')
    str = str.replace(/[íìîï]/g, 'i')
    str = str.replace(/[óòõôö]/g, 'o')
    str = str.replace(/[úùûü]/g, 'u')

    return str 
}

// 