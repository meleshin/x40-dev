!function(){$(function(){function a(){var a=function(){$(".navbar-collapse.in, #side-padding.in").collapse("hide"),$("#side-padding").css("height","")};$(".navbar-collapse").click("li",a),$(window).on("resize",a);var t=$(".page");t.wrapInner('<div class="col-sm-9 page-content"></div>'),$('<div class="col-sm-3"></div>').appendTo(t),t.wrapInner('<div class="page-paper"></div>'),$('<div class="film1"></div>').insertBefore($(".page-paper")),$('<div class="film2"></div>').insertAfter($(".page-paper")),$(".page-paper").scroll(function(){var a=Math.round($(this).scrollTop()/4),t=Math.abs((180+a)%360-180),e=Math.abs((360+a)%360-180),i=Math.abs((300+a)%360-180);Modernizr.opacity?$("#side-nav").css({"background-color":"rgba("+t+", "+e+", "+i+", 0.7)"}):$("#side-nav").css({"background-color":"rgb("+t+", "+e+", "+i+")"})}),$("#side-nav a").each(function(){$(this).attr("data-hover",$(this).text())})}function t(){function a(){return v=v==d.length-1?0:v+1,d[v]}function t(){return m=m==u.length-1?0:m+1,u[m]}function i(a){var t=$($(a).attr("data-bg")),e="undefined"!=typeof b[a]&&b[a]<t.length-1?b[a]+1:0,i=$(".static-img");return i.length>0&&i[0].src===t[e].src&&(e=e<t.length-1?e+1:0),b[a]=e,$(t[e])}function s(s){function c(){$(".page-paper").each(function(){var a=$(this).getNiceScroll(0);a&&a.hide()}),$(h+" .film1, "+h+" .film2");var t=a(),i=t[0];$.support.transition&&Modernizr.opacity&&(i.opacity=0),$hash.css(i),p($hash,"anim-page");var s;if(o){var r=$("head");s=$('<style type="text/css">.page :before,.page :after{content:none !important}</style>'),r.append(s)}var c=t[1];$.support.transition&&Modernizr.opacity&&(c.opacity=1),e(),$hash.transition(c,n,"cubic-bezier(0.215, 0.610, 0.355, 1.000)",function(){p($hash,"static-page"),$.support.transition&&Modernizr.opacity&&$hash.transition({opacity:1},n);var a=$(h+" .page-paper"),t=a.getNiceScroll(0);t?t.show():a.niceScroll({zindex:1e5,autohidemode:!0,horizrailenabled:!0,cursoropacitymin:.6,cursoropacitymax:1,background:"transparent",cursorborder:"1px solid #fff",cursorwidth:"8px",cursorcolor:"rgb(200, 0, 0)"}),"none"!==$("nav").css("background-image")&&($("nav").css({"background-image":"none"}),$("#side-nav a").css("color",""),Modernizr.opacity&&(z.css({"background-color":"rgba(51, 51, 51,1)"}),z.transition({"background-color":M},1e3))),o&&s.remove()})}$("a").each(function(){$(this).parents("li").removeClass("active"),$(this).removeClass("active"),(this.href==s.href||this.href+"#"==s.href)&&($(this).parents("li").addClass("active"),$(this).addClass("active"))});var h=s.hash;if(h=h&&"#"!=h?h.replace("#!","#"):"#index",$hash=$(h),!($hash.length<1)){var f=i(h);if($(".static-img").length>0&&($("nav").css({"background-image":"url(/images/fuzz.gif)"}),$("#side-nav a.active").css("color","#FF7D8D")),"none"!=f.css("display"))c();else{var g=t(),d=g[0];$.support.transition&&Modernizr.opacity&&(d.opacity=0),l(f,d,function(){f.css(d);var a=g[1];$.support.transition&&Modernizr.opacity&&(a.opacity=1),l(f,a,function(){p(f,"anim-img"),f.transition(a,n,function(){if(l(f,a,function(){f.css(a)}),$("body").css("background-image","none"),!Modernizr.touch){null===y&&(y=new $.BigVideo,y.init());var t=f.attr("data-video");t||(t=f.attr("src").replace(/.jpg$/,".mp4")),y.show(t,{ambient:!0});var e=y.getPlayer(),i=!1;e.on("playing",function(){i||($(".static-img").css({display:"none"}),i=!0)}),e.on("waiting",function(){i&&console.log("waiting")})}r("static-page"),p(f,"static-img"),c()})})})}}}function r(a){$("."+a).each(function(){var t=$(this);t.css({display:"none"}),t.removeClass(a)})}function c(a,t){a.css({display:"block"}),a.removeClass("static-page static-img anim-page anim-img"),a.addClass(t)}function p(a,t){r(t),c(a,t)}function l(a,t,e){var i=new Image;i.onload=function(){var a,n,o=$(window).width(),s=$(window).height(),r=i.width,c=i.height,p=o/s,l=r/c;p>l?(a=o,n=a/l):(n=s,a=l*n),t.width=Math.round(a),t.height=Math.round(n),t["margin-top"]=0===parseInt(t.top)?Math.round((s-n)/2)+"px":"-100%"==t.top?Math.round(s-n)+"px":0,t["margin-left"]=0===parseInt(t.left)?Math.round((o-a)/2)+"px":"-100%"==t.left?Math.round(o-a)+"px":0,e(t)},i.src=a.attr("src")}var h=900,f=!1,g=!1,d=[[{left:"-100%",top:0},{left:0,top:0}],[{left:0,top:"-100%"},{left:0,top:0}],[{left:"100%",top:0},{left:0,top:0}],[{left:0,top:"100%"},{left:0,top:0}]],u=[[{left:0,top:"-100%"},{left:0,top:0}],[{left:"100%",top:0},{left:0,top:0}],[{left:0,top:"100%"},{left:0,top:0}],[{left:"-100%",top:0},{left:0,top:0}]],v=0,m=0,b={},y=null,w=null,z=$("#side-nav"),M=z.css("background-color");$("a").each(function(){this.hash&&(this.hash=this.hash.replace("#","#!"))}),s(location),$("a").click(function(a){function t(){g=!0,$("#on a").addClass("inactive"),$("#off").css({display:"none"}),$("#on").css({display:"block"}),$("body").append('<div id="off-bg" style="z-index:'+h+';"><i class="fa fa-smile-o fa-lg"></i></div>'),Modernizr.opacity?($("#off-bg").css({opacity:0}),z.transition({opacity:.3},200),$("#off-bg").transition({opacity:1},300,function(){$("#off-bg").css("background-image","url(/images/fuzz.gif)"),f=!0,g=!1,$("#on a").removeClass("inactive")})):($("#off-bg").css("background-image","url(/images/fuzz.gif)"),f=!0,g=!1,$("#on a").removeClass("inactive")),w=location.hash}function e(){$("#off a").addClass("inactive"),$("#off").css({display:"block"}),$("#on").css({display:"none"}),Modernizr.opacity?(z.transition({opacity:1},n/2),$("#off-bg").css("background-image","none").transition({opacity:0},n,function(){$("#off-bg").remove(),f=!1,$("#off a").removeClass("inactive")})):($("#off-bg").remove(),f=!1,$("#off a").removeClass("inactive"))}if("?off=1"===this.search)f||t(),a.preventDefault();else if("?on=1"==this.search)f&&e(),a.preventDefault();else if(g)a.preventDefault();else{f&&e();var i=location.hash?location.href.replace(location.hash,""):location.href.replace(/#$/,""),o=this.hash?this.href.replace(this.hash,""):this.href.replace(/#$/,"");this.hash&&o==i?(s(this),w=this.hash,location.hash=this.hash,a.preventDefault()):o==i&&(s(this),w="",location.hash="",a.preventDefault())}}),$(window).on("hashchange",function(){var a="#"==location.hash?"":location.hash;a!==w&&s(location)}),$(window).on("resize",function(){$(".static-img").each(function(){$img=$(this),l($img,{top:0,left:0},function(a){$img.css(a)})})})}function e(){var a=$("#sequence");if(a.length>0){var t={nextButton:!0,prevButton:!0,pagination:!0,animateStartingFrameIn:!0,autoPlay:!0,autoPlayDelay:3e3,preloader:!0,preloadTheseFrames:[1],preloadTheseImages:["/images/newbigjob-t.png","/images/newbigjob-m-t.png","/images/mobivisor-t.png","/images/surwave-t.png","/images/surwave-m-t.png","/images/vreggy-t.png","/images/sigmahome-t.png","/images/hitechhow-t.png","/images/hth-crm-t.png","/images/frescostudio-t.png"]};$("#sequence").sequence(t).data("sequence");var e=function(){var a=1051,t=450,e=114,i=40+$("#sequence .sequence-pagination").height(),n=$("#sequence .sequence-canvas").width(),o=i+(t-e)*n/a,s=$(window).width();500>=s&&(o+=Math.round(80*s/500)),$("#sequence").css("height",o+"px")};e(),$(window).on("resize",e),$("#sequence, #sequence-other").transition({opacity:1},3*n)}}function i(){if(!Modernizr.opacity){for(var a=[["#top-nav",70],["#top-nav .navbar-toggle",80],["#top-nav .navbar-toggle:focus",20],["#top-nav li.navbar-text",80],["#side-nav",75],[".page-paper",90],[".page-content i",72],["#off-bg i",20],[".center-menu, .page-box",70],[".descr",70]],t=$("head"),e='<style type="text/css">',i=0;i<a.length;i++)e+=a[i][0]+' {-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity='+a[i][1]+')";}';e+="</style>",t.append($(e))}}var n=800,o=$("html").hasClass("ie8");$.support.transition||($.fn.transition=$.fn.animate),a(),t(),i()})}.call(this);