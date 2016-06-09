#include "LL.hpp"
#include "NodeL.hpp"
#include <iostream>
#include <string>

using namespace std;

/*
Method implementatons for "LL" class
*/

LL::LL() {
	first = NULL;
	last = NULL;
	length = 0;
}

LL::~LL() {
}

NodeL* LL::get_first() {
	return first;
}

NodeL* LL::get_last() {
	return last;
}

int LL::get_length() {
	return length;
}

void LL::push(NodeL* to_push) {
	//NodeL* to_push = new NodeL(s);
	
	if (first && last) {
		last->next = to_push;
		to_push->prev = last;
		last = to_push;
		length++;
	}
	else {
		first = to_push;
		last = to_push;
		length = 1;
	}
}

NodeL* LL::pop() {
	if (length > 2) {
		NodeL *temp = last;
		last = last->prev;
		last->next = NULL;
		length--;
		return temp;
	}
	else if (length == 2) {
		NodeL *temp = last;
		last = first;
		last->next = NULL;
		length--;
		return temp;
	}
	else if (length == 1) {
		NodeL *temp = last;
		last = NULL;
		first = NULL;
		length = 0;
		return temp;
	}
	else if (length == 0) {
		return NULL;
	}
	else {
		cout << "Error! List cannot have negative length" << endl;
		return NULL;
	}
}

// Some tests using two nodes, foo and foo2 with word field values "dog" and "cat"
/*
int main() {
	LL g;
	cout << "Length with no nodes: " << g.get_length() << endl;
	NodeL *foo = new NodeL("dog");
	g.push(foo);
	cout << "Length with only \"dog\" node added: " << g.get_length() << endl;
	cout << "Word field of first node in list of only dog node: " << 
			g.get_first()->word << endl;
	cout << "Word field of last node in list of only dog node: " <<
			g.get_last()->word << endl;
	NodeL *foo2 = new NodeL("cat");
	g.push(foo2);
	NodeL *foo3 = new NodeL("goat");
	g.push(foo3);
	cout << "Length after adding \"cat\" and \"goat\" nodes: " 
			<< g.get_length() << endl;
	cout << "Return value ->word of popping \"goat\" node: " 
			<< g.pop()->word << endl;
	cout << "Length after popping \"goat\" node: " 
			<< g.get_length() << endl;

	//Main test
	LL test_LL;
	string test_strings[] = {"the", "quick", "brown", "fox", "jumped", "over",
			"the", "lazy", "dog"};
	int test_strings_length = 9;
	for (int i = 0; i < test_strings_length; i++) {
		NodeL *foo4 = new NodeL(test_strings[i]);
		test_LL.push(foo4);
	}
	cout << "test_LL length: " << test_LL.get_length() << endl;
	cout << "Last: " << test_LL.get_last()->word << endl;
	for (int i = 0; i < test_strings_length; i++) {
		//cout << "Word: " << test_LL.pop()->word << endl;
		cout << "Word: " << test_LL.pop()->word << endl;
	}
	return 0;
}
*/
