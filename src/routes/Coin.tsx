import {Switch, Route, useLocation, useParams, useRouteMatch, Link} from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import Chart from "./Chart";
import { fetchCoinInfo,fetchCoinTickers } from "../api";
import Price from "./Info";
import { Helmet } from "react-helmet";

const Title = styled.h1`
  font-size: 48px;
  color: black;
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: black;
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
  color: white;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
` ;

const Tab = styled.span<{ isActive: boolean }> ` 
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  color: ${(props) =>
          props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    padding: 7px 0px;
    display: block;
  }
` ;
interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface ICoinProps {
  isDark: boolean;
}

function Coin({ isDark }: ICoinProps) {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId)
  );
  const loading = infoLoading || tickersLoading;
  console.log(tickersData)
  /* coinpaprika api
  id : 코인아이디
  name : 코인 종목
  symbol : 기호
  rank : 순위
  circulating_supply : 현재까지 유통량
  total_supply : 총 유통량
  max_supply : 최대 발행량
  last_update : 마지막 업데이트
  quotes: {
   KRW : {  원화 기준
     price :   현재 시세
     volume_24h :  지난 24시간 거래량
     volume_24h_change_24h :  지난 24시간 거래 변동률
     market_cap :   시총
     market_cap_change_24h :  시총 가격 변동률
     percent_change_15m :  마지막 업데이트 기준 변동률
     percent_change_30m :
     percent_change_1h :
     percent_change_6h :
     percent_change_12h :
     percent_change_24h :
     percent_change_7d :
     percent_change_30d :
     percent_change_1y :
     ath_price : 사상 최고 가격
     ath_date : 사상 최고 가격을 찍은 날짜
     percent_from_price_ath:
   }
 }*/
  return (
    <>
      <Link to={"/"}>
        <button style={{margin:15}}>뒤로가기</button>
      </Link>
      <Container>
        <Helmet>
          <title>
            {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
          </title>
        </Helmet>
        <Header>
          <Title>{state?.name ? state.name : loading ? "Loading...": infoData?.name}</Title>
        </Header>
        {loading ? <Loader>Loading...</Loader> : (
          <>
            <Overview>
              <OverviewItem>
                <span>Rank:</span>
                <span>{infoData?.rank}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Symbol:</span>
                <span>${infoData?.symbol}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Price:</span>
                <span>${tickersData?.quotes?.USD?.price?.toFixed(3)}</span>
              </OverviewItem>
            </Overview>
            <Overview>
              <OverviewItem>
                <span>Total Suply:</span>
                <span>{tickersData?.total_supply}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Max Supply:</span>
                <span>{tickersData?.max_supply}</span>
              </OverviewItem>
            </Overview>
            <Tabs>
              <Tab isActive={chartMatch !== null}>
                <Link to={`/${coinId}/chart`}>Chart</Link>
              </Tab>
              <Tab isActive={priceMatch !== null}>
                <Link to={`/${coinId}/price`}>Information</Link>
              </Tab>
            </Tabs>
            <Switch>
              <Route path={`/:coinId/price`}>
                <Price isDark={isDark} coinId={coinId} />
              </Route>
              <Route path={`/:coinId/chart`}>
                <Chart isDark={isDark} coinId={coinId}/>
              </Route>
            </Switch>
          </>
        )}
      </Container>
    </>
  );
}

export default Coin;
