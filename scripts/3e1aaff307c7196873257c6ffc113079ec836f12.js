!function(){$(function(){function design(){var a=function(){$(".navbar-collapse.in, #side-padding.in").collapse("hide"),$("#side-padding").css("height","")};$(".navbar-collapse").click("li",a),$(window).on("resize",a);var t=$(".page");t.wrapInner('<div class="col-sm-9 page-content"></div>'),$('<div class="col-sm-3"></div>').appendTo(t),t.wrapInner('<div class="page-paper"></div>'),$('<div class="film1"></div>').insertBefore($(".page-paper")),$('<div class="film2"></div>').insertAfter($(".page-paper")),$(".page-paper").scroll(function(){var a=Math.round($(this).scrollTop()/2);$(".film1, .film2").css("background-position","-"+a+"px 0");var t=Math.round($(this).scrollTop()/4),i=Math.abs((180+t)%360-180),e=Math.abs((360+t)%360-180),s=Math.abs((300+t)%360-180),n=Math.abs((400+t)%400-200),o=Math.abs((200+2*t)%400-200),r=Math.abs((200+t/2)%400-200);Modernizr.opacity?($("#side-nav").css({"background-color":"rgba("+i+", "+e+", "+s+", 0.7)"}),$(".nicescroll-rails div").css({"background-color":"rgba("+n+", "+o+", "+r+", 0.8)"})):($("#side-nav").css({"background-color":"rgb("+i+", "+e+", "+s+")"}),$(".nicescroll-rails div").css({"background-color":"rgb("+n+", "+o+", "+r+")"}))})}function navigation(){function pageAnim(){return pageCursor=pageCursor==pageAns.length-1?0:pageCursor+1,pageAns[pageCursor]}function imgAnim(){return imgCursor=imgCursor==imgAns.length-1?0:imgCursor+1,imgAns[imgCursor]}function bgImage(a){var t=$($(a).attr("data-bg")),i="undefined"!=typeof lastBackgrounds[a]&&lastBackgrounds[a]<t.length-1?lastBackgrounds[a]+1:0,e=$(".static-img");return e.length>0&&e[0].src===t[i].src&&(i=i<t.length-1?i+1:0),lastBackgrounds[a]=i,$(t[i])}function bgVideoUrl($img,func){var bandwReservRatio=1,dvStr=$img.attr("data-video");if(dvStr){var dv=eval("("+dvStr+")");bytesPS.get(function(a){for(var t=null,i=null,e=0;e<dv.urls.length;e++){(null===t||dv.urls[e].bytes<t.bytes)&&(t=dv.urls[e]);var s=bandwReservRatio*dv.urls[e].bytes/a;s<dv.sec&&(null===i||dv.urls[e].bytes>i.bytes)&&(i=dv.urls[e])}func(null===i?t.url:i.url)})}else func($img.attr("src").replace(/.jpg$/,".mp4"))}function nav(a){function t(){$(".page-paper").getNiceScroll().remove(),$(".film1, .film2").css({"background-position":"0 0"}),$.support.transition&&$(".film1, .film2").transition({"background-position":"-2016px 0"},5e3);var a=pageAnim(),t=a[0];$.support.transition&&(t.opacity=0),$hash.css(t),takeLayer($hash,"anim-page");var e;if(isIE8){var s=$("head");e=$('<style type="text/css">.page :before,.page :after{content:none !important}</style>'),s.append(e)}var n=a[1];$.support.transition&&(n.opacity=1),$hash.transition(n,duration,function(){takeLayer($hash,"static-page"),$(i+" .page-paper").niceScroll({zindex:1e5,autohidemode:!0,horizrailenabled:!1,cursoropacitymin:.6,cursoropacitymax:1,background:"transparent",cursorborder:"1px solid #fff",cursorwidth:"8px",cursorcolor:"rgb(200, 0, 0)"}),"none"!==$("nav").css("background-image")&&($("nav").css({"background-image":"none"}),Modernizr.opacity&&($sideNav.css({"background-color":"rgba(51, 51, 51,1)"}),$sideNav.transition({"background-color":sideNavBgColor},1e3))),isIE8&&e.remove()})}$("a").each(function(){$(this).parents("li").removeClass("active"),$(this).removeClass("active"),(this.href==a.href||this.href+"#"==a.href)&&($(this).parents("li").addClass("active"),$(this).addClass("active"))});var i=a.hash;if(i=i&&"#"!=i?i.replace("#!","#"):"#index",$hash=$(i),!($hash.length<1)){var e=bgImage(i);if($(".static-img").length>0&&$("nav").css({"background-image":"url(/images/fuzz.gif)"}),"none"!=e.css("display"))t();else{var s=imgAnim(),n=s[0];$.support.transition&&(n.opacity=0),adjustImageCss(e,n,function(){e.css(n);var a=s[1];$.support.transition&&(a.opacity=1),adjustImageCss(e,a,function(){takeLayer(e,"anim-img"),e.transition(a,duration,function(){adjustImageCss(e,a,function(){e.css(a)}),$("body").css("background-image","none"),Modernizr.touch||(null===BV&&(BV=new $.BigVideo,BV.init()),bgVideoUrl(e,function(a){BV.show(a,{ambient:!0});var t=BV.getPlayer(),i=!1;t.on("playing",function(){i||($(".static-img").css({display:"none"}),i=!0)}),t.on("waiting",function(){i&&console.log("waiting")})})),cleanLayer("static-page"),takeLayer(e,"static-img"),t()})})})}}}function cleanLayer(a){$("."+a).each(function(){var t=$(this);t.css({display:"none"}),t.removeClass(a)})}function toLayer(a,t){a.css({display:"block"}),a.removeClass("static-page static-img anim-page anim-img"),a.addClass(t)}function takeLayer(a,t){cleanLayer(t),toLayer(a,t)}function adjustImageCss(a,t,i){var e=new Image;e.onload=function(){var a,s,n=$(window).width(),o=$(window).height(),r=e.width,c=e.height,l=n/o,f=r/c;l>f?(a=n,s=a/f):(s=o,a=f*s),t.width=Math.round(a),t.height=Math.round(s),t["margin-top"]=0===parseInt(t.top)?Math.round((o-s)/2)+"px":"-100%"==t.top?Math.round(o-s)+"px":0,t["margin-left"]=0===parseInt(t.left)?Math.round((n-a)/2)+"px":"-100%"==t.left?Math.round(n-a)+"px":0,i(t)},e.src=a.attr("src")}var duration=800,zOff=900,zStaticImg=500,zStaticPage=600,zAnimImg=700,zAnimPage=800,isOff=!1,isPreOff=!1,pageAns=[[{left:"-100%",top:0},{left:0,top:0}],[{left:0,top:"-100%"},{left:0,top:0}],[{left:"100%",top:0},{left:0,top:0}],[{left:0,top:"100%"},{left:0,top:0}]],imgAns=[[{left:0,top:"-100%"},{left:0,top:0}],[{left:"100%",top:0},{left:0,top:0}],[{left:0,top:"100%"},{left:0,top:0}],[{left:"-100%",top:0},{left:0,top:0}]],pageCursor=0,imgCursor=0,lastBackgrounds={},BV=null,clickHash=null,$sideNav=$("#side-nav"),sideNavBgColor=$sideNav.css("background-color"),BytesPerSec=function(){var a=this;this.q=[];var t=$.cookie("bytesPerSec");this.bytesPerSec=t?t:null,null===this.bytesPerSec&&$(window).load(function(){"/bandwidth.jpg?n="+i+"_"+Math.random();var t,i=null;t=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");var i=(new Date).getTime();i=(new Date).getTime(),console.log("Bandwidth testing..."),$.ajax({url:"/bandwidth.jpg?n="+i+"_"+Math.random(),cache:!1,success:function(t,e,s){var n=(new Date).getTime(),o=(n-i)/1e3;0==o&&(o=.001);var r=s.responseText.length;a.bytesPerSec=r/o,$.cookie("bytesPerSec",a.bytesPerSec),console.log("Bandwidth: "+(8*(a.bytesPerSec/1024/1024)).toFixed(2)+" Mb/sec ("+r+" bytes in "+o.toFixed(2)+" sec)."),a.runQ()}})}),this.get=function(a){this.q.push(a),this.runQ()},this.runQ=function(){if(null!==this.bytesPerSec){for(var a=0;a<this.q.length;a++)this.q[a](this.bytesPerSec);this.q=[]}}},bytesPS=new BytesPerSec;$("a").each(function(){this.hash&&(this.hash=this.hash.replace("#","#!"))}),nav(location),$("a").click(function(a){function t(){isPreOff=!0,$("#on").addClass("inactive"),$("#off").css({display:"none"}),$("#on").css({display:"block"}),$("body").append('<div id="off-bg" style="z-index:'+zOff+';"><i class="fa fa-smile-o fa-lg"></i></div>'),Modernizr.opacity?($("#off-bg").css({opacity:0}),$sideNav.transition({opacity:.3},200),$("#off-bg").transition({opacity:1},300,function(){$("#off-bg").css("background-image","url(/images/fuzz.gif)"),isOff=!0,isPreOff=!1,$("#on").removeClass("inactive")})):($("#off-bg").css("background-image","url(/images/fuzz.gif)"),isOff=!0,isPreOff=!1,$("#on").removeClass("inactive")),clickHash=location.hash}function i(){$("#off").addClass("inactive"),$("#off").css({display:"block"}),$("#on").css({display:"none"}),Modernizr.opacity?($sideNav.transition({opacity:1},duration/2),$("#off-bg").css("background-image","none").transition({opacity:0},duration,function(){$("#off-bg").remove(),isOff=!1,$("#off").removeClass("inactive")})):($("#off-bg").remove(),isOff=!1,$("#off").removeClass("inactive"))}if("?off=1"===this.search)isOff||t(),a.preventDefault();else if("?on=1"==this.search)isOff&&i(),a.preventDefault();else if(isPreOff)a.preventDefault();else{isOff&&i();var e=location.hash?location.href.replace(location.hash,""):location.href.replace(/#$/,""),s=this.hash?this.href.replace(this.hash,""):this.href.replace(/#$/,"");this.hash&&s==e?(nav(this),clickHash=this.hash,location.hash=this.hash,a.preventDefault()):s==e&&(nav(this),clickHash="",location.hash="",a.preventDefault())}}),$(window).on("hashchange",function(){var a="#"==location.hash?"":location.hash;a!==clickHash&&nav(location)}),$(window).on("resize",function(){$(".static-img").each(function(){$img=$(this),adjustImageCss($img,{top:0,left:0},function(a){$img.css(a)})})})}function opacityFix(){if(!Modernizr.opacity){for(var a=[["#top-nav",70],["#top-nav .navbar-toggle",80],["#top-nav .navbar-toggle:focus",20],["#top-nav li.navbar-text",80],["#side-nav",75],[".page-paper",90],[".page-content i",72],["#off-bg i",20],[".center-menu, .page-box",70]],t=$("head"),i='<style type="text/css">',e=0;e<a.length;e++)i+=a[e][0]+' {-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity='+a[e][1]+')";}';i+="</style>",t.append($(i))}}var isIE8=$("html").hasClass("ie8");$.support.transition||($.fn.transition=$.fn.animate),design(),navigation(),opacityFix()})}.call(this);