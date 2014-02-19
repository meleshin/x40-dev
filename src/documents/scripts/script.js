(function() { $(function() {
	var cLang = $.cookie('lang');
	var lang;
	if(cLang){
		lang = cLang
	}else if(navigator.language){
		lang = navigator.language.substring(0,2);
	}else if(navigator.browserLanguage){
		lang = navigator.browserLanguage.substring(0,2);
	}
	if(lang === 'ru' && location.href.indexOf('/en/')!=-1){
		window.location.replace(location.href.replace("/en/", '/'));
		return;
	}else if(lang !== 'ru' && location.href.indexOf('/en/')==-1){
		window.location.replace(location.href.replace(location.host+location.pathname, location.host+'/en'+location.pathname));
		return;
	}
	$('.lang a').click(function(e){
		$.cookie('lang', $(this).attr('data-lang'), {path: '/'});
	});
	$.fn.cssAn = function (prop){
		if($.support.transition){
			return this.css(prop);
		}else{
			return this.animate(prop, duration);
		}
	}
	$.fn.cssAnOnly = function (prop){
		if($.support.transition){
			return this.css(prop);
		}else{
			return this;
		}
	}
	var previosDocmode = $.cookie('docmode');
	if(document.documentMode) $.cookie('docmode', document.documentMode, {path: '/'});
	function getModeCookie(name){
		if(document.documentMode && document.documentMode != previosDocmode){
			return null;
		}else{
			return $.cookie(name);
		}
	}
	var isIE8 = $('html').hasClass('ie8');
	var isIE9 = $('html').hasClass('ie9');
	var isIE10 = $('html').hasClass('ie10');
	var isIE11 = (function(){
		var tmp = document.documentMode, e, isIE;
		try{document.documentMode = "";}
		catch(e){ };
		res = document.documentMode === 11;
		try{document.documentMode = tmp;}
		catch(e){ };
		return res;
	})();
	var isIE = (function(){
		var tmp = document.documentMode, e, isIE;
		try{document.documentMode = "";}
		catch(e){ };
		res = typeof document.documentMode == "number" ? !0 : eval("/*@cc_on!@*/!1");
		try{document.documentMode = tmp;}
		catch(e){ };
		return res;
	})();
	isWin = $('html').hasClass('win');
	isChrome = $('html').hasClass('chrome');
	isMobile = $('html').hasClass('mobile-device');
	var isWebgl = $('html').hasClass('do-webgl');
	var isPlayVideo = $('html').hasClass('play-video');
	var isPlayAudio = $('html').hasClass('play-audio');
	var isParallax = $('html').hasClass('parallax');
	var docLang = $('html').attr('data-doc-lang');
	var $scene;
	var duration = 800;
	var bgInClasses = ['slideInDown', 'fadeInLeft', 'slideInLeft', 'fadeInRight', 'slideInRight', 'fadeInDown', 'fadeInUp'];
	var bgInClassCur = 0;
	var pgInClasses = ['fadeInLeft', 'fadeInDown', 'fadeInUp', 'fadeInRight'];
	var pgInClassCur = 0;
	var boxInClasses = isIE ? ['bounceIn',  'pulse', 'bounce', 'shake', 'swing', 'bounceInLeft'] : ['flipInX', 'bounceIn', 'pulse', 'bounce', 'shake', 'swing', 'bounceInLeft', 'flipInY'];
	var boxInClassCur = 0;
	var pgOutClasses = ['bounceOutRight', 'bounceOutLeft', 'bounceOutDown', 'bounceOutUp'];
	var pgOutClassCur = 0;
	var bgOutClasses = ['bounceOutRight', 'bounceOutLeft', 'bounceOutDown', 'bounceOutUp'];
	var bgOutClassCur = 0;
	
	var animationEnd = 'animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd';
	var transitionEnd = 'webkitTransitionEnd oTransitionEnd transitionend';
	var moveFunc = moveClear;//moveBlack;
	var clipCursor = (function(){
		function get(id){
			var name = 'last-cursor-'+id;
			var lc = getModeCookie(name);
			if(lc){
				return lc;
			}else{
				$.cookie(name, 0, {path: '/'});
				return 0;
			}
		}
		return {
			'video-bg-wrap': get('video-bg-wrap'),
			'sketch-bg-wrap': get('sketch-bg-wrap'),
			'three-img-bg-wrap': get('three-img-bg-wrap')
		};
	})();
	var loadedClips = {};
	var maxLoadedClips = {
			'video-bg-wrap': $.cookie('max-loaded-video-bg-wrap'),
			'sketch-bg-wrap': $.cookie('max-loaded-sketch-bg-wrap'),
			'three-img-bg-wrap': $.cookie('max-loaded-three-img-bg-wrap')
	};
	var getCursor = function(cookieName){
		var lc = getModeCookie(cookieName);
		if(lc){
			return lc;
		}else{
			$.cookie(cookieName, 0, {path: '/'});
			return 0;
		}
	}
	var fxCursor = getCursor('lastFxCursor');
	var threeCursor = getCursor('lastThreeCursor');
	var lastHash;
	var loadedVideo=[];
	var currentVideoUrl;
	var filmDirect = 1;
	var seq;
	var videoClips = [
			{src: "/video/circ.hole_(loop)_1280x720.mp4", w: 1280, h: 720, link: 'http://vimeo.com/15533570', author: 'beeple'},
			{src: "/video/cross6_(loop)_1280x720.mp4", w: 1280, h: 720, link: 'http://vimeo.com/11162767', author:'beeple'},
			{src: "/video/nodes_(loop)_1280x720.mp4", w: 1280, h: 720, link: 'http://vimeo.com/9936271', author:'beeple'},
			{src: "/video/lightgrid_(loop)_1280x720.mp4", w: 1280, h: 720, link: 'http://vimeo.com/76432043', author: 'beeple'}
			/* Also may be used:
			{src: "/video/newprs_(loop)_1280x720.mp4", w: 1280, h: 720, link: 'http://vimeo.com/16038839', author:'beeple'},
			{src: "/video/rmx_(loop)_1280x560.mp4", w: 1280, h: 560, audio: true, link: 'http://vimeo.com/79293746', author: 'beeple'}
			*/
		];
	var sketchClips = isMobile ? (
			$(window).width() <= 640 ? [
				{src: "/video/lightgrid_(loop)_m.jpg", w: 1280, h: 720, link: 'http://vimeo.com/76432043', author: 'beeple'},
				{src: "/video/cross6_(loop)_m.jpg", w: 1280, h: 720, link: 'http://vimeo.com/11162767', author: 'beeple'},
			] : [
				{src: "/video/lightgrid_(loop)_1280x720.jpg", w: 1280, h: 720, link: 'http://vimeo.com/76432043', author: 'beeple'},
				{src: "/video/cross6_(loop)_1280x720-b.jpg", w: 1280, h: 720, link: 'http://vimeo.com/11162767', author: 'beeple'}
			]
		) : [
			{src: "/video/lightgrid_(loop)_1280x720.jpg", w: 1280, h: 720, link: 'http://vimeo.com/76432043', author: 'beeple'},
			{src: "/video/cross6_(loop)_1280x720.jpg", w: 1280, h: 720, link: 'http://vimeo.com/11162767', author: 'beeple'},
			{src: "/video/lightgrid_(loop)_1280x720-a.jpg", w: 1280, h: 720, link: 'http://vimeo.com/76432043', author: 'beeple'},
			{src: "/video/cross6_(loop)_1280x720-a.jpg", w: 1280, h: 720, link: 'http://vimeo.com/11162767', author: 'beeple'},
			{src: "/video/lightgrid_(loop)_1280x720-c.jpg", w: 1280, h: 720, link: 'http://vimeo.com/76432043', author: 'beeple'},
			{src: "/video/cross6_(loop)_1280x720-c.jpg", w: 1280, h: 720, link: 'http://vimeo.com/11162767', author: 'beeple'},
			{src: "/video/lightgrid_(loop)_1280x720-b.jpg", w: 1280, h: 720, link: 'http://vimeo.com/76432043', author: 'beeple'},
			{src: "/video/cross6_(loop)_1280x720-b.jpg", w: 1280, h: 720, link: 'http://vimeo.com/11162767', author: 'beeple'}
			/* Also may be used:
			{src: "/images/bg/black-crystal.jpg", w: 1920, h: 1080, link: 'http://www.openslowmo.com/', author: 'openslowmo.com'},
			{src: "/images/bg/bubbles.jpg", w: 1920, h: 1080, link: 'http://www.openslowmo.com/', author: 'openslowmo.com'},
			{src: "/images/bg/coffe.jpg", w: 1920, h: 1080, link: 'http://www.openslowmo.com/', author: 'openslowmo.com'},
			{src: "/images/bg/spheres.jpg", w: 1920, h: 1080, link: 'http://www.openslowmo.com/', author: 'openslowmo.com'},
			{src: "/images/bg/traffic-1600x1061.jpg", w: 1600, h: 1061, link: 'http://www.flickr.com/photos/yakobusan/3566287076/in/set-72157622430175923', author: 'Jakob Montrasio'},
			{src: "/images/bg/android-1920x1274.jpg", w: 1920, h: 1274, link: 'http://www.flickr.com/photos/peyotll/8378484980/', author: 'Benjamin Lefebvre'},
			{src: "/images/bg/shanghai-1920x1279.jpg", w: 1920, h: 1279, link: 'http://www.flickr.com/photos/yakobusan/3986658544/in/set-72157622430175923', author: 'Jakob Montrasio'}
			*/
		];
	var threeImgClips = [
			{src: "/images/bg/traffic-1600x1061.jpg", w: 1600, h: 1061, link: 'http://www.flickr.com/photos/yakobusan/3566287076/in/set-72157622430175923', author: 'Jakob Montrasio'},
			{src: "/images/bg/android-1920x1274.jpg", w: 1920, h: 1274, link: 'http://www.flickr.com/photos/peyotll/8378484980/', author: 'Benjamin Lefebvre'},
			{src: "/images/bg/shanghai-1920x1279.jpg", w: 1920, h: 1279, link: 'http://www.flickr.com/photos/yakobusan/3986658544/in/set-72157622430175923', author: 'Jakob Montrasio'}
		]
	var boomSnd = snd([
			["/audio/boom/195790__klankbeeld__cinematic-boom-130730-06.ogg","/audio/boom/195790__klankbeeld__cinematic-boom-130730-06.mp3"],
			["/audio/boom/199526__unfa__a-whole-cd-in-4-seconds-sci-fi-computer-working.ogg","/audio/boom/199526__unfa__a-whole-cd-in-4-seconds-sci-fi-computer-working.mp3"],
			["/audio/boom/93848__robinhood76__01551-low-boom.ogg","/audio/boom/93848__robinhood76__01551-low-boom.mp3"],
			["/audio/boom/195790__klankbeeld__cinematic-boom-130730-06.ogg","/audio/boom/195790__klankbeeld__cinematic-boom-130730-06.mp3"],
			["/audio/boom/93848__robinhood76__01551-low-boom.ogg","/audio/boom/93848__robinhood76__01551-low-boom.mp3"],
			["/audio/boom/93848__robinhood76__01551-low-boom.ogg","/audio/boom/93848__robinhood76__01551-low-boom.mp3"],
			["/audio/boom/195790__klankbeeld__cinematic-boom-130730-06.ogg","/audio/boom/195790__klankbeeld__cinematic-boom-130730-06.mp3"],
			["/audio/boom/93848__robinhood76__01551-low-boom.ogg","/audio/boom/93848__robinhood76__01551-low-boom.mp3"],
			["/audio/boom/199526__unfa__a-whole-cd-in-4-seconds-sci-fi-computer-working.ogg","/audio/boom/199526__unfa__a-whole-cd-in-4-seconds-sci-fi-computer-working.mp3"],
			["/audio/boom/195790__klankbeeld__cinematic-boom-130730-06.ogg","/audio/boom/195790__klankbeeld__cinematic-boom-130730-06.mp3"],
			["/audio/boom/195790__klankbeeld__cinematic-boom-130730-06.ogg","/audio/boom/195790__klankbeeld__cinematic-boom-130730-06.mp3"],
			/* Also may be used:
			["/audio/boom/86263__joelaudio__bass-boom-001.ogg","/audio/boom/86263__joelaudio__bass-boom-001.mp3"],
			["/audio/boom/116678__puniho__stretched-canvas-bass-drum.ogg","/audio/boom/116678__puniho__stretched-canvas-bass-drum.mp3"],
			["/audio/boom/120955__zimbot__explosionbombblastdistantmuffled-likecinematicboom-2.ogg","/audio/boom/120955__zimbot__explosionbombblastdistantmuffled-likecinematicboom-2.mp3"],
			*/
		]);
	var clickSnd = snd([
			["/audio/click/213148__radiy__click.mp3", "/audio/click/213148__radiy__click.ogg"]
			/* Also may be used:
			["/audio/click/198398__ani-music__ani-spoons-slap-2a.ogg", "/audio/click/198398__ani-music__ani-spoons-slap-2a.mp3"],
			["/audio/click/145459__soughtaftersounds__menu-click-sparkle.mp3", "/audio/click/145459__soughtaftersounds__menu-click-sparkle.ogg"],
			["/audio/click/49213__tombola__fisher-price29.ogg", "/audio/click/49213__tombola__fisher-price29.mp3"],
			["/audio/click/25260__suonho__deconstruction-set-wet.ogg", "/audio/click/25260__suonho__deconstruction-set-wet.mp3"],
			["/audio/click/195102__punpcklbw__3.mp3", "/audio/click/195102__punpcklbw__3.ogg"],
			["/audio/click/406__tictacshutup__click-1-d.mp3", "/audio/click/406__tictacshutup__click-1-d.ogg"],
			["/audio/click/145444__soughtaftersounds__menu-click-wet.mp3", "/audio/click/145444__soughtaftersounds__menu-click-wet.ogg"],
			*/
		]);
	var enterSnd = snd([
			
			["/audio/swipe/48185__rwm28__digitalhum1.ogg", "/audio/swipe/48185__rwm28__digitalhum1.mp3"],
			/* Also may be used:
			["/audio/swipe/128155__killpineapple__bagoverhead.ogg", "/audio/swipe/128155__killpineapple__bagoverhead.mp3"],
			["/audio/swipe/176166__caboose3146__swipe1.ogg", "/audio/swipe/176166__caboose3146__swipe1.mp3"],
			["/audio/swipe/127764__149203__hammer-14-16bit.ogg", "/audio/swipe/127764__149203__hammer-14-16bit.mp3"],
			["/audio/swipe/155548__bigkahuna360__mouse-scroll-1.ogg", "/audio/swipe/155548__bigkahuna360__mouse-scroll-1.mp3"],
			["/audio/swipe/187341__baidonovan__unlocking-door-with-key.ogg", "/audio/swipe/.mp3"],
			["/audio/swipe/209378__coffeeflan__chains-5swipe.ogg", "/audio/swipe/209378__coffeeflan__chains-5swipe.mp3"],
			["/audio/swipe/25412__andrewweathers__magnet-swipe.ogg", "/audio/swipe/25412__andrewweathers__magnet-swipe.mp3"],
			["/audio/swipe/73262__junggle__whoosh-dark-hissy.ogg", "/audio/swipe/73262__junggle__whoosh-dark-hissy.mp3"],
			["/audio/swipe/27765__lg__noise12.ogg", "/audio/swipe/27765__lg__noise12.mp3"]
			*/
		]);
	var windSnd = snd([
			["/audio/wind/148331__shapeshifter242__quiet.ogg", "/audio/wind/148331__shapeshifter242__quiet.mp3"],
			["/audio/wind/158398__kennysvoice__wipenthump.ogg", "/audio/wind/158398__kennysvoice__wipenthump.mp3"],
			["/audio/wind/77080__dj-chronos__giant-wing-flap-5.ogg", "/audio/wind/77080__dj-chronos__giant-wing-flap-5.mp3"],
			["/audio/wind/30328__erh__radio-click-2.ogg", "/audio/wind/30328__erh__radio-click-2.mp3"],
			["/audio/wind/64054__obct__b00-120.ogg", "/audio/wind/64054__obct__b00-120.mp3"],
			/* Also may be used:
			["/audio/wind/7601__noisecollector__hackeysacklarry5.ogg", "/audio/wind/7601__noisecollector__hackeysacklarry5.mp3"],
			["/audio/wind/9762__a43__a43-plugs-1.ogg", "/audio/wind/9762__a43__a43-plugs-1.mp3"],
			["/audio/wind/175199__minigunfiend__chill-scratch-harmonics.ogg", "/audio/wind/175199__minigunfiend__chill-scratch-harmonics.mp3"],
			["/audio/wind/178808__erokia__sample-2.ogg", "/audio/wind/178808__erokia__sample-2.mp3"],
			["/audio/wind/161437__mrcisum__fly-by-woosh.ogg", "/audio/wind/161437__mrcisum__fly-by-woosh.mp3"],
			*/
		]);
	var threeBgs = (function(){
		if(isWebgl){
			if(!isIE){
				return [
					new ThreeCubemapBalls(),
					new ThreeParticlesDynamic(),
					new ThreeParticlesShapes(),
					new ThreeParticlesBillboards()
				]
			}else{
				return [
					new ThreeCubemapBalls(),
					new ThreeParticlesDynamic()
				]
			}
		}else{
			return null;
		}
	})();
	var moveFx = (!isParallax || isMobile) ? null : new (function(){
		var $root = $('<div id="move-fx"></div>');
		$root.css({
			position: 'absolute',
			top: '-10%',
			left: '-10%',
			width: '120%',
			height: '120%',
		});
		$wrapper = $('<div id="move-fx-wrap"></div>');
		$wrapper.css({
			position:'absolute !important',
			top: '0',
			left: '0',
			width: '100%',
			height: '100%',
			'z-index': '700',
		});
		$('#page-wrapper').append($wrapper);
		$wrapper.append($root);
		var colors = [
			'rgb(255,0,0)',
			'rgb(127,128,0)',
			'rgb(0,255,0)',
			'rgb(0,127,128)',
			'rgb(0,0,255)',
		];
		var count = colors.length;
		var bars = (function(){
			var res = [];
			var w = 100/count;
			var t = '1s';
			var p = "opacity"
			for(var i = 0; i < count; i++){
				res[i] = $('<div class="bar"></div>');
				res[i].css({
					position: 'absolute',
					bottom: '0',
					left: i*w+'%',
					width: w+'%',
					height: '0',
					opacity: '0',
					'background-color': colors[i],
					'-webkit-transition-duration': t,
					'-moz-transition-duration': t,
					'-ms-transition-duration': t,
					'-o-transition-duration': t,
					'transition-duration': t,
					'-webkit-transition-property': p,
					'-moz-transition-property': p,
					'-ms-transition-property': p,
					'-o-transition-property': p,
					'transition-property': p
				});
				$root.append(res[i]);
			}
			return res;
		})();
		$(window).mousemove(function(e){
			var x = e.clientX;
			var y = e.clientY;
			var wW = $(window).width();
			var wH = $(window).height();
			var barW = wW / count;
			var i = Math.floor(x / barW);
			var h = wH - y;
			for(var j = 0; j < count; j++){
				var jx = j*barW + (barW/2);
				var delta = Math.abs(jx-x);
				var maxDelta = wW*(count-1)/count;
				var hFactor = 1.3*(1 - (delta/maxDelta));
				bars[j].css({height: Math.round(h*hFactor)+'px'});
			}
		});
		this.start = function(){
			$('#move-fx .bar').css({opacity: '0.4'});
		}
		this.stop = function(){
			$('#move-fx .bar').css({opacity: '0'});
		}
	})();
	opacityFix();
	design();
	if(isPlayAudio) audio();
	projects();
	loadClip(sketchClips, 'sketch-bg-wrap');
	if(isWebgl) loadClip(threeImgClips, 'three-img-bg-wrap');
	if(isPlayVideo) loadClip(videoClips, 'video-bg-wrap');
	navigation();
	function loadClip(clips, bgWrapId){
		var typeIsVideo = bgWrapId == 'video-bg-wrap' ? true : false;
		var $loaded = typeIsVideo ? $('#'+bgWrapId+' .video-bg>video') : $('#'+bgWrapId+' .img-bg>img');
		var i = $loaded.length;
		if(i < clips.length){
			var clip = clips[i];
			var srcW = clip.w;
			var srcH = clip.h;
			var bgCss = function(){
				var wW = $(window).width();
				var wH = $(window).height();
				var vW, vH;
				var srcR = srcW/srcH;
				var wR = wW/wH;
				if(srcR > wR){
					vH = wH;
					vW =  Math.round(vH * srcR);
				}else{
					vW = wW;
					vH =  Math.round(vW / srcR);
				}
				var vT = Math.round((wH - vH)/2);
				var vL =  Math.round((wW - vW)/2);
				return {width:vW+'px', height:vH+'px', left:vL+'px', top:vT+'px'};
			}
			var $bg = typeIsVideo ? $('<div class="video-bg"></div>') : $('<div class="img-bg"></div>');
			$bg.appendTo('#'+bgWrapId);
			$bg.css(bgCss());
			$(window).on('resize', function(){$bg.css(bgCss());});
			var $view;
			if(typeIsVideo){
				$view = $('<video class="bg" webkit-playsinline loop></video>');
				$view[0].muted = clip.audio ? false : true;
			}else{
				$view = $('<img class="bg" />');
			}
			var loadedFunc = function(){
				loadedClips[bgWrapId] = loadedClips[bgWrapId] === undefined ? 0 : loadedClips[bgWrapId]+1;
				if(maxLoadedClips[bgWrapId] === undefined || maxLoadedClips[bgWrapId] === null || maxLoadedClips[bgWrapId] === '' || loadedClips[bgWrapId] > maxLoadedClips[bgWrapId]) {
					maxLoadedClips[bgWrapId] = loadedClips[bgWrapId];
					$.cookie('max-loaded-'+bgWrapId, maxLoadedClips[bgWrapId], {path: '/'})
				}
				$view.appendTo($bg);
				if(clip.loadQ){
					clip.loadQ($view);
				}
				loadClip(clips, bgWrapId);
			};
			if(typeIsVideo){
				$view.one('canplaythrough', loadedFunc);
			}else{
				$view.load(loadedFunc);
			}
			$view[0].src = clip.src;
			if(typeIsVideo) $view[0].load();
		}
	}
	/*function moveBlack(rollback){
		if(!rollback){
			var $paper = $(lastHash+' .page-paper');
			$paper.addClass('move-out');
			$paper.cssAnOnly({'background-color': 'rgba(0, 0, 0, .8)'});
			$(lastHash+' .page-paper h1, '+lastHash+' .bg-author, '+lastHash+' .bg-author a').cssAnOnly({'color': 'rgba(255, 255, 255, .5)'});
			$(lastHash+' .page-paper i').cssAnOnly({'color': 'rgba(140, 0, 30, 0.8)'});
		}else{
			$('.page-paper.move-out h1, .page-paper.move-out .bg-author, .page-paper.move-out .bg-author a, .page-paper.move-out i').cssAnOnly({'color': ''});
			$('.page-paper.move-out').cssAnOnly({'background-color':''}).removeClass('move-out');
		}
	}*/
	function moveClear(rollback){
		if(!rollback){
			var $paper = $(lastHash+' .page-paper');
			$paper.addClass('move-out');
			$paper.cssAnOnly({'background-color': $.Color({ alpha: 0 })});
		}else{
			$('.page-paper.move-out').cssAnOnly({'background-color':''}).removeClass('move-out');
		}
	}
	function design(){
		var collapsed = true;
		var collapseHide = function(){
			$('.navbar-collapse.in').collapse('hide');
			$('.page-paper').css({overflow: 'auto'});
			collapsed = true;
		}
		$('.navbar-collapse li a').click(collapseHide);
		$(window).on('resize', function(){
			if($(window).width()>767){
				collapseHide();
			}
		});
		$('#top-nav .navbar-toggle').click(function(){
			if(collapsed){
				$('.page-paper').css({overflow: 'hidden'});
				collapsed = false;
			}else{
				$('.page-paper').css({overflow: 'auto'});
				collapsed = true;
			}
		});
		var $page = $(".page");
		$page.wrapInner('<div class="col-sm-9 page-content"></div>');
		//$('<div class="col-sm-3 right"></div>').appendTo($page);
		$page.wrapInner('<div class="page-paper'+(isMobile ? '' : ' scrollbar')+'"></div>');
		$('<div class="film1"></div>').insertBefore($('.page-paper'));
		$('<div class="film2"><div class="bg-author"></div></div>').insertAfter($('.page-paper'));
		$('#side-nav a, #top-nav ul a').each(function(){
			$(this).attr('data-hover',$(this).text());
		});
		if(isParallax){
			if(!isWebgl && !isPlayVideo){
				$('#sketch-bg-wrap, #move-fx-wrap').addClass('layer').attr('data-depth','1');
			}else{
				$('#video-bg-wrap').addClass('layer').attr('data-depth','0.5');
				$('#move-fx-wrap').addClass('layer').attr('data-depth','1');
			}
			$scene = $('#page-wrapper').parallax();
			$scene.parallax('disable');
		}
		var lastMove = (new Date()).getTime();
		var isMoveOut = false;
		var moveTimeout;
		var lastMoveHash;
		if(!isMobile){
			$(window).mousemove(function(e){
				var rollback = function(){
					var rollbackTimeout = 500;
					var currentTime = (new Date()).getTime();
					if(currentTime - lastMove > rollbackTimeout){
						moveFunc(true);
						isMoveOut = false;
					}else{
						if(moveTimeout) clearTimeout(moveTimeout);
						moveTimeout = setTimeout(rollback, rollbackTimeout);
					}
				}
				if(!isMoveOut || lastMoveHash != lastHash){
					isMoveOut = true;
					moveFunc();
					rollback();
				}
				lastMove = (new Date()).getTime();
				lastMoveHash = lastHash;
			});
		}
	}
	function navigation(){
		var isOff = false;
		var isPreOff = false;
		var lastBackgrounds = {};
		var clickHash = null;
		var $sideNav = $("#side-nav");
		var sideNavBgColor = $sideNav.css("background-color");
		$("a").each(function() {if(this.hash) this.hash = this.hash.replace('#','#!');});
		$(window).on('resize', function(){
			$('#page-wrapper>img.in').each(function(){adjustImg(this)});
		});
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
				} else {
					var url = this.href;
					if(Modernizr.cssanimations){
						$('.page.in, .bg.in, #move-fx').one(transitionEnd, function(){window.location.href = url;});
						$('.page.in, .bg.in, #move-fx').css({top: '100%'});
					}else{
						$('.page.in, .bg.in, #move-fx').animate({left: '100%'}, duration, function(){	window.location.href = url;});
					}
					e.preventDefault();
				}
			}
			function switchOff(){
				$('.video-bg video').each(function(){
					this.pause();
				});
				$("#off").css({display: "none"});
				$("#on").css({display: "block"});
				$sideNav.cssAn({opacity: 0.3});
				var $off = $("#off-bg");
				$off.css({display: "table", "background-image": "url(/images/fuzz.gif)"});
				setTimeout(function(){ $off.cssAn({opacity: 1}); });
				isOff = true;
				clickHash = location.hash;
			}
			function switchOn(){
				$("#off").css({display: "block"});
				$("#on").css({display: "none"});
				var $off = $("#off-bg");
				$off.cssAn({opacity: 0});
				$sideNav.cssAn({opacity: 1});
				var dur = $.support.transition ? 300 : duration
				setTimeout(function(){ $off.css({display: "none", "background-image": "none"}); }, dur);
				var inV = $('.video-bg video.in');
				if(inV.length > 0){
					$('.video-bg video').each(function(){
						this.pause();
					});
					inV[0].play();
				}
				isOff = false;
			}
		});
		$(window).on('hashchange', function(e) {
			var h = location.hash == "#" ? "" : location.hash;
			if(h !== clickHash){
				nav(location);
			}
		});
		function nav(locationOrA){
			var hash = locationOrA.hash;
			if(!hash || hash == '#'){
				hash = '#index';
			}else{
				hash = hash.replace('#!','#');
			}
			lastHash = hash;
			var $hash = $(hash);
			if($hash.length < 1) return;
			if($(".page.in").length > 0){
				$('#side-nav a').css("color",'#FF7D8D');
				if(Modernizr.opacity){
					$sideNav.cssAn({"background-color": "rgba(0, 0, 0, 0.7)"});
				}
			}
			var fx = (function(){
				var res = [];
				var videoClip = function(){ if(isPlayVideo) res.push(videoProcessor); };
				var sketchClip = function(){ if(!isPlayVideo && !isWebgl) res.push(sketchProcessor); };
				var threeClip = function(){ if(isWebgl) res.push(threeProcessor); };
				var threeImgClip = function(){ if(isWebgl) res.push(threeImgProcessor); };
				// Processors queue
				if(!isIE){
					threeClip();
					threeClip();
					threeClip();
					threeImgClip();
					videoClip();
					videoClip();
					threeImgClip();
					threeClip();
					videoClip();
					threeImgClip();
					threeClip();
					videoClip();
					threeImgClip();
					threeClip();
					videoClip();
					threeClip();
					videoClip();
					threeClip();
					videoClip();
					sketchClip();
				}else{
					threeClip();
					threeClip();
					threeImgClip();
					videoClip();
					threeImgClip();
					videoClip();
					threeClip();
					videoClip();
					threeImgClip();
					threeClip();
					videoClip();
					threeClip();
					videoClip();
					sketchClip();
				}
				return res;
			})();
			fx[fxCursor]();
			if(fxCursor<(fx.length-1)){
				fxCursor++;
			}else{
				fxCursor = 0;
			}
			$.cookie('lastFxCursor', fxCursor, {path: '/'});
			function threeBg (){
				var bg = threeBgs[threeCursor];
				if(threeCursor<(threeBgs.length-1)){
					threeCursor++;
				}else{
					threeCursor = 0;
				}
				$.cookie('lastThreeCursor', threeCursor, {path: '/'});
				moveFunc = moveClear;
				bg.start();
				return bg;
			}
			function bgView(bgWrapId, clips, func) {
				var $views = $("#"+bgWrapId+' .bg');
				var maxLoaded = maxLoadedClips[bgWrapId];
				var clipCur = clipCursor[bgWrapId];
				if (clipCursor[bgWrapId] >= maxLoaded){
					clipCursor[bgWrapId] = 0;
				}else{
					clipCursor[bgWrapId]++;
				}
				$.cookie('last-cursor-'+bgWrapId, clipCursor[bgWrapId], {path: '/'});
				if ($views.length <= clipCur){
					clips[clipCur].loadQ = function($view){
						clips[clipCur].loadQ = false;
						func($view, clipCur);
					};
				}else{
					func($($views[clipCur]), clipCur);
				}
			}
			function preProcessor(){
				if(isPlayVideo){
					$('.video-bg video').each(function(i){
						this.pause();
						if(videoClips[i].fx) videoClips[i].fx.stop();
					});
				}
				if(isWebgl){
					for(var i = 0; i < threeBgs.length; i++){
						threeBgs[i].stop();
					}
					for(var i = 0; i < threeImgClips.length; i++){
						if(threeImgClips[i].fx) threeImgClips[i].fx.stop();
					}
					$('.page-paper').removeClass('black-bg');
				}
				if(moveFx) moveFx.stop();
				if(isParallax) $scene.parallax('disable');
			}
			function pgOut(){
				if(Modernizr.cssanimations){
					function pgOutClassFun(){
						var i = pgOutClassCur < pgOutClasses.length - 1 ? pgOutClassCur+1 : 0;
						var res = pgOutClasses[pgOutClassCur];
						pgOutClassCur = i;
						return res;
					};
					$('.page.in').each(function(){
						var $t = $(this);
						if('#'+$t.attr('id') != lastHash){
							var pgOutClass = pgOutClassFun();
							$t.removeClass('in '+pgInClasses.join(' ')).addClass('animated out '+pgOutClass);
							$t.find('.page-box').removeClass(boxInClasses.join(' '));
						}
					});
				}else{
					$('.page.in').each(function(){
						var $t = $(this);
						if('#'+$t.attr('id') != lastHash){
							$t.removeClass('in '+pgInClasses.join(' ')).addClass('out')
								.animate({left: '-'+($(window).width()+5)+'px'}, duration, function(){$t.css({visibility: 'hidden'})});
						}
					});
				}
			}
			function bgOut(){
				if(Modernizr.cssanimations){
					function bgOutClassFun(){
						var i = bgOutClassCur < bgOutClasses.length - 1 ? bgOutClassCur+1 : 0;
						var res = bgOutClasses[bgOutClassCur];
						bgOutClassCur = i;
						return res;
					};
					$('.bg.in').each(function(){
						var bgOutClass = bgOutClassFun();
						$(this).removeClass('in '+bgInClasses.join(' ')).addClass('animated out '+bgOutClass);
					});
				}else{
					$('.bg.in').each(function(){
						var $t = $(this);
						$(this).removeClass('in').addClass('out').animate({top: '-100%'}, duration);
					});
				}
			}
			function bgOver($bg, callback){
				windSnd();
				boomSnd();
				$('#loading').css({display: 'none'});
				if(Modernizr.cssanimations){
					var bgInClass = (function (){
							var i = bgInClassCur < bgInClasses.length - 1 ? bgInClassCur+1 : 0;
							var res = bgInClasses[bgInClassCur];
							bgInClassCur = i;
							return res;
						})();
					pgOut();
					if(!$bg.hasClass('in')) {
						bgOut();
						$bg.removeClass('out '+bgOutClasses.join(' ')).addClass('over in');
						$bg.one(animationEnd, after);
						$bg.addClass('animated '+bgInClass);
					}else{
						after();
					}
				}else{
					pgOut();
					if(!$bg.hasClass('in')) {
						bgOut();
						$bg.removeClass('out').addClass('over in');
						var top;
						if(isParallax){
							$bg.css({top: ''});
							top = $bg.css('top');
						}else{
							top = 0;
						}
						$bg.css({top: '-100%'});
						$bg.animate({top: top}, duration, after);
					}else{
						after();
					}
				}
				function after(){
					if (callback) callback();
				}
			}
			function pageOver($pg, $bg, callback){
				$('#side-nav a').css("color","");
				if(Modernizr.opacity){
					$(hash+' .page-paper').cssAnOnly({'background-color': ''});
					$sideNav.cssAn({"background-color": sideNavBgColor});
				}
				if(Modernizr.cssanimations){
					var pgInClass = (function (){
						var i = pgInClassCur < pgInClasses.length - 1 ? pgInClassCur+1 : 0;
						var res = pgInClasses[pgInClassCur];
						pgInClassCur = i;
						return res;
					})();
					var boxInClass = (function (){
						var i = boxInClassCur < boxInClasses.length - 1 ? boxInClassCur+1 : 0;
						var res = boxInClasses[boxInClassCur];
						boxInClassCur = i;
						return res;
					})();
					$pg.find('.page-box').addClass('animated '+boxInClass);
					$pg.removeClass('out '+pgOutClasses.join(' ')).addClass('over in');
					$pg.one(animationEnd, after);
					$pg.addClass('animated '+pgInClass);
				}else{
					$pg.removeClass('out').addClass('over in');
					$pg.css({left: '-100%', visibility: 'visible'});
					$pg.animate({left: '0'}, duration, after);
				}
				function after(){
					$bg.removeClass('over');
					$pg.removeClass('over');
					$pg.find('.page-box').removeClass(boxInClass);
					if('#'+$pg.attr('id') == lastHash){
						if($.support.transition && !isMobile){
							var $film = $(hash+' .film1, '+hash+' .film2');
							var bgpos = $film.css("background-position");
							var xpos;
							if(!bgpos){
								xpos = '0';
							}else{
								xpos = bgpos.split(' ')[0].replace('%','').replace('px','');
							}
							filmDirect = -1 * filmDirect;
							var newXpos = xpos == '0' ? filmDirect*504*4 : '0';
							setTimeout(function(){$film.css({"background-position": newXpos+"px"+" 0"});}, 100);
						}
						var $p = $(hash+" .page-paper");
						$("a").each(function() {
							$t = $(this);
							$pli = $t.parents('li');
							$pli.removeClass("active");
							$t.removeClass("active");
							if($pli.hasClass('lang')){
								if($t.attr('data-lang') == docLang){
									$t.parents('li').addClass("active");
									$t.addClass("active");
								}
							}else if(this.href == locationOrA.href || (this.href + '#') == locationOrA.href){
								$t.parents('li').addClass("active");
								$t.addClass("active");
							}
						});
						if(seq) seq.startAutoPlay();
						if (callback) callback();
					}
					pgOut();
				}
			}
			function threeImgProcessor(){
				preProcessor();
				var bgWrapId = 'three-img-bg-wrap';
				bgView(bgWrapId, threeImgClips, function($img, ind){
					var clip = threeImgClips[ind];
					if(!clip.fx){
						clip.fx = new ThreeFx($img[0]);
					}
					var $bg = $(clip.fx.container);
					clip.fx.start();
					if(clip.link && clip.author) {
						$(hash+' .bg-author').text('Фото: ').append('<a target="_blank" href="'+clip.link+'">'+clip.author+'</a>');
					}else{
						$(hash+' .bg-author').empty();
					}
					bgOver($bg, function(){
						pageOver($hash, $bg);
					});
				});
			}
			function videoProcessor(){
				preProcessor();
				if(isParallax) $scene.parallax('enable');
				var bgWrapId = 'video-bg-wrap';
				bgView(bgWrapId, videoClips, function($video, ind){
					var clip = videoClips[ind];
					if(clip.link && clip.author){
						$(hash+' .bg-author').text('Видео: ').append('<a target="_blank" href="'+clip.link+'">'+clip.author+'</a>');
					}else{
						$(hash+' .bg-author').empty();
					}
					bgOver($video, function(){
						pageOver($hash, $video, function(){
							$video[0].play();
							if(moveFx) moveFx.start();
						});
					});
				});
			}
			function threeProcessor(){
				preProcessor();
				var t = threeBg();
				var $bg = $(t.container);
				$(hash+' .bg-author').empty();
				bgOver($bg, function(){
					if(t.paperClass){
						$hash.find('.page-paper').addClass(t.paperClass);
					}
					pageOver($hash, $bg);
				});
			}
			function sketchProcessor(){
				preProcessor();
				if(isParallax) $scene.parallax('enable');
				var bgWrapId = 'sketch-bg-wrap';
				bgView(bgWrapId, sketchClips, function($img, ind){
					var clip = sketchClips[ind];
					if(clip.link && clip.author){
						$(hash+' .bg-author').text('Фон: ').append('<a target="_blank" href="'+clip.link+'">'+clip.author+'</a>');
					}else{
						$(hash+' .bg-author').empty();
					}
					bgOver($img, function(){
						pageOver($hash, $img, function(){
							if(moveFx) moveFx.start();
						});
					});
				});
			}
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
				autoPlay: isMobile ? false : true,
				pauseOnHover: true,
				autoPlayDelay:  3000,
				preloader: isMobile ? false : true,
				preloadTheseFrames: isMobile ? undefined : [1],
				/*preloadTheseImages: [
					"/images/mobivisor.png",
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
				]*/
			};
			var setImg = function(){
				$('#sequence>.sequence-canvas div[data-img]').each(function(){
					var $d = $(this);
					var src = $d.attr('data-img');
					var windowW = $(window).width();
					var windowH = $(window).height();
					if(Modernizr.mq('only all') && !isMobile){
						if(windowW<=580 || windowH<=602){
							src = src.replace('.png','-c.png');
						}else if(windowW<=925 || windowH<=695){
							src = src.replace('.png','-b.png');
						}else if(windowW<=1199 || windowH<=755){
							src = src.replace('.png','-a.png');
						}
					}
					var $img = $d.find('img');
					if($img.length<1 || $img.attr('src')!==src){
						$d.empty();
						$('<img src="'+src+'" />').appendTo($d);
					}
				});
			}
			if($('#sequence .sequence-pagination .view').length < 1){
				$('#sequence>.sequence-canvas>li>.view').each(function(){
					var $v = $(this).clone();
					$v.find('div[data-img]').each(function(){
						var $d = $(this);
						src = $d.attr('data-img').replace('.png','-t.png');
						$('<img src="'+src+'" />').appendTo($d);
					});
					$v.appendTo('#sequence .sequence-pagination');
				});
				setImg();
				$(window).on('resize', setImg);
			}
			seq = $("#sequence").sequence(options).data("sequence");
			seq.pause();
		}
	}
	function opacityFix(){
		if(!Modernizr.opacity){
			var opacityes = [
				['#top-nav', 70],
				['#top-nav .navbar-toggle', 80],
				['#top-nav li.navbar-text', 80],
				['#side-nav', 70],
				['.page-paper', 85],
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
	function snd(sounds){
		if (!isPlayAudio) return function(){};
		var html5_audiotypes={
			"mp3": "audio/mpeg",
			"mp4": "audio/mp4",
			"ogg": "audio/ogg",
			"wav": "audio/wav"
		};
		var html5audios = [];
		var load = function(){
			var i = html5audios.length;
			if(i < sounds.length){
				var html5audio=document.createElement('audio');
				$(html5audio).one('canplaythrough', function(){
					html5audios.push(this);
					load();
				});
				var sources = sounds[i];
				for (var j=0; j<sources.length; j++){
					var sourceel=document.createElement('source');
					sourceel.setAttribute('src', sources[j]);
					if (sources[j].match(/\.(\w+)$/i))
						sourceel.setAttribute('type', html5_audiotypes[RegExp.$1]);
					html5audio.appendChild(sourceel);
				}
				html5audio.load();
			}
		}
		load();
		var cursor = 0;
		return function(){
			if(!html5audios[cursor]){
				return;
			}else{
				var audio = html5audios[cursor];
				cursor = cursor < html5audios.length - 1 ? cursor+1 : 0;
				audio.pause();
				audio.currentTime=0;
				audio.play();
			}
		}
	}
	function audio(){
		if (!isPlayAudio) return;
		$('a:not(.muted)').click(clickSnd);
		$('a:not(.muted)').mouseenter(enterSnd);
	}
	function ThreeCubemapBalls(){
		// Code from three.js examples (https://github.com/mrdoob/three.js/blob/master/examples/webgl_materials_cubemap_balls_refraction.html).
		// Modified by Roman Meleshin
		//var container;
		var camera, scene, renderer;
		var cameraCube, sceneCube;
		var mesh, lightMesh, geometry;
		var spheres = [];
		var directionalLight, pointLight;
		var mouseX = 0, mouseY = 0;
		var windowHalfX = window.innerWidth / 2;
		var windowHalfY = window.innerHeight / 2;
		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		var loop;
		//container = document.createElement( 'div' );
		//document.body.appendChild( container );
		this.container = document.createElement( 'div' );
		$(this.container).addClass('bg three');
		$('#three-bg-wrap').append( this.container );
		//
		camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100000 );
		camera.position.z = 3200;
		cameraCube = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100000 );
		scene = new THREE.Scene();
		sceneCube = new THREE.Scene();
		var geometry = new THREE.SphereGeometry( 100, 32, 16 );
		//var path = "/textures/cube/skybox/";
		var path = "/textures/cube/skybox-blue/";
		//var path = "/textures/vasa/";
		//var path = "/textures/dallasw/";
		//var path = "/textures/parliament/";
		//var path = "/textures/hornstullsstand/";
		//var path = "/textures/shwedish-royal-castle/";
		var format = '.jpg';
		var urls = [
			path + 'px' + format, path + 'nx' + format,
			path + 'py' + format, path + 'ny' + format,
			path + 'pz' + format, path + 'nz' + format
		];
		/*var urls = [
			path + 'posx' + format, path + 'negx' + format,
			path + 'posy' + format, path + 'negy' + format,
			path + 'posz' + format, path + 'negz' + format
		];*/
		var textureCube = THREE.ImageUtils.loadTextureCube( urls, new THREE.CubeRefractionMapping() );
		var material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube, refractionRatio: 0.95 } );
		for ( var i = 0; i < 500; i ++ ) {
			var mesh = new THREE.Mesh( geometry, material );
			mesh.position.x = Math.random() * 10000 - 5000;
			mesh.position.y = Math.random() * 10000 - 5000;
			mesh.position.z = Math.random() * 10000 - 5000;
			mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
			scene.add( mesh );
			spheres.push( mesh );
		}
		// Skybox
		var shader = THREE.ShaderLib[ "cube" ];
		shader.uniforms[ "tCube" ].value = textureCube;
		var material = new THREE.ShaderMaterial( {
				fragmentShader: shader.fragmentShader,
				vertexShader: shader.vertexShader,
				uniforms: shader.uniforms,
				depthWrite: false,
				side: THREE.BackSide
			} ),
			mesh = new THREE.Mesh( new THREE.CubeGeometry( 100, 100, 100 ), material );
		sceneCube.add( mesh );
		//
		renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.autoClear = false;
		this.container.appendChild( renderer.domElement );
		//
		window.addEventListener( 'resize', onWindowResize, false );
		function onWindowResize() {
			windowHalfX = window.innerWidth / 2,
			windowHalfY = window.innerHeight / 2,
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			cameraCube.aspect = window.innerWidth / window.innerHeight;
			cameraCube.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
		}
		function onDocumentMouseMove(event) {
			mouseX = ( event.clientX - windowHalfX ) * 10;
			mouseY = ( event.clientY - windowHalfY ) * 10;
		}
		//
		this.stop = function(){loop = false;}
		this.start = function(){
			loop = true;
			function animate() {
				if(loop){
					requestAnimationFrame( animate );
					render();
				}
			}
			animate();
		}
		function render() {
			var timer = 0.0001 * Date.now();
			for ( var i = 0, il = spheres.length; i < il; i ++ ) {
				var sphere = spheres[ i ];
				sphere.position.x = 5000 * Math.cos( timer + i );
				sphere.position.y = 5000 * Math.sin( timer + i * 1.1 );
			}
			camera.position.x += ( mouseX - camera.position.x ) * .05;
			camera.position.y += ( - mouseY - camera.position.y ) * .05;
			camera.lookAt( scene.position );
			cameraCube.rotation.copy( camera.rotation );
			renderer.render( sceneCube, cameraCube );
			renderer.render( scene, camera );
		}
	}
	function ThreeParticlesBillboards(){
		// Code from three.js examples (https://github.com/mrdoob/three.js/blob/master/examples/webgl_particles_billboards.html).
		// Modified by Roman Meleshin
		//var container;
		var camera, scene, renderer, particles, geometry, material, i, h, color, sprite, size;
		var mouseX = 0, mouseY = 0;
		var windowHalfX = window.innerWidth / 2;
		var windowHalfY = window.innerHeight / 2;
		var loop;
		this.paperClass = 'black-bg';
		//container = document.createElement( 'div' );
		//document.body.appendChild( container );
		this.container = document.createElement( 'div' );
		$(this.container).addClass('bg three');
		$('#three-bg-wrap').append( this.container );
		camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 2, 2000 );
		camera.position.z = 1000;
		scene = new THREE.Scene();
		scene.fog = new THREE.FogExp2( 0x000000, 0.001 );
		geometry = new THREE.Geometry();
		sprite = THREE.ImageUtils.loadTexture( "/textures/sprites/disc.png" );
		for ( i = 0; i < 10000; i ++ ) {
			var vertex = new THREE.Vector3();
			vertex.x = 2000 * Math.random() - 1000;
			vertex.y = 2000 * Math.random() - 1000;
			vertex.z = 2000 * Math.random() - 1000;
			geometry.vertices.push( vertex );
		}
		material = new THREE.ParticleSystemMaterial( { size: 35, sizeAttenuation: false, map: sprite, transparent: true } );
		material.color.setHSL( 1.0, 0.3, 0.7 );
		particles = new THREE.ParticleSystem( geometry, material );
		particles.sortParticles = true;
		scene.add( particles );
		//
		renderer = new THREE.WebGLRenderer( { clearAlpha: 1 } );
		renderer.setSize( window.innerWidth, window.innerHeight );
		this.container.appendChild( renderer.domElement );
		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		document.addEventListener( 'touchstart', onDocumentTouchStart, false );
		document.addEventListener( 'touchmove', onDocumentTouchMove, false );
		//
		window.addEventListener( 'resize', onWindowResize, false );
		function onWindowResize() {
			windowHalfX = window.innerWidth / 2;
			windowHalfY = window.innerHeight / 2;
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
		}
		function onDocumentMouseMove( event ) {
			mouseX = event.clientX - windowHalfX;
			mouseY = event.clientY - windowHalfY;
		}
		function onDocumentTouchStart( event ) {
			if ( event.touches.length == 1 ) {
				event.preventDefault();
				mouseX = event.touches[ 0 ].pageX - windowHalfX;
				mouseY = event.touches[ 0 ].pageY - windowHalfY;
			}
		}
		function onDocumentTouchMove( event ) {
			if ( event.touches.length == 1 ) {
				event.preventDefault();
				mouseX = event.touches[ 0 ].pageX - windowHalfX;
				mouseY = event.touches[ 0 ].pageY - windowHalfY;
			}
		}
		//
		this.stop = function(){loop = false;}
		this.start = function(){
			loop = true;
			function animate() {
				if(loop){
					requestAnimationFrame( animate );
					render();
				}
			}
			animate();
		}
		function render() {
			var time = Date.now() * 0.00005;
			camera.position.x += ( mouseX - camera.position.x ) * 0.05;
			camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
			camera.lookAt( scene.position );
			h = ( 360 * ( 1.0 + time ) % 360 ) / 360;
			material.color.setHSL( h, 0.5, 0.5 );
			renderer.render( scene, camera );
		}
	}
	function ThreeParticlesShapes(){
		// Code from three.js examples (https://github.com/mrdoob/three.js/blob/master/examples/webgl_particles_shapes.html).
		// Modified by Roman Meleshin
		var camera, scene, renderer;
		var group, text, plane;
		var speed = 50;
		var pointLight;
		var targetRotation = 0;
		var targetRotationOnMouseDown = 0;
		var mouseX = 0;
		var mouseXOnMouseDown = 0;
		var windowHalfX = window.innerWidth / 2;
		var windowHalfY = window.innerHeight / 2;
		var delta = 1, clock = new THREE.Clock();
		var heartShape, particleCloud, sparksEmitter, emitterPos;
		var _rotation = 0;
		var timeOnShapePath = 0;
		var composer;
		var effectBlurX, effectBlurY, hblur, vblur;
		var loop;
		this.paperClass = 'black-bg';
		this.container = document.createElement( 'div' );
		//document.body.appendChild( container );
		$(this.container).addClass('bg three');
		$('#three-bg-wrap').append( this.container );
		// CAMERA
		camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 2000 );
		camera.position.set( 0, 150, 400 );
		// SCENE
		scene = new THREE.Scene();
		// LIGHTS
		var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
		directionalLight.position.set( 0, -1, 1 );
		directionalLight.position.normalize();
		scene.add( directionalLight );
		pointLight = new THREE.PointLight( 0xffffff, 2, 300 );
		pointLight.position.set( 0, 0, 0 );
		scene.add( pointLight );
		// TEXT
		var theText = "X40";
		// Get text from hash
		/*var hash = document.location.hash.substr( 1 );
		if ( hash.length !== 0 ) {
			theText = hash;
		}*/
		var material = new THREE.MeshFaceMaterial( [
			new THREE.MeshLambertMaterial( { color: 0xffffff, shading: THREE.FlatShading, opacity: 0.95 } ),
			new THREE.MeshLambertMaterial( { color: 0xffffff } )
		] );
		var text3d = new THREE.TextGeometry( theText, {
			size: 70,
			height: 25,
			curveSegments: 4,
			font: "helvetiker",
			bevelEnabled: true,
			bevelThickness: 2,
			bevelSize: 2,
			material: 0,
			extrudeMaterial: 1
		});
		text3d.computeVertexNormals();
		text3d.computeBoundingBox();
		var centerOffset = -0.5 * ( text3d.boundingBox.max.x - text3d.boundingBox.min.x );
		text = new THREE.Mesh( text3d, material );
		// Potentially, we can extract the vertices or faces of the text to generate particles too.
		// Geo > Vertices > Position
		text.position.x = centerOffset;
		text.position.y = 130;
		text.position.z = -50;
		text.rotation.x = 0;
		text.rotation.y = Math.PI * 2;
		group = new THREE.Object3D();
		group.add( text );
		scene.add( group );
		// Create particle objects for Three.js
		var particlesLength = 70000;
		var particles = new THREE.Geometry();
		function newpos( x, y, z ) {
			return new THREE.Vector3( x, y, z );
		}
		var Pool = {
			__pools: [],
			// Get a new Vector
			get: function() {
				if ( this.__pools.length > 0 ) {
					return this.__pools.pop();
				}
				console.log( "pool ran out!" )
				return null;
			},
			// Release a vector back into the pool
			add: function( v ) {
				this.__pools.push( v );
			}
		};
		for ( i = 0; i < particlesLength; i ++ ) {
			particles.vertices.push( newpos( Math.random() * 200 - 100, Math.random() * 100 + 150, Math.random() * 50 ) );
			Pool.add( i );
		}
		// Create pools of vectors
		attributes = {
			size:  { type: 'f', value: [] },
			pcolor: { type: 'c', value: [] }
		};
		var sprite = generateSprite() ;
		texture = new THREE.Texture( sprite );
		texture.needsUpdate = true;
		uniforms = {
			texture:   { type: "t", value: texture }
		};
		// PARAMETERS
		// Steadycounter
		// Life
		// Opacity
		// Hue Speed
		// Movement Speed
		function generateSprite() {
			var canvas = document.createElement( 'canvas' );
			canvas.width = 128;
			canvas.height = 128;
			var context = canvas.getContext( '2d' );
			// Just a square, doesnt work too bad with blur pp.
			// context.fillStyle = "white";
			// context.strokeStyle = "white";
			// context.fillRect(0, 0, 63, 63) ;
			// Heart Shapes are not too pretty here
			// var x = 4, y = 0;
			// context.save();
			// context.scale(8, 8); // Scale so canvas render can redraw within bounds
			// context.beginPath();
			// context.bezierCurveTo( x + 2.5, y + 2.5, x + 2.0, y, x, y );
			// context.bezierCurveTo( x - 3.0, y, x - 3.0, y + 3.5,x - 3.0,y + 3.5 );
			// context.bezierCurveTo( x - 3.0, y + 5.5, x - 1.0, y + 7.7, x + 2.5, y + 9.5 );
			// context.bezierCurveTo( x + 6.0, y + 7.7, x + 8.0, y + 5.5, x + 8.0, y + 3.5 );
			// context.bezierCurveTo( x + 8.0, y + 3.5, x + 8.0, y, x + 5.0, y );
			// context.bezierCurveTo( x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5 );
			context.beginPath();
			context.arc( 64, 64, 60, 0, Math.PI * 2, false) ;
			context.lineWidth = 0.5; //0.05
			context.stroke();
			context.restore();
			var gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );
			gradient.addColorStop( 0, 'rgba(255,255,255,1)' );
			gradient.addColorStop( 0.2, 'rgba(255,255,255,1)' );
			gradient.addColorStop( 0.4, 'rgba(200,200,200,1)' );
			gradient.addColorStop( 1, 'rgba(0,0,0,1)' );
			context.fillStyle = gradient;
			context.fill();
			return canvas;
		}
		var shaderMaterial = new THREE.ShaderMaterial( {
			uniforms: uniforms,
			attributes: attributes,
			vertexShader: document.getElementById( 'vertexshader' ).textContent,
			fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
			blending: THREE.AdditiveBlending,
			depthWrite: false,
			transparent: true
		});
		particleCloud = new THREE.ParticleSystem( particles, shaderMaterial );
		particleCloud.dynamic = true;
		// particleCloud.sortParticles = true;
		var vertices = particleCloud.geometry.vertices;
		var values_size = attributes.size.value;
		var values_color = attributes.pcolor.value;
		for( var v = 0; v < vertices.length; v ++ ) {
			values_size[ v ] = 50;
			values_color[ v ] = new THREE.Color( 0x000000 );
			particles.vertices[ v ].set( Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY );
		}
		group.add( particleCloud );
		particleCloud.y = 800;
		// Create Particle Systems
		// EMITTER STUFF
		// Heart
		var x = 0, y = 0;
		heartShape = new THREE.Shape();
		heartShape.moveTo( x + 25, y + 25 );
		heartShape.bezierCurveTo( x + 25, y + 25, x + 20, y, x, y );
		heartShape.bezierCurveTo( x - 30, y, x - 30, y + 35,x - 30,y + 35 );
		heartShape.bezierCurveTo( x - 30, y + 55, x - 10, y + 77, x + 25, y + 95 );
		heartShape.bezierCurveTo( x + 60, y + 77, x + 80, y + 55, x + 80, y + 35 );
		heartShape.bezierCurveTo( x + 80, y + 35, x + 80, y, x + 50, y );
		heartShape.bezierCurveTo( x + 35, y, x + 25, y + 25, x + 25, y + 25 );
		var hue = 0;
		var setTargetParticle = function() {
			var target = Pool.get();
			values_size[ target ] = Math.random() * 200 + 100;
			return target;
		};
		var onParticleCreated = function( p ) {
			var position = p.position;
			p.target.position = position;
			var target = p.target;
			if ( target ) {
				// console.log(target,particles.vertices[target]);
				// values_size[target]
				// values_color[target]
				hue += 0.0003 * delta;
				if ( hue > 1 ) hue -= 1;
				// TODO Create a PointOnShape Action/Zone in the particle engine
				timeOnShapePath += 0.00035 * delta;
				if ( timeOnShapePath > 1 ) timeOnShapePath -= 1;
				var pointOnShape = heartShape.getPointAt( timeOnShapePath );
				emitterpos.x = pointOnShape.x * 5 - 100;
				emitterpos.y = -pointOnShape.y * 5 + 400;
				// pointLight.position.copy( emitterpos );
				pointLight.position.x = emitterpos.x;
				pointLight.position.y = emitterpos.y;
				pointLight.position.z = 100;
				particles.vertices[ target ] = p.position;
				values_color[ target ].setHSL( hue, 0.6, 0.1 );
				pointLight.color.setHSL( hue, 0.8, 0.5 );
			};
		};
		var onParticleDead = function( particle ) {
			var target = particle.target;
			if ( target ) {
				// Hide the particle
				values_color[ target ].setRGB( 0, 0, 0 );
				particles.vertices[ target ].set( Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY );
				// Mark particle system as available by returning to pool
				Pool.add( particle.target );
			}
		};
		var engineLoopUpdate = function() {
		};
		sparksEmitter = new SPARKS.Emitter( new SPARKS.SteadyCounter( 500 ) );
		emitterpos = new THREE.Vector3( 0, 0, 0 );
		sparksEmitter.addInitializer( new SPARKS.Position( new SPARKS.PointZone( emitterpos ) ) );
		sparksEmitter.addInitializer( new SPARKS.Lifetime( 1, 15 ));
		sparksEmitter.addInitializer( new SPARKS.Target( null, setTargetParticle ) );
		sparksEmitter.addInitializer( new SPARKS.Velocity( new SPARKS.PointZone( new THREE.Vector3( 0, -5, 1 ) ) ) );
		// TOTRY Set velocity to move away from centroid
		sparksEmitter.addAction( new SPARKS.Age() );
		sparksEmitter.addAction( new SPARKS.Accelerate( 0, 0, -50 ) );
		sparksEmitter.addAction( new SPARKS.Move() );
		sparksEmitter.addAction( new SPARKS.RandomDrift( 90, 100, 2000 ) );
		sparksEmitter.addCallback( "created", onParticleCreated );
		sparksEmitter.addCallback( "dead", onParticleDead );
		//sparksEmitter.start();
		// End Particles
		renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		this.container.appendChild( renderer.domElement );
		// POST PROCESSING
		var effectFocus = new THREE.ShaderPass( THREE.FocusShader );
		var effectCopy = new THREE.ShaderPass( THREE.CopyShader );
		effectFilm = new THREE.FilmPass( 0.5, 0.25, 2048, false );
		var shaderBlur = THREE.TriangleBlurShader;
		effectBlurX = new THREE.ShaderPass( shaderBlur, 'texture' );
		effectBlurY = new THREE.ShaderPass( shaderBlur, 'texture' );
		var radius = 15;
		var blurAmountX = radius / window.innerWidth;
		var blurAmountY = radius / window.innerHeight;
		hblur = new THREE.ShaderPass( THREE.HorizontalBlurShader );
		vblur = new THREE.ShaderPass( THREE.VerticalBlurShader);
		hblur.uniforms[ 'h' ].value =  1 / window.innerWidth;
		vblur.uniforms[ 'v' ].value =  1 / window.innerHeight;
		effectBlurX.uniforms[ 'delta' ].value = new THREE.Vector2( blurAmountX, 0 );
		effectBlurY.uniforms[ 'delta' ].value = new THREE.Vector2( 0, blurAmountY );
		effectFocus.uniforms[ 'sampleDistance' ].value = 0.99; //0.94
		effectFocus.uniforms[ 'waveFactor' ].value = 0.003;  //0.00125
		var renderScene = new THREE.RenderPass( scene, camera );
		composer = new THREE.EffectComposer( renderer );
		composer.addPass( renderScene );
		composer.addPass( hblur );
		composer.addPass( vblur );
		// composer.addPass( effectBlurX );
		// composer.addPass( effectBlurY );
		// composer.addPass( effectCopy );
		// composer.addPass( effectFocus );
		// composer.addPass( effectFilm );
		vblur.renderToScreen = true;
		effectBlurY.renderToScreen = true;
		effectFocus.renderToScreen = true;
		effectCopy.renderToScreen = true;
		effectFilm.renderToScreen = true;
		//document.addEventListener( 'mousedown', onDocumentMouseDown, false );
		document.addEventListener( 'touchstart', onDocumentTouchStart, false );
		document.addEventListener( 'touchmove', onDocumentTouchMove, false );
		//
		window.addEventListener( 'resize', onWindowResize, false );
		function onWindowResize() {
			windowHalfX = window.innerWidth / 2;
			windowHalfY = window.innerHeight / 2;
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
			//
			hblur.uniforms[ 'h' ].value =  1 / window.innerWidth;
			vblur.uniforms[ 'v' ].value =  1 / window.innerHeight;
			var radius = 15;
			var blurAmountX = radius / window.innerWidth;
			var blurAmountY = radius / window.innerHeight;
			effectBlurX.uniforms[ 'delta' ].value = new THREE.Vector2( blurAmountX, 0 );
			effectBlurY.uniforms[ 'delta' ].value = new THREE.Vector2( 0, blurAmountY );
			composer.reset();
		}
		//
		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		/*function onDocumentMouseDown( event ) {
			event.preventDefault();
			mouseXOnMouseDown = event.clientX - windowHalfX;
			targetRotationOnMouseDown = targetRotation;
			if ( sparksEmitter.isRunning() ) {
				sparksEmitter.stop();
			} else {
				sparksEmitter.start();
			}
		}*/
		function onDocumentMouseMove( event ) {
			mouseX = event.clientX - windowHalfX;
			targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
		}
		function onDocumentTouchStart( event ) {
			if ( event.touches.length === 1 ) {
				event.preventDefault();
				mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
				targetRotationOnMouseDown = targetRotation;
			}
		}
		function onDocumentTouchMove( event ) {
			if ( event.touches.length === 1 ) {
				event.preventDefault();
				mouseX = event.touches[ 0 ].pageX - windowHalfX;
				targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;
			}
		}
		//
		this.stop = function(){
			loop = false;
			sparksEmitter.stop();
		}
		this.start = function(){
			loop = true;
			// See http://stackoverflow.com/questions/11504320/why-does-re-initializing-the-webgl-context-break-my-usage-of-three-effectcompose
			THREE.EffectComposer.camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 0, 1 );
			THREE.EffectComposer.quad = new THREE.Mesh( new THREE.PlaneGeometry( 2, 2 ), null );
			THREE.EffectComposer.scene = new THREE.Scene();
			THREE.EffectComposer.scene.add( THREE.EffectComposer.quad );
			//
			sparksEmitter.start();
			function animate() {
				if(loop){
					requestAnimationFrame( animate );
					render();
				}
			}
			animate();
		}
		function render() {
			delta = speed * clock.getDelta();
			particleCloud.geometry.verticesNeedUpdate = true;
			attributes.size.needsUpdate = true;
			attributes.pcolor.needsUpdate = true;
			// Pretty cool effect if you enable this
			// particleCloud.rotation.y += 0.05;
			group.rotation.y += ( targetRotation - group.rotation.y ) * 0.05;
			renderer.clear();
			// renderer.render( scene, camera );
			composer.render( 0.1 );
		}
	}
	function ThreeFx(image){ // image is an img or video element
		// Code from three.js examples (https://github.com/mrdoob/three.js/blob/master/examples/webgl_materials_video.html).
		// Modified by Roman Meleshin
		//var container;
		var camera, scene, renderer;
		var texture, material, mesh;
		var composer;
		var mouseX = 0;
		var mouseY = 0;
		var windowHalfX = window.innerWidth / 2;
		var windowHalfY = window.innerHeight / 2;
		var cube_count,
			meshes = [],
			materials = [],
			xgrid = 20,
			ygrid = 10;
		var loop;
		var $image = $(image);
		this.container = document.createElement( 'div' );
		//document.body.appendChild( container );
		$(this.container).addClass('bg three');
		$('#three-bg-wrap').append( this.container );
		camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
		camera.position.z = 500;
		scene = new THREE.Scene();
		var light = new THREE.DirectionalLight( 0xffffff );
		light.position.set( 0.5, 1, 1 ).normalize();
		scene.add( light );
		renderer = new THREE.WebGLRenderer( { antialias: false } );
		renderer.setSize( window.innerWidth, window.innerHeight );
		this.container.appendChild( renderer.domElement );
		texture = new THREE.Texture( image );
		texture.minFilter = THREE.LinearFilter;
		texture.magFilter = THREE.LinearFilter;
		texture.format = THREE.RGBFormat;
		texture.generateMipmaps = false;
		//
		var i, j, ux, uy, ox, oy,
			geometry,
			xsize, ysize;
		ux = 1 / xgrid;
		uy = 1 / ygrid;
		//xsize = 480 / xgrid;
		//ysize = 204 / ygrid;
		xsize = $image.width() / 1.5 / xgrid;
		ysize = $image.height() / 1.5 / ygrid;
		//
		var parameters = { color: 0xffffff, map: texture },
			material_base = new THREE.MeshLambertMaterial( parameters );
		renderer.initMaterial( material_base, scene.__lights, scene.fog );
		cube_count = 0;
		for ( i = 0; i < xgrid; i ++ )
		for ( j = 0; j < ygrid; j ++ ) {
			ox = i;
			oy = j;
			geometry = new THREE.CubeGeometry( xsize, ysize, xsize );
			change_uvs( geometry, ux, uy, ox, oy );
			materials[ cube_count ] = new THREE.MeshLambertMaterial( parameters );
			material = materials[ cube_count ];
			material.hue = i/xgrid;
			material.saturation = 1 - j/ygrid;
			material.color.setHSL( material.hue, material.saturation, 0.5 );
			mesh = new THREE.Mesh( geometry, material );
			mesh.position.x =   ( i - xgrid/2 ) * xsize;
			mesh.position.y =   ( j - ygrid/2 ) * ysize;
			mesh.position.z = 0;
			mesh.scale.x = mesh.scale.y = mesh.scale.z = 1;
			scene.add( mesh );
			mesh.dx = 0.001 * ( 0.5 - Math.random() );
			mesh.dy = 0.001 * ( 0.5 - Math.random() );
			meshes[ cube_count ] = mesh;
			cube_count += 1;
		}
		renderer.autoClear = false;
		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		// postprocessing
		var renderModel = new THREE.RenderPass( scene, camera );
		var effectBloom = new THREE.BloomPass( 1.3 );
		var effectCopy = new THREE.ShaderPass( THREE.CopyShader );
		effectCopy.renderToScreen = true;
		composer = new THREE.EffectComposer( renderer );
		composer.addPass( renderModel );
		composer.addPass( effectBloom );
		composer.addPass( effectCopy );
		//
		window.addEventListener( 'resize', onWindowResize, false );
		function onWindowResize() {
			windowHalfX = window.innerWidth / 2;
			windowHalfY = window.innerHeight / 2;
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
			composer.reset();
		}
		function change_uvs( geometry, unitx, unity, offsetx, offsety ) {
			var faceVertexUvs = geometry.faceVertexUvs[ 0 ];
			for ( var i = 0; i < faceVertexUvs.length; i ++ ) {
				var uvs = faceVertexUvs[ i ];
				for ( var j = 0; j < uvs.length; j ++ ) {
					var uv = uvs[ j ];
					uv.x = ( uv.x + offsetx ) * unitx;
					uv.y = ( uv.y + offsety ) * unity;
				}
			}
		}
		function onDocumentMouseMove(event) {
			//mouseX = ( event.clientX - windowHalfX );
			//mouseY = ( event.clientY - windowHalfY ) * 0.3;
			mouseX = ( event.clientX - windowHalfX )*0.5;
			mouseY = ( event.clientY - windowHalfY );
		}
		//
		this.stop = function(){
			loop = false;
		}
		this.start = function(){
			loop = true;
			// See http://stackoverflow.com/questions/11504320/why-does-re-initializing-the-webgl-context-break-my-usage-of-three-effectcompose
			THREE.EffectComposer.camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 0, 1 );
			THREE.EffectComposer.quad = new THREE.Mesh( new THREE.PlaneGeometry( 2, 2 ), null );
			THREE.EffectComposer.scene = new THREE.Scene();
			THREE.EffectComposer.scene.add( THREE.EffectComposer.quad );
			//
			function animate() {
				if(loop){
					requestAnimationFrame( animate );
					render();
				}
			}
			animate();
		}
		var h, counter = 1;
		function render() {
			var time = Date.now() * 0.00005;
			camera.position.x += ( mouseX - camera.position.x ) * 0.05;
			camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
			camera.lookAt( scene.position );
			if ( !image.readyState || image.readyState === image.HAVE_ENOUGH_DATA ) {
				if ( texture ) texture.needsUpdate = true;
			}
			for ( i = 0; i < cube_count; i ++ ) {
				material = materials[ i ];
				h = ( 360 * ( material.hue + time ) % 360 ) / 360;
				material.color.setHSL( h, material.saturation, 0.5 );
			}
			if ( counter % 1000 > 200 ) {
				for ( i = 0; i < cube_count; i ++ ) {
						mesh = meshes[ i ];
						mesh.rotation.x += 10 * mesh.dx;
						mesh.rotation.y += 10 * mesh.dy;
						mesh.position.x += 200 * mesh.dx;
						mesh.position.y += 200 * mesh.dy;
						mesh.position.z += 400 * mesh.dx;
				}
			}
			if ( counter % 1000 === 0 ) {
				for ( i = 0; i < cube_count; i ++ ) {
					mesh = meshes[ i ];
					mesh.dx *= -1;
					mesh.dy *= -1;
				}
			}
			counter ++;
			renderer.clear();
			composer.render();
		}
	}
	function ThreeParticlesDynamic(){
		// Code from three.js examples (https://github.com/mrdoob/three.js/blob/master/examples/webgl_materials_cubemap_balls_refraction.html).
		// Modified by Roman Meleshin
		//var container;
		var SCREEN_HEIGHT = window.innerHeight;
		var SCREEN_WIDTH = window.innerWidth;
		var container;
		var camera, scene, renderer, mesh, directionalLight;
		var parent, meshes = [], clonemeshes = [];
		var p;
		var aloader, bloader;
		var total = 0, totaln = 0;
		var composer, effectFocus;
		var clock = new THREE.Clock();
		var windowHalfX = window.innerWidth / 2;
		var windowHalfY = window.innerHeight / 2;
		var loop;
		this.paperClass = 'black-bg';
		//container = document.createElement( 'div' );
		//document.body.appendChild( container );
		this.container = document.createElement( 'div' );
		$(this.container).addClass('bg three');
		$('#three-bg-wrap').append( this.container );
		//
		camera = new THREE.PerspectiveCamera( 20, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 50000 );
		camera.position.set( 0, 700, 7000 );
		scene = new THREE.Scene();
		scene.fog = new THREE.FogExp2( 0x000104, 0.0000675 );
		camera.lookAt( scene.position );
		//
		aloader = new THREE.JSONLoader( );
		bloader = new THREE.BinaryLoader( true );
		//document.body.appendChild( bloader.statusDomElement );
		aloader.load( "/obj/terrain.js", function( geometry ) {
			createMesh( geometry, scene, 16.8, -11000, -200,  -5000, 0x00ff44, false );
			createMesh( geometry, scene, 16.8,  11000, -200, -15000, 0x00ff33, false );
			createMesh( geometry, scene, 16.8,      0, -200, -15000, 0x00ff33, false );
			createMesh( geometry, scene, 16.8,      0, -200,  15000, 0x00ff33, false );
			createMesh( geometry, scene, 16.8,  11000, -200,  15000, 0x00ff22, false );
			createMesh( geometry, scene, 16.8, -11000, -200,   5000, 0x00ff11, false );
			createMesh( geometry, scene, 16.8,  13000, -200,   5000, 0x00ff55, false );
			createMesh( geometry, scene, 16.8,  13000, -200,  -5000, 0x00ff66, false );
		} );
		bloader.load( "/obj/veyron/VeyronNoUv_bin.js", function( geometry ) { createMesh( geometry, scene, 6.8, 2200, -200, -100, 0x0055ff, false ) } );
		bloader.load( "/obj/female02/Female02_bin.js", function( geometry ) {
			createMesh( geometry, scene, 4.05, -1000, -350,    0, 0xffdd44, true );
			createMesh( geometry, scene, 4.05,     0, -350,    0, 0xffffff, true );
			createMesh( geometry, scene, 4.05,  1000, -350,  400, 0xff4422, true );
			createMesh( geometry, scene, 4.05,   250, -350, 1500, 0xff9955, true );
			createMesh( geometry, scene, 4.05,   250, -350, 2500, 0xff77dd, true );
		} );
		bloader.load( "/obj/male02/Male02_bin.js", function( geometry ) {
			createMesh( geometry, scene, 4.05,  -500, -350,   600, 0xff7744, true );
			createMesh( geometry, scene, 4.05,   500, -350,     0, 0xff5522, true );
			createMesh( geometry, scene, 4.05,  -250, -350,  1500, 0xff9922, true );
			createMesh( geometry, scene, 4.05,  -250, -350, -1500, 0xff99ff, true );
		} );
		renderer = new THREE.WebGLRenderer( { antialias: false } );
		renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
		renderer.autoClear = false;
		renderer.sortObjects = false;
		this.container.appendChild( renderer.domElement );
		renderer.setClearColor( scene.fog.color, 1 );
		parent = new THREE.Object3D();
		scene.add( parent );
		var grid = new THREE.ParticleSystem( new THREE.PlaneGeometry( 15000, 15000, 64, 64 ), new THREE.ParticleSystemMaterial( { color: 0xff0000, size: 10 } ) );
		grid.position.y = -400;
		grid.rotation.x = - Math.PI / 2;
		parent.add( grid );
		totaln += 1;
		total += grid.geometry.vertices.length;
		var renderModel = new THREE.RenderPass( scene, camera );
		var effectBloom = new THREE.BloomPass( 0.75 );
		var effectFilm = new THREE.FilmPass( 0.5, 0.5, 1448, false );
		effectFocus = new THREE.ShaderPass( THREE.FocusShader );
		effectFocus.uniforms[ "screenWidth" ].value = window.innerWidth;
		effectFocus.uniforms[ "screenHeight" ].value = window.innerHeight;
		effectFocus.renderToScreen = true;
		composer = new THREE.EffectComposer( renderer );
		composer.addPass( renderModel );
		composer.addPass( effectBloom );
		composer.addPass( effectFilm );
		composer.addPass( effectFocus );
		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		function onDocumentMouseMove( event ) {
			mouseX = event.clientX - windowHalfX;
			mouseY = event.clientY - windowHalfY;
			parent.rotation.y = (-mouseX - windowHalfX)*0.002;
			parent.rotation.x = -mouseY*0.002;
		}
		window.addEventListener( 'resize', onWindowResize, false );
		function onWindowResize( event ) {
			windowHalfX = window.innerWidth / 2;
			windowHalfY = window.innerHeight / 2;
			renderer.setSize( window.innerWidth, window.innerHeight );
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			camera.lookAt( scene.position );
			composer.reset();
			effectFocus.uniforms[ "screenWidth" ].value = window.innerWidth;
			effectFocus.uniforms[ "screenHeight" ].value = window.innerHeight;
		}
		function createMesh( originalGeometry, scene, scale, x, y, z, color, dynamic ) {
			var i, c;
			var vertices = originalGeometry.vertices;
			var vl = vertices.length;
			var geometry = new THREE.Geometry();
			var vertices_tmp = [];
			for ( i = 0; i < vl; i ++ ) {
				p = vertices[ i ];
				geometry.vertices[ i ] = p.clone();
				vertices_tmp[ i ] = [ p.x, p.y, p.z, 0, 0 ];
			}
			var clones = [
				[  6000, 0, -4000 ],
				[  5000, 0, 0 ],
				[  1000, 0, 5000 ],
				[  1000, 0, -5000 ],
				[  4000, 0, 2000 ],
				[ -4000, 0, 1000 ],
				[ -5000, 0, -5000 ],
				[ 0, 0, 0 ]
			];
			if ( dynamic ) {
				for ( i = 0; i < clones.length; i ++ ) {
					c = ( i < clones.length -1 ) ? 0x252525 : color;
					mesh = new THREE.ParticleSystem( geometry, new THREE.ParticleSystemMaterial( { size: 3, color: c } ) );
					mesh.scale.x = mesh.scale.y = mesh.scale.z = scale;
					mesh.position.x = x + clones[ i ][ 0 ];
					mesh.position.y = y + clones[ i ][ 1 ];
					mesh.position.z = z + clones[ i ][ 2 ];
					parent.add( mesh );
					clonemeshes.push( { mesh: mesh, speed: 0.5 + Math.random() } );
				}
				totaln += clones.length;
				total += clones.length * vl;
			} else {
				mesh = new THREE.ParticleSystem( geometry, new THREE.ParticleSystemMaterial( { size: 3, color: color } ) );
				mesh.scale.x = mesh.scale.y = mesh.scale.z = scale;
				mesh.position.x = x;
				mesh.position.y = y;
				mesh.position.z = z;
				parent.add( mesh );
				totaln += 1;
				total += vl;
			}
			//bloader.statusDomElement.style.display = "none";
			meshes.push( {
				mesh: mesh, vertices: geometry.vertices, vertices_tmp: vertices_tmp, vl: vl,
				down: 0, up: 0, direction: 0, speed: 35, delay: Math.floor( 200 + 200 * Math.random() ),
				started: false, start: Math.floor( 100 + 200 * Math.random() ),
				dynamic: dynamic
			} );
		}
		var j, jl, cm, data, vertices, vertices_tmp, vl, d, vt;
		this.stop = function(){loop = false;}
		this.start = function(){
			loop = true;
			// See http://stackoverflow.com/questions/11504320/why-does-re-initializing-the-webgl-context-break-my-usage-of-three-effectcompose
			THREE.EffectComposer.camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 0, 1 );
			THREE.EffectComposer.quad = new THREE.Mesh( new THREE.PlaneGeometry( 2, 2 ), null );
			THREE.EffectComposer.scene = new THREE.Scene();
			THREE.EffectComposer.scene.add( THREE.EffectComposer.quad );
			//
			function animate() {
				if(loop){
					requestAnimationFrame( animate );
					render();
				}
			}
			animate();
		}
		function render () {
			delta = 10 * clock.getDelta();
			delta = delta < 2 ? delta : 2;
			//parent.rotation.y += -0.02 * delta;
			for( j = 0, jl = clonemeshes.length; j < jl; j ++ ) {
				cm = clonemeshes[ j ];
				cm.mesh.rotation.y += -0.1 * delta * cm.speed;
			}
			for( j = 0, jl = meshes.length; j < jl; j ++ ) {
				data = meshes[ j ];
				mesh = data.mesh;
				vertices = data.vertices;
				vertices_tmp = data.vertices_tmp;
				vl = data.vl;
				if ( ! data.dynamic ) continue;
				if ( data.start > 0 ) {
					data.start -= 1;
				} else {
					if ( !data.started ) {
						data.direction = -1;
						data.started = true;
					}
				}
				for ( i = 0; i < vl; i ++ ) {
					p = vertices[ i ];
					vt = vertices_tmp[ i ];
					// falling down
					if ( data.direction < 0 ) {
						// var d = Math.abs( p.x - vertices_tmp[ i ][ 0 ] ) + Math.abs( p.y - vertices_tmp[ i ][ 1 ] ) + Math.abs( p.z - vertices_tmp[ i ][ 2 ] );
						// if ( d < 200 ) {
						if ( p.y > 0 ) {
							// p.y += data.direction * data.speed * delta;
							p.x += 1.5 * ( 0.50 - Math.random() ) * data.speed * delta;
							p.y += 3.0 * ( 0.25 - Math.random() ) * data.speed * delta;
							p.z += 1.5 * ( 0.50 - Math.random() ) * data.speed * delta;
						} else {
							if ( ! vt[ 3 ] ) {
								vt[ 3 ] = 1;
								data.down += 1;
							}
						}
					}
					// rising up
					if ( data.direction > 0 ) {
						//if ( p.y < vertices_tmp[ i ][ 1 ] ) {
						//	p.y += data.direction * data.speed * delta;
						d = Math.abs( p.x - vt[ 0 ] ) + Math.abs( p.y - vt[ 1 ] ) + Math.abs( p.z - vt[ 2 ] );
						if ( d > 1 ) {
							p.x += - ( p.x - vt[ 0 ] ) / d * data.speed * delta * ( 0.85 - Math.random() );
							p.y += - ( p.y - vt[ 1 ] ) / d * data.speed * delta * ( 1 + Math.random() );
							p.z += - ( p.z - vt[ 2 ] ) / d * data.speed * delta * ( 0.85 - Math.random() );
						} else {
							if ( ! vt[ 4 ] ) {
								vt[ 4 ] = 1;
								data.up += 1;
							}
						}
					}
				}
				// all down
				if ( data.down === vl ) {
					if ( data.delay === 0 ) {
						data.direction = 1;
						data.speed = 10;
						data.down = 0;
						data.delay = 320;
						for ( i = 0; i < vl; i ++ ) {
							vertices_tmp[ i ][ 3 ] = 0;
						}
					} else {
						data.delay -= 1;
					}
				}
				// all up
				if ( data.up === vl ) {
					if ( data.delay === 0 ) {
						data.direction = -1;
						data.speed = 35;
						data.up = 0;
						data.delay = 120;
						for ( i = 0; i < vl; i ++ ) {
							vertices_tmp[ i ][ 4 ] = 0;
						}
					} else {
						data.delay -= 1;
					}
				}
				mesh.geometry.verticesNeedUpdate = true;
			}
			renderer.clear();
			composer.render( 0.01 );
		}
	}
}); }).call(this);