var x;
var img =[];
var attach;
var owner_id;
var id;

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
		cutLongText();
		attach = x[0].attachments;
		if (typeof attach !== 'undefined'){
		attachment();
		id = x[0].id;
	 	owner_id = x[0].owner_id;
	}
		})});
		document.getElementById('market').innerHTML = '<table><tr><td><input value = "Перейти к записи" type = "button" onclick = look();></td><td><input value = "Опубликовать" type = "button" onclick = "postIt();"></td><td><input value = " >> Получить другую запись" type = "button" onclick = "newPost();"></td></tr></table>';
}
function newPost(){
wallGet();
}
function cutLongText() {
	var elem, size, text;
	elem = document.getElementById('hello');
	text = elem.innerHTML;
	size = 500;
	if (text.length > size) {
		text = text.slice(0, 500);
		elem.innerHTML = text + '...';
	}	
}
function attachment(){
for (n=0;n<attach.length; n++){
			if(attach[n].type == "photo"){
			   img[n] = new Image;
			   img[n].src = attach[n].photo.photo_130;				
			   document.getElementById('button').appendChild(img[n]);
				}
			else if(attach[0].type == 'market'){
				console.log('товар');				 
				img[n] = new Image;
				img[n].width = 50;
				img[n].height = 50;
				img[n].src = attach[n].market.thumb_photo;
				document.getElementById('button').innerHTML = '<p><small>Товар: '+attach[n].market.title+'</small></p>';
				document.getElementById('button').appendChild(img[n]);				
				}
			else if(attach[0].type == 'market_album'){
				console.log('подборка');				 
				img[n] = new Image;
				img[n].width = 50;
				img[n].height = 50;
				img[n].src = attach[n].market_album.photo.photo_75;
				document.getElementById('button').innerHTML = '<p><small>Подборка: '+attach[n].market_album.title+'</small></p>';
				document.getElementById('button').appendChild(img[n]);				
				}
			else if(attach[0].type == 'video'){
				console.log('видео');				 
				var id = attach[n].video.id;
				var owner_id = attach[n].video.owner_id;
				document.getElementById('button').innerHTML = '<p><a href = "https://vk.com/video'+owner_id+'_'+id+'" target="_blank">Видео по ссылке</a><p>';				}
			else {
				console.log('что-то другое');
			}
		}
}
function look(){
window.open('https://vk.com/vintagesbor?w=wall'+owner_id+'_'+id);
}
