#include "SelectionSort.hpp"

#include <string>

using namespace std;

void SelectionSort(string *arr, int length) {
	string *ret = new string[length];
	string foo;
	for (int i = 0; i < length; i++) {
		for (int j = i; j < length; j++) {
			if (arr[j] < arr[i]) {
				foo = arr[i];
				arr[i] = arr[j];
				arr[j] = foo;
			}
		}
	}
}
