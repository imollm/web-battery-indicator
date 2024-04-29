function secondsToHMS(seconds) {
  if (seconds === Infinity) return `~`;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours} hours, ${minutes} minutes, ${remainingSeconds} seconds`;
}

function getBrowser() {
  // Get the user agent string
  var userAgent = navigator.userAgent;

  // Check for common browser strings
  if (userAgent.indexOf("Chrome") !== -1) {
    return "Chrome";
  } else if (userAgent.indexOf("Firefox") !== -1) {
    return "Firefox";
  } else if (userAgent.indexOf("Safari") !== -1) {
    return "Safari";
  } else if (
    userAgent.indexOf("MSIE") !== -1 ||
    userAgent.indexOf("Trident/") !== -1
  ) {
    return "Internet Explorer";
  } else if (userAgent.indexOf("Edge") !== -1) {
    return "Microsoft Edge";
  } else {
    return "Unknown browser";
  }
}

function updateAllBatteryInfo(battery) {
  updateChargeInfo(battery);
  updateLevelInfo(battery);
  updateChargingInfo(battery);
  updateDischargingInfo(battery);
}

function updateChargeInfo(battery) {
  console.log(`Battery charging? ${battery.charging ? "Yes" : "No"}`);
  battery.charging
    ? document.querySelector(".charging").classList.add("active")
    : document.querySelector(".charging").classList.remove("active");
}

function updateLevelInfo(battery) {
  console.log(`Battery level: ${battery.level * 100}%`);
  document.querySelector(".percentage").innerHTML = `${battery.level * 100}%`;
  document.querySelector(".level").style.width = `${battery.level * 200}px`;
}

function updateChargingInfo(battery) {
  const hms = secondsToHMS(battery.chargingTime);
  console.log(`Battery charging time: ${hms}`);
  document.querySelector(".charging-time .value").innerHTML = hms;
}

function updateDischargingInfo(battery) {
  const hms = secondsToHMS(battery.dischargingTime);
  console.log(`Battery discharging time: ${hms}`);
  document.querySelector(".discharging-time .value").innerHTML = hms;
}

if ("getBattery" in navigator) {
  // if (false) {
  navigator.getBattery().then((battery) => {
    updateAllBatteryInfo(battery);

    battery.addEventListener("chargingchange", () => {
      updateChargeInfo(battery);
    });

    battery.addEventListener("levelchange", () => {
      updateLevelInfo(battery);
    });

    battery.addEventListener("chargingtimechange", () => {
      updateChargingInfo(battery);
    });

    battery.addEventListener("dischargingtimechange", () => {
      updateDischargingInfo(battery);
    });
  });
} else {
  document.querySelector(".battery").classList.add("incompatible");
  document.querySelector(".battery-times").classList.add("hide");
  document.querySelector(".percentage").innerHTML = "";
  document
    .querySelector(".battery-incompatible-message")
    .classList.remove("hide");
  document.querySelector(
    ".battery-incompatible-message"
  ).innerHTML = `${getBrowser()} doesn't support <a href="https://caniuse.com/battery-status">Battery Support API</a>`;
}
