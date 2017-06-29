var user = {//описываем переменные
name : 'none',
id : '',
avatar : '',
loaded : false
};
var group = {
 groupname: 'none',
 loaded : false
};

var day = [];
for (n=0; n<7; n++){//цикл для дней
day[n] = new Date();
day[n].setDate(day[n].getDate() + n);
};
//console.log(day[2]);
var options = {
  month: 'short',
  day: 'numeric',
  };
var n=0;
var market = {
['descript'+n]: 'none',
['photo_'+n]: '',
loaded: false
};
var url = {
loaded: false
};  
var img = [];

function getRandomInt(min,max){
	return Math.floor(min + Math.random() * (max + 1 - min));
}

var buttonCreation = function(){
	var buttonYes = document.getElementById('button');
	var btn = document.createElement('input')
	btn.id = 'yes'
	btn.type = 'button'
	btn.value = 'Да'
	btn.setAttribute('onclick', 'marketGet();')
	buttonYes.appendChild(btn);
	var buttonExit = document.getElementById('exit');
	var btn2 = document.createElement('input')
	btn2.id = 'no'
	btn2.type = 'button'
	btn2.value = 'Выход'
	btn2.setAttribute('onclick', 'exit();')
	buttonExit.appendChild(btn2);
	if (user['id']==10368288 || user['id']==5513350){
		document.getElementById('market').innerHTML = '<input value = "Управление группой" type = "button" onclick = "administration();">';
	}
};
var administration = function(){
clearScreen();
	document.getElementById('button').innerHTML = '<input value = "Перенос товаров в подборку" type = "button" onclick = "albumsGet();">';
	document.getElementById('exit').innerHTML = '<input value = "Запись на стену" type = "button" onclick = "wallGet();">';
	backToMainMenu();
	}
var backToMainMenu = function(){
document.getElementById('market').innerHTML = '<input value = "Вернуться в главное меню" type = "button" onclick = "buttonCreation();">';
}
var buttonCreation2 = function(){
	var newPrognoz = document.getElementById('newPrognoz');
	var nprg = document.createElement('input')
	nprg.id = 'nprg'
	nprg.type = 'button'
	nprg.value = 'Получить новый прогноз'
	nprg.setAttribute('onclick', 'marketGet();')
	newPrognoz.appendChild(nprg);
};

var getUserName = function () {//описываем функцию, которая обращается к API
  	VK.api('users.get', {"fields" : "photo_50"}, function (data) {//метод users.get - это тоже функция, которая выводит что-то, обращаясь к АПИ %(
	//console.log(data);
	user['name'] = data.response[0].first_name;//обратились к ВК API - получили ответ, который записали в параметр name переменной user
	user['id'] = data.response[0].id;
	user['avatar'] = data.response[0].photo_50;//обратились к ВК API - получили ответ, который записали в параметр avatar переменной user
	user['loaded'] = true;
 	document.avatar.src = user['avatar'] //определили картинку с именем avatar и ссылкой из ВК Апи, которую потом выводим в HTML по имени
	// document.write ("Привет, " + user['name']);
	}),
 	VK.api('groups.getById', {'group_ids': '121807904', 'fields' : 'photo_50'}, function (data) {
	group['groupname'] = data.response[0].name;
//	group['group_avatar'] = data.response[0].photo_50;
	if (user['name'] !== 'none'){
	document.getElementById('hello').innerHTML='Привет, '+ user['name'] + ', хочешь получить чайный прогноз от ' + group['groupname'] + '?';//ищем в html-коде кусок с тегом "hello", после чего записываем в него текст 
	buttonCreation();
	}
	else getUserName();
	})	
  };

function marketGet(){
	VK.api('market.get', {
							'owner_id': '-121807904', 
							'album_id': '16',
                    }, function(data) {
					//console.log(data);                        
					var a = data.response.items;
					function compareRandom(a, b) {
					return Math.random() - 0.5;
					}
		a.sort(compareRandom);
		//console.log(a[0], a[1], a[2], a[3]);
		for (var n=0; n<11; n++){
                       market['descript'+n] = a[n].title;
                       market['photo_'+n] = a[n].thumb_photo;
                       url[n] = 'http://vk.com/market-121807904?w=product-121807904_' + a[n].id + '%2Fquery';
		}
		console.log(market);
		//console.log(url);
		market['loaded'] = true;
		url['loaded'] = true;
		for (n=0; n<11; n++){
		img[n] = new Image;
		img[n].width = 50;
		img[n].height = 50;
		img[n].src = market['photo_'+n];
		//console.log(img[n].src);
		}
		drawTable();
		})}
function clearScreen(){
	var tagName = document.getElementsByTagName('div');
	for(i = 0; i < tagName.length; i++){
	document.getElementById(tagName[i].id).innerHTML = ''	
	//console.log(tagName[i].id);	
	}
	
}
function drawTable() {//рисуем таблицу
		clearScreen();
		var objTo = document.getElementById('table');
		var element = document.createElement('table');
		element.setAttribute('border', '0');
		element.setAttribute('id', 'tab');
		element.addEventListener('click', onClickCell, false);//ссылка на функцию события. addEventListener - это обработчик события
		for (var i=0; i<8; i++){
			var row = element.insertRow(i);
			for(var j=0; j<4; j++){
				var cell = row.insertCell(j);
				cell.width = "auto";
				cell.height = "auto";
				cell.align = "center";
				cell['id'] = "".concat(i,j);//метод для объединения массивов, теперь id - это текст, c цифрами i и j
			}
		}
		objTo.appendChild(element);
		
		document.getElementById('prognoz').innerHTML = 'Твой чайный прогноз:';
		document.getElementById('01').innerHTML = 'Сегодня (' + day[0].toLocaleString("ru", options) + ')';//дата отформатированная с учетом переменной опции
		document.getElementById('02').innerHTML = 'Завтра (' + day[1].toLocaleString("ru", options) + ')';
		document.getElementById('03').innerHTML = 'На неделю';
		document.getElementById('10').innerHTML = 'Утро';
		document.getElementById('20').innerHTML = 'День';
		document.getElementById('30').innerHTML = 'Вечер';
		for (n=1; n<4; n++){
		document.getElementById(n+'1').appendChild(img[n]);
		document.getElementById(n+'2').innerHTML =  market['descript'+n];
		document.getElementById(n+'2').href = url[n];
		}
		buttonCreation2();
}
 function exit() {//функция выхода - перебрасывает на главную страницу ВК
		    parent.window.location.href = 'http://vk.com/';
}
  var status = false;	       
VK.init(function() { //с этого мы начинаем работу с ВКонтакте API
      status = true; //меняем состояние переменной
      getUserName();//это наша функция, которая обращается к API
//console.log('VK is inited'); 
  }, function() { //если произошла ошибка инициализации
     console.log('error'); 
}, '5.63'); //версия API
