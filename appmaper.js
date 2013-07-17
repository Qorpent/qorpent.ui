var t;

(function(cloudmap) {
	var global = this;

	this.loadBalancer = {
		getByArm : function(arm) {
			return {"host" : "localhost", "app" : "minerva", "protocol" : "http", "arm" : arm};
		}
	},

	this.loadCommands = function(map, callback) {
		var cloudCommands = {
			commands : new Object(),
			total : 0
		};

		$.each(
			map,
			function(key, value) {
				$.ajax(
					{
						url : "_sys/myactions.json.qweb?usage=ui",
						dataType : 'json',
						xhrFields: {
							withCredentials : true
						},
	                    crossDomain : true
					}
				).done(
					function(json) {
						cloudCommands.commands[key] = new Object();
						cloudCommands.commands[key].commands = json;
						cloudCommands.commands[key].server = value;
						cloudCommands.total++;

						if(cloudCommands.total == Object.keys(map).length) {
							callback(cloudCommands.commands);
						}
					}
				)
			}
		);
	},

	this.bootstrap = function() {
		this.getArmTargets = function() {
			var arms = new Array();
			
			$("meta").each(
				function() {
					if(this.getAttribute('class') == 'qorpent-request') {
						arms = this.getAttribute('arm').split(',');
					}
				}
			);

			return arms;
		},

		this.getWorkMap = function(arms) {
			var map = new Object();

			$.each(
				arms,
				function(i, v) {
					map[v] = global.loadBalancer.getByArm(v);
				}
			);

			return map;
		};

		var webAppArms = this.getArmTargets();
		var webAppMap = this.getWorkMap(webAppArms);
		
		global.loadCommands(
			webAppMap,
			function(list) {
				var result = new Object();

				$.each(
					list,
					function(k, v) {
						result = v['commands'];

						$.each(
							result,
							function(o, p) {
								$.each(
									p,
									function(h, g) {
										g['server'] = v['server']
									}
								)
							}
						)
							}
						);


			
				window.commands = result;
			}
		);
	};

	this.bootstrap();
})(serversMap);