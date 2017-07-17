var day = [];
for (n=0; n<7; n++){//цикл для дней
day[n] = new Date();
day[n].setDate(day[n].getDate() + n);
};
var options = {
  month: 'short',
  day: 'numeric',
  };
var n=0;
var market = {
['id'+n]: 'none',
['descript'+n]: 'none',
['photo_'+n]: '',
loaded: false
};
var url = {
loaded: false
};  
var img = [];
var imgWeek = [];
var daySelected;//3 - сегодня, 6 - завтра, 2 - неделя
var todayImage;


function onClickCell(event){//функция события
	/*if (typeof event.target.href !== 'undefined'){
		parent.window.location.href = event.target.href;//эвент.таргет - ссылка на конкретный элемент, где клик
	}
	switch (event.target.id) {
		case '01'://завтра
			clearScreen();
			createTable();
			document.getElementById('33').innerHTML = '';
			daySelected = '6';
			clearStyle();
			formatStyle();
			
			for (n=1; n<4; n++){
				var t = n+3;
				document.getElementById(n+'1').innerHTML = '';
				document.getElementById(n+'1').appendChild(img[t]);
				document.getElementById(n+'2').innerHTML =  market['descript'+t];
			}
			joke();
			break;
		case '00'://если возвращаемся на сегодня
			drawTable();
			clearStyle();
			formatStyle();
			break;
		case '02'://на неделю
			clearStyle();
			daySelected = '2';
			document.getElementById('33').innerHTML = '';
			formatStyle();
			for (n=1; n<8; n++){
				document.getElementById(n+'1').innerHTML = '';
				document.getElementById(n+'0').innerHTML = day[n-1].toLocaleString("ru", options);
			}
			document.getElementById('11').appendChild(img[1]);//нужно взять "день" из сегодня
			document.getElementById('12').innerHTML =  market['descript1'];
			document.getElementById('21').appendChild(img[4]);//"день" из завтра
			document.getElementById('22').innerHTML =  market['descript4'];
			document.getElementById('31').appendChild(img[0]);//и просто у меня [0] из массива где 'market.get' не использовался
			document.getElementById('32').innerHTML =  market['descript0'];
			for (n=4; n<8; n++){//остальные задаем через цикл
				var w = n+3;
				document.getElementById(n+'1').appendChild(img[w]);
				document.getElementById(n+'2').innerHTML =  market['descript'+w];
			}
			break;
			       }
	function formatStyle() {
	document.getElementById(event.target.id).style.fontWeight = "bold";
	document.getElementById(event.target.id).style.border = "10px solid #fff";
	document.getElementById(event.target.id).style.opacity = "1";
	}*/
}

function getRandomInt(min,max){
	return Math.floor(min + Math.random() * (max + 1 - min));
}
function marketDrawWeekToday1(){
	marketGet();
	console.log(forecast);
	for (var n=0; n<7; n++){
		market['descript'+n] = forecast[n].title;
		market['photo_'+n] = forecast[n].thumb_photo;
		market['id'+n] = forecast[n].owner_id+'_'+forecast[n].id;
		url[n] = 'http://vk.com/market-121807904?w=product-121807904_' + forecast[n].id + '%2Fquery';
		}
	market['loaded'] = true;
	url['loaded'] = true;
	for (n=0; n<3; n++){
		img[n] = new Image;
		img[n].width = 50;
		img[n].height = 50;
		img[n].src = market['photo_'+n];
		img[n].href = url[n];
		}
	todayImage = new Image;
	todayImage.width = 100;
	todayImage.height = 100;
	todayImage.src = market['photo_0'];
	todayImage.title = market['descript0'];
	todayImage.href = url['0'];
	prognozWeek();
	drawTableWeek();
	drawTableToday();
	var className = document.getElementsByClassName('container');
	for(i = 0; i < className.length; i++){
		document.getElementById(className[i].id).style.height = "450px";
	}
}
function marketGet(){
	var forecast = [];
	VK.api('market.get', {
							'owner_id': '-121807904', 
							'album_id': '16',
                    }, function(data) {
					                   
					forecast = data.response.items;
					function compareRandom(a, b) {
					return Math.random() - 0.5;
					}
		forecast.sort(compareRandom);
		
	}
	      )
	console.log(forecast);
}

var buttonCreation2 = function(){
	var newPrognoz = document.getElementById('newPrognoz');
	var nprg = document.createElement('input')
	nprg.id = 'nprg'
	nprg.type = 'button'
	nprg.value = 'Получить новый прогноз'
	nprg.setAttribute('onclick', 'marketGet();')
	newPrognoz.appendChild(nprg);
	
	var postPrognoz = document.getElementById('postPrognoz');
	var pprg = document.createElement('input')
	pprg.id = 'pprg'
	pprg.type = 'button'
	pprg.value = 'Опубликовать прогноз'
	pprg.setAttribute('onclick', 'postItRandom();')
	postPrognoz.appendChild(pprg);
	backToMainMenu();
};

function prognozWeek(){
	
	for (n=0; n<7; n++){
		imgWeek[n] = new Image;
		imgWeek[n].width = 44;
		imgWeek[n].height = 44;
		imgWeek[n].src = market['photo_'+n];
		imgWeek[n].href = url[n];
	}
		console.log(imgWeek);
}

function drawTableWeek() {//заполняем таблицу для исходного случая "на неделю" - в правый див
	clearScreen();
	createTableWeek();
	document.getElementById("00").style.fontWeight = "bold";
	document.getElementById("00").style.border = "10px solid #fff";
	document.getElementById("00").style.opacity = "1";	
	daySelected = '2';
	document.getElementById('33').innerHTML = '';
	for (n=0; n<7; n++){
		var w = n+1;
		document.getElementById(w+'1').innerHTML = '';
		document.getElementById(w+'0').innerHTML = day[n].toLocaleString("ru", options);
		document.getElementById(w+'1').appendChild(imgWeek[n]);
		document.getElementById(w+'2').innerHTML =  market['descript'+n];
	}
	/*document.getElementById('11').appendChild(imgWeek[1]);//нужно взять "день" из сегодня
	document.getElementById('12').innerHTML =  market['descript1'];
	document.getElementById('21').appendChild(imgWeek[4]);//"день" из завтра
	document.getElementById('22').innerHTML =  market['descript4'];
	document.getElementById('31').appendChild(imgWeek[0]);//и просто у меня [0] из массива где 'market.get' не использовался
	document.getElementById('32').innerHTML =  market['descript0'];
	for (n=4; n<8; n++){//остальные задаем через цикл
		var w = n+3;
		document.getElementById(n+'1').appendChild(imgWeek[w]);
		document.getElementById(n+'2').innerHTML =  market['descript'+w];
	}*/
}

function createTableWeek(){
	var element = document.getElementById('table2');
	var table =  document.createElement('table'); 
	element.addEventListener('click', onClickCell, false);
	/*for (var i=0; i<3; i++){
		var tr = document.createElement('TR');
		for (var j=0;j<1;j++)
		{
			var th = document.createElement('TH'); //создаем th-шку
			th.id = "".concat(i,j);
			tr.appendChild(th);
		}
			table.appendChild(tr);
	}*/
	var caption = document.createElement('caption');
	caption.id = "00";
	table.appendChild(caption);
	for (var i=0; i<9; i++){
		var tr = document.createElement('TR');
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
	document.getElementById("t00").style.fontWeight = "bold";
	document.getElementById("t00").style.border = "10px solid #fff";
	document.getElementById("t00").style.opacity = "1";
	document.getElementById('t10').innerHTML =  todayImage.title;
	document.getElementById('t10').colSpan = 2;
	document.getElementById("t10").style.font= 'bold 16px Antiqua, Arial, sans-serif';
	document.getElementById('t20').appendChild(todayImage);
	document.getElementById('t20').colSpan = 2;
	for (n=0; n<3; n++){
		document.getElementById('t4'+n).appendChild(img[n]);
		document.getElementById('t5'+n).innerHTML =  market['descript'+n];
	}
	daySelected = 3;
	//joke();	
}
function createTableToday(){
	var element = document.getElementById('table');
	var table =  document.createElement('table'); 
	element.addEventListener('click', onClickCell, false);
	/*for (var i=0; i<1; i++){
		var tr = document.createElement('TR');
		for (var j=0;j<3;j++)
		{
			var th = document.createElement('TH'); //создаем th-шку
			th.id = 't'+"".concat(i,j);
			tr.appendChild(th);
		}
			table.appendChild(tr);
	}*/
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
			td.width = "33%"
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	element.appendChild(table);
	document.getElementById('t00').innerHTML = 'Сегодня (' + day[0].toLocaleString("ru", options) + ')';//дата отформатированная с учетом переменной опции
	document.getElementById("t00").style.fontWeight = "bold";
	document.getElementById("t00").style.border = "10px solid #fff";
	//document.getElementById('t01').innerHTML = 'Завтра (' + day[1].toLocaleString("ru", options) + ')';
	//document.getElementById('t02').innerHTML = 'На неделю';
	document.getElementById('t30').innerHTML = 'Утро';
	document.getElementById('t31').innerHTML = 'День';
	document.getElementById('t32').innerHTML = 'Вечер';
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
