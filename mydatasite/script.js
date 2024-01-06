var eet = "</script>";
function locationReplace(goto) {
  var l = document.createElement("a")
  l.setAttribute("target","_top")
  l.setAttribute("href",goto)
  l.click()
}