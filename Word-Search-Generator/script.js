var words;
var n;
var wordamnt;
var wordstemp = "";
var wsearch = "";
var noriginal;
var interval;
var usedws = [""];
var interval2;
var interval3;
var alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var choices = ["rwordn","rwordb","rletterc","rletterc","rletterc","rletterc","rletterc","rletterc","rletterc","rletterc"]



function reverseWords(str) {
  let reverseWordArr = str.split(" ").map(word => word.split("").reverse().join(""));
  return reverseWordArr.join(" ");
}

function additem() {
  var choice = choices[(Math.floor(Math.random() * choices.length))];
  var wl = words.length + 1
  if (usedws.length == wl) {
    clearInterval(interval3)
    displayws()
  } else {
  if (choice == "rletterc") {
    var fivel = alphabet[(Math.floor(Math.random() * alphabet.length))] + alphabet[(Math.floor(Math.random() * alphabet.length))] + alphabet[(Math.floor(Math.random() * alphabet.length))] + alphabet[(Math.floor(Math.random() * alphabet.length))] + alphabet[(Math.floor(Math.random() * alphabet.length))];
    wsearch = wsearch + fivel
  } else if (choice == "rwordn") {
    var newword = words[(Math.floor(Math.random() * words.length))]
    if (usedws.includes(newword)) {
      console.log("used")
    } else {
      wsearch = wsearch + "<span class='word' onclick='crossoff(this)'>" + newword + "</span>";
      usedws.push(newword)
    }
  } else if (choice == "rwordb") {
    var newword = words[(Math.floor(Math.random() * words.length))]
    if (usedws.includes(newword)) {
      console.log("used")
    } else {
      console.log(newword)
      wsearch = wsearch + "<span class='word' onclick='crossoff1(this)'>" + reverseWords(newword) + "</span>";
      usedws.push(newword)
    }
  }
  }
}


function ns() {
var words = document.getElementById("words")
  eval("n = " + num.value)
  eval("noriginal = " + num.value)
  if (n > 10) {
    var c = confirm("If you have more than 10 words, your word search will be very long. Are you sure you want to continue?")
    if (c == true) {
      words.innerHTML = "";
      interval = setInterval(nsloop,30)
    }
  } else if (n < 3) {
    alert("Minimum is 3 words")
  } else {
    words.innerHTML = "";
    interval = setInterval(nsloop,30)
  }
}

function nsloop() {
var words = document.getElementById("words")
  if (n > 0) {
    words.innerHTML = words.innerHTML + "<input id='word" + n + "' />"
    n = n - 1
  } else {
    words.innerHTML = words.innerHTML + "<button onclick='creates()'>Create</button>"
    clearInterval(interval)
  }
}

function wseparate() {
  document.getElementById("wordlist").innerHTML = "<p></p><h3>Words:</h3><p></p>" + words + ",";
}

function creates() {
var words = document.getElementById("words")
  words.style.display = "none";
  lodimg.style.display = "block";
  interval2 = setInterval(createloop1,5)
}

function retry() {
  usedws = [""]
  wsearch = "";
  wordlist.style.display = "none"
  newwords.style.display = "none";
  lodimg.style.display = "block";
  startadd()
}

function createloop1() {
  if (noriginal > 1) {
    wordstemp = wordstemp + "'" + document.getElementById("word" + noriginal).value.toUpperCase() + "',";
    noriginal = noriginal - 1
  } else {
    wordstemp = wordstemp + "'" + word1.value.toUpperCase() + "'";
    eval("words = [" + wordstemp + "]")
    startadd()
    clearInterval(interval2)
  }
}

function startadd() {
  eval("wordamnt = " + words.length)
  interval3 = setInterval(additem,5)
}

function printready() {
  var p = prompt("Word Search Title:")
  if (p) {
    printReadyTitle.innerHTML = "<h1 class='oswald'>" + p + "</h1><h3 class='oswald'>Word Search</h3>";
    window.print()
  }
}

function displayws() {
  newwords.innerHTML = "<div class='wsbox'>" + wsearch + "</div><div id='endctrl'><button onclick='retry()'>Try Again</button><button onclick='location.reload()'>Create New</button><button onclick='printready()'>Print/Save as PDF</button></div>";
    wseparate()
    wordlist.style.display = "block"
  newwords.style.display = "block";
    lodimg.style.display = "none";
}

function crossoff(itm) {
   wordlist.innerHTML = wordlist.innerHTML.replace(itm.innerHTML + ",","")
}
function crossoff1(itm) {
   wordlist.innerHTML = wordlist.innerHTML.replace(reverseWords(itm.innerHTML) + ",","")
}
