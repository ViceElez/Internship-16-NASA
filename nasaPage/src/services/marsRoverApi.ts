export async function getMarsRoverData() {
    const api_key="e4UfDuVEnrNTzktGM7HxKFEEiNaAFjUiImt4wiIr".trim();
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${api_key}`.replace(/\s+/g, '');

    fetch(`${url}`).then((response) => response.json()).then((data) => localStorage.setItem('marsRoverData', JSON.stringify(data))).catch((error) => console.error("Error fetching data:", error));
}