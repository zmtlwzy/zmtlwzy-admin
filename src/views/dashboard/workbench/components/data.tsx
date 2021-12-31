import { VNodeTypes } from 'vue';

interface GroupItem {
  title: string;
  icon: VNodeTypes;
  color: string;
  desc: string;
  date: string;
  group: string;
}

interface NavItem {
  title: string;
  icon: VNodeTypes;
  color: string;
}

interface DynamicInfoItem {
  name: string;
  date: string;
  desc: string;
}

interface Team {
  icon: VNodeTypes;
  name: string;
  color?: string;
}

export const navItems: NavItem[] = [
  {
    title: '首页',
    icon: 'ion:home-outline',
    color: '#1fdaca',
  },
  {
    title: '仪表盘',
    icon: 'ion:grid-outline',
    color: '#bf0c2c',
  },
  {
    title: '组件',
    icon: 'ion:layers-outline',
    color: '#e18525',
  },
  {
    title: '系统管理',
    icon: 'ion:settings-outline',
    color: '#3fb27f',
  },
  {
    title: '权限管理',
    icon: 'ion:key-outline',
    color: '#4daf1bc9',
  },
  {
    title: '图表',
    icon: 'ion:bar-chart-outline',
    color: '#00d8ff',
  },
];

export const team: Team[] = [
  {
    icon: <i-logos-microsoft-edge />,
    name: '伍迪算法组',
  },
  {
    icon: <i-logos-firefox />,
    name: '布局美化设计组',
  },
  {
    icon: <i-logos-safari />,
    name: '天天加班团队',
  },
  {
    icon: <i-logos-chrome />,
    name: '摸鱼天团',
  },
];

export const dynamicInfoItems: DynamicInfoItem[] = [
  {
    name: '马珂',
    date: '刚刚',
    desc: `在 <a>开源组</a> 创建了项目 <a>Vue</a>`,
  },
  {
    name: 'Lbite',
    date: '2天前',
    desc: `发表文章 <a>如何编写一个Vite插件</a> `,
  },
  {
    name: '皮特',
    date: '3天前',
    desc: `回复了 <a>杰克</a> 的问题 <a>如何进行项目优化？</a>`,
  },
  {
    name: '钟利',
    date: '2021-04-01 20:00',
    desc: `推送了代码到 <a>Github</a>`,
  },
];

export const groupItems: GroupItem[] = [
  {
    title: 'Github',
    icon: <i-ion-logo-github />,
    color: '',
    desc: '不要等待机会，而要创造机会。',
    group: '开源组',
    date: '2021-04-11',
  },
  {
    title: 'Vue',
    icon: <i-logos-vue />,
    color: '#3fb27f',
    desc: '现在的你决定将来的你。',
    group: '算法组',
    date: '2021-04-01',
  },
  {
    title: 'Html5',
    icon: 'vscode-icons:file-type-html',
    color: '#e18525',
    desc: '没有什么才能比努力更重要。',
    group: '上班摸鱼',
    date: '2021-07-01',
  },
  {
    title: 'Angular',
    icon: <i-logos-angular-icon />,
    color: '#bf0c2c',
    desc: '热情和欲望可以突破一切难关。',
    group: 'UI',
    date: '2021-11-11',
  },
  {
    title: 'React',
    icon: <i-logos-react />,
    color: '#00d8ff',
    desc: '健康的身体是实目标的基石。',
    group: '技术牛',
    date: '2021-12-8',
  },
  {
    title: 'Svelte',
    icon: <i-logos-svelte-icon />,
    color: '#4daf1bc9',
    desc: '路是走出来的，而不是空想出来的。',
    group: '架构组',
    date: '2020-09-23',
  },
];
