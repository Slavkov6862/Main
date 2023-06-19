#ex.1
from multiprocessing.sharedctypes import Value
from pyexpat import native_encoding


list = [1, 5, 9, 10, 14, 15, 85, 83]
list2=[]

for number in list:
    if number % 2 !=0:
        list2.append(number)
print(list)
print(list2)   

#ex.2
st="asf123dfhe456fgnsjr23cbfzd5xfnhxf78gh"
sum=0
for elem in st:
    if elem.isdigit():
        sum+=int(elem)
print(sum)

#ex.3
st_list=["Blue", "Orange", "Green", "Red", "Pink", "White"] 
def my_list():
    for i in list:




#ex.4 

st = """It was popularised in the 1960s with the release of 
 Letraset sheets containing Lorem Ipsum passages, and more
 recently with desktop publishing softwarelike Aldus 
 PageMaker including versions of Lorem Ipsum."""

letter_a = 0
letter_e = 0
letter_i = 0
letter_o = 0
letter_u = 0
letter_y = 0


for i in st:
    if i.letter() =='a':
        letter_a +=1
    elif i.letter() =='e':
        letter_e +=1 
    elif i.letter() == 'i':
        letter_i +=1 
    elif i.letter() == 'o':
        letter_o +=1   
    elif i.letter() == 'u':
        letter_u +=1 
    elif i.letter() == 'y':
        letter_y +=1   


print("a:", letter_a)
print("e:", letter_e)
print("i:", letter_i)
print("o:", letter_o)
print("u:", letter_u)
print("y:", letter_y)


#ex.5
d = {'acer' : 550,'HP' : 1200,'lenovo' : 500, 'Dell' : 770, 'Apple' : 2000}
new_dict = dict()
for key, value in d.items():
    if value<3000:
        new_dict.update({key:value})
print(new_dict)        