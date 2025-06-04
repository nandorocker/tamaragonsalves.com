// Quick test to verify book translations are working
import { books } from './src/i18n/books.ts';

function testBookTranslations(lang = 'en') {
  console.log('Testing book translations for language:', lang);
  
  // Test nested key access
  const key = 'alienacaoParental.downloadLinks.cladem';
  const keys = key.split('.');
  
  let value = books[lang];
  console.log('Starting with:', value);
  
  for (const k of keys) {
    console.log(`Looking for key: ${k}`);
    value = value?.[k];
    console.log(`Found value:`, value);
    if (value === undefined) break;
  }
  
  console.log('Final result:', value);
  console.log('Expected: "Read at Biblioteca CLADEM"');
}

testBookTranslations();
