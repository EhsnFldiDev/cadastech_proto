import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert English numbers to Persian digits (e.g. 123 -> ۱۲۳)
export function toPersianDigits(num: number | string | undefined | null): string {
  if (num === undefined || num === null) return '';
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num
    .toString()
    .replace(/\d/g, (d) => persianDigits[parseInt(d, 10)]);
}

// Format numbers with commas and Persian digits (e.g. 1234567 -> ۱,۲۳۴,۵۶۷)
export function formatPersianNumber(num: number | string | undefined | null): string {
  if (num === undefined || num === null) return '۰';
  const cleanNumber = typeof num === 'string' ? parseFloat(num.replace(/,/g, '')) : num;
  if (isNaN(cleanNumber)) return '۰';
  
  const parts = cleanNumber.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '،');
  
  return toPersianDigits(parts.join('.'));
}

// Format amount into Persian Tomans with readable suffixes (میلیارد / میلیون)
export function formatTomanPrice(amount: number | undefined | null, includeUnit: boolean = true): string {
  if (!amount || amount === 0) return includeUnit ? '۰ تومان' : '۰';
  
  const unit = includeUnit ? ' تومان' : '';
  
  if (amount >= 1_000_000_000) {
    const billions = amount / 1_000_000_000;
    const formatted = billions % 1 === 0 ? billions.toString() : billions.toFixed(1);
    return `${toPersianDigits(formatted)} میلیارد${unit}`;
  }
  
  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    const formatted = millions % 1 === 0 ? millions.toString() : millions.toFixed(0);
    return `${toPersianDigits(formatted)} میلیون${unit}`;
  }
  
  return `${formatPersianNumber(amount)}${unit}`;
}

// Exact full price in Tomans with comma separators
export function formatFullToman(amount: number | undefined | null): string {
  if (!amount) return '۰ تومان';
  return `${formatPersianNumber(amount)} تومان`;
}

// Format percentage with Persian digits (e.g. 45 -> ۴۵٪)
export function formatPercent(percent: number | undefined | null): string {
  if (percent === undefined || percent === null) return '۰٪';
  return `٪${toPersianDigits(percent)}`;
}

// Mask phone number (e.g. 09121234567 -> ۰۹۱۲***۴۵۶۷)
export function maskPhoneNumber(phone: string): string {
  if (!phone || phone.length < 11) return '۰۹۱۲***۰۰۰۰';
  const prefix = phone.slice(0, 4);
  const suffix = phone.slice(7);
  return toPersianDigits(`${prefix}***${suffix}`);
}
