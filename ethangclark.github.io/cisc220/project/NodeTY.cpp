#include "NodeTY.hpp"
#include <string>
#include <iostream>

using namespace std;

/*
Node for use in AVL tree.
Includes a parent pointer.
*/

NodeTY::NodeTY(string s) {
	word = s;
	parent = NULL;
	left_child = NULL;
	right_child = NULL;
	height = 0;
}

NodeTY::~NodeTY() {
}

/*
Some basic tests for NodeTY.
This is a simple struct, so only a couple included.

int main() {
	NodeTY *foo = new NodeTY("dog");
	cout << "Dog node word: " << foo->word << endl;
	NodeTY *foo2 = new NodeTY("cat");
	//making "cat" node parent "dog" node
	foo2->parent = foo;
	cout << "Cat node parent word (should be dog): " << foo2->parent->word << endl;

	return 0;
}
*/
