import { lazy } from 'react'
import locales from './locales'
import routes from './routes'
import themes from './themes'
import parseLanguages from 'base-shell/lib/utils/locale'
import Loading from '../components/Loading/Loading'
import { Block } from '@mui/icons-material';

const config = {
  containers: {
    // LayoutContainer: lazy(() =>
    //   import('material-ui-shell/lib/containers/LayoutContainer/LayoutContainer')
    // ),
  },
  components: {
    Loading,
  },
  pwa: {
    useiOSPWAPrompt: true,
    iOSPWAPromptProps: {},
  },
  routes,
  locale: {
    locales,
    defaultLocale: parseLanguages(['en', 'de', 'ru'], 'en'),
    onError: (e) => {
      // Here we warn the user about translation error
      //console.warn(e)
      return
    },
  },
  menu: {
  },
  theme: {
    themes,
    defaultThemeID: 'default',
    defaultIsDarkMode: false,
  },
  pages: {
    LandingPage: lazy(() => import('../pages/Landing')),
    PageNotFound: lazy(() => import('../pages/PageNotFound/PageNotFound')),
  },
}

export default config
