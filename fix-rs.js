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

  // Fix JSX variable values: <span>${price}</span> -> <span>Rs. {price}</span>
  // This looks for literal $ followed by a { containing a price-related variable
  content = content.replace(/\$({(?:item|product|order|subtotal|total|tax|shipping|discountedPrice|price|amount)[^}]*})/gi, 'Rs. $1');
  
  // Fix template literal values: `Price: $${price}` -> `Price: Rs. ${price}`
  content = content.replace(/\$\$\{/g, 'Rs. ${');

  // Fix specific occurrences like >$0, >$10
  content = content.replace(/>\$(\d+)/g, '>Rs. $1');
  
  // Also catch 'Min: ${price}' -> 'Min: Rs. ${price}' (where it was already converted to string interpolation)
  content = content.replace(/Min: \$\{/g, 'Min: Rs. ${');
  content = content.replace(/Max: \$\{/g, 'Max: Rs. ${');
  
  // Catch any leftover ₹ and change to Rs. 
  content = content.replace(/₹/g, 'Rs. ');

  if (content !== original) {
    fs.writeFileSync(f, content);
    modifiedFiles++;
    console.log('Fixed currency in', f);
  }
});
console.log('Done replacing currency symbols.');
