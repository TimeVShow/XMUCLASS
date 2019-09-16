# coding=utf-8
import requests
from bs4 import BeautifulSoup
import json
import os
import os.path
import re
def get_special(time_messege):
    print(time_messege)
    time = re.findall('\d',time_messege)
    if(len(time) == 2):
        left_time = int(time[0])
        right_time = int(time[1])
    elif(len(time) == 3):
        left_time = int(time[0])
        right_time = int(time[1]+time[2])
    elif(len(time) == 4):
        left_time = int(time[0]+time[1])
        right_time = int(time[2]+time[3])
    else:
        special = ["error"]
        return special
    special = [i for i in range(1,left_time)]
    if(time_messege[-2] == "单"):
        for i in range(left_time,right_time+1):
            if i%2 == 0:
                special.append(i)
    if(time_messege[-2] == "双"):
        for i in range(left_time,right_time+1):
            if i%2 == 1:
                special.append(i)
    special = special+[i for i in range(right_time+1,16)]
    return special 
week_day = ['Mon','Tue','Wed','Thu','Fri']

rootdir = 'class_messege/'
list = os.listdir(rootdir)
for eachone in list:
    path = os.path.join(rootdir,eachone)
    class_file = open(path,"r",encoding="utf-8")
    class_file = class_file.read()
    json_file = open(eachone[0]+".json","a",encoding="utf-8")
    day = week_day[int(eachone[0])-1]
    data = [{"_id":day}]
    soup = BeautifulSoup(class_file,'lxml')
    tabel = soup.find('table',"portlet-table")
    class_rooms = tabel.find_all('tr')
    for eachone in class_rooms[2:]:
       all_mesege = eachone.find_all('td')
       class_room = all_mesege[0].text[-4:].strip()
       data[0][class_room] = []
       time = 1
       flag = 0
       for class_messege in all_mesege[1:]:
           list = {}
           #去除空白字符
           if(len(class_messege.text.strip()) == 0):
               if(flag):
                   flag = 0
                   continue
               if(time > 9):
                   continue
               list['flag'] = True
               if(time == 9):
                   list['time'] = "9-11"
               else:
                   list['time'] = str(time)+"-"+str(time+1)
               list['special'] = []
               data[0][class_room].append(list)
               time += 2
               flag = 1
               continue
           messege = re.findall('[(].*[)]',class_messege.text)[0]
           time_messege = re.findall('\d-\d.*周',messege)[0][:-1]
           special = get_special(time_messege)
           timing_messege = re.findall('第.*节',messege)[0][1:-1]
           left_time = timing_messege[0]
           right_time = timing_messege[2:]
           time = int(right_time)+1
           if(left_time == '9'):
               real_time = "9-11"
           else:
               real_time = str(left_time)+"-"+str(right_time)
           list['flag'] = False
           list['time'] = real_time
           list['special'] = special
           data[0][class_room].append(list)
    json_file.write(json.dumps(data[0], indent=4, separators=(',', ': ')))
    json_file.close()
