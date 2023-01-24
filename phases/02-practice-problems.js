function anagrams(str1, str2) {
  // Your code here
  if (str1.length !== str2.length) return false;

  const charCount = {};

  for (let i = 0; i < str1.length; i++) {
    charCount[str1[i]] = charCount[str1[i]] + 1 || 1;
    charCount[str2[i]] = charCount[str2[i]] + 1 || 1;
  }

  for (const char in charCount) {
    if (charCount[char] % 2 !== 0) return false;
  }

  return true;

}


function commonElements(arr1, arr2) {
  // Your code here
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  
  const common = [];

  for (const num of set1) {
    if (set2.has(num)) common.push(num);
  }

  return common;
}


function duplicate(arr) {
  // Your code here

  const nums = {};

  for (let i = 0; i < arr.length; i++) {
    if (nums[arr[i]]) return arr[i];
    nums[arr[i]] = true;
  }
}


function twoSum(nums, target) {
  // Your code here
  const newSet = new Set();

  for (let i = 0; i < nums.length; i++) {
    if (newSet.has(target - nums[i])) {
      return true;
    }

    newSet.add(nums[i]);
  }
  
  return false;
}


function wordPattern(pattern, strings) {
  // Your code here
  const obj = {};
  
  for (let i = 0; i < pattern.length; i++) {
    if (!obj[pattern[i]]) {
      for (let key in obj) {
        if (obj[key] === strings[i]) {
          return false;
        }
      }

      obj[pattern[i]] = strings[i]; 
    } else if (obj[pattern[i]] !== strings[i]) {
      return false;
    }
  }

  return true;
}


module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];
