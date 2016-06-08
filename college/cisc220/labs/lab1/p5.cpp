//Ethan Clark
//CISC220-022L
//Problem 5

#include <iostream>
#include <stdlib.h>

using namespace std;

int main() {

	//gets input
	int number;
	string temp;
	cout << "Enter a number" << endl;
	
	//casts input to integer
	cin >> temp;
	number = atoi(temp.c_str());

	//prints first row
	for (int i = 0; i < number - 1; i++) {
		cout << " ";
	}
	cout << "1";
	for (int i = 0; i < number - 1; i++) {
		cout << " ";
	}
	cout << endl;

	//prints intermediate rows
	for (int row = 2; row < number; row++) {
		//left side
		for (int leftSide = 0; leftSide < number - row; leftSide++) {
			cout << " ";
		}
		//left number
		cout << row;
		//middle part
		for (int mid = 0; mid < 2 * row - 3; mid++) {
			cout << " ";
		}
		//right number -- no need for spaces afterwards
		cout << row << endl;
	}

	//bottom part of pyramid
	for (int bot = 0; bot < 2 * number - 1; bot++) {
		cout << number;
	}
	cout << endl;


	return 0;
}
