var assets = {};
var docpadConfig = {
	templateData: {
		texts: {
			en: {
				langName: 'English',
				title: "X40",
				description: "Web Development Outsourcing",
				keywords: "web development, mobile development, outsourcing",
				toggleNav: "Toggle navigation",
				menu: "Menu",
				home: "Home",
				projects: "Projects",
				contacts: "Contacts",
				on: "On",
				off: "Off",
				interactiveSites: "Interactive Websites",
				mobileApps: "Mobile Applications",
				scalableSystems: "High Load Systems",
				mobileSites: "Mobile Websites",
				responsiveSites: "Responsive Websites",
				socApps: "Social Applications",
				contactInfo: ""
			},
			ru: {
				langName: 'Русский',
				title: "X40",
				description: "Заказная разработка Интернет систем и мобильных приложений",
				keywords: "разработка мобильных приложений, разработка мобильных версий, заказная разработка, разработка на заказ, программное обеспечение, ПО, разработка информационных систем, разработка сайтов",
				toggleNav: "Переключить навигацию",
				menu: "Меню",
				home: "Главная",
				projects: "Проекты",
				contacts: "Контакты",
				on: "Вкл.",
				off: "Выкл.",
				interactiveSites: "Интерактивные сайты",
				mobileApps: "Мобильные приложения",
				scalableSystems: "Высоконагруженные системы",
				mobileSites: "Мобильные версии сайтов",
				responsiveSites: "Адаптивные сайты",
				socApps: "Социальные приложения",
				contactInfo: '<li class="navbar-text phone">+7 (499) 193-32-90</li>'
			}
		},
		txt: function(text) { return this.texts[this.document.lang][text]; },
		site: {
			title: "X40",
			description: "Заказная разработка информационных систем и программного обеспечения",
			keywords: "разработка мобильных приложений, разработка мобильных версий, заказная разработка, разработка на заказ, программное обеспечение, ПО, разработка информационных систем, разработка сайтов"
		},
		getPreparedTitle: function() {
			if (this.document.title) {
				return this.document.title + " | " + this.txt('title');
			} else {
				return this.txt('title');
			}
		},
		getPreparedDescription: function() {
			return this.document.description || this.txt('description');
		},
		getPreparedKeywords: function() {
			return this.document.keywords || this.txt('keywords');
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
		generateAfter: function(){assets = {}},
		render: function(opts){
			if(opts.inExtension == "eco" || opts.outExtension == "html"){
				opts.content = opts.content.replace(/^\s+|\s+$/gm, "");
				opts.content = opts.content.replace(/\n</g, "<");
				opts.content = opts.content.replace(/>\n/g, ">");
				opts.content = opts.content.replace(/\n/g, " ");
				//opts.content = opts.content.replace(/<!--[\s\S]*?-->/g, "");
			}
		}
	},
	environments: {
		static: {
			plugins: {
				cleanurls: {
					enabled: false
				}
			}
		},
		development: {
			plugins: {
				uglify: {
					all: false
				}
			}
		}
	}
};
module.exports = docpadConfig;