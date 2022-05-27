import React from "react";
import { useParams } from "react-router-dom";

export const DetailPage: React.FC = () => {
  const params = useParams()
  return <h1>路游路线详情页面, 路线ID: {params.touristRouteId}</h1>;
};

// router V5 使用this.props可以直接获取路由信息
// interface MatchParams {
//   touristRouteId: string;
// }

// export const DetailPage: React.FC<RouteComponentProps<MatchParams>> = (
//   props
// ) => {
// //   console.log(props.history);
// //   console.log(props.location);
// //   console.log(props.match);
//   return <h1>路游路线详情页面, 路线ID: {props.match.params.touristRouteId}</h1>;
// };
