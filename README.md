# Hahow Backend Engineer 徵才小專案
透過串接[Hahow API](https://hahow-recruit.herokuapp.com)，為使用者提供資料
## Start
1. 下載專案
```
git clone https://github.com/martinchiu/hahow-pretest.git
```
2. 下載 `Node.js` (version: >=13)
- 透過[官網](https://nodejs.org/zh-tw)
- 透過 [nvm](https://www.casper.tw/development/2022/01/10/install-nvm/) 下載並管理`Node.js`版本
3. 進入專案資料夾並安裝必要套件
```
cd hahow-pretest
npm i
```
4. 透過`.env.example`建立讓專案使用的`.env`檔案，並在其中輸入環境變數的值
```
cp .env.example .env
vi .env
```
```
e.g.
PORT=5001
API_URL='https://hahow-recruit.herokuapp.com/'
SERVER_URL='http://localhost'
```
5. 用`node`起服務，或是可用`nodemon`起服務方便開發時debug
```
npm run start
npm run debug
```
6. 用`jest`跑測試
```
npm run test
```
## Structure
```
|—— .vscode                # vscode 相關設置
|   └── launch.json        # 偵錯工具設置
|
|—— node_modules/          # node 相關的套件 (隱藏目錄)
|—— route/                 # API 路由
|—— service/               # API 邏輯
|—— test/                  # 單元測試
|—— utils/                 # 共用元件
|—— .env                   # 環境變數設定檔
|—— .env.example           # 環境變數範例檔
|—— .gitignore
|—— app.js                 # 專案啟動檔
|—— package-lock.json
|—— package.json           # 專案、相依套件設定檔
└── README.md
```
## Library
|套件|功能理解| 簡介
|----|:----:|----|
|axios |基於`promise`模式發送網路請求|相比可接觸到更底層的`fetch`套件，`axios`使用上更方便且直觀，例：設置請求timeout，`axios`僅需在option添加key；`axios`收到status code非2XX的回應，會用reject的方式處理。[官方文件](https://axios-http.com/docs/intro)
|dotenv |管理環境變數 |載入`.env`內的值設定為`process.env`底下的變數。[官方文件](https://www.npmjs.com/package/dotenv?activeTab=readme)
|express |`Node.js` 最受歡迎的框架|輕量、易上手且提供豐富的HTTP工具，讓使用者可以快速建立後端Server。[官方文件](https://expressjs.com/)
|jest |測試框架 |自備斷言庫且易上手的測試框架，近幾年的使用量更是力壓另外兩個框架(`ava`、`mocha`)。[官方文件](https://jestjs.io)
|nodemon |起服務的套件 |開發階段會頻繁地修改程式，使用`nodemon`可以在程式修改後更方便地重啟服務，但有個致命缺點是無法應用在分佈式架構，因此在分佈式架構下會選擇另一個套件：`pm2`。[官方文件](https://www.npmjs.com/package/nodemon)
## Comment
寫註解有底下幾點原則：

* 註解獨立一行，版面比較好看
* 統一註解風格，`//...`、`/* ... */`都可以，統一就好
* 在寫程式時盡量讓邏輯清楚，在一些乍看之下反直覺的地方再用註解補充說明
* 註解盡量言簡意賅，避免冗詞贅字
* 更多註解原則可參考[此篇](https://tw-google-styleguide.readthedocs.io/en/latest/google-cpp-styleguide/comments.html)

## Difficulty
在寫這專案的過程大致來說沒遇到太多困難，看完要求列表後列出需要完成的細項並一一完成，少數的困難大部分是在寫測試的時候，因為最近比較少寫測試的需求，離上次寫測試有點久了，因此較不熟悉。

在此統整寫測試時遇到的幾個問題：
* jest 用es6 module 遇到問題
    > 因為整份專案引用模組的方式是採用ES6的語法，因此為了統一程式風格，在寫測試時也想如此，但就遇上錯誤：_Cannot Use Import Statement Outside a Module_，上網找尋到[連結１](https://stackoverflow.com/questions/35756479/does-jest-support-es6-import-export)、[連結２](https://stackoverflow.com/questions/74069138/node-js-experimental-vm-modules-command-line-option-vs-type-module-in-pac)這兩篇貼文後才解決。事後回去翻官方資料也說目前尚未完全支援ECMAScript Modules (ESM).

* jest 引用環境變數遇到問題
    > 原先以為`.test.js`檔案可以直接像一般`.js`一樣引用環境變數，但這樣做只會拿到`undefined`，後來透過[這篇貼文](https://stackoverflow.com/questions/50259025/using-env-files-for-unit-testing-with-jest)才解決

* axios 遇到非200 的狀況會reject，此時可選用`test.failing()`避免測試出錯，但就無法驗證後續收到的資料
    >[官方文件](https://jestjs.io/docs/api#testfailingname-fn-timeout)也說`test.failing()`方法僅驗證測試案例是否會噴錯，若噴錯則會通過（後續不會再驗證），若無噴錯則判斷測試案例失敗。因此我選擇用`try catch`包住`axios`，catch error後再驗證回傳的資訊
