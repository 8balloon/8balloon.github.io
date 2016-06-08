#include "LL.hpp"
#include "Node.hpp"
#include <iostream>
#include <stdlib.h>
#include <time.h>
using namespace std;
int main() {

	srand(time(NULL));
	LL list;
	for (int i = 0; i < 5; i++){
		list.push();
	}
	list.printList();
	int k = 0;
	for (int i = 0; i < 50; i++) {
		int x = rand() %2;
		if (x == 0) {
			cout << "Removing a node: " << endl;
			Node *rnode = NULL;
			int currpriority = 1;
			if (list.size() > 0) {
				while (rnode == NULL ) {
					rnode = list.findPriority(currpriority);
					currpriority ++;
				}
				list.remove(rnode);
				list.printList();
			}
		}
		else {
			cout << "Adding a node: " << endl;
			list.push();
			list.printList();
		}
		k++;
		if (k == 5) {
			cout << "Updating priorities for waiting longest: " << endl;
			list.updatePriority();
			list.printList();
			k = 0;
		}
	}
return 0;
}
