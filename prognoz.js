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
var daySelected;//3 - сегодня, 6 - завтра, 2 - неделя



function onClickCell(event){//функция события
	if (typeof event.target.href !== 'undefined'){
		parent.window.location.href = event.target.href;//эвент.таргет - ссылка на конкретный элемент, где клик
	}
	switch (event.target.id) {
		case '01'://завтра
			clearScreen();
			createTable();
			document.getElementById('33').innerHTML = '';
			daySelected = '6';
			clearStyle();
			formatStyle()
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
			formatStyle()
			break;
		case '02'://на неделю
			clearStyle();
			daySelected = '2';
			document.getElementById('33').innerHTML = '';
			formatStyle()
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
}

function getRandomInt(min,max){
	return Math.floor(min + Math.random() * (max + 1 - min));
}

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
		for (var n=0; n<11; n++){
                       	market['descript'+n] = a[n].title;
                       	market['photo_'+n] = a[n].thumb_photo;
			market['id'+n] = a[n].owner_id+'_'+a[n].id;
			//console.log(market['id'+n]);
                       	url[n] = 'http://vk.com/market-121807904?w=product-121807904_' + a[n].id + '%2Fquery';
		}
		market['loaded'] = true;
		url['loaded'] = true;
		for (n=0; n<11; n++){
		img[n] = new Image;
		img[n].width = 50;
		img[n].height = 50;
		img[n].src = market['photo_'+n];
		img[n].href = url[n];
		}
		drawTable();
		})}

function createTable(){
	var element = document.getElementById('table');
	var table =  document.createElement('table'); 
	element.addEventListener('click', onClickCell, false);
	for (var i=0; i<1; i++){
		var tr = document.createElement('TR');
		for (var j=0;j<3;j++)
		{
			var th = document.createElement('TH'); //создаем th-шку
			th.id = "".concat(i,j);
			tr.appendChild(th);
		}
			table.appendChild(tr);
	}
	for (var i=1; i<8; i++){
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
	
	document.getElementById('prognoz').innerHTML = 'Твой чайный прогноз:';
	document.getElementById('00').innerHTML = 'Сегодня (' + day[0].toLocaleString("ru", options) + ')';//дата отформатированная с учетом переменной опции
	document.getElementById("00").style.fontWeight = "bold";
	document.getElementById("00").style.border = "10px solid #fff";
	document.getElementById('01').innerHTML = 'Завтра (' + day[1].toLocaleString("ru", options) + ')';
	document.getElementById('02').innerHTML = 'На неделю';
	document.getElementById('10').innerHTML = 'Утро';
	document.getElementById('20').innerHTML = 'День';
	document.getElementById('30').innerHTML = 'Вечер';
	buttonCreation2();
}

function drawTable() {//заполняем таблицу для исходного случая "сегодня"
	clearScreen();
	createTable();
	document.getElementById("00").style.fontWeight = "bold";
	document.getElementById("00").style.border = "10px solid #fff";
	document.getElementById("00").style.opacity = "1";
	for (n=1; n<4; n++){
		document.getElementById(n+'1').appendChild(img[n]);
		document.getElementById(n+'2').innerHTML =  market['descript'+n];
	}
	daySelected = 3;
	joke();	
}

function clearStyle() {
	 for (n=0; n<3; n++){
		document.getElementById('0'+n).style.fontWeight = "";
		document.getElementById('0'+n).style.border = "";
		document.getElementById('0'+n).style.opacity = "";
	 }
	 
}
function formatStyle() {
	document.getElementById(event.target.id).style.fontWeight = "bold";
	document.getElementById(event.target.id).style.border = "10px solid #fff";
	document.getElementById(event.target.id).style.opacity = "1";
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
		document.getElementById('33').innerHTML = 'Шутка';
		}
	}
})}
