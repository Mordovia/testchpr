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
		document.getElementById('hello').innerHTML = '<p><small>'+x[0].text+'</small></p>';
		var a = x[0].attachments;
		if (a !== 'undefined'){
		console.log(a[0].type);
		//for (n=0;n<a[0].length; n++){
			if(a[0].type == "photo"){
				console.log('картинка');				
			   img[0] = new Image;
			   img[0].src = a[0].photo.photo_130;
				console.log(img[0].src);
			   document.getElementById('button').appendChild(img[0]);
				}
			else if(a[0].type == 'market'){
				console.log('url');
				}
			else {
				console.log('что-то другое');
			}
		//}
	}
			
		})});
	document.getElementById('market').innerHTML = '<input value = "Получить другую запись" type = "button" onclick = "newPost();">';
}
function newPost(){
wallGet();
}
