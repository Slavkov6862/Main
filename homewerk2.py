 
#ex 1
i=1
while i < 3000:
    print (i, end=" ")
    i=i*3  


#ex 2
for i in range (1, 11):
    for j in range (1,11):
        print(i, "*" , j , "=",i*j,)
    print()  




# ex 3
n = int(input('Number:'))


for i in range(1, n + 1):
    for j in range(1, i + 1):
        print(i, end='')
    print() 
 
# ex 4

n = int(input("Enter a number:"))

sum = 0
for i in range(1, n +1 ):
    sum = sum + i
print("sum is:", sum)    



