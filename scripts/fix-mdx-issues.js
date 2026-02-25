const fs = require('fs');
const path = require('path');

const fixes = [
  {
    file: '05-application-layer.mdx',
    replacements: [
      {
        from: ' COM <parent node>',
        to: ' COM (parent node)'
      }
    ]
  },
  {
    file: '07-cabling-standards.mdx',
    replacements: [
      {
        from: '<--->',
        to: '↔'
      }
    ]
  },
  {
    file: '10-switches-layer2.mdx',
    replacements: [
      {
        // Fix any stray curly braces that could cause expression parse errors
        from: /\{(?![a-zA-Z_$])/g,
        to: '\\{'
      }
    ]
  },
  {
    file: '11-routers-layer3.mdx',
    replacements: [
      {
        from: '<br>',
        to: '  \n'
      }
    ]
  },
  {
    file: '12-management-plane-protocols.mdx',
    replacements: [
      {
        from: '<br>',
        to: '  \n'
      }
    ]
  }
];

const dir = '/Users/encryptedkvng/recovery/GitHub/Academy/content/learn/networking-protocols';

fixes.forEach(({ file, replacements }) => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  replacements.forEach(({ from, to }) => {
    if (from instanceof RegExp) {
      content = content.replace(from, to);
    } else {
      content = content.split(from).join(to);
    }
  });
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Fixed ${file}`);
});

console.log('\nAll MDX issues fixed!');
