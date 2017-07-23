/*в этом файле описываю инициализацию ВК, основное меню, кнопочки и все такое*/

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

function clearScreen(){
	//var tagName = document.getElementsByTagName('div');
	var className = document.getElementsByClassName('main');
	//alert(tagName.length);
	for(i = 0; i < className.length; i++){
	document.getElementById(className[i].id).innerHTML = '';
	}
	var className2 = document.getElementsByClassName('container');
		for(i = 0; i < className2.length; i++){
			document.getElementById(className2[i].id).style.height = "";
			document.getElementById(className2[i].id).style.width = "45%";
		}
	document.getElementById('postPrognoz').style = '';
	document.getElementById('newPrognoz').style = '';
}
	
var buttonCreation = function(){
	var buttonYes = document.getElementById('postPrognoz');
	var btn = document.createElement('input')
	btn.id = 'yes'
	btn.type = 'button'
	btn.value = 'Да'
	btn.setAttribute('onclick', 'marketGet();')
	buttonYes.appendChild(btn);
	var buttonExit = document.getElementById('newPrognoz');
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
	document.getElementById('market2').innerHTML = '<input value = "Вернуться в главное меню" type = "button" onclick = "getUserName();">';
	document.getElementById('market2').style = 'margin-top: 15px';
}

var getUserName = function () {//описываем функцию, которая обращается к API
	clearScreen();
	//VK.callMethod("showSettingsBox", 4);
	function login(callback){                   
	        function authInfo(response){    
	             if(response.session){ // Авторизация успешна
	               vk.data.user = response.session.user;
	               callback(vk.data.user);                           
	             }else {
	               alert("Авторизоваться не удалось!");
	             }    
	        }                      
		VK.Auth.login(authInfo, vk.appPermissions);
	};
  	VK.api('users.get', {"fields" : "photo_50"}, function (data) {//метод users.get - это тоже функция, которая выводит что-то, обращаясь к АПИ %(
	user['name'] = data.response[0].first_name;//обратились к ВК API - получили ответ, который записали в параметр name переменной user
	user['id'] = data.response[0].id;
	user['avatar'] = data.response[0].photo_50;//обратились к ВК API - получили ответ, который записали в параметр avatar переменной user
	user['loaded'] = true;
 	document.avatar.src = user['avatar'] //определили картинку с именем avatar и ссылкой из ВК Апи, которую потом выводим в HTML по имени
	}),
 	VK.api('groups.getById', {'group_ids': '121807904', 'fields' : 'photo_50'}, function (data) {
	group['groupname'] = data.response[0].name;
//	group['group_avatar'] = data.response[0].photo_50;
	if (user['name'] !== 'none'){
	document.getElementById('table').innerHTML='Привет, '+ user['name'] + ', хочешь получить чайный прогноз от ' + group['groupname'] + '?';//ищем в html-коде кусок с тегом "hello", после чего записываем в него текст 
	buttonCreation();
	document.getElementById('container1').style.width = "94%";
	document.getElementById('container1').style.height = "565px";
	document.getElementById('container2').style.width = "0";
		var img = new Image;
		img.src = 'image006.png';
		document.getElementById('wiseMan').appendChild(img);
	}
	else getUserName();
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
}, '5.67'); //версия API
