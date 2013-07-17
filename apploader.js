var t;
(function(cloudmap) {
	var global = this;

	this.loadBalancer = function(clause) {
		// stub
		return $.each(
			cloudmap,
			function(i, v) {
				if($.inArray(clause.arms[0], v.arms)) {
					return {server : v.host, app : v.apps[0], protocol : v.protocol};
				}
			}
		);
	},

	this.getServer = function(arm) {
		// stub
		return global.loadBalancer(
			{'arms' : [arm]}
		);
	},

	this.bootstrap = function() {
		this.getArmTargets = function() {
			var arms = new Array();
			
			$.each(
				document.getElementsByTagName('meta'),
				function(i, v) {
					if(v.getAttribute('class') == 'qorpent-request') {
			  			arms = v.getAttribute('arm').split(',');
			  		}
				}
			)

			return arms;
		};

		var servers = new Object();
		var arms = getArmTargets();
		
		$.each(
			arms,
			function(i, v) {
				servers[arms[i]] = global.getServer(arms[i]);
			}
		);

		t = servers;
	};

	this.bootstrap();
})(serversMap);