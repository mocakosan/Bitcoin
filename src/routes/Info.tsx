import { useQuery } from "react-query";
import { fetchCoinInfo} from "../api";



function Info({ coinId }:any){
  const { data: infoData } = useQuery(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  console.log(infoData)
  /*
  description : 암화화폐에 대한 설명
  started_at : 출시일

  * */
  return (
      <div className="info" style={{fontSize:"30px"}}>
        {infoData?.description}
        <div>출시일:{infoData?.started_at.slice(0,10)}</div>
      </div>
  );
}

export default Info;
