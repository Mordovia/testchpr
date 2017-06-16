function wallGet(){
	clearScreen();
		VK.api('wall.get', {
							'owner_id': '-121807904', 
							}, function(data) {
					console.log(data);
		/* a = data.response.items;
		//console.log(a);
		for (var n=0; n<a.length -1; n++){
                       	var name = [];
			name = a[n].title;
                       	id = a[n].id;
			
			//var text = id+':	'+name+'<br>'
		//console.log(a);
		//console.log(name);
		document.getElementById('exit').innerHTML += '<p style=" margin-top: 0px; margin-bottom: 0px;"><input id="checkbox'+n+'" type="checkbox" checked>'+id+': '+name+'<br></p>';
		}
		buttonCreation3();	

		
}*/}})}
