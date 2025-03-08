export async function getNeoData(start_date: string, end_date: string) {
    const api_key = "e4UfDuVEnrNTzktGM7HxKFEEiNaAFjUiImt4wiIr".trim();
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&api_key=${api_key}`.replace(/\s+/g, '');
    console.log(url);

    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const neoArray = Object.values(data.near_earth_objects).flat();
        return neoArray;
    }catch(error){
        console.error("Error fetching data:", error);
    }
}