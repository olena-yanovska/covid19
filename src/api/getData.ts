import axios from 'axios';
import { Country, LiveByCountryData, WorldWipData } from '../types/types';

export const getWorldWipData = async (url: string): Promise<WorldWipData[] | undefined> => {
  try {
    const response = await axios.get(url);

    return response.data;
  } catch {
    console.log('Error with loadind World WIP data');
  }
}

export const getLiveByCountryData = async (url: string): Promise<LiveByCountryData[] | undefined> => {
  try {
    const response = await axios.get(url);

    return response.data;
  } catch {
    console.log('Error with loadind Live by country data');
  }
}

// export const getCountries = async (): Promise<Country[] | undefined> => {
//   try {
//     const response = await axios.get('https://api.covid19api.com/countries');

//     return response.data;
//   } catch {
//     console.log('Error with loadind Countries');
//   }
// }
