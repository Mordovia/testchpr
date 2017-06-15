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
							'album_id': '20',
                    }, function(data) {
					                        
					var b = data.response.items;
					console.log(b);
	for (var n=0; n<b.length; n++){
                       VK.api('market.addToAlbum', {
			       'owner_id': '-121807904', 
				'album_ids': '16',
			       'item_id': b[n].id,
		       }, function(data) {
			       var c = data.response;
		       console.log(c);
			      
		       }
			     )		
			}
	console.log(b[n].id);
})}
