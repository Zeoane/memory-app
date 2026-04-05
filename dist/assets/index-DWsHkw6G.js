(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={view:`home`,settings:{boardSizeId:`4x4`,visualThemeId:`code-vibes`,layoutId:`nature`,firstPlayerColor:`blue`},game:null,showGameOver:!1},t=[{id:`4x4`,cols:4,rows:4,label:`16 cards`},{id:`4x6`,cols:4,rows:6,label:`24 cards`},{id:`6x6`,cols:6,rows:6,label:`36 cards`}],n=[{id:`code-vibes`,label:`Code vibes theme`,description:`Teal, klarer Dev-Look`},{id:`gaming`,label:`Gaming theme`,description:`Neon-Kanten, dunkle Karten`},{id:`da-projects`,label:`DA Projects theme`,description:`Sachlich, hoher Kontrast`},{id:`foods`,label:`Foods theme`,description:`Warme Töne, einladend`}],r=[{id:`nature`,label:`Natur & Tiere`,description:`Grüntöne, Wald- und Tier-Motive`,cssClass:`layout-nature`,pairs:`🐻.🦊.🐸.🐼.🦁.🐯.🐵.🐰.🦉.🦋.🐢.🦔.🌲.🌿.🍄.🌻.🦆.🐧.🦩.🐝.🍃.🌳.🌺.🪵.🪨.🦫.🐿️.🦌.🐬.🦭.🪷.🌴`.split(`.`)},{id:`space`,label:`Weltraum`,description:`Dunkelblau/Violett, Kosmos-Motive`,cssClass:`layout-space`,pairs:`🚀.🛸.🛰️.🌙.⭐.🌟.🪐.☄️.🌌.👽.🌑.🌠.🔭.🌍.🌕.☀️.🌎.🌖.🌗.🌘.🌒.🌓.🌔.🌚.👾.🤖.💫.✨.⚡.🌩️.📡.🧑‍🚀`.split(`.`)}];function i(e){return e===`blue`?{player1:`blue`,player2:`orange`}:{player1:`orange`,player2:`blue`}}function a(e){let n=t.find(t=>t.id===e);if(!n)throw Error(`Unbekannte Spielfeldgröße: ${e}`);return n}function o(e){let t=r.find(t=>t.id===e);if(!t)throw Error(`Unbekanntes Layout: ${e}`);return t}function s(e){let t=n.find(t=>t.id===e);if(!t)throw Error(`Unbekanntes Theme: ${e}`);return t}function c(e){return e.cols*e.rows/2}function ee(e){let t=[...e];for(let e=t.length-1;e>0;--e){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function l(e,t){let n=[],r=0;for(let i=0;i<t;i+=1){let t=e[i];n.push({id:r++,pairId:i,symbol:t}),n.push({id:r++,pairId:i,symbol:t})}return n}function te(e){let t=a(e.boardSizeId),n=o(e.layoutId),r=c(t),i=n.pairs.slice(0,r);if(i.length<r)throw Error(`Nicht genügend Symbole für die gewählte Spielfeldgröße.`);return ee(l(i,r))}var u=class{cards;revealed;matched;scores;currentPlayer;firstSelection=null;secondSelection=null;busy=!1;complete=!1;constructor(e){let t=te(e);this.cards=t,this.revealed=t.map(()=>!1),this.matched=t.map(()=>!1),this.scores=[0,0],this.currentPlayer=0}getSnapshot(){return this.createSnapshot()}createSnapshot(){return{cards:this.cards,revealed:this.revealed,matched:this.matched,scores:this.scores,currentPlayer:this.currentPlayer,firstSelection:this.firstSelection,secondSelection:this.secondSelection,isBusy:this.busy,isComplete:this.complete}}isFaceVisible(e){return this.revealed[e]||this.matched[e]}hasPendingSecondPick(){return this.firstSelection!==null&&this.secondSelection!==null}canSelect(e){return this.busy||this.complete||this.matched[e]||this.hasPendingSecondPick()?!1:this.firstSelection!==e}clearSelection(){this.firstSelection=null,this.secondSelection=null}isPairMatch(e,t){return this.cards[e].pairId===this.cards[t].pairId}switchPlayer(){this.currentPlayer=this.currentPlayer===0?1:0}markPairMatched(e,t){this.matched[e]=!0,this.matched[t]=!0,this.scores[this.currentPlayer]+=1}applyMatch(e,t,n,r){this.markPairMatched(e,t),this.clearSelection(),this.busy=!1,this.matched.every(Boolean)&&(this.complete=!0),n(),this.complete&&r()}applyMismatch(e,t,n){this.revealed[e]=!1,this.revealed[t]=!1,this.clearSelection(),this.switchPlayer(),this.busy=!1,n()}resolveFlip(e,t,n,r){this.isPairMatch(e,t)?this.applyMatch(e,t,n,r):this.applyMismatch(e,t,n)}scheduleFlipResolution(e,t,n,r){window.setTimeout(()=>{this.resolveFlip(e,t,n,r)},700)}openSecondPick(e,t,n){this.secondSelection=e,this.busy=!0,t();let r=this.firstSelection,i=this.secondSelection;r===null||i===null||this.scheduleFlipResolution(r,i,t,n)}selectCard(e,t,n){if(this.canSelect(e)){if(this.revealed[e]=!0,this.firstSelection===null){this.firstSelection=e,t();return}this.openSecondPick(e,t,n)}}};function d(e){let[t,n]=e;return t>n?`player1`:n>t?`player2`:`draw`}function f(e,t){return e.querySelector(`input[name="${t}"]:checked`)?.value??null}function p(t){let n=f(t,`boardSize`);n!==null&&(e.settings.boardSizeId=n)}function m(t){let n=f(t,`playerColor`);n!==null&&(e.settings.firstPlayerColor=n)}function h(t){let n=f(t,`visualTheme`);n!==null&&(e.settings.visualThemeId=n)}function g(e){p(e),m(e),h(e)}function _(e,t,n){e.querySelectorAll(`[data-action="${t}"]`).forEach(e=>{e.addEventListener(`click`,n)})}function v(t){e.view=`settings`,t()}function y(t){e.view=`home`,t()}function b(t,n){g(t),e.game=new u(e.settings),e.showGameOver=!1,e.view=`game`,n()}function x(t){e.game=null,e.showGameOver=!1,e.view=`settings`,t()}function S(t){e.game=new u(e.settings),e.showGameOver=!1,t()}function C(t,n){let r=t.currentTarget,i=Number(r.dataset.cardIndex),a=e.game;a===null||Number.isNaN(i)||a.selectCard(i,()=>n(),()=>{e.showGameOver=!0,n()})}function w(e,t){e.querySelectorAll(`.memory-card[data-card-index]`).forEach(e=>{e.addEventListener(`click`,e=>C(e,t))})}function T(e,t){let n=e.querySelector(`.screen--settings`);n!==null&&n.querySelectorAll(`input[type="radio"]`).forEach(n=>{n.addEventListener(`change`,()=>{g(e),t()})})}function E(e,t){_(e,`go-settings`,()=>v(t)),_(e,`go-home`,()=>y(t)),_(e,`start-game`,()=>b(e,t)),_(e,`exit-game`,()=>x(t)),_(e,`new-round`,()=>S(t)),_(e,`go-settings-from-game`,()=>x(t)),w(e,t),T(e,t)}var D=`app-root`;function O(e,t,n){if(e.className=``,e.classList.add(D),e.classList.add(`theme--${t.visualThemeId}`),n===`settings`){e.classList.add(`app-root--settings`);return}e.classList.add(o(t.layoutId).cssClass)}var k=0;function A(e,t,n){return`<div class="game-bar__pair">
            <dt class="game-bar__score-label">${e}</dt>
            <dd class="game-bar__score-value"><span class="${n}">${t}</span></dd>
          </div>`}function j(e,t){let n=`score score--p1 player-tag player-tag--${t.player1}`,r=`score score--p2 player-tag player-tag--${t.player2}`;return`<dl class="game-bar__scores">${`${A(`Spieler 1`,e.scores[0],n)}${A(`Spieler 2`,e.scores[1],r)}`}</dl>`}function M(e,t){return e.currentPlayer===k?`player-tag--${t.player1}`:`player-tag--${t.player2}`}function N(e){return e.currentPlayer===k?`Spieler 1`:`Spieler 2`}function P(e,t){return`<p class="game-bar__turn">Am Zug: <strong class="player-tag ${M(e,t)}">${N(e)}</strong></p>`}function F(){return`<nav class="game-bar__nav" aria-label="Spielaktionen">
          <ul class="game-bar__nav-list">
            <li>
              <button type="button" class="btn btn--ghost" data-action="exit-game">Exit Game</button>
            </li>
          </ul>
        </nav>`}function I(e,t){return`${j(e,t)}${P(e,t)}${F()}`}function L(e,t){return e.isBusy||e.isComplete||t?`disabled`:``}function R(e){return`<span class="memory-card__inner">
            <span class="memory-card__face memory-card__face--back" aria-hidden="true">?</span>
            <span class="memory-card__face memory-card__face--front" aria-hidden="true">${e}</span>
          </span>`}function z(e,t,n){let r=e.isFaceVisible(n),i=t.matched[n],a=r?` is-flipped`:``,o=i?` is-matched`:``,s=L(t,i),c=t.cards[n];return`<button type="button" class="memory-card${a}${o}" data-card-index="${n}" aria-label="Karte ${n+1}" ${s}>${R(c.symbol)}</button>`}function B(e){let t=document.createElement(`div`);return t.textContent=e,t.innerHTML}var V=`<dialog class="modal" open aria-labelledby="game-over-title" aria-modal="true">\r
  <article class="modal__article">\r
    <header class="modal__header">\r
      <h2 id="game-over-title" class="modal__title">Game over</h2>\r
    </header>\r
    <p class="modal__scores">{{SCORE_LINE}}</p>\r
    <p class="modal__winner{{WINNER_MODIFIER}}">{{MESSAGE}}</p>\r
    <footer class="modal__actions">\r
      <button type="button" class="btn btn--primary" data-action="new-round">Neue Runde</button>\r
      <button type="button" class="btn btn--ghost" data-action="go-settings-from-game">Einstellungen</button>\r
    </footer>\r
  </article>\r
</dialog>\r
`;function H(e,t){let n=e;for(let[e,r]of Object.entries(t))n=n.replaceAll(`{{${e}}}`,r);return n}function U(e,t,n){return`Spieler 1: <span class="player-tag player-tag--${n.player1}">${e}</span> · Spieler 2: <span class="player-tag player-tag--${n.player2}">${t}</span>`}function W(e){return e===`draw`?`Unentschieden!`:e===`player1`?`Spieler 1 gewinnt!`:`Spieler 2 gewinnt!`}function G(e){return e===`draw`?``:` modal__winner--highlight`}function ne(e,t,n){let r=d([e,t]),i=W(r);return H(V,{SCORE_LINE:U(e,t,n),WINNER_MODIFIER:G(r),MESSAGE:B(i)})}var K=`<main class="screen screen--game">\r
  <header class="game-bar">{{GAME_BAR}}</header>\r
  <section\r
    class="memory-grid"\r
    style="{{GRID_STYLE}}"\r
    role="grid"\r
    aria-label="Memory-Spielfeld"\r
  >\r
    {{CARDS}}\r
  </section>\r
  {{GAME_OVER}}\r
</main>\r
`;function q(e,t){return`--cols: ${e}; --rows: ${t};`}function J(e,t){return t.cards.map((n,r)=>z(e,t,r)).join(``)}function Y(e,t,n){return t&&e.isComplete?ne(e.scores[0],e.scores[1],n):``}function X(e,n,r){let a=e.getSnapshot(),o=i(n.firstPlayerColor),s=t.find(e=>e.id===n.boardSizeId);return s===void 0?``:H(K,{GAME_BAR:I(a,o),GRID_STYLE:q(s.cols,s.rows),CARDS:J(e,a),GAME_OVER:Y(a,r,o)})}function Z(e,t,n){return e===null?``:X(e,t,n)}var re=``+new URL(`Primary button-CNXT5xaq.svg`,import.meta.url).href,ie=`<svg class="screen-home__deco-svg" aria-hidden="true" focusable="false" width="363" height="410" viewBox="0 0 363 410" fill="none" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
<path d="M-32.8453 227.361C-47.8534 215.879 -56.5724 200.711 -59.0024 181.859C-61.4323 163.007 -57.0806 145.786 -45.9472 130.197C-44.2308 127.954 -42.3893 125.806 -40.4227 123.754C-38.4561 121.702 -36.3645 119.745 -34.1478 117.884L93.4899 16.3584C107.29 5.57635 122.763 0.124242 139.908 0.0021104C157.053 -0.120019 172.504 5.08154 186.261 15.6068L332.59 127.557C346.347 138.082 355.41 151.635 359.776 168.215C364.143 184.794 362.928 201.154 356.132 217.295L291.528 367.045C290.312 369.672 288.985 372.312 287.549 374.968C286.112 377.623 284.536 380.072 282.819 382.316C271.186 397.522 255.876 406.26 236.889 408.53C217.903 410.8 200.781 406.098 185.523 394.425C175.017 386.387 167.359 376.182 162.55 363.809C157.741 351.435 156.709 338.79 159.454 325.872L165.54 296.147C166.197 292.698 165.751 289.393 164.203 286.233C162.656 283.073 160.506 280.44 157.755 278.335L86.4661 223.795C83.7146 221.69 80.6114 220.304 77.1565 219.637C73.7016 218.969 70.3952 219.404 67.2374 220.94L40.1395 234.59C28.3898 240.618 15.9147 242.929 2.71413 241.524C-10.4865 240.119 -22.3396 235.398 -32.8453 227.361ZM-8.8338 198.308C-4.08123 201.944 1.18717 203.999 6.97142 204.472C12.7557 204.945 18.2694 203.829 23.5127 201.122L50.3245 187.846C59.9887 182.988 70.1165 181.153 80.708 182.341C91.2994 183.528 100.847 187.375 109.352 193.881L180.64 248.421C189.145 254.928 195.308 263.199 199.129 273.236C202.95 283.273 204.001 293.561 202.281 304.102L196.481 333.453C195.24 339.222 195.604 344.835 197.574 350.294C199.544 355.753 202.905 360.301 207.658 363.937C214.662 369.295 222.429 371.582 230.96 370.798C239.491 370.014 246.552 366.227 252.142 359.439C251.951 359.688 253.513 357.128 256.827 351.76L321.144 202.383C324.543 194.313 325.237 186.15 323.226 177.893C321.215 169.637 316.708 162.829 309.704 157.471L163.375 45.5206C156.371 40.1623 148.56 37.5449 139.939 37.6683C131.319 37.7916 123.684 40.6445 117.034 46.227L-10.3174 147.379C-11.962 148.492 -13.9285 150.544 -16.2171 153.535C-21.5572 160.515 -23.4751 168.335 -21.9709 176.994C-20.4668 185.654 -16.0877 192.758 -8.8338 198.308ZM201.837 193.504C206.089 196.757 210.751 198.05 215.82 197.384C220.89 196.718 225.046 194.266 228.288 190.029C231.53 185.791 232.81 181.138 232.126 176.071C231.443 171.003 228.975 166.843 224.723 163.59C220.471 160.336 215.81 159.043 210.74 159.709C205.67 160.375 201.514 162.827 198.272 167.065C195.03 171.302 193.75 175.955 194.434 181.022C195.117 186.09 197.585 190.25 201.837 193.504ZM254.739 186.554C258.992 189.807 263.653 191.101 268.722 190.435C273.792 189.769 277.948 187.317 281.19 183.079C284.432 178.841 285.712 174.189 285.029 169.121C284.345 164.054 281.877 159.893 277.625 156.64C273.373 153.387 268.712 152.093 263.642 152.759C258.572 153.425 254.416 155.877 251.174 160.115C247.932 164.353 246.652 169.005 247.336 174.073C248.019 179.14 250.487 183.301 254.739 186.554ZM208.967 246.382C213.22 249.635 217.881 250.928 222.951 250.262C228.02 249.596 232.176 247.144 235.419 242.907C238.661 238.669 239.94 234.016 239.257 228.949C238.573 223.881 236.106 219.721 231.853 216.468C227.601 213.214 222.94 211.921 217.87 212.587C212.8 213.253 208.644 215.705 205.402 219.943C202.16 224.18 200.881 228.833 201.564 233.9C202.247 238.968 204.715 243.128 208.967 246.382ZM261.87 239.432C266.122 242.685 270.783 243.979 275.853 243.313C280.922 242.647 285.078 240.195 288.321 235.957C291.563 231.719 292.842 227.067 292.159 221.999C291.476 216.932 289.008 212.771 284.755 209.518C280.503 206.265 275.842 204.971 270.772 205.637C265.703 206.303 261.547 208.755 258.304 212.993C255.062 217.231 253.783 221.883 254.466 226.951C255.149 232.018 257.617 236.179 261.87 239.432ZM109.632 158.529C112.884 161.016 116.384 162.014 120.131 161.522C123.878 161.03 126.991 159.163 129.471 155.922L140.913 140.965L155.922 152.448C159.173 154.935 162.673 155.933 166.42 155.441C170.167 154.949 173.281 153.082 175.76 149.841C178.239 146.601 179.226 143.108 178.721 139.362C178.216 135.617 176.338 132.5 173.086 130.012L158.078 118.53L169.521 103.573C172 100.332 172.987 96.8394 172.482 93.0939C171.977 89.3483 170.099 86.2317 166.847 83.7439C163.595 81.2561 160.096 80.2583 156.348 80.7506C152.601 81.2429 149.488 83.1094 147.009 86.35L135.566 101.307L120.558 89.8249C117.306 87.3371 113.806 86.3393 110.059 86.8316C106.312 87.3239 103.199 89.1904 100.719 92.431C98.2401 95.6717 97.253 99.1648 97.758 102.91C98.2631 106.656 100.141 109.772 103.393 112.26L118.401 123.742L106.958 138.699C104.479 141.94 103.492 145.433 103.997 149.179C104.502 152.924 106.381 156.041 109.632 158.529Z" fill="#F0EA6E"/>
</svg>
`,ae=`<main class="screen screen--home">\r
  <div class="screen-home__deco" aria-hidden="true">\r
    {{STADIA_CONTROLLER_SVG}}\r
  </div>\r
  <article class="screen-home__content">\r
    <div class="screen-home__headlines">\r
      <p class="screen-home__kicker">It&rsquo;s play time.</p>\r
      <h1 class="screen-home__title">Ready to play?</h1>\r
    </div>\r
    <button type="button" class="screen-home__play" data-action="go-settings">\r
      <span class="visually-hidden">Play</span>\r
      <img\r
        class="screen-home__play-img"\r
        src="{{PRIMARY_BUTTON_SRC}}"\r
        alt=""\r
        width="250"\r
        height="98"\r
      />\r
    </button>\r
  </article>\r
</main>\r
`;function oe(){return H(ae,{PRIMARY_BUTTON_SRC:re,STADIA_CONTROLLER_SVG:ie.trim()})}var se=`<main class="screen screen--settings">\r
  <div class="settings-screen">\r
    <div class="settings-screen__main">\r
      <section class="settings-screen__controls" aria-label="Spieleinstellungen">\r
        <nav class="settings-screen__nav" aria-label="Weiterführende Navigation">\r
          <button type="button" class="settings-screen__back" data-action="go-home">← Zurück</button>\r
        </nav>\r
        <h1 class="settings-screen__heading">\r
          <span class="settings-screen__title">Settings</span>\r
          <span class="settings-screen__title-rule" aria-hidden="true">\r
            <span class="settings-screen__title-diamond"></span>\r
            <span class="settings-screen__title-line"></span>\r
          </span>\r
        </h1>\r
        {{VISUAL_THEME_SECTION}}\r
        {{PLAYER_COLOR_SECTION}}\r
        {{BOARD_SIZE_SECTION}}\r
      </section>\r
      <aside class="settings-screen__aside" aria-label="Vorschau">\r
        {{PREVIEW}}\r
        <div class="settings-screen__action-bar">\r
          <div\r
            class="settings-screen__action-bar-inner"\r
            role="group"\r
            aria-label="Ausgewählte Einstellungen und Spiel starten"\r
          >\r
            <span class="settings-screen__action-chip settings-screen__action-chip--theme">{{FOOTER_THEME}}</span>\r
            <span class="settings-screen__action-slash" aria-hidden="true"></span>\r
            <span class="settings-screen__action-chip settings-screen__action-chip--player">{{FOOTER_PLAYER}}</span>\r
            <span class="settings-screen__action-slash" aria-hidden="true"></span>\r
            <span class="settings-screen__action-chip settings-screen__action-chip--board">{{FOOTER_BOARD}}</span>\r
            <button type="button" class="settings-screen__start" data-action="start-game">\r
              <span class="settings-screen__start-icon" aria-hidden="true">\r
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\r
                  <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" stroke-width="1.5" />\r
                  <path d="M9 7.5L16.5 12L9 16.5V7.5Z" fill="currentColor" />\r
                </svg>\r
              </span>\r
              <span class="settings-screen__start-label">Start</span>\r
            </button>\r
          </div>\r
        </div>\r
      </aside>\r
    </div>\r
  </div>\r
</main>\r
`,ce=`<section class="panel panel--settings panel--board-size" aria-labelledby="fieldset-board-size-title">\r
  <fieldset class="panel__fieldset panel__fieldset--board-size">\r
    <legend id="fieldset-board-size-title" class="settings-board-size__heading">\r
      <span class="settings-board-size__cards-icon" aria-hidden="true">\r
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">\r
          <rect x="7" y="9" width="15" height="19" rx="2" stroke="#3b82f6" stroke-width="1.5" />\r
          <rect x="11" y="5" width="15" height="19" rx="2" fill="#ffffff" stroke="#3b82f6" stroke-width="1.5" />\r
        </svg>\r
      </span>\r
      <span class="settings-board-size__title-text">Board size</span>\r
    </legend>\r
    <ul class="panel__options panel__options--board-size">{{RADIOS}}</ul>\r
  </fieldset>\r
</section>\r
`,le=`<section class="panel panel--settings panel--choose-player" aria-labelledby="fieldset-player-color-title">\r
  <fieldset class="panel__fieldset panel__fieldset--choose-player">\r
    <legend id="fieldset-player-color-title" class="settings-choose-player__heading">\r
      <span class="settings-choose-player__pawn" aria-hidden="true">\r
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">\r
          <path\r
            d="M16 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-3.5 8h7l2.1 9.5H10.4L12.5 14zM9.5 24.5h13V27h-13v-2.5z"\r
            fill="#2dd4bf"\r
          />\r
        </svg>\r
      </span>\r
      <span class="settings-choose-player__title-text">Choose player</span>\r
    </legend>\r
    <ul class="panel__options panel__options--choose-player">{{RADIOS}}</ul>\r
  </fieldset>\r
</section>\r
`,ue=`<section class="panel panel--settings panel--game-themes" aria-labelledby="fieldset-visual-theme-title">\r
  <fieldset class="panel__fieldset panel__fieldset--game-themes">\r
    <legend id="fieldset-visual-theme-title" class="settings-game-themes__heading">\r
      <span class="settings-game-themes__palette" aria-hidden="true">\r
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">\r
          <path\r
            d="M16 4C10.5 4 6 8.2 6 13.5c0 4.2 3.2 7.7 7.5 8.4V26h5v-4.1c4.3-.7 7.5-4.2 7.5-8.4C26 8.2 21.5 4 16 4zm0 3c3.6 0 6.5 2.8 6.5 6.3 0 2.4-1.4 4.5-3.4 5.5-.5.3-.8.8-.8 1.4V22h-4.5v-1.8c0-.6-.3-1.1-.8-1.4-2-1-3.4-3.1-3.4-5.5C9.5 9.8 12.4 7 16 7z"\r
            fill="#DA1EBA"\r
          />\r
          <circle cx="11" cy="12" r="2" fill="#DA1EBA" />\r
          <circle cx="16" cy="10" r="2" fill="#DA1EBA" />\r
          <circle cx="21" cy="12" r="2" fill="#DA1EBA" />\r
        </svg>\r
      </span>\r
      <span class="settings-game-themes__title-text">Game themes</span>\r
    </legend>\r
    <ul class="panel__options panel__options--game-themes">{{RADIOS}}</ul>\r
  </fieldset>\r
</section>\r
`,de=``+new URL(`Frame 628-D-m96y1D.svg`,import.meta.url).href;function fe(e,t){let n=e.boardSizeId===t.id?`checked`:``;return`
      <li>
        <label class="choice choice--board-size">
          <input class="choice__radio choice__radio--theme" type="radio" name="boardSize" value="${t.id}" ${n} />
          <span class="choice__title choice__title--board">${B(t.label)}</span>
        </label>
      </li>
    `}function pe(e){return t.map(t=>fe(e,t)).join(``)}function me(e,t){return`
      <li>
        <label class="choice choice--choose-player">
          <input class="choice__radio choice__radio--theme" type="radio" name="playerColor" value="${t}" ${e.firstPlayerColor===t?`checked`:``} />
          <span class="choice__title choice__title--player">${t===`blue`?`Blue`:`Orange`}</span>
        </label>
      </li>
    `}function he(e){return[`blue`,`orange`].map(t=>me(e,t)).join(``)}function ge(e,t){let n=e.visualThemeId===t.id?`checked`:``;return`
      <li>
        <label class="choice choice--game-theme">
          <input class="choice__radio choice__radio--theme" type="radio" name="visualTheme" value="${t.id}" ${n} />
          <span class="choice__theme-body">
            <span class="choice__title choice__title--theme">${B(t.label)}</span>
            <span class="choice__theme-accent" aria-hidden="true">
              <span class="choice__theme-line"></span>
              <span class="choice__theme-diamond"></span>
            </span>
          </span>
        </label>
      </li>
    `}function _e(e){return n.map(t=>ge(e,t)).join(``)}function ve(e){return H(ce,{RADIOS:pe(e)})}function ye(e){return H(le,{RADIOS:he(e)})}function be(e){return H(ue,{RADIOS:_e(e)})}function xe(e){return s(e.visualThemeId).label}function Q(e){return e.firstPlayerColor===`blue`?`Blue`:`Orange`}function Se(e){return a(e.boardSizeId).label}function Ce(e){return`
    <div class="settings-preview">
      <div class="settings-preview__chrome">
        <div class="settings-preview__stage">
          <img
            class="settings-preview__stage-img"
            src="${de}"
            width="451"
            height="387"
            alt="Vorschau: Spielleiste und Karten"
            decoding="async"
          />
        </div>
      </div>
    </div>
  `.trim()}function we(e){return{BOARD_SIZE_SECTION:ve(e),PLAYER_COLOR_SECTION:ye(e),VISUAL_THEME_SECTION:be(e),PREVIEW:Ce(e),FOOTER_THEME:B(xe(e)),FOOTER_PLAYER:B(Q(e)),FOOTER_BOARD:B(Se(e))}}function Te(e){return H(se,we(e))}function Ee(){let t=e.view;return t===`home`?oe():t===`settings`?Te(e.settings):Z(e.game,e.settings,e.showGameOver)}function $(t){O(t,e.settings,e.view),t.innerHTML=Ee(),E(t,()=>$(t))}var De=`app`;function Oe(){let e=document.getElementById(De);e!==null&&$(e)}Oe();