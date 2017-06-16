function wallGet(){
	clearScreen();
		VK.api('wall.get', {
							'owner_id': '-121807904',
							'count': '1',
							'offset': getRandomInt,
							}, function(data) {
					console.log(data);
			var a = data.response.count;
			console.log(a);
			function getRandomInt(0, data.response.count)
								{
									return Math.floor(Math.random() * (data.count + 1));
								}

		})}
