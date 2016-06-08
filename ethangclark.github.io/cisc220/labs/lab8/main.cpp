#include <string>
#include <fstream>
#include <stdlib.h>
#include <iostream>
#include "HeapArray.hpp"
#include "HeapTree.hpp"

#define HEAPSIZE 13

using namespace std;

int *load() {
	//heapnums2.txt
	string infile = "heapnums2.txt";
	ifstream file(infile.c_str());
	int *numbers = new int[HEAPSIZE];
	for (int i = 0; i < HEAPSIZE; i++) {
		file >> numbers[i];
		//cout << numbers[i] << endl;
	}
	file.close();
	return numbers;
}


int main() {
	int *numbers = load();

	HeapArray *HA = new HeapArray(HEAPSIZE);
	for (int i = 0; i < HEAPSIZE; i++) {
		HA->insert(numbers[i]);
		//cout << numbers[i] << endl;
	}
	cout << endl << "Original list in HeapArray: " << endl;
	HA->print();
	cout << endl;
	cout << "After deletion 1, then 2, then 3: " << endl;
	HA->del();
	HA->print();
	HA->del();
	HA->print();
	HA->del();
	HA->print();

	cout << endl << endl;


	HeapTree *HT = new HeapTree;
	for (int i = 0; i < HEAPSIZE; i++) {
		NodeHeap *foo = new NodeHeap(numbers[i]);
		HT->insert(foo);
	}
	cout << "Original list in HeapTree: " << endl;
	HT->print();
	cout << endl;
	cout << "After deletion 1, then 2, then 3: " << endl;
	HT->del();
	HT->print();
	HT->del();
	HT->print();
	HT->del();
	HT->print();
	cout << endl << endl;

	HeapArray *SixHeap = new HeapArray(6);
	for (int i = 0; i < 6; i++) {
		SixHeap->insert(numbers[i]);
	}
	for (int i = 6; i < HEAPSIZE; i++) {
		if (numbers[i] < SixHeap->mainArray[0]) {
			SixHeap->del();
			SixHeap->insert(numbers[i]);
		}
	}
	cout << "Sixth smallest number: " << SixHeap->mainArray[0] << endl;


	return 0;
}
