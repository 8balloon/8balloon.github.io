#include "NodeTY.hpp"
#include "AVLY.hpp"
#include <string>
#include <iostream>

using namespace std;

AVLY::AVLY() {
	root = NULL;
}

AVLY::~AVLY() {
}

int AVLY::get_balance(NodeTY* target_root) {
	if (target_root->left_child && target_root->right_child) {
		return target_root->left_child->height - target_root->right_child->height;
	}
	else if (target_root->left_child) {
		return target_root->left_child->height;
	}
	else if (target_root->right_child) {
		return -1 * target_root->right_child->height;
	}
	else {
		return 0;
	}
	return 0;
}

void AVLY::insert(NodeTY *to_insert) {
	insert(to_insert, root);
}
void AVLY::insert(NodeTY *to_insert, NodeTY *insert_at) {
	if (root == NULL) {
		root = to_insert;
		return;
	}
	if (is_ordered_before(to_insert->word, insert_at->word)) {
		if (insert_at->left_child == NULL) {
			insert_at->left_child = to_insert;
			to_insert->parent = insert_at;

			//increase height of ancestry chain
			NodeTY *temp = to_insert;
			while (temp->parent != NULL) {
				if (temp->parent->height <= temp->height) {
					temp->parent->height = temp->height + 1;
					//!!!
					//balance(temp->parent);
					balance(temp);
					temp = temp->parent;
				}
				else break;
			}
		}
		else {
			insert(to_insert, insert_at->left_child);
		}
	}
	else {
		if (insert_at->right_child == NULL) {
			insert_at->right_child = to_insert;
			to_insert->parent = insert_at;
			
			//increase height of ancestry chain
			NodeTY *temp = to_insert;
			while (temp->parent != NULL) {
				if (temp->parent->height <= temp->height) {
					temp->parent->height = temp->height + 1;
					//!!!
					//balance(temp->parent);
					balance(temp);
					temp = temp->parent; }
				else break;
			}
		}
		else {
			insert(to_insert, insert_at->right_child);
		}
	}
}

bool AVLY::is_ordered_before(string new_string, string old_string) {
	/*
	Checks whether new_string should be placed to the left or
	to the right of the old_string in the tree.
	Pre-alphabetical words go to left, post-alphabetical go
	to the right.
	*/
	if (new_string == old_string) {
		//cout << "Error! This string has already been inserted: " << new_string << endl;
		return NULL;
	}
	bool ret = (new_string.length() < old_string.length() ? true : false);
	int max = (ret == true ? new_string.length() : old_string.length());

	for (int i = 0; i < max; i++) {
		if (new_string[i] < old_string[i]) {
			ret = true;
			break;
		}
		else if (new_string[i] > old_string[i]) {
			ret = false;
			break;
		}
	}
	return ret;
}

void AVLY::print() {
	print(root);
}
void AVLY::print(NodeTY *start_at) {
	if (start_at == NULL) {
		return;
	}
	print(start_at->left_child);
	cout << start_at->word << endl;
	print(start_at->right_child);
}

void AVLY::in_order_print() {
	in_order_print(root);
}
void AVLY::in_order_print(NodeTY *start_at) {
	if (start_at == NULL) {
		return;
	}
	cout << start_at->word << endl;
	in_order_print(start_at->left_child);
	in_order_print(start_at->right_child);
}

bool AVLY::search(string s) {
	return search(s, root);
}
bool AVLY::search(string s, NodeTY* start_at) {
	if (start_at == NULL) {
		return false;
	}
	else if (start_at->word == s) {
		return true;
	}
	else {
		if (search(s, start_at->left_child) || search(s, start_at->right_child)) {
			return true;
		}
		else {
			return false;
		}
	}
}
	
bool AVLY::rotate_left(NodeTY *old_root) {
	if (!old_root->right_child) {
		return false;
	}
	NodeTY *temp = old_root->right_child;
	old_root->right_child = temp->left_child;
	temp->left_child = old_root;
	
	//parent fixing
	temp->parent = old_root->parent;
	old_root->parent = temp;
	if (old_root->right_child) {
		old_root->right_child->parent = old_root;
	}

	//height fixing for old_root
	if (old_root->left_child && old_root->right_child) {
		if (old_root->left_child->height >= old_root->right_child->height) {
			old_root->height = old_root->left_child->height + 1;
		}
		else old_root->height = old_root->right_child->height + 1;
	}
	else {
		if (old_root->left_child) {
			old_root->height = old_root->left_child->height + 1;
		}
		else if (old_root->right_child) {
			old_root->height = old_root->right_child->height + 1;
		}
	}
	//height fixing for temp (new root)
	if (temp->left_child && temp->right_child) {
		if (temp->left_child->height >= temp->right_child->height) {
			temp->height = temp->left_child->height + 1;
		}
		else temp->height = temp->right_child->height + 1;
	}
	else {
		if (temp->left_child) {
			temp->height = temp->left_child->height + 1;
		}
		else if (temp->right_child) {
			temp->height = temp->right_child->height + 1;
		}
	}

	//root fix (if old root was tree's root)
	if (root == old_root) root = temp;

	return true;
}

bool AVLY::rotate_right(NodeTY *old_root) {
	//if (!(old_root->left_child && old_root->left_child->right_child)) {
	if (!old_root->left_child) {
		return false;
	}
	NodeTY *temp = old_root->left_child;
	old_root->left_child = temp->right_child;
	temp->right_child = old_root;
	
	//parent fixing
	temp->parent = old_root->parent;
	old_root->parent = temp;
	if (old_root->left_child) {
		old_root->left_child->parent = old_root;
	}

	//height fixing for old_root
	if (old_root->left_child && old_root->right_child) {
		if (old_root->left_child->height >= old_root->right_child->height) {
			old_root->height = old_root->left_child->height + 1;
		}
		else old_root->height = old_root->right_child->height + 1;
	}
	else {
		if (old_root->left_child) {
			old_root->height = old_root->left_child->height + 1;
		}
		else if (old_root->right_child) {
			old_root->height = old_root->right_child->height + 1;
		}
	}
	//height fixing for temp (new root)
	if (temp->left_child && temp->right_child) {
		if (temp->left_child->height >= temp->right_child->height) {
			temp->height = temp->left_child->height + 1;
		}
		else temp->height = temp->right_child->height + 1;
	}
	else {
		if (temp->left_child) {
			temp->height = temp->left_child->height + 1;
		}
		else if (temp->right_child) {
			temp->height = temp->right_child->height + 1;
		}
	}

	//root fix (if old root was tree's root)
	if (root == old_root) root = temp;

	return true;
}

void AVLY::balance(NodeTY *target_root) {
	int bal = get_balance(target_root);
	if (bal < 2 && bal > -2) {
		cout << bal << endl;
		return;
	}
	else {
		if (bal >= 2) {
			cout << bal << endl;
			//this conditional is alrady implied.
			//this is just for safety.
			if (target_root->left_child) {
				//!!!
				//cout << "Balance: " << bal << " left child balance: " << get_balance(target_root->left_child) << endl;
				if (get_balance(target_root->left_child) < 0) {
					rotate_left(target_root->left_child);
					balance(target_root);
				}
				/*
				else {
					rotate_right(target_root);
				}
				*/
			}
			rotate_right(target_root);
		}
		else if (bal <= -2) {
			cout << bal << endl;
			//this conditional is also already implied.
			//so: also just for safety.
			if (target_root->right_child) {
				//!!!
				//cout << "Balance: " << bal << " right child balance: " << get_balance(target_root->right_child) << endl;
				if (get_balance(target_root->right_child) > 0) {
					rotate_right(target_root->right_child);
					balance(target_root);
				}
				/*
				else {
					rotate_left(target_root);
				}
				*/
			}
			rotate_left(target_root);
		}
	}
}

void AVLY::test() {

	AVLY *tree = new AVLY;
	tree->root = new NodeTY("first_root");
	tree->root->left_child = new NodeTY("left_child");
	tree->root->right_child = new NodeTY("right_child");
	tree->root->left_child->left_child = new NodeTY("l_grandchild");
	tree->root->left_child->left_child->left_child = new NodeTY("l_great_child");

	/*
	Tests of AVLY::search(string)
	*/
	cout << "SEARCH TESTS" << endl;
	cout << "Tree search for \"first_root\": " 
			<< tree->search("first_root", tree->root) << endl; //true
	cout << "Tree search for \"left_child\": " 
			<< tree->search("left_child", tree->root) << endl; //true
	cout << "Tree search for \"right_child\": " 
			<< tree->search("right_child", tree->root) << endl; //true
	cout << "Tree search for \"not_in_tree\": "
			<< tree->search("not_in_tree", tree->root) << endl; //false

	/*
	Test of AVLY::print
	*/
	cout << endl << "Printing (pre-order): " << endl;
	tree->print(tree->root);

	//Tests of AVLY::is_ordered_before
	/*
	cout << endl;
	cout << "ORDERING TESTS" << endl;
	cout << "does \"dog\" go before \"cat\"? : " 
			<< AVLY::is_ordered_before("dog", "cat") << endl;
	cout << "does \"kitten\" come before \"puppy\"? : " 
			<< AVLY::is_ordered_before("kitten", "puppy") << endl;
	cout << "does \"a\" come before \"a\"? : " 
			<< AVLY::is_ordered_before("a", "a") << endl;
	cout << "does \"skunk\" come before \"skunks\"? : " 
			<< AVLY::is_ordered_before("skunk", "skunks") << endl;
	cout << "does \"otters\" come before \"otter\"? : "
			<< AVLY::is_ordered_before("otters", "otter") << endl;
	cout << "does \"\" come before \"z\"? : "
			<< AVLY::is_ordered_before("", "z") << endl;
	cout << "does \"s\" come before \"\"? : "
			<< AVLY::is_ordered_before("s", "") << endl;
	*/

	/*
	Tests of AVLY::insert
	*/
	/*
	cout << endl;
	cout << "INSERTION TESTS" << endl;
	AVLY *tree2 = new AVLY;
	NodeTY *first_insert = new NodeTY("first_insert");
	tree2->insert(first_insert, tree2->root);
	cout << "FIRST INSERT WORD: " << first_insert->word << endl;
	cout << "TREE2: Root: " << tree2->root->word << endl;

	cout << "first insert: " << first_insert << endl;
	cout << "Tree2 root location: " << tree2->root << endl;
	
	NodeTY *second_insert = new NodeTY("second_insert");
	tree2->insert(second_insert);

	NodeTY *third_insert = new NodeTY("ggggg");
	tree2->insert(third_insert);
	cout << "After third insertion (of \"ggggg\" node): " << endl;
	tree2->print();

	cout << "first insert again: " << first_insert << endl;
	cout << "root location: " << tree2->root << endl;
	cout << "respective words: " << first_insert->word << " "
			<< tree2->root->word << endl;

	//Rotation test
	cout << endl;
	cout << "ROTATION TEST" << endl;
	cout << "tree2: " << tree2->root << endl;
	cout << "BEFORE: " << endl;
	cout << "tree2: root: " << tree2->root->word << endl;
	cout << "lc: " << tree2->root->left_child << endl;
	cout << "rc: " << tree2->root->right_child << endl;
	cout << "rc word: " << tree2->root->right_child->word << endl;
	tree2->rotate_left(tree2->root);
	tree2->print();

	cout << endl;
	cout << "IN ORDER PRINTING" << endl;
	cout << "tree1: " << endl;
	tree->in_order_print();
	cout << "tree2: " << endl;
	tree2->in_order_print();
	*/

	/*
	Beginning general testing
	*/
	cout << endl << "GENERAL TESTING" << endl;
	AVLY *tree3 = new AVLY;
	string test_words[] = {"the", "quick", "brown", "fox", "jumps",
			"over", "the", "lazy", "dog", "in", "the", "nation",
			"of", "our", "fathers"};
	int test_words_length = 15;
	for (int i = 0; i < test_words_length; i++) {
		NodeTY *temp = new NodeTY(test_words[i]);
		tree3->insert(temp);
	}
	cout << "Printing (pre-order)" << endl;
	tree3->print();
	cout << endl;
	cout << "Printing (in-order)" << endl;
	tree3->in_order_print();
	string check_words[] = {"four", "score", "and", "seven", "years",
			"ago", "our", "fathers", "brought", "forth", "on", "this",
			"continent", "a", "new", "nation"};
	int check_words_length = 16;
	/*
	for (int i = 0; i < check_words_length; i++) {
		cout << check_words[i] << " in test_words? : "
					<< tree3->search(check_words[i]) << endl;
	}
	*/

	cout << "	rclc: " << tree3->root->right_child->left_child << endl;
	cout << "	rcrc: " << tree3->root->right_child->right_child->word << endl;
	cout << "	lclclc: " << tree3->root->left_child->left_child->left_child << endl;
	cout << "	lclcrc: " << tree3->root->left_child->left_child->right_child << endl;
	cout << "	rcrclc: " << tree3->root->right_child->right_child->left_child << endl;
	cout << "	rcrcrc: " << tree3->root->right_child->right_child->right_child << endl;

	cout << "Rotating tree left: " << tree3->rotate_left(tree3->root) << endl;
	cout << "Rotating tree right: " << tree3->rotate_right(tree3->root) << endl;

	cout << "Printing (pre-order)" << endl;
	tree3->print();
	cout << endl;
	cout << "Printing (in-order)" << endl;
	tree3->in_order_print();

	cout << "BALANCE TEST" << endl;
	cout << tree3->get_balance(tree3->root) << endl;
	cout << "AFTER BALANCING:" << endl;
	tree3->balance(tree3->root);
	cout << tree3->get_balance(tree3->root) << endl;
}

int main() {
	AVLY::test();
	return 0;
}
