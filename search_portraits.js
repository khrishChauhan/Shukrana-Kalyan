import https from 'https';

const search = (query) => {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url&format=json`;
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const json = JSON.parse(data);
      const pages = json.query.pages || {};
      Object.values(pages).forEach(p => {
         if(p.imageinfo && p.title.toLowerCase().includes('.jpg')) {
             console.log("URL|", p.imageinfo[0].url);
         }
      });
    });
  });
};

search('indian software engineer');
search('indian social worker');
search('indian shopkeeper');
search('indian doctor');
