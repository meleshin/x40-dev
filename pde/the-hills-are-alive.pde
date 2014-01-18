/* 
Source: http://studio.sketchpad.cc/sp/pad/view/ro.9mPgxOnQ7tpLO/rev.847
Creative Commons Attribution-Share Alike 3.0 License (http://creativecommons.org/licenses/by-sa/3.0/).
Modifed by Roman Meleshin, 2014
 */
// Pressing Control-R will render this sketch.
 
int i = 0; 
float lineAmp = .5;
int intDirection = 1;
void setup() {  // this is run once.   
    
    // set the background color
    background(255,255,255,0);
    
    // canvas size (Variable aren't evaluated. Integers only, please.)
    size(500, 500); 
      
    // smooth edges
    smooth();
    
    // limit the number of frames per second
    frameRate(30);
    
    // set the width of the line. 
    strokeWeight(1);
    
    
 
} 
 
void draw() {  // this is run repeatedly.  
     background(255,255,255,0);
    
    // set the color
    stroke(random(50), random(255), random(255), 100);
    
    // draw the line
    //line(mouseX, 0, random(0, width), height);
    
    float a = 0.0;
    float inc = TWO_PI/25.0;
    for(int i=0; i<150; i++) {
      line( mouseX, (mouseY), (i*3), 150 + (lineAmp * cos(a)*40.0) );
      a = a + inc;
      
      
      
        lineAmp += .0001 * intDirection;  
    
      
    }
    
    if(lineAmp > 1.5){
        intDirection = -1;
    };
    
    if(lineAmp < -1.5){
        intDirection = 1;
    };
    
    
    
}