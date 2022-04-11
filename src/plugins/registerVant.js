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
  Dialog,
  NoticeBar,
  Sticky,
  Swipe,
  SwipeItem,
  Uploader,
  Image,
  ImagePreview,
  Tag,
  NavBar,
  Popup,
  Picker,
  PullRefresh
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
  Dialog,
  NoticeBar,
  Sticky,
  Swipe,
  SwipeItem,
  Uploader,
  Image,
  ImagePreview,
  Tag,
  NavBar,
  Popup,
  Picker,
  PullRefresh
]

export function registerVantComp(app) {
  componentList.forEach((comp) => {
    app.use(comp)
  })
}

