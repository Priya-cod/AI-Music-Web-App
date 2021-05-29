song = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;
scorerightWrist = 0;

function preload()
{
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCanvas(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('poseNet Is Initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        
        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scorerightWrist);
        
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    
    if(scorerightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);

        if(rightWristY >0 && rightWristY <= 200)
        {
            song.play();
            song.volume(1);
            song.rate(1);
        }
        else if(rightWristY >200 && rightWristY <= 500)
        {
            song.stop();
        }
    }

    if(scoreleftWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);

        if(rightWristY >0 && rightWristY <= 200)
        {
            song2.play();
            song2.volume(1);
            song2.rate(1);
        }
        else if(rightWristY >200 && rightWristY <= 500)
        {
            song2.stop();
    }
}
