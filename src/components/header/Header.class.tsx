import React from 'react';
import styles from './Header.module.css';
import logo from '../../assets/logo.svg';
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import { NavigateFunction, useLocation, useNavigate, useParams } from "react-router-dom";
import store, { RootState } from '../../redux/store';
import { LanguageState } from "../../redux/language/languageReducer";
import { withTranslation, WithTranslation } from 'react-i18next';
import {
  addLanguageActionCreator,
  changeLanguageActionCreator,
} from "../../redux/language/languageActions";

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
 
// 普通HOC函数
// export function withRouter( Child ) {
//   return ( props ) => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     return <Child { ...props } navigate={ navigate } location={ location } />;
//   }
// }

// ts 实现withRouter HOC函数
export interface RoutedProps<Params = any, State = any> {
    location: State;
    navigate: NavigateFunction;
    params: Params;
}

// <P>泛型传递参数必须存在RoutedProps接口定义的属性
// Pick 与 Omit 都是 TypeScript 内置的工具类型，它们的作用类似，都是对接口做剪裁
// interface Foo {
//   a: number;
//   b: string;
//   c: boolean;
// }
// { a:number; }
// type OnlyA = Pick<Foo, "a">;
// { b: string; c: boolean}
// type ExcludeA = Omit<Foo, "a">;

// 参数使用P 必须 extends RoutedProps的定义 使用<P> 必须传递RoutedProps的接口定义
/* 验证withRouter
interface gg {
  a: string
}
class Cs extends React.Component<gg> {
  render (){
    return (
      <div>cshi1</div>
    )
  }
}
function cc<T extends gg>(Child: React.ComponentClass<T>) {

}
cc(Cs)
*/

export function withRouter<P extends RoutedProps>( Child: React.ComponentClass<P> ) {
  // omit提取出我们必须的属性 keyof 获取键比如 location navigate params 相反的属性
  return ( props: Omit<P, keyof RoutedProps> ) => {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();
        // as 类型断言
        return <Child { ...props as P } navigate={ navigate } location={ location } params={ params }/>;
    }
}

interface PropsType extends RoutedProps {
  
}

// interface State extends LanguageState{
// }

// state是从store传递过来的
const mapStateToProps = (state: RootState) => {
  // 绑定props的数据
  return {
    language: state.language.language,
    languageList: state.language.languageList
  }
}
// dispatch是从store的dispatch()函数
const mapDispatchToProps = (dispatch: Dispatch) => {
  // 绑定props的函数
  return {
    changeLanguage: (code: "zh" | 'en') => {
      const action = changeLanguageActionCreator(code)
      dispatch(action)
    },
    addLanguage: (name: string, code: string) => {
      const action = addLanguageActionCreator(name, code)
      dispatch(action)
    }
  }
}

type PropsTypes = PropsType &  // react-router 路由props类型
WithTranslation & // i18n props类型
ReturnType<typeof mapStateToProps> & // redux store 映射类型
ReturnType<typeof mapDispatchToProps> // redux dispatch 映射类型

// & 交叉类型 （多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性）
class HeaderComponent extends React.Component<PropsTypes> {
  
  // 不使用reacta-redux写法
  // 1 定义接口和使用
  // interface State extends LanguageState{
  // }
  // 1.2 使用接口
  // class HeaderComponent extends React.Component<PropsTypes, state>
  // 2 构造函数获取数据
  // constructor(props) {
  //   super(props)
  //   const storeState = store.getState()
  //   this.state = {
  //     language: storeState.language,
  //     languageList: storeState.languageList
  //   }
  // }
  // 3. 添加订阅
  // componentDidMount(){
  //   store.subscribe(this.handleStoreChange)
  // }
  // 4. JSX使用
  // this.state.languageList来使用
  // 3.1 订阅函数
  // handleStoreChange = () => {
  //   const storeState = store.getState()
  //   this.setState({
  //     language: storeState.language,
  //     languageList: storeState.languageList
  //   })
  // }

  menuClickHandler = (e) => {
    console.log(e);
    if(e.key === "new") {
      // 处理新语言添加action
      this.props.addLanguage("新语言", "new_lang")
      // const action = addLanguageActionCreator("新语言", "new_lang")
      // const action = {
      //   type: "add_language",
      //   payload: { code: "new_lang", name: "新语言" }
      // }
      // store.dispatch(action);
    } else {
      this.props.changeLanguage(e.key)
      // const action = changeLanguageActionCreator(e.key)
      // const action = {
      //   type: "change_language",
      //   payload: e.key,
      // };
      // store.dispatch(action);
    }
  }

  render() {
    const { navigate, t } = this.props
    return (
      <div className={styles['app-header']}>
          {/* top-header */}
          <div className={styles['top-header']}>
            <div className={styles.inner}>
              <Typography.Text>
                {t('header.slogan')}
              </Typography.Text>
              <Dropdown.Button
                style={{marginLeft: 15}}
                overlay = {
                  <Menu onClick={this.menuClickHandler}>
                    {
                      this.props.languageList.map(l=> {
                        return <Menu.Item key={l.code}>{l.name}</Menu.Item>
                      })
                    }
                    <Menu.Item key={"new"}>
                      {t("header.add_new_language")}
                    </Menu.Item>
                  </Menu>
                }
                icon={ <GlobalOutlined/> }
              >
                { this.props.language === 'zh' ? '中文' : 'English' }
              </Dropdown.Button>
              <Button.Group className={styles['button-group']}>
                <Button onClick={()=>{ navigate('register') }}>
                  {t("header.register")}
                </Button>
                <Button onClick={()=>{ navigate('signIn') }}>
                  {t("header.signin")}
                </Button>
              </Button.Group>
            </div>
          </div>
  
          <Layout.Header className={styles['main-header']}>
            <span onClick={()=> { navigate('/') }}>
              <img src={logo} alt='' className={styles['App-logo']}/>
              <Typography.Title level={3} className={styles.title}>
                {t("header.title")}
              </Typography.Title>
            </span>
            <Input.Search
              placeholder={'请输入旅游目的地、主题、或关键字'} 
              className={styles['search-input']}         
            />
          </Layout.Header>
          <Menu mode={"horizontal"} className={styles["main-menu"]}>
            <Menu.Item key="1"> {t("header.home_page")} </Menu.Item>
            <Menu.Item key="2"> {t("header.weekend")} </Menu.Item>
            <Menu.Item key="3"> {t("header.group")} </Menu.Item>
            <Menu.Item key="4"> {t("header.backpack")} </Menu.Item>
            <Menu.Item key="5"> {t("header.private")} </Menu.Item>
            <Menu.Item key="6"> {t("header.cruise")} </Menu.Item>
            <Menu.Item key="7"> {t("header.hotel")} </Menu.Item>
            <Menu.Item key="8"> {t("header.local")} </Menu.Item>
            <Menu.Item key="9"> {t("header.theme")} </Menu.Item>
            <Menu.Item key="10"> {t("header.custom")} </Menu.Item>
            <Menu.Item key="11"> {t("header.study")} </Menu.Item>
            <Menu.Item key="12"> {t("header.visa")} </Menu.Item>
            <Menu.Item key="13"> {t("header.enterprise")} </Menu.Item>
            <Menu.Item key="14"> {t("header.high_end")} </Menu.Item>
            <Menu.Item key="15"> {t("header.outdoor")} </Menu.Item>
            <Menu.Item key="16"> {t("header.insurance")} </Menu.Item>
          </Menu>
      </div>
    )
  }
};

// 连接store中数据state和方法dispatch()
export const Header = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(HeaderComponent)))