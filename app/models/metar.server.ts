
export async function getSingleMetar(icao: string, hours: string): Promise<MetarResponse>{
    const response = await fetch(`https://aviationweather.gov/api/data/metar?ids=${icao}&format=json&taf=false&hours=${hours}`);
    const data = await response.json();

    return data;
}