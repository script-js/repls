var topp = 10
var right = 20;
var hits = 0;
var speed = 50;
var launchpos = 85;
var shipint;
var launchint;
var extraships = 1;
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

function touches(ob1, ob2, csid) {
  var rect1 = ob1.getBoundingClientRect();
  var rect2 = ob2.getBoundingClientRect();
  var btm = rect1.top + rect1.height;
  if (csid) {var newtop = parseInt(csid)} else {var newtop = topp}
  
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
  clearInterval(shipint)
  speed = 50;
  hits = 0;
}

function startI() {
  shipint = setInterval(tgtmove,speed)
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
  speed = speed - 3
  setTimeout(resetShip,1000)
}

function newtgt() {
  if (extraships > 5) {lose()} else {
  var toadd = document.createElement("div")
  toadd.setAttribute("class","alientgt")
  var randTop = (document.body.clientHeight - 200) * Math.random() + 'px';
  var randLeft = (document.body.clientWidth - 200) * Math.random() + 'px';
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
    console.log(elemlist[k])
    if (touches(phone,elemlist[k],elemlist[k].style.top)) {
      elemlist[k].innerHTML = '<img src="https://i.gifer.com/origin/d7/d7ac4f38b77abe73165d85edf2cbdb9e_w200.gif" width="50" height="50"/>';
      hits = hits + 1;
      extraships = extraships - 1;
      resetSling();
      setTimeout(function() {elemlist[k].style.display = "none"},1000)
    }
  });
}
