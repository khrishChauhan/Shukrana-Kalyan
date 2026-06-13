const fs = require('fs');
const path = require('path');

const walk = (dir, callback) => {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walk(dirPath, callback) : callback(path.join(dir, f));
  });
};

const map = {
  '#1B273F': '#232F46',
  '#0D1424': '#232F46',
  '#0A101C': '#232F46',
  '#2D3A5F': '#232F46',
  '#3852B4': '#232F46',
  '#1A1A1A': '#232F46',
  '#4A4A4A': '#232F46',
  '#6A6A6A': '#232F46',
  '#8A8A8A': '#232F46',
  
  '#E89B3C': '#ED8C32',
  '#F0A958': '#ED8C32',
  '#D8892D': '#ED8C32',
  '#F3BE7A': '#ED8C32',
  '#F08D39': '#ED8C32',
  
  '#FFF8ED': '#FFF8F2',
  '#FFF5E1': '#FFF6EF',
  '#FDF4E9': '#FFF8F2',
  'bg-brand-light': 'bg-[#FFF8F2]',
  'border-brand-light': 'border-[#FFF8F2]',
  
  '#FDFCFB': '#FFFFFF',
  '#F8F9FA': '#FFFFFF',
  'rgba\\(232,155,60,([0-9.]+)\\)': 'rgba(35,47,70,$1)',
  'rgba\\(240,141,57,([0-9.]+)\\)': 'rgba(35,47,70,$1)',
  'rgba\\(243,190,122,([0-9.]+)\\)': 'rgba(35,47,70,$1)',
  'shadow-\\[0_0_12px_rgba\\(232,155,60,0\\.6\\)\\]': 'shadow-sm',
  'shadow-\\[0_0_12px_rgba\\([0-9]+,[0-9]+,[0-9]+,[0-9.]+\\)\\]': 'shadow-sm'
};

const componentsDir = path.join(__dirname, 'src', 'components');
const pagesDir = path.join(__dirname, 'src', 'pages');

const processDir = (dirToProcess) => {
  walk(dirToProcess, (filepath) => {
    if (filepath.endsWith('.tsx') || filepath.endsWith('.ts')) {
      let content = fs.readFileSync(filepath, 'utf8');
      let original = content;
      
      for (const [key, value] of Object.entries(map)) {
        const regex = new RegExp(key, 'gi');
        content = content.replace(regex, (match, p1) => {
          if (value.includes('$1') && p1) {
            return value.replace('$1', p1);
          }
          return value;
        });
      }
      
      if (content !== original) {
        fs.writeFileSync(filepath, content, 'utf8');
        console.log('Updated: ' + filepath);
      }
    }
  });
};

processDir(componentsDir);
processDir(pagesDir);
