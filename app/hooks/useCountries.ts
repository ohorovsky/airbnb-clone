import {create} from 'zustand';
import countries from 'world-countries';

interface RentModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const formattedCountries = countries.map(country => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region
}));

const useCountries = () => {
  const getAll = () => formattedCountries;
  const getByValue = (value: string) => {
    return formattedCountries.find(country => country.value === value);
  }
  return {
    getAll,
    getByValue,
  }
}

export default useCountries;