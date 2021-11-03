import {
  // create naive ui
  create,
  // component
  NButton,
  NDropdown,
  NMenu,
  NBreadcrumb,
  NBreadcrumbItem,
  NConfigProvider,
  NThemeEditor,
  useMessage,
  NCard,
  NForm,
  NFormItem,
  NInput,
  NGrid,
  NFormItemGi,
  NSpin,
  NMessageProvider,
  NDataTable,
  NPagination,
  NSelect,
  NUpload,
  NEmpty,
  NImage,
} from 'naive-ui'

const naive = create({
  components: [
    NButton,
    NDropdown,
    NMenu,
    NBreadcrumb,
    NBreadcrumbItem,
    NConfigProvider,
    NThemeEditor,
    useMessage,
    NCard,
    NForm,
    NFormItem,
    NInput,
    NGrid,
    NFormItemGi,
    NSpin,
    NMessageProvider,
    NDataTable,
    NPagination,
    NSelect,
    NUpload,
    NEmpty,
    NImage,
  ]
})

export default function (app) {
  app.use(naive)
}
