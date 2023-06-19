#скрипт прави таблица с даден брой номерирани клетки и я пише в текстов файл
f=open('table.txt','w')
def delimiter(rows_num):
    for i in range(rows_num):
        print('+-----',end="")
        f.write('+-----')
    print('+')
    f.write('+\n')


def is_use(value):
    in_use = False
    lines = 0
    for i in range(1,int(value/2)):
        if value %i==0:
            if value/i<i:
                break
            if (value/i)/i<=2:
                in_use = True
                lines = i
                break
    return lines

max_val = int(input('Max value:'))

val = max_val
while is_use(val)==0:
    val+=1

lines = is_use(val)
rows = int(val/is_use(val))

for i in range(lines):
    delimiter(rows)
    for j in range(rows):
        num = str((i+i)*(j+i)+(rows-j-1)*i)
        if int(num)>max_val:
            num=''
        num_len = len(num)
        print('|',''*(4-num_len),num,'',sep="",end="")
        f.write('|'+''*(4-num_len)+str(num)+'')
    print('|')
    f.write('|\n')
delimiter(rows)
f.close()            

