var x;
var img =[];
function wallGet(){
	clearScreen();
		VK.api('wall.get', {
							'owner_id': '-121807904',
							'count': '1',
							}, function(data) {
					//console.log(data);
			var a = 0;
			var b = data.response.count;
			//console.log(b);
			function getRandomInt(a,b)
								{
									return Math.floor(Math.random() * (b + 1));
								}
			//console.log(getRandomInt(a,b));
			x = getRandomInt(a,b);
			console.log(x);
		
	VK.api('wall.get', {
							'owner_id': '-121807904',
							'count': '1',
							'offset': x,
							}, function(data) {
		console.log(data);
		x = data.response.items;
		document.getElementById('hello').innerText = '<p><small>'+x[0].text+'</small></p>';
		var a = x[0].attachments;
		console.log(a);
		for (n=0;n<a.length; n++){
			if(a[0].type == 'photo'){
			   img[n] = new Image;
			   img[n] = a[n].photo_75;
			   document.getElementById('button').innerText = a[0].photo_75;
				}
			else if(a[0].type == 'market'){
				console.log('url');
				}
			else {
				console.log('что-то другое');
			}
		}
			
		})});
	document.getElementById('market').innerHTML = '<input value = "Получить другую запись" type = "button" onclick = "newPost();">';
}
function newPost(){
wallGet();
}
