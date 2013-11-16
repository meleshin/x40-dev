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
		var topDelta = '90px';
		var leftDelta = '25px';
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
		var currentPageId;
		var currentImage;
		var lastBackgrounds = {};
		var BV = null;
		if (!Modernizr.touch) {
			BV = new $.BigVideo();
			BV.init();
		}
		if (!$.support.transition) {$.fn.transition = $.fn.animate;}
		$("a").each(function() {if(this.hash) this.hash = this.hash.replace('#','#!')});
		nav(location.hash);
		$("nav a").click(function(e) {
			var locationBH = location.href.replace(location.hash, '');
			var thisBH = this.href.replace(this.hash, '');
			if(this.hash && thisBH == locationBH){
				nav(this.hash, true);
				location.hash = this.hash;
				e.preventDefault();
			} else if(thisBH == locationBH){
				nav(this.hash, true);
				location.hash = '';
				e.preventDefault();
			}
		});
		$(window).on('hashchange', function(e) {
			nav(location.hash);
		});
		$(window).on('resize', function(){adjustImage(currentImage)});
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
			if(currentImage && dataBGs[i] === currentImage){
				i = i < dataBGs.length - 1 ? i+1 : 0;
			}
			lastBackgrounds[hash] = i;
			return dataBGs[i];
		}
		function bgVideoUrl(img){
			return $(img).attr('src').replace(/.jpg$/,".mp4");
		}
		function nav(hash, reloadIfCurrent){
			if(typeof reloadIfCurrent === "undefined") reloadIfCurrent = false;
			if(!hash || hash == '#'){
				hash = '#index';
			}else{
				hash = hash.replace('#!','#')
			}
			if(reloadIfCurrent || hash !== currentPageId){
				var duration = 3000;
				var img = bgImage(hash);
				var pageAn = pageAnim();
				var imgAn = imgAnim();
				var currentPageIdL = currentPageId;
				var currentImageL = currentImage;
				currentPageId = hash;
				currentImage = img;
				var imgStartCss = imgAn[0];
				imgStartCss.visibility = 'visible';
				imgStartCss.opacity = 1;
				imgStartCss["z-index"] = 500;
				adjustImageCss(img, imgStartCss, function(){
					$(img).css(imgStartCss);
					var imgEndCss = imgAn[1];
					adjustImageCss(img, imgEndCss, function(){
						$(img).transition(imgEndCss, duration, function(){
							adjustImageCss(img, imgEndCss, function(){$(img).css(imgEndCss);});
							if(BV !== null){
								BV.show(bgVideoUrl(img),{ambient:true});
								BV.getPlayer().on('playing', function() {
									if(currentPageIdL !== currentPageId) {
										$(currentPageIdL).css({visibility: 'hidden'});
									}
									$(img).css({visibility: 'hidden'});
								});
							}
							var pageStartCss = pageAn[0];
							pageStartCss.visibility = 'visible';
							pageStartCss["z-index"] = 501;
							$(hash).css(pageStartCss);
							$(hash).transition(pageAn[1], duration, function(){
								if(currentPageIdL && currentPageId !== currentPageIdL){
									$(currentPageIdL).css({visibility: 'hidden'});
								}
								if(currentImageL && currentImage !== currentImageL){
									$(currentImageL).css({visibility: 'hidden'});
								}
								$(img).css({"z-index": 250});
								$(hash).css({"z-index": 251});
							});
						});
					});
				});
			}
		}
		function adjustImage(image, func){
			var css = {top: 0, left: 0};
			adjustImageCss(image, css, function(){
				$(image).css(css);
				if (typeof func === "function"){
					func();
				}
			});
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
				css.width = newImgW;
				css.height = newImgH;
				if(parseInt(css.top) == 0) css["margin-top"] = (windowH - newImgH) / 2 + "px";
				if(parseInt(css.left) == 0) css["margin-left"] = (windowW - newImgW) / 2 + "px";
				func();
			}
		}
	}
}).call(this);