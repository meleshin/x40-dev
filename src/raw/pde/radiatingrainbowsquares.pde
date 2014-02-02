/* 
Source: http://hascanvas.com/radiatingrainbowsquares
The MIT License.
Modifed by Roman Meleshin, 2014
 */

int endX=50;
int endY=50;
float rotateAmount = 0;
float scaleSize =.1;

void setup(){ 
  size(); 
  background(255,255,255,0);
noStroke();


} 
 
void draw(){ 
  fill(color(random(0,255),random(0,255),random(0,255),60));
  translate(mouseX, mouseY);
  scale(scaleSize); 
rotate(radians(rotateAmount=rotateAmount+19));
    rect(0,0,endX,endY);
    scaleSize = pow(5,cos(scaleSize));
 }
