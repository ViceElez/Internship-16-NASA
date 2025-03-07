export async function getEarthImagery(lat: number, lon: number) {
    const apiKey="e4UfDuVEnrNTzktGM7HxKFEEiNaAFjUiImt4wiIr".trim();
    const url = `https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&date=2025-01-01&&dim=0.10&api_key=${apiKey}`.replace(/\s+/g, '');

    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await response.blob();
        return URL.createObjectURL(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}