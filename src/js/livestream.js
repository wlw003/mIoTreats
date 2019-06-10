var video = document.getElementById('video');
var ipAddr = "100.81.84.214";
var url = "http://"+ipAddr+":8080/camera/livestream.m3u8";
var debug = true;
if(Hls.isSupported()) {
  var hls = new Hls();
  // need to know the ip address of the pi for camera
  hls.loadSource(url);
  hls.attachMedia(video);
  hls.on(Hls.Events.MANIFEST_PARSED,function() {
    video.play();
  });
  //console.log("VIDEO WORKING");
} 
// hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
// When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element throught the `src` property.
// This is using the built-in support of the plain video element, without using hls.js.
// Note: it would be more normal to wait on the 'canplay' event below however on Safari (where you are most likely to find built-in HLS support) the video.src URL must be on the user-driven
// white-list before a 'canplay' event will be emitted; the last video event that can be reliably listened-for when the URL is not on the white-list is 'loadedmetadata'.
else if (video.canPlayType('application/vnd.apple.mpegurl')) {
  video.src = url;
  video.addEventListener('loadedmetadata',function() {
    video.play();
  });
}

var promise = document.querySelector('video').play();
var t = document.getElementById("lsTitle");
if (promise !== undefined) {
  promise.then(_ => {
    // Autoplay started!
    console.log("autoplay started");
    t.innerHTML="Live Stream Feed";
  }).catch(error => {
    // Autoplay was prevented.
    console.log("ERROR: Promise failed. Reloading page");
    //location.reload(true);

    t.innerHTML="Video Not Working. Please Reload Your Page";
    // Show a "Play" button so that user can start playback.
  });
}

if(debug){
  video.onplay = (event) => {
    console.log('The Boolean paused property is now false. Either the ' + 
    'play() method was called or the autoplay attribute was toggled.');
  };
  video.onplaying = (event) => {
    console.log('Video is no longer paused.');
  };
  video.onloadeddata = (event) => {
    console.log('Yay! The readyState just increased to  ' + 
        'HAVE_CURRENT_DATA or greater for the first time.');
  };
  video.onwaiting = (event) => {
    console.log('Video is waiting for more data.');
  };
  video.onended = (event) => {
    console.log('Video stopped either because 1) it was over, ' +
        'or 2) no further data is available.');
  };
}