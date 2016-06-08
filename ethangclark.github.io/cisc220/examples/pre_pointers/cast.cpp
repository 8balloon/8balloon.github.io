#include <iostream>

#include <stdlib.h> 
//stdlib header

using namespace std;

int main() {

	string response;
	cin >> response;
	float x = atoi(response.c_str()); //need to convert to a c_string; atoi converts string to int
		//c_string is just an array of characters terminated by a '\0' (null character)
	cout << "This is an integer: " << x << endl;

	/*
	This doesn't work. 'a' only exist locally

	for (int a = 5; a > 0; a--)
		;
	
	cout << "Is 'a' here?   " << a << endl;
	*/

	return 0;

}
