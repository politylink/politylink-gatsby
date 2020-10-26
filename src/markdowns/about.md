---
slug: "/about"
title: "PolityLinkについて"
description: "PolityLink（ポリティリンク）は政治の「原文」へのポータルサイトです。私たち国民が、政治に関する「正確」で「中立」な情報に簡単にアクセスできるように、国会や行政機関の公式サイトに散らばった情報を、互いに関連付けてまとめ直しています。"
---

## PolityLinkとは？
PolityLink（ポリティリンク）は政治の「原文」へのポータルサイトです。
私たち国民が、政治に関する「正確」で「中立」な情報に簡単にアクセスできるように、
国会や行政機関の公式サイトに散らばった情報を、互いに関連付けてまとめ直しています。

## どうしてPolityLinkを作ったのか？
誰もが気軽に情報を発信できる現代社会において、情報のソース、すなわち「原文」を確認することは大切です。
これは政治においても例外ではありません。
そもそも誤った情報はもとより、文脈から切り離されて一人歩きした発言や、一つの側面のみに焦点を当てたニュースだけを見ていると、
事実を誤解したり、問題の本質を見落としてしまう危険性があります。

しかしながら、政治の「原文」にアクセスするのは現状困難です。
実は「原文」自体は既にネット上に公開されています。
真の問題点は、これらの情報が様々なサイトでバラバラに公開されている、という現状にあります。
例えば2020年5月に話題となった「検察庁法改正案」に関する情報を集める場合を考えてみましょう。
国会に提出された法律案は[衆議院](http://www.shugiin.go.jp/internet/itdb_gian.nsf/html/gian/honbun/houan/g20109052.htm)にて公開されていますが、
改正対象の検察庁法は[e-Gov](https://elaws.e-gov.go.jp/search/elawsSearch/elaws_search/lsg0500/detail?lawId=322AC0000000061)にて、
法律案の概要は[内閣官房](http://www.cas.go.jp/jp/houan/200313/siryou1.pdf)にて、
そして国会での議論は[国会会議録検索システム](https://kokkai.ndl.go.jp/#/detail?minId=120104889X01120200515&spkNum=4&single)にて 、
それぞれ別々に公開されています。
これらの情報は、相互に紐づいておらず、各サイトにて独立に探さなければ閲覧することができません。

PolityLinkはこの問題を解決するためのポータルサイトです。
ここでは様々なサイトから集められた「原文」が相互に紐づいてまとめられています。
例えば、法律案詳細ページ（例:[検察庁法改正案](https://politylink.jp/bill/JS-WqDyU0tM_g8Qvuxj5aA)）からは、
法律案本文、概要、改正対象法、会議録など、その法律案に関する全ての情報にアクセスできます。
一方で議員詳細ページからは、発言、提出法律案、質問主意書など、その議員に関する全ての情報にアクセスできます（実装中）。

PolityLinkを通し、皆さんが政治に関する正確で中立な情報に簡単にアクセスする手助けをできれば幸いです。

## PolityLinkのデータについて
現在PolityLinkでは以下のサイトからデータを収集しています。

* [衆議院](http://www.shugiin.go.jp/internet/itdb_gian.nsf/html/gian/menu.htm): 法律案一覧、本文、提出理由
* [参議院](https://www.sangiin.go.jp/japanese/joho1/kousei/gian/201/gian.htm): 法律案一覧、審議経過
* [衆議院法制局](http://www.shugiin.go.jp/internet/itdb_annai.nsf/html/statics/housei/html/h-shuhou201.html): 衆法の関連資料（概要PDF、新旧対照表PDF）
* [参議院法制局](https://houseikyoku.sangiin.go.jp/sanhouichiran/kaijibetu/r-201.htm): 参法の関連資料
* [各省庁の公式サイト](https://www.e-gov.go.jp/law/bill.html): 閣法の関連資料
* [国会会議録検索システム](https://kokkai.ndl.go.jp/#/): 国会会議録

なおデータ処理は自動で行われており、PolityLinkはそのデータの完全性及び正確性を保証することはできません。

## ニュース記事との連携機能について
現在PolityLinkでは、各種ページにおいて関連するニュース記事へのリンクを提供しています。
関連するニュース記事を検出する目的で、プログラムを用いてニュースサイトから記事を複製し情報解析する行為は著作物の非享受利用に該当し（[著作権法第三十条の四](https://elaws.e-gov.go.jp/search/elawsSearch/elaws_search/lsg0500/detail?lawId=345AC0000000048#254)）、
PolityLinkのページにおいてニュース記事のタイトルとサムネイルをリンクと共に表示する行為は著作物の軽微利用に該当する（[著作権法第四十七条の五](https://elaws.e-gov.go.jp/search/elawsSearch/elaws_search/lsg0500/detail?lawId=345AC0000000048#388)）と解釈しています。
本サービスに関しましては本ページ下部に記載の連絡先からお問い合わせください。

## PolityLinkチームについて
PolityLinkは政治に興味を持った3人のエンジニアによって運営されています。
コードは全て[GitHub](https://github.com/politylink)で公開しており、
集めたデータは[GraphQL](https://graphql.politylink.jp/)で公開しています。

もしPolityLinkに興味がありましたら、politylinkあっとgmail.com、
または[Twitter](https://twitter.com/politylink) まで気軽にご連絡ください。
