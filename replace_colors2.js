import fs from 'fs';
import path from 'path';

const walk = (dir, callback) => {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(dirPath);
  });
};

const replaceInFile = (filePath, replacements) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let orig = content;
  
  replacements.forEach(({p, r}) => {
    content = content.replace(p, r);
  });
  
  if (content !== orig) {
    fs.writeFileSync(filePath, content);
  }
};

// 1. Update index.css Custom Properties and Shadows
const indexCssReplacements = [
  { p: /--color-brand-primary: #FFB823;/g, r: '--color-brand-primary: #3852B4;\n  --color-brand-accent: #F08D39;\n  --color-brand-accent-hover: #D67A2D;' },
  { p: /--color-brand-primary-hover: #E5A51F;/g, r: '--color-brand-primary-hover: #5E7AC4;' },
  { p: /--color-brand-light: #FFF1CA;/g, r: '--color-brand-light: #F3BE7A;' },
  { p: /--color-brand-green: #708A58;/g, r: '--color-brand-green: #5E7AC4;' },
  { p: /--color-brand-dark: #2D4F2B;/g, r: '--color-brand-dark: #3852B4;' },
  { p: /rgba\(255, 184, 35, 0\.15\)/g, r: 'rgba(56, 82, 180, 0.15)' },
  { p: /rgba\(255, 184, 35, 0\.2\)/g, r: 'rgba(56, 82, 180, 0.2)' }
];
replaceInFile('src/index.css', indexCssReplacements);

// 2. Update Navbar Donate Button & Orange elements
replaceInFile('src/components/Navbar.tsx', [
  { p: /hover:text-brand-green/g, r: 'hover:text-brand-secondary' }, // Since green was changed to secondary blue
  { p: /bg-brand-primary hover:bg-brand-primary-hover/g, r: 'bg-brand-accent hover:bg-brand-accent-hover' },
  { p: /shadow-brand/g, r: 'shadow-[0_4px_20px_rgba(240,141,57,0.15)]' }
]);

// 3. Update ImpactPrograms Progress Bars and Statistics
replaceInFile('src/components/ImpactPrograms.tsx', [
  { p: /bg-brand-primary/g, r: 'bg-brand-accent' }, // Progress bar
  { p: /text-brand-dark/g, r: 'text-brand-accent' }, // Make statistics Orange Accent
]);

// 4. Update Sidebar Active Item to Orange Accent
replaceInFile('src/components/Sidebar.tsx', [
  { p: /bg-brand-primary\/10 text-brand-primary border-l-\[3\.5px\] border-brand-primary/g, 
    r: 'bg-brand-accent/10 text-brand-accent border-l-[3.5px] border-brand-accent' },
  { p: /bg-brand-primary\/5 text-brand-primary font-semibold/g, 
    r: 'bg-brand-accent/5 text-brand-accent font-semibold' },
  { p: /text-brand-primary/g, r: 'text-brand-accent' }, // Also makes icons and chevron Orange Accent
]);

// 5. Update VolunteerCTA "Join Us Now" to Orange Accent and Gradient Background to Blue
replaceInFile('src/components/VolunteerCTA.tsx', [
  { p: /bg-gradient-to-tr from-brand-dark to-brand-green/g, 
    r: 'bg-gradient-to-tr from-[#3852B4] to-[#5E7AC4]' },
  { p: /bg-brand-primary hover:bg-brand-primary-hover text-brand-dark/g, 
    r: 'bg-brand-accent hover:bg-brand-accent-hover text-white' }
]);

// 6. Update Dashboard Area Chart Colors
replaceInFile('src/pages/DashboardPage.tsx', [
  { p: /#FFB823/g, r: '#3852B4' }, // Primary Line
  { p: /#708A58/g, r: '#F08D39' }, // Secondary Data
  { p: /#F4B400/g, r: '#3852B4' }, // Any other yellow remnants
  { p: /bg-brand-primary/g, r: 'bg-brand-primary' }, 
  { p: /bg-brand-green(\/10)? text-\[10px\] font-mono tracking-widest text-brand-green/g,
    r: 'bg-brand-accent/10 text-[10px] font-mono tracking-widest text-brand-accent' },
  { p: /bg-brand-green/g, r: 'bg-brand-accent' }
]);

// 7. Update LeadershipTeam inline shadow
replaceInFile('src/components/LeadershipTeam.tsx', [
  { p: /rgba\(255,184,35,0\.25\)/g, r: 'rgba(56,82,180,0.25)' }
]);

console.log("Patched successfully");
