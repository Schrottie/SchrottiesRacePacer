document.addEventListener('DOMContentLoaded', function () {
    const racesTableBody = document.querySelector('#racesTable tbody');
    const editRaceButton = document.getElementById('editRace');

    // Geschützte Rennen, die nicht gelöscht werden können
    const protectedRaces = ['mwl_iuzs.json', 'mwl_ggduzs.json'];

    function fetchRaces() {
        fetch('list_races.php')
            .then(response => response.json())
            .then(data => {
                data.forEach(race => {
                    const row = document.createElement('tr');

                    // Auswahl-Checkbox
                    const checkboxCell = document.createElement('td');
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.value = race.filename;
                    checkboxCell.appendChild(checkbox);

                    // Titel
                    const titleCell = document.createElement('td');
                    titleCell.textContent = race.fullName;

                    // Dateiname
                    const filenameCell = document.createElement('td');
                    filenameCell.textContent = race.filename;

                    // Aktionen
                    const actionsCell = document.createElement('td');

                    // Bearbeiten-Button
                    const editButton = document.createElement('button');
                    editButton.textContent = 'Bearbeiten';
                    editButton.className = 'action-button edit';
                    editButton.addEventListener('click', () => editRace(race.filename));

                    actionsCell.appendChild(editButton);

                    // Löschen-Button, nur wenn das Rennen nicht geschützt ist
                    if (!protectedRaces.includes(race.filename)) {
                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = 'Löschen';
                        deleteButton.className = 'action-button delete';
                        deleteButton.addEventListener('click', () => deleteRace(race.filename));
                        actionsCell.appendChild(deleteButton);
                    }

                    row.appendChild(checkboxCell);
                    row.appendChild(titleCell);
                    row.appendChild(filenameCell);
                    row.appendChild(actionsCell);

                    racesTableBody.appendChild(row);
                });
            })
            .catch(error => console.error('Fehler beim Laden der Rennen:', error));
    }

    function getSelectedRaces() {
        const checkboxes = racesTableBody.querySelectorAll('input[type="checkbox"]:checked');
        return Array.from(checkboxes).map(checkbox => checkbox.value);
    }

    function editRace(filename) {
        window.location.href = `add_race.html?edit=${encodeURIComponent(filename)}`;
    }

    function deleteRace(filename) {
        if (protectedRaces.includes(filename)) {
            alert('Dieses Rennen kann nicht gelöscht werden.');
            return;
        }

        if (confirm('Sind Sie sicher, dass Sie dieses Rennen löschen möchten?')) {
            fetch(`delete_race.php?filename=${encodeURIComponent(filename)}`)
                .then(response => response.text())
                .then(result => {
                    console.log(result);
                    window.location.reload(); // Seite neu laden, um aktualisierte Liste zu zeigen
                })
                .catch(error => console.error('Fehler beim Löschen der Rennen:', error));
        }
    }

    editRaceButton.addEventListener('click', function () {
        const selectedRaces = getSelectedRaces();
        if (selectedRaces.length !== 1) {
            alert('Bitte wählen Sie genau ein Rennen zur Bearbeitung aus.');
            return;
        }

        editRace(selectedRaces[0]);
    });

    fetchRaces();
});
