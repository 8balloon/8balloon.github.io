#include "Node.hpp"
#include <stdlib.h>
#include <iostream>

using namespace std;

Node::Node(int i, double d) {
    pointerToInt = new int(i);
    dub = d;
    next = NULL;
    prev = NULL;
}

Node::Node(int i) {
    pointerToInt = new int(i);
    dub = 0.0;
    next = NULL;
    prev = NULL;
}

Node::Node() {
    pointerToInt = new int(0);
    dub = 0.0;
    next = NULL;
    prev = NULL;
}

int main() {
		/*
	Node *zero = new Node();
	Node *one = new Node(1);
	Node *two = new Node(2.3, 7.2);
	cout << "Zero: " << "int pointer dereference: " << *(zero->pointerToInt) << endl;
	cout << "Zero: " << "double: " << zero->dub << endl;
	cout << "One: " << "int pointer dereference: " << *(one->pointerToInt) << endl;
	cout << "One: " << "double: " << one->dub << endl;
	cout << "Two: " << "int pointer dereference: " << *(two->pointerToInt) << endl;
	cout << "Two: " << "double: " << two->dub << endl;
    return 0;
	*/
}
