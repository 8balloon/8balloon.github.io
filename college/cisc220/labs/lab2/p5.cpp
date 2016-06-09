//Ethan Clark
//CISC220-022L
//Problem 5

#include <iostream>
#include "Problem4.h"

using namespace std;

int main() {

	//creating main array of characters
	int arrayLength = 14;
	char mainArray[] = {'h','e','l','l','o',',',' ','d','a','r','l','i','n','g'};

	//printing main array
	for (int i = 0; i < arrayLength; i++) {
		cout << mainArray[i];
	}
	cout << endl;

	//creating new array using Problem5 (defined in Problem4.h)
	//NOTE: this function changes the value of arrayLength to indicate the len of new array
	char* newArray = Problem5(mainArray, 'l', &arrayLength);
	for (int i = 0; i < arrayLength; i++) {
		cout << newArray[i];
	}
	cout << endl;

	return 0;

}
