import React from 'react';
import styles from './App.module.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HomePage, SignInPage, RegisterPage, DetailPage } from './pages'

function App() {
  return (
    <div className={styles.App}>
      <Router>
        <Routes>
          {/* react-router-dom不支持ts, 安装ts类型声明文件 @types/react-router-dom */}
          <Route path='/' element={<HomePage />} />
          <Route path='/signIn' element={<SignInPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/detail/:touristRouteId' element={<DetailPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
