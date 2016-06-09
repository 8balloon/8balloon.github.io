#include <string>
#include "BubbleSort.hpp"

using namespace std;

void BubbleSort(string *arr, int length) {
	int end = length;
	bool hasBubbled = false;
	string foo;
	for (int i = 0; i < length; i++) {
		int j = 0;
		while (j < end) {
			if (arr[j] > arr[j+1]) {
				foo = arr[j+1];
				arr[j+1] = arr[j];
				arr[j] = foo;
				hasBubbled = true;
			}
			j++;
		}
		end--;
		if (! hasBubbled) break;
	}
}
