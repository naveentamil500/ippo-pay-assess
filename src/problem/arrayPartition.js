/*
Not included in react app
navigate to problem folder => cd ./src/problem
Run th file using "node arrayPartition.js"
*/

// Find all combinations of sums of subsets made up of k integers
function sumK(arr, set, idx, sum, k) {
    if (k === 0) return set.add(sum);
    if (idx === arr.length) return;
    sumK(arr, set, idx + 1, sum, k);
    sumK(arr, set, idx + 1, sum + arr[idx], k - 1);
}

function populateArray(dp, arr, isFirstArray) {
    for (let i = 1; i <= arr.length; i++) {
        let set = new Set();
        sumK(arr, set, 0, 0, i);
        set = [...set.values()];
        if (!isFirstArray) {
            // Sort the secondDP array for binary searching
            set.sort((a, b) => a - b);
        }
        // i === a subset of i integers
        dp[i] = (set);
    }
}

function findArrayPartitionAbsDiff(nums) {
    let mid = Math.floor(nums.length / 2);
    let firstHalf = nums.slice(0, mid), secondHalf = nums.slice(mid);
    let firstHalfSum = firstHalf.reduce((a, c) => a + c);
    let secondHalfSum = secondHalf.reduce((a, c) => a + c);

    let firstDP = [[0]], secondDP = [[0]];
    populateArray(firstDP, firstHalf, true);
    populateArray(secondDP, secondHalf, false);

    let min = Infinity;
    // i === subset of length i
    for (let i = 1; i < firstDP.length; i++) {
        for (let num1 of firstDP[i]) {
            let remainingNum1 = firstHalfSum - num1;

            // i + remaining SubsetLen must equal length n since our goal is to create two arrays of length n
            let remainingSubsetLen = secondHalf.length - i;

            let l = 0, r = secondDP[remainingSubsetLen].length - 1;
            while (l <= r) {
                let mid = l + Math.floor((r - l) / 2);
                let num2 = secondDP[remainingSubsetLen][mid];
                let remainingNum2 = secondHalfSum - num2;
                // arr1Sum === sum of subsets of length n and arr2Sum === sum of subsets of length n
                // thereby creating two arrays of length n
                let arr1Sum = num1 + num2, arr2Sum = remainingNum1 + remainingNum2;
                if (arr1Sum === arr2Sum) return 0;

                min = Math.min(min, Math.abs(arr1Sum - arr2Sum));
                if (arr1Sum > arr2Sum) r = mid - 1;
                else l = mid + 1;
            }
        }
    }
    return min;
}

//Test cases
console.log(findArrayPartitionAbsDiff([3, 9, 7, 3])); // Output: 2
console.log(findArrayPartitionAbsDiff([-36, 36])); // Output: 72
console.log(findArrayPartitionAbsDiff([2, -1, 0, 4, -2, -9])); // Output: 0


