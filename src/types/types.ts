export interface WorldWipData {
  NewConfirmed: number,
  // TotalConfirmed: number,
  NewDeaths: number,
  TotalDeaths: number,
  NewRecovered: number,
  TotalRecovered: number,
  Date: Date,
  // Country: string;
}

export interface LiveByCountryData {
  Country: string,
  Province: string,
  // CountryCode: string,
  // Lat: "46.82",
  // Lon: "8.23",
  Confirmed: number,
  Deaths: number,
  Recovered: number,
  // Active: number,
  Date: Date,
  // LocationID: string,
}