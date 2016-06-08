//Ethan Clark
//CISC220-022L
//Lab 2 problem 2

#include <iostream>

using namespace std;

int main() {

	//2O
	int x[] = {3, 4, 7, 1, 5};
	//2P
	cout << x << endl;
	//2Q
	cout << &x[2] << endl;
	//2R
	int* y = x;
	//2S
	cout << *(y + 1) << endl;
	//2T
	cout << y << endl;
	//2U
	cout << &y << endl;
	//2V
	int z = 72;
	//2W
	y = &z;

	return 0;
}
