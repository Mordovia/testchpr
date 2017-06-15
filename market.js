function albumsGet(){
	clearScreen();
	document.getElementById('button').innerHTML = "ID группы:	Имя группы";
	VK.api('market.getAlbums', {
							'owner_id': '-121807904', 
							}, function(data) {
					//console.log(data);
		var a = data.response.items;
		//console.log(a);
		for (var n=0; n<a.length -2; n++){
                       	var name = [];
			name = a[n].title;
                       	var id = [];
			id = a[n].id;
			
			//var text = id+':	'+name+'<br>'
		//console.log(a);
		//console.log(name);
		document.getElementById('exit').innerHTML += '<p style=" margin-top: 0px; margin-bottom: 0px;">'+id+': '+name+'<br></p>';
			//console.log(name+': '+id);
			}

		
})
addToAlbum16();
}
function addToAlbum16(){
VK.api('market.get', {
							'owner_id': '-121807904', 
							'album_id': '22',
                    }, function(data) {
					//console.log(data);                        
					var b = data.response.items;
	for (var n=0; n<b.length -2; n++){
                       VK.api('market.addToAlbum', {
			       'owner_id': '-121807904', 
				'album_id': '16',
			       'item_id': b[n].id,
		       }, function(data) {
		       console.log(data.response);
			      
		       }
			     )		
			}
	console.log(b[n].id);
})}
