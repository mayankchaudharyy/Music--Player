let play = document.querySelector(".play");
let pause = document.querySelector(".pause");
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let back = document.querySelector(".back");
let forw = document.querySelector(".forw");
let music = null;
let sta = "";
let time = 0;

const music_list = [
    {
        img : 'assets/sid1.jpg',
        name : '295',
        artist : 'Siddhu Moose Walla',
        music : 'assets/295.mp3'
    },
    {
        img : 'assets/sid2.jpg',
        name : 'Legend',
        artist : 'Moose Walla',
        music : 'assets/Legend.mp3'
    },
    {
        img : 'assets/sid3.jpg',
        name : 'The Last Ride',
        artist : 'Siddhu Aye',
        music : 'assets/The-Last-Ride.mp3'
    }
];
let which_is_playing = 0;

play.addEventListener("click",()=>{
    sta = "play";
    appearPause();
    Play_Me(music_list[which_is_playing],0,time);
})

pause.addEventListener("click",()=>{
    sta = "pause";
    appearPlay();
    stop_all();
})

prev.addEventListener("click",()=>{
    time = 0;
    if(which_is_playing === 0){
        which_is_playing = 2;
    }else{
        which_is_playing -=1;
    }
    if(sta === ""){
        // console.log("activate");
        make_card(music_list[which_is_playing]);
        return;
    }
    stop_all();
    appearPlay();
    time = 0;
    // pause.click();
    make_card(music_list[which_is_playing]);
})

next.addEventListener("click",()=>{
    time = 0;
    if(which_is_playing === 2){
        which_is_playing = 0;
    }else{
        which_is_playing += 1;
    }
    if(sta === ""){
        make_card(music_list[which_is_playing]);
        return;
    }
    stop_all();
    time = 0;
    appearPlay();
    // pause.click();
    make_card(music_list[which_is_playing]);
})

back.addEventListener("click", ()=>{
    if(music === null || music.currentTime === 0 || sta === "pause" || music.currentTime < 10.0){
        return;
    }else if(sta === "play"){
        let obj = music_list[which_is_playing];
        let c_time = music.currentTime;
        // console.log(c_time);
        stop_all();
        Play_Me(obj, -10, c_time);
    }
})

forw.addEventListener("click", ()=>{
    // console.log(music.duration);
    if(music === null || music.currentTime === music.duration || sta === "pause" || music.currentTime > music.duration-10.0){
        return;
    }else if(sta === "play"){
        let obj = music_list[which_is_playing];
        let c_time = music.currentTime;
        // console.log(c_time);
        stop_all();
        Play_Me(obj, 10, c_time);
    }
})

function Play_Me(obj, this_time, c_time){
    // make_card(obj);
    let artist_photo = document.querySelector(".artist-photo");
    artist_photo.classList.add("my_anime");
    music = new Audio(obj.music);
    music.play();
    music.currentTime = c_time;
    music.currentTime += this_time;
    music.loop = true;
}


function make_card(obj){
    let song_name = document.querySelector(".song-name");
    let artist_name = document.querySelector(".artist-name");
    let artist_photo = document.querySelector(".artist-photo");
    song_name.innerText = obj.name;
    artist_name.innerText = obj.artist;
    artist_photo.src = obj.img;
}

function appearPause(){
    play.classList.add("hidden");
    pause.classList.remove("hidden");
}

function appearPlay(){
    play.classList.remove("hidden");
    pause.classList.add("hidden");
}

function stop_all(){
    let artist_photo = document.querySelector(".artist-photo");
    artist_photo.classList.remove("my_anime");
    time = music.currentTime;
    music.pause();
}