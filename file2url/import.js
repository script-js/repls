var i2uimglink;
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      i2uimglink = e.target.result;
    };

    reader.readAsDataURL(input.files[0]);
  } else {
    alert("[IMAGE2URL] error: no file")
  }
}


