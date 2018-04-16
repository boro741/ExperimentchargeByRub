var attractor;
var attractorV;

var myBallCord;
var myBallCord2;
var myBallCord3;
var myBallZ; 

var rubFlag = false;
var moveFlag = true;

/* Scene Dimensions (in meters: at z = 0) */
var mySceneTLX;        /* Top Left corner X coordinate */
var mySceneTLY;        /* Top Left corner Y coordinate */
var mySceneBRX;        /* Bottom Right corner X coordinate */
var mySceneBRY;        /* Bottom Right corner Y coordinate */
var mySceneW;          /* Scene Width */
var mySceneH;          /* Scene Height */
var myCenterX;         /* Scene Center X coordinate */
var myCenterY;         /* Scene Center Y coordinate */





// Loading the components
function loadExperimentElements(){


    PIEsetExperimentTitle("Charging By Rubbing");
    PIEsetDeveloperName("Pavan Lal Boro");

    initialiseHelp();
    initialiseInfo();

    initialiseScene();
    resetExperiment();

   var rubButton =  PIEaddButton('Rub the Object');
   rubButton.addEventListener("click", function(){
        rubFlag = true;
        console.log('Clicked');
   });


    
    PIEsetAreaOfInterest(mySceneTLX, mySceneTLY, mySceneBRX, mySceneBRY);

    observationTable();
}

// Physics
function updateExperimentElements(t, dt){

    if(rubFlag === true){
        initialiseParticleAttraction();
    }
   
}




function initialiseParticleAttraction(){
    attract(myBallCord,attractorV);
    plane.position.set(myBallCord.getComponent(0),myBallCord.getComponent(1),myBallCord.getComponent(2));

    attract(myBallCord2,attractorV);
    plane2.position.set(myBallCord2.getComponent(0),myBallCord2.getComponent(1),partZ);

    attract(myBallCord3,attractorV);
    plane3.position.set(myBallCord3.getComponent(0),myBallCord3.getComponent(1),partZ);
}



var vel = new THREE.Vector3(0,0,myBallZ);
var acc = new THREE.Vector3();

function attract(particle,target){
    var force = new THREE.Vector3();

    force.x = Math.round( (   force.x + 1 ) * mySceneW / 2 );
    force.y = Math.round( ( - force.y + 1 ) * mySceneH / 2 );
    force.z = myBallZ;

    force.subVectors(target,particle);

    var dist = Math.round(force.length());
    console.log(dist);
    
    var strength = 0.009 ;

    force.setLength(strength);

    if(dist > 0 && dist <= 3 && moveFlag === true){   
        if(dist <= 1){
            console.log('Stop');
            moveFlag = false;
            vel.set(0,0,0);
            acc.set(0,0,0);
        } else{
            // Updating
            myBallCord.add(vel);
            myBallCord2.add(vel);
            myBallCord3.add(vel);
            vel.add(acc);
            acc.set(force.getComponent(0),force.getComponent(1),force.getComponent(2)); 

            plane2.rotation.x = 20 * Math.PI/180;
        }   
        moveFlag = true;
    }    
}


var partZ = 4;
var plane;
var plane2;
var plane3;

function initialiseParticles(){
    myBallCord = new THREE.Vector3(4,0,partZ);
    myBallCord2 = new THREE.Vector3(4.4,0.2,partZ);
    myBallCord3 = new THREE.Vector3(4.8,0,partZ);
    var geometry = new THREE.PlaneGeometry( 0.3, 0.3,0 );
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );

    plane = new THREE.Mesh( geometry, material );
    plane.position.set(myBallCord.getComponent(0), myBallCord.getComponent(1), myBallCord.getComponent(2));
    PIEaddElement(plane);

    plane2 = new THREE.Mesh( geometry, material );
    plane2.position.set(myBallCord2.getComponent(0), myBallCord2.getComponent(1), myBallCord2.getComponent(2));
    PIEaddElement(plane2);

    plane3 = new THREE.Mesh( geometry, material );
    plane3.position.set(myBallCord3.getComponent(0), myBallCord3.getComponent(1), myBallCord3.getComponent(2));
    PIEaddElement(plane3);
}


function initialiseAttractor(){
    attractorV = new THREE.Vector3(-4,4,partZ);
    
    var geometry;
    var material;

    attractor = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 20), new THREE.MeshLambertMaterial({color:'red'}));

    PIEaddDualCommand('1. Plastic Scale', function(){
        PIEremoveElement(attractor);
        geometry = new THREE.PlaneGeometry( 0.5, 3, 20 );
        material = new THREE.MeshBasicMaterial( {color: 0xfac940, side: THREE.DoubleSide} );
        attractor = new THREE.Mesh( geometry, material );

        attractor.rotation.x = -30 * Math.PI/180;
        attractor.rotation.z = 90 * Math.PI/180;
        attractor.position.set(attractorV.getComponent(0) + 2, attractorV.getComponent(1), 4);

        PIEaddElement(attractor);
        PIErender();
        PIEdragElement(attractor);
        PIEsetDrag(attractor, myAttractorDrag);
        console.log('Plastic Scale');
    });

    PIEaddDualCommand('2. Eraser', function(){
        PIEremoveElement(attractor);
        geometry = new THREE.BoxGeometry( 1,0.5, 2 );
        material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
        attractor = new THREE.Mesh( geometry, material );
        attractor.rotation.x = 15 * Math.PI/180;
        attractor.rotation.y = 65 * Math.PI/180;
        attractor.rotation.z = 3 * Math.PI/180;

        attractor.position.set(attractorV.getComponent(0)+1, attractorV.getComponent(1), 4);

        PIEaddElement(attractor);
        PIErender();
        PIEdragElement(attractor);
        PIEsetDrag(attractor, myAttractorDrag);
        console.log('Eraser');
    });

    PIEaddDualCommand('3. Steel rod', function(){
        PIEremoveElement(attractor);
        geometry = new THREE.CylinderGeometry( 0.2, 0.2, 3, 3 );
        material = new THREE.MeshBasicMaterial( {color: 0xC0C0C0} );
        attractor = new THREE.Mesh( geometry, material );

        attractor.rotation.z = 90 * Math.PI/180;
        attractor.position.set(attractorV.getComponent(0)+2, attractorV.getComponent(1), 4);
        
        PIEaddElement(attractor);
        PIErender();
        PIEdragElement(attractor);
        PIEsetDrag(attractor, myAttractorDrag);
        console.log('Steel rod');
    });

    PIEaddDualCommand('4. Straw', function(){
        PIEremoveElement(attractor);
        geometry = new THREE.CylinderGeometry( 0.1, 0.1, 4, 4 );
        material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        attractor = new THREE.Mesh( geometry, material );

        
        attractor.rotation.z = 90 * Math.PI/180;
        attractor.position.set(attractorV.getComponent(0)+1.5, attractorV.getComponent(1), 4);
        
        PIEaddElement(attractor);
        PIErender();
        PIEdragElement(attractor);
        PIEsetDrag(attractor, myAttractorDrag);

        console.log('Straw');
    });

    PIEaddDualCommand('5. Rubber Ball', function(){
        PIEremoveElement(attractor);
        attractor = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 20), new THREE.MeshLambertMaterial({color:'red'}));

        attractor.position.set(attractorV.getComponent(0), attractorV.getComponent(1), partZ);

        PIEaddElement(attractor);
        PIErender();
        PIEdragElement(attractor);
        PIEsetDrag(attractor, myAttractorDrag);
        console.log('Rubber Ball');
    });  
}


function observationTable(){
    var title = "Observation Table";

    PIEcreateTable(title, 6, 4, true);
    var headerRow=["Object", "Material", "Attracts", "Charged"];
    PIEupdateTableRow(0, headerRow);
    var table = PIEtableSelect("Observation Table");

    // Row 1
    PIEsetCellInput(1, 0, 12, "1.Scale");
    PIEsetCellInput(1, 1, 14, "Dry hair");
    PIEsetCellInput(1, 2, 10, "Y/N");
    PIEsetCellInput(1, 3, 10, "Y/N");

    // Row 2
    PIEsetCellInput(2, 0, 14, "2.Eraser");
    PIEsetCellInput(2, 1, 14, "Wool");
    PIEsetCellInput(2, 2, 10, "Y/N");
    PIEsetCellInput(2, 3, 10, "Y/N");
    

    // Row 3
    PIEsetCellInput(3, 0, 15, "3.Steel rod");
    PIEsetCellInput(3, 1, 14, "Polythene");
    PIEsetCellInput(3, 2, 10, "Y/N");
    PIEsetCellInput(3, 3, 10, "Y/N");

    // Row 4
    PIEsetCellInput(4, 0, 18, "4.Straw");
    PIEsetCellInput(4, 1, 14, "Polythene");
    PIEsetCellInput(4, 2, 10, "Y/N");
    PIEsetCellInput(4, 3, 10, "Y/N");
    

    // Row 5
    PIEsetCellInput(5, 0, 18, "5.Ball");
    PIEsetCellInput(5, 1, 14, "Dry hair");
    PIEsetCellInput(5, 2, 10, "Y/N");
    PIEsetCellInput(5, 3, 10, "Y/N");
}


function initialiseScene()
{
    /* Initialise Scene Variables */
    mySceneTLX = -10.0;
    mySceneTLY = 10.0;
    mySceneBRX = 10.0;
    mySceneBRY = -2.0;
    mySceneW   = (mySceneBRX - mySceneTLX);
    mySceneH   = (mySceneTLY - mySceneBRY);
    myCenterX  = (mySceneTLX + mySceneBRX) / 2.0;
    myCenterY  = (mySceneTLY + mySceneBRY) / 2.0;
    myBallZ    = -200.0;


    var light = new THREE.PointLight( 0xff0000, 7, 200 );
    PIEaddElement( light );
    light.position.set(-50,50,50);

    PIEscene.background = new THREE.Color( 0x00BFFF );

    var ambient = new THREE.AmbientLight( 0x555555 );
    PIEaddElement(ambient);

    var light = new THREE.DirectionalLight( 0x123456 );
    light.position = PIEcamera.position;
    PIEaddElement(light);

    var ambient = new THREE.AmbientLight( 0x555555 );
    PIEaddElement(ambient);

    var light = new THREE.DirectionalLight( 0x123456 );
    light.position = PIEcamera.position;
    PIEaddElement(light);

    var groundMaterial = new THREE.MeshPhongMaterial( { color: 0x024406, specular: 0x111111} );
    var mesh233 = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), groundMaterial );
    mesh233.position.y = -25;
    mesh233.rotation.x = - Math.PI / 2;
    PIEaddElement( mesh233 );


    addTable();


    PIEadjustDisplayScene();
    PIErenderer.shadowMapEnabled = false;


     initialiseParticles();
     initialiseAttractor();
}


function myAttractorDrag(element, newpos){

    var y;
         y = ( newpos.y < 0.6)? 0.6 : newpos.y;
         
    
        attractorV.set(newpos.x, y, newpos.z);
        element.position.set(newpos.x, y, newpos.z);
}


function addTable(){
    var tableGeom = new THREE.CubeGeometry( 15, 0.5, 10, 4, 4, 1 );
    var tableTop =  new THREE.Mesh( tableGeom,new THREE.MeshBasicMaterial({color: 0x8B4513}));
    tableTop.position.y -=0.6;
    tableTop.position.z = 0;
    PIEaddElement(tableTop);

    var edges = new THREE.EdgesGeometry( tableGeom );
    var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000 } ) );
    
    tableTop.add(line);

}


function resetExperiment()
{
    //myBall.position.set(myBallX, myBallY, myBallZ);
    myBallCord.set(4,0,partZ);
    myBallCord2.set(4.4,0.2,partZ);
    myBallCord3.set(4.8,0,partZ);

    plane.position.set(myBallCord.getComponent(0), myBallCord.getComponent(1), myBallCord.getComponent(2));
    PIEaddElement(plane);
    plane2.position.set(myBallCord2.getComponent(0), myBallCord2.getComponent(1), myBallCord2.getComponent(2));
    PIEaddElement(plane2);
    plane3.position.set(myBallCord3.getComponent(0), myBallCord3.getComponent(1), myBallCord3.getComponent(2));
    PIEaddElement(plane3);
    
    attractorV.set(-4,7,partZ);
    attractor.position.set(attractorV.getComponent(0), attractorV.getComponent(1), attractorV.getComponent(2));
    

    rubFlag = false;
    moveFlag = true;

    console.log('reset');

}

var infoContent;
function initialiseInfo()
{
    infoContent =  "";
    infoContent = infoContent + "<h2>Charging by Rubbing experiment concepts</h2>";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent + "<p>The experiment shws static electricity generated by rubbing an object with the material.</p>";
    infoContent = infoContent + "<h3>Static Electricity: </h3>";
    infoContent = infoContent + "<p>When two objects are rubbed with each other, electrons may get transferred from one object to another.</p>";
    infoContent = infoContent + "<p> If an object loses some electron, this object becomes positively charged. If an object gains electrons, this object becomes negatively charged. </p>";
    infoContent = infoContent + "<p>The transfer of charges is responsible for static electricity in various objects.</p>";

    infoContent = infoContent + "<h3>Examples: </h3>";
    infoContent = infoContent + "<p>(i) When a plastic comb is rubbed with dry hair, it acquires a small charge. </p>";
    infoContent = infoContent + "<p>(ii) When a plastic refill is rubbed with polythene, it acquires a small electric charge.</p>";
    infoContent = infoContent + "<p>(iii) When we rub a plastic scale on your dry hair, the scale can attract very small pieces of paper.</p>";
    infoContent = infoContent + "<h2>Happy Experimenting</h2>";
    PIEupdateInfo(infoContent);
}



var helpContent;
function initialiseHelp()
{
    helpContent="";
    helpContent = helpContent + "<h2>Charging by Rubbing experiment help</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
    helpContent = helpContent + "<p>The experiment shws static electricity generated by rubbing an object with the material.</p>";
   
    helpContent = helpContent + "<h3>The Setup stage: </h3>";
    helpContent = helpContent + "<p>To start the experiment click on start button.</p>";
    helpContent = helpContent + "<p>Select the object from the right hand panel on the right side of the screen.</p>";
    helpContent = helpContent + "<p>After selecting the object rub the object by pressing the Rub the Object button.</p>";
    helpContent = helpContent + "<p>Once you setup the experiment, you can drag the object near to paper pieces.</p>";
    helpContent = helpContent + "<h3>The animation stage</h3>";
    helpContent = helpContent + "<p>In the animation stage, when the object is around the paper pieces obeys the laws of physics.</p>";
    helpContent = helpContent + "<p>The right hand panel now shows the objects to select.</p>";

    helpContent = helpContent + "<h3>Observation Table: </h3>";
    helpContent = helpContent + "<p>You can record your observation whether the object attracts the paper pieces or not in the table.</p>";
    helpContent = helpContent + "<p>For more help: <a href='https://www.youtube.com/watch?v=nfomGGbdHBo'>Click</a></p>"
    helpContent = helpContent + "<h2>Happy Experimenting</h2>";
    PIEupdateHelp(helpContent);
}


// var vel = [];
// var acc = [];
// var force = [];

// function attract(particle,target){
//     var dist;
//     var strength = 0.1 ;

//     for(var i = 0;i < particle.length;i++){

//         vel.push(new THREE.Vector3(0,0,myBallZ));
//         acc.push(new THREE.Vector3());
//         force.push(new THREE.Vector3());

//         // Converting force to 2D plane
//         force[i].x = Math.round( (   force.x + 1 ) * mySceneW / 2 );
//         force[i].y = Math.round( ( - force.y + 1 ) * mySceneH / 2 );
//         force[i].z = myBallZ;

//         force[i].subVectors(target,particle[i]);

//         dist = Math.round(force[i].length());
//         console.log(dist);
//         force[i].setLength(strength);

//         if (dist >= -1 && dist <= 5) {
//             if(dist <= 1){
//                 console.log('Stop');
//                 vel[i].set(0,0,0);
//                 acc[i].set(0,0,0);
    
//             } else{
//                 // Updating
//                 planePos[i].add(vel[i]);
//                 vel[i].add(acc[i]);
//                 acc[i].set(force[i].getComponent(0),force[i].getComponent(1),force[i].getComponent(2)); 
//             }   
//         }
//     }
// }