(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2032%2032'%20aria-hidden='true'%3e%3crect%20width='32'%20height='32'%20rx='8'%20fill='%230f172a'/%3e%3crect%20x='6'%20y='10'%20width='20'%20height='14'%20rx='3'%20fill='none'%20stroke='%236ee7b7'%20stroke-width='2'/%3e%3ccircle%20cx='13'%20cy='17'%20r='2'%20fill='%236ee7b7'/%3e%3ccircle%20cx='19'%20cy='17'%20r='2'%20fill='%236ee7b7'/%3e%3c/svg%3e`,t={boardSizeId:`4x4`,visualThemeId:`code-vibes`,layoutId:`nature`,firstPlayerColor:`blue`};function n(){return{boardSizeId:null,visualThemeId:null,firstPlayerColor:null}}var r={view:`home`,settings:{...t},settingsDraft:n(),game:null,showGameOver:!1,showCodeVibesWinnerOrange:!1,showCodeVibesWinnerBlue:!1,showExitConfirm:!1},i=[{id:`4x4`,cols:4,rows:4,label:`16 cards`},{id:`6x4`,cols:6,rows:4,label:`24 cards`},{id:`6x6`,cols:6,rows:6,label:`36 cards`}],a=[{id:`code-vibes`,label:`Code vibes theme`,description:`Teal, klarer Dev-Look`},{id:`gaming`,label:`Gaming theme`,description:`Neon-Kanten, dunkle Karten`},{id:`da-projects`,label:`DA Projects theme`,description:`Sachlich, hoher Kontrast`},{id:`foods`,label:`Foods theme`,description:`Warme Töne, einladend`}],o=`🐻.🦊.🐸.🐼.🦁.🐯.🐵.🐰.🦉.🦋.🐢.🦔.🌲.🌿.🍄.🌻.🦆.🐧.🦩.🐝.🍃.🌳.🌺.🪵.🪨.🦫.🐿️.🦌.🐬.🦭.🪷.🌴`.split(`.`),s=`🚀.🛸.🛰️.🌙.⭐.🌟.🪐.☄️.🌌.👽.🌑.🌠.🔭.🌍.🌕.☀️.🌎.🌖.🌗.🌘.🌒.🌓.🌔.🌚.👾.🤖.💫.✨.⚡.🌩️.📡.🧑‍🚀`.split(`.`),c=[`Angular Icon 1`,`Bootstrap 1`,`CSS Logo 1`,`Firebase 1`,`HTML Logo 1`,`Javascript Logo 1`,`SQL 1`,`Sass_Logo_Color 1`,`angular-icon 2`,`atom icon`,`cloud`,`cloud-server`,`code`,`django Icon 1`,`figma-icon`,`git icon 1`,`python`,`vetur icon`],l=[{id:`nature`,label:`Natur & Tiere`,description:`Grüntöne, Wald- und Tier-Motive`,cssClass:`layout-nature`,pairs:o},{id:`space`,label:`Weltraum`,description:`Dunkelblau/Violett, Kosmos-Motive`,cssClass:`layout-space`,pairs:s}];function u(e){return e===`blue`?{player1:`blue`,player2:`orange`}:{player1:`orange`,player2:`blue`}}function d(e){let t=i.find(t=>t.id===e);if(!t)throw Error(`Unbekannte Spielfeldgröße: ${e}`);return t}function f(e){let t=l.find(t=>t.id===e);if(!t)throw Error(`Unbekanntes Layout: ${e}`);return t}function p(e){switch(e.visualThemeId){case`code-vibes`:return c;case`gaming`:return s;case`da-projects`:case`foods`:return f(e.layoutId).pairs;default:return e.visualThemeId}}function ee(e){let t=a.find(t=>t.id===e);if(!t)throw Error(`Unbekanntes Theme: ${e}`);return t}function m(e){return e.cols*e.rows/2}function h(e){let t=document.createElement(`div`);return t.textContent=e,t.innerHTML}function g(e){let t=[...e];for(let e=t.length-1;e>0;--e){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function te(e,t){let n=[],r=0;for(let i=0;i<t;i+=1){let t=e[i];n.push({id:r++,pairId:i,symbol:t}),n.push({id:r++,pairId:i,symbol:t})}return n}function ne(e){let t=m(d(e.boardSizeId)),n=p(e).slice(0,t);if(n.length<t)throw Error(`Nicht genügend Symbole für die gewählte Spielfeldgröße.`);return g(te(n,t))}var _=class{cards;revealed;matched;scores;currentPlayer;firstSelection=null;secondSelection=null;busy=!1;complete=!1;constructor(e){let t=ne(e);this.cards=t,this.revealed=t.map(()=>!1),this.matched=t.map(()=>!1),this.scores=[0,0],this.currentPlayer=0}getSnapshot(){return this.createSnapshot()}createSnapshot(){return{cards:this.cards,revealed:this.revealed,matched:this.matched,scores:this.scores,currentPlayer:this.currentPlayer,firstSelection:this.firstSelection,secondSelection:this.secondSelection,isBusy:this.busy,isComplete:this.complete}}isFaceVisible(e){return this.revealed[e]||this.matched[e]}hasPendingSecondPick(){return this.firstSelection!==null&&this.secondSelection!==null}canSelect(e){return this.busy||this.complete||this.matched[e]||this.hasPendingSecondPick()?!1:this.firstSelection!==e}clearSelection(){this.firstSelection=null,this.secondSelection=null}isPairMatch(e,t){return this.cards[e].pairId===this.cards[t].pairId}switchPlayer(){this.currentPlayer=this.currentPlayer===0?1:0}markPairMatched(e,t){this.matched[e]=!0,this.matched[t]=!0,this.scores[this.currentPlayer]+=1}applyMatch(e,t,n,r){this.markPairMatched(e,t),this.clearSelection(),this.busy=!1,this.matched.every(Boolean)&&(this.complete=!0),n(),this.complete&&r()}applyMismatch(e,t,n){this.revealed[e]=!1,this.revealed[t]=!1,this.clearSelection(),this.switchPlayer(),this.busy=!1,n()}resolveFlip(e,t,n,r){this.isPairMatch(e,t)?this.applyMatch(e,t,n,r):this.applyMismatch(e,t,n)}scheduleFlipResolution(e,t,n,r){window.setTimeout(()=>{this.resolveFlip(e,t,n,r)},700)}openSecondPick(e,t,n){this.secondSelection=e,this.busy=!0,t();let r=this.firstSelection,i=this.secondSelection;r===null||i===null||this.scheduleFlipResolution(r,i,t,n)}selectCard(e,t,n){if(this.canSelect(e)){if(this.revealed[e]=!0,this.firstSelection===null){this.firstSelection=e,t();return}this.openSecondPick(e,t,n)}}};function re(e){let[t,n]=e;return t>n?`player1`:n>t?`player2`:`draw`}var ie=`<dialog class="modal modal--game-over modal--game-over--code-vibes" open aria-labelledby="game-over-cv-title" aria-modal="true">\r
  <div class="modal--game-over-cv">\r
    <h2 id="game-over-cv-title" class="visually-hidden">Game over</h2>\r
    <div class="modal--game-over-cv__main">\r
    <img\r
      class="modal--game-over-cv__hero"\r
      src="{{GAME_OVER_SVG}}"\r
      alt=""\r
      width="991"\r
      height="125"\r
      decoding="async"\r
    />\r
    <div class="modal--game-over-cv__stack">\r
      <p class="modal--game-over-cv__final-label">Final score</p>\r
      {{DRAW_BANNER}}\r
      <div class="modal--game-over-cv__scores-row" role="group" aria-label="Endergebnis">\r
        <div class="modal--game-over-cv__group modal--game-over-cv__group--blue">\r
          <span class="modal--game-over-cv__identity">\r
            <img class="modal--game-over-cv__label-icon" src="{{LABEL_BLUE}}" alt="" width="24" height="20" decoding="async" />\r
            <span class="modal--game-over-cv__player-name modal--game-over-cv__player-name--blue">Blue</span>\r
          </span>\r
          <span class="modal--game-over-cv__score modal--game-over-cv__score--blue">{{BLUE_SCORE}}</span>\r
        </div>\r
        <div class="modal--game-over-cv__group modal--game-over-cv__group--orange">\r
          <span class="modal--game-over-cv__identity">\r
            <img class="modal--game-over-cv__label-icon" src="{{LABEL_ORANGE}}" alt="" width="24" height="20" decoding="async" />\r
            <span class="modal--game-over-cv__player-name modal--game-over-cv__player-name--orange">Orange</span>\r
          </span>\r
          <span class="modal--game-over-cv__score modal--game-over-cv__score--orange">{{ORANGE_SCORE}}</span>\r
        </div>\r
      </div>\r
    </div>\r
    </div>\r
    <div class="modal--game-over-cv__actions modal__actions">\r
      <button type="button" class="btn btn--primary btn--large" data-action="new-round">Neue Runde</button>\r
      <button type="button" class="btn btn--ghost btn--large" data-action="go-settings-from-game">Back to start</button>\r
    </div>\r
  </div>\r
</dialog>\r
`,v=`<dialog class="modal" open aria-labelledby="game-over-title" aria-modal="true">\r
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
`;function y(e,t){let n=e;for(let[e,r]of Object.entries(t))n=n.replaceAll(`{{${e}}}`,r);return n}var b=``+new URL(`game over-eByvElGb.svg`,import.meta.url).href,x=`data:image/svg+xml,%3csvg%20width='24'%20height='20'%20viewBox='0%200%2024%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M2.46154%2020C1.78462%2020%201.20513%2019.7552%200.723077%2019.2656C0.241026%2018.776%200%2018.1875%200%2017.5V2.5C0%201.8125%200.241026%201.22396%200.723077%200.734375C1.20513%200.244792%201.78462%200%202.46154%200H16C16.3897%200%2016.759%200.0885417%2017.1077%200.265625C17.4564%200.442708%2017.7436%200.6875%2017.9692%201L23.5077%208.5C23.8359%208.9375%2024%209.4375%2024%2010C24%2010.5625%2023.8359%2011.0625%2023.5077%2011.5L17.9692%2019C17.7436%2019.3125%2017.4564%2019.5573%2017.1077%2019.7344C16.759%2019.9115%2016.3897%2020%2016%2020H2.46154Z'%20fill='%232BB1FF'/%3e%3c/svg%3e`,S=`data:image/svg+xml,%3csvg%20width='24'%20height='20'%20viewBox='0%200%2024%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M2.46154%2020C1.78462%2020%201.20513%2019.7552%200.723077%2019.2656C0.241026%2018.776%200%2018.1875%200%2017.5V2.5C0%201.8125%200.241026%201.22396%200.723077%200.734375C1.20513%200.244792%201.78462%200%202.46154%200H16C16.3897%200%2016.759%200.0885417%2017.1077%200.265625C17.4564%200.442708%2017.7436%200.6875%2017.9692%201L23.5077%208.5C23.8359%208.9375%2024%209.4375%2024%2010C24%2010.5625%2023.8359%2011.0625%2023.5077%2011.5L17.9692%2019C17.7436%2019.3125%2017.4564%2019.5573%2017.1077%2019.7344C16.759%2019.9115%2016.3897%2020%2016%2020H2.46154Z'%20fill='%23F58E39'/%3e%3c/svg%3e`;function C(e,t,n){return`Spieler 1: <span class="player-tag player-tag--${n.player1}">${e}</span> · Spieler 2: <span class="player-tag player-tag--${n.player2}">${t}</span>`}function ae(e){return e===`draw`?`Unentschieden!`:e===`player1`?`Spieler 1 gewinnt!`:`Spieler 2 gewinnt!`}function oe(e){return e===`draw`?``:` modal__winner--highlight`}function w(e,t,n){return{blue:n.player1===`blue`?e:t,orange:n.player1===`orange`?e:t}}function T(e,t,n){let{blue:r,orange:i}=w(e,t,n);return i>r}function E(e,t,n){let{blue:r,orange:i}=w(e,t,n);return r>i}function se(e,t,n){let{blue:r,orange:i}=w(e,t,n);return y(ie,{GAME_OVER_SVG:b,LABEL_BLUE:x,LABEL_ORANGE:S,BLUE_SCORE:String(r),ORANGE_SCORE:String(i),DRAW_BANNER:r===i?`<p class="modal--game-over-cv__draw">Draw / Unentschieden</p>`:``})}function ce(e,t,n,r){if(r===`code-vibes`)return se(e,t,n);let i=re([e,t]),a=ae(i);return y(v,{SCORE_LINE:C(e,t,n),WINNER_MODIFIER:oe(i),MESSAGE:h(a)})}var D=null;function O(){D!==null&&(clearTimeout(D),D=null)}function k(e,t){D=setTimeout(()=>{if(D=null,r.view!==`game`||r.game===null||!r.showGameOver)return;let n=r.game.getSnapshot();if(!n.isComplete)return;let i=u(r.settings.firstPlayerColor),a=n.scores;if(t===`orange`){if(!T(a[0],a[1],i))return;r.showCodeVibesWinnerOrange=!0,r.showCodeVibesWinnerBlue=!1}else{if(!E(a[0],a[1],i))return;r.showCodeVibesWinnerBlue=!0,r.showCodeVibesWinnerOrange=!1}e()},3e3)}function A(e){if(O(),r.settings.visualThemeId!==`code-vibes`||r.game===null)return;let t=r.game.getSnapshot();if(!t.isComplete)return;let n=u(r.settings.firstPlayerColor),{scores:i}=t;if(T(i[0],i[1],n)){k(e,`orange`);return}E(i[0],i[1],n)&&k(e,`blue`)}function j(e,t){return e.querySelector(`input[name="${t}"]:checked`)?.value??null}function M(e){let t=j(e,`boardSize`);if(t!==null){let e=t.trim();r.settingsDraft.boardSizeId=e}}function N(e){let t=j(e,`playerColor`);t!==null&&(r.settingsDraft.firstPlayerColor=t)}function P(e){let t=j(e,`visualTheme`);t!==null&&(r.settingsDraft.visualThemeId=t)}function F(e){M(e),N(e),P(e)}function I(e,t,n){e.querySelectorAll(`[data-action="${t}"]`).forEach(e=>{e.addEventListener(`click`,n)})}function L(e){r.view=`settings`,r.settingsDraft=n(),e()}function R(e){r.view=`home`,e()}function z(e,n){F(e),r.settings={...t,...r.settingsDraft.visualThemeId?{visualThemeId:r.settingsDraft.visualThemeId}:{},...r.settingsDraft.firstPlayerColor?{firstPlayerColor:r.settingsDraft.firstPlayerColor}:{},...r.settingsDraft.boardSizeId?{boardSizeId:r.settingsDraft.boardSizeId}:{}},r.game=new _(r.settings),r.showGameOver=!1,r.showCodeVibesWinnerOrange=!1,r.showCodeVibesWinnerBlue=!1,O(),r.showExitConfirm=!1,r.view=`game`,n()}function B(e){r.game=null,r.showGameOver=!1,r.showCodeVibesWinnerOrange=!1,r.showCodeVibesWinnerBlue=!1,O(),r.showExitConfirm=!1,r.view=`settings`,r.settingsDraft=n(),e()}function V(e){r.game=new _(r.settings),r.showGameOver=!1,r.showCodeVibesWinnerOrange=!1,r.showCodeVibesWinnerBlue=!1,O(),r.showExitConfirm=!1,e()}function H(e){r.showExitConfirm=!0,e()}function U(e){r.showExitConfirm=!1,e()}function W(e,t){let n=e.currentTarget;if(n.getAttribute(`aria-disabled`)===`true`)return;let i=Number(n.dataset.cardIndex),a=r.game;a===null||Number.isNaN(i)||a.selectCard(i,()=>t(),()=>{r.showGameOver=!0,r.showCodeVibesWinnerOrange=!1,r.showCodeVibesWinnerBlue=!1,A(t),t()})}function G(e,t){e.querySelectorAll(`.memory-card[data-card-index]`).forEach(e=>{e.addEventListener(`click`,e=>W(e,t)),e.addEventListener(`keydown`,e=>{let n=e;n.key!==`Enter`&&n.key!==` `||n.currentTarget.getAttribute(`aria-disabled`)!==`true`&&(n.preventDefault(),W(n,t))})})}function le(e,t){let n=e.querySelector(`.screen--settings`);n!==null&&n.querySelectorAll(`input[type="radio"]`).forEach(n=>{n.addEventListener(`change`,()=>{F(e),t()})})}function ue(e,t){I(e,`go-settings`,()=>L(t)),I(e,`go-home`,()=>R(t)),I(e,`start-game`,()=>z(e,t)),I(e,`exit-game`,()=>H(t)),I(e,`dismiss-exit-confirm`,()=>U(t)),I(e,`confirm-exit-game`,()=>B(t)),I(e,`new-round`,()=>V(t)),I(e,`go-settings-from-game`,()=>B(t)),G(e,t),le(e,t)}var de=`app-root`;function fe(e,t,n){if(e.className=``,e.classList.add(de),e.classList.add(`theme--${t.visualThemeId}`),n===`settings`){e.classList.add(`app-root--settings`);return}e.classList.add(f(t.layoutId).cssClass)}var pe=`data:image/svg+xml,%3csvg%20width='11'%20height='9'%20viewBox='0%200%2011%209'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8.575%205H3C2.85833%205%202.73958%204.95208%202.64375%204.85625C2.54792%204.76042%202.5%204.64167%202.5%204.5C2.5%204.35833%202.54792%204.23958%202.64375%204.14375C2.73958%204.04792%202.85833%204%203%204H8.575L8.15%203.575C8.05%203.475%208.00208%203.35833%208.00625%203.225C8.01042%203.09167%208.05833%202.975%208.15%202.875C8.25%202.775%208.36875%202.72292%208.50625%202.71875C8.64375%202.71458%208.7625%202.7625%208.8625%202.8625L10.15%204.15C10.25%204.25%2010.3%204.36667%2010.3%204.5C10.3%204.63333%2010.25%204.75%2010.15%204.85L8.8625%206.1375C8.7625%206.2375%208.64375%206.28542%208.50625%206.28125C8.36875%206.27708%208.25%206.225%208.15%206.125C8.05833%206.025%208.01042%205.90833%208.00625%205.775C8.00208%205.64167%208.05%205.525%208.15%205.425L8.575%205ZM6%202.5V1H1V8H6V6.5C6%206.35833%206.04792%206.23958%206.14375%206.14375C6.23958%206.04792%206.35833%206%206.5%206C6.64167%206%206.76042%206.04792%206.85625%206.14375C6.95208%206.23958%207%206.35833%207%206.5V8C7%208.275%206.90208%208.51042%206.70625%208.70625C6.51042%208.90208%206.275%209%206%209H1C0.725%209%200.489583%208.90208%200.29375%208.70625C0.0979167%208.51042%200%208.275%200%208V1C0%200.725%200.0979167%200.489583%200.29375%200.29375C0.489583%200.0979167%200.725%200%201%200H6C6.275%200%206.51042%200.0979167%206.70625%200.29375C6.90208%200.489583%207%200.725%207%201V2.5C7%202.64167%206.95208%202.76042%206.85625%202.85625C6.76042%202.95208%206.64167%203%206.5%203C6.35833%203%206.23958%202.95208%206.14375%202.85625C6.04792%202.76042%206%202.64167%206%202.5Z'%20fill='white'/%3e%3c/svg%3e`,K=0;function q(e,t,n){return`<div class="game-bar__pair">
            <span class="game-bar__score-label">${e}</span>
            <span class="game-bar__score-value"><span class="${n}">${t}</span></span>
          </div>`}function me(e,t){let n=`score score--p1 player-tag player-tag--${t.player1}`,r=`score score--p2 player-tag player-tag--${t.player2}`;return`<div class="game-bar__scores-panel">
            <div class="game-bar__scores" role="group" aria-label="Punktestände">${`${q(`Spieler 1`,e.scores[0],n)}${q(`Spieler 2`,e.scores[1],r)}`}</div>
          </div>`}function he(e,t){return`<div class="game-bar__scores-panel game-bar__scores-panel--code-vibes">
            <div class="game-bar__scores game-bar__scores--code-vibes" role="group" aria-label="Punktestände">
              <div class="game-bar__pair game-bar__pair--code-vibes">
                <img class="game-bar__label-icon" src="${x}" alt="" width="24" height="20" decoding="async" />
                <span class="game-bar__player-name">Blue</span>
                <span class="game-bar__score-num game-bar__score-num--blue">${t.player1===`blue`?e.scores[0]:e.scores[1]}</span>
              </div>
              <div class="game-bar__pair game-bar__pair--code-vibes">
                <img class="game-bar__label-icon" src="${S}" alt="" width="24" height="20" decoding="async" />
                <span class="game-bar__player-name">Orange</span>
                <span class="game-bar__score-num game-bar__score-num--orange">${t.player1===`orange`?e.scores[0]:e.scores[1]}</span>
              </div>
            </div>
          </div>`}function ge(e,t){return e.currentPlayer===K?`player-tag--${t.player1}`:`player-tag--${t.player2}`}function _e(e,t){return(e.currentPlayer===K?t.player1:t.player2)===`blue`?`Blue`:`Orange`}function ve(e,t){return(e.currentPlayer===K?t.player1:t.player2)===`blue`?x:S}function ye(e){return e.currentPlayer===K?`Spieler 1`:`Spieler 2`}function be(e,t,n){return n===`code-vibes`?`<p class="game-bar__turn game-bar__turn--code-vibes" role="status" aria-live="polite">
              <span class="game-bar__turn-prefix">Current player:</span>
              <img class="game-bar__turn-current-label" src="${ve(e,t)}" alt="" width="24" height="20" decoding="async" />
              <span class="visually-hidden">${_e(e,t)}</span>
            </p>`:`<p class="game-bar__turn">Am Zug: <strong class="player-tag ${ge(e,t)}">${ye(e)}</strong></p>`}function xe(){return`<nav class="game-bar__nav" aria-label="Spielaktionen">
            <button type="button" class="btn btn--game-exit" data-action="exit-game">
              <img class="btn--game-exit__icon" src="${pe}" alt="" width="30" height="30" decoding="async" />
              <span class="btn--game-exit__label">Exit game</span>
            </button>
          </nav>`}function Se(e,t,n){return`${n===`code-vibes`?he(e,t):me(e,t)}${be(e,t,n)}${xe()}`}var Ce=`data:image/svg+xml,%3csvg%20width='66'%20height='70'%20viewBox='0%200%2066%2070'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_8807_3780)'%3e%3cpath%20d='M0.0263672%2011.7153L32.4604%200.179443L65.7679%2011.5102L60.3749%2054.3466L32.4604%2069.779L4.98269%2054.5517L0.0263672%2011.7153Z'%20fill='%23E23237'/%3e%3cpath%20d='M65.768%2011.5102L32.4604%200.179443V69.779L60.3749%2054.3723L65.768%2011.5102Z'%20fill='%23B52E31'/%3e%3cpath%20d='M32.5119%208.30591L12.3018%2053.1931L19.8516%2053.065L23.9092%2042.9389H42.0394L46.4822%2053.1931L53.6982%2053.3213L32.5119%208.30591ZM32.5635%2022.6873L39.3943%2036.9403H26.5541L32.5635%2022.6873Z'%20fill='white'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_8807_3780'%3e%3crect%20width='66'%20height='70'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e`,we=`data:image/svg+xml,%3csvg%20width='70'%20height='56'%20viewBox='0%200%2070%2056'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_8807_3681)'%3e%3cmask%20id='mask0_8807_3681'%20style='mask-type:luminance'%20maskUnits='userSpaceOnUse'%20x='0'%20y='0'%20width='70'%20height='56'%3e%3cpath%20d='M70%200H0V56H70V0Z'%20fill='white'/%3e%3c/mask%3e%3cg%20mask='url(%23mask0_8807_3681)'%3e%3cpath%20d='M35.3173%2016.9478H29.1089V25.7066H34.3274C36.3628%2025.7066%2037.9315%2025.295%2038.9895%2024.5251C40.0444%2023.7574%2040.599%2022.6283%2040.599%2021.1723C40.599%2019.807%2040.1216%2018.7549%2039.2293%2018.0423C38.3347%2017.3277%2037.0145%2016.9478%2035.3173%2016.9478Z'%20fill='url(%23paint0_linear_8807_3681)'/%3e%3cpath%20d='M29.1089%2039.0405H35.549C37.6689%2039.0405%2039.2789%2038.6134%2040.3576%2037.7952C41.4329%2036.9796%2041.9892%2035.7682%2041.9892%2034.1761C41.9892%2032.5847%2041.418%2031.3894%2040.301%2030.5889C39.1803%2029.7854%2037.5013%2029.3735%2035.2752%2029.3735H29.1089V39.0405Z'%20fill='url(%23paint1_linear_8807_3681)'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M14.539%200C10.5448%200%207.58995%203.51098%207.72201%207.31843C7.84889%2010.9759%207.68414%2015.7136%206.49632%2019.5766C5.30496%2023.4517%203.29069%2025.901%200%2026.2157V29.7843C3.29083%2030.099%205.30496%2032.5483%206.49632%2036.4234C7.68414%2040.2864%207.84889%2045.0241%207.72215%2048.6816C7.58995%2052.4891%2010.5448%2056%2014.539%2056H55.4662C59.4602%2056%2062.4151%2052.4891%2062.2831%2048.6816C62.1562%2045.0241%2062.3209%2040.2864%2063.5086%2036.4234C64.7002%2032.5483%2066.7093%2030.099%2070%2029.7843V26.2157C66.7093%2025.901%2064.7002%2023.4517%2063.5086%2019.5766C62.3209%2015.7136%2062.1562%2010.9759%2062.2831%207.31843C62.4151%203.51098%2059.4602%200%2055.4662%200H14.539ZM24.254%2013.0333H36.4547C39.1628%2013.0333%2041.4121%2013.7693%2042.9859%2015.077C44.5609%2016.3859%2045.4539%2018.2633%2045.4539%2020.5327C45.4539%2023.7037%2043.0801%2026.5448%2040.0407%2027.0718V27.1174C44.1661%2027.5965%2046.9493%2030.4826%2046.9493%2034.4649C46.9493%2037.1049%2045.9675%2039.2307%2044.1673%2040.6949C42.3692%2042.1578%2039.7614%2042.9549%2036.518%2042.9549H24.254V13.0333Z'%20fill='url(%23paint2_linear_8807_3681)'/%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_8807_3681'%20x1='10.4014'%20y1='1.482'%20x2='71.7544'%20y2='49.9938'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%239013FE'/%3e%3cstop%20offset='1'%20stop-color='%236610F2'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paint1_linear_8807_3681'%20x1='10.4014'%20y1='1.48207'%20x2='71.7544'%20y2='49.9938'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%239013FE'/%3e%3cstop%20offset='1'%20stop-color='%236610F2'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paint2_linear_8807_3681'%20x1='10.4014'%20y1='1.48208'%20x2='71.7545'%20y2='49.9939'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%239013FE'/%3e%3cstop%20offset='1'%20stop-color='%236610F2'/%3e%3c/linearGradient%3e%3cclipPath%20id='clip0_8807_3681'%3e%3crect%20width='70'%20height='56'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e`,Te=`data:image/svg+xml,%3csvg%20width='70'%20height='70'%20viewBox='0%200%2070%2070'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M9.75576%2063.0026L4.13867%200H65.8612L60.2381%2062.9926L34.9622%2070L9.75576%2063.0026Z'%20fill='%23264DE4'/%3e%3cpath%20d='M55.4241%2058.9816L60.2295%205.15137H35V64.644L55.4241%2058.9816Z'%20fill='%232965F1'/%3e%3cpath%20d='M17.0162%2028.5181L17.7087%2036.245H35.0002V28.5181H17.0162ZM16.327%2020.6055H35.0002V12.8784H15.6245L16.327%2020.6055ZM35.0002%2048.5859L34.9663%2048.595L26.3606%2046.2713L25.8106%2040.1086H18.0537L19.1364%2052.2411L34.9646%2056.6353L35.0002%2056.6253V48.5859Z'%20fill='%23EBEBEB'/%3e%3cpath%20d='M34.9731%2028.5181V36.245H44.4881L43.5912%2046.2664L34.9731%2048.5924V56.6314L50.8139%2052.2411L50.9301%2050.9356L52.7458%2030.5929L52.9344%2028.5181L54.3294%2012.8784H34.9731V20.6055H45.8613L45.158%2028.5181H34.9731Z'%20fill='white'/%3e%3c/svg%3e`,Ee=`data:image/svg+xml,%3csvg%20width='53'%20height='70'%20viewBox='0%200%2053%2070'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_8807_3766)'%3e%3cpath%20d='M0.0273438%2056.4789L8.72537%201.34634C8.8317%200.670184%209.36256%200.137167%2010.0437%200.0225526C10.7247%20-0.0920623%2011.4034%200.237682%2011.7291%200.841145L20.7244%2017.4605L24.3099%2010.6981C24.5876%2010.1753%2025.135%209.84785%2025.7315%209.84785C26.328%209.84785%2026.8754%2010.1753%2027.1531%2010.6981L51.428%2056.4789H0.0273438Z'%20fill='%23FFA000'/%3e%3cpath%20d='M30.0768%2035.0023L20.7202%2017.4521L0.0273438%2056.4786L30.0768%2035.0023Z'%20fill='%23F57C00'/%3e%3cpath%20d='M51.4284%2056.4789L44.7663%2015.6425C44.6657%2015.0561%2044.2432%2014.5744%2043.6711%2014.3928C43.0988%2014.2112%2042.4726%2014.3623%2042.0477%2014.7828L0.0273438%2056.4783L23.2782%2069.3943C24.7384%2070.2018%2026.5165%2070.2018%2027.9766%2069.3943L51.4284%2056.4789Z'%20fill='%23FFCA28'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_8807_3766'%3e%3crect%20width='53'%20height='70'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e`,De=`data:image/svg+xml,%3csvg%20width='70'%20height='70'%20viewBox='0%200%2070%2070'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_8807_57)'%3e%3cpath%20d='M65.951%200.233643L60.3644%2062.8188L35.252%2069.7806L10.2088%2062.8284L4.62793%200.233643H65.951Z'%20fill='%23E44D26'/%3e%3cpath%20d='M35.2891%2064.4591L55.5811%2058.8335L60.3551%205.35156H35.2891V64.4591Z'%20fill='%23F16529'/%3e%3cpath%20d='M24.429%2020.706H35.2893V13.0291H16.0391L16.2227%2015.0886L18.1097%2036.2444H35.2893V28.5674H25.1307L24.429%2020.706ZM26.1593%2040.083H18.4527L19.5282%2052.1371L35.254%2056.5023L35.2893%2056.4927V48.5054L35.2557%2048.5143L26.7059%2046.2057L26.1593%2040.083Z'%20fill='%23EBEBEB'/%3e%3cpath%20d='M35.2629%2036.2444H44.7163L43.825%2046.2009L35.2627%2048.5119V56.4987L51.001%2052.1371L51.1164%2050.84L52.9207%2030.6289L53.108%2028.5674H35.2629V36.2444ZM35.2629%2020.6873V20.706H53.8065L53.9603%2018.9806L54.3103%2015.0886L54.4937%2013.0291H35.2629V20.6873Z'%20fill='white'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_8807_57'%3e%3crect%20width='70'%20height='70'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e`,Oe=`data:image/svg+xml,%3csvg%20width='70'%20height='70'%20viewBox='0%200%2070%2070'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_8807_2930)'%3e%3cpath%20d='M0%200H70V70H0V0Z'%20fill='%23F7DF1E'/%3e%3cpath%20d='M18.4055%2058.4969L23.7622%2055.2551C24.7958%2057.0874%2025.7359%2058.6378%2027.9909%2058.6378C30.1524%2058.6378%2031.5155%2057.7923%2031.5155%2054.5034V32.1367H38.0936V54.5964C38.0936%2061.4096%2034.0998%2064.5109%2028.2728%2064.5109C23.0105%2064.5109%2019.9559%2061.7856%2018.4053%2058.4964M41.6666%2057.792L47.0227%2054.691C48.4328%2056.9936%2050.2654%2058.6851%2053.5073%2058.6851C56.2332%2058.6851%2057.9711%2057.3223%2057.9711%2055.4426C57.9711%2053.1873%2056.1856%2052.3883%2053.1783%2051.0731L51.5341%2050.3676C46.7881%2048.3478%2043.64%2045.8103%2043.64%2040.4536C43.64%2035.5197%2047.3989%2031.7605%2053.2727%2031.7605C57.4546%2031.7605%2060.4619%2033.2174%2062.6231%2037.0233L57.5011%2040.3128C56.3732%2038.2924%2055.152%2037.4937%2053.2724%2037.4937C51.3457%2037.4937%2050.124%2038.7154%2050.124%2040.3128C50.124%2042.2862%2051.3457%2043.0855%2054.1649%2044.3072L55.8093%2045.0118C61.4011%2047.4085%2064.5492%2049.8517%2064.5492%2055.3489C64.5492%2061.2699%2059.8975%2064.5117%2053.6481%2064.5117C47.5398%2064.5117%2043.5927%2061.5985%2041.6663%2057.7923'%20fill='black'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_8807_2930'%3e%3crect%20width='70'%20height='70'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e`,ke=``+new URL(`SQL 1-CHntwSWA.svg`,import.meta.url).href,Ae=``+new URL(`Sass_Logo_Color 1-CQUGLBTi.svg`,import.meta.url).href,je=`data:image/svg+xml,%3csvg%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'%3e%3cg%20clip-path='url(%23prefix__clip0_9_19)'%3e%3cmask%20id='prefix__a'%20style='mask-type:luminance'%20maskUnits='userSpaceOnUse'%20x='14'%20y='0'%20width='484'%20height='512'%3e%3cpath%20d='M14%200h484v512H14V0z'%20fill='%23fff'/%3e%3c/mask%3e%3cg%20mask='url(%23prefix__a)'%3e%3cmask%20id='prefix__b'%20style='mask-type:luminance'%20maskUnits='userSpaceOnUse'%20x='14'%20y='0'%20width='484'%20height='512'%3e%3cpath%20d='M14%200h484v512H14V0z'%20fill='%23fff'/%3e%3c/mask%3e%3cg%20mask='url(%23prefix__b)'%3e%3cpath%20d='M496%2086l-18%20272L312%200l184%2086zM380%20438l-124%2072-126-72%2024-62h202l24%2062zM256%20136l64%20160H190l66-160zM32%20358L14%2086%20198%200%2032%20358z'%20fill='url(%23prefix__paint0_linear_9_19)'/%3e%3cpath%20d='M496%2086l-18%20272L312%200l184%2086zM380%20438l-124%2072-126-72%2024-62h202l24%2062zM256%20136l64%20160H190l66-160zM32%20358L14%2086%20198%200%2032%20358z'%20fill='url(%23prefix__paint1_linear_9_19)'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3clinearGradient%20id='prefix__paint0_linear_9_19'%20x1='120.4'%20y1='463.8'%20x2='504'%20y2='281.4'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23E40035'/%3e%3cstop%20offset='.2'%20stop-color='%23F60A48'/%3e%3cstop%20offset='.4'%20stop-color='%23F20755'/%3e%3cstop%20offset='.5'%20stop-color='%23DC087D'/%3e%3cstop%20offset='.7'%20stop-color='%239717E7'/%3e%3cstop%20offset='1'%20stop-color='%236C00F5'/%3e%3c/linearGradient%3e%3clinearGradient%20id='prefix__paint1_linear_9_19'%20x1='103'%20y1='61.4'%20x2='354'%20y2='348'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23FF31D9'/%3e%3cstop%20offset='1'%20stop-color='%23FF5BE1'%20stop-opacity='0'/%3e%3c/linearGradient%3e%3cclipPath%20id='prefix__clip0_9_19'%3e%3cpath%20fill='%23fff'%20transform='translate(14)'%20d='M0%200h484v512H0z'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e`,Me=``+new URL(`atom icon-u0kteh79.svg`,import.meta.url).href,Ne=``+new URL(`cloud-server-2riKMd8l.svg`,import.meta.url).href,Pe=``+new URL(`cloud-Coa_9QQt.svg`,import.meta.url).href,Fe=``+new URL(`code--X85c2Nn.svg`,import.meta.url).href,Ie=`data:image/svg+xml,%3csvg%20width='55'%20height='70'%20viewBox='0%200%2055%2070'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_8807_2569)'%3e%3cpath%20d='M24.6606%200H36.1071V52.4286C30.244%2053.5369%2025.9278%2053.9729%2021.2577%2053.9729C7.2774%2053.9583%200%2047.7167%200%2035.7292C0%2024.1792%207.71934%2016.6833%2019.6814%2016.6833C21.5377%2016.6833%2022.9518%2016.8293%2024.6606%2017.2666V0ZM25.0617%2026.7149C23.7211%2026.2773%2022.6164%2026.1315%2021.2021%2026.1315C15.4127%2026.1315%2012.0686%2029.6606%2012.0686%2035.8453C12.0686%2041.8669%2015.2655%2045.1918%2021.1286%2045.1918C22.3953%2045.1918%2023.4266%2045.1205%2025.0617%2044.9017V26.7149Z'%20fill='%232BA977'/%3e%3cpath%20d='M54.8255%2018.0909V44.3411C54.8255%2053.3812%2054.1479%2057.7285%2052.1591%2061.4766C50.3028%2065.08%2047.8575%2067.3522%2042.8046%2069.8618L32.1831%2064.8599C37.236%2062.5132%2039.6814%2060.4396%2041.2431%2057.2751C42.878%2054.0391%2043.3937%2050.291%2043.3937%2040.4327V18.0911L54.8255%2018.0909ZM42.2402%200H53.6866V11.623H42.2402V0Z'%20fill='%232BA977'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_8807_2569'%3e%3crect%20width='55'%20height='70'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e`,Le=`data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20shape-rendering='geometricPrecision'%20text-rendering='geometricPrecision'%20image-rendering='optimizeQuality'%20fill-rule='evenodd'%20clip-rule='evenodd'%20viewBox='0%200%20346%20512.36'%3e%3cg%20fill-rule='nonzero'%3e%3cpath%20fill='%2300B6FF'%20d='M172.53%20246.9c0-42.04%2034.09-76.11%2076.12-76.11h11.01c.3.01.63-.01.94-.01%2047.16%200%2085.4%2038.25%2085.4%2085.4%200%2047.15-38.24%2085.39-85.4%2085.39-.31%200-.64-.01-.95-.01l-11%20.01c-42.03%200-76.12-34.09-76.12-76.12V246.9z'/%3e%3cpath%20fill='%2324CB71'%20d='M0%20426.98c0-47.16%2038.24-85.41%2085.4-85.41l87.13.01v84.52c0%2047.65-39.06%2086.26-86.71%2086.26C38.67%20512.36%200%20474.13%200%20426.98z'/%3e%3cpath%20fill='%23FF7237'%20d='M172.53.01v170.78h87.13c.3-.01.63.01.94.01%2047.16%200%2085.4-38.25%2085.4-85.4C346%2038.24%20307.76%200%20260.6%200c-.31%200-.64.01-.95.01h-87.12z'/%3e%3cpath%20fill='%23FF3737'%20d='M0%2085.39c0%2047.16%2038.24%2085.4%2085.4%2085.4h87.13V.01H85.39C38.24.01%200%2038.24%200%2085.39z'/%3e%3cpath%20fill='%23874FFF'%20d='M0%20256.18c0%2047.16%2038.24%2085.4%2085.4%2085.4h87.13V170.8H85.39C38.24%20170.8%200%20209.03%200%20256.18z'/%3e%3c/g%3e%3c/svg%3e`,Re=`data:image/svg+xml,%3csvg%20width='70'%20height='70'%20viewBox='0%200%2070%2070'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_8807_1809)'%3e%3cpath%20d='M68.6798%2031.8813L38.1172%201.32033C36.3582%20-0.439785%2033.5035%20-0.439785%2031.7423%201.32033L25.3958%207.66682L33.4466%2015.7176C35.3175%2015.0854%2037.4628%2015.5096%2038.9542%2017.0009C40.4526%2018.5018%2040.8737%2020.6655%2040.2262%2022.5424L47.985%2030.3014C49.8621%2029.6547%2052.028%2030.0731%2053.5273%2031.5748C55.6227%2033.6694%2055.6227%2037.0641%2053.5273%2039.16C51.4314%2041.2562%2048.0367%2041.2562%2045.9397%2039.16C44.3636%2037.5822%2043.9742%2035.2676%2044.7721%2033.3259L37.5364%2026.0902L37.5356%2045.1316C38.0601%2045.3909%2038.5392%2045.7335%2038.9542%2046.146C41.0495%2048.2406%2041.0495%2051.6356%2038.9542%2053.7331C36.8583%2055.8282%2033.4619%2055.8282%2031.369%2053.7331C29.2737%2051.6356%2029.2737%2048.2408%2031.369%2046.1463C31.8712%2045.6439%2032.4679%2045.2461%2033.1248%2044.9757V25.7569C32.4669%2025.4884%2031.8699%2025.0903%2031.369%2024.5863C29.7814%2023.0009%2029.3997%2020.6715%2030.2132%2018.7222L22.277%2010.7851L1.3207%2031.74C-0.440234%2033.5017%20-0.440234%2036.3567%201.3207%2038.1171L31.8839%2068.6787C33.6435%2070.439%2036.4976%2070.439%2038.2594%2068.6787L68.6796%2038.259C70.44%2036.4981%2070.4402%2033.6415%2068.6798%2031.8813Z'%20fill='%23DE4C36'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_8807_1809'%3e%3crect%20width='70'%20height='70'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e`,ze=`data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M13.0164%202C10.8193%202%209.03825%203.72453%209.03825%205.85185V8.51852H15.9235V9.25926H5.97814C3.78107%209.25926%202%2010.9838%202%2013.1111L2%2018.8889C2%2021.0162%203.78107%2022.7407%205.97814%2022.7407H8.27322V19.4815C8.27322%2017.3542%2010.0543%2015.6296%2012.2514%2015.6296H19.5956C21.4547%2015.6296%2022.9617%2014.1704%2022.9617%2012.3704V5.85185C22.9617%203.72453%2021.1807%202%2018.9836%202H13.0164ZM12.0984%206.74074C12.8589%206.74074%2013.4754%206.14378%2013.4754%205.40741C13.4754%204.67103%2012.8589%204.07407%2012.0984%204.07407C11.3378%204.07407%2010.7213%204.67103%2010.7213%205.40741C10.7213%206.14378%2011.3378%206.74074%2012.0984%206.74074Z'%20fill='url(%23paint0_linear_87_8204)'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M18.9834%2030C21.1805%2030%2022.9616%2028.2755%2022.9616%2026.1482V23.4815L16.0763%2023.4815L16.0763%2022.7408L26.0217%2022.7408C28.2188%2022.7408%2029.9998%2021.0162%2029.9998%2018.8889V13.1111C29.9998%2010.9838%2028.2188%209.25928%2026.0217%209.25928L23.7266%209.25928V12.5185C23.7266%2014.6459%2021.9455%2016.3704%2019.7485%2016.3704L12.4042%2016.3704C10.5451%2016.3704%209.03809%2017.8296%209.03809%2019.6296L9.03809%2026.1482C9.03809%2028.2755%2010.8192%2030%2013.0162%2030H18.9834ZM19.9015%2025.2593C19.1409%2025.2593%2018.5244%2025.8562%2018.5244%2026.5926C18.5244%2027.329%2019.1409%2027.9259%2019.9015%2027.9259C20.662%2027.9259%2021.2785%2027.329%2021.2785%2026.5926C21.2785%2025.8562%2020.662%2025.2593%2019.9015%2025.2593Z'%20fill='url(%23paint1_linear_87_8204)'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_87_8204'%20x1='12.4809'%20y1='2'%20x2='12.4809'%20y2='22.7407'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23327EBD'/%3e%3cstop%20offset='1'%20stop-color='%231565A7'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paint1_linear_87_8204'%20x1='19.519'%20y1='9.25928'%20x2='19.519'%20y2='30'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23FFDA4B'/%3e%3cstop%20offset='1'%20stop-color='%23F9C600'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e`,Be=`data:image/svg+xml,%3csvg%20width='70'%20height='61'%20viewBox='0%200%2070%2061'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M43.0831%200L35.0013%2014L26.9169%200H0L35.0013%2060.6239L70%200H43.0831Z'%20fill='%232FB982'/%3e%3cpath%20d='M43.0797%200L34.9979%2014L26.9135%200H13.9966L34.9979%2036.3733L55.9966%200H43.0797Z'%20fill='%2334475F'/%3e%3c/svg%3e`,Ve=Object.assign({"./assets/img_code_vibes-theme/code-icons/Angular Icon 1.svg":Ce,"./assets/img_code_vibes-theme/code-icons/Bootstrap 1.svg":we,"./assets/img_code_vibes-theme/code-icons/CSS Logo 1.svg":Te,"./assets/img_code_vibes-theme/code-icons/Firebase 1.svg":Ee,"./assets/img_code_vibes-theme/code-icons/HTML Logo 1.svg":De,"./assets/img_code_vibes-theme/code-icons/Javascript Logo 1.svg":Oe,"./assets/img_code_vibes-theme/code-icons/SQL 1.svg":ke,"./assets/img_code_vibes-theme/code-icons/Sass_Logo_Color 1.svg":Ae,"./assets/img_code_vibes-theme/code-icons/angular-icon 2.svg":je,"./assets/img_code_vibes-theme/code-icons/atom icon.svg":Me,"./assets/img_code_vibes-theme/code-icons/cloud-server.svg":Ne,"./assets/img_code_vibes-theme/code-icons/cloud.svg":Pe,"./assets/img_code_vibes-theme/code-icons/code.svg":Fe,"./assets/img_code_vibes-theme/code-icons/django Icon 1.svg":Ie,"./assets/img_code_vibes-theme/code-icons/figma-icon.svg":Le,"./assets/img_code_vibes-theme/code-icons/git icon 1.svg":Re,"./assets/img_code_vibes-theme/code-icons/python.svg":ze,"./assets/img_code_vibes-theme/code-icons/vetur icon.svg":Be});function He(e){return(e.split(`/`).pop()??e).replace(/\.svg$/i,``)}var Ue=new Map(Object.entries(Ve).map(([e,t])=>[He(e),t]));function We(e){return Ue.get(e)}var Ge=``+new URL(`Code vibes card 1-BjgA6tlF.svg`,import.meta.url).href,Ke=``+new URL(`DA Projects card 19-CwaQDIys.svg`,import.meta.url).href,J=``+new URL(`Game card 28-B54RG0On.svg`,import.meta.url).href,qe=``+new URL(`food card 16-Bx7SKOkD.svg`,import.meta.url).href;function Je(e,t){return e.isBusy||e.isComplete||t?`aria-disabled="true" tabindex="-1"`:`tabindex="0"`}function Y(e,t,n){return`<span class="memory-card__face memory-card__face--back memory-card__face--back--illustrated" aria-hidden="true"><img class="memory-card__back-art" src="${e}" alt="" width="${t}" height="${n}" decoding="async" /></span>`}function Ye(e){return e===`code-vibes`?Y(Ge,120,120):e===`da-projects`?Y(Ke,120,100):e===`gaming`?Y(J,105,120):e===`foods`?Y(qe,122,122):`<span class="memory-card__face memory-card__face--back" aria-hidden="true">?</span>`}function Xe(e,t){if(t===`gaming`)return`<span class="memory-card__face memory-card__face--front memory-card__face--front--illustrated" aria-hidden="true"><img class="memory-card__front-art" src="${J}" alt="" width="105" height="120" decoding="async" /><span class="memory-card__symbol">${h(e)}</span></span>`;if(t===`code-vibes`){let t=We(e);if(t)return`<span class="memory-card__face memory-card__face--front memory-card__face--front--code-vibes-icon" aria-hidden="true"><img class="memory-card__front-icon" src="${t}" alt="" width="72" height="72" decoding="async" /></span>`}return`<span class="memory-card__face memory-card__face--front" aria-hidden="true">${h(e)}</span>`}function Ze(e,t){return`<span class="memory-card__inner">
            ${Ye(t)}
            ${Xe(e,t)}
          </span>`}function Qe(e,t,n,r){let i=e.isFaceVisible(n),a=t.matched[n],o=i?` is-flipped`:``,s=a?` is-matched`:``,c=Je(t,a),l=t.cards[n];return`<div role="button" class="memory-card${o}${s}" data-card-index="${n}" aria-label="Karte ${n+1}" ${c}>${Ze(l.symbol,r)}</div>`}var $e=`<dialog class="modal modal--exit-confirm" open aria-labelledby="exit-confirm-title" aria-modal="true">\r
  <div class="modal--exit-confirm__panel">\r
    <h2 id="exit-confirm-title" class="modal--exit-confirm__title">\r
      Are you sure you want to quit<br />\r
      the game?\r
    </h2>\r
    <div class="modal--exit-confirm__actions" role="group" aria-label="Bestätigung">\r
      <button type="button" class="btn btn--exit-back-to-game" data-action="dismiss-exit-confirm">Back to game</button>\r
      <button type="button" class="btn btn--exit-confirm-quit" data-action="confirm-exit-game">Exit game</button>\r
    </div>\r
  </div>\r
</dialog>\r
`;function et(){return $e}var tt=`<dialog class="modal modal--cv-winner-blue" open aria-labelledby="cv-winner-blue-title" aria-modal="true">
  <div class="modal--cv-winner-blue__wrap">
    <h2 id="cv-winner-blue-title" class="visually-hidden">Blue gewinnt</h2>
    <div class="modal--cv-winner-blue__scene">
      <img
        class="modal--cv-winner-blue__confetti"
        src="{{CONFETTI_SVG}}"
        alt=""
        width="1234"
        height="359"
        decoding="async"
      />
      <div class="modal--cv-winner-blue__column">
        <div class="modal--cv-winner-blue__headline">
          <img
            class="modal--cv-winner-blue__headline-img"
            src="{{WINNER_BLUE_SVG}}"
            alt=""
            width="426"
            height="133"
            decoding="async"
          />
        </div>
        <div class="modal--cv-winner-blue__pawn-row">
          <img
            class="modal--cv-winner-blue__pawn-img"
            src="{{PAWN_SVG}}"
            alt=""
            width="200"
            height="250"
            decoding="async"
          />
        </div>
        <button type="button" class="modal--cv-winner-blue__back-btn" data-action="go-settings-from-game">
          Back to start
        </button>
      </div>
    </div>
  </div>
</dialog>
`,X=``+new URL(`Confetti-B9jFdy6F.svg`,import.meta.url).href,nt=`data:image/svg+xml,%3csvg%20width='200'%20height='250'%20viewBox='0%200%20200%20250'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M25%20250C18.125%20250%2012.2396%20247.552%207.34375%20242.656C2.44792%20237.76%200%20231.875%200%20225V200.312C0%20196.146%200.9375%20192.292%202.8125%20188.75C4.6875%20185.208%207.1875%20182.188%2010.3125%20179.688C24.6875%20168.021%2035.4688%20156.25%2042.6562%20144.375C49.8438%20132.5%2054.8958%20121.875%2057.8125%20112.5H37.5C33.9583%20112.5%2030.9896%20111.302%2028.5938%20108.906C26.1979%20106.51%2025%20103.542%2025%20100C25%2096.4583%2026.1979%2093.4896%2028.5938%2091.0938C30.9896%2088.6979%2033.9583%2087.5%2037.5%2087.5H53.125C50.2083%2082.9167%2047.9167%2078.0208%2046.25%2072.8125C44.5833%2067.6042%2043.75%2062.0833%2043.75%2056.25C43.75%2040.625%2049.2188%2027.3438%2060.1562%2016.4062C71.0938%205.46875%2084.375%200%20100%200C115.625%200%20128.906%205.46875%20139.844%2016.4062C150.781%2027.3438%20156.25%2040.625%20156.25%2056.25C156.25%2062.0833%20155.417%2067.6042%20153.75%2072.8125C152.083%2078.0208%20149.792%2082.9167%20146.875%2087.5H162.5C166.042%2087.5%20169.01%2088.6979%20171.406%2091.0938C173.802%2093.4896%20175%2096.4583%20175%20100C175%20103.542%20173.802%20106.51%20171.406%20108.906C169.01%20111.302%20166.042%20112.5%20162.5%20112.5H142.188C145.104%20121.875%20150.156%20132.5%20157.344%20144.375C164.531%20156.25%20175.312%20168.021%20189.688%20179.688C192.812%20182.188%20195.312%20185.208%20197.188%20188.75C199.062%20192.292%20200%20196.146%20200%20200.312V225C200%20231.875%20197.552%20237.76%20192.656%20242.656C187.76%20247.552%20181.875%20250%20175%20250H25ZM25%20225H175V200C155.833%20185%20141.979%20169.531%20133.438%20153.594C124.896%20137.656%20119.167%20123.958%20116.25%20112.5H83.75C80.8333%20123.958%2075.1042%20137.656%2066.5625%20153.594C58.0208%20169.531%2044.1667%20185%2025%20200V225ZM100%2087.5C108.75%2087.5%20116.146%2084.4792%20122.188%2078.4375C128.229%2072.3958%20131.25%2065%20131.25%2056.25C131.25%2047.5%20128.229%2040.1042%20122.188%2034.0625C116.146%2028.0208%20108.75%2025%20100%2025C91.25%2025%2083.8542%2028.0208%2077.8125%2034.0625C71.7708%2040.1042%2068.75%2047.5%2068.75%2056.25C68.75%2065%2071.7708%2072.3958%2077.8125%2078.4375C83.8542%2084.4792%2091.25%2087.5%20100%2087.5Z'%20fill='%232BB1FF'/%3e%3c/svg%3e`,rt=``+new URL(`winner-blue-BnTO72wG.svg`,import.meta.url).href;function it(){return y(tt,{CONFETTI_SVG:X,WINNER_BLUE_SVG:rt,PAWN_SVG:nt})}var at=`<dialog class="modal modal--cv-winner-orange" open aria-labelledby="cv-winner-orange-title" aria-modal="true">
  <div class="modal--cv-winner-orange__wrap">
    <h2 id="cv-winner-orange-title" class="visually-hidden">Orange gewinnt</h2>
    <div class="modal--cv-winner-orange__scene">
      <img
        class="modal--cv-winner-orange__confetti"
        src="{{CONFETTI_SVG}}"
        alt=""
        width="1234"
        height="359"
        decoding="async"
      />
      <div class="modal--cv-winner-orange__column">
        <div class="modal--cv-winner-orange__headline">
          <img
            class="modal--cv-winner-orange__headline-img"
            src="{{WINNER_ORANGE_SVG}}"
            alt=""
            width="522"
            height="133"
            decoding="async"
          />
        </div>
        <div class="modal--cv-winner-orange__pawn-row">
          <img
            class="modal--cv-winner-orange__pawn-img"
            src="{{PAWN_SVG}}"
            alt=""
            width="200"
            height="250"
            decoding="async"
          />
        </div>
        <button type="button" class="modal--cv-winner-orange__back-btn" data-action="go-settings-from-game">
          Back to start
        </button>
      </div>
    </div>
  </div>
</dialog>
`,ot=`data:image/svg+xml,%3csvg%20width='200'%20height='250'%20viewBox='0%200%20200%20250'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M25%20250C18.125%20250%2012.2396%20247.552%207.34375%20242.656C2.44792%20237.76%200%20231.875%200%20225V200.312C0%20196.146%200.9375%20192.292%202.8125%20188.75C4.6875%20185.208%207.1875%20182.188%2010.3125%20179.688C24.6875%20168.021%2035.4688%20156.25%2042.6562%20144.375C49.8438%20132.5%2054.8958%20121.875%2057.8125%20112.5H37.5C33.9583%20112.5%2030.9896%20111.302%2028.5938%20108.906C26.1979%20106.51%2025%20103.542%2025%20100C25%2096.4583%2026.1979%2093.4896%2028.5938%2091.0938C30.9896%2088.6979%2033.9583%2087.5%2037.5%2087.5H53.125C50.2083%2082.9167%2047.9167%2078.0208%2046.25%2072.8125C44.5833%2067.6042%2043.75%2062.0833%2043.75%2056.25C43.75%2040.625%2049.2188%2027.3438%2060.1562%2016.4062C71.0938%205.46875%2084.375%200%20100%200C115.625%200%20128.906%205.46875%20139.844%2016.4062C150.781%2027.3438%20156.25%2040.625%20156.25%2056.25C156.25%2062.0833%20155.417%2067.6042%20153.75%2072.8125C152.083%2078.0208%20149.792%2082.9167%20146.875%2087.5H162.5C166.042%2087.5%20169.01%2088.6979%20171.406%2091.0938C173.802%2093.4896%20175%2096.4583%20175%20100C175%20103.542%20173.802%20106.51%20171.406%20108.906C169.01%20111.302%20166.042%20112.5%20162.5%20112.5H142.188C145.104%20121.875%20150.156%20132.5%20157.344%20144.375C164.531%20156.25%20175.312%20168.021%20189.688%20179.688C192.812%20182.188%20195.312%20185.208%20197.188%20188.75C199.062%20192.292%20200%20196.146%20200%20200.312V225C200%20231.875%20197.552%20237.76%20192.656%20242.656C187.76%20247.552%20181.875%20250%20175%20250H25ZM25%20225H175V200C155.833%20185%20141.979%20169.531%20133.438%20153.594C124.896%20137.656%20119.167%20123.958%20116.25%20112.5H83.75C80.8333%20123.958%2075.1042%20137.656%2066.5625%20153.594C58.0208%20169.531%2044.1667%20185%2025%20200V225ZM100%2087.5C108.75%2087.5%20116.146%2084.4792%20122.188%2078.4375C128.229%2072.3958%20131.25%2065%20131.25%2056.25C131.25%2047.5%20128.229%2040.1042%20122.188%2034.0625C116.146%2028.0208%20108.75%2025%20100%2025C91.25%2025%2083.8542%2028.0208%2077.8125%2034.0625C71.7708%2040.1042%2068.75%2047.5%2068.75%2056.25C68.75%2065%2071.7708%2072.3958%2077.8125%2078.4375C83.8542%2084.4792%2091.25%2087.5%20100%2087.5Z'%20fill='%23F58E39'/%3e%3c/svg%3e`,st=``+new URL(`winner-orange-Dkcrdw62.svg`,import.meta.url).href;function ct(){return y(at,{CONFETTI_SVG:X,WINNER_ORANGE_SVG:st,PAWN_SVG:ot})}var lt=`<main class="screen screen--game">
  <div class="game-playfield" style="{{GRID_STYLE}}">
    <header class="game-bar">{{GAME_BAR}}</header>
    <section class="memory-grid" role="grid" aria-label="Memory-Spielfeld">
      {{CARDS}}
    </section>
  </div>
  {{GAME_OVER}}
  {{EXIT_CONFIRM}}
</main>
`;function ut(e,t){return`--cols: ${e}; --rows: ${t};`}function dt(e,t,n){return t.cards.map((r,i)=>Qe(e,t,i,n.visualThemeId)).join(``)}function ft(e,t,n,r,i,a){return!e.isComplete||!t?``:a===`code-vibes`&&r?it():a===`code-vibes`&&n?ct():ce(e.scores[0],e.scores[1],i,a)}function pt(e){return i.find(t=>t.id===e.boardSizeId)??i[0]}function mt(e,t,n,r,i,a){let o=e.getSnapshot(),s=u(t.firstPlayerColor),c=pt(t);return y(lt,{GAME_BAR:Se(o,s,t.visualThemeId),GRID_STYLE:ut(c.cols,c.rows),CARDS:dt(e,o,t),GAME_OVER:ft(o,n,r,i,s,t.visualThemeId),EXIT_CONFIRM:a?et():``})}function ht(e,t,n,r,i,a){return e===null?`<main class="screen screen--game" role="alert">
  <div class="screen__content screen__content--wide">
    <p class="screen__subtitle">Es ist kein Spiel aktiv. Bitte über die Einstellungen eine neue Runde starten.</p>
    <nav class="screen__nav" aria-label="Navigation">
      <ul class="screen__nav-list">
        <li><button type="button" class="btn btn--primary" data-action="go-settings">Zu den Einstellungen</button></li>
      </ul>
    </nav>
  </div>
</main>`:mt(e,t,n,r,i,a)}var gt=``+new URL(`Primary button-CNXT5xaq.svg`,import.meta.url).href,_t=`<svg class="screen-home__deco-svg" aria-hidden="true" focusable="false" width="363" height="410" viewBox="0 0 363 410" fill="none" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
<path d="M-32.8453 227.361C-47.8534 215.879 -56.5724 200.711 -59.0024 181.859C-61.4323 163.007 -57.0806 145.786 -45.9472 130.197C-44.2308 127.954 -42.3893 125.806 -40.4227 123.754C-38.4561 121.702 -36.3645 119.745 -34.1478 117.884L93.4899 16.3584C107.29 5.57635 122.763 0.124242 139.908 0.0021104C157.053 -0.120019 172.504 5.08154 186.261 15.6068L332.59 127.557C346.347 138.082 355.41 151.635 359.776 168.215C364.143 184.794 362.928 201.154 356.132 217.295L291.528 367.045C290.312 369.672 288.985 372.312 287.549 374.968C286.112 377.623 284.536 380.072 282.819 382.316C271.186 397.522 255.876 406.26 236.889 408.53C217.903 410.8 200.781 406.098 185.523 394.425C175.017 386.387 167.359 376.182 162.55 363.809C157.741 351.435 156.709 338.79 159.454 325.872L165.54 296.147C166.197 292.698 165.751 289.393 164.203 286.233C162.656 283.073 160.506 280.44 157.755 278.335L86.4661 223.795C83.7146 221.69 80.6114 220.304 77.1565 219.637C73.7016 218.969 70.3952 219.404 67.2374 220.94L40.1395 234.59C28.3898 240.618 15.9147 242.929 2.71413 241.524C-10.4865 240.119 -22.3396 235.398 -32.8453 227.361ZM-8.8338 198.308C-4.08123 201.944 1.18717 203.999 6.97142 204.472C12.7557 204.945 18.2694 203.829 23.5127 201.122L50.3245 187.846C59.9887 182.988 70.1165 181.153 80.708 182.341C91.2994 183.528 100.847 187.375 109.352 193.881L180.64 248.421C189.145 254.928 195.308 263.199 199.129 273.236C202.95 283.273 204.001 293.561 202.281 304.102L196.481 333.453C195.24 339.222 195.604 344.835 197.574 350.294C199.544 355.753 202.905 360.301 207.658 363.937C214.662 369.295 222.429 371.582 230.96 370.798C239.491 370.014 246.552 366.227 252.142 359.439C251.951 359.688 253.513 357.128 256.827 351.76L321.144 202.383C324.543 194.313 325.237 186.15 323.226 177.893C321.215 169.637 316.708 162.829 309.704 157.471L163.375 45.5206C156.371 40.1623 148.56 37.5449 139.939 37.6683C131.319 37.7916 123.684 40.6445 117.034 46.227L-10.3174 147.379C-11.962 148.492 -13.9285 150.544 -16.2171 153.535C-21.5572 160.515 -23.4751 168.335 -21.9709 176.994C-20.4668 185.654 -16.0877 192.758 -8.8338 198.308ZM201.837 193.504C206.089 196.757 210.751 198.05 215.82 197.384C220.89 196.718 225.046 194.266 228.288 190.029C231.53 185.791 232.81 181.138 232.126 176.071C231.443 171.003 228.975 166.843 224.723 163.59C220.471 160.336 215.81 159.043 210.74 159.709C205.67 160.375 201.514 162.827 198.272 167.065C195.03 171.302 193.75 175.955 194.434 181.022C195.117 186.09 197.585 190.25 201.837 193.504ZM254.739 186.554C258.992 189.807 263.653 191.101 268.722 190.435C273.792 189.769 277.948 187.317 281.19 183.079C284.432 178.841 285.712 174.189 285.029 169.121C284.345 164.054 281.877 159.893 277.625 156.64C273.373 153.387 268.712 152.093 263.642 152.759C258.572 153.425 254.416 155.877 251.174 160.115C247.932 164.353 246.652 169.005 247.336 174.073C248.019 179.14 250.487 183.301 254.739 186.554ZM208.967 246.382C213.22 249.635 217.881 250.928 222.951 250.262C228.02 249.596 232.176 247.144 235.419 242.907C238.661 238.669 239.94 234.016 239.257 228.949C238.573 223.881 236.106 219.721 231.853 216.468C227.601 213.214 222.94 211.921 217.87 212.587C212.8 213.253 208.644 215.705 205.402 219.943C202.16 224.18 200.881 228.833 201.564 233.9C202.247 238.968 204.715 243.128 208.967 246.382ZM261.87 239.432C266.122 242.685 270.783 243.979 275.853 243.313C280.922 242.647 285.078 240.195 288.321 235.957C291.563 231.719 292.842 227.067 292.159 221.999C291.476 216.932 289.008 212.771 284.755 209.518C280.503 206.265 275.842 204.971 270.772 205.637C265.703 206.303 261.547 208.755 258.304 212.993C255.062 217.231 253.783 221.883 254.466 226.951C255.149 232.018 257.617 236.179 261.87 239.432ZM109.632 158.529C112.884 161.016 116.384 162.014 120.131 161.522C123.878 161.03 126.991 159.163 129.471 155.922L140.913 140.965L155.922 152.448C159.173 154.935 162.673 155.933 166.42 155.441C170.167 154.949 173.281 153.082 175.76 149.841C178.239 146.601 179.226 143.108 178.721 139.362C178.216 135.617 176.338 132.5 173.086 130.012L158.078 118.53L169.521 103.573C172 100.332 172.987 96.8394 172.482 93.0939C171.977 89.3483 170.099 86.2317 166.847 83.7439C163.595 81.2561 160.096 80.2583 156.348 80.7506C152.601 81.2429 149.488 83.1094 147.009 86.35L135.566 101.307L120.558 89.8249C117.306 87.3371 113.806 86.3393 110.059 86.8316C106.312 87.3239 103.199 89.1904 100.719 92.431C98.2401 95.6717 97.253 99.1648 97.758 102.91C98.2631 106.656 100.141 109.772 103.393 112.26L118.401 123.742L106.958 138.699C104.479 141.94 103.492 145.433 103.997 149.179C104.502 152.924 106.381 156.041 109.632 158.529Z" fill="#F0EA6E"/>
</svg>
`,vt=`<main class="screen screen--home">\r
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
`;function yt(){return y(vt,{PRIMARY_BUTTON_SRC:gt,STADIA_CONTROLLER_SVG:_t.trim()})}var bt=`<main class="screen screen--settings">\r
  <div class="settings-screen">\r
    <div class="settings-screen__main">\r
      <section class="settings-screen__controls" aria-label="Spieleinstellungen">\r
        <nav class="settings-screen__nav" aria-label="Weiterführende Navigation">\r
          <button type="button" class="settings-screen__back" data-action="go-home">← Zurück</button>\r
        </nav>\r
        <h1 class="settings-screen__heading">\r
          <span class="settings-screen__title">Settings</span>\r
          <span class="settings-screen__title-rule" aria-hidden="true">\r
            <img\r
              class="settings-screen__title-rule-img"\r
              src="{{TITLE_RULE_IMG}}"\r
              width="251"\r
              height="24"\r
              alt=""\r
              decoding="async"\r
            />\r
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
            <span class="settings-screen__action-slash" aria-hidden="true">\r
              <svg width="27" height="56" viewBox="0 0 27 56" fill="none" xmlns="http://www.w3.org/2000/svg">\r
                <line x1="22.3154" y1="1.32435" x2="3.7745" y2="54.166" stroke="#F0EA6E" stroke-width="8" />\r
              </svg>\r
            </span>\r
            <span class="settings-screen__action-chip settings-screen__action-chip--player">{{FOOTER_PLAYER}}</span>\r
            <span class="settings-screen__action-slash" aria-hidden="true">\r
              <svg width="27" height="56" viewBox="0 0 27 56" fill="none" xmlns="http://www.w3.org/2000/svg">\r
                <line x1="22.3154" y1="1.32435" x2="3.7745" y2="54.166" stroke="#F0EA6E" stroke-width="8" />\r
              </svg>\r
            </span>\r
            <span class="settings-screen__action-chip settings-screen__action-chip--board">{{FOOTER_BOARD}}</span>\r
            <button type="button" class="settings-screen__start" data-action="start-game">\r
              <span class="settings-screen__start-asset" aria-hidden="true">\r
                <svg width="126" height="53" viewBox="0 0 126 53" fill="none" xmlns="http://www.w3.org/2000/svg">\r
                  <rect width="126" height="53" fill="#F0EA6E" />\r
                  <mask id="mask0_8088_438" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="20" y="14" width="24" height="25">\r
                    <rect x="20" y="14.5" width="24" height="24" fill="#D9D9D9" />\r
                  </mask>\r
                  <g mask="url(#mask0_8088_438)">\r
                    <path\r
                      d="M30.275 30.5L35.85 26.925C36 26.825 36.075 26.6833 36.075 26.5C36.075 26.3167 36 26.175 35.85 26.075L30.275 22.5C30.1083 22.3833 29.9375 22.375 29.7625 22.475C29.5875 22.575 29.5 22.725 29.5 22.925V30.075C29.5 30.275 29.5875 30.425 29.7625 30.525C29.9375 30.625 30.1083 30.6167 30.275 30.5ZM24 34.5C23.45 34.5 22.9792 34.3042 22.5875 33.9125C22.1958 33.5208 22 33.05 22 32.5V20.5C22 19.95 22.1958 19.4792 22.5875 19.0875C22.9792 18.6958 23.45 18.5 24 18.5H40C40.55 18.5 41.0208 18.6958 41.4125 19.0875C41.8042 19.4792 42 19.95 42 20.5V32.5C42 33.05 41.8042 33.5208 41.4125 33.9125C41.0208 34.3042 40.55 34.5 40 34.5H24ZM24 32.5H40V20.5H24V32.5Z"\r
                      fill="#303131"\r
                    />\r
                  </g>\r
                  <path\r
                    d="M59.48 33.2C58.0267 33.2 56.74 33.1333 55.62 33C54.5 32.8667 53.6933 32.7333 53.2 32.6V32L52.8 29.46C53.0533 29.6733 53.4733 29.9 54.06 30.14C54.6467 30.38 55.4 30.5867 56.32 30.76C57.24 30.92 58.3067 31 59.52 31C60.2667 31 60.84 30.9533 61.24 30.86C61.64 30.7533 61.9133 30.6067 62.06 30.42C62.2067 30.2333 62.28 30.0133 62.28 29.76C62.28 29.44 62.1733 29.1933 61.96 29.02C61.7467 28.8333 61.36 28.68 60.8 28.56C60.2533 28.44 59.4733 28.3133 58.46 28.18C57.2467 28.02 56.2333 27.8 55.42 27.52C54.6067 27.24 54 26.8467 53.6 26.34C53.2 25.82 53 25.1333 53 24.28C53 23.5867 53.18 22.98 53.54 22.46C53.9 21.94 54.48 21.5333 55.28 21.24C56.08 20.9467 57.14 20.8 58.46 20.8C59.8467 20.8 61.0333 20.8667 62.02 21C63.0067 21.1333 63.6867 21.2667 64.06 21.4V22L64.66 24.2C64.3267 24.0267 63.8467 23.8467 63.22 23.66C62.5933 23.4733 61.8667 23.32 61.04 23.2C60.2133 23.0667 59.32 23 58.36 23C57.76 23 57.2933 23.0533 56.96 23.16C56.6267 23.2533 56.3867 23.3933 56.24 23.58C56.1067 23.7533 56.04 23.9733 56.04 24.24C56.04 24.56 56.16 24.82 56.4 25.02C56.6533 25.2067 57.06 25.36 57.62 25.48C58.18 25.6 58.9333 25.7133 59.88 25.82C61.3333 25.98 62.4533 26.22 63.24 26.54C64.0267 26.86 64.5667 27.2733 64.86 27.78C65.1667 28.2733 65.32 28.8733 65.32 29.58C65.32 30.1933 65.2067 30.7333 64.98 31.2C64.7533 31.6533 64.4 32.0267 63.92 32.32C63.4533 32.6133 62.8467 32.8333 62.1 32.98C61.3667 33.1267 60.4933 33.2 59.48 33.2ZM70.9411 33.2C70.0211 33.2 69.3544 33.0067 68.9411 32.62C68.5278 32.22 68.3211 31.5733 68.3211 30.68V25.64H66.5211V23.64C67.1344 23.64 67.6144 23.5667 67.9611 23.42C68.3078 23.26 68.5544 22.9867 68.7011 22.6C68.8478 22.2133 68.9211 21.6733 68.9211 20.98H71.1611V23.64H74.5811C74.4878 23.9067 74.3944 24.24 74.3011 24.64C74.2211 25.0267 74.1811 25.36 74.1811 25.64H71.1611V29.58C71.1611 30.1933 71.2078 30.6133 71.3011 30.84C71.3944 31.0667 71.6144 31.18 71.9611 31.18C72.1878 31.18 72.4344 31.1 72.7011 30.94C72.9811 30.78 73.2478 30.5867 73.5011 30.36C73.7678 30.12 73.9878 29.8933 74.1611 29.68V30.3L74.3611 32.24C74.2011 32.3733 73.9611 32.52 73.6411 32.68C73.3211 32.8267 72.9278 32.9467 72.4611 33.04C72.0078 33.1467 71.5011 33.2 70.9411 33.2ZM79.5134 33.2C78.3134 33.2 77.3534 32.9667 76.6334 32.5C75.9268 32.02 75.5734 31.2533 75.5734 30.2C75.5734 29.4667 75.7601 28.8733 76.1334 28.42C76.5068 27.9667 77.0134 27.6333 77.6534 27.42C78.3068 27.1933 79.0468 27.08 79.8734 27.08C80.4868 27.08 81.0068 27.1333 81.4334 27.24C81.8734 27.3467 82.2268 27.46 82.4934 27.58C82.7601 27.7 82.9334 27.7867 83.0134 27.84C83.0134 27.28 82.9534 26.8267 82.8334 26.48C82.7134 26.12 82.4934 25.86 82.1734 25.7C81.8668 25.5267 81.4334 25.44 80.8734 25.44C80.0601 25.44 79.3401 25.52 78.7134 25.68C78.0868 25.84 77.5734 26.0267 77.1734 26.24C76.7868 26.4533 76.5201 26.6333 76.3734 26.78V26.18L76.1734 24.22C76.2668 24.1667 76.5134 24.08 76.9134 23.96C77.3134 23.84 77.8601 23.7267 78.5534 23.62C79.2468 23.5 80.0734 23.44 81.0334 23.44C82.3534 23.44 83.3601 23.6333 84.0534 24.02C84.7468 24.3933 85.2201 24.9333 85.4734 25.64C85.7401 26.3467 85.8734 27.2 85.8734 28.2V31.8C85.8734 32.1733 85.9134 32.4467 85.9934 32.62C86.0868 32.78 86.1801 32.9067 86.2734 33H83.0334V32.58L83.0734 32.2L83.0334 32.16C82.9268 32.28 82.7734 32.4 82.5734 32.52C82.3734 32.64 82.1268 32.7533 81.8334 32.86C81.5401 32.9533 81.2001 33.0333 80.8134 33.1C80.4268 33.1667 79.9934 33.2 79.5134 33.2ZM80.4534 31.18C81.0134 31.18 81.4801 31.14 81.8534 31.06C82.2401 30.9667 82.5334 30.8467 82.7334 30.7C82.9334 30.54 83.0334 30.3533 83.0334 30.14C83.0334 29.8333 82.8001 29.58 82.3334 29.38C81.8801 29.18 81.2601 29.08 80.4734 29.08C79.7134 29.08 79.1734 29.1867 78.8534 29.4C78.5468 29.6133 78.3934 29.88 78.3934 30.2C78.3934 30.6 78.5734 30.8667 78.9334 31C79.2934 31.12 79.8001 31.18 80.4534 31.18ZM87.9191 33C88.0124 33 88.0991 32.9067 88.1791 32.72C88.2724 32.5333 88.3191 32.2267 88.3191 31.8V25.04C88.3191 24.6133 88.2724 24.3133 88.1791 24.14C88.0991 23.9533 88.0124 23.8533 87.9191 23.84C88.5057 23.84 89.1057 23.8 89.7191 23.72C90.3324 23.6267 90.8124 23.5333 91.1591 23.44V24.24L91.1191 24.58L91.1591 24.62C91.2524 24.4733 91.3991 24.3133 91.5991 24.14C91.8124 23.9533 92.0791 23.7933 92.3991 23.66C92.7324 23.5133 93.1191 23.44 93.5591 23.44C94.2124 23.44 94.7924 23.5333 95.2991 23.72C95.8057 23.8933 96.1657 24.0733 96.3791 24.26L95.7791 26.94V27.54C95.5791 27.26 95.3057 26.9733 94.9591 26.68C94.6257 26.3867 94.2524 26.14 93.8391 25.94C93.4391 25.74 93.0257 25.64 92.5991 25.64C92.1191 25.64 91.7591 25.8133 91.5191 26.16C91.2791 26.5067 91.1591 27.0533 91.1591 27.8V31.8C91.1591 32.2267 91.1991 32.5333 91.2791 32.72C91.3724 32.9067 91.4657 33 91.5591 33H87.9191ZM101.605 33.2C100.685 33.2 100.018 33.0067 99.6052 32.62C99.1918 32.22 98.9852 31.5733 98.9852 30.68V25.64H97.1852V23.64C97.7985 23.64 98.2785 23.5667 98.6252 23.42C98.9718 23.26 99.2185 22.9867 99.3652 22.6C99.5118 22.2133 99.5852 21.6733 99.5852 20.98H101.825V23.64H105.245C105.152 23.9067 105.058 24.24 104.965 24.64C104.885 25.0267 104.845 25.36 104.845 25.64H101.825V29.58C101.825 30.1933 101.872 30.6133 101.965 30.84C102.058 31.0667 102.278 31.18 102.625 31.18C102.852 31.18 103.098 31.1 103.365 30.94C103.645 30.78 103.912 30.5867 104.165 30.36C104.432 30.12 104.652 29.8933 104.825 29.68V30.3L105.025 32.24C104.865 32.3733 104.625 32.52 104.305 32.68C103.985 32.8267 103.592 32.9467 103.125 33.04C102.672 33.1467 102.165 33.2 101.605 33.2Z"\r
                    fill="#303131"\r
                  />\r
                </svg>\r
              </span>\r
              <span class="visually-hidden">Start</span>\r
            </button>\r
          </div>\r
        </div>\r
      </aside>\r
    </div>\r
  </div>\r
</main>\r
`,xt=`<section class="panel panel--settings panel--board-size" aria-labelledby="fieldset-board-size-title">
  <fieldset class="panel__fieldset panel__fieldset--board-size">
    <legend id="fieldset-board-size-title" class="settings-board-size__heading">
      <span class="settings-board-size__cards-icon" aria-hidden="true">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_2290_4600" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
            <rect width="32" height="32" fill="#0635C9" />
          </mask>
          <g mask="url(#mask0_2290_4600)">
            <path
              d="M5.29997 26.4L4.16663 25.9333C3.47775 25.6444 3.01663 25.1444 2.7833 24.4333C2.54997 23.7222 2.58886 23.0222 2.89997 22.3333L5.29997 17.1333V26.4ZM10.6333 29.3333C9.89997 29.3333 9.27219 29.0722 8.74997 28.5499C8.22775 28.0277 7.96663 27.4 7.96663 26.6666V18.6666L11.5 28.4666C11.5666 28.6222 11.6333 28.7722 11.7 28.9166C11.7666 29.0611 11.8555 29.1999 11.9666 29.3333H10.6333ZM17.5 29.1999C16.7889 29.4666 16.1 29.4333 15.4333 29.1C14.7666 28.7666 14.3 28.2444 14.0333 27.5333L8.09997 11.2666C7.8333 10.5555 7.85552 9.86106 8.16663 9.18328C8.47775 8.50551 8.98886 8.04439 9.69997 7.79995L19.7666 4.13328C20.4777 3.86662 21.1666 3.89995 21.8333 4.23328C22.5 4.56662 22.9666 5.08884 23.2333 5.79995L29.1666 22.0666C29.4333 22.7777 29.4111 23.4722 29.1 24.15C28.7889 24.8277 28.2777 25.2888 27.5666 25.5333L17.5 29.1999ZM14.6333 13.3333C15.0111 13.3333 15.3277 13.2055 15.5833 12.95C15.8389 12.6944 15.9666 12.3777 15.9666 12C15.9666 11.6222 15.8389 11.3055 15.5833 11.0499C15.3277 10.7944 15.0111 10.6666 14.6333 10.6666C14.2555 10.6666 13.9389 10.7944 13.6833 11.0499C13.4277 11.3055 13.3 11.6222 13.3 12C13.3 12.3777 13.4277 12.6944 13.6833 12.95C13.9389 13.2055 14.2555 13.3333 14.6333 13.3333ZM16.5666 26.6666L26.6333 23L20.7 6.66662L10.6333 10.3333L16.5666 26.6666Z"
              fill="#0635C9"
            />
          </g>
        </svg>
      </span>
      <span class="settings-board-size__title-text">Board size</span>
    </legend>
    <ul class="panel__options panel__options--board-size">{{RADIOS}}</ul>
  </fieldset>
</section>
`,St=`<section class="panel panel--settings panel--choose-player" aria-labelledby="fieldset-player-color-title">
  <fieldset class="panel__fieldset panel__fieldset--choose-player">
    <legend id="fieldset-player-color-title" class="settings-choose-player__heading">
      <span class="settings-choose-player__pawn" aria-hidden="true">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_2290_4591" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
            <rect width="32" height="32" fill="#1AE5BE" />
          </mask>
          <g mask="url(#mask0_2290_4591)">
            <path
              d="M8.00016 29.3334C7.26683 29.3334 6.63905 29.0722 6.11683 28.55C5.59461 28.0278 5.3335 27.4 5.3335 26.6667V24.0334C5.3335 23.5889 5.4335 23.1778 5.6335 22.8C5.8335 22.4222 6.10016 22.1 6.4335 21.8334C7.96683 20.5889 9.11683 19.3334 9.8835 18.0667C10.6502 16.8 11.1891 15.6667 11.5002 14.6667H9.3335C8.95572 14.6667 8.63905 14.5389 8.3835 14.2834C8.12794 14.0278 8.00016 13.7111 8.00016 13.3334C8.00016 12.9556 8.12794 12.6389 8.3835 12.3834C8.63905 12.1278 8.95572 12 9.3335 12H11.0002C10.6891 11.5111 10.4446 10.9889 10.2668 10.4334C10.0891 9.8778 10.0002 9.28891 10.0002 8.66669C10.0002 7.00002 10.5835 5.58335 11.7502 4.41669C12.9168 3.25002 14.3335 2.66669 16.0002 2.66669C17.6668 2.66669 19.0835 3.25002 20.2502 4.41669C21.4168 5.58335 22.0002 7.00002 22.0002 8.66669C22.0002 9.28891 21.9113 9.8778 21.7335 10.4334C21.5557 10.9889 21.3113 11.5111 21.0002 12H22.6668C23.0446 12 23.3613 12.1278 23.6168 12.3834C23.8724 12.6389 24.0002 12.9556 24.0002 13.3334C24.0002 13.7111 23.8724 14.0278 23.6168 14.2834C23.3613 14.5389 23.0446 14.6667 22.6668 14.6667H20.5002C20.8113 15.6667 21.3502 16.8 22.1168 18.0667C22.8835 19.3334 24.0335 20.5889 25.5668 21.8334C25.9002 22.1 26.1668 22.4222 26.3668 22.8C26.5668 23.1778 26.6668 23.5889 26.6668 24.0334V26.6667C26.6668 27.4 26.4057 28.0278 25.8835 28.55C25.3613 29.0722 24.7335 29.3334 24.0002 29.3334H8.00016ZM8.00016 26.6667H24.0002V24C21.9557 22.4 20.4779 20.75 19.5668 19.05C18.6557 17.35 18.0446 15.8889 17.7335 14.6667H14.2668C13.9557 15.8889 13.3446 17.35 12.4335 19.05C11.5224 20.75 10.0446 22.4 8.00016 24V26.6667ZM16.0002 12C16.9335 12 17.7224 11.6778 18.3668 11.0334C19.0113 10.3889 19.3335 9.60002 19.3335 8.66669C19.3335 7.73335 19.0113 6.94446 18.3668 6.30002C17.7224 5.65558 16.9335 5.33335 16.0002 5.33335C15.0668 5.33335 14.2779 5.65558 13.6335 6.30002C12.9891 6.94446 12.6668 7.73335 12.6668 8.66669C12.6668 9.60002 12.9891 10.3889 13.6335 11.0334C14.2779 11.6778 15.0668 12 16.0002 12Z"
              fill="#1AE5BE"
            />
          </g>
        </svg>
      </span>
      <span class="settings-choose-player__title-text">Choose player</span>
    </legend>
    <ul class="panel__options panel__options--choose-player">{{RADIOS}}</ul>
  </fieldset>
</section>
`,Ct=`<section class="panel panel--settings panel--game-themes" aria-labelledby="fieldset-visual-theme-title">
  <fieldset class="panel__fieldset panel__fieldset--game-themes">
    <legend id="fieldset-visual-theme-title" class="settings-game-themes__heading">
      <span class="settings-game-themes__palette" aria-hidden="true">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_7956_2741" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
            <rect width="32" height="32" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_7956_2741)">
            <path
              d="M15.9998 29.3334C14.1776 29.3334 12.4554 28.9834 10.8332 28.2834C9.21095 27.5834 7.79428 26.6278 6.58317 25.4167C5.37206 24.2056 4.4165 22.7889 3.7165 21.1667C3.0165 19.5445 2.6665 17.8222 2.6665 16C2.6665 14.1556 3.02761 12.4222 3.74984 10.8C4.47206 9.1778 5.44984 7.76669 6.68317 6.56669C7.9165 5.36669 9.35539 4.41669 10.9998 3.71669C12.6443 3.01669 14.3998 2.66669 16.2665 2.66669C18.0443 2.66669 19.7221 2.97224 21.2998 3.58335C22.8776 4.19446 24.2609 5.03891 25.4498 6.11669C26.6387 7.19446 27.5832 8.47224 28.2832 9.95002C28.9832 11.4278 29.3332 13.0222 29.3332 14.7334C29.3332 17.2889 28.5554 19.25 26.9998 20.6167C25.4443 21.9834 23.5554 22.6667 21.3332 22.6667H18.8665C18.6665 22.6667 18.5276 22.7222 18.4498 22.8334C18.3721 22.9445 18.3332 23.0667 18.3332 23.2C18.3332 23.4667 18.4998 23.85 18.8332 24.35C19.1665 24.85 19.3332 25.4222 19.3332 26.0667C19.3332 27.1778 19.0276 28 18.4165 28.5334C17.8054 29.0667 16.9998 29.3334 15.9998 29.3334ZM8.6665 17.3334C9.24428 17.3334 9.72206 17.1445 10.0998 16.7667C10.4776 16.3889 10.6665 15.9111 10.6665 15.3334C10.6665 14.7556 10.4776 14.2778 10.0998 13.9C9.72206 13.5222 9.24428 13.3334 8.6665 13.3334C8.08873 13.3334 7.61095 13.5222 7.23317 13.9C6.85539 14.2778 6.6665 14.7556 6.6665 15.3334C6.6665 15.9111 6.85539 16.3889 7.23317 16.7667C7.61095 17.1445 8.08873 17.3334 8.6665 17.3334ZM12.6665 12C13.2443 12 13.7221 11.8111 14.0998 11.4334C14.4776 11.0556 14.6665 10.5778 14.6665 10C14.6665 9.42224 14.4776 8.94446 14.0998 8.56669C13.7221 8.18891 13.2443 8.00002 12.6665 8.00002C12.0887 8.00002 11.6109 8.18891 11.2332 8.56669C10.8554 8.94446 10.6665 9.42224 10.6665 10C10.6665 10.5778 10.8554 11.0556 11.2332 11.4334C11.6109 11.8111 12.0887 12 12.6665 12ZM19.3332 12C19.9109 12 20.3887 11.8111 20.7665 11.4334C21.1443 11.0556 21.3332 10.5778 21.3332 10C21.3332 9.42224 21.1443 8.94446 20.7665 8.56669C20.3887 8.18891 19.9109 8.00002 19.3332 8.00002C18.7554 8.00002 18.2776 8.18891 17.8998 8.56669C17.5221 8.94446 17.3332 9.42224 17.3332 10C17.3332 10.5778 17.5221 11.0556 17.8998 11.4334C18.2776 11.8111 18.7554 12 19.3332 12ZM23.3332 17.3334C23.9109 17.3334 24.3887 17.1445 24.7665 16.7667C25.1443 16.3889 25.3332 15.9111 25.3332 15.3334C25.3332 14.7556 25.1443 14.2778 24.7665 13.9C24.3887 13.5222 23.9109 13.3334 23.3332 13.3334C22.7554 13.3334 22.2776 13.5222 21.8998 13.9C21.5221 14.2778 21.3332 14.7556 21.3332 15.3334C21.3332 15.9111 21.5221 16.3889 21.8998 16.7667C22.2776 17.1445 22.7554 17.3334 23.3332 17.3334ZM15.9998 26.6667C16.1998 26.6667 16.3609 26.6111 16.4832 26.5C16.6054 26.3889 16.6665 26.2445 16.6665 26.0667C16.6665 25.7556 16.4998 25.3889 16.1665 24.9667C15.8332 24.5445 15.6665 23.9111 15.6665 23.0667C15.6665 22.1334 15.9887 21.3889 16.6332 20.8334C17.2776 20.2778 18.0665 20 18.9998 20H21.3332C22.7998 20 24.0554 19.5722 25.0998 18.7167C26.1443 17.8611 26.6665 16.5334 26.6665 14.7334C26.6665 12.0445 25.6387 9.80558 23.5832 8.01669C21.5276 6.2278 19.0887 5.33335 16.2665 5.33335C13.2443 5.33335 10.6665 6.36669 8.53317 8.43335C6.39984 10.5 5.33317 13.0222 5.33317 16C5.33317 18.9556 6.37206 21.4722 8.44984 23.55C10.5276 25.6278 13.0443 26.6667 15.9998 26.6667Z"
              fill="#DA1EBA"
            />
          </g>
        </svg>
      </span>
      <span class="settings-game-themes__title-text">Game themes</span>
    </legend>
    <ul class="panel__options panel__options--game-themes">{{RADIOS}}</ul>
  </fieldset>
</section>
`,wt=``+new URL(`Code-Vibes_Inner-Topbar-CI3KVVNk.svg`,import.meta.url).href,Tt=``+new URL(`Code-Vibes-cv-B7taLid1.svg`,import.meta.url).href,Et=``+new URL(`Gaming_Theme-topbar-CgP4tIcw.svg`,import.meta.url).href,Dt=``+new URL(`Gaming_Theme-ZKFTc52L.svg`,import.meta.url).href,Ot=``+new URL(`DA_Projects-topbar-DnEtUlKc.svg`,import.meta.url).href,kt=``+new URL(`DA_Projects-wSZG-MAT.svg`,import.meta.url).href,At=``+new URL(`Foods-theme-topbar-r1xif0kT.svg`,import.meta.url).href,jt=``+new URL(`Foods-theme-mXqqlxmL.svg`,import.meta.url).href,Mt=`data:image/svg+xml,%3csvg%20width='263'%20height='24'%20viewBox='0%200%20263%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M-0.000152588%2011.547L11.5469%2023.094L23.0939%2011.547L11.5469%20-8.58307e-06L-0.000152588%2011.547ZM262.547%2011.547V9.547L11.5469%209.547V11.547V13.547L262.547%2013.547V11.547Z'%20fill='%23F0EA6E'/%3e%3c/svg%3e`,Nt=`data:image/svg+xml,%3csvg%20width='50'%20height='18'%20viewBox='0%200%2050%2018'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M49.6603%208.66028L41%202.28095e-05L32.3397%208.66028L41%2017.3205L49.6603%208.66028ZM0%208.66028L0%2010.1603L41%2010.1603V8.66028V7.16028L0%207.16028L0%208.66028Z'%20fill='%23F0EA6E'/%3e%3c/svg%3e`;function Pt(e){switch(e){case`code-vibes`:return{topbarUrl:wt,stageUrl:Tt};case`gaming`:return{topbarUrl:Et,stageUrl:Dt};case`da-projects`:return{topbarUrl:Ot,stageUrl:kt};case`foods`:return{topbarUrl:At,stageUrl:jt}}}function Ft(e,t){let n=e.boardSizeId===t.id?`checked`:``;return`
      <li>
        <label class="choice choice--board-size">
          <input class="choice__radio choice__radio--theme" type="radio" name="boardSize" value="${t.id}" ${n} />
          <span class="choice__title choice__title--board">${h(t.label)}</span>
        </label>
      </li>
    `}function Z(e,t){return`
      <li>
        <label class="choice choice--choose-player">
          <input class="choice__radio choice__radio--theme" type="radio" name="playerColor" value="${t}" ${e.firstPlayerColor===t?`checked`:``} />
          <span class="choice__title choice__title--player">${t===`blue`?`Blue`:`Orange`}</span>
        </label>
      </li>
    `}function It(e,t){let n=e.visualThemeId===t.id?`checked`:``;return`
      <li>
        <label class="choice choice--game-theme">
          <input class="choice__radio choice__radio--theme" type="radio" name="visualTheme" value="${t.id}" ${n} />
          <span class="choice__theme-body">
            <span class="choice__title choice__title--theme">${h(t.label)}</span>
            <span class="choice__theme-accent" aria-hidden="true">
              <img class="choice__theme-accent-img" src="${Nt}" width="41" height="18" alt="" decoding="async" />
            </span>
          </span>
        </label>
      </li>
    `}function Lt(e){return y(xt,{RADIOS:i.map(t=>Ft(e,t)).join(``)})}function Rt(e){return y(St,{RADIOS:[`blue`,`orange`].map(t=>Z(e,t)).join(``)})}function zt(e){return y(Ct,{RADIOS:a.map(t=>It(e,t)).join(``)})}function Bt(e,t){return t.visualThemeId===null?`Game theme`:ee(t.visualThemeId).label}function Vt(e,t){return t.firstPlayerColor===null?`Player`:t.firstPlayerColor===`blue`?`Blue`:`Orange`}function Ht(e,t){return t.boardSizeId===null?`Board size`:d(t.boardSizeId).label}function Ut(e,t){let n=t.visualThemeId??e.visualThemeId,r=Pt(n);return`
    <div class="settings-preview">
      <div class="${`settings-preview__chrome settings-preview__chrome--${n}`}">
        <div class="settings-preview__topbar-art" aria-hidden="true">
          <img
            class="settings-preview__topbar-img"
            src="${r.topbarUrl}"
            width="451"
            height="57"
            alt=""
            loading="eager"
            fetchpriority="high"
            decoding="async"
          />
        </div>
        <div class="settings-preview__stage">
          <div class="settings-preview__stage-art">
            <img
              class="settings-preview__stage-img"
              src="${r.stageUrl}"
              width="349"
              height="249"
              alt="Vorschau: Spielleiste und Karten"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </div>
  `.trim()}function Wt(e,t){return{BOARD_SIZE_SECTION:Lt(t),PLAYER_COLOR_SECTION:Rt(t),VISUAL_THEME_SECTION:zt(t),PREVIEW:Ut(e,t),FOOTER_THEME:h(Bt(e,t)),FOOTER_PLAYER:h(Vt(e,t)),FOOTER_BOARD:h(Ht(e,t)),TITLE_RULE_IMG:Mt}}function Gt(e,t){return y(bt,Wt(e,t))}function Kt(){let e=r.view;return e===`home`?yt():e===`settings`?Gt(r.settings,r.settingsDraft):ht(r.game,r.settings,r.showGameOver,r.showCodeVibesWinnerOrange,r.showCodeVibesWinnerBlue,r.showExitConfirm)}function Q(e){fe(e,r.settings,r.view),e.innerHTML=Kt(),ue(e,()=>Q(e))}var qt=`app`;function Jt(){let e=document.getElementById(qt);e!==null&&Q(e)}var $=document.createElement(`link`);$.rel=`icon`,$.type=`image/svg+xml`,$.href=e,document.head.appendChild($),Jt();