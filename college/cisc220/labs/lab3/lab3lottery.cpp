#include "lab3lottery.hpp"
#include <iostream>
#include <stdlib.h>
#include <time.h>

using namespace std;



Owner *makeOwner() {
//creates owner in heap, returns pointer

	//initializing and setting number of stores
	Owner *owner = new Owner;	
	owner->numStores = rand() % 10 + 1;

	owner->stores = new Store[owner->numStores];
	for (int i = 0; i < owner->numStores; i++) {
		makeStore(owner->stores + i);
		owner->totalSold += owner->stores[i].numSold;
	}

	//seting owner's total winners to [0,0,0]
	owner->totalWinners[0] = 0;
	owner->totalWinners[1] = 0;
	owner->totalWinners[2] = 0;

	return owner;
}

Store *makeStore(Store *store) {
//fills in states of PRE-EXISTING STORE!!!

	//setting number sold originally to 0
	store->numSold = 0;

	//generating unique store ID
	store->storeId = rand() % 100 + 1;

	//generating number of customers
	store->numCust = rand() % 10 + 1;

	//populating store with customers
	//first: making list of customers
	store->customers = new Customer[store->numCust];

	//calling makeCustomer on all
	for (int i = 0; i < store->numCust; i++) {
		makeCustomer(store->customers + i);
		store->numSold += store->customers[i].numTickets;
	}

	return store;
}

Customer *makeCustomer(Customer *customer) {
//fills in stats of PRE-EXISTING CUSTOMER!!!
	
	//generating unique customer ID (1-1000)
	customer->customerId = rand() % 1000 + 1;

	//generating number of tickets bought by customer (1-20)
	customer->numTickets = rand() % 20 + 1;

	//generating lottery nums for customers on lotterNums
	//...using getWinners function defined below
	customer->lotteryNums = new int *[customer->numTickets];
	for (int i = 0; i < customer->numTickets; i++) {
		customer->lotteryNums[i] = new int[3];
	}
	for (int i = 0; i < customer->numTickets; i++) {
		for (int j = 0; j < 3; j++) {
			customer->lotteryNums[i][j] = 0;
		}
		getWinners(customer->lotteryNums[i]);
	}

	return customer;
}

void getWinners(int *winners) {
	/*takes list of 3 0s and returns with 3 unique numbers
	between 0 and 9 */

	for (int i = 0; i < 3; i++) {
		winners[i] = rand() % 10;
	}
	while (winners[1] == winners[0]) {
		winners[0] = rand() % 10;
	}
	while (winners[2] == winners[0]) {
		winners[2] = rand() % 10;
	}
}

int checkWin(int *nums, int *winners) {
	/*returns the number of matching numbers from 2 lists of 3*/

	//the total number of matches between the two
	int totalMatches = 0;

	for (int i = 0; i < 3; i++) {
		for (int j = 0; j < 3; j++) {
			if (nums[i] == winners[j]) {
				totalMatches++;
				break;
			}
		}
	}

	return totalMatches;
}

void findWinners(Owner *owner, int *winner1) { //, int *winner2, int *winner3) {
/* prints:
				-total winning lottery tickets sold to all stores
				-the winning numbers
				-id of each store, id of each customer in that store, each winning 
					...and number of numbers that matched
				-how many "of each amount won for each store" (e.g. 33, 15, 1 for
					...1match, 2match, 3matches */
	
	//first iteration, including totalticketssold and totalwinningtickets
	int totalTicketsSold = 0;
	int totalWinningTickets = 0;
	for (int i = 0; i < owner->numStores; i++) {
		for (int j = 0; j < owner->stores[i].numCust; j++) {
			for (int k = 0; k < owner->stores[i].customers[j].numTickets; k++) {
				totalTicketsSold++;
				if (checkWin((owner->stores[i].customers[j].lotteryNums[k]), winner1)) {
					totalWinningTickets++;
				}
				/*
				if (checkWin((owner->stores[i].customers[j].lotteryNums[k]), winner2)) {
					totalWinningTickets++;
				}
				if (checkWin((owner->stores[i].customers[j].lotteryNums[k]), winner3)) {
					totalWinningTickets++;
				}
				*/
			}
		}
	}
	//prints total winning tickets
	cout << endl << "Total tickets sold: " << totalTicketsSold << endl;
	cout << "Total winning numbers: " << totalWinningTickets << endl;

	/*second iteration, including:
				-store #
					-customer #
						-winning ticket #
							-number of matches of winning tickets */
	for (int i = 0; i < owner->numStores; i++) {
		//store #
		cout << endl << "Store #: " << owner->stores[i].storeId << endl;
		int win3 = 0;
		int win2 = 0;
		int win1 = 0;
		for (int j = 0; j < owner->stores[i].numCust; j++) {
			//placeholder
			int hasNotWon = 1;
			for (int k = 0; k < owner->stores[i].customers[j].numTickets; k++) {
				if (checkWin((owner->stores[i].customers[j].lotteryNums[k]), winner1)) {
					if (hasNotWon) {
						cout << "customer: " << owner->stores[i].customers[j].customerId << endl;
						hasNotWon = 0;
					}
					cout << "ticket ";
					cout << owner->stores[i].customers[j].lotteryNums[k][1];
					cout << owner->stores[i].customers[j].lotteryNums[k][2];
					cout << owner->stores[i].customers[j].lotteryNums[k][3];
					cout << "  matched ";
					cout << checkWin((owner->stores[i].customers[j].lotteryNums[k]), winner1);
					cout << endl;

					if (checkWin((owner->stores[i].customers[j].lotteryNums[k]), winner1) == 1) win1++;
					if (checkWin((owner->stores[i].customers[j].lotteryNums[k]), winner1) == 2) win2++;
					if (checkWin((owner->stores[i].customers[j].lotteryNums[k]), winner1) == 3) win3++;
					
				}
			}
		}

		owner->totalWinners[0] += win1;
		owner->totalWinners[1] += win2;
		owner->totalWinners[2] += win3;

		cout << "Total count for store " << owner->stores[i].storeId << ": ";
		cout << win3 << " " << win2 << " " << win1 << endl;
	}
}
/*
int main() {

	//seeds rand
	srand(time(NULL));

	for (int i = 0; i < 1; i++) {
		Owner *o = makeOwner();
		int w1[] = {rand() % 10, rand() % 10, rand() % 10};
		int w2[] = {rand() % 10, rand() % 10, rand() % 10};
		int w3[] = {rand() % 10, rand() % 10, rand() % 10};
		findWinners(o, w1);
		cout << endl;
	}

	return 0;
}
*/
