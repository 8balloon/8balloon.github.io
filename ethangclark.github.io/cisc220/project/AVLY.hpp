#ifndef AVLY_HPP_
#define AVLY_HPP_

#include <string>
#include "NodeTY.hpp"

/*
Model for an AVL tree of words, using NodeTY nodes.
*/

class AVLY {
	bool rotate_left(NodeTY *old_root);
	bool rotate_right(NodeTY *old_root);

	void in_order_print();
	void in_order_print(NodeTY *start_at);

	static bool is_ordered_before(std::string new_string, 
			std::string old_string);

	public:
		NodeTY *root;
		void insert(NodeTY *to_insert);
		void insert(NodeTY *to_insert, NodeTY *insert_at);
		void print();
		void print(NodeTY *start_at);
		bool search(std::string s);
		bool search(std::string s, NodeTY* start_at);


		AVLY();
		~AVLY();

		static void test();
};

#endif /* AVLY_HPP_ */
