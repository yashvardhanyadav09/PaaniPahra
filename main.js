// Mian Code file for my Website
// Contains all the data

var emailContactus ="yashvardhanyadav1709@gmail.com"; // Set your actual email address here

const myapiCoolersAll    ="https://paanipahraapi.onrender.com/api/coolers"
const myapiCoolersSingle ="https://paanipahraapi.onrender.com/api/coolers/"

var coolerInfo_Local_Test = {
    location01A: { title: "Location-01 : Left Wing, G-Floor", 
                   video: "https://www.youtube.com/embed/tgbNymZ7vqY", 
                   waterLevel: "30 Litre", safety: "Green", waterTemp: "20", systemWorking: "OK" },
    location02A: { title: "Location-02 : Right Wing, G-Floor",video: "https://www.youtube.com/embed/5qap5aO4i9A",  
                   waterLevel: "25 Litre", safety: "Green", waterTemp: "19", systemWorking: "OK" },
    location01B: { title: "Location-03 : Left Wing", video: "https://www.youtube.com/embed/tgbNymZ7vqY", 
                   waterLevel: "20 Litre", safety: "Green",  waterTemp: "21", systemWorking: "OK" },
    location02B: { title: "Location-04 : Right Wing", video: "https://www.youtube.com/embed/5qap5aO4i9A",  
                    waterLevel: "23 Litre", safety: "Green", waterTemp: "20", systemWorking: "OK" },
    location01C: { title: "Location-05 : Left Wing",  video: "https://www.youtube.com/embed/tgbNymZ7vqY", 
                    waterLevel: "20 Litre", safety: "Green", waterTemp: "22", systemWorking: "OK" },
    location02C: { title: "Location-06 : Right Wing", video: "https://www.youtube.com/embed/5qap5aO4i9A",  
                    waterLevel: "33 Litre", safety: "Green", waterTemp: "27", systemWorking: "OK" },
    location01D: { title: "Location-07 : Left Wing",   video: "https://www.youtube.com/embed/tgbNymZ7vqY",  
                    waterLevel: "40 Litre", safety: "Green", waterTemp: "21", systemWorking: "OK" },
    location02D: { title: "Location-08 : Right Wing", video: "https://www.youtube.com/embed/5qap5aO4i9A", 
                    waterLevel: "35 Litre", safety: "Green", waterTemp: "27", systemWorking: "OK" }
};

function getParam(  name ) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
}

async function showCooler() 
{
    var id = getParam("id");  // e.g. "location01A"
    console.log ("Entered Show Coolers")
    console.log("Show cooler Live view data", id);
    // console.log(coolerInfo);

    if (!id) {
        console.log ("Key not Found")
        document.getElementById("title").textContent = "Live View - Invalid ID";
        document.getElementById("container").innerHTML = "<p>No data for this cooler.</p>";
        return;
    }

   //-------------------------------
   // Get Data from main APi
   var myURLSingleCooler = myapiCoolersSingle + id;
   const res  = await fetch(myURLSingleCooler);
   const data = await res.json();

    console.log(data); 

    // Pick values from JSON
    const title          = data.title;          // Title 
    const video          = data.video;          // Video 
    const waterLevel     = data.waterLevel;     // Water Level in Cooler
    const safety         = data.safety;         // Safety Level
    const waterTemp      = data.waterTemp;      // Cooler Water Temperature
    const systemWorking  = data.systemWorking;  // System Status

    // Update inner HTML / text on page
    console.log("Info Data", data);

    document.title = "Live View - " + title;
    document.getElementById("title").textContent = title + " - Live View";

    document.getElementById("container").innerHTML = `
        <div class="live-video-container">
            <iframe width="480" height="270" src="${video}" frameborder="0"
                    allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
        <div class="cooler-details">
            <table class="location-status-table">
                <tr><td>Water Level</td><td class="data-cell">${waterLevel}</td></tr>
                <tr><td>Safety</td><td class="data-cell green">${safety}</td></tr>
                <tr><td>Water Temperature</td><td class="data-cell">${waterTemp}</td></tr>
                <tr><td>System Working</td><td class="data-cell ok">${systemWorking}</td></tr>
            </table>
        </div>
    `;
}

// Dashboard HTML
async function showDashboard() {

    // Get Data from main APi
    var myURL = myapiCoolersAll ;

    const res  = await fetch(myURL);
    const data = await res.json();

    console.log(data); 

    document.getElementById("container").innerHTML = `
    <div class="header">
        AI Based RO Water System with Auto Adjustable Temp, Child Safe Environment & Central Water Requirements Prediction
    </div>
    <div class="main-title">Main Dashboard</div>
    <div class="dashboard-section">
        <table class="dashboard-table">
            <tr>
                <td>Main Tank Water Level</td>
                <td class="water-level">230 Liters</td>
            </tr>
            <tr>
                <td>Over All Safety Indicator</td>
                <td class="indicator">Green</td>
            </tr>
        </table>
    </div>
    <div class="sub-title">Individual Locations</div>
    <div class="locations-section">
        <div class="locations-grid">
            ${Object.keys(data).map(id => {
                let info = data[id];
                if (!info) return `<div>Cooler ${id} not found</div>`;
                const CoolerWaterLevelColor = getCoolerWaterLevelColor(info.waterLevel);
                const tempColor = getTempColor(info.waterTemp);
                const safetyColor = getSafetyColor(info.safety);
                const systemWorkingColor = getSystemStateColor(info.systemWorking);

                return `
                    <div class="location-card">
                        <div class="location-title">${info.title}</div>
                        <table class="location-status-table">
                            <tr>
                                <td>Water Level</td>
                                <td class="data-cell" style="background-color: ${CoolerWaterLevelColor}; color: white; font-weight: bold;">${info.waterLevel}</td>
                            </tr>
                            <tr>
                                <td>Safety</td>
                                <td class="data-cell" style="background-color: ${safetyColor}; color: white; font-weight: bold;">
                                    ${info.safety}
                                </td>
                            </tr>
                            <tr>
                                <td>Water Temperature</td>
                                <td class="data-cell" style="background-color: ${tempColor}; color: white; font-weight: bold;">
                                    ${info.waterTemp}°C
                                </td>
                            </tr>
                            <tr>
                                <td>System Working</td>
                                <td class="data-cell" style="background-color: ${systemWorkingColor}; color: white; font-weight: bold;">
                                    ${info.systemWorking}
                                </td>
                            </tr>
                        </table>
                        <a class="show-live-btn" href="live.html?id=${id}">Show Live</a>
                    </div>
                `;
            }).join('')}
        </div>
    </div>
`;

}


// get the email address to other locations
function getEmailContactus() {
    document.getElementById("contactususemail").href = "mailto:" + emailContactus +"?subject=RO%20Dashboard%20Query&body=Hello%2C%0A";

}

function getCoolerWaterLevelColor(value) {
  const val = Math.min(Math.max(parseFloat(value), 0), 300);  // clamp 0-300
  const normalized = val / 300;  // 0 to 1

  // Interpolate red to green
  const r = Math.round(255 * (1 - normalized));  // red decreases
  const g = Math.round(255 * normalized);        // green increases
  const b = 0;

  return `rgb(${r},${g},${b})`;
}


// Function to get color based on temperature (25=red → 5=blue)
function getTempColor(temp)
{
    const t = parseFloat(temp);
    // Normalize 5-25°C to 0-1 range
    const normalized = Math.max(0, Math.min(1, (t - 5) / 20));
    // Red (255,0,0) → Blue (0,0,255)
    const b = Math.round(255 * (1 - normalized));
    const g = 0;
    const r = Math.round(255 * normalized);
    return `rgb(${r},${g},${b})`;
}

function getSafetyColor(safety) 
{
  switch (safety.toLowerCase()) {
    case "green":
      return "#28a745";  // green
    case "yellow":
      return "#ffc107";  // yellow
    case "red":
      return "#dc3545";  // red
    default:
      return "transparent";  // default
  }
}

function getSystemStateColor(SystemState) 
{
  switch (SystemState.toLowerCase()) {
    case "ok":
      return "#28a745";  // green
    case "not ok":
      return "#dc3545";  // red
    default:
      return "yellow";  // default
  }
}


//========================================================================================
//----------------------------------------------------------------------------------------
//    Code below this is only for Information and reference not in use
//---------------------------------------------------------------------------------------

// This function is without async function 
// Used for testing the fromnt End
function showCooler_Old() 
{
    var id = getParam("id");  // e.g. "location01A"
    console.log("Show cooler Live view data", id);
    console.log(coolerInfo);

    //--------------------------------

    if (!id || !coolerInfo[id]) {
        document.getElementById("title").textContent = "Live View - Invalid ID";
        document.getElementById("container").innerHTML = "<p>No data for this cooler.</p>";
        return;
    }

    let info = coolerInfo[id];
    console.log("Info Data", info);

    document.title = "Live View - " + info.title;
    document.getElementById("title").textContent = info.title + " - Live View";

    document.getElementById("container").innerHTML = `
        <div class="live-video-container">
            <iframe width="480" height="270" src="${info.video}" frameborder="0"
                    allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
        <div class="cooler-details">
            <table class="location-status-table">
                <tr><td>Water Level</td><td class="data-cell">${info.waterLevel}</td></tr>
                <tr><td>Safety</td><td class="data-cell green">${info.safety}</td></tr>
                <tr><td>Water Temperature</td><td class="data-cell">${info.waterTemp}</td></tr>
                <tr><td>System Working</td><td class="data-cell ok">${info.systemWorking}</td></tr>
            </table>
        </div>
    `;
}
//---------------------------------------------------------------------------------------------------------------
// Dashboard HTML
function showDashboard_Old() {
    document.getElementById("container").innerHTML = `
        <div class="header">
            AI Based RO Water System with Auto Adjustable Temp, Child Safe Environment &amp; Central Water Requirements Prediction
        </div>
        <div class="main-title">Main Dashboard</div>
        <div class="dashboard-section">
            <table class="dashboard-table">
                <tr>
                    <td>Main Tank Water Level</td>
                    <td class="water-level">230 Liters</td>
                </tr>
                <tr>
                    <td>Over All Safety Indicator</td>
                    <td class="indicator">Green</td>
                </tr>
            </table>
        </div>
        <div class="sub-title">Individual Locations</div>
        <div class="locations-section">
            <div class="locations-grid">
                ${[
                    ["location01A", "location02A"],
                    ["location01B", "location02B"],
                    ["location01C", "location02C"],
                    ["location01D", "location02D"]
                ].map(pair => `
                    ${pair.map(id => {
                        let info = coolerInfo[id];
                        return `
                        <div class="location-card">
                            <div class="location-title">${info.title}</div>
                            <table class="location-status-table">
                                <tr><td>Water Level</td><td class="data-cell">${info.waterLevel}</td></tr>
                                <tr><td>Safety</td><td class="data-cell green">${info.safety}</td></tr>
                                <tr><td>Water Temperature</td><td class="data-cell">${info.waterTemp}</td></tr>
                                <tr><td>System Working</td><td class="data-cell ok">${info.systemWorking}</td></tr>
                            </table>
                            <a class="show-live-btn" href="live.html?id=${id}"> Show Live</a>
                        </div>
                        `
                    }).join('')}
                `).join('')}
            </div>
        </div>
    `;
}
//--------------------------------------------------------------------------------------------------------