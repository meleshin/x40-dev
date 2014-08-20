/* 
Source: http://studio.sketchpad.cc/sp/pad/view/ro.91c3mdwvHgDhp/rev.119
Creative Commons Attribution-Share Alike 3.0 License (http://creativecommons.org/licenses/by-sa/3.0/).
Modifed by Roman Meleshin, 2014
 */

// Pressing Control-R will render this sketch.
 
float i = 0; 
 
void setup() {  // this is run once.   
    
    // set the background color
    background(255,255,255,0);
    
    // canvas size (Variable aren't evaluated. Integers only, please.)
    size(300, 300); 
      
    // smooth edges
    smooth();
    
    // limit the number of frames per second
    frameRate(30);
    
    // set the width of the line. 
    strokeWeight(12);
} 
 
void draw() {  // this is run repeatedly.  
 
    // set the color
    stroke(i % 256, (i/2) % 256, (i/4) % 256, 100);
    
    // draw the line
    float x = cos(i/100.0) * 10 + mouseX;
    float y = sin(i/100.0) * 10 + mouseY;
    
    line(x, y, mouseX, mouseY);
    
    i++;
    
}
