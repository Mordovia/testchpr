var 	err = j2Ds.getErrorManager(),
		scene = j2Ds.getSceneManager(),
		 m = j2Ds.getMathManager(),
		 tm = j2Ds.getTextureManager(),
		gs = j2Ds.getGameStateManager(),
		res = j2Ds.getResourceManager(),
		lr = j2Ds.getLayerManager(),
		dom = j2Ds.getDOMManager(),
		io = 	j2Ds.getIO();	
		
err.setMode('stopAndShow');

scene.init(600, 600);
scene.setAutoClear(true);
var background = lr.add('background', -1);
background.fill('white');

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

var text_2 = scene.addTextNode(m.v2f(145,75), now.toLocaleString("ru", options) + '', 20, 'black', 0, 1, 'brown');
var text_3 = scene.addTextNode(m.v2f(215,75), tomorrow.toLocaleString("ru", options)+'', 20, 'black', 0, 1, 'brown');
var week = scene.addTextNode(m.v2f(285,75), 'Прогноз на неделю', 20, 'black', 0, 1, 'brown');
//var text_4 = scene.addTextNode(m.v2f(235,75), day3.toLocaleString("ru", options)+'', 20, 'black', 0, 1, 'brown');
//var text_5 = scene.addTextNode(m.v2f(235,75), day4.toLocaleString("ru", options)+'', 20, 'black', 0, 1, 'brown');
//var text_6 = scene.addTextNode(m.v2f(235,75), day5.toLocaleString("ru", options)+'', 20, 'black', 0, 1, 'brown');
//var text_7 = scene.addTextNode(m.v2f(235,75), day6.toLocaleString("ru", options)+'', 20, 'black', 0, 1, 'brown');
//var text_8 = scene.addTextNode(m.v2f(235,75), day7.toLocaleString("ru", options)+'', 20, 'black', 0, 1, 'brown');

var user = {
name : 'none',
avatar : '',
loaded : false
};

var market = {
descript1: 'none',
descript2: 'none',
descript3: 'none',
descript4: 'none',
photo_1: '',
photo_2: '',
photo_3: '',
photo_4: '',
descript5: 'none',
descript6: 'none',
descript7: 'none',
descript8: 'none',
photo_5: '',
photo_6: '',
photo_7: '',
photo_8: '',
descript9: 'none',
descript10: 'none',
descript11: 'none',
descript12: 'none',
descript13: 'none',
photo_9: '',
photo_10: '',
photo_11: '',
photo_12: '',
photo_13: '',
descript14: 'none',
descript15: 'none',
descript16: 'none',
descript17: 'none',
descript18: 'none',
photo_14: '',
photo_15: '',
photo_16: '',
photo_17: '',
photo_18: '',
loaded: false
};

var url = {
loaded: false
};

var group = {
 groupname: 'none',
 loaded : false
},
imageMap = {
avatar : false,
sprite : false
},
text = scene.addTextNode(m.v2f(0,0), '', 14, 'black', 0, 1, 'brown'),
			avatar, groupname, group_avatar, teacup, 
			descript1, descript2, descript3, descript4, descript5, descript6, descript7, descript8, descript9, descript10, descript11, descript12, descript13, descript14, descript15, descript16, descript17, descript18,
			photo_1, photo_2, photo_3, photo_4, photo_5, photo_6, photo_7, photo_8, photo_9, photo_10, photo_11, photo_12, photo_13, photo_14, photo_15, photo_16, photo_17, photo_18,
menuItems = {
tmp : false,
teacup : false,
newGame : scene.addTextNode(m.v2f(220,100), 'Да', 25, 'black', 0, 1, 'brown'),
exit : scene.addTextNode(m.v2f(200,150), 'Выход', 25, 'black', 0, 1, 'brown')
};

reloadButton = {
//tmp: false,
reloadGame : scene.addTextNode(m.v2f(220,300), 'Получить новый прогноз', 25, 'black', 0, 1, 'brown')
};

market_url1 = {
//tmp: false,
url1 : scene.addTextNode(m.v2f(125, 115), 'Утро: ', 25, 'black', 0, 1, 'brown')
};

var initGame = function () {
scene.start('connect', 60);

VK.api('users.get', {"fields" : "photo_50"}, function (data) {
//console.log(data);
user['name'] = data.response[0].first_name; 
user['avatar'] = data.response[0].photo_50;
}),
VK.api('groups.getById', {'group_ids': '121807904', 'fields' : 'photo_100'}, function (data) {
//console.log(data);
	group['groupname'] = data.response[0].name;
//	group['group_avatar'] = data.response[0].photo_100;
	user['loaded'] = true;
	});
};

var loadGame = function () {
scene.start('gameloading', 60);

//VK.api('photos.get', {
//                        'owner_id': '10368288',
//                        'album_id': '234561165'
VK.api('market.get', {
							'owner_id': '-121807904', 
							'album_id': '16',
                    }, function(data) {
console.log(data);                        
var a = data.response.items;
function compareRandom(a, b) {
  return Math.random() - 0.5;
}
a.sort(compareRandom);
//console.log(a[0], a[1], a[2], a[3]);
                       market['descript1'] = a[0].title;
                       market['photo_1'] = a[0].thumb_photo;
                       market['descript2'] = a[1].title;
                       market['photo_2'] = a[1].thumb_photo;
                       market['descript3'] = a[2].title;
                       market['photo_3'] = a[2].thumb_photo;
                       market['descript4'] = a[3].title;
                       market['photo_4'] = a[3].thumb_photo;
                       market['descript5'] = a[4].title;
                       market['photo_5'] = a[4].thumb_photo;
                       market['descript6'] = a[5].title;
                       market['photo_6'] = a[5].thumb_photo;
                       market['descript7'] = a[6].title;
                       market['photo_7'] = a[6].thumb_photo;
                       market['descript8'] = a[7].title;
                       market['photo_8'] = a[7].thumb_photo;
                       market['descript9'] = a[8].title;
                       market['photo_9'] = a[8].thumb_photo;
                       market['descript10'] = a[9].title;
                       market['photo_10'] = a[9].thumb_photo;
                       market['descript11'] = a[10].title;
                       market['photo_11'] = a[10].thumb_photo;
                       market['descript12'] = a[11].title;
                       market['photo_12'] = a[11].thumb_photo;
                       market['descript13'] = a[12].title;
                       market['photo_13'] = a[12].thumb_photo;
                       market['descript14'] = a[13].title;
                       market['photo_14'] = a[13].thumb_photo;
                       market['descript15'] = a[14].title;
                       market['photo_15'] = a[14].thumb_photo;
                       market['descript16'] = a[15].title;
                       market['photo_16'] = a[15].thumb_photo;
                       market['descript17'] = a[16].title;
                       market['photo_17'] = a[16].thumb_photo;
                       market['descript18'] = a[17].title;
                       market['photo_18'] = a[17].thumb_photo;                         
                       
                       url['1'] = 'http://vk.com/market-121807904?w=product-121807904_' + a[0].id + '%2Fquery';
                       url['2'] = 'http://vk.com/market-121807904?w=product-121807904_' + a[1].id + '%2Fquery';
                       url['3'] = 'http://vk.com/market-121807904?w=product-121807904_' + a[2].id + '%2Fquery';
                       url['4'] = 'http://vk.com/market-121807904?w=product-121807904_' + a[3].id + '%2Fquery';
                       url['5'] = 'http://vk.com/market-121807904?w=product-121807904_' + a[4].id + '%2Fquery';
                       url['6'] = 'http://vk.com/market-121807904?w=product-121807904_' + a[5].id + '%2Fquery';
                       url['7'] = 'http://vk.com/market-121807904?w=product-121807904_' + a[6].id + '%2Fquery';
                       url['8'] = 'http://vk.com/market-121807904?w=product-121807904_' + a[7].id + '%2Fquery';
                       url['9'] = 'http://vk.com/market-121807904?w=product-121807904_' + a[8].id + '%2Fquery';
                       url['10'] = 'http://vk.com/market-121807904?w=product-121807904_' + a[9].id + '%2Fquery';
                       url['11'] = 'http://vk.com/market-121807904?w=product-121807904_' + a[10].id + '%2Fquery';
                       url['12'] = 'http://vk.com/market-121807904?w=product-121807904_' + a[11].id + '%2Fquery';
                       url['13'] = 'http://vk.com/market-121807904?w=product-121807904_' + a[12].id + '%2Fquery';
                       url['14'] = 'http://vk.com/market-121807904?w=product-121807904_' + a[13].id + '%2Fquery';
                       url['15'] = 'http://vk.com/market-121807904?w=product-121807904_' + a[14].id + '%2Fquery';
                       url['16'] = 'http://vk.com/market-121807904?w=product-121807904_' + a[15].id + '%2Fquery';
                       url['17'] = 'http://vk.com/market-121807904?w=product-121807904_' + a[16].id + '%2Fquery';
                       url['18'] = 'http://vk.com/market-121807904?w=product-121807904_' + a[17].id + '%2Fquery';                        
 //                      console.log(url['1']);
                       
 //                      http://vk.com/market-121807904?w=product-121807904_238721%2Fquery
                       
                       market['loaded'] = true;
                                        });
};

j2Ds.addEvent('dom:loaded', function () {
VK.init(function() {
    initGame();
  }, 
  function() { 
console.log('error');
}, '5.53');
});