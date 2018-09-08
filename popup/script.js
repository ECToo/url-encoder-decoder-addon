// Initialization
let DEBUG_MODE_ON = true; // default value
// let storageItem = browser.storage.local.get();
// storageItem.then(result => {
//   DEBUG_MODE_ON = result.isDebugModeOn;
// });
initialize();

function initialize() {
  // Setting default from Localstorage
  if (DEBUG_MODE_ON) {
    console.log("URL Encoder Decoder >> Restoring value from localStorage");
  }
  ["url1", "url2"].map(id => {
    document.querySelector("#" + id).value = localStorage.getItem(
      "urlEncoderDecoder." + id
    );
  });

  const enType =
    localStorage.getItem("urlEncoderDecoder.selectedEncodeType") ||
    "encodeURIType";
  document.querySelector("#" + enType).checked = true;

  const deType =
    localStorage.getItem("urlEncoderDecoder.selectedDecodeType") ||
    "decodeURIType";
  document.querySelector("#" + deType).checked = true;

  checkDiff();

  // Adding event listeners to input boxes
  ["#url1", "#url2"].map(id => {
    document.querySelector(id).addEventListener("keyup", () => {
      id === "#url1" ? encode() : decode();
    });
  });

  // Adding event listeners to radio buttons
  ["encodeURIType", "encodeURIComponentType"].map(type => {
    document.querySelector("#" + type).addEventListener("change", e => {
      if (e.target.value === "on") {
        encode();
        if (DEBUG_MODE_ON) {
          console.log(`URL Encoder Decoder >> ${type} Selected`);
        }
        localStorage.setItem("urlEncoderDecoder.selectedEncodeType", type);
      }
    });
  });

  ["decodeURIType", "decodeURIComponentType"].map(type => {
    document.querySelector("#" + type).addEventListener("change", e => {
      if (e.target.value === "on") {
        decode();
        if (DEBUG_MODE_ON) {
          console.log(`URL Encoder Decoder >> ${type} Selected`);
        }
        localStorage.setItem("urlEncoderDecoder.selectedDecodeType", type);
      }
    });
  });
}

// Update indicator text style if both input boxes have same text
function checkDiff() {
  if (
    document.querySelector("#url1").value &&
    document.querySelector("#url1").value ===
      document.querySelector("#url2").value
  ) {
    if (DEBUG_MODE_ON) {
      console.log(
        "URL Encoder Decoder >> Same value found in both input boxes."
      );
    }
    document
      .querySelector(".indicatorContainer #encoded")
      .classList.add("striked");
    document
      .querySelector(".indicatorContainer #decoded")
      .classList.add("striked");
  } else {
    document
      .querySelector(".indicatorContainer #encoded")
      .classList.remove("striked");
    document
      .querySelector(".indicatorContainer #decoded")
      .classList.remove("striked");
  }
}

function encode() {
//   if (DEBUG_MODE_ON) {
//     console.log(`URL Encoder Decoder >> Encoding`);
//   }
  document.querySelector("#url2").value = document.querySelector(
    "#encodeURIType"
  ).checked
    ? encodeURI(document.querySelector("#url1").value)
    : encodeURIComponent(document.querySelector("#url1").value);
  postProcess();
}

function decode() {
//   if (DEBUG_MODE_ON) {
//     console.log(`URL Encoder Decoder >> Decoding`);
//   }
  document.querySelector("#url1").value = document.querySelector(
    "#decodeURIType"
  ).checked
    ? decodeURI(document.querySelector("#url2").value)
    : decodeURIComponent(document.querySelector("#url2").value);
  postProcess();
}

function postProcess() {
  checkDiff();
  localStorage.setItem(
    "urlEncoderDecoder.url2",
    document.querySelector("#url2").value
  );
  localStorage.setItem(
    "urlEncoderDecoder.url1",
    document.querySelector("#url1").value
  );
}
