const music = new Audio("/1.mp3");

// Create Array

const songs = [
  {
    id: "1",
    songName: ` On My Way <br />
        <div class="subtitle">Alan Walker</div>`,
    poster: "./img/1.jpg",
  },
  {
    id: "2",
    songName: ` Alan Walker-Faded<br />
        <div class="subtitle">Alan Walker</div>`,
    poster: "./img/2.jpg",
  },
  {
    id: "3",
    songName: ` Carton- On & On<br />
        <div class="subtitle">Daniel Levi</div>`,
    poster: "./img/3.jpg",
  },
  {
    id: "4",
    songName: ` Warriyo-Mortals<br />
        <div class="subtitle">Mortals</div>`,
    poster: "./img/4.jpg",
  },
  {
    id: "5",
    songName: ` Ertugrul Gazi<br />
        <div class="subtitle">Ertugrul</div>`,
    poster: "./img/5.jpg",
  },
  {
    id: "6",
    songName: ` Electronic Music<br />
        <div class="subtitle">Electro</div>`,
    poster: "./img/6.jpg",
  },
  {
    id: "7",
    songName: ` Agar Tum Sath Ho<br />
        <div class="subtitle">Tamashaa</div>`,
    poster: "./img/7.jpg",
  },
  {
    id: "8",
    songName: ` Suna Hal<br />
        <div class="subtitle">Noha Kakker</div>`,
    poster: "./img/8.jpg",
  },
  {
    id: "9",
    songName: ` Dllber<br />
        <div class="subtitle">Satyameva Jayate</div>`,
    poster: "./img/9.jpg",
  },
  {
    id: "10",
    songName: ` Dunlya<br />
        <div class="subtitle">Luka Chuppi</div>`,
    poster: "./img/10.jpg",
  },
  {
    id: "11",
    songName: ` Lagdi Lahore Di<br />
        <div class="subtitle">Street Dancer 3D</div>`,
    poster: "./img/11.jpg",
  },
  {
    id: "12",
    songName: ` Putt Jatt Da<br />
        <div class="subtitle">Putt Jatt Da</div>`,
    poster: "./img/12.jpg",
  },
  {
    id: "13",
    songName: ` Baarlshein<br />
        <div class="subtitle">Atif Aslam</div>`,
    poster: "./img/13.jpg",
  },
  {
    id: "14",
    songName: ` Abc<br />
        <div class="subtitle">Abc</div>`,
    poster: "./img/14.jpg",
  },
  {
    id: "15",
    songName: ` Def<br />
        <div class="subtitle">Def</div>`,
    poster: "./img/15.jpg",
  },
];

Array.from(document.getElementsByClassName("songItem")).forEach(
  (element, i) => {
    // console.log(element.getElementsByTagName(`img`)[0]);
    element.getElementsByTagName("img")[0].src = songs[i].poster;
    element.getElementsByTagName("h5")[0].innerHTML = songs[i].songName;
  }
);

const masterPlay = document.getElementById("master_play");
const wave = document.getElementsByClassName("wave")[0];

const playPauseMusic = function () {
  if (music.paused || music.currentTime <= 0) {
    music.play();
    masterPlay.classList.remove("bi-play-fill");
    masterPlay.classList.add("bi-pause-fill");
    wave.classList.add("active2");
  } else {
    music.pause();
    masterPlay.classList.add("bi-play-fill");
    masterPlay.classList.remove("bi-pause-fill");
    wave.classList.remove("active2");
  }
};

masterPlay.addEventListener("click", function (e) {
  playPauseMusic();
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("playListPlay")).forEach(
    (element) => {
      element.classList.add("bi-play-circle-fill");
      element.classList.remove("bi-pause-circle-fill");
    }
  );
};

const makeAllBackGround = () => {
  Array.from(document.getElementsByClassName("songItem")).forEach((element) => {
    element.style.background = "rgba(105,105,170,0)";
  });
};

let index = 0;

const posterMasterPlay = document.querySelector("#poster_master_play");
const title = document.querySelector("#title");

Array.from(document.getElementsByClassName("playListPlay")).forEach(
  (element) => {
    element.addEventListener("click", function (e) {
      index = e.target.id;
      makeAllPlays();
      e.target.classList.remove("bi-play-circle-fill");
      e.target.classList.add("bi-pause-circle-fill");
      music.src = `audio/${index}.mp3`;
      posterMasterPlay.src = `img/${index}.jpg`;
      music.play();
      let song_title = songs.filter((ele) => {
        return ele.id == index;
      });

      song_title.forEach((ele) => {
        let { songName } = ele;
        title.innerHTML = songName;
      });

      masterPlay.classList.remove("bi-play-fill");
      masterPlay.classList.add("bi-pause-fill");
      wave.classList.add("active2");
      // music.addEventListener("ended", () => {
      //   masterPlay.classList.add("bi-play-fill");
      //   masterPlay.classList.remove("bi-pause-fill");
      //   wave.classList.remove("active2");
      // });

      makeAllBackGround();

      Array.from(document.getElementsByClassName("songItem"))[
        `${index - 1}`
      ].style.background = "rgba(105,105,170,0.1)";
    });
  }
);

const currentStart = document.querySelector("#currentStart");
const currentEnd = document.querySelector("#currentEnd");
const seek = document.querySelector("#seek");
const bar2 = document.querySelector("#bar2");
const dot = document.querySelector("#dot");

music.addEventListener("loadeddata", function () {
  let minuteDuration = Math.floor(this.duration / 60);
  let secondDuration = Math.floor(this.duration % 60);
  currentEnd.innerHTML = `${
    minuteDuration > 10 ? minuteDuration : `0${minuteDuration}`
  }:${secondDuration > 10 ? secondDuration : `0${secondDuration}`}`;
});

music.addEventListener("timeupdate", function () {
  let second = Math.floor(this.currentTime % 60);
  let minute = Math.floor(this.currentTime / 60);

  currentStart.innerHTML = `${minute > 10 ? minute : `0${minute}`}:${
    second > 10 ? second : `0${second}`
  }`;

  let progressBar = parseInt((this.currentTime / this.duration) * 100);
  seek.value = progressBar;
  let seekBar = seek.value;
  bar2.style.width = `${seekBar}%`;

  dot.style.left = `${seekBar}%`;
});

seek.addEventListener("change", () => {
  music.currentTime = (seek.value * music.duration) / 100;
});

music.addEventListener("ended", () => {
  masterPlay.classList.add("bi-pause-fill");
  wave.classList.add("active2");
  index++;

  music.src = `audio/${index}.mp3`;
  posterMasterPlay.src = `img/${index}.jpg`;
  music.play();
  let song_title = songs.filter((ele) => {
    return ele.id == index;
  });

  song_title.forEach((ele) => {
    let { songName } = ele;
    title.innerHTML = songName;
  });
  makeAllBackGround();
  Array.from(document.getElementsByClassName("songItem"))[
    `${index - 1}`
  ].style.background = "rgba(105,105,170,0.1)";
  makeAllPlays();
  document
    .getElementsByClassName("playListPlay")
    [index - 1].classList.remove("bi-play-circle-fill");
  document
    .getElementsByClassName("playListPlay")
    [index - 1].classList.add("bi-pause-circle-fill");
});

const vol = document.querySelector("#vol");
const volIcon = document.querySelector("#vol_icon");
const volDot = document.querySelector("#vol_dot");
const vol_bar = document.querySelector(".vol_bar");

vol.addEventListener("change", () => {
  if (vol.value === 0) {
    volIcon.classList.remove("bi-volume-down-fill");
    volIcon.classList.add("bi-volume-mute-fill");
    volIcon.classList.remove("bi-volume-up-fill");
  }

  if (vol.value > 0) {
    volIcon.classList.add("bi-volume-down-fill");
    volIcon.classList.remove("bi-volume-mute-fill");
    volIcon.classList.remove("bi-volume-up-fill");
  }

  if (vol.value > 50) {
    volIcon.classList.remove("bi-volume-down-fill");
    volIcon.classList.remove("bi-volume-mute-fill");
    volIcon.classList.add("bi-volume-up-fill");
  }

  let volValue = vol.value;
  vol_bar.style.width = `${volValue}%`;
  volDot.style.left = `${volValue}%`;
  music.volume = volValue / 100;
});

const backBtn = document.querySelector("#back");
const nextBtn = document.querySelector("#next");

backBtn.addEventListener("click", function () {
  index -= 1;
  if (index < 1) {
    index = Array.from(document.getElementsByClassName("songItem")).length;
  }

  music.src = `audio/${index}.mp3`;
  posterMasterPlay.src = `img/${index}.jpg`;
  music.play();
  let song_title = songs.filter((ele) => {
    return ele.id == index;
  });

  song_title.forEach((ele) => {
    let { songName } = ele;
    title.innerHTML = songName;
  });
  makeAllPlays();
  document
    .getElementsByClassName("playListPlay")
    [index - 1].classList.remove("bi-play-circle-fill");
  document
    .getElementsByClassName("playListPlay")
    [index - 1].classList.add("bi-pause-circle-fill");
  makeAllBackGround();
  Array.from(document.getElementsByClassName("songItem"))[
    `${index - 1}`
  ].style.background = "rgba(105,105,170,0.1)";
});

nextBtn.addEventListener("click", function () {
  index -= 0;
  index += 1;
  if (
    index === Array.from(document.getElementsByClassName("songItem")).length
  ) {
    index = 1;
  }

  music.src = `audio/${index}.mp3`;
  posterMasterPlay.src = `img/${index}.jpg`;
  music.play();
  let song_title = songs.filter((ele) => {
    return ele.id == index;
  });

  song_title.forEach((ele) => {
    let { songName } = ele;
    title.innerHTML = songName;
  });
  makeAllPlays();
  document
    .getElementsByClassName("playListPlay")
    [index - 1].classList.remove("bi-play-circle-fill");
  document
    .getElementsByClassName("playListPlay")
    [index - 1].classList.add("bi-pause-circle-fill");
  makeAllBackGround();
  Array.from(document.getElementsByClassName("songItem"))[
    `${index - 1}`
  ].style.background = "rgba(105,105,170,0.1)";
});

const leftScroll = document.querySelector("#left_scroll");
const rightScroll = document.querySelector("#right_scroll");
const popSong = document.querySelector(".pop_song");

leftScroll.addEventListener("click", () => {
  popSong.scrollLeft -= 330;
});

rightScroll.addEventListener("click", () => {
  popSong.scrollLeft += 330;
});
