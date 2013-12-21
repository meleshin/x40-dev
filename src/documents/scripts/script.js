(function() { $(function() {
	var duration = 800;
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
			//var fPoz = Math.round($(this).scrollTop()/2);
			//$('.film1, .film2').css("background-position","-"+fPoz+"px 0");
			var scr = Math.round($(this).scrollTop()/4);
			var r = Math.abs( (0+180+scr)%360-180 );
			var g = Math.abs( (180+180+scr)%360-180 );
			var b = Math.abs( (120+180+scr)%360-180 );
			if(Modernizr.opacity){
				$("#side-nav").css({'background-color': 'rgba('+r+', '+g+', '+b+', 0.7)'});
			}else{
				$("#side-nav").css({'background-color': 'rgb('+r+', '+g+', '+b+')'});
			}
		});
		$('#side-nav a').each(function(){
			$(this).attr('data-hover',$(this).text());
		});
	}
	function navigation(){
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
		/*if($.support.transition && Modernizr.opacity) {
				pageAns[1][0].transform = "rotate(45deg)";
				pageAns[1][1].transform = "rotate(0deg)";
				
				pageAns[2][0].transform = "rotate3d(1,1,0,-90deg)";
				pageAns[2][1].transform = "rotate3d(1,1,0,0deg)";
				
				pageAns[3][0].transform = "rotate3d(1,0,1,90deg)";
				pageAns[3][1].transform = "rotate3d(1,0,1,0deg)";
				
				pageAns[0][0].transform = "rotate3d(1,1,0,180deg)";
				pageAns[0][1].transform = "rotate3d(1,1,0,0deg)";
		}*/
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
				$("#on a").addClass("inactive");
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
						$("#on a").removeClass("inactive");
					});
				}else{
					$("#off-bg").css("background-image","url(/images/fuzz.gif)");
					isOff = true;
					isPreOff = false;
					$("#on a").removeClass("inactive");
				}
				clickHash = location.hash;
			}
			function switchOn(){
				$("#off a").addClass("inactive");
				$("#off").css({display: "block"});
				$("#on").css({display: "none"});
				if(Modernizr.opacity){
					$sideNav.transition({opacity: 1}, duration/2);
					$("#off-bg").css("background-image","none")
						.transition({opacity: 0}, duration, function(){
							$("#off-bg").remove();
							isOff = false;
							$("#off a").removeClass("inactive");
						});
				}else{
					$("#off-bg").remove();
					isOff = false;
					$("#off a").removeClass("inactive");
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
				if($.support.transition && Modernizr.opacity) imgStartCss.opacity = 0;
				adjustImageCss($img, imgStartCss, function(){
					$img.css(imgStartCss);
					var imgEndCss = imgAn[1];
					if($.support.transition && Modernizr.opacity) imgEndCss.opacity = 1;
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
				var $film = $(hash+' .film1, '+hash+' .film2');
				//$film.css({"background-position": "0 0"});
				//if($.support.transition)  $film.transition({"background-position": "-"+504*4+"px 0"},5000,function(){filmAnim=false;});
				var pageAn = pageAnim();
				var startCss = pageAn[0];
				if($.support.transition && Modernizr.opacity) {
					startCss.opacity = 0;
				}
				$hash.css(startCss);
				takeLayer($hash, "anim-page");
				var $ie8style;
				if(isIE8){
					var $head = $('head');
					$ie8style = $('<style type="text/css">.page :before,.page :after{content:none !important}</style>');
					$head.append($ie8style);
				}
				var endCss = pageAn[1];
				if($.support.transition && Modernizr.opacity){
					endCss.opacity = 1;
				}
				projects();
				$hash.transition(endCss, duration, 'cubic-bezier(0.215, 0.610, 0.355, 1.000)', function(){
					takeLayer($hash, "static-page");
					if($.support.transition && Modernizr.opacity){
						$hash.transition({opacity: 1}, duration);
					}
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
	function projects(){
		var $sequence = $("#sequence");
		if($sequence.length > 0){
			var options = {
				nextButton: true,
				prevButton: true,
				pagination: true,
				animateStartingFrameIn: true,
				autoPlay: true,
				autoPlayDelay: 3000,
				preloader: true,
				preloadTheseFrames: [1],
				preloadTheseImages: [
					"/images/newbigjob-t.png",
					"/images/newbigjob-m-t.png",
					"/images/mobivisor-t.png",
					"/images/surwave-t.png",
					"/images/surwave-m-t.png",
					"/images/vreggy-t.png",
					"/images/sigmahome-t.png",
					"/images/hitechhow-t.png",
					"/images/hth-crm-t.png",
					"/images/frescostudio-t.png"
				]
			};
			var mySequence = $("#sequence").sequence(options).data("sequence");
			var sequenceH = function(){
				var baseW = 1051;
				var baseH = 450;
				var hBordersAndPagination = 40 + 74;
				var currentHBordersAndPagination = 40 + $('#sequence .sequence-pagination').height();
				var currentW = $('#sequence .sequence-canvas').width();
				var newH = currentHBordersAndPagination + (baseH - hBordersAndPagination)*currentW/baseW;
				var ww = $(window).width();
				if(ww <= 500){
					newH += Math.round(80*ww/500);
				}
				$('#sequence').css("height", newH+'px');
			}
			sequenceH();
			$(window).on('resize', sequenceH);
			$('#sequence, #sequence-other').transition({opacity: 1}, duration*3);
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
				['.center-menu, .page-box', 70],
				['.descr', 70]
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