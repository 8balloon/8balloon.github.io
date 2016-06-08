//int a[5] = {3,2,4,1,7};

#include <iostream>

using namespace std;

double getAverage(int *arr, int size);

int main() {
	int c[7];
	//these print junk
	cout << c[1] << endl;
	cout << c[2] << endl;
	cout << c[3] << endl;
	cout << c[4] << endl;

	int d[] = {1, 2, 3};
	//array length is 3]
	
	cout << getAverage(d, 3) << endl;
	
	cout << c << endl;
	//is equivalent to
	cout << &c[0] << endl;

	return 0;
}

double getAverage(int *arr, int size) {
	int sum = 0;
	for (int i = 0; i < size; i++) {
		sum += arr[i];
	}
	double avg = double(sum) / size; //casts
	return avg;
}
