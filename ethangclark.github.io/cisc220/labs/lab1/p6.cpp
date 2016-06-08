//Ethan Clark
//CISC220-022L
//Problem 6

#include <iostream>
#include <stdlib.h>

using namespace std;

int collatz(int number);
//returns number of iterations

int main() {

	//gets first number
	string temp;
	cout << "Enter a positive natural number" << endl;
	cin >> temp;
	int n1 = atoi(temp.c_str());
	//...and second number
	cout << "Now enter another one (that's higher than the first)" << endl;
	cin >> temp;
	int n2 = atoi(temp.c_str());

	for (n1; n1 <= n2; n1++) {
		if (collatz(n1)) {
			cout << "Collatz Conjecture is still working" << endl;
		}
	}

	return 0;
}

int collatz(int number) {

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

	return counter;
}
