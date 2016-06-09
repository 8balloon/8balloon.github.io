#include <iostream>
#include <string>
#include <fstream>
#include <vector>
#include "Document.hpp"
#include "SelectionSort.hpp"
#include "BubbleSort.hpp"
#include "MergeSort.hpp"
#include <time.h>
#include <sys/time.h>

using namespace std;


int main() {
	string fileNames[] = {"article_1.txt", "article_2.txt", "article_3.txt", "article_4.txt", "article_5.txt"};
	int fileNamesLength = 5;

	//5 files x 3 start/stop pairs
	long int times[5][6];

	for (int docNum = 0; docNum < fileNamesLength; docNum++) {


	Document *a1 = new Document(fileNames[docNum]);
	for (int i = 0; i < a1->wordCount; i++) {
		cout << a1->arr[i] << " ";
	}
	cout << endl << endl;

//SELECTION SORT
//create time thing
	struct timeval tp;

	gettimeofday(&tp, NULL);
	//initialize timer varialbe
	long int ms = tp.tv_sec * 1000 + tp.tv_usec / 1000;
	times[docNum][0] = ms;
	SelectionSort(a1->arr, a1->wordCount);
	gettimeofday(&tp, NULL);
	ms = tp.tv_sec * 1000 + tp.tv_usec / 1000;
	times[docNum][1] = ms;
	
	for (int i = 0; i < a1->wordCount; i++) {
		cout << a1->arr[i] << " ";
	}
	cout << endl << endl;

	a1->reset();

//BUBBLE SORT
	
	gettimeofday(&tp, NULL);
	ms = tp.tv_sec * 1000 + tp.tv_usec / 1000;
	times[docNum][2] = ms;
	BubbleSort(a1->arr, a1->wordCount);
	gettimeofday(&tp, NULL);
	ms = tp.tv_sec * 1000 + tp.tv_usec / 1000;
	times[docNum][3] = ms;

	for (int i = 0; i < a1->wordCount; i++) {
		cout << a1->arr[i] << " ";
	}
	cout << endl << endl;

	a1->reset();

//MERGE SORT
	vector<string> a1v;
	for (int i = 0; i < a1->wordCount; i++) {
		a1v.push_back(a1->arr[i]);
	}


	gettimeofday(&tp, NULL);
	ms = tp.tv_sec * 1000 + tp.tv_usec / 1000;
	times[docNum][4] = ms;
	a1v = merge_sort(a1v);
	gettimeofday(&tp, NULL);
	ms = tp.tv_sec * 1000 + tp.tv_usec / 1000;
	times[docNum][5] = ms;
	for (int i = 0; i < a1->wordCount; i++) {
		cout << a1v[i] << " ";
	}
	cout << endl << endl;
	
	
	}

	for (int i = 0; i < fileNamesLength; i++) {
		cout << "FILE " << fileNames[i] << endl;
		cout << "Selection sort: " << times[i][1] - times[i][0] << "  ";
		cout << "Bubble sort: " << times[i][3] - times[i][2] << "  ";
		cout << "Merge sort: " << times[i][5] - times[i][4] << "  ";
		cout << endl;
	}
	

	return 0;
}
