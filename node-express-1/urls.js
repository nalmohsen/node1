const fs = require('fs');
const https = require('https');
const { parse } = require('url');

const readFilePromise = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

const downloadAndSaveHtml = async (url) => {
  try {
    const { hostname } = parse(url);
    const html = await getHtml(url);
    await saveToFile(hostname, html);
    console.log(`Wrote to ${hostname}`);
  } catch (error) {
    console.error(`Couldn't download ${url}`);
  }
};


const getHtml = (url) => {
    const protocol = url.startsWith('https') ? https : http; // Use http if the URL starts with 'http'
    
    return new Promise((resolve, reject) => {
      protocol.get(url, (response) => {
        let data = '';
  
        response.on('data', (chunk) => {
          data += chunk;
        });
  
        response.on('end', () => {
          resolve(data);
        });
      }).on('error', (error) => {
        reject(error);
      });
    });
  };

const saveToFile = (filename, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, data, 'utf8', (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

const main = async () => {
  try {
    const filename = process.argv[2];
    if (!filename) throw new Error('Please provide a filename as an argument.');

    const urls = await readFilePromise(filename);
    const urlsArray = urls.split('\n').filter(Boolean);

    await Promise.all(urlsArray.map(downloadAndSaveHtml));
  } catch (error) {
    console.error(error.message);
  }
};

main();
