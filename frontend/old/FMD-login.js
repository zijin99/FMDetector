
		function checkuser() { 
			if(document.getElementById('uninput').value == "123@123.com" && document.getElementById('pwdinput').value == "123") { 
				return true;
			}else { 
				alert("Wrong User Name or Invaild Password！")
                location.replace("FMD-main.html");
				return false;
			}
		};
		
		function realclick(){
			$("#realsub").trigger("click");
		};