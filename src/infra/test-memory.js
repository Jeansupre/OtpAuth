const NodeCache = require('node-cache');

function randomUsername(length = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let name = '';
  for (let i = 0; i < length; i++) {
    name += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `otp:${name}`;
}

function randomValue() {
  return Math.floor(Math.random() * 3) + 1;
  // genera 1, 2 o 3
}

function formatMemory(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function logMemory(label) {
  const mem = process.memoryUsage();
  console.log(`${label} | RSS: ${formatMemory(mem.rss)} | HeapUsed: ${formatMemory(mem.heapUsed)}`);
}

async function runTest(numKeys = 100000) {
  const cache = new NodeCache({ stdTTL: 0, checkperiod: 0 });

  console.log(`Iniciando prueba con ${numKeys} claves...`);
  logMemory('Antes de insertar');

  for (let i = 0; i < numKeys; i++) {
    const key = randomUsername();
    const value = { attempts: randomValue() };
    cache.set(key, value);
  }

  logMemory('Después de insertar');

  // Mantener proceso vivo unos segundos
  setTimeout(() => {
    logMemory('Tras GC (si aplica)');
  }, 5000);
}

// Ejecutar con número de claves por argumento
const numKeys = process.argv[2] ? parseInt(process.argv[2], 10) : 100000;
runTest(numKeys);
