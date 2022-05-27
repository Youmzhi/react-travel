import i18n from "../i18n/configs";
// 未优化redux
export interface LanguageState {
  language: 'en' | 'zh';
  languageList: {name: string; code: string}[];
}

const defaultState: LanguageState = {
  language: 'zh',
  languageList: [
    {name: '中文', code: 'zh'},
    {name: 'English', code: 'en'}
  ]
}

const languageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "change_language":
      i18n.changeLanguage(action.payload) // 这样处理是不标准的，有副作用（reducer必须是纯函数）
      return { ...state, language: action.payload };
    case "add_language":
      return {
        ...state,
        languageList: [...state.languageList, action.payload],
      };
    default:
      return state;
  }
}

export default languageReducer