#ifndef NODE_HPP_
#define NODE_HPP_

class Node {
	/*model of a node.
	NOTE: friend means private traits accessible by friend.
	*/
		friend class LL;
		int data;
		int priority;
		Node *next;
	public:
		Node(int x, int y);
		Node(int x);
		~Node();
		void printNode();
};

#endif /* NODE_HPP_ */
