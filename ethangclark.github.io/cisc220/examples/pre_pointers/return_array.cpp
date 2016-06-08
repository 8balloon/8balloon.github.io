#include <iostream>

using namespace std;

int * createArray() {
	int r[4] = {3,2,4,1};
	return r;
} //returns pointer to array;

int main() {
	int * a;
	a = createArray();
	//a is the array
	for (int i = 0; i < 4; i ++) {
		cout << a[i] << endl;
	}
	return 0;
}
