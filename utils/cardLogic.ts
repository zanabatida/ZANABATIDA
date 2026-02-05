
import { GeneratedCard, GeneratorOptions } from '../types';

export const validateLuhn = (number: string): boolean => {
  let sum = 0;
  let shouldDouble = false;
  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number.charAt(i));
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};

export const completeLuhn = (partialNumber: string): string => {
  // If we already have 16 digits, we can't just append. 
  // But for standard generation, we usually have 15 and find the 16th.
  // If partial is 16, we check it. If invalid, we try to fix the last digit.
  if (partialNumber.length === 16) {
    const base = partialNumber.substring(0, 15);
    for (let i = 0; i <= 9; i++) {
      if (validateLuhn(base + i)) return base + i;
    }
  }
  
  const base = partialNumber.padEnd(15, '0').substring(0, 15);
  for (let i = 0; i <= 9; i++) {
    const trial = base + i;
    if (validateLuhn(trial)) return trial;
  }
  return base + '0';
};

export const generateCard = (options: GeneratorOptions): GeneratedCard => {
  const { bin, month, year, cvv } = options;
  
  // Clean pattern - allow digits and 'x'
  let pattern = bin.replace(/[^0-9xX]/g, '').toLowerCase();
  
  // Create a 16-digit base (standard card length)
  let cardNumber = '';
  for (let i = 0; i < 15; i++) {
    if (i < pattern.length) {
      if (pattern[i] === 'x') {
        cardNumber += Math.floor(Math.random() * 10);
      } else {
        cardNumber += pattern[i];
      }
    } else {
      cardNumber += Math.floor(Math.random() * 10);
    }
  }

  // Calculate the 16th digit to satisfy Luhn
  // Note: if the user provided 16 digits in the pattern, the 16th is recalculated to ensure validity.
  const fullNumber = completeLuhn(cardNumber);

  // Generate Date
  const finalMonth = month === 'Random' ? 
    String(Math.floor(Math.random() * 12) + 1).padStart(2, '0') : 
    month;
  
  const finalYear = year === 'Random' ? 
    String(new Date().getFullYear() + Math.floor(Math.random() * 8)) : 
    year;

  // Generate CVV
  const finalCvv = cvv === 'Random' ? 
    String(Math.floor(Math.random() * 900) + 100) : 
    cvv;

  const formatted = `${fullNumber}|${finalMonth}|${finalYear}|${finalCvv}`;

  return {
    number: fullNumber,
    month: finalMonth,
    year: finalYear,
    cvv: finalCvv,
    formatted
  };
};

export const detectBrand = (number: string): string => {
  if (number.startsWith('4')) return 'Visa';
  if (/^5[1-5]/.test(number)) return 'MasterCard';
  if (/^3[47]/.test(number)) return 'American Express';
  if (number.startsWith('6')) return 'Discover';
  return 'Desconhecido';
};
