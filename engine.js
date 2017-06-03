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
descript0: 'none',
photo_0: '',
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
  var status = false;	       
VK.init(function() { //с этого мы начинаем работу с ВКонтакте API
      status = true; //меняем состояние переменной
      getUserName();//это наша функция, которая обращается к API
//console.log('VK is inited'); 
  }, function() { //если произошла ошибка инициализации
     console.log('error'); 
}, '5.63'); //версия API
