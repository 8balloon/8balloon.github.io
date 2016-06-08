#include "NodeL.hpp"
#include <stdlib.h>
#include <string>
#include <iostream>

using namespace std;

/*
Node for a doubly-linked list.
This will be used to hold a word the user inputs.
The world will be held in the node's word" data field.
*/

NodeL::NodeL(string s) {
	next = NULL;
	prev = NULL;
	word = s;
}

NodeL::~NodeL() {
}


/*Some testing (with two nodes, "cat" and "dog")

int main() {

	NodeL *a = new NodeL("dog");
	cout << "Dog node's word: " << a->word << endl;
	NodeL *b = new NodeL("cat");
	cout << "Cat node's word: " << b->word << endl;
	a->next = b;
	cout << "Dog.next's word: " << a->next->word << endl;
	b->prev = a;
	cout<< "Cat.prev's word: " << b->prev->word << endl;

	return 0;
}
*/
