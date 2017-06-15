function albumsGet(){
	clearScreen();
	document.getElementById('button').innerHTML = "ID группы:	Имя группы";
	VK.api('market.getAlbums', {
							'owner_id': '-121807904', 
							}, function(data) {
					//console.log(data);
		var a = data.response.items;
		//console.log(a);
		for (var n=0; n<a.length; n++){
                       	var name = [];
			name = a[n].title;
                       	var id = [];
			id = a[n].id;
			
			//var text = id+':	'+name+'<br>'
		//console.log(a);
		//console.log(name);
		document.getElementById('exit').innerHTML += '<p>'+name+'<br></p>';
			//console.log(name+': '+id);
			}

		
})}
