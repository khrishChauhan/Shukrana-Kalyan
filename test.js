import https from 'https';

const checkUrl = (url) => {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', () => resolve({ url, status: 0 }));
  });
};

const ids = [
  '1584515979956-d9f6e5d09982',
  '1573496359142-b8d87734a5a2',
  '1576091160550-2173dba999ef',
  '1497633762265-9d179a990aa6',
  '1542810634-71277d95dcbb',
  '1503676260728-1c00da094a0b',
  '1560707303-4e980ce876ad',
  '1509099836639-18ba1795216d',
  '1532372320572-cda25653a26d'
];

async function run() {
  for (const id of ids) {
    const url = 'https://images.unsplash.com/photo-' + id + '?auto=format&fit=crop&q=80&w=600';
    const result = await checkUrl(url);
    console.log(result.status, id);
  }
}
run();
