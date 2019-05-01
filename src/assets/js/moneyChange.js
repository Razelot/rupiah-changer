/**
 * Use dynamic programming to get the combination of given denomations to create a given amount.
 * @param {Number} amount 
 * @param {Array} denominations 
 */
export function moneyChange(amount, denominations) {
  let result = [0]; // minimum number of denominations to create the amount
  let track = [-1]; // stores last denomination used to create each values

  // initialize minimum for all values
  for (let i = 1; i <= amount; i++) {
    result[i] = Number.MAX_VALUE;
    track[i] = -1;
  }

  let max = 0; // largest amount which the denominations could make
  denominations.forEach(denomination => {
    for (let val = 1; val <= amount; val++) {
      if (denomination <= val && result[val - denomination] + 1 < result[val]) {
        // new denomination can make a new minimum
        result[val] = 1 + result[val - denomination];
        track[val] = denomination; // new denomination is used to make the value
        max = Math.max(max, val);
      }
    }
  });

  let remaining = `Rp${amount - max}`; // remaining amount which the denominations could not make
  // trace back the combination of denominations used to make the max amount
  let val = max;
  let used = {};
  while (val > 0 && track[val] > 0) {
    used[`Rp${track[val]}`] = used[`Rp${track[val]}`] + 1 || 1;
    val = val - track[val];
  }

  return {
    amount: 'Rp' + amount,
    total: 'Rp' + max,
    used,
    remaining
  };
}