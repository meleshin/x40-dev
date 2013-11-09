var assets = {};
var docpadConfig = {
	templateData: {
		site: {
			title: "X40",
			description: "Заказная разработка информационных систем и программного обеспечения",
			keywords: "разработка мобильных приложений, разработка мобильных версий, заказная разработка, разработка на заказ, программное обеспечение, ПО, разработка информационных систем, разработка сайтов"
		},
		getPreparedTitle: function() {
			if (this.document.title) {
				return this.document.title + " | " + this.site.title;
			} else {
				return this.site.title;
			}
		},
		getPreparedDescription: function() {
			return this.document.description || this.site.description;
		},
		getPreparedKeywords: function() {
			return this.document.keywords || this.site.keywords;
		},
		getHead:  function() {
			return this.document.head || '';
		},
		getBottom:  function() {
			return this.document.bottom || '';
		}
	},
	events: {
		renderBefore: function(opts){
			var me = this;
			opts.templateData.asset = function(name){
				if (assets[srcPath]) return assets[srcPath].name;
				var crypto = require('crypto');
				var path = require('path')
				var shasum = crypto.createHash('sha1');
				var f = this.getFileAtPath(name);
				shasum.update(f.attributes.source);
				var hash = shasum.digest('hex');
				var srcPath = f.attributes.fullPath;
				var relativeOutDirPath = f.attributes.relativeOutDirPath;
				var outBasename = hash;
				var relativeOutBase = relativeOutDirPath + path.sep + outBasename;
				var outFilename = outBasename + "." + f.attributes.outExtension;
				var relativeOutPath = relativeOutBase + "." + f.attributes.outExtension;
				var outDirPath = me.docpad.config.outPath + path.sep + relativeOutDirPath;
				var outPath = outDirPath + path.sep + outFilename;
				var nameStart = name.lastIndexOf("/") + 1;
				var extStart = name.lastIndexOf(".");
				var newName = name.substring(0, nameStart) + hash + (extStart >= nameStart ?  name.substring(extStart) : '');
				assets[srcPath] = {
					relativeOutDirPath: relativeOutDirPath,
					outBasename: outBasename,
					relativeOutBase: relativeOutBase,
					outFilename: outFilename,
					relativeOutPath: relativeOutPath,
					outDirPath: outDirPath,
					outPath: outPath,
					name: newName
                };
				return assets[srcPath].name;
			};
		},
		writeBefore: function(opts){
			opts.collection.forEach(function(document){
				srcPath = document.attributes.fullPath;
				if (assets[srcPath]){
					document.attributes.relativeOutDirPath = assets[srcPath].relativeOutDirPath
                    document.attributes.outBasename = assets[srcPath].outBasename
                    document.attributes.relativeOutBase = assets[srcPath].relativeOutBase
                    document.attributes.outFilename = assets[srcPath].outFilename
                    document.attributes.relativeOutPath = assets[srcPath].relativeOutPath
                    document.attributes.outDirPath = assets[srcPath].outDirPath
                    document.attributes.outPath = assets[srcPath].outPath
				}
			});
		},
		generateAfter: function(){assets = {}}
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