//Dynamically Allocated Arrays

#include <iostream>
#include <stdlib.h>

using namespace std;

int example();

int main() {
	int *x; //you're declaring without specifying the amount of memory
	//by declaring the pointer first.
	x = new int; //allocates space on the heap
	*x = 34;

	/*How to check if there's no heap space:
	 * int *x;
	 * if (!(x= new int)) {
	 * 	cout << "Error" << endl;
	 * }
	 * else {
	 * 	*x = 2;
	 * }
	 */
	
	delete x; //deallocates the space in memory
	example();
	return 0;
}

int example() {
	int *x = NULL; //pointer initialized with null
	//because you have to create a pointer on the stack?
	//that you can return?
	//(the NULL is just good practice)
	cout << "Enter number of numbers you want" << endl;
	int y;
	cin >> y;
	x = new int[y];

	for (int k = 0; k < y; k++) {
		x[k] = k;
		cout << x[k];
	}
	cout << endl;

	delete [] x;
	return 0;
}
