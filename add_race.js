document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('addRow').addEventListener('click', function () {
        const table = document.getElementById('routeTable').getElementsByTagName('tbody')[0];
        const lastRowIndex = table.rows.length - 1;

        const newRow = table.insertRow(lastRowIndex);
        newRow.innerHTML = `
            <td><input type="text" placeholder="VP Name"></td>
            <td><input type="text" placeholder="Kilometer" pattern="\\d*\\.?\\d{0,2}"></td>
            <td><input type="text" placeholder="--:--" pattern="\\d{1,2}:\\d{2}" title="Zeitformat H:MM (z.B. 25:30)"></td>
            <td><input type="time"></td>
            <td><input type="time"></td>
            <td><button type="button" class="remove">Entfernen</button></td>
        `;

        newRow.querySelector('.remove').addEventListener('click', function () {
            newRow.remove();
        });
    });

    document.getElementById('routeForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const kurzName = document.getElementById('kurzName').value;
        const startTime = document.getElementById('startTime').value;
        const pinned = document.getElementById('pinned').checked;
        const rows = document.querySelectorAll('#routeTable tbody tr');

        if (!name.trim() || !kurzName.trim()) {
            alert("Bitte geben Sie sowohl einen Namen als auch einen Kurznamen ein.");
            return;
        }

        let raceData = {
            title: name,
            startTime: startTime,
            pinned: pinned,
            checkpoints: []
        };

        rows.forEach(row => {
            const inputs = row.querySelectorAll('input');
            if (inputs[0].value) {
                raceData.checkpoints.push({
                    vp: inputs[0].value,
                    kilometer: parseFloat(inputs[1].value) || 0,
                    cutoff: formatCutoffTime(inputs[2].value),
                    open: inputs[3].value,
                    close: inputs[4].value
                });
            }
        });

        const data = JSON.stringify(raceData, null, 4);
        const formData = new FormData();
        formData.append('filename', `${kurzName}.json`);
        formData.append('content', data);

        fetch('save_race.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(result => {
            alert(result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    function formatCutoffTime(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        if (isNaN(hours) || isNaN(minutes)) return '--:--';
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }
});
