'use client';

import { Select } from 'antd';

interface CountrySelectProps {
  value?: string;
  onChange?: (countryName: string) => void;
}

export default function CountrySelect({ value , onChange }: CountrySelectProps) {
  const countryList = require('country-list');

  const test = countryList.getNameList() || [];

  const keys = Object.keys(test);

  const countryOptions = keys.map((name: string) => ({
    label: String(name).charAt(0).toUpperCase() + String(name).slice(1),
    value: name,
  }));


  return (
    <Select
      showSearch
      size="large"
      placeholder="Select a country"
      onChange={onChange}
      options={countryOptions}
      style={{ width: 200 }}
      value={value}
    />
  );
}
