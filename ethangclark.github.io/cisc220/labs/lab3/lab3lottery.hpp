#ifndef LAB3LOTTERY_HPP
#define LAB3LOTTERY_HPP

struct Customer {
	int customerId;
	int numTickets;
	int **lotteryNums;
	//lotterynums = new *int[3] (or whatever numer)
};

struct Store {
	int storeId;
	int numCust;
	Customer *customers;
	int numSold;
	int numWinners[3];
};

struct Owner {
	Store *stores;
	int numStores;
	int totalSold;
	int totalWinners[3];
};

Owner *makeOwner();
Store *makeStore(Store *store);
Customer *makeCustomer(Customer *customer);
void getWinners(int *winners);
void findWinners(Owner *owner, int *ls);
int checkWin(int *nums, int *winners);


#endif //LAB3LOTTERY_HPP
