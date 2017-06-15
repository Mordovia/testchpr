function albumsGet(){
	clearScreen();
	document.getElementById('button').innerHTML = "ID группы:	Имя группы";
	VK.api('market.getAlbums', {
							'owner_id': '-121807904', 
							}, function(data) {
					//console.log(data);
		var a = data.response.items;
		//console.log(a);
		for (var n=0; n<a.length -1; n++){
                       	var name = [];
			name = a[n].title;
                       	var id = [];
			id = a[n].id;
			
			//var text = id+':	'+name+'<br>'
		//console.log(a);
		//console.log(name);
		document.getElementById('exit').innerHTML += '<p style=" margin-top: 0px; margin-bottom: 0px;"><input id="checkbox" type="checkbox">'+id+': '+name+'<br></p>';
		}
		buttonCreation3();	

		
})}

var buttonCreation3 = function(){
	var newPrognoz = document.getElementById('newPrognoz');
	var nprg = document.createElement('input')
	nprg.id = 'nprg'
	nprg.type = 'button'
	nprg.value = 'Перенести в группу Чай'
	nprg.setAttribute('onclick', 'checking();')
	newPrognoz.appendChild(nprg);
}
var checking = function(){
if (document.getElementById('checkbox').checked)
			{
				document.getElementById('table').innerHTML += id+',';
				document.getElementById('table').value += id+',';
			}
	addToAlbum16();
}
function addToAlbum16(){
VK.api('market.get', {
							'owner_id': '-121807904', 
							'album_id': document.getElementById('table').value,
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
