<img src="https://i.imgur.com/um3TOZc.png" />

【ViuTV】《IT狗》改名易(frontend) [nameeasy.app](https://nameeasy.app)
===============

<img src="https://i.imgur.com/2xvORiI.jpg" />

此app 為Born Hub 創辦人Kenneth 為了解決大家改名的煩惱，專程找來一班學生research，再憑他多年的經驗和分析而創作出全球第一個在Born Hub 面世的app，改名易。

backend 請見[連結](https://github.com/ckanthony/name-easy-api)

改名方法
-------
使用本app，用家需要輸入公司的mission ，然後app 會使用四個步驟來得出公司名稱:

1. 精簡化用家輸入的mission，在這裡我們使用了 `nlpjs`。
2. 抽出最後一個動詞和副詞，因為在劇中，CEO 說的東西重點通常都是在最後一句中，如果所有句子都沒有動詞或副詞，就會要求重試。在這裡我們使用了 `wordpos`來決定verb adverb 的位置。
3. 找出動詞的同意詞，在這裡我們使用了[Datamuse](https://www.datamuse.com/api/) 線上查找同意詞，也有使用 `synonyms` 作線下(local) 後備。
4. 隨機抽出一個動詞，然後以 I\[\]U 送出。

開發者
-----
<a href="https://github.com/ckanthony/name-easy-app/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ckanthony/name-easy-app" />
</a>

Made with [contrib.rocks](https://contrib.rocks).

免責聲名
-------
改名易為香港電視娛樂(下稱ViuTV) 製作之喜劇電視劇 原創劇《IT狗》（英語：In Geek We Trust）的虛構app，版權全部屬於ViuTV，我都冇say，版權擁有者可以決定其他人是否有權使用他們的作品。  本app 所提供的資料只供參考之用，如有需要請以 <ckanthony[at]gmail.com> 和anthony (backend) <jeremytsang65431[at]gmail.com> Jeremy (frontend) 聯絡。
