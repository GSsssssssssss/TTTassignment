#include<iostream>
using namespace std;
class bca
{
public:
    void answer()
    {
     int a[10];
     float sum;
     float avg;
     int i;
     cout<<"Enter the 10 numbers of choice: "<<endl;
     for(i=0;i<=9;i++)
     {
         cin>>a[i];
         sum+=a[i];
     }
     avg=sum/10;
     cout<<"The sum is: "<<sum<<endl;
     cout<<"The avg is: "<<avg<<endl;

    }

};
int main()
{
    bca obj;
    obj.answer();
}
