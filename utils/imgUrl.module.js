module.exports = getFullUrl = (req, relativePath) => {
    return `${req.protocol}://${req.get('host')}${relativePath}`;
  };

// Lejkérjük a requestből a protocolt és a hostot és összefűzzük a kapott relatív elérési útvonalla.
// Azért kell mert ha a szerver címe változik akkor az új cím elérési útját kapjuk meg a json adatokban!!