let apiKey = `ba35c40d004441df86b1d6865a877ae6`;
let uppercontainer = document.getElementById("uppercontainer");
let input = document.getElementById("input");
let result = document.getElementById("result");
let error = document.querySelector(".error");
let resultcontainer = document.querySelector(".resultcontainer")


if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else {
  alert("Geolocation is not supported by this browser.");
}

//picikng addres from lat and lang 
async function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&format=json&apiKey=${apiKey}`);
  let data = await response.json();
  if (data.length !== 0) {
    let name = data.results[0].timezone.name;
    let std = data.results[0].timezone.offset_STD;
    let stdsec = data.results[0].timezone.offset_STD_seconds;
    let dst = data.results[0].timezone.offset_DST;
    let dstsec = data.results[0].timezone.offset_DST_seconds;
    let country = data.results[0].country;
    let city = data.results[0].city;
    uppercontainer.innerHTML = `<div>Name Of Time Zone : ${name}</div>
                                <div class="lonspan"><span>Lat : ${lat}</span><span>Long : ${long}</span></div>
                                <div>Offset STD : ${std}</div>
                                <div>Offset STD Seconds : ${stdsec}</div>
                                <div>Offset DST : ${dst}</div
                                <div>Offset DST Seconds : ${dstsec}</div>
                                <div>Country : ${country}</div>
                                <div>City : ${city}</div>`;
  }
  else {
    alert("No location found");
  }
}




// picking address from address given by user 
async function getByAddress(){
  if(input.value){
    if(error.style.display==="block"){
      error.style.display = "none";
    }
    let address = input.value;
    let response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${apiKey}`);
    let data = await response.json();
    if(data.features.length !== 0){
      result.innerHTML="";
      resultcontainer.style.display = "block"
        let name = data.features[0].properties.timezone.name;
        let lat = data.features[0].properties.lat;
        let long = data.features[0].properties.lon;
        let std = data.features[0].properties.timezone.offset_STD;
        let stdsec = data.features[0].properties.timezone.offset_STD_seconds;
        let dst = data.features[0].properties.timezone.offset_DST;
        let dstsec = data.features[0].properties.timezone.offset_DST_seconds;
        let country = data.features[0].properties.country;
        let city = data.features[0].properties.city;
        console.log(data.features[0]);
        result.innerHTML = `<div>Name Of Time Zone : ${name}</div>
                                    <div class="lonspan"><span>Lat : ${lat}</span><span>Long : ${long}</span></div>
                                    <div>Offset STD : ${std}</div>
                                    <div>Offset STD Seconds : ${stdsec}</div>
                                    <div>Offset DST : ${dst}</div
                                    <div>Offset DST Seconds : ${dstsec}</div>
                                    <div>Country : ${country}</div>
                                    <div>City : ${city}</div>`;
    }
    else{
      error.style.display = "block";
      resultcontainer.style.display = "none"
    }
  }
  else{
    if(resultcontainer.style.display==="block"){
      resultcontainer.style.display = "none";
    }
    error.style.display = "block";
  }
}