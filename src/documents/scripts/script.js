(function() {
	var opacityes = [
		['#top-nav', 70],
		['#top-nav .navbar-toggle', 80],
		['#top-nav .navbar-toggle:focus', 20],
		['#top-nav li.navbar-text', 80],
		['#side-nav', 75],
		['.page', 80],
		['.page-content i', 72],
		['#off-bg i', 20],
		['.center-menu, .page-box', 70]
		]
	var isIE8; 
	$(function() {
		isIE8 = $('html').hasClass('ie8');
		var collapseHide = function(){
			$('.navbar-collapse.in, #side-padding.in').collapse('hide');
			$('#side-padding').css("height","");
		}
		$('.navbar-collapse').click('li', collapseHide);
		$(window).on('resize', collapseHide);
		$(".page").wrapInner('<div class="col-sm-9 page-content"></div>');
		$(".page").append('<div class="col-sm-3"></div>');
		$(".page-content").each(function(){
			for(var i=0; i<100; i++){
				$(this).append('<div class="sqrIco"></div>');
			}
		});
		navigation();
		opacityFix();
	});
	function opacityFix(){
		if(!Modernizr.opacity){
			var $head = $('head');
			var style = '<style type="text/css">';
			for(var i = 0; i < opacityes.length; i++){
				style += opacityes[i][0] + ' {-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity='+opacityes[i][1]+')";}';
			}
			style += '</style>';
			$head.append($(style));
		}
	}
	function navigation(){
		var duration = 800;
		var topDelta = '90px';
		var leftDelta = '25px';
		var zOff = 900;
		var zStaticImg = 500;
		var zStaticPage = 600;
		var zAnimImg = 700;
		var zAnimPage = 800;
		var isOff = false;
		var isPreOff = false;
		var pageAns = [
			[{left: '-100%', top: 0, "margin-top": topDelta}, {left: 0, "margin-left": leftDelta, top: 0, "margin-top": topDelta}],
			[{left: 0, "margin-left": leftDelta, top: '-100%'}, {left: 0, "margin-left": leftDelta, top: 0, "margin-top": topDelta}],
			[{left: '100%', top: 0, "margin-top": topDelta}, {left: 0, "margin-left": leftDelta, top: 0, "margin-top": topDelta}],
			[{left: 0, "margin-left": leftDelta, top: '100%'}, {left: 0, "margin-left": leftDelta, top: 0, "margin-top": topDelta}]
		];
		var imgAns = [
			[{left: 0, top: '-100%'}, {left: 0, top: 0}],
			[{left: '100%', top: 0}, {left: 0, top: 0}],
			[{left: 0, top: '100%'}, {left: 0, top: 0}],
			[{left: '-100%', top: 0}, {left: 0, top: 0}]
		];
		var pageCursor = 0;
		var imgCursor = 0;
		var lastBackgrounds = {};
		var BV = null;
		var clickHash = null;
		var sideNavBgColor = $("#side-nav").css("background-color");
		var BytesPerSec = function bytesPerSecSet(){
			var me = this;
			this.q = [];
			var bytesPerSecC = $.cookie('bytesPerSec');
			this.bytesPerSec = bytesPerSecC ? bytesPerSecC : null;
			if(this.bytesPerSec === null){
				$(window).load(function() {
					var unic = Math.random();
					var imgAddr0 = "/images/bandwidth0.jpg" + "?n=" + unic;
					var imgAddr1 = "/images/bandwidth1.jpg" + "?n=" + unic;
					var imgBytes1 = 16614;
					var imgAddr2 = "/images/bandwidth2.jpg" + "?n=" + unic;
					var imgBytes2 = 73214;
					var startTime1, endTime1, startTime2, endTime2;
					var img0 = new Image();
					var img1 = new Image();
					var img2 = new Image();
					img0.onload = function () {
						img1.onload = function () {
							endTime1 = (new Date()).getTime();
							var sec1 = (endTime1 - startTime1) / 1000;
							var bytesPerSec1 = imgBytes1 / sec1;
							img2.onload = function () {
								endTime2 = (new Date()).getTime();
								var sec2 = (endTime2 - startTime2) / 1000;
								var bytesPerSec2 = imgBytes2 / sec2;
								var dsec = (sec2 - sec1);
								if(dsec > 0){
									me.bytesPerSec = (imgBytes2 - imgBytes1) / dsec;
								} else if (sec2 !== 0){
									me.bytesPerSec = imgBytes2 / sec2;
								} else if (sec1 !== 0) {
									me.bytesPerSec = imgBytes1 / sec1;
								} else {
									me.bytesPerSec = imgBytes2 / 0.001;
								}
								$.cookie('bytesPerSec', me.bytesPerSec);
								//console.log("Bandwidth: " + Math.round(me.bytesPerSec/1024) + " KB/sec");
								me.runQ();	
							};
							startTime2 = (new Date()).getTime();
							img2.src = imgAddr2;
						};
						startTime1 = (new Date()).getTime();
						img1.src = imgAddr1;
					};
					//console.log("Bandwidth test...");
					img0.src = imgAddr0;
				});
			}
			this.get = function(func){
				this.q.push(func);
				this.runQ();
			};
			this.runQ = function(){
				if(this.bytesPerSec !== null){
					for (var i = 0; i < this.q.length; i++) {
						this.q[i](this.bytesPerSec);
					}
					this.q = [];
				}
			};
		};
		var bytesPS = new BytesPerSec();
		if (!$.support.transition) {
			$.fn.transition = $.fn.animate;
		}
		$("a").each(function() {if(this.hash) this.hash = this.hash.replace('#','#!');});
		nav(location);
		$("a").click(function(e) {
			if(this.search === '?off=1'){
				if(!isOff){
					switchOff();
				}
				e.preventDefault();
			}else if(this.search == '?on=1'){
				if(isOff){
					switchOn();
				}
				e.preventDefault();
			} else if (isPreOff) {
				e.preventDefault();
			} else {
				if(isOff) switchOn();
				var locationBH = location.hash ? location.href.replace(location.hash, '') : location.href.replace(/#$/,'');
				var thisBH = this.hash ? this.href.replace(this.hash, '') : this.href.replace(/#$/,'');
				if(this.hash && thisBH == locationBH){
					nav(this);
					clickHash = this.hash;
					location.hash = this.hash;
					e.preventDefault();
				} else if(thisBH == locationBH){
					nav(this);
					clickHash = '';
					location.hash = '';
					e.preventDefault();
				}
			}
			function switchOff(){
				isPreOff = true;
				$("#on").addClass("inactive");
				$("#off").css({display: "none"});
				$("#on").css({display: "block"});
				$('body').append('<div id="off-bg" style="z-index:'+zOff+';"><i class="fa fa-smile-o fa-lg"></i></div>');
				if(Modernizr.opacity){
					$("#off-bg").css({opacity: 0});
					$("#side-nav").transition({opacity: 0.3}, 200);
					$("#off-bg").transition({opacity: 1}, 300, function(){
						$("#off-bg").css("background-image","url(/images/fuzz.gif)");
						isOff = true;
						isPreOff = false;
						$("#on").removeClass("inactive");
					});
				}else{
					$("#off-bg").css("background-image","url(/images/fuzz.gif)");
					isOff = true;
					isPreOff = false;
					$("#on").removeClass("inactive");
				}
				clickHash = location.hash;
			}
			function switchOn(){
				$("#off").addClass("inactive");
				$("#off").css({display: "block"});
				$("#on").css({display: "none"});
				if(Modernizr.opacity){
					$("#side-nav").transition({opacity: 1}, duration/2);
					$("#off-bg").css("background-image","none")
						.transition({opacity: 0}, duration, function(){
							$("#off-bg").remove();
							isOff = false;
							$("#off").removeClass("inactive");
						});
				}else{
					$("#off-bg").remove();
					isOff = false;
					$("#off").removeClass("inactive");
				}
			}
		});
		$(window).on('hashchange', function(e) {
			var h = location.hash == "#" ? "" : location.hash;
			if(h !== clickHash){
				nav(location);
			}
		});
		$(window).on('resize', function(){
			$(".static-img").each(function(){
				$img = $(this);
				adjustImageCss($img, {top: 0, left: 0}, function(css){$img.css(css);});
			});
		});
		function pageAnim(){
			pageCursor = pageCursor == pageAns.length-1 ? 0 : pageCursor + 1;
			return pageAns[pageCursor];
		}
		function imgAnim(){
			imgCursor = imgCursor == imgAns.length-1 ? 0 : imgCursor + 1;
			return imgAns[imgCursor];
		}
		function bgImage(hash) {
			var dataBGs = $($(hash).attr('data-bg'));
			var i = (typeof lastBackgrounds[hash] !== "undefined") && lastBackgrounds[hash] < dataBGs.length - 1 ? lastBackgrounds[hash] + 1 : 0;
			var bg = $(".static-img");
			if(bg.length >0 && bg[0].src === dataBGs[i].src){
				i = i < dataBGs.length - 1 ? i+1 : 0;
			}
			lastBackgrounds[hash] = i;
			return $(dataBGs[i]);
		}
		function bgVideoUrl($img, func){
			var bandwReservRatio = 1.3;
			var dvStr = $img.attr('data-video');
			if(!dvStr){
				func($img.attr('src').replace(/.jpg$/,".mp4")); 
			}else{
				var dv = eval('('+dvStr+')');
				bytesPS.get(function(byPS){
					var minUrl = null;
					var maxGoodUrl = null;
					for(var i=0; i<dv.urls.length; i++){
						if(minUrl === null || dv.urls[i].bytes < minUrl.bytes){
							minUrl = dv.urls[i];
						}	
						var downloadSec = bandwReservRatio * dv.urls[i].bytes / byPS;
						if( downloadSec < dv.sec && (maxGoodUrl === null || dv.urls[i].bytes > maxGoodUrl.bytes) ){
							maxGoodUrl = dv.urls[i];
						}
					}
					func( maxGoodUrl === null ? minUrl.url : maxGoodUrl.url );
				});
			}
		}
		function nav(locationOrA){
			$("a").each(function() {
				$(this).parents('li').removeClass("active");
				$(this).removeClass("active");
				if(this.href == locationOrA.href || (this.href + '#') == locationOrA.href){
					$(this).parents('li').addClass("active");
					$(this).addClass("active");
				}
			});
			var hash = locationOrA.hash;
			if(!hash || hash == '#'){
				hash = '#index';
			}else{
				hash = hash.replace('#!','#');
			}
			$hash = $(hash);
			if($hash.length < 1) return;
			var $img = bgImage(hash);
			if($(".static-img").length > 0){
				$("nav").css({"background-image": "url(/images/fuzz.gif)"});
			}
			if( $img.css('visibility') == 'visible' ){
				showPage();
			} else {
				var imgAn = imgAnim();
				var imgStartCss = imgAn[0];
				if($.support.transition) imgStartCss.opacity = 0;
				adjustImageCss($img, imgStartCss, function(){
					$img.css(imgStartCss);
					var imgEndCss = imgAn[1];
					if($.support.transition) imgEndCss.opacity = 1;
					adjustImageCss($img, imgEndCss, function(){
						takeLayer($img, "anim-img");
						$img.transition(imgEndCss, duration, function(){
							adjustImageCss($img, imgEndCss, function(){$img.css(imgEndCss);});
							$("body").css("background-image","none"); // animated gif consume CPU
							if (!Modernizr.touch) {
								if (BV === null) {
									BV = new $.BigVideo();
									BV.init();
								}
								bgVideoUrl($img, function(videoUrl){
									BV.show(videoUrl,{ambient:true});
									BV.getPlayer().on('playing', function() {
										$(".static-img").css({visibility: 'hidden'});
									});
								});
							}
							cleanLayer("static-page");
							takeLayer($img, "static-img");
							showPage();
						});
					});
				});
			}
			function showPage(){
				var pageAn = pageAnim();
				var startCss = pageAn[0];
				if($.support.transition) startCss.opacity = 0;
				$hash.css(startCss);
				takeLayer($hash, "anim-page");
				var $ie8style;
				if(isIE8){
					var $head = $('head');
					$ie8style = $('<style type="text/css">.page :before,.page :after{content:none !important}</style>');
					$head.append($ie8style);
				}
				var endCss = pageAn[1];
				if($.support.transition) endCss.opacity = 1;
				$hash.transition(endCss, duration, function(){
					takeLayer($hash, "static-page");
					if($("nav").css("background-image")!=="none"){
						$("nav").css({"background-image": "none"});
						if(Modernizr.opacity){
							$("#side-nav").css({"background-color": "rgba(51, 51, 51,1)"});
							$("#side-nav").transition({"background-color": sideNavBgColor}, 1000);
						}
					}
					if(isIE8){
						$ie8style.remove();
					}
				});
			}
		}
		function cleanLayer(clss){
			$("."+clss).each(function(){
				var $this = $(this);
				$this.css({visibility: 'hidden'});
				$this.removeClass(clss);
			});
		}
		function toLayer($q, clss){
			$q.css({
				visibility: 'visible'
			});
			$q.removeClass("static-page static-img anim-page anim-img");
			$q.addClass(clss);
		}
		function takeLayer($q, clss){
			cleanLayer(clss);
			toLayer($q, clss);
		}
		function adjustImageCss($img, css, func){
			var img = new Image();
			img.onload = function(){
				var windowW = $(window).width();
				var windowH = $(window).height();
				var imgW = img.width;
				var imgH = img.height;
				var windowRatio = windowW / windowH;
				var imgRatio = imgW / imgH;
				var newImgW, newImgH;
				if(windowRatio > imgRatio){
					newImgW = windowW;
					newImgH = newImgW / imgRatio;
				}else{
					newImgH = windowH;
					newImgW = imgRatio * newImgH;
				}
				css.width = Math.round(newImgW);
				css.height = Math.round(newImgH);
				if(parseInt(css.top) === 0){
					css["margin-top"] = Math.round((windowH - newImgH) / 2) + "px";
				}else if(css.top == '-100%'){
					css["margin-top"] = Math.round(windowH - newImgH) + "px";
				} else{
					css["margin-top"] = 0;
				}
				if(parseInt(css.left) === 0){
					css["margin-left"] = Math.round((windowW - newImgW) / 2) + "px";
				}else if(css.left == '-100%'){
					css["margin-left"] = Math.round(windowW - newImgW) + "px";
				} else{
					css["margin-left"] = 0;
				}
				func(css);
			};
			img.src = $img.attr('src');
		}
	}
}).call(this);