var whether_status = true; // true = C*0 false = F*0
var temperature_temp;

let weatherInfoUpdateTime;
function fetch_weather_data_form_api(){
    
    const temperature = document.getElementById('temperature');
    const temperature_status = document.getElementById('temperature_status');
    const temperature_description = document.getElementById('temperature_description');
    const images_for_weather = document.getElementById('images_for_weather');
    const w_d_Wind_Temp_Might_Be = document.getElementById('w_d_Wind_Temp_Might_Be');
    const w_d_Wind_Temp_Min = document.getElementById('w_d_Wind_Temp_Min');
    const w_d_Wind_Temp_Max = document.getElementById('w_d_Wind_Temp_Max');
    const w_d_Wind_Temps_feel_like = document.getElementById('w_d_Wind_Temps_feel_like');
    const w_g_i_Wind_humidity = document.getElementById('w_g_i_Wind_humidity');
    const w_g_i_Wind_Pressure = document.getElementById('w_g_i_Wind_Pressure');
    const w_g_i_Wind_Speed_w_g_i_Wind_Pressure = document.getElementById('w_g_i_Wind_Speed_w_g_i_Wind_Pressure');
    const w_g_i_Wind_degree_w_g_i_Wind_Pressure = document.getElementById('w_g_i_Wind_degree_w_g_i_Wind_Pressure');
    const c_s_location = document.getElementById('c_s_location');
    const c_c_location = document.getElementById('c_c_location');
    const data_base = document.getElementById('c_where_data_base_on');
    const latitude_of_c_location = document.getElementById('latitude_of_c_location');
    const longitude_of_c_location = document.getElementById('longitude_of_c_location');
    const weatherupdatetime = document.getElementById('w_g_i_Weather_last_Update_on');

    const weather = {};
    
    weather.temperature = {  
        unit : "celsius"  
    }

    const KELVIN = 273;

    const key = "17c1eddf53148baa5100a0ed7d9c740b";  

    if('geolocation' in navigator){  
        navigator.geolocation.getCurrentPosition(setPosition, showError);  
    }else{  
        console.log('Browser_not_support')
    }  

    function setPosition(position){  
        let latitude = position.coords.latitude;  
        let longitude = position.coords.longitude;  
          
        getWeather(latitude, longitude);  
    }  

    function showError(error){  
        console.log(error);
    }  
    
    function random_quotation(){
        var quotation_array = ['“It ain’t whatcha write, it’s the way atcha write it.” <b> —Jack Kerouac, WD </b>','“Not a wasted word. This has been a main point to my literary thinking all my life.” <b> —Hunter S. Thompson </b>','“The freelance writer is a man who is paid per piece or per word or perhaps.” <b> —Robert Benchley </b>','“We are all apprentices in a craft where no one ever becomes a master.” <b> —Ernest Hemingway </b>','“If a nation loses its storytellers, it loses its childhood.” <b>—Peter Handke</b>','“To defend what you’ve written is a sign that you are alive.” <b> —William Zinsser, WD </b>','“If I had not existed, someone else would have written me, Hemingway, Dostoyevsky, all of us.” <b> —William Faulkner </b>','“Write. Rewrite. When not writing or rewriting, read. I know of no shortcuts.” <b> —Larry L. King, WD </b>',
        '“There are no laws for the novel. There never have been, nor can there ever be.” <b> —Doris Lessing </b>','“Style means the right word. The rest matters little.” <b> —Jules Renard </b>','“The first sentence can’t be written until the final sentence is written.” <b> —Joyce Carol Oates, WD </b>','“I don’t need an alarm clock. My ideas wake me.” <b> —Ray Bradbury, WD </b>','“Let the world burn through you. Throw the prism light, white hot, on paper.” <b> —Ray Bradbury, WD </b>','“Writers are always selling somebody out.” <b> —Joan Didion </b>','"I think all writing is a disease. You can’t stop it.” <b> —William Carlos Williams </b>','“If it sounds like writing, I rewrite it.” <b> —Elmore Leonard </b>', '“I always start writing with a clean piece of paper and a dirty mind.” <b> —Henry David Thoreau </b>']
        var random_index_value = Math.floor(Math.random() * quotation_array.length);
        return quotation_array[random_index_value];
    } 
    var how_many_time_quotation_are_show = 0;
    setTimeout(function(){
        setInterval(function(){
            if ( how_many_time_quotation_are_show > 10 ){
                temperature_description.innerHTML = `Hey Dear Your outside wheatear is <b style="text-transform: uppercase;" >${weather.description} </b>`;  
                how_many_time_quotation_are_show = 0;
            } else {
                temperature_description.innerHTML = random_quotation();                            
                how_many_time_quotation_are_show++;
            }
        },11000);
    },100);
    
    function getWeather(latitude, longitude){  
        let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;  
          
        fetch(api)  
            .then(function(response){  
                let data = response.json();  
                return data;  
            })  
            .then(function(data){  
                weather.temperature.value = Math.floor(data.main.temp - KELVIN);  
                weather.description = data.weather[0].description;  
                weather.iconId = data.weather[0].icon;  
                weather.city = data.name;  
                weather.country = data.sys.country;  
                weather.latitude = data.coord.lat;
                weather.longitude = data.coord.lon;
                weather.wind_temperature_might_be = data.main.temp;
                weather.wind_min_temperature = data.main.temp_min;
                weather.wind_max_temperature = data.main.temp_max;
                weather.wind_temperature_feel_like = data.main.feels_like;
                weather.wind_humidity = data.main.humidity;
                weather.wind_pressure = data.main.pressure;
                weather.wind_speed = data.wind.speed;
                weather.wind_degree = data.wind.deg;  
                weather.database_on = data.base;
            })  
            .then(function(){  
                displayWeather();
                document.getElementById('w_g_i_Last_Contact_to_Server').innerHTML = `<b> ${DisplayCurrentTime()} </b>`;
                console.log(api)
            });  
    }
    function celsiusToFahrenheit(temperature){  
        return (temperature * 9/5) + 32;  
    }  
    function CelToFOrFToCel(value){
        return `<b>${Math.floor(value) - KELVIN}</b>℃ / <b>${Math.floor(((value - KELVIN) * 9/5) + 32)}</b>℉`;
    }

    var degToCard = function(deg){
        if (deg>11.25 && deg<=33.75){
          return "NNE";
        }else if (deg>33.75 && deg<=56.25){
          return "ENE";
        }else if (deg>56.25 && deg<=78.75){
          return "E";
        }else if (deg>78.75 && deg<=101.25){
          return "ESE";
        }else if (deg>101.25 && deg<=123.75){
          return "ESE";
        }else if (deg>123.75 && deg<=146.25){
          return "SE";
        }else if (deg>146.25 && deg<=168.75){
          return "SSE";
        }else if (deg>168.75 && deg<=191.25){
          return "S";
        }else if (deg>191.25 && deg<=213.75){
          return "SSW";
        }else if (deg>213.75 && deg<=236.25){
          return "SW";
        }else if (deg>236.25 && deg<=258.75){
          return "WSW";
        }else if (deg>258.75 && deg<=281.25){
          return "W";
        }else if (deg>281.25 && deg<=303.75){
          return "WNW";
        }else if (deg>303.75 && deg<=326.25){
          return "NW";
        }else if (deg>326.25 && deg<=348.75){
          return "NNW";
        }else{
          return "N"; 
        }
      }

      function DisplayCurrentTime() {
        var date = new Date();
        var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        var am_pm = date.getHours() >= 12 ? "PM" : "AM";
        hours = hours < 10 ? "0" + hours : hours;
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        time = hours + ":" + minutes + " " + am_pm;
        return time;
      }
      
    function displayWeather(){  
        console.log(weather)
        function displayweatherInfo() {
            images_for_weather.innerHTML = `<img src="icons/${weather.iconId}.svg"  alt="weather Condition Image" class="img-responsive weather_image" id="weather_image"/>`;  
            temperature.innerHTML = `${weather.temperature.value}°<span>C</span>`;  
            whether_status = true;
            temperature_temp = weather.temperature.value;
            temperature_status.innerText = weather.description;   
            weatherupdatetime.innerHTML = `<b> ${DisplayCurrentTime()} </b>`;
            setTimeout(displayweatherInfo, 72000);
            weatherupdatetime.innerHTML = `<b> ${DisplayCurrentTime()} </b>`;
        }
        displayweatherInfo();
        
        function displaytemperatureinfo(){
            w_d_Wind_Temp_Might_Be.innerHTML = `${CelToFOrFToCel(weather.wind_temperature_might_be)}`;
            w_d_Wind_Temp_Min.innerHTML = `${CelToFOrFToCel(weather.wind_min_temperature)}`;
            w_d_Wind_Temp_Max.innerHTML = `${CelToFOrFToCel(weather.wind_max_temperature)}`;
            w_d_Wind_Temps_feel_like.innerHTML = `${CelToFOrFToCel(weather.wind_temperature_feel_like)}`;
            document.getElementById('w_g_i_Wind_info_last_Update_on').innerHTML = `<b> ${DisplayCurrentTime()} </b>`;
            setTimeout(displayweatherInfo, 30000);
                document.getElementById('w_g_i_Wind_info_last_Update_on').innerHTML = `<b> ${DisplayCurrentTime()} </b>`;
        }
        displaytemperatureinfo();
        
        function dispalywindinfo(){
            w_g_i_Wind_humidity.innerHTML = `<b>${weather.wind_humidity}% <b>`;
            w_g_i_Wind_Pressure.innerHTML = `<b>${weather.wind_pressure}</b>`;
            w_g_i_Wind_Speed_w_g_i_Wind_Pressure.innerHTML = `<b>${weather.wind_speed}</b> mps`;
            w_g_i_Wind_degree_w_g_i_Wind_Pressure.innerHTML = `<b> ${weather.wind_degree} </b> | <span style="font-weight: 500"> Wind Dir:- </span>  "<b>${degToCard(weather.wind_degree)}</b>"`;    
            document.getElementById('w_g_i_Wind_humidity_Temperature_info_last_Update_on').innerHTML = `<b> ${DisplayCurrentTime()} </b>`;
            setTimeout(dispalywindinfo, 40000);
            document.getElementById('w_g_i_Wind_humidity_Temperature_info_last_Update_on').innerHTML = `<b> ${DisplayCurrentTime()} </b>`;
        }

        dispalywindinfo();
        

        c_c_location.innerText = `${weather.country}`;
        c_s_location.innerText = `${weather.city}`;
        data_base.innerText = `${weather.database_on}`;
        latitude_of_c_location.innerText = `${Math.floor(weather.latitude)}`;
        longitude_of_c_location.innerText = `${Math.floor(weather.longitude)}`;
       
    }    
      
}



fetch_weather_data_form_api();