---
pageType: home

hero:
  name: 'The limits of my language mean the limits of my world.'
  text: ''
  tagline: -Ludwig Wittgenstein
  actions:
    - theme: brand
      text: 我的博客
      link: /coding-challenges/
    - theme: alt
      text: GitHub
      link: https://github.com/lajiao-dev/code-insights.git
  image:
    src: /logo.svg
    alt: Logo
features:
  - title: 关于网站
    details: 这里是我的个人记录本，方便以后自己翻阅。
    icon: 🌈
  # - title: 关于博客
  #   details: 好记性不如烂笔头。在这里，你会看到我的技术笔记、Bug 修复的血泪史，以及一些关于职业成长的碎碎念。
  #   icon: 🎨
  # - title: 关于项目
  #   details: 业余时间的折腾成果。每一个项目，要么是对新技术的练手，要么是为了解决我自己在生活中遇到的痛点。Show me the code!
  #   icon: 📦
  # - title: Simpler I18n solution
  #   details: With the built-in I18n solution, you can easily provide multi-language support for documents or components.
  #   icon: 🌍
  # - title: Static site generation
  #   details: In production, it automatically builds into static HTML files, which can be easily deployed anywhere.
  #   icon: 🏃🏻‍♀️
  # - title: Providing multiple custom capabilities
  #   details: Through its extension mechanism, you can easily extend theme UI and build process.
  #   icon: 🔥
---
import { HomeFooter as BasicHomeFooter } from '@rspress/core/theme-original';

export default function HomeFooter() {
  return <BasicHomeFooter />;
}
