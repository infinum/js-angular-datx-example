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
			],
		},
		book: {
			data: [
				{
					type: 'book',
					id: 1,
					attributes: {
						title: 'A whole new world',
					},
				},
			],
		},
	},
});
