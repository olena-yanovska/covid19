export interface WorldWipData {
  NewConfirmed: number,
  NewDeaths: number,
  TotalDeaths: number,
  NewRecovered: number,
  TotalRecovered: number,
  Date: Date,
}

export interface LiveByCountryData {
  Country: string,
  Province: string,
  // CountryCode: string,
  Confirmed: number,
  Deaths: number,
  Recovered: number,
  Date: Date,
}

export enum WorldWipCases {
  NewConfirmed = 'NewConfirmed',
  NewDeaths = 'NewDeaths',
  TotalDeaths = 'TotalDeaths',
  NewRecovered = 'NewRecovered',
  TotalRecovered = 'TotalRecovered',
}

export enum LiveByCountryCases {
  Confirmed = 'Confirmed',
  Deaths = 'Deaths',
  Recovered = 'Recovered',
}

export interface Country {
  Country: string,
  Slug: string,
}
