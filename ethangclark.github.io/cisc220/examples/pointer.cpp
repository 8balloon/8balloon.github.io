#include <iostream>

using namespace std;

void swap(int* x, int y*);
int main() {
	int a = 100;
	int b = 200;
	swap(&a, &b); //we're changing addresses
	cout << "After swap, a is " << a << endl;
	cout << "After swap, b is " << b << endl;
	return 0;
}

void swap(int *x, int *y) {
	int temp;
	temp = *x;
	*x = *y;
	*y = temp;
	return;
}
