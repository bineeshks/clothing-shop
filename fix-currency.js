const fs = require('fs');
const path = require('path');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      if (!file.includes('node_modules') && !file.includes('.next') && !file.includes('.git')) {
        results = results.concat(walk(file));
      }
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
    }
  });
  return results;
}
const files = walk('./app').concat(walk('./components'));
let modifiedFiles = 0;
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  const original = content;

  // Pattern 1: ${something.price} to ₹${something.price} (but keeping the ${ for template literals if it was a template literal)
  // Actually, in JSX, it's ${price}. The user wrote `$` then `{price.toFixed(2)}`
  // That matches `$` followed by `{` and a price/total related word.
  content = content.replace(/\$\{([^}]*price[^}]*)\}/gi, '₹{$1}');
  content = content.replace(/\$({(?:item|product|order|subtotal|total|tax|shipping|discountedPrice)[^}]*})/gi, '₹$1');
  
  // Specific replacements like >$100.00
  content = content.replace(/>\$(\d+)/g, '>₹$1');
  
  // In `app/shop/page.tsx` or similar, they might have `\${price.toFixed(2)}` or just `$120`
  content = content.replace(/\$\{([a-zA-Z0-9_.]*(?:price|amount|total)[a-zA-Z0-9_.]*)\}/gi, '₹{$1}');
  
  // Clean up any double replacements (e.g., ₹₹)
  content = content.replace(/₹₹/g, '₹');

  if (content !== original) {
    fs.writeFileSync(f, content);
    modifiedFiles++;
    console.log(`Updated ${f}`);
  }
});
console.log(`Replaced $ with ₹ across ${modifiedFiles} TSX files`);
