var content = 0;
let body_element = [];
let check_exist = [];
var user_input;
var input = document.getElementById("search").value;

function showData() {
    var input = document.getElementById("search").value;

    input = input.trim();
    user_input = input.toLowerCase();

    if (input.length >= 1) {
        var result_404 = document.getElementById('search_result_404');
        result_404.classList.add("display_none");
        var loading_bar = document.getElementById('search_time_loading');
        loading_bar.classList.add("display_block");

    } else {
        if (content == 0) {
            var result_404 = document.getElementById('search_result_404');
            result_404.className = "search_result_404 display_block";
        }
        var loading_bar = document.getElementById('search_time_loading');
        loading_bar.className = "search_time_loading";
    }
}
document.getElementById("search").addEventListener("keyup", function (e) {
    // Number 13 is the "Enter" key on the keyboard
    var input = document.getElementById("search").value;
    if (e.which === 13) {
        e.stopPropagation();
        e.preventDefault();
       
        if (input.length >= 1) {
            fetch_data_of_state(input);
        } else {
            var result_404 = document.getElementById('search_result_404');
            result_404.className = "search_result_404 display_block";
        }

    }
});

setInterval(function () {
    if (content == 0){

    } else if (body_element.length <= 1) {
        const clear_button = document.getElementById('clear_search_content');
        
        clear_button.innerHTML = `<div class="container">
                <button style="width: 100%; margin-top:20px; margin-bottom:20px" class="btn btn-danger" onclick="delete_content()"> <i class="fas fa-trash-alt"></i>  Clear </button>
            </div>`
        
    }else {
        const clear_button = document.getElementById('clear_search_content');
        
        clear_button.innerHTML = `<div class="container">
                <button style="width: 100%; margin-top:20px; margin-bottom:20px" class="btn btn-danger" onclick="delete_content()"> <i class="fas fa-trash-alt"></i>  Clear All</button>
            </div>`
        
    }
},800)

function delete_content(){
    var clear_button = document.getElementById('clear_search_content');
    clear_button.innerHTML = '';

    const body = document.getElementById('search_result');
    body.innerHTML = '';

    var input = document.getElementById("search").value = "";

    body_element = [];
    check_exist = [];
    content = 0;
    var result_404 = document.getElementById('search_result_404');
    result_404.className = "search_result_404 display_block";
}
    

function fetch_data_of_state(state) {
    const state_weather = {};
    const KELVIN = 273;
    var do_next = false;
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=17c1eddf53148baa5100a0ed7d9c740b`;
    var input = document.getElementById("search").value;

    console.log(check_exist.includes(input) +  input + check_exist);

    if (check_exist.includes(input) == false){
        fetch(url, { method: "GET" })
            .then((response) => {
                if (response.ok) {
                    let data = response.json();
                    do_next = true;
                    check_exist.push(input);
                    return data;
                } else if (response.status === 404) {
                    do_next = false;
                    var loading_bar = document.getElementById('search_time_loading');
                    loading_bar.className = "search_time_loading";
                    return alert('State not found :(')
                } else {
                    do_next = false;
                    return alert('Hey User we increasing your server so sorry for facing error :-( Try some time letter or refresh the web Page ');
                }
            })
            .then(function (data) {
                if (do_next == true) {


                    state_weather.temperature = data.main.temp;
                    state_weather.description = data.weather[0].description;
                    state_weather.iconId = data.weather[0].icon;
                    state_weather.city = data.name;
                    state_weather.country = data.sys.country;
                    state_weather.latitude = data.coord.lat;
                    state_weather.longitude = data.coord.lon;
                    state_weather.wind_temperature_might_be = data.main.temp;
                    state_weather.wind_min_temperature = data.main.temp_min;
                    state_weather.wind_max_temperature = data.main.temp_max;
                    state_weather.wind_temperature_feel_like = data.main.feels_like;
                    state_weather.wind_humidity = data.main.humidity;
                    state_weather.wind_pressure = data.main.pressure;
                    state_weather.wind_speed = data.wind.speed;
                    state_weather.wind_degree = data.wind.deg;
                    state_weather.database_on = data.base;

                    showWeatherList();

                }
                function CelToFOrFToCel(value) {
                    return `<b>${Math.floor(value) - KELVIN}</b>℃ / <b>${Math.floor(((value - KELVIN) * 9 / 5) + 32)}</b>℉`;
                }
                function showWeatherList() {
                    var input = document.getElementById("search").value;
                    const body = document.getElementById('search_result');

                    function save(value) {
                        body_element.unshift(value);
                    }


                    // const body_material = `${input}`;
                    const body_material = `<div class="search_result_200 " >
            <div class="row">
            <div class="col">
            <img src="./icons/${state_weather.iconId}.svg" alt="" class="img-responsive s_r_200_image_of_w">
        </div>
        <div class="col go_in_image_s">
            <h2 class="s_r_200_text_of_w" >${CelToFOrFToCel(state_weather.temperature)}</h2>
    
    <p class="s_r_200_text_p_of_w">Hey Dear wheatear of <span style="text-transform: capitalize;" ><b>${input}</b> </span> are <b style="text-transform: capitalize;">${state_weather.description}</b></p>
            <hr style="width: 50%; " >
            <span class="state_name"> ${state_weather.country} , ${state_weather.city}</span>
            <span class="temperature_s" style="display: inline;">/ Wind Condition <b>${CelToFOrFToCel(state_weather.wind_temperature_might_be)} </b> Speed on <b> ${state_weather.wind_speed} mps </b> </span> <br>
            <span>Wind Temp Might Be:- <b>${CelToFOrFToCel(state_weather.wind_temperature_might_be)}</b> </span> <br>
            <span>Temp Goes on <b>Min</b> ${CelToFOrFToCel(state_weather.wind_min_temperature)} <b>Max</b> ${CelToFOrFToCel(state_weather.wind_max_temperature)} </span>
        </div>
    </div>
        </div>`





                    save(body_material);

                    var loading_bar = document.getElementById('search_time_loading');
                    loading_bar.className = "search_time_loading";

                    body.innerHTML = body_element;
                    content = content + 1;



                }

            })
            .catch(function (error) {
                console.log(error);
            });
    } else {
        alert('You search already this state');
    }


}

