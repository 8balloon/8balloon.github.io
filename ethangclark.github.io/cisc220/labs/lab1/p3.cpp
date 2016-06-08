//Ethan Clark
//CISC220-022L
//Problem 3

#include <iostream>
#include <stdlib.h>

using namespace std;

int main() {

	float high = 0;
	//for storing highest number
	float current;
	//for storing cin before casting to float
	string temp;
	
	//main loop
	while (true) {
		cout << "Input a number" << endl;
		cin >> temp;
		current = atof(temp.c_str());
		if (current < 0) {
			cout << "Highest number entered: " << high << endl;
			break;
		}
		if (current > high) {
			high = current;
		}
	}


	return 0;
}
