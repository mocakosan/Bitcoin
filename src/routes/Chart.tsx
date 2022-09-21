import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
  isDark: boolean;
}
function Chart({ coinId,isDark }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv",coinId], () =>
    fetchCoinHistory(coinId)
    // {
    //   refetchInterval: 10000,
    // }
    // 10초마다 refetch 시킨다
  );
  console.log(data)
  /* coinhistory api
  * close : 종가
  * high : 고가
  * low : 저가
  * marcket_cap: 시총
  * open : 시초가
  * time_close : 마지막 업데이트인 날짜 까지?
  * time_open :
  * volum : 거래량 */
  return(
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name:"시초가",
              data: data?.map((price: any) => (
                parseFloat(price.open)
              ))??[],
            },
            {
              name:"종가",
              data: data?.map((price: any) => (
                parseFloat(price.close)
              ))??[],
            },
            {
              name: "고가",
              data: data?.map((price: any) => (
                parseFloat(price.high)
              ))??[],
            }
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 100,
              width: 600,
              toolbar: {
                show: true,
              },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              show: true,
            },
            xaxis: {
              axisBorder: { show: true },
              axisTicks: { show: true },
              labels: { show: true,datetimeFormatter: {month: "mmm 'yy"} },
              type: "datetime",
              categories: data?.map((price:any) => new Date(price.time_close * 1000).toISOString())
              /*toISOString은 timestamp를 isostring 형식의 문자열로 변환해주는 함수*/
              /* 이 함수를 이용하면 하루 전 날짜가 찍히는데 이유는 우리나라 타임존이 아니라 UTC타임좀을 사용하기 떄문*/
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"], stops: [0, 100]},
            },
            colors: ["#0fbcf9","#8b0000","#00FF00"],
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              }
            }
          }}
        />
      )}
      <div className="chart-info" style={{textAlign:"center"}}>
        <h1> Chart Information</h1>
        <div>1.last Update부터 21일치 전까지 기록</div>
        <div>2.단위는 달러($)</div>
      </div>
    </div>
  )
}
export default Chart;
