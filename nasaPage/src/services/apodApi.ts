export async function getAPODData() {
    const api="e4UfDuVEnrNTzktGM7HxKFEEiNaAFjUiImt4wiIr".trim();
    const todayDate = new Date();
    const todayDateFormatted = `${todayDate.getFullYear()}-${String(todayDate.getMonth() + 1).padStart(2, '0')}-${String(todayDate.getDate()).padStart(2, '0')}`;

    const startDate= new Date(todayDate);
    startDate.setDate(startDate.getDate() - 20);
    const startDateFormatted= `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;

    const url = `https://api.nasa.gov/planetary/apod?api_key=${api}&start_date=${startDateFormatted}&end_date=${todayDateFormatted}`.replace(/\s+/g, '');


    console.log(startDateFormatted);
    console.log(todayDateFormatted);
    console.log(`API KEY: ${url}`);

    fetch(`${url}`)
    .then((response) => response.json())  
    .then((data) => localStorage.setItem('apodData', JSON.stringify(data)))    
    .catch((error) => console.error("Error fetching data:", error));
}