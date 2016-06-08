/*
Ethan Clark
CISCL220-022L
Problem 7
*/

#include <iostream>
#include <stdlib.h>

using namespace std;

bool are_ordered(int *ni, int *n2, int *n3);

int main() {
	//gets 3 numbers from user and then orders them if theyre unordered,
	//printing the result

	//gets input and converts to integers
	cout << "Enter 3 numbers (hit enter between each number)" << endl;
	string foo;
	cin >> foo;
	int n1 = atoi(foo.c_str());
	cin >> foo;
	int n2 = atoi(foo.c_str());
	cin >> foo;
	int n3 = atoi(foo.c_str());

	//shows user their input
	cout << "The three numbers you entered are: " << endl;
	cout << n1 << " " << n2 << " " << n3 << endl;

	//prints numbers again if they aren't ordered, but in order
	if (! are_ordered(&n1, &n2, &n3)) {
		cout << "When ordered, these numbers are: ";
		cout << n1 << " " << n2 << " " << n3 << endl;
	}	
	return 0;
}

bool are_ordered(int *n1, int *n2, int *n3) {
	//compares first two, then second two, switching if necessary
	if (*n1 < *n2) {
		if (*n2 < *n3) {
			return true;
		}
		else {
			int foo = *n2;
			*n2 = *n3;
			*n3 = foo;
		}
	}
	else {
		int foo = *n1;
		*n1 = *n2;
		*n2 = foo;
	}
	//switches second two if necessary because there's a logical
	//case in which this isn't covered by first two switches
	if (*n3 < *n2) {
		int foo = *n3;
		*n3 = *n2;
		*n2 = foo;
	}
	if (*n2 < *n1) {
		int foo = *n2;
		*n2 = *n1;
		*n1 = foo;
	}
	return false;
}
