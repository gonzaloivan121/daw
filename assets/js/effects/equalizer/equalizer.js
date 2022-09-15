class Equalizer {
    bands = [];

    constructor() {
        this.initialize();
    }

    initialize() {
        this.add_band();
        this.generate_chart();
    }

    add_band() {
        this.bands.push(new Band());
    }

    generate_chart() {
        const DATA_COUNT = 3;
        const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};

        const labels = [1, 2, 3];
        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Dataset 1',
                }
            ]
        };

        const config = {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Chart.js Line Chart'
                    }
                }
            },
        };

        const ctx = document.getElementById('equalizer').getContext('2d');
        const chart = new Chart(ctx, config);
    }
}