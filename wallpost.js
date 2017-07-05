var x;
//var img =[];
var attach;
var owner_id;
var id;
var attchId = [];
var text;
var path;
$('#datep').datetimepicker({
datepicker== true,
	timepicker== true
});
function wallGet(){
	clearScreen();
		VK.api('wall.get', {
							'owner_id': '-121807904',
							'count': '1',
							}, function(data) {
					//console.log(data);
			var b = data.response.count;
			x = getRandomInt(0,b);
			//console.log(x);
		
	VK.api('wall.get', {
							'owner_id': '-121807904',
							'count': '1',
							'offset': x,
							}, function(data) {
		x = data.response.items;
		document.getElementById('hello').innerHTML = '<p><small>'+x[0].text+'</small></p>';
		cutLongText();
		attach = x[0].attachments;
		//console.log(attach);
		if (typeof attach !== 'undefined'){
		attachment();
		id = x[0].id;
	 	owner_id = x[0].owner_id;
	}
		})});
		document.getElementById('prognoz').innerHTML = '<table><tr><td><input value = "Перейти к записи" type = "button" onclick = look();></td><td><input value = "Опубликовать" type = "button" onclick = "selectData();"></td><td><input value = " >> Получить другую запись" type = "button" onclick = "newPost();"></td></tr></table>';
		backToMainMenu();
}
function newPost(){
//path = '';
wallGet();
}
function cutLongText() {
	var elem, size;
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
				attchId[n] = attach[n].photo.id;
				//console.log(attchId);
				owner_id = attach[n].photo.owner_id;
				document.getElementById('button').appendChild(img[n]);
				}
			else if(attach[0].type == 'market'){
				img[n] = new Image;
				img[n].width = 50;
				img[n].height = 50;
				img[n].src = attach[n].market.thumb_photo;
				owner_id = attach[n].market.owner_id;
				attchId[n] = attach[n].market.id;
				document.getElementById('button').innerHTML = '<p><small>Товар: '+attach[n].market.title+'</small></p>';
				document.getElementById('button').appendChild(img[n]);				
				}
			else if(attach[0].type == 'market_album'){
				img[n] = new Image;
				img[n].width = 50;
				img[n].height = 50;
				img[n].src = attach[n].market_album.photo.photo_75;
				owner_id = attach[n].market_album.owner_id;
				attchId[n] = '?section=album_'+attach[n].market_album.id;
				document.getElementById('button').innerHTML = '<p><small>Подборка: '+attach[n].market_album.title+'</small></p>';
				document.getElementById('button').appendChild(img[n]);
			}
			else if(attach[0].type == 'video'){
				attchId[n] = attach[n].video.id;
				owner_id = attach[n].video.owner_id;
				document.getElementById('button').innerHTML = '<p><a href = "https://vk.com/video'+owner_id+'_'+id+'" target="_blank">Видео по ссылке</a><p>';				}
			else {
				console.log('что-то другое');
			}
		}
}
function look(){
window.open('https://vk.com/vintagesbor?w=wall'+owner_id+'_'+id);
}
function selectData(){
document.getElementById('newPrognoz').innerHTML = '<table><tr><td><input type="datetime-local" id = "dataSelect"></td><td><input value = "Опубликовать в выбранное время" type="button" onclick = postItSelected();></td></tr><tr><td><input value = "Опубликовать сейчас" type = "button" onclick = postItNow();></td><td><input value = "Опубликовать в случайное время" type = "button" onclick = "postItRandom();"></td></tr></table>';
}
function postItSelected(){
	var str = new String;
	for (var n=0; n<attach.length; n++){
		if (attach[0].type == 'market_album'){
			path = 'market'+owner_id+'_'+attchId[n];
		}
		else{
			path = attach[0].type+owner_id+'_'+attchId[n];
		}
		str += path+',';
	}
	function time(){
		var r = Date.parse(document.getElementById('dataSelect').value);
		console.log(r);
		return r/1000;
}
//console.log(time());
//console.log(path);
//console.log(str);	
VK.api('wall.post', {
	'owner_id': '-121807904',
	'message': x[0].text,
	'publish_date': time(),
	'from_group': '1',
	'attachments': str
})
}
function postItRandom(){
	var str = new String;
	for (var n=0; n<attach.length; n++){
		if (attach[0].type == 'market_album'){
			path = 'market'+owner_id+'_'+attchId[n];
		}
		else{
			path = attach[0].type+owner_id+'_'+attchId[n];
		}
		str += path+',';
	}
	function time(){
		var r = getRandomInt(0,7);
		return parseInt(new Date(day[r]).getTime()/1000);
}
//console.log(time());
//console.log(path);
//console.log(str);	
VK.api('wall.post', {
	'owner_id': '-121807904',
	'message': x[0].text,
	'publish_date': time(),
	'from_group': '1',
	'attachments': str
})
}
function postItNow(){
	var str = new String;
	for (var n=0; n<attach.length; n++){
		if (attach[0].type == 'market_album'){
			path = 'market'+owner_id+'_'+attchId[n];
		}
		else{
			path = attach[0].type+owner_id+'_'+attchId[n];
		}
		str += path+',';
	}	
//console.log(time());
//console.log(path);
//console.log(str);	
VK.api('wall.post', {
	'owner_id': '-121807904',
	'message': x[0].text,
//	'publish_date': time(),
	'from_group': '1',
	'attachments': str
})
}
