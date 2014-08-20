/* 
Source: http://studio.sketchpad.cc/sp/pad/view/ro.9PJtfYtVcODIz/rev.2823
Creative Commons Attribution-Share Alike 3.0 License (http://creativecommons.org/licenses/by-sa/3.0/).
Modifed by Roman Meleshin, 2014
 */

// Pressing Control-R will render this sketch.
void setup() {
    background(255,255,255,0);
    size(400, 500);
    smooth();
    
} 
float time = 0;
float dis,xDis,yDis;
float xStart,yStart,xEnd,yEnd,xMid,yMid;
float xNois,yNois;
 
void draw() { 
    xStart = width/2;
    yStart = 0;
    xEnd = width/2;
    yEnd = height;
    xDis = norm(abs(xStart-xEnd),0,width);
    yDis = norm(abs(yStart-yEnd),0,height);
    dis  = norm(dist(xStart, yStart, xEnd, yEnd),-1000,1000)*300;
 
    background(255,255,255,0);
    
    //ellipse(xStart, yStart,30, 30);
    //ellipse(xEnd,   yEnd  ,30, 30);
    noFill();
    strokeWeight(1);
    beginShape();
    curveVertex(xStart, yStart); // control point  (first)
    curveVertex(xStart, yStart); // point of curve (first)
    
    int count = 10;
    count++;
    for (float j=count; j>=0; j-=0.25) {
        for (float i=1.0; i<=count; i+=1.5) {
          float step = i/count;
          
          xMid = lerp(xStart, xEnd,step);
          yMid = lerp(yStart, yEnd,step);
      
          float smoothing = (i<=count/2) ? step : (1-step);
      
          xNois= ((sin(time+i*.2 +j/10)*2)-1)*dis*yDis*smoothing*j;
          yNois= ((cos(time+i*.2 +j/10)*2)-1)*dis*xDis*smoothing*j;
          curveVertex(xMid+xNois, yMid+yNois); //mid control point 
          //point(xMid, yMid);
          
          strokeWeight(.5);
          fill(255,0,0, 50);
          
          if(i <= count/2 && i >= count/2 || j%2==0){
              stroke(0,0,255,50);
              line(mouseX, mouseY, xMid+xNois, yMid+yNois);
              ellipse(xMid+xNois, yMid+yNois, 5, 5);
              stroke(0,0,0,50);
          }
          
          strokeWeight(0.5);
          noFill();
        }
    }
    curveVertex(xEnd, yEnd);   // point of curve (last)
    curveVertex(xEnd, yEnd);   // control point  (last)
    endShape();
    
    text ( "Y = "+mouseY,10,height-20); 
    text ( "X = "+mouseX,10,height-5); 
    time-=.01;
}