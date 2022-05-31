import React, {useState, useEffect} from 'react';
import styles from './Header.module.css';
import logo from '../../assets/logo.svg';
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import { useParams, useNavigate, useLocation, useMatch } from 'react-router-dom'
import { useSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { LanguageActionTypes, changeLanguageActionCreator, addLanguageActionCreator } from '../../redux/language/languageActions'
import { useTranslation } from 'react-i18next'
import jwtDecode, { JwtPayload as DefaultJwtPayload } from 'jwt-decode';
import { userSlice } from '../../redux/user/slice';

// import { useSelector } from 'react-redux';
// import { RootState } from '../../redux/store'; {}

interface JwtPayload extends DefaultJwtPayload {
  username: string;
}

export const Header: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()
  // useSelector为了解决store和组件的耦合问题
  // 如果每次在使用useSelector都要指定RootState类型，这就意味着store和组件绑定起来了
  // 组件和store的深度绑定会导致组件无法复用
  // RootState类型提出出来，从组件中剥离出来 使用TypedUseSelectorHook接口
  // 来使我们的类型重新定义 （实现自定义的useSelector）
  // const language = useSelector((state: RootState) => state.language)
  const language = useSelector((state) => state.language.language)
  const languageList = useSelector((state) => state.language.languageList)
  const dispatch = useDispatch()
  // const dispatch = useDispatch<Dispatch<LanguageActionTypes>>()
  const { t } = useTranslation()

  const jwt = useSelector(s => s.user.token)
  const [username, setUsername] = useState('')

  const shoppingCartItems = useSelector(s => s.shoppingCart.items)
  const shoppingCartLoading = useSelector(s => s.shoppingCart.loading)

  useEffect(()=> {
    if (jwt) {
      const token = jwtDecode<JwtPayload>(jwt)
      setUsername(token.username)
    }
    
  }, [jwt])

  const menuClickHandler = (e) => {
    console.log(e);
    if(e.key === "new") {
      // 处理新语言添加action
      dispatch(addLanguageActionCreator("新语言", "new_lang"))
    } else {
      dispatch(changeLanguageActionCreator(e.key))
    }
  }

  const onLogout = () => {
    dispatch(userSlice.actions.logOut())
    navigate('/')
  }

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
                <Menu onClick={menuClickHandler}>
                  {
                    languageList.map(l=> {
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
              { language === 'zh' ? '中文' : 'English' }
            </Dropdown.Button>

            {jwt ? (
              <Button.Group className={styles["button-group"]}>
                <span>
                  {t("header.welcome")}
                  <Typography.Text strong>{username}</Typography.Text>
                </span>
                <Button loading={shoppingCartLoading} onClick={()=> { navigate('/shoppingCart') }}>
                  {t("header.shoppingCart")}{shoppingCartItems.length}
                </Button>
                <Button onClick={onLogout}>
                  {t("header.signOut")}
                </Button>
              </Button.Group>
            ) : (
              <Button.Group className={styles["button-group"]}>
                <Button onClick={() => navigate("/register")}>
                  {t("header.register")}
                </Button>
                <Button onClick={() => navigate("/signIn")}>
                  {t("header.signin")}
                </Button>
              </Button.Group>
            )}
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
            onSearch={(keywords)=> navigate('/search/' + keywords) }       
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
};
