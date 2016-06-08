#include <iostream>

using namespace std;

int main() {
	//going to try and print a 20x5 array (20 right, 5 down) of xs using pointers

	int **foo = new int *[20];
	for (int i = 0; i < 20; i++) {
		foo[i] = new int[5];
		for (int j = 0; j < 5; j++) {
			foo[i][j] = 1;
		}
	}

	for (int i = 0; i < 20; i++) {
		for (int j = 0; j < 5; j++) {
			cout << foo[i][j] << "x";
		}
		cout << endl;
	}

	return 0;
}
