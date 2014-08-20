/* 
Source: http://studio.sketchpad.cc/sp/pad/view/ro.9tOhyUKLjRXzX/rev.7
Creative Commons Attribution-Share Alike 3.0 License (http://creativecommons.org/licenses/by-sa/3.0/).
Modifed by Roman Meleshin, 2014
 */

// This sketch builds on a prior work, "Untitled Sketch", created by an unnamed author
// http://sketchpad.cc/sp/pad/view/ro.3t9ecEWeTZP/rev.704
 
 
int a=0;
int fl=0;
int t=0;
float easing = 0.1;
int addCirc = 1;
int[] d = new int[15];
float[] x = new float[15];
float[] y = new float[15];
int[] tr = new int[15];
 
void setup() {
  //size(1000, 400);
  size($('.in .page-paper').width(), $('.in .page-paper').height());
  smooth(); 
  noStroke();
  frameRate(30);  
}
 
void draw() {
  background(255,255,255,0);
  if (fl==0)
  {
      fl=1;
      for (int a = 0;a<=30;a+=1)
      {
           //diameter
           d[a]=int(random(30,100));
           //x
           x[a]=int(random(d[a]/2,width-d[a]/2));
           //y
           y[a]=int(random(d[a]/2,height-d[a]/2));
           //transparancy
           tr[a]=int(random(0,254));
           
       } 
  }
 
  for (int a = 0;a<=30;a+=1)
  {
    if  ((mouseX!=0) && (mouseY!=0)){
        targetX = mouseX;  
        float dx = mouseX - x[a];  
        if(abs(dx) > 1) {  
            x[a] += dx * easing;  
        }  
    
        targetY = mouseY;  
        float dy = mouseY - y[a];  
        if(abs(dy) > 1) {  
          y[a] += dy * easing;  
        }  
     }
     fill(0,180,120,tr[a]/2);     
     ellipse(x[a],y[a],d[a],d[a]);
 
  }
  dx=0;
  for (int a=1;a<=30;a+=1)
  {
      dx=dx+abs(x[a-1]-x[a]);
  }
  if (dx<100){ fl=0; }
  
  t+=1;
  if (t%addCirc==0)
  {
     theCirc=int(random(0,14));
     //diameter
     d[theCirc]=int(random(30,100));
     //x
     x[theCirc]=int(random(d[theCirc]/2,width-d[theCirc]/2));
     //y
     y[theCirc]=int(random(d[theCirc]/2,height-d[theCirc]/2));
     //transparancy
     tr[theCirc]=int(random(0,254));
     t=0;
  }
 
}