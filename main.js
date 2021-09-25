song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

song1_status = "";
song2_status = "";

scoreRightWrist = 0;
scoreLeftwrist = 0;

function preload()
{
  song1 = loadSound("music.mp3");
  song2 = loadSound("music2.mp3");
}


function setup()
{
  canvas = createCanvas (600 , 500);
  canvas.center();

  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video , modelLoaded);
  poseNet.on('pose' , gotPoses);
}

function modelLoaded()
{
  console.log('PoseNet is Initialized');
}

function draw()
{
  image(video , 0 , 0 , 600 , 500);
  song1_status = song1.isPlaying();
  song2_status = song2.isPlaying();
  fill("#ff0044");
  stroke("#ff0044");
  if(scoreRightWrist > 0.2)
  {
    circle(rightWristX , rightWristY , 20);
    song2.stop();
    if(song1_status == false)
    {
      song1.play();
      document.getElementById("song").innerHTML = "playing Harry Potter theme song";
    }
  }
  if(scoreLeftwrist > 0.2)
  {
    circle(leftWristX , leftWristY , 20);
    song1.stop();
    if(song2_status == false)
    {
      song2.play();
      document.getElementById("song").innerHTML = "playing Peter Pan theme song";
    }
  }
}

function play()
{
  song.play();
  song.setVolume(1);
  song.rate(1);
}

function gotPoses(results)
{
  if(results.length > 0 )
  {
    console.log(results);
    scoreRightWrist = results[0].pose.keypoints[10].score;
    scoreLeftwrist = results[0].pose.keypoints[9].score;
    console.log("scoreRightWrist =" + scoreRightWrist + "scoreLeftwrist =" + scoreLeftwrist);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX =" + leftWristX + "leftWristY =" + leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX =" + rightWristX + "rightWristY =" + rightWristY);
  }
}