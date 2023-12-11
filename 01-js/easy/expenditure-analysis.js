/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  let result = new Map();
  for (let index = 0; index < transactions.length; index++) {
    const record = transactions[index];
    let category = record["category"];
    let price = record["price"];

    if (result.has(category)) {
      result.set(category, result.get(category) + price);
    } else {
      result.set(category, price);
    }
  }
  let arr = [];
  result.forEach((v, k) => {
    arr.push({
      category: k,
      totalSpent: v,
    });
  });

  return arr;
}

module.exports = calculateTotalSpentByCategory;
