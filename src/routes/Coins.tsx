import styled from "styled-components";
import { Link } from "react-router-dom";
import {Helmet} from "react-helmet";
import {useEffect, useState} from "react";
import axios from "axios";

const Container = styled.div`
  padding: 0px 2px;
  max-width: 800px;
  margin: 0 auto;
`;
const Head = styled.div`
  display: flex;
  justify-content: space-around;
  border: 1px solid white;
  border-radius: 15px;
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  margin-bottom: 15px;
  margin-top: 10px;
  height: 30px;
  align-items: center;
`;

const Header = styled.header`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid white;
  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  span{
    margin-right: 2rem;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;


const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

interface ICoinsProps {
  toggleDark: () => void;
}

function Coins({ toggleDark }: ICoinsProps) {
  const [ticker, setTicker] : any= useState<any>([]);
  useEffect(() => {
    const getCoin = () => {
      axios.get(`https://api.coinpaprika.com/v1/tickers?quotes=KRW`).then((res:any) => {
        setTicker(res.data);
      });
    };
    getCoin();
  }, []);
  console.log(ticker)
  /* coinpaprica ticker api
    name : 가상화폐 이름
    price: last update 기준 시세
    percent_change_24h : 가격 변동률
    volum_24h :  지난 24시간 거래량
    marcket_cap : 시총
  *   */
  return (
    <>
      <button onClick={toggleDark} style={{ margin:20}}>Toggle Dark Mode</button>
      <Container>
        <Helmet>
          <title>KeyPair</title>
        </Helmet>
        <Header>
          <Title>KeyPair</Title>
        </Header>
        <Head>
          <div className="name">이름</div>
          <div className="price">현재가</div>
          <div className="percent"> 변동률</div>
          <div className="volum">거래량</div>
          <div className="cap">총시가</div>
        </Head>
        <CoinList>
          {ticker?.slice(0, 100).map((coin:any) => (
            <Coin key={coin.id}>
              <Link to={{
                pathname: `/${coin.id}`,
                state: { name: coin.name },
              }}
              >
                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} style={{marginRight:20}}/>
                <span>{coin.name}</span>
                <span>{Number(coin.quotes.KRW.price.toFixed(1)).toLocaleString()}원<div style={{fontSize:5}}>({coin?.last_updated.slice(0,10)})</div><div style={{fontSize:5}}>last update</div></span>
                <span>{coin.quotes.KRW.percent_change_24h}%</span>
                <span>{Number((coin.quotes.KRW.volume_24h / 1000000000000).toFixed(1)).toLocaleString()}조</span>
                <span>{Number((coin.quotes.KRW.market_cap / 1000000000000).toFixed(1)).toLocaleString()}조</span>
              </Link>
            </Coin>
          ))}
        </CoinList>
      </Container>
    </>
  );
}

export default Coins;
