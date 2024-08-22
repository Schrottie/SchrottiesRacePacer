// Funktion zum Konvertieren von "HH:MM" in Stunden als Dezimalzahl
function timeToDecimal(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours + minutes / 60;
}

// Funktion zum Extrahieren von x- und y-Werten aus den Daten, unter Berücksichtigung des Tageswechsels
function getXYValues(dataArray) {
    let previousTime = 0;
    let dayOffset = 0;
    
    return dataArray.map(point => {
        let currentTime = timeToDecimal(point.cutoff);

        // Falls ein Tageswechsel erkannt wird
        if (currentTime < previousTime) {
            dayOffset += 24;  // 24 Stunden dazu addieren
        }

        previousTime = currentTime;
        return {
            x: point.kilometer,
            y: currentTime + dayOffset
        };
    });
}

// Extrahieren der Daten für die Linien
const data2023 = getXYValues(gdUZSWerteOld);
const data2024 = getXYValues(gdUZSWerteNew);
const data2022 = getXYValues(imUZSWerteOld);

// Erstellen des Diagramms
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [
            {
                label: 'gg. den UZS 2023',
                data: data2023,
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                fill: false,
                pointRadius: 4,
            },
            {
                label: 'gg. den UZS 2024',
                data: data2024,
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                fill: false,
                pointRadius: 4,
            },
            {
                label: 'im UZS 2022',
                data: data2022,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
                pointRadius: 4,
            },
            {
                label: 'Zeitlimit',
                data: [{ x: 0, y: 0 }, { x: 161.3, y: 30 }],
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 2,
                fill: false,
                borderDash: [5, 5]
            }
        ]
    },
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Kilometer'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Zeit (Stunden)'
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'bottom'
            }
        }
    }
});