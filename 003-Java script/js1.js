		// window.onload = function(){
		// 	function add(){
		// 	document.getElementById('box').style.background='red';
		// 	alert(123);
		// 	}
		// 	document.getElementById('box').onclick=add
		// }
			window.onload = function(){
			
			document.getElementById('box').onclick= function(){
				document.getElementById('box').style.background='blue';
				alert(123);
			}
			document.getElementById('box1').onclick = function(){
				document.getElementById('box1').style.backgroundColor = 'pink';
				alert('刘若阳');
			}
		}
		