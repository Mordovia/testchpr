var user = {//описываем переменные
name : 'none',
avatar : '',
loaded : false
};
var group = {
 groupname: 'none',
 loaded : false
};
var now = new Date();
var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
var day3 = new Date();
day3.setDate(day3.getDate() + 2);
var day4 = new Date();
day4.setDate(day4.getDate() + 3);
var day5 = new Date();
day5.setDate(day5.getDate() + 4);
var day6 = new Date();
day6.setDate(day6.getDate() + 5);
var day7 = new Date();
day7.setDate(day7.getDate() + 6);
var options = {
  month: 'short',
  day: 'numeric',
  };
var market = {
['descript'+'i']: 'none',
['photo_'+'i']: '',
loaded: false
};
var url = {
loaded: false
};

var getUserName = function () {//описываем функцию, которая обращается к API
  	VK.api('users.get', {"fields" : "photo_50"}, function (data) {//метод users.get - это тоже функция, которая выводит что-то, обращаясь к АПИ %(
	//console.log(data);
	user['name'] = data.response[0].first_name;//обратились к ВК API - получили ответ, который записали в параметр name переменной user
	user['avatar'] = data.response[0].photo_50;//обратились к ВК API - получили ответ, который записали в параметр avatar переменной user

 	document.avatar.src = user['avatar'] //определили картинку с именем avatar и ссылкой из ВК Апи, которую потом выводим в HTML по имени
	// document.write ("Привет, " + user['name']);
	}),
 	VK.api('groups.getById', {'group_ids': '121807904', 'fields' : 'photo_50'}, function (data) {
	group['groupname'] = data.response[0].name;
//	group['group_avatar'] = data.response[0].photo_50;
	user['loaded'] = true;
	document.getElementById('hello').innerHTML='Привет, '+ user['name'] + ', хочешь получить чайный прогноз от ' + group['groupname'] + '?';//ищем в html-коде кусок с тегом "hello", после чего записываем в него текст 
   	})
  };
  function exit() {//функция выхода - перебрасывает на главную страницу ВК
		    parent.window.location.href = 'http://vk.com/';
}
function drawTable() {//рисуем таблицу
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
		for (var i=0; i<6; i++){
                       market['descript'+i] = a[i].title;
                       market['photo_'+i] = a[i].thumb_photo;
                       url['i'] = 'http://vk.com/market-121807904?w=product-121807904_' + a[i].id + '%2Fquery';
		       
			//console.log(url['i']);
			console.log(market);
			}
                market['loaded'] = true;
		       
					
		var objTo = document.getElementById('table');
		var element = document.createElement('table');
		element.setAttribute('border', '1');
		element.setAttribute('id', 'tab');
		element.addEventListener('click', onClickCell, false);//ссылка на функцию события. addEventListener - это обработчик события
		for (var i=0; i<6; i++){
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
		document.getElementById('button').innerHTML = '';
		document.getElementById('hello').innerHTML = '';
		document.getElementById('prognoz').innerHTML = 'Твой чайный прогноз:';
		document.getElementById('01').innerHTML = 'Сегодня (' + now.toLocaleString("ru", options) + ')';//дата отформатированная с учетом переменной опции
		document.getElementById('02').innerHTML = 'Завтра (' + tomorrow.toLocaleString("ru", options) + ')';
		document.getElementById('03').innerHTML = 'На неделю';
		document.getElementById('10').innerHTML = 'Утро';
		document.getElementById('20').innerHTML = 'День';
		document.getElementById('30').innerHTML = 'Вечер';
		var img = new Image;
		img.width = 100;
		img.height = 100;
		img.src = market['photo_0'];
		document.getElementById('11').appendChild(img);
		document.getElementById('12').innerHTML =  market['descript0'];
})};
  var status = false;	       
VK.init(function() { //с этого мы начинаем работу с ВКонтакте API
      status = true; //меняем состояние переменной
      getUserName();//это наша функция, которая обращается к API
//console.log('VK is inited'); 
  }, function() { //если произошла ошибка инициализации
     console.log('error'); 
}, '5.63'); //версия API
