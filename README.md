# 神隱九宮鬥（Tic Tac Toe Plus）

這是一個進階版井字棋遊戲，使用 HTML、CSS 和 JavaScript 製作。支援「玩家對玩家」與「玩家對 BOT」兩種模式，並有「三子連線」與「超過三子自動移除」的特殊規則。

This is an advanced Tic Tac Toe game built with HTML, CSS, and JavaScript. It supports both "Player vs Player" and "Player vs BOT" modes, with a three-in-a-row win condition and automatic removal of the oldest mark if a player has more than three.

---

## 遊戲模式 Game Modes

- 玩家對玩家（本地雙人對戰）
- 玩家對 BOT（可選擇 X 或 O，BOT 會自動下棋）

---

## 遊戲規則 Game Rules

- 兩位玩家輪流在九宮格中下棋，每次只能下在空格。
- 每位玩家最多同時在棋盤上有三顆棋子，超過三顆時，最早下的那顆會自動消失。
- 先將自己的三顆棋子連成一線（橫、直、斜）者獲勝。
- 可選擇與 BOT 對戰，BOT 會自動下棋。

- Players take turns placing their mark (X or O) in an empty cell.
- Each player can have at most 3 marks on the board; the oldest mark will be removed automatically when placing the 4th.
- The first player to align their 3 marks in a row (horizontally, vertically, or diagonally) wins.
- You can play against a BOT, which will make moves automatically.

---

## 專案結構 Project Structure

```
tic-tac-toe
├── docs
│   ├── index.html      # 主遊戲頁面 Main HTML file
│   ├── style.css       # 樣式檔案 Styles
│   └── script.js       # 遊戲邏輯 Game logic
└── README.md           # 專案說明 Project documentation
```

---

## 快速開始 Getting Started

1. 下載或 clone 此專案：
   Download or clone this repository:
   ```bash
   git clone https://github.com/yourusername/tic-tac-toe.git
   cd tic-tac-toe
   ```
2. 開啟 `docs/index.html` 於瀏覽器即可遊玩。
   Open `docs/index.html` in your browser to play.

---

## 更新紀錄 Changelog

- v1.1 新增 BOT 對戰模式，支援玩家選擇 X 或 O。
- v1.0 初始版本，支援本地雙人對戰與三子自動移除規則。

---

## 授權 License

本專案採用 MIT 授權。詳見 LICENSE 檔案。
This project is licensed under the MIT License. See the LICENSE file for details.