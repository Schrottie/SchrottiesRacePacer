document.addEventListener('DOMContentLoaded', function() {
    const paceSlider = document.getElementById('paceSlider');
    const paceDisplay = document.getElementById('paceDisplay');
    const paceTableBody = document.querySelector('#paceTable tbody');
    const toggleImage = document.getElementById('toggleImage');

    let data = evenWerte; // Starten mit geraden Jahren

    function formatTime(minutes) {
        let totalMinutes = Math.floor(minutes % 1440); // Minuten innerhalb eines Tages
        let hours = Math.floor(totalMinutes / 60);
        let mins = totalMinutes % 60;
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')} Uhr`;
    }

    function calculateTime(startTime, kilometer, pace) {
        const timeInMinutes = startTime + (kilometer * pace);
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
                <td>${item.cutoff}</td>
                <td>${item.open}</td>
                <td>${item.close}</td>
            `;

            if (item.vp.includes('WP')) {
                row.classList.add('wp-row');
            } else if (item.vp.includes('VP 10') && !toggleImage.src.includes('uzs1.png')) {
                row.classList.add('vp10-row');
            }

            paceTableBody.appendChild(row);
        });
    }

    function handleToggleChange() {
        const isOddYear = (new Date().getFullYear() % 2 !== 0);
        if (toggleImage.src.includes('uzs1.png')) {
            data = oddWerte;
        } else {
            data = evenWerte;
        }
        updateTable(data, paceSlider.value);
    }

    function updateToggleImage() {
        if (toggleImage.src.includes('uzs1.png')) {
            toggleImage.src = 'uzs2.png';
        } else {
            toggleImage.src = 'uzs1.png';
        }
        handleToggleChange();
    }

    paceSlider.max = 665; // Maximalwert auf 11:05 min/km setzen
    paceSlider.value = 515;
    paceDisplay.textContent = '8:35';
    updateTable(data, paceSlider.value);

    paceSlider.addEventListener('input', function() {
        const pace = paceSlider.value;
        const minutes = Math.floor(pace / 60);
        const seconds = pace % 60;
        paceDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        updateTable(data, pace);
    });

    toggleImage.addEventListener('click', updateToggleImage);
});
