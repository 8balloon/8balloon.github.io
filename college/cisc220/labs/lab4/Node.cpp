#include "Node.hpp"
#include <iostream>
#include <stdlib.h>
using namespace std;

Node::Node(int x, int y) {
	data = x;
	priority = y;
	next = NULL;
}

Node::Node(int x) {
	data = x;
	priority = 3;
	next = NULL;
}

Node::~Node() {
	if (next != NULL) {
		cout << "Deleting this node may cause a memory leak." << endl;
	}
}

void Node::printNode() {
	cout << "|D:" << data << " P:" << priority << "|";
	return;
}
