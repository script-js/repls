var topp = 10
var right = 20;
var hits = 0;
var speed = 50;
var launchpos = 85;
var shipint;
var powerup;
var launchint;
var startNum = 3;
var extraships = 1;
var lost;
var shot = false
  
document.addEventListener('mousemove', function(e) {
  if (shot == false) {
    let body = document.querySelector('body');
    let ss = document.getElementById('slingshot');
    let top = e.offsetY - 60
    ss.style.top = top + 'px';
  }
});

function resetSling() {
  clearInterval(launchint)
  slingshot.style.display = "block"
  launchint2 = null;
  launchint3 = null;
  phone.style = "position:absolute;";
  shot = false;
  launchint = null;
  launchpos = 85;
  window.onclick = function() {shoot()}
}

function touches(ob1, ob2, top1) {
  var rect1 = ob1.getBoundingClientRect();
  var rect2 = ob2.getBoundingClientRect();
  if (top1) {
    var btm = parseInt(top1) + 100; 
    var newtop = parseInt(top1);
  } else {
    var btm = topp + 100;
    var newtop = topp
  }
  if (rect1.right > rect2.left && btm > parseInt(slingshot.style.top) && newtop < parseInt(slingshot.style.top)) {
     return true;
  } else {
    return false
  }
}

function shoot() {
  shot = true;
  window.onclick = null;
  launchint = setInterval(function() {
    launchpos = launchpos + 7
    phone.style.left = launchpos + "px"
    if (launchpos > window.screen.availWidth - 50) {
      resetSling()
    }
  if (touches(phone,ship)) {
      hit()
    }
    trackA()
  },1)
}

window.onclick = function() {shoot()}

function tgtmove() {
  topp = topp + 1
  right = right + 2
  ship.style.right = right + "px";
  ship.style.top = topp + "px";
  var border =  (50 / 100) * window.screen.availWidth;
  if (right == border) {
    lose()
  }
  if (powerup == "note7" && parseInt(phone.style.left) > ((50 / 100) * window.screen.availWidth)) {
    note7()
    resetSling();
    phone.style.display = "none"
  }
}

function popup(text,bkgb) {
  if (!text) {
    popupH.style.width = "2px"
    popupH.style.height = "2px"
    popupcontent.innerHTML = "";
    setTimeout(function() {
      myModal.style.display = "none";
    },500)
  } else {
  myModal.style.display = "block";
  if(bkgb == true) {
    clearInterval(shipint)
    clearInterval(launchint)
    slingshot.style.display = "none"
    addin.innerHTML = "";
    ship.style = "position:absolute; right:20px; top:10px; display:none;";
    topp = 10;
    right = 20;
  }
  
  setTimeout(function() {
    popupH.style.width = "600px"
    popupH.style.height = "200px"
  },50)
    setTimeout(function() {popupcontent.innerHTML = text;},500)
  }
}
      
function lose() {
  popup("<h1>You Lost!</h1><h3>Your Score: " + hits + "</h3><p style='font-family:sans-serif'>Click anywhere to continue</p>",true)
  window.onclick = function() {popup();resetShip();resetSling();};
  lost = true
  clearInterval(shipint)
  speed = 50;
  hits = 0;
}

function win() {
  if (!lost) {
    popup("<h1>You Win!</h1><p style='font-family:sans-serif'>Click anywhere to continue</p>",true);
    clearInterval(shipint)
    window.onclick = function() {location.reload();popup();}
  }
}

function startI() {
  shipint = setInterval(tgtmove,speed)
  window.onclick = function() {shoot()}
}

function resetShip() {
  img.src = "ship.png";
  ship.style = "position:absolute; right:20px; top:10px";
  topp = 10;
  right = 20;
  startI()
}

function hit() {
  clearInterval(shipint)
  resetSling()
  img.src = "https://i.gifer.com/origin/d7/d7ac4f38b77abe73165d85edf2cbdb9e_w200.gif";
  hits = hits + 1;
  if (speed > 0) {
    speed = speed - 3;
  } else {
    newtgt()
    if (extraships == 2) {
      setTimeout(win,30000)
    }
  }
  setTimeout(resetShip,1000)
}

function newtgt() {
  if (extraships > 5) {lose();extraships = 1;} else {
  var toadd = document.createElement("div")
  toadd.setAttribute("class","alientgt")
  var lmin = (50 / 100) * window.screen.availWidth;
  var lmax = document.body.clientWidth - 200;
  var randTop = (document.body.clientHeight - 200) * Math.random() + 'px';
  var randLeft = Math.random() * (lmax - lmin) + lmin + 'px';
  toadd.style = "top:" + randTop + ";left:" + randLeft
  toadd.setAttribute("id","ship" + extraships)
  toadd.innerHTML = '<img src="alien.png" width="50" height="50"/>';
  addin.appendChild(toadd)
  extraships = extraships + 1;
  }
}

function trackA() {
  var elemlist = addin.querySelectorAll("div")
  Object.keys(elemlist).forEach(function (k) {
    if (touches(phone,elemlist[k],parseInt(elemlist[k].style.top))) {
      elemlist[k].innerHTML = '<img src="https://i.gifer.com/origin/d7/d7ac4f38b77abe73165d85edf2cbdb9e_w200.gif" width="50" height="50"/>';
      console.log(elemlist[k])
      hits = hits + 1;
      extraships = extraships - 1;
      resetSling();
      setTimeout(function() {elemlist[k].remove()},1000)
    }
  });
}

function note7() {
  pn7.style.display = "block";
  setTimeout(function() {
  pn7.src = "https://i.gifer.com/origin/d7/d7ac4f38b77abe73165d85edf2cbdb9e_w200.gif"
  hit()
  var elemlist = addin.querySelectorAll("div")
  Object.keys(elemlist).forEach(function (k) {
      elemlist[k].innerHTML = '<img src="https://i.gifer.com/origin/d7/d7ac4f38b77abe73165d85edf2cbdb9e_w200.gif" width="50" height="50"/>';
      console.log(elemlist[k])
      hits = hits + 1;
      extraships = extraships - 1;
      resetSling();
      setTimeout(function() {elemlist[k].remove()},1000)
  });
  },1500)
  setTimeout(function() {pn7.src = "phones/note7.png";pn7.style.display = "none";phone.style.display = "inline";resetPowerup()},2000);
}
function resetPowerup() {
  phone.src = "phones/basic_phone.png"
  powerup = "";
}

function note7run() {
  powerup = "note7";
  phone.src = "phones/note7.png"
}

function pause() {
  clearInterval(shipint)
  popup("<h1>Game Paused</h1><p style='font-family:sans-serif'>Click anywhere to continue</p>")
  window.onclick = function() {startI();popup();shot = false};
  shot = true
  
} 

function countdown() {
  popup("<h1>Get Ready!</h1><p id='count'>3</p>")
  launchint = setInterval(function() {
    if (startNum > 1) {
      startNum = startNum - 1;
      count.innerText = startNum;
  } else {
    popup()
    startI()
    clearInterval(launchint)
  }
  },1000)
}

window.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    pause()
  }
});

if (!localStorage.getItem("tutorial")) {
  popup("<h1>How to Play</h1><ol style='font-family:sans-serif'><li>Move your cursor to control the slingshot</li><li>Press escape to pause</li><li>Click to shoot your phone</li></ol>")
  window.onclick = function() {popup();startI()}
  localStorage.setItem("tutorial","done")
  countdown()
} else {
  countdown()
}
