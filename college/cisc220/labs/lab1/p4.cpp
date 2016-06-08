//Ethan Clark
//CISC220-022L
//Problem 4

#include <iostream>
#include <stdlib.h>

using namespace std;



int main() {
	
	//gets number
	cout << "Enter a natural positive number" << endl;
	int number;
	string temp;
	cin >> temp;
	number = atoi(temp.c_str());

	//counter for number of iterations
	int counter;
	//main loop
	while (number != 1) {
		//if odd
		if (number % 2) {
			number = number * 3 + 1;
		}
		//if even
		else {
			number = number / 2;
		}
		//count iteration
		counter++;
	}

	//prints number of loops
	cout << "Required " << counter << " steps to reach 1." << endl;

	return 0;
}
