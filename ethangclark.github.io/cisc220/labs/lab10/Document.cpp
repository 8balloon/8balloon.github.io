#include <string>
#include <fstream>
#include "Document.hpp"

using namespace std;

Document::Document(string fName) {
	fileName = fName;
	wordCount = 0;
	build();
}

void Document::build() {
	ifstream ifs(fileName.c_str());

	//first find word count
	string word;
	while (!ifs.eof()) {
		ifs >> word;
		wordCount++;
	}
	ifs.close();

	//make array of strings of length wc
	//(with as many spots as there are word counts)
	arr = new string[wordCount];
	ifstream ifs2(fileName.c_str());
	wordCount = 0;
	while (!ifs2.eof()) {
		ifs2 >> word;
		arr[wordCount] = word;
		wordCount++;
	}
}

void Document::reset() {
	delete[] arr;
	//~Document();
	build();
}

Document::~Document() {
	delete[] arr;
}
