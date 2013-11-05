var docpadConfig = {
	templateData: {
		site: {
			title: "X40",
			description: "Заказная разработка информационных систем и программного обеспечения",
			keywords: "разработка мобильных приложений, разработка мобильных версий, заказная разработка, разработка на заказ, программное обеспечение, ПО, разработка информационных систем, разработка сайтов"
		},
		getPreparedTitle: function() {
			if (this.document.title) {
				return "" + this.document.title + " | " + this.site.title;
			} else {
				return this.site.title;
			}
		},
		getPreparedDescription: function() {
			return this.document.description || this.site.description;
		},
		getPreparedKeywords: function() {
			return this.site.keywords.concat(this.document.keywords || []).join(', ');
		},
		vers: function(name){
			var crypto = require('crypto');
			var shasum = crypto.createHash('sha1');
			var f = this.getFileAtPath(name);
			shasum.update(f.attributes.source);
			var hash = shasum.digest('hex');
			return name + '?v=' + hash;
		}
	},
	environments: {
		static: {
			plugins: {
				cleanurls: {
					enabled: false
				}
			}
		}
	}
};
module.exports = docpadConfig;