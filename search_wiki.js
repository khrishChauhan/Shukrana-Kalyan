import https from 'https';

const url = 'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=rural%20india%20school%20children&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url&format=json';

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    const pages = json.query.pages;
    Object.values(pages).forEach(p => {
       console.log(p.imageinfo[0].url);
    });
  });
});
