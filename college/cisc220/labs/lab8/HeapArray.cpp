#include "HeapArray.hpp"
#include <iostream>

using namespace std;

HeapArray::HeapArray(int s){
	size = s;
	firstEmptyIndex = 0;
	mainArray = new int[size];
}

HeapArray::~HeapArray() {
	delete [] mainArray;
}

void HeapArray::insert(int number) {
	mainArray[firstEmptyIndex] = number;
	
	int currentIndex = firstEmptyIndex;
	while (currentIndex) {
		if (mainArray[currentIndex] > mainArray[(currentIndex - 1) / 2]) {
			//cout << "bubbling " << mainArray[currentIndex] << " and " << mainArray[(currentIndex-1)/2] << endl;
			int foo = mainArray[(currentIndex - 1) / 2];
			mainArray[(currentIndex - 1) / 2] = mainArray[currentIndex];
			mainArray[currentIndex] = foo;
			currentIndex = (currentIndex - 1) / 2;
		}
		else break;
	}

	firstEmptyIndex++;
}

void HeapArray::del() {
	mainArray[0] = mainArray[firstEmptyIndex-1];
	mainArray[firstEmptyIndex-1] = 0;
	firstEmptyIndex--;

	//foo is the index of what's being bubbled down
	int foo = 0;
	//while ((foo * 2 + 1) < size) {
		while ((foo * 2 + 2) < size) {
			if (mainArray[foo] < mainArray[foo * 2 + 1] || mainArray[foo] < mainArray[foo * 2 + 2]) {
				if (mainArray[foo * 2 + 1] > mainArray[foo * 2 + 2]) {
					int foo_val = mainArray[foo];
					mainArray[foo] = mainArray[foo * 2 + 1];
					mainArray[foo * 2 + 1] = foo_val;
					foo = foo * 2 + 1;
				}
				else {
					int foo_val = mainArray[foo];
					mainArray[foo] = mainArray[foo * 2 + 2];
					mainArray[foo * 2 + 2] = foo_val;
					foo = foo * 2 + 2;
				}
			}
			else break;
		}
		/*
		if (mainArray[foo] < mainArray[foo * 2 + 1]) {	
				int foo_val = mainArray[foo];
				mainArray[foo] = mainArray[foo * 2 + 1];
				mainArray[foo * 2 + 1] = foo_val;
				foo = foo * 2 + 1;
		}
		else break;
	}*/
}

void HeapArray::print() {
	for (int i = 0; i < size; i++) {
		if (mainArray[i]) {
			cout << mainArray[i] << " ";
		}
		else break;
	}
	cout << endl;
}

