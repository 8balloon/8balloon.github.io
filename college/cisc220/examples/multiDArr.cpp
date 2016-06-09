//Dynamically Allocated Arrays

#include <iostream>
#include <stdlib.h>

using namespace std;

int main() {
	int **x = new int *[4];
	
	for (int i = 0; i < 4; i++) {
		x[i] = new int[3];
	}

	for (int i = 0; i < 3; i++) {
		for (int j = 0; j < 4; j++) {
			x[i][j] = i+j;
		}
	}

	for (int i = 0; i < 3; i++) {
		for (int j = 0; j < 4; j++) {
			cout << x[i][j];
		}
		cout << endl;
	}

	for (int i = 0; i < 4; i++) {
		delete[] x[i];
	}
	delete[] x;

	return 0;
}
