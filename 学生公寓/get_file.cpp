#include <bits/stdc++.h>
using namespace std;
int main()
{
	char ch;
	char s[8][10]={"Mon.json","Tue.json","Wed.json","Thu.json","Fri.json","Sat.json","Sun.json"};
	FILE* pfr=fopen("basic.josn","r");
	for(int i=0;i<7;i++)
	{
		FILE* pfw=fopen(s[i],"w");
		while((ch=fgetc(pfr))!=EOF)
		{
			fputc(ch,pfw);
		}
	}
	fclose(pfr);
	pfr=NULL;
	return 0;
} 
