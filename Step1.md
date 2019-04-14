## Step1:

	首先保证队列的一开始为有序递增的，使用sort按照从小到大的顺序进行排列。

## Step2:

	接着我们开始寻找对应当前序列的下一个字典序序列。

> 首先从队列的最右端开始寻找，第一个自己小于右边数的元素中的位置。并记录下当前的这个位置
>
> 从上一步骤中记录的位置开始，向右寻找比当前这个位置的数大的最小的元素
>
> 从找到的位置下一个地方开始将剩下的数组进行转置，我们就可以得到下一个字典序序列

## 下面开始代码实现

<!--more-->

```c++
#include <stdio.h>
const int maxn=1005;
int num[maxn]={0};
int n;
bool work()
{
	bool find=false;//作为判断标志
	int tar;
	for(int i=n-1;i>=1;i--)//从右边开始寻找第一个比右侧元素小的位置
	{
		if(num[i]<num[i+1])
		{
			tar=i;
			find=true;
			break;
		}
	}
	if(!find)//没有找到，即代表当前已经满足条件
	{
		return false;
	}
	int min=9999999;
	int pos2=1;
	for(int i=tar+1;i<=n;i++)//寻找比num[tar]要大的最小的元素的位置
	{
		if(num[i]>num[tar])
		{
			min=min<num[i]?min:num[i];
			pos2=i;
		}
	}
	int t=num[pos2];
	num[pos2]=num[tar];
	num[tar]=t;
	int i=tar+1;
	int j=n;
	for(;i<j;i++,j--)//将num[tar]之后的数组的元素进行交换
	{
		int t=num[i];
		num[i]=num[j];
		num[j]=t;
	}
	return true;
}
int main()
{
	scanf("%d",&n);
	for(int i=1;i<=n;i++)
	{
		num[i]=i;
	}
	for(int i=1;i<=n;i++)
	{
		printf("%d",num[i]);
	}
	puts("");
	while(work())//循环寻找，直到找不到
	{
		for(int i=1;i<=n;i++)
		{
			printf("%d",num[i]);
		}
		puts("");	
	}
	return 0;
}
```