//Ethan Clark
//CISC220-022L
//Problem 1

#include <iostream>
#include <stdlib.h>
#include <time.h>

using namespace std;

bool is_legal(int *score);
//takes score, returns bool
//indicating whether it's legal to keep playing

int main() {

	int score = 0;
	string temp;
	while (true) {
		if (is_legal(&score)) {	
			cout << "Would you like to keep playing? Yes or No" << endl;
			cin >> temp;
			if (temp != "Yes") {
				break;
			}
		}
		else {
			cout << "You lose with score " << score << endl;
		break;
		}
	}

	return 0;
}

bool is_legal(int *score) {

	//seeds random number
	srand(time(NULL));

	int newNum;
	//modulo 11 so integers <=10 can show
	newNum = rand() % 10 + 1;
	cout << "New card value: " << newNum << endl;
	cout << "Your score is " << newNum + *score << endl;
	*score += newNum;
	
	//tests legality
	if (*score <= 21) {
		return true;
	}
	else {
		return false;
	}	
}
