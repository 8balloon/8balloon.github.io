#ifndef LL_HPP_
#define LL_HPP_

#include "Node.hpp"

class LL {
		Node *first;
		Node *last;
		int currsize;
		int timestamp;
	public: 
		LL(); //constructor
		~LL(); //destructor
		int size(); //returns size
		void push(); //adds new node to end
		void remove(Node *n); //removes node n from list

		Node *findPriority(int x); //finds first node w/priority x and returns it
		void updatePriority(); //increases the priority of nodes in the first third of the list
		void printList(); //prints the whole list
};

#endif /* LL_HPP_ */
