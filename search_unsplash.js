import https from 'https';

const url = 'https://unsplash.com/napi/search/photos?query=indian%20villager&per_page=10&page=1';

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(data.slice(0, 500));
  });
});
