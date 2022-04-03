import {
  Form,
  Field,
  Cell,
  CellGroup,
  Button,
  Icon,
  Tabbar,
  TabbarItem,
  Notify,
  Empty,
  Toast,
  Dialog
} from 'vant'

const componentList = [
  Form,
  Field,
  Cell,
  CellGroup,
  Button,
  Icon,
  Tabbar,
  TabbarItem,
  Notify,
  Empty,
  Toast,
  Dialog
]

export function registerVantComp(app) {
  componentList.forEach((comp) => {
    app.use(comp)
  })
}

