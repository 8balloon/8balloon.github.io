#include "NodeHeap.hpp"
#include <iostream>

//using namespace std;

NodeHeap::NodeHeap() {
	parent = 0;
	left = 0;
	right = 0;
	left_child = 0;
	right_child = 0;
	number = 0;
}

NodeHeap::NodeHeap(int num) {
	parent = 0;
	right = 0;
	left_child = 0;
	right_child = 0;
	number = num;
}

NodeHeap::~NodeHeap(){
}
