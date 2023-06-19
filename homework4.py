
import numbers
from operator import index

#ex.2
def fact(n):
    result = 1
    while n > 1:
        result *= n
        n -= 1
    return result
print(fact(4))
print(fact(5))

#ex.3  
def list(string, str):
    if str in str:
        return True
    return False

def list2(string, str):
    return True if str in str else False
if __name__ == '__main__':
    l = ['red', 'black', 'white', 'green']
    s = 'green'
print(list(l, s))

#ex.4
def indexes(nums, indexes):
    result = []
    for index in indexes:
        result.append(numbers[index])
    return result

def indexes2(nums, indexes):
    return [nums[index] for index in indexes]
index = [0, 3, 5, 7, 10]
numbers = [23, 18, 19, 33, 97, 77, 45, 6, 15, 19, 37, 6, 99] 
print(indexes(numbers, index))
print(indexes2(numbers, index))

#ex.5
def sum(l_nums):
    l_sum = []
    for list in l_nums:
        l_sum.append(sum(list))
    return max(l_sum)      
def sum2(l_nums):
    return max([sum(list) for list in l_nums])
nums = [[1,2,3], [4,5,6], [7,8,9], [10,11,12]]
print(sum(nums))
print(sum2(nums))  

