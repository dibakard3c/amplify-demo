// @ts-ignore
import byteSize from 'byte-size';
import { toLower } from 'lodash';
import { format, isThisWeek, isToday, isYesterday, parseISO } from 'date-fns';

export function formatBytes(bytes: any) {
  const { value, unit } = byteSize(bytes);
  return `${value} ${unit}`;
}

export function formatCurrency(
  number: string | number = 0,
  style = 'currency',
  locale = 'el-GR', // Use Greek locale
  currency = 'EUR', // Use EUR currency by default
  decimalPlaces = 2
) {
  const absNumber = Math.abs(parseFloat(number?.toString()));

  // Format the number for Greek style (thousands separator as '.' and decimal as ',')
  const formattedNumber = absNumber.toLocaleString(locale, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });

  // Format the currency and include the Euro symbol (€)
  const formattedCurrency = new Intl.NumberFormat(locale, {
    style: style as any,
    currency: currency,
    currencyDisplay: 'symbol',
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(+number);

  // Extract the currency symbol from the formattedCurrency string
  const currencySymbol = formattedCurrency.replace(/[0-9,.-]/g, '').trim();

  // Return the formatted value with the currency symbol at the front and units for large numbers
  return `${currencySymbol}${formattedNumber}`;
}

// export const formatNumber = (num?: number | string) => {
//   return num?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') || '';
// };

export function formatNumber(
  number: string | number = 0,
  locale = 'el-GR', // Use Greek locale
  decimal = true,
  decimalPlaces = 2
) {
  const absNumber = Math.abs(parseFloat(number?.toString()));

  // Format the number for Greek style (thousands separator as '.' and decimal as ',')
  return absNumber.toLocaleString(locale, {
    minimumFractionDigits: decimal ? decimalPlaces : 0,
    maximumFractionDigits: decimal ? decimalPlaces : 0,
  });
}

export const compareIgnoreCase = (value: any, ...others: any[]) => {
  const lowerValue = toLower(String(value));
  return new Set(others.map((other) => toLower(String(other)))).has(lowerValue);
};

export function maskString(
  value: string,
  visibleStart = 0,
  visibleEnd = 0,
  maskChar = '*'
) {
  if (!value) return '';

  const start = value.slice(0, visibleStart);
  const end = value.slice(-visibleEnd);
  const maskedLength = Math.max(0, value.length - visibleStart - visibleEnd);
  const masked = maskChar.repeat(maskedLength);

  return start + masked + end;
}

export function maskEmail(email?: string) {
  const [local, domain] = (email || '').split('@');
  if (local.length <= 2) {
    return '*'.repeat(local.length) + '@' + domain;
  }
  const visible = local.slice(0, 2);
  const masked = '*'.repeat(local.length - 2);
  return visible + masked + '@' + domain;
}

export function maskPhoneNo(phone?: string) {
  if (!phone) return '';
  const visible = phone.slice(-3); // last 3 digits
  const masked = '*'.repeat(phone.length - 3);
  return masked + visible;
}

type DateObject<T> = Record<string, T>;

export function sortObjectByDateDesc<T>(obj: DateObject<T>): DateObject<T> {
  return Object.keys(obj)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime()) // Sort in descending order
    .reduce((acc: DateObject<T>, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
}

const isValidTimestamp = (timestamp: any) => {
  return (
    typeof timestamp === 'number' &&
    isFinite(timestamp) &&
    timestamp > 0 &&
    timestamp < 9999999999 * 1000
  );
};

export const formatDate = (
  value?: string | Date,
  dateFormat: string = 'yyyy'
) => {
  try {
    if (isValidTimestamp(value)) {
      const date = new Date(+(value || 0) * 1000);
      return format(date, dateFormat);
    }
    return typeof value === 'string'
      ? format(new Date(value || new Date()), dateFormat)
      : format(value || new Date(), dateFormat);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return '';
  }
};

export const formatHumanReadableDate = (
  date: string,
  addTime: boolean = true
) => {
  try {
    if (isToday(parseISO(date))) {
      return format(parseISO(date), addTime ? `'Today', h:mm a` : `'Today'`); // Today, 10:23pm
    } else if (isYesterday(parseISO(date))) {
      return format(
        parseISO(date),
        addTime ? `'Yesterday', h:mm a` : `'Yesterday'`
      ); // Yesterday, 7:23pm
    } else if (isThisWeek(parseISO(date))) {
      return format(parseISO(date), addTime ? 'EEEE, h:mm a' : 'EEEE'); // Monday, 1:30pm
    } else {
      return formatDate(date, addTime ? 'EEE, d MMM, yyyy' : 'EEEE');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return '';
  }
};
