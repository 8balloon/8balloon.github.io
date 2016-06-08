#include <iostream>
#include <math.h>

using namespace std;

int main() {
	int all_nums[] = {560, 671, 353, 502, 490,757, 38, 410,904, 93, 818, 577, 3, 671};
	int num_count = 14;
	int hash_array[29];
	int hash_array_size = 29;
	for (int i = 0; i < hash_array_size; i++) hash_array[i] = 0;
	int collisions = 0;

	//with linear probing
	for (int i = 0; i < num_count; i++) {
		int hash_result = all_nums[i] % hash_array_size;
		while (hash_result < hash_array_size) {
			if (! hash_array[hash_result]) {
				hash_array[hash_result] = all_nums[i];
				break;
			}
			hash_result++;
			collisions++;
		}
	}

	//printing
	for (int i = 0; i < hash_array_size; i++) {
		cout << hash_array[i] << " ";
	}
	cout << endl;
	cout << "Collisions with linear probing: " << collisions << endl;

	//resetting
	collisions = 0;
	for (int i = 0; i < hash_array_size; i++) hash_array[i] = 0;

	//quadratic probing
	for (int i = 0; i < num_count; i++) {
		//the amount to square and add to increment for quadratic probing
		int increase = 1; 
		int hash_result = all_nums[i] % hash_array_size;
		while (hash_result < hash_array_size) {
			if (! hash_array[hash_result]) {
				hash_array[hash_result] = all_nums[i];
				break;
			}
			hash_result += (increase * increase);
			increase++;
			collisions++;
		}
	}

	//printing
	for (int i = 0; i < hash_array_size; i++) {
		cout << hash_array[i] << " ";
	}
	cout << endl;
	cout << "Collisions with quadratic probing: " << collisions << endl;
	
	//resetting
	collisions = 0;
	for (int i = 0; i < hash_array_size; i++) hash_array[i] = 0;

	//with double hashing
	for (int i = 0; i < num_count; i++) {
		int hash_result = all_nums[i] % hash_array_size;
		if (! hash_array[hash_result]) {
			hash_array[hash_result] = all_nums[i];
		}
		else {
			collisions++;
			if ((hash_result + 1 + all_nums[i] % 7) < hash_array_size) {
				hash_result = 1 + all_nums[i] % 7;
			}
			else {
				hash_array[hash_result] = all_nums[i];
				continue;
			}
			if (hash_array[hash_result]) {
				collisions++;
			}
			hash_array[hash_result] = all_nums[i];
		}
	}

	//printing
	for (int i = 0; i < hash_array_size; i++) {
		cout << hash_array[i] << " ";
	}
	cout << endl;
	cout << "Collisions with  double hashing: " << collisions << endl;

	return 0;
}
