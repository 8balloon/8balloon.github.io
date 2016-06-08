#ifndef NODEHEAP_HPP_
#define NODEHEAP_HPP_

struct NodeHeap {
	NodeHeap *parent;
	NodeHeap *left;
	NodeHeap *right;
	NodeHeap *left_child;
	NodeHeap *right_child;
	int number;

	NodeHeap(int number);
	NodeHeap();
	~NodeHeap();
};

#endif /* NODEHEAP_HPP_ */
