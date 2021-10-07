const Server = require('fake-json-api-server/src/nodeServer');

new Server({
	port: 3000,
	resources: {
		artists: {
			data: [
				{
					id: 1,
					type: 'artist',
					attributes: {
						name: 'Metallica',
					},
				},
				{
					id: 2,
					type: 'artist',
					attributes: {
						name: 'Iron Maiden',
					},
				},
				{
					id: 3,
					type: 'artist',
					attributes: {
						name: 'Dream Theater',
					},
				},
			],
		},
	},
});
