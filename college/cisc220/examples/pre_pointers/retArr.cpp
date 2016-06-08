//This doesn't work.

#include <iostream>
#include <stdlib.h>

using namespace std;

int * createArray(int size) {
	int r[size] = {3,2,4,1};
	return r;
}

int main() {
	int *a;
	a = createArray(4);
	for (int x = 0; x < 4; x++) {
		cout << a[x] << endl;
	}
	return 0;
}
