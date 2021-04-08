<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
</head>

<body>
	<%
		int a = 0;
		String c = "c";
	%>
	<script>
		var varjson =<%=a%>;
		<%-- ,
			"c" :
	<%=c%> --%>
		alert(varjson);
		document.write(varjson);
	</script>
</body>

</html>