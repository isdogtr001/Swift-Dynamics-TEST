"use client";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

interface PhoneFieldProps {
  onChange?: (value: string) => void;
}

export default function PhoneField({  onChange }: PhoneFieldProps) {
  return (
    <PhoneInput
      defaultCountry="th"
      className="phone-input"
      onChange={(phone) => onChange?.(phone)}
    />
  );
}
