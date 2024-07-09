
export async function getSingleMetar(icao: string): Promise<MetarResponse>{
    const response = await fetch(`https://aviationweather.gov/api/data/metar?ids=${icao}&format=json&taf=false&hours=2`);
    const data = await response.json();

    return data;
}