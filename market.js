function albumsGet(){
	VK.api('market.getAlbums', {
							'owner_id': '-121807904', 
							}, function(data) {
					console.log(data);                        
})}
