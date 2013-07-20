var serversMap = [
	{
		'host' : 'localhost',
		'protocol' : 'http',
	    'apps' : [
	    	'minerva'
		],

		'env' : {
			'os' : 'windows',
			'webServer' : 'iis',
			'staticOnly' : false
		},

		'arms' : [
			'mainapp',
			'sys',
			'default',
			'admin',
			'dev'
		]
	}
]