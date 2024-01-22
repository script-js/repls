var timebtwn;
var timelim;
var spawner;
var desamnt;
var chickensSpawned = 0;
var chickensDestroyed = 0;
var secsPassed = 0;
var itop = 20;
var ileft = 20;
var dainterval;
var isPaused = false;
function move_image() {
  var img2 = document.getElementById("chicken2");
  img2.style.top = document.body.clientHeight * Math.random() + 'px';
  img2.style.left = document.body.clientWidth * Math.random() + 'px';
  var img = document.getElementById("chicken1");
  img.style.top = document.body.clientHeight * Math.random() + 'px';
  img.style.left = document.body.clientWidth * Math.random() + 'px';
}

function move_image_with1() {
  var img = document.getElementById("chicken1");
  img.style.top = document.body.clientHeight * Math.random() + 'px';
  img.style.left = document.body.clientWidth * Math.random() + 'px';
}

function show_image(src, width, height, alt) {
  var img = document.createElement("img");
  chickensSpawned = chickensSpawned + 1;
  img.id = "chicken" + chickensSpawned;
  img.src = src;
  img.width = width;
  img.height = height;
  img.alt = alt;
  img.style.position = 'absolute';
  img.style.top = document.body.clientHeight * Math.random() + 'px';
  img.style.left = document.body.clientWidth * Math.random() + 'px';
  img.setAttribute("onclick", "destroy(chicken" + chickensSpawned + ")")
  img.setAttribute("draggable","false")

  document.body.appendChild(img);
}

function getLevel() {
  if (localStorage.getItem("level")) {
    return localStorage.getItem("level")
  } else {
    return "reloadrequested";
  }
}

function lsb2() {
  l.innerHTML = ""; show_image("cheekan.jpg", 200, 300, 'a chicken')
  toptxt.innerHTML = "Level " + localStorage.getItem("level") + "&nbsp;&nbsp;<button onclick='pause()' id='ppbtn'>⏸</button>&nbsp;<button onclick='location.reload()'><img src='https://icons.veryicon.com/png/o/business/background-management-system/reset-1.png' width='14' height='14' style='cursor:pointer'></button>";
  spawner = setInterval(function() { if (isPaused == false) { move_image_with1() } }, timebtwn)
  dainterval = setInterval(function() {
    if (isPaused == false) {
      secsPassed = secsPassed + 1;
      if (chickensDestroyed == 1) {
        toptxt.innerHTML = "";
        l.innerHTML = "Congratulations!<br>You defeated the last boss!<br><button onclick='localStorage.clear(); location.reload()'>Reset Game</button>";
        toptxt.innerHTML = "Win!"
        clearInterval(dainterval)
      }
      if (secsPassed == timelim) {
        if (chickensDestroyed == 1) {
          toptxt.innerHTML = "";
          l.innerHTML = "Congratulations!<br>You defeated the last boss!<br><button onclick='localStorage.clear(); location.reload()'>Reset Game</button>";
          toptxt.innerHTML = "Win!"
          clearInterval(dainterval)
        } else {
          clearInterval(spawner)
          l.innerHTML = "Times Up!<br>You Lost!<br><button onclick='location.reload();'>Retry</button>";
          toptxt.innerHTML = "Lose!"
          clearInterval(dainterval)
        }
      }
    }
  }, 1000)
}

function lsb() {
  l.innerHTML = "";
  show_image("cheekan.jpg", 200, 300, 'a chicken')
  show_image("cheekan.jpg", 200, 300, 'a chicken')
  toptxt.innerHTML = "Level " + localStorage.getItem("level") + "&nbsp;&nbsp;<button onclick='pause()' id='ppbtn'>⏸</button>&nbsp;<button onclick='location.reload()'><img src='https://icons.veryicon.com/png/o/business/background-management-system/reset-1.png' width='14' height='14' style='cursor:pointer'></button>";
  spawner = setInterval(function() { if (isPaused == false) { move_image() } }, timebtwn)
  dainterval = setInterval(function() {
    if (isPaused == false) {
      secsPassed = secsPassed + 1;
      if (chickensDestroyed == 2) {
        toptxt.innerHTML = "";
        l.innerHTML = "Congratulations!<br>You defeated the boss!<br><button onclick='location.reload()'>Next Level</button>";
        toptxt.innerHTML = "Win!"
        var ltemp = Number(localStorage.getItem("level")) + 1
        localStorage.setItem("level", ltemp)
        clearInterval(dainterval)
      }
      if (secsPassed == timelim) {
        if (chickensDestroyed == 2) {
          toptxt.innerHTML = "";
          l.innerHTML = "Congratulations!<br>You defeated the boss!<br><button onclick='location.reload()'>Next Level</button><br><button onclick='location.reload();'>Retry</button>";
          toptxt.innerHTML = "Win!"
          var ltemp = Number(localStorage.getItem("level")) + 1
          localStorage.setItem("level", ltemp)
          clearInterval(dainterval)
        } else {
          clearInterval(spawner)
          l.innerHTML = "Times Up!<br>You Lost!";
          toptxt.innerHTML = "Lose!"
          clearInterval(dainterval)
        }
      }
    }
  }, 1000)
}



function lsdm() {
  l.innerHTML = "";
  toptxt.innerHTML = "Level " + localStorage.getItem("level") + "&nbsp;&nbsp;<button onclick='pause()' id='ppbtn'>⏸</button>&nbsp;<button onclick='location.reload()'><img src='https://icons.veryicon.com/png/o/business/background-management-system/reset-1.png' width='14' height='14' style='cursor:pointer'></button>";
  spawner = setInterval(function() { if (isPaused == false) { show_image("cheekan.jpg", 200, 300, 'a chicken') } }, timebtwn)
  dainterval = setInterval(function() {
    if (isPaused == false) {
      secsPassed = secsPassed + 1;
      if (chickensSpawned > 0) {
        var ctemp = chickensSpawned - 1;
        if (document.getElementById("chicken" + ctemp).style.display != "none") {
          clearInterval(spawner)
          clearInterval(dainterval)
          l.innerHTML = "You've been caught!<br>You Lost!<br><button onclick='location.reload();'>Retry</button>";
          toptxt.innerHTML = "Lose!"
        }
      }
      if (chickensDestroyed == desamnt) {
        toptxt.innerHTML = "";
        clearInterval(spawner)
        l.innerHTML = "Hooray!<br>You Passed the level!<br><button onclick='location.reload()'>Next Level</button>";
        toptxt.innerHTML = "Win!"
        var ltemp = Number(localStorage.getItem("level")) + 1
        localStorage.setItem("level", ltemp)
        clearInterval(dainterval)
      }
    }
  }, 50)
}

function lstl() {
  l.innerHTML = "";
  toptxt.innerHTML = "Level " + localStorage.getItem("level") + "&nbsp;&nbsp;<button onclick='pause()' id='ppbtn'>⏸</button>&nbsp;<button onclick='location.reload()'><img src='https://icons.veryicon.com/png/o/business/background-management-system/reset-1.png' width='14' height='14' style='cursor:pointer'></button>";
  spawner = setInterval(function() { if (isPaused == false) { show_image("cheekan.jpg", 200, 300, 'chicken') } }, timebtwn)
  dainterval = setInterval(function() {
    if (isPaused == false) {
      secsPassed = secsPassed + 1;
      if (timelim != "") {
        if (secsPassed == timelim) {
          toptxt.innerHTML = "";
          if (chickensDestroyed == chickensSpawned || chickensDestroyed > chickensSpawned) {
            clearInterval(spawner)
            l.innerHTML = "Times Up!<br>You Passed the level!<br><button onclick='location.reload()'>Next Level</button>";
            toptxt.innerHTML = "Win!"
            var ltemp = Number(localStorage.getItem("level")) + 1
            localStorage.setItem("level", ltemp)
          } else {
            clearInterval(spawner)
            l.innerHTML = "Times Up!<br>You Lost!<br><button onclick='location.reload();'>Retry</button>";
            toptxt.innerHTML = "Lose!"
            clearInterval(dainterval)
          }
        }
      }
    }
  }, 1000)
}

function destroy(id) {
  if (isPaused == false) {
    boom.play()
    id.src = "https://i.gifer.com/origin/d7/d7ac4f38b77abe73165d85edf2cbdb9e_w200.gif";
    setTimeout(function() {
      id.style.display = "none";
    }, 500)
    chickensDestroyed = chickensDestroyed + 1;
  }
}

function play() {
  isPaused = false;
  ppbtn.setAttribute("onclick", "pause()")
  ppbtn.innerHTML = "⏸";
  cursorcss.setAttribute("href", "game.css")
}
function pause() {
  isPaused = true;
  ppbtn.setAttribute("onclick", "play()")
  ppbtn.innerHTML = "▶"
  cursorcss.setAttribute("href", "pause.css")
}
