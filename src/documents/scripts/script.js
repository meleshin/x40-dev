(function() { $(function() {
	var isIE8 = $('html').hasClass('ie8');
	if (!$.support.transition) {
		$.fn.transition = $.fn.animate;
	}
	design();
	navigation();
	opacityFix();
	function design(){
		var collapseHide = function(){
			$('.navbar-collapse.in, #side-padding.in').collapse('hide');
			$('#side-padding').css("height","");
		}
		$('.navbar-collapse').click('li', collapseHide);
		$(window).on('resize', collapseHide);
		var $page = $(".page");
		$page.wrapInner('<div class="col-sm-9 page-content"></div>');
		$('<div class="col-sm-3"></div>').appendTo($page);
		$page.wrapInner('<div class="page-paper"></div>');
		$('<div class="film1"></div>').insertBefore($('.page-paper'));
		$('<div class="film2"></div>').insertAfter($('.page-paper'));
		$('.page-paper').scroll(function(){
			var fPoz = Math.round($(this).scrollTop()/2);
			$('.film1, .film2').css("background-position","-"+fPoz+"px 0");
			var scr = Math.round($(this).scrollTop()/4);
			var r = Math.abs( (0+180+scr)%360-180 );
			var g = Math.abs( (180+180+scr)%360-180 );
			var b = Math.abs( (120+180+scr)%360-180 );
			var rs = Math.abs( (200+200+scr)%400-200 );
			var gs = Math.abs( (0+200+scr*2)%400-200 );
			var bs = Math.abs( (0+200+scr/2)%400-200 );
			if(Modernizr.opacity){
				$("#side-nav").css({'background-color': 'rgba('+r+', '+g+', '+b+', 0.7)'});
				//$(".nicescroll-rails div").css({'background-color': 'rgba('+rs+', '+gs+', '+bs+', 0.8)'});
				//$('.desktop, .mobile, .desktop>div, .mobile>div').css({'border-color': 'rgba('+rs+', '+gs+', '+bs+', 0.7)'});
			}else{
				$("#side-nav").css({'background-color': 'rgb('+r+', '+g+', '+b+')'});
				//$(".nicescroll-rails div").css({'background-color': 'rgb('+rs+', '+gs+', '+bs+')'});
			}
			
		});
		$('#side-nav a').each(function(){
			$(this).attr('data-hover',$(this).text());
		});
	}
	function navigation(){
		var duration = 800;
		var zOff = 900;
		var zStaticImg = 500;
		var zStaticPage = 600;
		var zAnimImg = 700;
		var zAnimPage = 800;
		var isOff = false;
		var isPreOff = false;
		var pageAns = [
			[{left: '-100%', top: 0}, {left: 0, top: 0}],
			[{left: 0, top: '-100%'}, {left: 0, top: 0}],
			[{left: '100%', top: 0}, {left: 0, top: 0}],
			[{left: 0, top: '100%'}, {left: 0, top: 0}]
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
		var $sideNav = $("#side-nav");
		var sideNavBgColor = $sideNav.css("background-color");
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
					$sideNav.transition({opacity: 0.3}, 200);
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
					$sideNav.transition({opacity: 1}, duration/2);
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
				$('#side-nav a.active').css("color",'#FF7D8D');
			}
			if( $img.css('display') != 'none' ){
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
								var videoUrl = $img.attr('data-video');
								if(!videoUrl) videoUrl = $img.attr('src').replace(/.jpg$/,".mp4");
								BV.show(videoUrl,{ambient:true});
								var player = BV.getPlayer();
								var started = false;
								player.on("playing", function() {
									if(!started){
										$(".static-img").css({display: "none"});
										started = true;
									}
								});
								player.on("waiting", function() {
									if(started){
										console.log("waiting");
									}
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
				$(".page-paper").each(function(){
					var s = $(this).getNiceScroll(0);
					if (s) s.hide();
				});
				$('.film1, .film2').css({"background-position": "0 0"});
				if($.support.transition) $('.film1, .film2').transition({"background-position": "-"+504*4+"px 0"},5000);
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
					var $p = $(hash+" .page-paper");
					var s = $p.getNiceScroll(0);
					if(s){
						s.show();
					}else{
						$p.niceScroll({zindex: 100000, autohidemode: true, horizrailenabled: true, cursoropacitymin: 0.6, cursoropacitymax: 1, background: "transparent", cursorborder: '1px solid #fff', cursorwidth: '8px', cursorcolor: 'rgb(200, 0, 0)'});
							//if background not transparent then right side of page flashes after showing
					}
					if($("nav").css("background-image")!=="none"){
						$("nav").css({"background-image": "none"});
						$('#side-nav a').css("color","");
						if(Modernizr.opacity){
							$sideNav.css({"background-color": "rgba(51, 51, 51,1)"});
							$sideNav.transition({"background-color": sideNavBgColor}, 1000);
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
				$this.css({display: 'none'});
				$this.removeClass(clss);
			});
		}
		function toLayer($q, clss){
			$q.css({
				display: 'block'
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
	function opacityFix(){
		if(!Modernizr.opacity){
			var opacityes = [
				['#top-nav', 70],
				['#top-nav .navbar-toggle', 80],
				['#top-nav .navbar-toggle:focus', 20],
				['#top-nav li.navbar-text', 80],
				['#side-nav', 75],
				['.page-paper', 90],
				['.page-content i', 72],
				['#off-bg i', 20],
				['.center-menu, .page-box', 70]
			]
			var $head = $('head');
			var style = '<style type="text/css">';
			for(var i = 0; i < opacityes.length; i++){
				style += opacityes[i][0] + ' {-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity='+opacityes[i][1]+')";}';
			}
			style += '</style>';
			$head.append($(style));
		}
	}
}); }).call(this);