/* 
Source: http://studio.sketchpad.cc/sp/pad/view/ro.9NBthKnaxFtfu/rev.907
Creative Commons Attribution-Share Alike 3.0 License (http://creativecommons.org/licenses/by-sa/3.0/).
Modifed by Roman Meleshin, 2014
 */

 void setup() { 
    size(400, 500);
    background(255,255,255,0);
    stroke(0, 180, 120, 55);
    strokeWeight(1);
    initX=width/2;
    initY=height/2;
    smooth();
    //frameRate(60);
}  
 
int initX, initY;
float xoff = 0.0;
 
void draw(){
	stroke(0, 180, 120, 55);
    if (random(1000)>999){
        background(255,255,255,0);
    }
    int res=100;
    int circle=360;
    float x, y, addX, addY;
    float a = 0.0;
    initX=width/2;
    initY=height/2;
    if (random(2)>0) {
        int mX=mouseX + (noise(xoff)-0.5)*mouseX - initX;
        int mY=mouseY + (noise(xoff+1.1)-0.5)*mouseY - initY;
    } else {
        int mX=mouseX-initX;
        int mY=mouseY-initY;
    }
    xoff+=0.01;
    int radX=mX/res/0.35;
    int radY=mY/res/0.35;
    float inc = TWO_PI/(res*2);
    for(int i=0; i<res; i+=180/circle) {
        x=(initX+sin(a+radX)*radX);
        y=(initY+cos(a+radY)*radY);
        addX=mX/res;
        addY=mY/res;
        line(initX, initY, x+addX, y+addY);
 
        a += inc;
        initX=x+addX;
        initY=y+addY;
    }
}