//Ethan Clark
//CISC220-022L
//Problem 2

#include <iostream>
#include <stdlib.h>

using namespace std;



int main() {

	//gets weight
	cout << "Input weight in pounds" << endl;
	string in;
	cin >> in;
	float weight = atoi(in.c_str());

	//gets height
	cout << "Input height in inches" << endl;
	cin >> in;
	float height = atoi(in.c_str());

	//calculates and prints
	float bmi = (weight * 703) / (height * height);
	cout << "Your BMI is " << bmi << endl;

	return 0;
}
