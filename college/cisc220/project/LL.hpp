#ifndef LL_HPP_
#define LL_HPP_

#include "NodeL.hpp"
//#include <string>

/*
A linked list using the NodeL node.
*/

class LL {
	NodeL *first;
	NodeL *last;
	int length;

	public:
		NodeL* get_first();
		NodeL* get_last();
		int get_length();
		void push(NodeL* to_push);
		NodeL* pop();
		LL();
		~LL();
};

#endif /* LL_HPP_ */
