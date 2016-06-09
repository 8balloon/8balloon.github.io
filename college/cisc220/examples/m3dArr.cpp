//Dynamically Allocated Arrays

#include <iostream>
#include <stdlib.h>

using namespace std;

int main() {
	int ***x = new int **[5];

	for (int i = 0; i < 5; i++) {
		x[i] = new int*[4];
		for (int j = 0; j < 4; j++) {
			x[i][j] = new int[3];
		}
	}

	for (int i = 0; i < 3; i++) {
		for (int j = 0; j < 4; j++) {
			for (int k = 0; k < 5; k++) {
				x[i][j][k] = i + j + k;
			}
		}
	}
	
	for (int i = 0; i < 3; i++) {
		for (int j = 0; j <4; j++) {
			for (int k = 0; k < 5; k++) {
				cout << x[i][j][k];
			}
			cout << endl;
		}
		cout << endl;
	}

	for (int i = 0; i < 4; i++) {
		delete[] x[i];
	}
	delete[] x;
	
	return 0;
}
