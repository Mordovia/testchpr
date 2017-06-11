var albums = {
name: '',
id: '',
};
function albumsGet(){
	VK.api('market.getAlbums', {
							'owner_id': '-121807904', 
							}, function(data) {
					console.log(data);
		var a = data.response.items;
		console.log(a);
		for (var n=0; n<a.length; n++){
                       	name = a.title;
                       	id = a.id;
			console.log(name);
			console.log(id);
			
              }
})}
