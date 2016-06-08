#ifndef NODETY_HPP_
#define NODETY_HPP_

#include <string>

/*
Model for a node to be used in an AVL tree.
Each node holds a word, and the tree as a whole will hold a dictionary.
See AVLY files for details on tree implementation.
*/

struct NodeTY {
	NodeTY *parent;
	NodeTY *left_child;
	NodeTY *right_child;
	std::string word;
	int height;

	NodeTY(std::string s);
	~NodeTY();
};

#endif /* NODETY_HPP_ */
