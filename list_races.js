document.addEventListener('DOMContentLoaded', function () {
    fetch('get_races.php')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('raceList');
            container.innerHTML = '';  // Leeren, um alte Rennen zu entfernen

            data.forEach(race => {
                const raceDiv = document.createElement('div');
                raceDiv.classList.add('race-item');

                const raceName = document.createElement('h2');
                raceName.textContent = race.title;
                raceDiv.appendChild(raceName);

                if (race.pinned) {
                    const pinnedBadge = document.createElement('span');
                    pinnedBadge.classList.add('pinned-badge');
                    pinnedBadge.textContent = 'Geschützt';
                    raceDiv.appendChild(pinnedBadge);
                }

                const startTime = document.createElement('p');
                startTime.textContent = `Startzeit: ${race.startTime}`;
                raceDiv.appendChild(startTime);

                const checkpointsList = document.createElement('ul');
                race.checkpoints.forEach(checkpoint => {
                    const checkpointItem = document.createElement('li');
                    checkpointItem.textContent = `VP: ${checkpoint.vp}, Kilometer: ${checkpoint.kilometer}, Cutoff: ${checkpoint.cutoff}, Öffnungszeit: ${checkpoint.open}, Schließzeit: ${checkpoint.close}`;
                    checkpointsList.appendChild(checkpointItem);
                });
                raceDiv.appendChild(checkpointsList);

                container.appendChild(raceDiv);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
