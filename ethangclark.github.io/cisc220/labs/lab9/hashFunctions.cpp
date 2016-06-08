#include <iostream>
#include <math.h>

using namespace std;

int hash1(int n, int len) {
	return n % len;
}

int hash2(int n, int len) {
	return int ((n * n) / sqrt(n * 17)) % len;
}

int hash3(int n, int len) {
	double c = (sqrt(5) - 1) / 2;
	int m = 7;
	return int (floor(m *((n*c) - floor(n*c)))) % len;
}

int main() {
	int nums[] = {3413, 3869, 1897, 3346, 4325, 1657, 1, 2199, 1411, 874, 4323, 2759, 2457, 4071, 1236,
	2156, 1610, 4538, 2161, 4632};
	int len_nums = 20;
	int hash1_array[41];
	int hash2_array[41];
	int hash3_array[41];
	for (int i = 0; i < 41; i++) {
		hash1_array[i] = 0;
		hash2_array[i] = 0;
		hash3_array[i] = 0;
	}
	int hash1_collisions = 0;
	int hash2_collisions = 0;
	int hash3_collisions = 0;

	for (int i = 0; i < len_nums; i++) {
		//hash1 stuff
		if (hash1_array[hash1(nums[i], 41)]) {
			hash1_collisions++;
		}
		hash1_array[hash1(nums[i], 41)] = nums[i];

		//hash2 stuff
		if (hash2_array[hash2(nums[i], 41)]) {
			hash2_collisions++;
		}
		hash2_array[hash2(nums[i], 41)] = nums[i];

		//hash2 stuff
		if (hash3_array[hash3(nums[i], 41)]) {
			hash3_collisions++;
		}
		hash3_array[hash3(nums[i], 41)] = nums[i];
	}

	cout << "hash1 collisions: " << hash1_collisions << endl;
	cout << "hash2 collisions: " << hash2_collisions << endl;
	cout << "hash3 collisions: " << hash3_collisions << endl;

	cout << endl;

	cout << "Hash1 array: ";
	for (int i = 0; i < 41; i++) {
		cout << hash1_array[i] << " ";
	}
	cout << endl;

	cout << "Hash2 array: ";
	for (int i = 0; i < 41; i++) {
		cout << hash2_array[i] << " ";
	}
	cout << endl;
	
	cout << "Hash3 array: ";
	for (int i = 0; i < 41; i++) {
		cout << hash3_array[i] << " ";
	}
	cout << endl;
	/*
	cout << hash1(2222, 41) << endl;
	cout << hash2(2222, 41) << endl;
	cout << hash3(2222, 41) << endl;
	cout << hash3(512, 41) << endl;
	*/
	return 0;
}

