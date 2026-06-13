import https from 'https';

const checkUrl = (url) => new Promise((resolve) => {
  https.get(url, (res) => resolve({url, status: res.statusCode})).on('error', () => resolve({url, status: 0}));
});

async function run() {
  const urls = [
    'https://images.unsplash.com/photo-1585255318111-09df134268e3?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1586221192534-110034a7065f?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1533075253896-1ccba0b85390?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1552579298-ad6f5c88cba6?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=400'
  ];
  for (let u of urls) {
    const r = await checkUrl(u);
    console.log(r.status, u.substring(0, 50));
  }
}
run();
