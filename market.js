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
		for (var n=0; n<a.count; n++){
                       	name = a.title;
                       	id = a.id;
			console.log(name);
			console.log(id);
			
              }
})}
