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

  // Restore the broken template syntax ₹{ to ${ 
  content = content.replace(/₹\{/g, '${');

  // Fix literal text that was accidentally changed (e.g. $₹{shipping} -> ₹${shipping})
  content = content.replace(/\$₹\$\{/g, '₹${');
  content = content.replace(/\$₹/g, '₹');

  if (content !== original) {
    fs.writeFileSync(f, content);
    modifiedFiles++;
    console.log('Fixed syntax in', f);
  }
});
