var backendUrl = "http://localhost:5000/check-green-scene";

var button = $("#deteksi");
var input = $("#gambar");
var imagePreview = $("#previewgambar");
var resultContainer = $("#hasil");
var selectedImage;
var sampahButton = $(".popup-button");

var dirtyPopup = $("#popup-dirty");
var cleanPopup = $("#popup-clean");

function getBase64Image(element) {
  var file = element.files[0];
  if (!file) return;

  imagePreview.attr("src", URL.createObjectURL(file));
  var reader = new FileReader();

  reader.onloadend = function () {
    selectedImage = reader.result;
  };
  reader.readAsDataURL(file);
}

async function onGetResponseFromBackend(data) {
  incomingData = await data;
  parsedData = JSON.parse(incomingData);
  console.log(parsedData);
  if (parsedData == 1) {
    resultContainer.html("<p>hasil: kotor</p>");
    dirtyPopup.removeClass("hidden");
  } else {
    resultContainer.html("<p>hasil: bersih</p>");
    cleanPopup.removeClass("hidden");
  }
}

button.click(function () {
  var data = JSON.stringify({ imageencoded: selectedImage });
  resultContainer.html(
    "<p>loading... mengirim data ke backend & machine learning</p>"
  );

  $.ajax({
    url: backendUrl,
    type: "POST",
    data: data,
    contentType: "application/json",
    complete: onGetResponseFromBackend,
  });
});

sampahButton.click(function (e) {
  $(this).closest(".popup").addClass("hidden");
});
