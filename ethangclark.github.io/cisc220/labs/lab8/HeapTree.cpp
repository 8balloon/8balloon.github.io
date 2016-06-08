#include "HeapTree.hpp"
#include <iostream>

using namespace std;

HeapTree::HeapTree() {
	root = 0;
	last = 0;
}

HeapTree::~HeapTree() {
//need to write this after ::del is written
}

void HeapTree::insert(NodeHeap *in) {
	if (!root) {
		root = in;
		last = in;
		return;
	}
	else {
		if (last->parent) {
			if (last->parent->right_child) {
				if (last->parent->right) {
					last->parent->right->left_child = in;
					last->right = in;
					in->left = last;
					in->parent = last->parent->right;
				}
				else {
					NodeHeap *foo = root;
					while (foo->left_child) {
						foo = foo->left_child;
					}
					foo->left_child = in;
					in->parent = foo;
				}
			}
			else {
				last->parent->right_child = in;
				last->right = in;
				in->left = last;
				in->parent = last->parent;
			}
		}
		else {
			last->left_child = in;
			in->parent = last;
		}
		last = in;
		//begin bubbling
		NodeHeap *foo = in;
		while (foo->parent) {
			if (foo->parent->number < foo->number) {
				int foo_val = foo->number;
				foo->number = foo->parent->number;
				foo->parent->number = foo_val;
				foo = foo->parent;
			}
			else {
				break;
			}
		}
	}
}

void HeapTree::del() {
	int foo = last->number;

	if (last->parent) {
		if (last->parent->right_child) {
			last->parent->right_child = 0;
		}
		else last->parent->left_child = 0;
	}
	if (last->left) {
		last = last->left;
		last->right = 0;
	}
	else if (last->parent) {
		last = last->parent;
		last->left_child = 0;
		if (last->right) {
			while (last->right) {
				last = last->right;
			}
		}
	}
	else {
		root = 0;
		last = 0;
		return;
	}
	
	root->number = foo;
	NodeHeap *node_to_check = root;
	while (node_to_check->left_child && node_to_check->right_child) {
		if ((node_to_check->left_child->number > node_to_check->number) || (node_to_check->right_child->number > node_to_check->number)) {
			if (node_to_check->left_child->number > node_to_check->right_child->number) {
				int foo2 = node_to_check->number;
				node_to_check->number = node_to_check->left_child->number;
				node_to_check->left_child->number = foo2;
				node_to_check = node_to_check->left_child;
			}
			else {
				int foo2 = node_to_check->number;
				node_to_check->number = node_to_check->right_child->number;
				node_to_check->right_child->number = foo2;
				node_to_check = node_to_check->right_child;
			}
		}
	}
	if (node_to_check->left_child) {
		if (node_to_check->left_child->number > node_to_check->number) {
			int foo2 = node_to_check->number;
			node_to_check->number = node_to_check->left_child->number;
			node_to_check->left_child->number = foo2;
		}
	}
}

void HeapTree::print() {
	if (root) {
		print(root);
	}
	cout << endl;
}
void HeapTree::print(NodeHeap *to_print) {
	if (to_print->left_child) {
		print(to_print->left_child);
	}
	cout << to_print->number << " ";
	if (to_print->right_child) {
		print(to_print->right_child);
	}
}
