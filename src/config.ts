// 网站的基本信息，改这里就行。
export const SITE = {
  title: '随手记',
  description: '零碎的想法、学习和探索的记录。',
  author: 'allisa',
  lang: 'zh-CN',
};

// 栏目：按主题分类。新增一个栏目只要在这里加一行，
// 网站会自动生成它的列表页，首页也会多一个筛选标签。
// id 用英文（会出现在网址里），name 是显示的名字。
export const SECTIONS = [
  { id: 'course', name: '课程学习', intro: '上课、读书、自学时的理解和疑问。' },
  { id: 'gamedev', name: '游戏开发', intro: '做游戏过程中踩的坑和攒下的经验。' },
  { id: 'daily', name: '今日见闻', intro: '今天看到、听到、想到的一点启示。' },
  { id: 'misc', name: '杂想', intro: '不属于上面任何一类的零碎想法。' },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];
