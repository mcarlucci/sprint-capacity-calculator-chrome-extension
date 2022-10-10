(function () {
    const formfields = {
        daysInSprint: '',
        numOfDevelopers: '',
        averageVelocity: '',
        numOfHolidays: '',
        timeOffInDays: '',
    };

    function calculateCapacity(event) {
        event.preventDefault();

        for (const field in formfields) {
            formfields[field] = Number(document.getElementById(field).value);
        }

        const {
            daysInSprint,
            numOfDevelopers,
            averageVelocity,
            numOfHolidays,
            timeOffInDays,
        } = formfields;
        const pointsPerDeveloperPerDay = (averageVelocity / daysInSprint) / numOfDevelopers;
        const numOfWorkingDays = timeOffInDays + (numOfHolidays * numOfDevelopers);
        const capacity = Math.round(averageVelocity - (pointsPerDeveloperPerDay * numOfWorkingDays));

        document.getElementById('capacityResult').innerText = capacity ? `Team Capacity: ${capacity < 0 ? 0 : capacity} Story Points` : '';
    }

    function resetFormFields() {
        for (const field in formfields) {
            formfields[field] = '';
            document.getElementById(field).value = '';
        }

        document.getElementById('capacityResult').innerText = '';
    }

    document.getElementById('capacityForm').addEventListener('submit', calculateCapacity);
    document.getElementById('reset').addEventListener('click', resetFormFields);
})();