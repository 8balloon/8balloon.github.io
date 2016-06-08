#include <iostream>

using namespace std;

struct LL {
	int data;
	LL *next;
};

int main() {
	LL *first = new LL;
	first->data = 1;
	first->next = new LL;
	first->next->data = 2;
	first->next->next = new LL;
	first->next->next->data = 3;
	first->next->next->next = NULL;
	
	LL *lptr = first;
	while (lptr != NULL) {
		cout<< lptr->data << " ";
		lptr = lptr->next;
	}

	cout << endl;
}
