(function() {
	$(function() {
		$('.navbar-collapse').click('li', function() {
			$('.navbar-collapse.in, #side-padding.in').collapse('hide').css("height","");
		});
		$( ".page" ).wrapInner('<div class="col-sm-9 page-content"></div>');
		$( ".page" ).append('<div class="col-sm-3"></div>');
		navigation();
	});
	function navigation(){
		var duration = 1000;
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
			[{left: '-100%', top: topDelta}, {left: leftDelta, top: topDelta}],
			[{left: leftDelta, top: '-100%'}, {left: leftDelta, top: topDelta}],
			[{left: '100%', top: topDelta}, {left: leftDelta, top: topDelta}],
			[{left: leftDelta, top: '100%'}, {left: leftDelta, top: topDelta}]
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
								console.log("Bandwidth: " + Math.round(me.bytesPerSec/1024) + " KB/sec");
								me.runQ();	
							};
							startTime2 = (new Date()).getTime();
							img2.src = imgAddr2;
						};
						startTime1 = (new Date()).getTime();
						img1.src = imgAddr1;
					};
					console.log("Bandwidth test...");
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
		if (!$.support.transition) {$.fn.transition = $.fn.animate;}
		$("a").each(function() {if(this.hash) this.hash = this.hash.replace('#','#!');});
		nav(location.hash);
		$("nav a").click(function(e) {
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
					nav(this.hash);
					clickHash = this.hash;
					location.hash = this.hash;
					e.preventDefault();
				} else if(thisBH == locationBH){
					nav(this.hash);
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
				$('body').append('<div id="off-bg" style="z-index:'+zOff+';position:absolute;top:0;left:0;width:100%;height:100%;background-color:#222;"></div>');
				if(Modernizr.opacity){
					$("#off-bg").css({opacity: 0});
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
				nav(location.hash);
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
		function nav(hash){
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
				adjustImageCss($img, imgStartCss, function(){
					$img.css(imgStartCss);
					var imgEndCss = imgAn[1];
					adjustImageCss($img, imgEndCss, function(){
						takeLayer($img, "anim-img");
						$img.transition(imgEndCss, duration, function(){
							adjustImageCss($img, imgEndCss, function(){$img.css(imgEndCss);});
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
				$hash.css(pageAn[0]);
				takeLayer($hash, "anim-page"); 
				$hash.transition(pageAn[1], duration, function(){
					takeLayer($hash, "static-page");
					if($("nav").css("background-image")!=="none"){
						$("nav").css({"background-image": "none"});
						$("#side-nav").css({"background-color": "#333"});
						$("#side-nav").transition({"background-color": "rgba( 0, 0, 196, .8)"}, 1000);
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