
export interface GeneratedCard {
  number: string;
  month: string;
  year: string;
  cvv: string;
  formatted: string;
}

export interface GeneratorOptions {
  bin: string;
  quantity: number;
  month: string;
  year: string;
  cvv: string;
  format: 'pipe' | 'json' | 'csv';
  includeDate: boolean;
  includeCVV: boolean;
}

export type PageTab = 'generator' | 'checker' | 'articles' | 'privacy' | 'terms' | 'about' | 'contact' | 'transparency';

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Finanças' | 'Tecnologia' | 'Segurança';
  date: string;
  image: string;
  readTime: string;
}
