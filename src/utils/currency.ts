const locale = 'en';

export function parseLocalizedNumber(input: any) {
  if (typeof input === 'number') return input; // Already a number

  if (typeof input !== 'string') return NaN;

  // Check if locale is Greek
  // Check if there's a comma followed by exactly two digits at the end
  const isGreek = locale.startsWith('el') || /,\d{2}$/.test(input);

  if (isGreek) {
    // Greek-style: 1.234,56 -> 1234.56
    return Number(input.replace(/\./g, '').replace(',', '.'));
  } else {
    // English-style: assume dot is decimal
    return Number(input);
  }
}

export const formatIBAN = (iban: string | undefined) => {
  if (!iban) return '';

  return iban?.replace(/(.{4})/g, '$1 ').trim();
};

export const formatNumbers = (
  num?: number | string,
  forceDecimal?: boolean
) => {
  let number;

  if (locale === 'el' || locale === 'el-GR') {
    number = num?.toString()?.replace(/[^0-9,]/g, '');
  } else {
    number = num?.toString()?.replace(/[^0-9.]/g, '');
  }

  // convert to en the API understands
  number = number?.replace(',', '.');

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: forceDecimal ? 2 : 0,
    maximumFractionDigits: 4,
  }).format(Number(number));
};

export const formatCurrency = (
  num?: number | string,
  forceDecimal?: boolean,
  currency = 'euro'
) => {
  let number;

  if (locale === 'el' || locale === 'el-GR') {
    number = num?.toString()?.replace(/[^0-9,]/g, '');
  } else {
    number = num?.toString()?.replace(/[^0-9.]/g, '');
  }

  // convert to en the API understands
  number = number?.replace(',', '.');

  const formattedNumber = new Intl.NumberFormat(locale, {
    minimumFractionDigits: forceDecimal ? 2 : 0,
    maximumFractionDigits: 4,
  }).format(Number(number));

  const currencySymbol = currency === 'euro' ? '€' : 'EST';

  return `${currencySymbol}${formattedNumber}`;
};

export const parseDigits = (num?: string) => {
  let number;

  if (locale === 'el' || locale === 'el-GR') {
    number = num?.toString()?.replace(/[^0-9,]/g, '');
  } else {
    number = num?.toString()?.replace(/[^0-9.]/g, '');
  }

  // convert to en the API understands
  return +(number?.replace(',', '.') || 0);
};
