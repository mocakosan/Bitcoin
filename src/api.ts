const BASE_URL = `https://api.coinpaprika.com/v1`;

// coin 설명
export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) => response.json()
  );
}
//coin 사세
export function  fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

//coin history(chart)
export function fetchCoinHistory(coinId: string) {
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  ).then((response) => response.json());
}

// export function fetchCoinPrice(coinId: string) {
//   return fetch(
//     `https://api.coinpaprika.com/v1/tickers?quotes=KRW`
//   ).then((response) => response.json());
// }
