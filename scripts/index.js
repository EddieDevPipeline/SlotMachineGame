async function spinReels(bet) {
  const symbols = ["*", "&", "$", "#"];
  const reels = [];

  for (let i = 0; i < 3; i++) {
    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    reels.push(randomSymbol);
  }

  return new Promise((resolve) => {
    setTimeout(() => resolve(reels), 1000);
  });
}

function calculateWin(reels, bet) {
  const uniqueSymbols = new Set(reels).size;
  if (uniqueSymbols === 1) {
    return bet * 10;
  } else if (uniqueSymbols === 2) {
    return bet * 5;
  } else {
    return -bet;
  }
}

async function playSlotMachine() {
  let balance = 100;
  let continuePlaying = true;

  while (continuePlaying && balance > 0) {
    const bet = prompt("Enter your bet (balance: " + balance + "): ");
    if (bet > balance) {
      console.log("Bet exceeds balance. Try again.");
      continue;
    }

    console.log("Spinning...");
    const reels = await spinReels(bet);
    console.log("Result: ", reels.join(" "));

    const winAmount = calculateWin(reels, bet);
    balance += winAmount;

    console.log(
      winAmount >= 0 ? `You win ${winAmount}!` : `You lose ${-winAmount}.`
    );
    console.log(`New balance: ${balance}`);

    continuePlaying = confirm("Continue playing?");
  }

  if (balance <= 0) {
    console.log("Game over! You ran out of balance.");
  } else {
    console.log("Thanks for playing! Your final balance is:", balance);
  }
}

playSlotMachine();
