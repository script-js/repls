function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      oput.value = e.target.result;
    };

    reader.readAsDataURL(input.files[0]);
  } else {
    alert("No file to convert.")
  }
}

