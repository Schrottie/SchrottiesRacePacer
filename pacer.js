document.addEventListener('DOMContentLoaded', function() {
    const paceSlider = document.getElementById('paceSlider');
    const paceDisplay = document.getElementById('paceDisplay');
    const paceTableBody = document.querySelector('#paceTable tbody');
    const toggleImage = document.getElementById('toggleImage');
    const directionLabel = document.getElementById('directionLabel');

    function formatTime(minutes) {
        let hours = Math.floor(minutes / 60);
        let mins = Math.floor(minutes % 60);
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')} Uhr`;
    }

    function calculateTime(startTime, kilometer, pace) {
        let timeInMinutes = startTime + (kilometer * pace);
        if (timeInMinutes >= 1440) { // 1440 Minuten = 24 Stunden
            timeInMinutes -= 1440;
        }
        return formatTime(timeInMinutes);
    }

    function updateTable(values, pace) {
        paceTableBody.innerHTML = '';

        const startTime = 6 * 60; // 6:00 Uhr in Minuten

        values.forEach(item => {
            const formattedTime = calculateTime(startTime, item.kilometer, pace / 60);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.vp}</td>
                <td>${item.kilometer.toFixed(1)} km</td>
                <td>${formattedTime}</td>
                <td>${item.cutoff} Uhr</td>
                <td>${item.open}</td>
                <td>${item.close}</td>
            `;

            if (item.vp.includes('WP')) {
                row.classList.add('wp-row');
            } else if (item.vp.includes('VP 10') && toggleImage.src.includes('uzs2.png')) {
                row.classList.add('vp10-row');
            }

            paceTableBody.appendChild(row);
        });
    }

    function handleToggleChange() {
        const isEvenYear = (new Date().getFullYear() % 2 === 0);
        const values = toggleImage.src.includes('uzs2.png') ? standardWerte : alternativeWerte;
        updateTable(values, paceSlider.value);
    }

    toggleImage.addEventListener('click', function() {
        if (toggleImage.src.includes('uzs2.png')) {
            toggleImage.src = 'uzs1.png';
            directionLabel.textContent = 'im UZS';
        } else {
            toggleImage.src = 'uzs2.png';
            directionLabel.textContent = 'gd UZS';
        }
        handleToggleChange();
    });

    const initialPace = 515;
    paceSlider.max = 665; // Maximalwert auf 11:05 min/km setzen
    paceSlider.value = initialPace;
    paceDisplay.textContent = '8:35';

    const isEvenYear = (new Date().getFullYear() % 2 === 0);
    if (isEvenYear) {
        toggleImage.src = 'uzs2.png';
        directionLabel.textContent = 'gd UZS';
    } else {
        toggleImage.src = 'uzs1.png';
        directionLabel.textContent = 'im UZS';
    }

    handleToggleChange();

    paceSlider.addEventListener('input', function() {
        const pace = paceSlider.value;
        const minutes = Math.floor(pace / 60);
        const seconds = pace % 60;
        paceDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        handleToggleChange();
    });
});
