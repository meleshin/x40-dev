!function(){$(function(){function a(){var a=function(){$(".navbar-collapse.in, #side-padding.in").collapse("hide"),$("#side-padding").css("height","")};$(".navbar-collapse").click("li",a),$(window).on("resize",a);var t=$(".page");t.wrapInner('<div class="col-sm-9 page-content"></div>'),$('<div class="col-sm-3"></div>').appendTo(t),t.wrapInner('<div class="page-paper"></div>'),$('<div class="film1"></div>').insertBefore($(".page-paper")),$('<div class="film2"></div>').insertAfter($(".page-paper")),$(".page-paper").scroll(function(){var a=Math.round($(this).scrollTop()/2);$(".film1, .film2").css("background-position","-"+a+"px 0");var t=Math.round($(this).scrollTop()/4),i=Math.abs((180+t)%360-180),n=Math.abs((360+t)%360-180),o=Math.abs((300+t)%360-180);Math.abs((400+t)%400-200),Math.abs((200+2*t)%400-200),Math.abs((200+t/2)%400-200),Modernizr.opacity?$("#side-nav").css({"background-color":"rgba("+i+", "+n+", "+o+", 0.7)"}):$("#side-nav").css({"background-color":"rgb("+i+", "+n+", "+o+")"})}),$("#side-nav a").each(function(){$(this).attr("data-hover",$(this).text())})}function t(){function a(){return u=u==d.length-1?0:u+1,d[u]}function t(){return v=v==g.length-1?0:v+1,g[v]}function i(a){var t=$($(a).attr("data-bg")),i="undefined"!=typeof m[a]&&m[a]<t.length-1?m[a]+1:0,n=$(".static-img");return n.length>0&&n[0].src===t[i].src&&(i=i<t.length-1?i+1:0),m[a]=i,$(t[i])}function o(o){function s(){$(".page-paper").each(function(){var a=$(this).getNiceScroll(0);a&&a.hide()}),$(".film1, .film2").css({"background-position":"0 0"}),$.support.transition&&$(".film1, .film2").transition({"background-position":"-2016px 0"},5e3);var t=a(),i=t[0];$.support.transition&&(i.opacity=0),$hash.css(i),r($hash,"anim-page");var o;if(n){var e=$("head");o=$('<style type="text/css">.page :before,.page :after{content:none !important}</style>'),e.append(o)}var s=t[1];$.support.transition&&(s.opacity=1),$hash.transition(s,l,function(){r($hash,"static-page");var a=$(p+" .page-paper"),t=a.getNiceScroll(0);t?t.show():a.niceScroll({zindex:1e5,autohidemode:!0,horizrailenabled:!0,cursoropacitymin:.6,cursoropacitymax:1,background:"transparent",cursorborder:"1px solid #fff",cursorwidth:"8px",cursorcolor:"rgb(200, 0, 0)"}),"none"!==$("nav").css("background-image")&&($("nav").css({"background-image":"none"}),$("#side-nav a").css("color",""),Modernizr.opacity&&(w.css({"background-color":"rgba(51, 51, 51,1)"}),w.transition({"background-color":k},1e3))),n&&o.remove()})}$("a").each(function(){$(this).parents("li").removeClass("active"),$(this).removeClass("active"),(this.href==o.href||this.href+"#"==o.href)&&($(this).parents("li").addClass("active"),$(this).addClass("active"))});var p=o.hash;if(p=p&&"#"!=p?p.replace("#!","#"):"#index",$hash=$(p),!($hash.length<1)){var f=i(p);if($(".static-img").length>0&&($("nav").css({"background-image":"url(/images/fuzz.gif)"}),$("#side-nav a.active").css("color","#FF7D8D")),"none"!=f.css("display"))s();else{var h=t(),d=h[0];$.support.transition&&(d.opacity=0),c(f,d,function(){f.css(d);var a=h[1];$.support.transition&&(a.opacity=1),c(f,a,function(){r(f,"anim-img"),f.transition(a,l,function(){if(c(f,a,function(){f.css(a)}),$("body").css("background-image","none"),!Modernizr.touch){null===b&&(b=new $.BigVideo,b.init());var t=f.attr("data-video");t||(t=f.attr("src").replace(/.jpg$/,".mp4")),b.show(t,{ambient:!0});var i=b.getPlayer(),n=!1;i.on("playing",function(){n||($(".static-img").css({display:"none"}),n=!0)}),i.on("waiting",function(){n&&console.log("waiting")})}e("static-page"),r(f,"static-img"),s()})})})}}}function e(a){$("."+a).each(function(){var t=$(this);t.css({display:"none"}),t.removeClass(a)})}function s(a,t){a.css({display:"block"}),a.removeClass("static-page static-img anim-page anim-img"),a.addClass(t)}function r(a,t){e(t),s(a,t)}function c(a,t,i){var n=new Image;n.onload=function(){var a,o,e=$(window).width(),s=$(window).height(),r=n.width,c=n.height,l=e/s,p=r/c;l>p?(a=e,o=a/p):(o=s,a=p*o),t.width=Math.round(a),t.height=Math.round(o),t["margin-top"]=0===parseInt(t.top)?Math.round((s-o)/2)+"px":"-100%"==t.top?Math.round(s-o)+"px":0,t["margin-left"]=0===parseInt(t.left)?Math.round((e-a)/2)+"px":"-100%"==t.left?Math.round(e-a)+"px":0,i(t)},n.src=a.attr("src")}var l=800,p=900,f=!1,h=!1,d=[[{left:"-100%",top:0},{left:0,top:0}],[{left:0,top:"-100%"},{left:0,top:0}],[{left:"100%",top:0},{left:0,top:0}],[{left:0,top:"100%"},{left:0,top:0}]],g=[[{left:0,top:"-100%"},{left:0,top:0}],[{left:"100%",top:0},{left:0,top:0}],[{left:0,top:"100%"},{left:0,top:0}],[{left:"-100%",top:0},{left:0,top:0}]],u=0,v=0,m={},b=null,y=null,w=$("#side-nav"),k=w.css("background-color");$("a").each(function(){this.hash&&(this.hash=this.hash.replace("#","#!"))}),o(location),$("a").click(function(a){function t(){h=!0,$("#on").addClass("inactive"),$("#off").css({display:"none"}),$("#on").css({display:"block"}),$("body").append('<div id="off-bg" style="z-index:'+p+';"><i class="fa fa-smile-o fa-lg"></i></div>'),Modernizr.opacity?($("#off-bg").css({opacity:0}),w.transition({opacity:.3},200),$("#off-bg").transition({opacity:1},300,function(){$("#off-bg").css("background-image","url(/images/fuzz.gif)"),f=!0,h=!1,$("#on").removeClass("inactive")})):($("#off-bg").css("background-image","url(/images/fuzz.gif)"),f=!0,h=!1,$("#on").removeClass("inactive")),y=location.hash}function i(){$("#off").addClass("inactive"),$("#off").css({display:"block"}),$("#on").css({display:"none"}),Modernizr.opacity?(w.transition({opacity:1},l/2),$("#off-bg").css("background-image","none").transition({opacity:0},l,function(){$("#off-bg").remove(),f=!1,$("#off").removeClass("inactive")})):($("#off-bg").remove(),f=!1,$("#off").removeClass("inactive"))}if("?off=1"===this.search)f||t(),a.preventDefault();else if("?on=1"==this.search)f&&i(),a.preventDefault();else if(h)a.preventDefault();else{f&&i();var n=location.hash?location.href.replace(location.hash,""):location.href.replace(/#$/,""),e=this.hash?this.href.replace(this.hash,""):this.href.replace(/#$/,"");this.hash&&e==n?(o(this),y=this.hash,location.hash=this.hash,a.preventDefault()):e==n&&(o(this),y="",location.hash="",a.preventDefault())}}),$(window).on("hashchange",function(){var a="#"==location.hash?"":location.hash;a!==y&&o(location)}),$(window).on("resize",function(){$(".static-img").each(function(){$img=$(this),c($img,{top:0,left:0},function(a){$img.css(a)})})})}function i(){if(!Modernizr.opacity){for(var a=[["#top-nav",70],["#top-nav .navbar-toggle",80],["#top-nav .navbar-toggle:focus",20],["#top-nav li.navbar-text",80],["#side-nav",75],[".page-paper",90],[".page-content i",72],["#off-bg i",20],[".center-menu, .page-box",70]],t=$("head"),i='<style type="text/css">',n=0;n<a.length;n++)i+=a[n][0]+' {-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity='+a[n][1]+')";}';i+="</style>",t.append($(i))}}var n=$("html").hasClass("ie8");$.support.transition||($.fn.transition=$.fn.animate),a(),t(),i()})}.call(this);