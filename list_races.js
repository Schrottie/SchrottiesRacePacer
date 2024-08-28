document.addEventListener('DOMContentLoaded', function () {
    const racesTableBody = document.querySelector('#racesTable tbody');
    const editRaceButton = document.getElementById('editRace');
    const deleteRacesButton = document.getElementById('deleteRaces');

    const protectedRaces = ['mwl_iuzs.json', 'mwl_ggduzs.json'];

    function fetchRaces() {
        fetch('list_races.php')
            .then(response => response.json())
            .then(data => {
                data.forEach(race => {
                    const row = document.createElement('tr');

                    const checkboxCell = document.createElement('td');
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.value = race.filename;
                    checkboxCell.appendChild(checkbox);

                    const titleCell = document.createElement('td');
                    titleCell.textContent = race.fullName;

                    const filenameCell = document.createElement('td');
                    filenameCell.textContent = race.filename;

                    row.appendChild(checkboxCell);
                    row.appendChild(titleCell);
                    row.appendChild(filenameCell);

                    racesTableBody.appendChild(row);
                });
            })
            .catch(error => console.error('Fehler beim Laden der Rennen:', error));
    }

    function getSelectedRaces() {
        const checkboxes = racesTableBody.querySelectorAll('input[type="checkbox"]:checked');
        return Array.from(checkboxes).map(checkbox => checkbox.value);
    }

    editRaceButton.addEventListener('click', function () {
        const selectedRaces = getSelectedRaces();
        if (selectedRaces.length !== 1) {
            alert('Bitte wählen Sie genau ein Rennen zur Bearbeitung aus.');
            return;
        }

        const raceToEdit = selectedRaces[0];
        window.location.href = `add_race.html?edit=${encodeURIComponent(raceToEdit)}`;
    });

    deleteRacesButton.addEventListener('click', function () {
        const selectedRaces = getSelectedRaces();
        const racesToDelete = selectedRaces.filter(race => !protectedRaces.includes(race));

        if (racesToDelete.length === 0) {
            alert('Keine löschbaren Rennen ausgewählt.');
            return;
        }

        if (confirm('Sind Sie sicher, dass Sie die ausgewählten Rennen löschen möchten?')) {
            racesToDelete.forEach(race => {
                fetch(`delete_race.php?filename=${encodeURIComponent(race)}`)
                    .then(response => response.text())
                    .then(result => {
                        console.log(result);
                        window.location.reload(); // Seite neu laden, um aktualisierte Liste zu zeigen
                    })
                    .catch(error => console.error('Fehler beim Löschen der Rennen:', error));
            });
        }
    });

    fetchRaces();
});
