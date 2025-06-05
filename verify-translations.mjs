// Quick verification that our translation structure works
import { ui } from './src/i18n/ui.ts';

console.log('✅ UI translations imported successfully');
console.log('English books available:', Object.keys(ui.en).filter(key => ['alienacaoParental', 'abortAndReligion'].includes(key)));
console.log('English videos available:', Object.keys(ui.en).filter(key => ['broadeningWomensRights', 'alienacaoParental2025'].includes(key)));
console.log('Portuguese books available:', Object.keys(ui.pt).filter(key => ['alienacaoParental', 'abortAndReligion'].includes(key)));
console.log('Portuguese videos available:', Object.keys(ui.pt).filter(key => ['broadeningWomensRights', 'alienacaoParental2025'].includes(key)));

// Test nested access
console.log('Test book title:', ui.en.alienacaoParental?.title || 'NOT FOUND');
console.log('Test video title:', ui.en.broadeningWomensRights?.title || 'NOT FOUND');
