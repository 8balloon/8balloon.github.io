#ifndef HEAPTREE_HPP_
#define HEAPTREE_HPP_

#include "NodeHeap.hpp"

class HeapTree {
	NodeHeap* root;
	NodeHeap* last;
	
	public:
		void insert(NodeHeap* in);
		void del();
		void print();
		void print(NodeHeap* to_print);

		HeapTree();
		~HeapTree();
};

#endif /* HEAPTREE_HPP_ */
