#include <iostream>
//the '#' means 'do first'
#define MIN(X,Y) ((X) < (Y) ? (X) : (Y))

using namespace std;

int main() {
	//std::cout, std::end1
	cout << "Hello." << endl;
	//endl "flushes everything in the pipe"
		//aka "executes" the cout function instead of waiting till the last possible minute
		//...so you can catch errors in the right place.
	string response;
	cin >> response;
	cout << "Your name is " << response << endl;
	unsigned int foo = ~0;
	cout << "This is the largest int: " << foo << endl;
	


	//ENUMERATED TYPES
enum names_t {bob,anne,bert,bertha};
//bob is constant 0, anne is constant 1, etc.
//enum newNames {bob=21,anne=24,bert=23,bertha=21};
		//above DOESN"T work because enums are like variables and have to be unique
names_t frank = bob;
frank = anne;

	return 0;
}

