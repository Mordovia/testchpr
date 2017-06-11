var albums = {
['name'+n]: 'none',
['id'+n]: '',
};
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
                       	albums['name'+n] = a[n].title;
                       	albums['id'+n] = a[n].id;
			
			//var text = id+':	'+name+'<br>'
			document.getElementById('exit').innerHTML= '<p>'+albums['name'+n]+'</p>';
			//console.log(name+': '+id);
			}
		console.log(albums);
		
})}
