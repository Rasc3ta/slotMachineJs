

let prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const symbolCount = {
    A: 2,
    B: 4,
    C: 6,
    D: 8,
};

const symbolValue = {
    A: 7,
    B: 5,
    C: 3,
    D: 2,
};

// ----------------------------take money
const deposit = () => {
    while (true) {
        let balance = parseFloat(prompt("enter amount to deposit: ") - 0);
        if (isNaN(balance)) {
            console.log("invalid input. \n -----------------------------");
        } else {
            return balance;
        }
    }
};

// let balance = deposit();
// console.log(typeof balance, balance);

//---------------------------- bet on how many lines and how much on each line
const lineCount = () => {
    while (true) {
        let balance = parseFloat(prompt("how many lines will you bet on : ") - 0);
        if (isNaN(balance)) {
            console.log("invalid input. \n -----------------------------");
        } else {
            return balance;
        }
    }
};

// let lines = lineCount();
// console.log(typeof lines, lines);

const amountPerLine = () => {
    while (true) {
        let perLine = parseFloat(prompt("how much per line : ") - 0);
        if (isNaN(perLine)) {
            console.log("invalid input. \n -----------------------------");
        } else {
            return perLine;
        }
    }
};

// let perLine = lineCount();
// console.log(typeof perLine, perLine);

const genSymbols = () => {
    const symbolArray = [];
    for (let symbol in symbolCount) {
        for (let i = 0; i < symbolCount[symbol]; i++) {
            symbolArray.push(symbol);
        }
    }
    
    return symbolArray;
};

// -------------------------------------------------spin slots
const spin = () => {
    const SYMBOL_ARRAY = genSymbols();
    //   console.log(SYMBOL_ARRAY)
    
    const reels = [];
    
    for (let i = 0; i < ROWS; i++) {
        const symbolArray = [...SYMBOL_ARRAY];
        
        // console.log(symbolArray.length);
        // console.log(symbolArray, "\n");
        
        reels.push([]);
        for (let j = 0; j < COLS; j++) {
            let index = Math.floor(Math.random() * symbolArray.length);
            let symbol = symbolArray.splice(index, 1)[0];
            reels[i][j] = symbol;
            
            //   console.log(symbolArray.length);
        }
        
        // console.log(symbolArray);
    }
    //   console.log(reels, "\n-------------------------------")
    return reels;
};

const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < COLS; i++) {
        const row = [];
        for (let j = 0; j < ROWS; j++) {
            row.push(reels[j][i]);
        }
        rows.push(row);
    }
    
    // console.log(rows)
    return rows;
};

const printLines = (rows) => {
    for (let row of rows) {
        console.log("_ _ _  .  _ _ _  .  _ _ _\n");
        console.log(" ", row.join("    |    "), "\n");
    }
    console.log("_ _ _  .  _ _ _  .  _ _ _\n");
    
    //   console.log("end");
};

// const lines = transpose(spin());
// printLines(lines);

// ----------------------------------------determin winnings
const result = (lines) => {
    const wins = [];
    for (let i = 0; i < lines.length; i++) {
        let matches = 0;
        for (let j = 1; j < lines[i].length; j++) {
            if (lines[i][0] !== lines[i][j]) {
                break;
            } else {
        matches++;
      }
    }
    if (matches === 2) {
      wins.push(lines[i][0]);
    }
  }

  console.log(wins);
  return wins;
};

// console.log(lines)
// let winningRows = result(lines);

const calcPrize = (betPerLine, winningRows) => {
  let sum = 0;
  for (let rowSymbol of winningRows) {
    let prizePerLine = betPerLine * symbolValue[rowSymbol];
    sum += prizePerLine;
    console.log(prizePerLine);
  }
  return sum;
};

// let total_won = calcPrize(10, winningRows);

// ------------------------------------game-----------------------------------







let balance = 0;
while (true) {
    console.log("what do you wish to do ?");
    let answer = prompt("deposit(dep)/show balance(bal)/play(play)/quit(exit) ");
    if (answer === "dep") {
        balance += deposit();
    } else if (answer === "bal") {
        console.log("balance : ", balance);
    } else if (answer === "play") {
        let linesToBetOn = lineCount();
        let perLineAmount = amountPerLine();
        let expense = linesToBetOn * perLineAmount;
        
        if (expense <= balance) {
            balance -= expense;
        } else {
            console.log("insufficient balance, please deposit more money.");
            continue;
        }
        
        
        console.log("balance : ", balance);
        
        let spinResult = spin();
        let rows = transpose(spinResult);
        
        printLines(rows);
        
        let winningSymbols = result(rows);
        let totalWon = calcPrize(perLineAmount, winningSymbols);
        balance += totalWon;
        console.log("balance : ", balance);
        
  } else if (answer === "exit") {
    console.log(`withdrawn amount : $${balance}`)
    return 0;
  } else {
    console.log("invalid command!!")
  }
}
