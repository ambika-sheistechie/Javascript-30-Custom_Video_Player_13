//Get all elements reference

const player=document.querySelector('.player');
const video=player.querySelector('.viewer');
const progress=player.querySelector('.progress');
const progressbar=player.querySelector('.progress__filled');
const toggle=player.querySelector('.toggle');
const skipButtons=player.querySelectorAll('[data-skip]');
const ranges=player.querySelectorAll('.player__slider');
const fss=document.querySelector('.fs');


//Build functions

function togglePlay()
{
    // if(video.paused)
    // {
    //     video.play();
    // }

    // else{
    //     video.pause();
    // }

    const method=video.paused ? 'play' : 'pause' ;
    video[method]();
}

function updateButton()
{
    const icon=this.paused ?'►' : '❚ ❚';
    console.log(icon);
    toggle.textContent=icon;
}

function skip()
{
    console.log(this.dataset);
    video.currentTime+=parseFloat(this.dataset.skip);
}

function updateRangeUpdate()
{
    video[this.name]=this.value;
console.log(this.value);
}

function updateProgressBar()
{
    console.log(video.duration);
    const percent=(video.currentTime/video.duration)*100;
    progressbar.style.flexBasis=`${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
  }

  
  
//Hook up the Event listeners

video.addEventListener('click',togglePlay);

video.addEventListener('play',updateButton);
video.addEventListener('timeupdate',updateProgressBar);
video.addEventListener('pause',updateButton);

toggle.addEventListener('click',togglePlay);

skipButtons.forEach(button=>button.addEventListener('click',skip));
ranges.forEach(range=>range.addEventListener('change',updateRangeUpdate));
ranges.forEach(range=>range.addEventListener('mousemove',updateRangeUpdate));

let mousedown=false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e)=>mousedown && scrub(e));
progress.addEventListener('mousedown', ()=>mousedown=true);
progress.addEventListener('mouseup', ()=>mousedown =false);


