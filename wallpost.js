function wallGet(){
	clearScreen();
		VK.api('wall.get', {
							'owner_id': '-121807904', 
							}, function(data) {
					console.log(data);
		})}
