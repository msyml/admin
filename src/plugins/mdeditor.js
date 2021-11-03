import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import createMermaidPlugin from '@kangc/v-md-editor/lib/plugins/mermaid/cdn';
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';

// Prism
import Prism from 'prismjs';
// highlight code
import 'prismjs/components/prism-json';

VueMarkdownEditor .use(vuepressTheme, {
  Prism,
});
// markdown支持流程图
VueMarkdownEditor .use(createMermaidPlugin())
// markdown支持显示代码行数
VueMarkdownEditor .use(createLineNumbertPlugin())
// markdown支持代码快速复制
VueMarkdownEditor .use(createCopyCodePlugin());
// markdown支持emoji
VueMarkdownEditor .use(createEmojiPlugin());


export default function(app){
    app.use(VueMarkdownEditor )
}