#include <iostream>

using namespace std;

//this is a demonstration of call-by-pointer

void swap (int *x, int *y); //we're sending in pointers

int main() {
	int a = 100;
	int b = 200;
	swap(&a, &b);
	cout << a << b << endl;
	return 0;
}

//int *x means it's an int specifically geared to hold a pointer
//	this is why in CPP.pdf the syntax is shown as int * x instead
void swap(int *x, int *y) {
	cout << x << y << endl;
	cout << *x << *y << endl;
	int temp;
	temp = *x;
	*x = *y;
	*y = temp;
	return;
}
