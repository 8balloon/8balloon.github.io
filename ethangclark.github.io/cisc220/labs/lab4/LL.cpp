#include <iostream>
#include <stdlib.h>
using namespace std;
#include "Node.hpp"
#include "LL.hpp"

LL::LL() {
	first = NULL;
	last = NULL;
	currsize = 0;
	timestamp = 0;
}
LL::~LL() {
	if (currsize > 0) {
		Node *temp = first;
		while (temp->next != NULL) {
			first = temp->next;
			temp->next = NULL;
			delete temp;
			temp = first;
		}
		delete temp;
		first = NULL;
		last = NULL;
		timestamp = 0;
		currsize = 0;
	}
}
int LL::size() {
	return currsize;
}


// (7 pts)
void LL::push() {
/* this function creates a new Node, with the current timestamp as the data and a random
number between 1 and 3 (inclusive) as the priority, then adds the node to the end of the
list and updates the last pointer.
Note: youâll want to check to see if this is the very first node being added to the list, in
which case youâll want to create the new node, and then make sure that both the first and
the last pointer point to it.
You will also want to update the timestamp and the currsize fields of the list.
*/
	Node *n = new Node(timestamp, rand() % 3 + 1);

	if (first == NULL) {
		first = n;
		last = n;
	}
	//cout << "FIRST NODE STUFF: " << first << endl;
	//cout << "'n' STUFF" << n << endl;
	timestamp++;
	//cout << "TIMESTEMP: " << timestamp << endl;
	currsize++;
	//cout << "CURRSIZE: " << currsize << endl;
	//cout << "LASST->NEXT: " << last->next << endl;
	n->printNode();

	last->next = n;
	//cout << "Herb derp!" << endl;
	last = n;
	last->next = NULL;
	//cout << "Made it through pushing a node." << endl;
}




//(14 pts)
void LL::remove(Node *n) {
/* this method starts at the first node in the list and compares each node in the list with
the node n points to. When it finds that node in the list, it removes it from the list.
You must be concerned about a couple of cases here: what if the node is the very first node
in the list? And, if it is the first node in the list, and there is only one node in the
list, you will have an empty list and must set the first and last pointers in the list to
NULL.
Equally, if the node being removed is the last node in the list, you will need to set the
last pointer to point to the new end of the list (the node before the last node in the list.This function is tricky in one respect only: when you remove a node, you must make the node
before it in the list now point to the node after the node being removed. So if you are
removing node n, you must make the node beeore n in the listâs next pointer point to nâs
next pointer, e.g.,
Before:
Node1 -> Node2 ->Node3 ->Node n -> Node 5
During:
Node3->next = n->next
After:
Node1->Node2->Node3->Node5
This means that while you are looking for node n in the list, you must keep track of the
node BEFORE the one you are looking at to see if it is n. Otherwise, how will you be able
to set the node before nâs next pointer point to nâs next pointer?
Note: We can use == for this because we want the actual nodes to be the same, as opposed to
only caring about the data and priority of the node
Remember to decrease the current size of the list because weâve deleted one node.
*/

	if (n == first) {
	//if it's the first one on the list that's to be removed

		if (n->next == NULL) {
		//if it's also the last one of the list (len(list) == 1)...
			
			first = NULL;
			last = NULL;
			delete n;
		}
		else {
		//if it's not the last of the list but is the first
			first = first->next;
			delete n;
		}
	}
	else {
	//"cases where n is not the first node

		Node *temp = first;

		//cases where n is not the last node
		while (temp->next != last) {
			//we're going through the whole list with temp until the last node
			if (temp->next == n) {
				temp->next = n->next;
				delete n;
				break;
			}
			temp = temp->next;
		}
		
		//temp->next now equals last
		if (temp->next == n) {
			last = temp;
			delete n;
		}
	}

	currsize--;
}



//(6 pts)
Node *LL::findPriority(int x) {
/* this function takes as input a number between 1 and 3 (inclusive) and finds the first
node in the list with that priority. It returns that node.
*/
	Node *temp = first;
	while (temp->next != NULL) {
		if (temp->priority == x) {
			return temp;
		}
		else {
			temp = temp->next;
		}
	}
	
	//if it makes it all the way through finding nothing
	//...check temp one last time
	if (temp->priority == x) {
		return temp;
	}
	else {
		cout << "No node found with that priority." << endl;
		delete temp;
		return NULL;
	}		
}


//(5 pts)
void LL::updatePriority() {
/* this function updates the priority of the first third of the nodes in the list. It takes
the current size and divides it by 3 (round down). Then it goes through that many nodes,
starting at the front of the list, and updates the priority by decreasing it by 1 if it is
greater than 1 (the best priority is 1 â nodes cannot have better priorities than 1).
Thatâs it.
*/
	int numLeft = currsize / 3;
	Node *temp = first;
	while (numLeft) {
		if (temp->priority > 1) {
			temp->priority--;
		}
		if (temp->next != NULL) {
			temp = temp->next;
			numLeft--;
		}
		else {
			break;
		}
	}


}



void LL::printList() {
if (currsize > 0) {
Node *temp = first;
while (temp->next != NULL) {
temp->printNode();
cout<< "->";
temp = temp->next;
}
temp->printNode();
cout << endl;
//cout << "here" << endl;
}
cout << "leaving printList " << endl;
return;
}
