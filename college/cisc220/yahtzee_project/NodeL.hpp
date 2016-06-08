#ifndef NODEL_HPP_
#define NODEL_HPP_

#include <string>

/*
A node for a doubly linked list
*/
struct NodeL {
	NodeL *next;
	NodeL *prev;
	std::string word;

	NodeL(std::string s);
	~NodeL();
};

#endif /* NODEL_HPP_ */
