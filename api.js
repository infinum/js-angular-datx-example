const Server = require('fake-json-api-server/src/nodeServer');

new Server({
	port: 3000,
	resources: {
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
