module.exports = {
	"tabWidth": 4,
	"useTabs": true,
	"semi": true,
	"singleQuote": true,
	"arrowParens": "always",
	"overrides": [
		{
			"files": "*.hbs",
			"options": {
				"semi": true,
				"singleQuote": false,
				"parser": "glimmer"
			}
		},
		{
			"files": ["*package.json", "*.yml"],
			"options": {
				"tabWidth": 2,
				"useTabs": false,
				"singleQuote": false
			}
		}
	]
};
