function get_the_day() {

    var day_data = document.getElementById('day_data');

    var date_obj = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var day = weekday[date_obj.getDay()];

    day = day.slice(0, 3);

    day_data.innerText = day;

    console.log(day);
}



function get_the_date() {

    var date = document.getElementById('date');

    var date_obj = new Date();

    var dates = `${date_obj.getDate()}/${date_obj.getMonth() + 1}/${date_obj.getFullYear()}`

    date.innerText = dates;

    console.log(dates);
}



function get_the_time() {

    const time_e = document.getElementById('time');
    const tim_es = document.getElementById('times');

    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    // Check whether AM or PM 
    var format = hours >= 12 ? 'PM' : 'AM';

    // Find current hour in AM-PM Format 
    hours = hours % 12;

    // To display "0" as "12" 
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    time_e.innerHTML = hours + ':' + minutes + ':' + seconds + ' ' + `<b>${format}</b>`;
    tim_es.innerHTML = hours + ':' + minutes + ' ' + `<b>${format}</b>`;
}



function count_reload() {
    var n = localStorage.getItem('on_load_counter');

    if (n === null) {
        n = 0;
    }

    n++;

    localStorage.setItem("on_load_counter", n);

    document.getElementById('website_reload_time').innerHTML = `<b>${n}</b> Times`;
}




    get_the_day();
    get_the_date();

    setInterval(() => {
        get_the_time();
    }, 1000)

    count_reload();