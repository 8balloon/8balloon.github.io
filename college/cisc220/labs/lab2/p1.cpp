//Ethan Clark
//CISC220-022L
//Lab 2, problem 1

#include <iostream>

using namespace std;

int main() {
	//1A
	int a = 8;
	//1B
	cout << &a << endl;
	//1C
	int *b = &a;
	//1D
	cout << *b << endl;
	//1E
	cout << b << endl;
	//1F
	cout << &b << endl;
	//1G
	//You print 6.
	//1H
	int c = 12;
	//1I
	b = &c;
	//1J
	int *foo = &a;
	int **d = &foo;
	//1K
	cout << **d << endl;
	//1L
	cout << *d << endl;
	//1M
	cout << d << endl;
	//1N
	cout << &d << endl;

	return 0;
}
