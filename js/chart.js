'use strict';

let canvasElem = document.getElementById('chart')

/* TODO:
 * - Instantiate a new AppState 
 * - Use a method on that AppState to load vote data from localStorage.
 * - Create a data object for chart.js using your AppState's allProducts array. 
 * - Combine the data object with configuration information for chart.js type, colors, etc
 * - Call chart.js with the configuration and the canvasElem
*
 */
function renderChart() {
    let chartState = new AppState();
    chartState.loadItems();
    let data = {
        views: [],
        labels: [],
        votes: [],
    }
    for (let i = 0; i < chartState.allProducts.length; i++) {
        data.views.push(chartState.allProducts[i].timesShown);
        data.labels.push(chartState.allProducts[i].name);
        data.votes.push(chartState.allProducts[i].timesClicked);
    }
    const chartConfig = {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: '# of Votes',
                data: data.votes,
                backgroundColor:  'black',
                borderWidth: 1,
            },
            {
                label: '# of Views',
                data: data.views,
                backgroundColor: 'purple',
                borderWidth: 1,
            }]},
        options: {
            plugins: {
                customcanvasBackgroundColor: {
                    color: 'white',
                },

            },
            scales: {
                x: {
                    ticks: {
                        color: 'white',
                    }
                },
                y: {
                    ticks: {
                        color: 'white',
                    },
                    beginAtZero: true
                },
            }
        }
    }
    new Chart(canvasElem, chartConfig);
}

renderChart();