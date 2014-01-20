/* 
Source: http://hascanvas.com/motionfrequency
The MIT License.
Modifed by Roman Meleshin, 2014
 */

// Mouse-Motion to Frequency
// By F1LT3R - http://groups.google.com/group/processingjs

void setup(){
  //size();
  size($('.in .page-paper').width(), $('.in .page-paper').height());
  strokeWeight(5);
  stroke(255, 255, 255, 100);
  noFill();
}

// Generic Looping Variables
int n, i;

// Controls the morph speed of the curve
int rate=10;
int sampleRate = 10;

// Set Last Mouse X & Y for dist check
int lastMouseX, lastMouseY;
int distX, distY, lastDistXY;

// Set sample rate and buffer arrays
int sampleRate = 16, sampleLoc = 0;
int lastSampleRate = sampleRate;
int[] distXY = new int[sampleRate];
int[] nextDistXY = new int[sampleRate];

int offset = 60;

// Fill original target buffer
for (i=0; i < sampleRate; i++) { 
  distXY[i] = height / 2;
} 

void draw(){ 
  if (sampleRate){        
    sampleRate = sampleRate;    
    // If the sample rate has changed since last draw...    
    if (sampleRate!=lastSampleRate){      
      // Re-dimension buffers and transport indcator
      lastSampleRate = sampleRate;
      distXY = new int[sampleRate];
      nextDistXY = new int[sampleRate];
      sampleLoc=0;      
    }    
  }
  
  // Set background color to to amplitude of sampleLoc   
  colorDelay = (255/sampleRate) * distXY[sampleLoc];  
  background(255,255,255,0);
  
  // Get mouse inputs
  readMouse();
  
  // Loop through buffer for length of sample rate
  sampleLoc ++;
  
  // Reset playback location when end of buffer reached 
  if (sampleLoc==sampleRate){sampleLoc = 0;}
  
  // Loop through samples
  for (i=0; i < sampleRate; i++){      
 
    // Morph old curve into new curve
    if (nextDistXY[i] < distXY[i]) {    
        distXY[i] = distXY[i] - ((distXY[i] - nextDistXY[i]) / rate);
    } else if (nextDistXY[i] > distXY[i]){
        distXY[i] = distXY[i] + ((nextDistXY[i] - distXY[i]) / rate);
    }
  }
  
  // Draw curve
  noFill();
   stroke(255, 255, 255, 100);
  strokeWeight(10);
  beginShape();
  curveVertex( (width/(sampleRate-1))*0, height/2 - distXY[0] + offset );
  for (n=0; n < sampleRate; n++){    
    curveVertex( (width/(sampleRate-1))*n, height/2 - distXY[n] + offset );    
  }
  curveVertex( (width/(sampleRate-1))*n-1, height/2 - distXY[n-1] + offset );
  endShape();

}

void readMouse(){  
  // Check lastMouseX has value to stop initial jump   
  if (!isNaN(lastMouseX)){               
    
    // Calculate MouseX Movement Distance
    if (mouseX > lastMouseX){distX = mouseX - lastMouseX;}
    else {distX = lastMouseX - mouseX;}
    
    // Calculate MouseY Movement Distance
    if (mouseY > lastMouseY){distY = mouseY - lastMouseY;}
    else {distY = lastMouseY - mouseY;}
    
    //Combine total distance traveled
    nextDistXY[sampleLoc] = distX + distY;
    lastDistXY = distX + distY;    
  }
  
  // Setup lastMouseX & Y for next movement
  lastMouseX = mouseX;
  lastMouseY = mouseY;
}
