var albums = {
name: '',
id: '',
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
                       	name = a[n].title;
                       	id = a[n].id;
			document.getElementById('exit').innerHTML = id+":	"+name+'<br>';
			console.log(name+': '+id);
		//	console.log(id);
			
              }
})}
