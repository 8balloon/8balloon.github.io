//Ethan Clark
//CISC220-022L
//Lab 2, problem 4

#include <iostream>
#include "Problem4.h"

using namespace std;

//extern void Problem4(char* arr, char first, char second, char arrlen);

int main() {
	//main array
	char mainArray[10] = {'e','t','h','e','n','c','l','e','r','k'};

	//prints before modification
	for (int i = 0; i < 10; i++) {
		cout << mainArray[i] << " ";
	}
	cout << endl;

	//modifies array using Problem4 function from Problem4.h
	Problem4(mainArray, 'e', 'a', 10);

	//prints array again, post-moderation
	for (int i = 0; i < 10; i++) {
		cout << mainArray[i] << " ";
	}
	cout << endl;
	
	return 0;
}
