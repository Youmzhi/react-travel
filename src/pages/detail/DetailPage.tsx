import React, {useEffect, useState} from "react";
import { useParams} from "react-router-dom";
import axios from "axios";
import { Spin, Row, Col , DatePicker, Space, Divider, Typography, Menu, Anchor, Button} from 'antd'
import styles from './DetailPage.module.css'
import { Header , Footer , ProductIntro, ProductComments} from '../../components'
import { commentMockData } from './mockup'
import { productDetailSlice, getProductDetail } from "../../redux/productDetail/slice";
import { useSelector } from '../../redux/hooks';
import { useDispatch } from "react-redux";
import { MainLayout } from "../../layouts/mainLayout";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addShoppingCartItem } from "../../redux/shoppingCart/slice";

const { RangePicker } = DatePicker;
interface MatchParams {
  touristRouteId: string;
}

export const DetailPage: React.FC = () => {
  const { touristRouteId } = useParams()
  // const [loading, setLoading] = useState<boolean>(true)
  // const [product, setProduct] = useState<any>(null)
  // const [error, setError] = useState<string | null>(null)
  const loading = useSelector(state => state.productDetail.loading)
  const error = useSelector(state => state.productDetail.error)
  const product = useSelector(state => state.productDetail.data)

  const dispatch = useDispatch<any>()

  const jwt = useSelector(s => s.user.token) as string // 类型断言
  const shoppingCartLoading = useSelector(s => s.shoppingCart.loading)

  useEffect(() => {
    // react hooks
    // const fetchData = async ()=> {
    //   setLoading(true)
    //   try {
    //     const { data } = await axios.get(`http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`)
    //     setProduct(data)
    //     setLoading(false)
    //   } catch (error: any) {
    //     setError(error.message)
    //     setLoading(false)
    //   }
    // }
    // fetchData()
    // 没有存在异步store
    // const fetchData = async () => {
    //   dispatch(productDetailSlice.actions.fetchStart());
    //   try {
    //     const { data } = await axios.get(
    //       `http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`
    //     );
    //     dispatch(productDetailSlice.actions.fetchSuccess(data));
    //   } catch (error) {
    //     dispatch(productDetailSlice.actions.fetchFail(error.message));
    //   }
    // };
    // fetchData();
    // 异步store
    dispatch(getProductDetail(touristRouteId as string)) // 或者 touristRouteId || ''
  }, [])
  if (loading){
    return <Spin 
      size="large"
      style={{
        marginTop: 200,
        marginBottom: 200,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%'
      }}
    />
  }

  if (error) {
    return <div>网站出错：{error}</div>
  }
  return (
    <MainLayout>
      <div className={styles["page-content"]}>
        {/* 产品简介 与 日期选择 */}
        <div className={styles["product-intro-container"]}>
          <Row>
            <Col span={13}>
              <ProductIntro
                title={product.title}
                shortDescription={product.description}
                price={product.originalPrice}
                coupons={product.coupons}
                points={product.points}
                discount={product.price}
                rating={product.rating}
                pictures={product.touristRoutePictures.map((p) => p.url)}
              />
            </Col>
            <Col span={11}>
              <Button
                style={{ marginTop: 50, marginBottom: 30, display: "block" }}
                type="primary"
                danger
                loading={shoppingCartLoading}
                onClick={()=> {
                  dispatch(addShoppingCartItem({jwt, touristRouteId: product.id}))
                }}
              >
                <ShoppingCartOutlined />
                加入购物车
              </Button>
              <RangePicker open style={{ marginTop: 20 }} />
            </Col>
          </Row>
        </div>
        {/* 锚点菜单 */}
        <Anchor className={styles["product-detail-anchor"]}>
          <Menu mode="horizontal">
            <Menu.Item key="1">
              <Anchor.Link href="#feature" title="产品特色"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Anchor.Link href="#fees" title="费用"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Anchor.Link href="#notes" title="预订须知"></Anchor.Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Anchor.Link href="#comments" title="用户评价"></Anchor.Link>
            </Menu.Item>
          </Menu>
        </Anchor>
        {/* 产品特色 */}
        <div id="feature" className={styles["product-detail-container"]}>
          <Divider orientation={"center"}>
            <Typography.Title level={3}>产品特色</Typography.Title>
          </Divider>
          <div
            dangerouslySetInnerHTML={{ __html: product.features }}
            style={{ margin: 50 }}
          ></div>
        </div>
        {/* 费用 */}
        <div id="fees" className={styles["product-detail-container"]}>
          <Divider orientation={"center"}>
            <Typography.Title level={3}>费用</Typography.Title>
          </Divider>
          <div
            dangerouslySetInnerHTML={{ __html: product.fees }}
            style={{ margin: 50 }}
          ></div>
        </div>
        {/* 预订须知 */}
        <div id="notes" className={styles["product-detail-container"]}>
          <Divider orientation={"center"}>
            <Typography.Title level={3}>预定须知</Typography.Title>
          </Divider>
          <div
            dangerouslySetInnerHTML={{ __html: product.notes }}
            style={{ margin: 50 }}
          ></div>
        </div>
        {/* 商品评价*/}
        <div id="comments" className={styles["product-detail-container"]}>
          <Divider orientation={"center"}>
            <Typography.Title level={3}>用户评价</Typography.Title>
          </Divider>
          <div style={{ margin: 40 }}>
            <ProductComments data={commentMockData} />
          </div>
        </div>
      </div>
    </MainLayout>
  )
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
