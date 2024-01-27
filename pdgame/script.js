var topp = 10
var right = 20;
var hits = 0;
var speed = 50;
var launchpos = 85;
var shipint;
var launchint;
var launchint2;
var launchint3;
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
  launchint2 = null;
  launchint3 = null;
  phone.style = "position:absolute;";
  shot = false;
  launchint = null;
  launchpos = 85;
  window.onclick = function() {shoot()}
}

function touches(ob1, ob2) {
  var rect1 = ob1.getBoundingClientRect();
  var rect2 = ob2.getBoundingClientRect();
  var btm = topp + 100;
  
  if (rect1.right > rect2.left && btm > parseInt(slingshot.style.top) && topp < parseInt(slingshot.style.top)) {
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
  if (touches(phone,ship)) {
      hit()
    }
}

function popup(text,bkgb) {
  popupcontent.innerHTML = text;
  myModal.style.display = "block";
  if(bkgb == true) {
    clearInterval(shipint)
    clearInterval(launchint)
    slingshot.style.display = "none"
    ship.style = "position:absolute; right:20px; top:10px; display:none;";
    topp = 10;
    right = 20;
  }
}
      
function lose() {
  alert("You Lost!\r \rYour Score:" + hits)
  clearInterval(shipint)
  speed = 50;
  hits = 0;
  resetShip()
  resetSling()
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

startI()
