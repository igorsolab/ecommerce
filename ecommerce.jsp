<%@ page language="java" isELIgnored ="false"%>
<%@ page import="java.util.*" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%@ taglib prefix="snk" uri="/WEB-INF/tld/sankhyaUtil.tld" %>
<!doctype html>
<html lang="en">
<head>
	<title>Simulador de Preço</title>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<!-- CSS simeditor -->
	<link rel="stylesheet" type="text/css" href="http://10.10.100.28/sankhya/ecommerce/simeditor/simditor.css" />
	<!-- Jquery -->
	<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

	<!-- Bootstrap Tables -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.21.4/bootstrap-table.min.css" integrity="sha512-vaPSEKPBIWEWK+pGIwdLnPzw7S2Tr6rYVT05v+KN89YVpEJavFiY1dPzT+e1ZeyizjEPBicVxJ5QixXZw0Nopw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
	<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.21.4/bootstrap-table.min.js" integrity="sha512-rZAhvMayqW5e/N+xdp011tYAIdxgMMJtKxUXx7scO4iBPSUXAKdkrKIPRu6tLr0O9V6Bs9QujJF3MqmgSNfYPA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.21.4/locale/bootstrap-table-pt-BR.min.js" integrity="sha512-xU+PGH9a+yH8+HmTU1oNix9TQlvK+1kcAptGYCedR5Y2t8S5EoF6oTEwwVwijkZfSKuGbrwHcwMYcB/VAbY+1Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>


	<!-- Latest compiled and minified CSS -->
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
	<!-- Latest compiled JavaScript -->
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
	<!-- Bootstrap icons-->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
	<!-- Font Awesome -->
	<script src="https://kit.fontawesome.com/c054ce9a87.js" crossorigin="anonymous"></script>
	<!-- MaskedJS -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.maskedinput/1.4.1/jquery.maskedinput.min.js" integrity="sha512-d4KkQohk+HswGs6A1d6Gak6Bb9rMWtxjOa0IiY49Q3TeFd5xAzjWXDCBW9RS7m86FQ4RzM2BdHmdJnnKRYknxw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
	<!-- Tabela Responsiva-->
	<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs5/jszip-2.5.0/dt-1.11.5/b-2.2.2/b-colvis-2.2.2/b-html5-2.2.2/b-print-2.2.2/cr-1.5.5/rr-1.2.8/sc-2.0.5/sb-1.3.2/sp-2.0.0/datatables.min.css"/>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/pdfmake.min.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/vfs_fonts.js"></script>
	<script type="text/javascript" src="https://cdn.datatables.net/v/bs5/jszip-2.5.0/dt-1.11.5/b-2.2.2/b-colvis-2.2.2/b-html5-2.2.2/b-print-2.2.2/cr-1.5.5/rr-1.2.8/sc-2.0.5/sb-1.3.2/sp-2.0.0/datatables.min.js"></script>
	
	
	
	<!-- Script de modules simeditor -->
	<!-- <script language="JavaScript">
		document.write('<scr' + 'ipt src="http://10.10.100.28/sankhya/ecommerce/simeditor/module.js?versao='+Math.random()+'"><\/scr' + 'ipt>');
	</script> -->

	<!-- Script de hotkeys simeditor-->
	<!-- <script language="JavaScript">
		document.write('<scr' + 'ipt src="http://10.10.100.28/sankhya/ecommerce/simeditor/hotkeys.js?versao='+Math.random()+'"><\/scr' + 'ipt>');
	</script> -->

	<!-- Script de uploader simeditor -->
	<!-- <script language="JavaScript">
		document.write('<scr' + 'ipt src="http://10.10.100.28/sankhya/ecommerce/simeditor/uploader.js?versao='+Math.random()+'"><\/scr' + 'ipt>');
	</script> -->

	<!-- Script de simeditor -->
	<!-- <script language="JavaScript">
		document.write('<scr' + 'ipt src="http://10.10.100.28/sankhya/ecommerce/simeditor/simditor.js?versao='+Math.random()+'"><\/scr' + 'ipt>');
	</script> -->

	<!-- Script de MODAL`S -->
	<!-- <script language="JavaScript">
		document.write('<scr' + 'ipt src="http://10.10.100.28/sankhya/ecommerce/ecmModals.js?versao='+Math.random()+'"><\/scr' + 'ipt>');
	</script> -->
	<!-- Script de DIALOGOS -->
	<!-- <script language="JavaScript">
		document.write('<scr' + 'ipt src="http://10.10.100.28/sankhya/ecommerce/ecmDialogos.js?versao='+Math.random()+'"><\/scr' + 'ipt>');
	</script> -->
	<!-- Script Produtos -->
	<!-- <script language="JavaScript">
		document.write('<script src="http://10.10.100.28/sankhya/ecommerce/ecmProdutos.js?versao='+Math.random()+'"><\/scr' + 'ipt>');
	</script> -->
	<!-- <script language="JavaScript">
		document.write('<script src="http://10.10.100.28/sankhya/ecommerce/ecmCadastroProdutos.js?versao='+Math.random()+'"><\/scr' + 'ipt>');
	</script> -->
	<!-- Script Skus -->
	<!-- <script language="JavaScript">
		document.write('<script src="http://10.10.100.28/sankhya/ecommerce/ecmSkus.js?versao='+Math.random()+'"><\/scr' + 'ipt>');
	</script> -->
	<!-- Script Categorias -->
	<!-- <script language="JavaScript">
		document.write('<script src="http://10.10.100.28/sankhya/ecommerce/ecmCategorias.js?versao='+Math.random()+'"><\/scr' + 'ipt>');
	</script> -->
	<!-- Script Marcas -->
	<!-- <script language="JavaScript">
		document.write('<script src="http://10.10.100.28/sankhya/ecommerce/ecmMarcas.js?versao='+Math.random()+'"><\/scr' + 'ipt>');
	</script> -->
	<!-- Script Etiquetas -->
	<!-- <script language="JavaScript">
		document.write('<script src="http://10.10.100.28/sankhya/ecommerce/ecmEtiquetas.js?versao='+Math.random()+'"><\/scr' + 'ipt>');
	</script> -->
	<!-- Script MetaDados -->
	<!-- <script language="JavaScript">
		document.write('<script src="http://10.10.100.28/sankhya/ecommerce/ecmMetadados.js?versao='+Math.random()+'"><\/scr' + 'ipt>');
	</script> -->
	<!-- Script Utils -->
	<!-- <script language="JavaScript">
		document.write('<script src="http://10.10.100.28/sankhya/ecommerce/ecmUtils.js?versao='+Math.random()+'"><\/scr' + 'ipt>');
	</script> -->
	<!-- Script de API -->
	<!-- <script language="JavaScript">
		document.write('<script src="http://10.10.100.28/sankhya/ecommerce/ecmApp.js?versao='+Math.random()+'"><\/scr' + 'ipt>');
	</script>
	<script language="JavaScript">
		document.write('<script src="http://10.10.100.28/sankhya/ecommerce/ecmGrupoCategorias.js?versao='+Math.random()+'"><\/scr' + 'ipt>');
	</script> -->


	<!-- Configurando pra rodar em localhost -->

	<script language="JavaScript">
		document.write('<scr' + 'ipt src="http://172.16.62.168/ecommerce/simeditor/module.js?versao='+Math.random()+'"><\/scr' + 'ipt>');
	</script>

	<!-- Script de hotkeys simeditor-->
	<script language="JavaScript">
		document.write('<scr' + 'ipt src="http://172.16.62.168/ecommerce/simeditor/hotkeys.js?versao='+Math.random()+'"><\/scr' + 'ipt>');
	</script>

	<!-- Script de uploader simeditor -->
	<script language="JavaScript">
		document.write('<scr' + 'ipt src="http://172.16.62.168/ecommerce/simeditor/uploader.js?versao='+Math.random()+'"><\/scr' + 'ipt>');
	</script>

	<!-- Script de simeditor -->
	<script language="JavaScript">
		document.write('<scr' + 'ipt src="http://172.16.62.168/ecommerce/simeditor/simditor.js?versao='+Math.random()+'"><\/scr' + 'ipt>');
	</script>

	<!-- Script de MODAL`S -->
	<script language="JavaScript">
		document.write('<scr' + 'ipt src="http://172.16.62.168/ecommerce/ecmModals.js?versao='+Math.random()+'"><\/scr' + 'ipt>');
	</script>
	<!-- Script de DIALOGOS -->
	<script language="JavaScript">
		document.write('<scr' + 'ipt src="http://172.16.62.168/ecommerce/ecmDialogos.js?versao='+Math.random()+'"><\/scr' + 'ipt>');
	</script>
	<!-- Script Produtos -->
	<script language="JavaScript">
		document.write('<script src="http://172.16.62.168/ecommerce/ecmProdutos.js?versao='+Math.random()+'"><\/scr' + 'ipt>');
	</script>
	<script language="JavaScript">
		document.write('<script src="http://172.16.62.168/ecommerce/ecmCadastroProdutos.js?versao='+Math.random()+'"><\/scr' + 'ipt>');
	</script>
	<!-- Script Skus -->
	<script language="JavaScript">
		document.write('<script src="http://172.16.62.168/ecommerce/ecmSkus.js?versao='+Math.random()+'"><\/scr' + 'ipt>');
	</script>
	<!-- Script Categorias -->
	<script language="JavaScript">
		document.write('<script src="http://172.16.62.168/ecommerce/ecmCategorias.js?versao='+Math.random()+'"><\/scr' + 'ipt>');
	</script>
	<!-- Script Marcas -->
	<script language="JavaScript">
		document.write('<script src="http://172.16.62.168/ecommerce/ecmMarcas.js?versao='+Math.random()+'"><\/scr' + 'ipt>');
	</script>
	<!-- Script Etiquetas -->
	<script language="JavaScript">
		document.write('<script src="http://172.16.62.168/ecommerce/ecmEtiquetas.js?versao='+Math.random()+'"><\/scr' + 'ipt>');
	</script>
	<!-- Script MetaDados -->
	<script language="JavaScript">
		document.write('<script src="http://172.16.62.168/ecommerce/ecmMetadados.js?versao='+Math.random()+'"><\/scr' + 'ipt>');
	</script>
	<!-- Script Utils -->
	<script language="JavaScript">
		document.write('<script src="http://172.16.62.168/ecommerce/ecmUtils.js?versao='+Math.random()+'"><\/scr' + 'ipt>');
	</script>
	<!-- Script de API -->
	 <script language="JavaScript">
		document.write('<script src="http://172.16.62.168/ecommerce/ecmApp.js?versao='+Math.random()+'"><\/scr' + 'ipt>');
	</script>
	<script language="JavaScript">
		document.write('<script src="http://172.16.62.168/ecommerce/ecmGrupoCategorias.js?versao='+Math.random()+'"><\/scr' + 'ipt>');
	</script> 

	<snk:load/>
</head>
<body>
	<div class="containner-fluid">
		<div id="conteudo1">
		</div>

		<div id="conteudo2">
		</div>
	</div>
</body>
<script>
	// inicio do app
	startApp();
</script>
</html>
