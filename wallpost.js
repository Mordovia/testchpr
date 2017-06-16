function wallGet(){
	clearScreen();
		VK.api('wall.get', {
							'owner_id': '-121807904',
							'count': '1',
							'offset': getRandomInt,
							}, function(data) {
					console.log(data);
			var a = 0;
			var b = data.response.count;
			console.log(a);
			function getRandomInt(a,b)
								{
									return Math.floor(Math.random() * (b + 1));
								}

		})}
