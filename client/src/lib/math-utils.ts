export function calculatePercentage(value: number, percentage: number) {
  const result = (value * percentage) / 100;
  return {
    result,
    total: value + result
  };
}

export function convertToRoman(num: number): string {
  if (num < 1 || num > 3999) return '';
  
  const romanNumerals = [
    { value: 1000, symbol: 'M' },
    { value: 900, symbol: 'CM' },
    { value: 500, symbol: 'D' },
    { value: 400, symbol: 'CD' },
    { value: 100, symbol: 'C' },
    { value: 90, symbol: 'XC' },
    { value: 50, symbol: 'L' },
    { value: 40, symbol: 'XL' },
    { value: 10, symbol: 'X' },
    { value: 9, symbol: 'IX' },
    { value: 5, symbol: 'V' },
    { value: 4, symbol: 'IV' },
    { value: 1, symbol: 'I' }
  ];
  
  let result = '';
  let remaining = num;
  
  for (const numeral of romanNumerals) {
    while (remaining >= numeral.value) {
      result += numeral.symbol;
      remaining -= numeral.value;
    }
  }
  
  return result;
}

export function convertFromRoman(roman: string): number {
  const romanValues: { [key: string]: number } = {
    'I': 1, 'V': 5, 'X': 10, 'L': 50,
    'C': 100, 'D': 500, 'M': 1000
  };
  
  let result = 0;
  let prevValue = 0;
  
  for (let i = roman.length - 1; i >= 0; i--) {
    const currentValue = romanValues[roman[i]];
    
    if (!currentValue) return 0;
    
    if (currentValue < prevValue) {
      result -= currentValue;
    } else {
      result += currentValue;
    }
    
    prevValue = currentValue;
  }
  
  return result;
}

export function calculateArea(shape: string, dimensions: { [key: string]: number }): number {
  switch(shape) {
    case 'square':
      return dimensions.side * dimensions.side;
    case 'rectangle':
      return dimensions.width * dimensions.height;
    case 'circle':
      return Math.PI * dimensions.radius * dimensions.radius;
    case 'triangle':
      return (dimensions.base * dimensions.height) / 2;
    default:
      return 0;
  }
}

export function calculateRuleOfThree(a: number, b: number, c: number): number {
  if (a === 0) return 0;
  return (b * c) / a;
}

export function calculateGCD(a: number, b: number): number {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

export function calculateLCM(a: number, b: number): number {
  return (a * b) / calculateGCD(a, b);
}

export function factorize(num: number): number[] {
  const factors = [];
  let n = num;
  let divisor = 2;
  
  while (divisor * divisor <= n) {
    while (n % divisor === 0) {
      factors.push(divisor);
      n /= divisor;
    }
    divisor++;
  }
  
  if (n > 1) {
    factors.push(n);
  }
  
  return factors;
}
