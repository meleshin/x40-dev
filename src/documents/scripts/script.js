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
		var zStaticImg = 500;
		var zStaticPage = 600;
		var zAnimImg = 700;
		var zAnimPage = 800;
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
		var clickHash;
		if (!$.support.transition) {$.fn.transition = $.fn.animate;}
		$("a").each(function() {if(this.hash) this.hash = this.hash.replace('#','#!')});
		nav(location.hash);
		$("nav a").click(function(e) {
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
		});
		$(window).on('hashchange', function(e) {
			if(location.hash !== clickHash){
				nav(location.hash);
			}
		});
		$(window).on('resize', function(){
			$(".static-img").each(function(){
				img = this;
				adjustImageCss(img, {top: 0, left: 0}, function(css){$(img).css(css);});
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
			var i = typeof lastBackgrounds[hash] !== "undefined" && lastBackgrounds[hash] < dataBGs.length - 1 ? lastBackgrounds[hash] + 1 : 0;
			var bg = $(".static-img");
			if(bg.length >0 && bg[0].src === dataBGs[i].src){
				i = i < dataBGs.length - 1 ? i+1 : 0;
			}
			lastBackgrounds[hash] = i;
			return dataBGs[i];
		}
		function bgVideoUrl(img){
			return $(img).attr('src').replace(/.jpg$/,".mp4");
		}
		function nav(hash){
			if(!hash || hash == '#'){
				hash = '#index';
			}else{
				hash = hash.replace('#!','#')
			}
			var img = bgImage(hash);
			function showPage(){
				var pageAn = pageAnim();
				$(hash).css(pageAn[0]);
				takeLayer(hash, "anim-page"); 
				$(hash).transition(pageAn[1], duration, function(){
					takeLayer(hash, "static-page");
				});
			}
			if( $(img).css('visibility') == 'visible' ){
				showPage();
			} else {
				var imgAn = imgAnim();
				var imgStartCss = imgAn[0];
				adjustImageCss(img, imgStartCss, function(){
					$(img).css(imgStartCss);
					var imgEndCss = imgAn[1];
					adjustImageCss(img, imgEndCss, function(){
						takeLayer(img, "anim-img");
						$(img).transition(imgEndCss, duration, function(){
							adjustImageCss(img, imgEndCss, function(){$(img).css(imgEndCss);});
							if (!Modernizr.touch) {
								if (BV === null) {
									BV = new $.BigVideo();
									BV.init();
								}
								BV.show(bgVideoUrl(img),{ambient:true});
								BV.getPlayer().on('playing', function() {
									$(".static-img").css({visibility: 'hidden'});
								});
							}
							cleanLayer("static-page")
							takeLayer(img, "static-img");
							showPage();
						});
					});
				});
			}
		}
		function cleanLayer(clss){
			$("."+clss).each(function(){
				$(this).css({visibility: 'hidden'});
				$(this).removeClass(clss);
			});
		}
		function toLayer(q, clss){
			$(q).css({
				visibility: 'visible'
			});
			$(q).removeClass("static-page static-img anim-page anim-img");
			$(q).addClass(clss);
		}
		function takeLayer(q, clss){
			cleanLayer(clss);
			toLayer(q, clss)
		}
		function adjustImageCss(image, css, func){
			var $img = $(image);
			var img = new Image();
			img.src = $img.attr('src');
			img.onload = function(){
				var windowW = $(window).width();
				var windowH = $(window).height();
				var imgW = img.width;
				var imgH = img.height;
				var windowRatio = windowW / windowH;
				var imgRatio = imgW / imgH
				var newImgW, newImgH
				if(windowRatio > imgRatio){
					newImgW = windowW;
					newImgH = newImgW / imgRatio;
				}else{
					newImgH = windowH;
					newImgW = imgRatio * newImgH;
				}
				css.width = Math.round(newImgW);
				css.height = Math.round(newImgH);
				if(parseInt(css.top) == 0){
					css["margin-top"] = Math.round((windowH - newImgH) / 2) + "px";
				}else if(css.top == '-100%'){
					css["margin-top"] = Math.round(windowH - newImgH) + "px";
				} else{
					css["margin-top"] = 0;
				}
				if(parseInt(css.left) == 0){
					css["margin-left"] = Math.round((windowW - newImgW) / 2) + "px";
				}else if(css.left == '-100%'){
					css["margin-left"] = Math.round(windowW - newImgW) + "px";
				} else{
					css["margin-left"] = 0;
				}
				func(css);
			}
		}
	}
}).call(this);