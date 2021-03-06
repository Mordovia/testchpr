var day = [];
for (n=0; n<7; n++){//цикл для дней
day[n] = new Date();
day[n].setDate(day[n].getDate() + n);
};
var options = {
  month: 'short',
  day: 'numeric',
  };
var options2 = {
	weekday: 'long',
	month: 'short',
	day: 'numeric',
};
var n=0;
var market = {
['id'+n]: 'none',
['descript'+n]: 'none',
['photo_'+n]: '',
};
var marketXtra = {
['id'+n]: 'none',
['descript'+n]: 'none',
['photo_'+n]: '',
};
var url=[];  
var img = [];
var imgMorning = [];
var imgWeek = [];
var daySelected;//3 - сегодня, 6 - завтра, 2 - неделя
var todayImage = [];


function marketGet(){
	VK.api('market.get', {
							'owner_id': '-121807904', 
							'album_id': '16',
                    }, function(data) {
					var a = data.response.items;
					function compareRandom(a, b) {
					return Math.random() - 0.5;
					}
		a.sort(compareRandom);
		var b = a.slice();
					function compareRandom(a, b) {
					return Math.random() - 0.5;
					}
		b.sort(compareRandom); 		
	for (var n=0; n<7; n++){
		market['descript'+n] = a[n].title;
		market['photo_'+n] = a[n].thumb_photo;
		market['id'+n] = a[n].owner_id+'_'+a[n].id;
		url[n] = 'http://vk.com/market-121807904?w=product-121807904_' + a[n].id + '%2Fquery';
		}
	for (n=0; n<8; n++){
		imgMorning[n] = new Image;
		imgMorning[n].width = 50;
		imgMorning[n].height = 50;
		imgMorning[n].src = market['photo_'+n];
		imgMorning[n].href = url[n];
		imgMorning[n].addEventListener('click', onClickImg, false);
		}
		for (n=1; n<16; n++){
		marketXtra['descript'+n] = b[n].title;
		marketXtra['photo_'+n] = b[n].thumb_photo;
		marketXtra['id'+n] = b[n].owner_id+'_'+b[n].id;
		url[n] = 'http://vk.com/market-121807904?w=product-121807904_' + b[n].id + '%2Fquery';	
		img[n] = new Image;
		img[n].width = 50;
		img[n].height = 50;
		img[n].src = marketXtra['photo_'+n];
		img[n].href = url[n];
		img[n].addEventListener('click', onClickImg, false);
		}
		for (n=0; n<8; n++){
			todayImage[n] = new Image;
			todayImage[n].width = 100;
			todayImage[n].height = 100;
			todayImage[n].src = market['photo_'+n];
			todayImage[n].title = market['descript'+n];
			todayImage[n].href = url[n];
			todayImage[n].addEventListener('click', onClickImg, false);
		}
	prognozWeek();
	drawTableWeek();
	drawTableToday();
	var className = document.getElementsByClassName('container');
	for(i = 0; i < className.length; i++){
		document.getElementById(className[i].id).style.height = "450px";
	}
	}	       
	      )	
}

var buttonCreation2 = function(){
	var newPrognoz = document.getElementById('newPrognoz');
	newPrognoz.style = 'position: absolute; bottom: 10px; left: 50px'
	var nprg = document.createElement('input')
	nprg.id = 'nprg'
	nprg.type = 'image'
	nprg.src = 'res/refresh-512.png'
	
	nprg.width = '50'
	nprg.height = '50'
	nprg.value = 'Получить новый прогноз'
	nprg.setAttribute('onclick', 'marketGet();')
	newPrognoz.appendChild(nprg);
	
	var postPrognoz = document.getElementById('postPrognoz');
	postPrognoz.style = 'position: absolute; bottom: 10px; right: 50px'
	var pprg = document.createElement('input')
	pprg.id = 'pprg'
	pprg.type = 'image'
	pprg.src = 'res/4p.png'
	
	pprg.width = '50'
	pprg.height = '50'
	pprg.value = 'Опубликовать прогноз'
	pprg.setAttribute('onclick', 'postItOnWall();')
	postPrognoz.appendChild(pprg);
	backToMainMenu();
};

function prognozWeek(){
	
	for (n=0; n<7; n++){
		var o = n+1;
		imgWeek[n] = new Image;
		imgWeek[n].width = 44;
		imgWeek[n].height = 44;
		imgWeek[n].id = o+'img';
		imgWeek[n].src = market['photo_'+n];
		//imgWeek[n].href = url[n];
	}
		//console.log(imgWeek);
}

function drawTableWeek() {//заполняем таблицу для исходного случая "на неделю" - в правый див
	clearScreen();
	createTableWeek();
	document.getElementById("00").style.fontWeight = "bold";
	document.getElementById("00").style.border = "10px solid #fff";
	document.getElementById("00").style.opacity = "1";	
	//daySelected = '2';
	document.getElementById('33').innerHTML = '';
	for (n=0; n<7; n++){
		var w = n+1;
		document.getElementById(w+'1').innerHTML = '';
		document.getElementById(w+'0').innerHTML = day[n].toLocaleString("ru", options);
		document.getElementById(w+'1').appendChild(imgWeek[n]);
		document.getElementById(w+'2').innerHTML =  market['descript'+n];
	}
}

function createTableWeek(){
	var element = document.getElementById('table2');
	var table =  document.createElement('table'); 
	
		var caption = document.createElement('caption');
	caption.id = "00";
	table.appendChild(caption);
	for (var i=1; i<9; i++){
		var tr = document.createElement('TR');
		tr.id = 'tr'+i;
		tr.addEventListener('click', onClickCell, false);
    	for (var j=0;j<4;j++)
		{
			var td = document.createElement('TD'); //создаем td-шку
			td.id = "".concat(i,j);
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	element.appendChild(table);
	
	document.getElementById('prognoz').innerHTML = 'Ваш чайный прогноз:';
	document.getElementById('00').innerHTML = 'Прогноз на неделю';
}

function drawTableToday() {//заполняем таблицу для исходного случая "сегодня"
	//clearScreen();
	createTableToday();
	
	document.getElementById('t10').innerHTML =  todayImage[0].title;
	
	document.getElementById('t20').appendChild(todayImage[0]);
	
	for (n=0; n<1; n++){
		document.getElementById('t4'+n).appendChild(imgMorning[n]);
		document.getElementById('t5'+n).innerHTML =  market['descript'+n];
	}
	for (n=1; n<3; n++){
		var m = n+1;
		document.getElementById('t4'+n).appendChild(img[m]);
		document.getElementById('t5'+n).innerHTML =  marketXtra['descript'+m];
	}		
	//daySelected = 3;
	//joke();	
}
function createTableToday(){
	var element = document.getElementById('table');
	var table =  document.createElement('table'); 
	//element.addEventListener('click', onClickCell, false);
	var caption = document.createElement('caption');
	caption.id = "t00";
	table.appendChild(caption);
	for (var i=1; i<2; i++){
		var tr = document.createElement('TR');
    	for (var j=0;j<2;j++)
		{
			var td = document.createElement('TD'); //создаем td-шку
			td.id = 't'+"".concat(i,j);
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	for (var i=1; i<6; i++){
		var tr = document.createElement('TR');
    	for (var j=0;j<3;j++)
		{
			var td = document.createElement('TD');
			td.id = 't'+"".concat(i,j);
			//td.width = "33%"
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	element.appendChild(table);
	//document.getElementById('t00').innerHTML = 'Сегодня (' + day[0].toLocaleString("ru", options) + ')';//дата отформатированная с учетом переменной опции
	document.getElementById('t00').innerHTML = day[0].toLocaleString("ru", options2);
	var str = document.getElementById('t00').innerHTML;
	var newStr = str[0].toUpperCase() + str.slice(1);//возвращает первый элемент строки в виде заглавной буквы и прибавляет копию массива, начиная со второго символа
	document.getElementById('t00').innerHTML = newStr;
	document.getElementById("t00").style.fontWeight = "bold";
	document.getElementById("t00").style.border = "10px solid #fff";
	document.getElementById('t30').innerHTML = 'Утро';
	document.getElementById('t31').innerHTML = 'День';
	document.getElementById('t32').innerHTML = 'Вечер';
	document.getElementById("t00").style.fontWeight = "bold";
	document.getElementById("t00").style.border = "10px solid #fff";
	document.getElementById("t00").style.opacity = "1";
	document.getElementById('t10').colSpan = 2;
	document.getElementById("t10").style.font= 'bold 16px Antiqua, Arial, sans-serif';
	document.getElementById('t20').colSpan = 2;
	document.getElementById("t50").width= '70';
	document.getElementById("t51").width= '70';
	document.getElementById("t52").width= '70';
	buttonCreation2();
}
function clearStyle() {
	 for (n=0; n<3; n++){
		document.getElementById('t0'+n).style.fontWeight = "";
		document.getElementById('t0'+n).style.border = "";
		document.getElementById('t0'+n).style.opacity = "";
	 }
	 
}

function joke() {
	var albumId = [];
	VK.api('market.getById', {
		'item_ids': market['id'+daySelected],
		'extended': '1',
	}, function(data) {
		var a = data.response.items;
		albumId = a[0].albums_ids;
		for (i=0;i<albumId.length; i++){
		if (albumId[i]=='3'){
		document.getElementById('t33').innerHTML = 'Шутка';
		}
	}
})}
function onClickImg(event){//функция события по клику на картинки в таблице "День"
	parent.window.location.href = event.target.href;
}
function onClickCell(event){//функция события по клику на ячейки в табоице "неделя"
	document.getElementById('table').innerHTML = "";
	document.getElementById('postPrognoz').innerHTML = "";
	document.getElementById('newPrognoz').innerHTML = "";
	createTableToday();	
	var str = event.target.id;
	var n = str.charAt(0);
	var m = n-1;
	var k = n*2;
	var l = k+1;
	document.getElementById('t00').innerHTML = day[m].toLocaleString("ru", options2);
	var str = document.getElementById('t00').innerHTML;
	var newStr = str[0].toUpperCase() + str.slice(1);
	document.getElementById('t00').innerHTML = newStr;
	document.getElementById('t10').innerHTML =  todayImage[m].title;
	document.getElementById('t20').appendChild(todayImage[m]);
	document.getElementById('t40').appendChild(imgMorning[m]);
	document.getElementById('t50').innerHTML =  market['descript'+m];
	document.getElementById('t41').appendChild(img[k]);
	document.getElementById('t51').innerHTML =  marketXtra['descript'+k];
	document.getElementById('t42').appendChild(img[l]);
	document.getElementById('t52').innerHTML =  marketXtra['descript'+l];
}
function postItOnWall(){
	var img;
	html2canvas($('#table'), {
		useCORS: true,
		logging: true,
		//proxy: 'html2canvasproxy.asp',
		onrendered: function(canvas) {
			img = canvas.toDataURL("image/png")
			window.open(img);
			}
	});
	VK.api('photos.getWallUploadServer', {}, function(data) {
		if (data.response) {
			var uploadUrl = data.response.upload_url;
			/*$.post(uploadUrl, // загружаем     - не понимаю отсюда и дальше ничего(((
			       {photo : img, crossDomain: true}, function (request) { // параметры для сохранения
				request.user_id = user['id'];*/
			$.ajax({
				type: 'POST',
				headers: { 'Access-Control-Allow-Origin': 'https://mordovia.github.io' },
				crossDomain: true,
				url: uploadUrl,
				photo : img,
				//data: '{"some":"json"}',
				//dataType: 'json',
				success: function (request) {
					request.user_id = user['id'];
					console.log(request.user_id);
				},
				error: function (request) {
					alert('POST failed.');
					//console.log(request);
				}
			});
				/*VK.Api('photos.saveWallPhoto', { // сохраняем
					request // передаем параметры полученные от post + user_id
				}, function (result) { // данные о сохраненном фото
					VK.Api('wall.post', { // постим на стену
						owner_id : result.owner_id,
						attachments : '<photo><' + result.owner_id + '>_<' + result.id + '>',
						message : 'фото для тебя '
					});
				});*/
			//});
		} 
		else {
			document.write(data.error.error_msg);
		}
})}
