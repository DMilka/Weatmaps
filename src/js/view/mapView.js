import { elements } from '../domElements';
import Chart from 'chart.js';

export const showWeatherBox = weather => {
  const markup = `
    <section class="weather">
      <div class="weather__info">
        <h2 class="weather__info--title">${weather.location.name}<span class="weather__info--small">${weather.location.country}</span></h2>
        <ul class="weather__info--list">
          <li>Temperature: ${weather.current.temp_c} °C</li>
          <li>Wind chill: ${weather.current.feelslike_c} °C</li>
          <li>Humidity: ${weather.current.humidity}%</li>
          <li>Pressure: ${weather.current.pressure_mb} hPa</li>
          <li>Wind: ${weather.current.wind_kph} kph</li>
        </ul>
        <button class="weather__info--btn">Show forecast</button>
        <span class="weather__info--footer">Last update: ${weather.current.last_updated}</span>
      </div>
    </section>`;


    elements.mapBox.insertAdjacentHTML('beforeend', markup);
}

export const showForecastBox = forecast => {

  const markup = `
    <section class="weather__forecast">
      <canvas id="myChart" width="600" height="150"></canvas>
      <ul class="weather__forecast--desc active">
        <li><img src="${forecast.forecastday[1].day.condition.icon}"></li>
        <li><img src="${forecast.forecastday[2].day.condition.icon}"></li>
        <li><img src="${forecast.forecastday[3].day.condition.icon}"></li>
        <li><img src="${forecast.forecastday[4].day.condition.icon}"></li>
        <li><img src="${forecast.forecastday[5].day.condition.icon}"></li>
        <li><img src="${forecast.forecastday[6].day.condition.icon}"></li>
      </ul>
    </section> `;

    elements.mapBox.insertAdjacentHTML('beforeend', markup);

    var ctx = document.getElementById('myChart');
    var myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [forecast.forecastday[1].date,
                     forecast.forecastday[2].date,
                     forecast.forecastday[3].date,
                     forecast.forecastday[4].date,
                     forecast.forecastday[5].date,
                     forecast.forecastday[6].date,
                    ],
            datasets: [{
                data: [forecast.forecastday[1].day.avgtemp_c,
                       forecast.forecastday[2].day.avgtemp_c,
                       forecast.forecastday[3].day.avgtemp_c,
                       forecast.forecastday[4].day.avgtemp_c,
                       forecast.forecastday[5].day.avgtemp_c,
                       forecast.forecastday[6].day.avgtemp_c,
                      ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.4)',
                    'rgba(54, 162, 235, 0.4)',
                    'rgba(255, 206, 86, 0.4)',
                    'rgba(75, 192, 192, 0.4)',
                    'rgba(153, 102, 255, 0.4)',
                    'rgba(255, 159, 64, 0.4)',
                ]
            }]
        },
        options: {
            title: {
              display: true,
              text: 'Forecast'
            },
            legend: {
              display: false
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
        }
    });



}


