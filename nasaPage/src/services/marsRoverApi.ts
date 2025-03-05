export async function getMarsRoverData(page:number) {
    const api_key="e4UfDuVEnrNTzktGM7HxKFEEiNaAFjUiImt4wiIr".trim();
    const postPerPage=20;

    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=${page}&per_page=${postPerPage}&api_key=${api_key}`.replace(/\s+/g, '');

    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data.photos;

    }catch(error){
        console.error(error);
    }
}