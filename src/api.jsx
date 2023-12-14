export async function getCountries() {
    const response = await fetch('../data.json');
    const data = await response.json();
    return data
}

export async function getCountryByCode(code) {
    try{
        const response = await fetch('../data.json');
        const dataObject = await response.json();
        const countries = dataObject.filter(e => e.alpha3Code == code);
        return countries[0]
    } catch (err){
        console.log(err)
    }
   
}

export async function getBorderCountries(country) {
    if (!country || !country.borders) {
        return null;
    }

    const borderCountries = await Promise.all(
        country.borders.map(async (bordersCode) => {
            const response = await fetch('../data.json');
            const dataObject = await response.json();
            const countries = dataObject.filter(e => e.alpha3Code == bordersCode);
            return countries[0]
        })
    );

    return borderCountries;
}