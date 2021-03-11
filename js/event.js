
function change_F_T_C_O_C(){ // change fahrenheit to celsius Or Celsius To Fahrenheit
    temperature.addEventListener("click", check);
    console.log(whether_status)
}

function check(){
    if (whether_status == true) {
        CelToFar();
        console.log(whether_status);
    } else if(whether_status == false) {
        FarToCel();
        console.log(whether_status)
    } else {
        console.log("Error 403 Forbidden");
    }
}
function CelToFar(){
    const KELVIN = 273;
    temperature.innerText = `${Math.floor(((temperature_temp) * 9/5) + 32)}℉`;
    whether_status = false;
}
function FarToCel(){
    temperature.innerText = `${temperature_temp}℃ `;
    whether_status = true;
}
change_F_T_C_O_C();


